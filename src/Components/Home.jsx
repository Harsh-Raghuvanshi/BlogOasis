import React from "react";
import blogimage from "../Images/blogimage.jpg";
import Displaybox from "./Displaybox";
import { Link} from "react-router-dom";
import { useFirebase } from "../Context/firebase";
const arrobj1 = [
  {
    Key: "1",
    heading: "Insigthful",
  },
  {
    Key: "2",
    heading: "Recent",
  },
  {
    Key: "3",
    heading: "Most Liked",
  },
];
const Home = () => {
  const firebaseCon = useFirebase();

  return (
    <>
      <div className="maincon">
        <div className="homeimagecon center">
          <img className="homeimage" src={blogimage} alt="" />
        </div>
        <div className="contentbox p-2 m-0">
          <h1 className="center fw-bolder p-3">
            Discover, Create, and Share Your Stories on Blog
            <span className="text-warning">Oasis</span>
          </h1>
          <h3 className="center fw-medium fs-5 p-3">
            Share you interview Experience,Internship experience and collaborate
            with other{" "}
          </h3>
          <p className="center p-3 fs-6">
            At Blogoasis, we believe that everyone has a unique voice and a
            story to tell. Our platform is designed to empower you to unleash
            your creativity, connect with like-minded individuals, and share
            your passions with the world. Whether you're into travel,
            technology, lifestyle, or any other niche, Blogoasis provides you
            with the canvas to craft your narratives and inspire others.
          </p>

          {firebaseCon.isLoggedin ? (
            <div className="center p-3">
              <Link to="/allblogs">
                <button className="btn btn-outline-warning m-1 mx-3 center rounded-pill">
                  Read Blogs
                </button>
              </Link>
            </div>
          ) : (
            <div className="center p-3">
              <Link to="/signin">
                <button className="btn btn-outline-warning m-1 mx-3 rounded-pill">
                  SignIn
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-outline-warning m-1 mx-3 rounded-pill">
                  SignUp
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <hr />
      {firebaseCon.isLoggedin && <div className="interest_box">
        {arrobj1.map((element, index) => {
          return <Displaybox heading={element.heading} key={index} />;
        })}
      </div>}
    </>
  );
};
export default Home;
