import React, { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import EditIcon from "@mui/icons-material/Edit";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useFirebase } from "../Context/firebase";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const firebaseCon = useFirebase();
  const blogid = props.unid;
  const userid = firebaseCon.userallData.userID;

  let [Likecount, setLikecount] = useState(props.Likearr.length);
  let [Unlikecount, setUnlikecount] = useState(props.Unlikearr.length);
  let [Helpcount, setHelpcount] = useState(props.Helparr.length);

  let [isliked, setisliked] = useState(props.Likearr.includes(userid));
  let [isunliked, setisunliked] = useState(props.Unlikearr.includes(userid));
  let [ishelped, setishelped] = useState(props.Helparr.includes(userid));

  return (
    <>
      <div className="card m-3 border-4 center">
        <div className="card-header fw-bold">
          {props.tittle}
          {firebaseCon.userallData.email === props.writeremail ? (
            <Link to={`/update/${props.unid}`}>
              <span className="pointer" style={{ float: "right" }}>
                <EditIcon />
              </span>
            </Link>
          ) : null}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0 fs-6">
            <p>{props.description}</p>
            <footer className="blockquote-footer ">
              <Link className="text-warning" to={`/profile/${props.author}`}>
                {props.author}
              </Link>
              <cite title="Source Title">({props.dateOfPublish})</cite>
            </footer>
          </blockquote>
        </div>
        <div>
          <span
            className={`px-2  m-1 btn  rounded-pill ${
              isliked ? "btn-warning" : null
            }`}
            onClick={async () => {
              if (isliked) {
                setLikecount(Likecount - 1);
              } else {
                setLikecount(Likecount + 1);
              }
              setisliked(!isliked);
              await firebaseCon.transactReactionToBlogs(blogid, userid, "like");

            }}
          >
            {Likecount} <ThumbUpAltIcon />
          </span>
          <span
            className={`px-2 m-1 btn rounded-pill ${
              isunliked ? "btn-warning" : null
            }`}
            onClick={async () => {
              if (isunliked) {
                setUnlikecount(Unlikecount - 1);
              } else {
                setUnlikecount(Unlikecount + 1);
              }
              setisunliked(!isunliked);
              await firebaseCon.transactReactionToBlogs(
                blogid,
                userid,
                "unlike"
              );
            }}
          >
            {Unlikecount} <ThumbDownIcon />
          </span>
          <span
            className={`px-2 btn m-1 rounded-pill ${
              ishelped ? "btn-warning" : null
            }`}
            onClick={async () => {
              if (ishelped) {
                setHelpcount(Helpcount - 1);
              } else {
                setHelpcount(Helpcount + 1);
              }
              setishelped(!ishelped);
              await firebaseCon.transactReactionToBlogs(
                blogid,
                userid,
                "helpful"
              );

            }}
          >
            {Helpcount} <TipsAndUpdatesIcon />
          </span>
        </div>
      </div>
    </>
  );
};
export default BlogCard;
