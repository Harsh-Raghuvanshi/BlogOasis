import { React, useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/firebase";
const AllBlogs = () => {
  const navigate = useNavigate();
  const firebaseCon = useFirebase();
  let [blogarr, setblogarr] = useState([]);
  useEffect(() => {
    if (firebaseCon.loading) {
      console.log("waiting");
    } else {
      if (!firebaseCon.isLoggedin) {
        navigate("/signin");
      }
    }
  }, [firebaseCon.isLoggedin, navigate]);
  useEffect(() => {
    firebaseCon.getAllBlogs().then((blogs) => setblogarr(blogs.docs));
  }, []);
  return (
    <>
      <div style={{ minHeight: "89vh" }}>
        {blogarr.map((elements) => {
          // let revdateofPublish=elements.data().dateOfPublish;
          // revdateofPublish=revdateofPublish.split("").reverse("").join("");
          return (
            <BlogCard
              key={elements.id}
              unid={elements.id}
              dateOfPublish={elements.data().dateOfPublish}
              author={elements.data().author}
              description={elements.data().description}
              tittle={elements.data().tittle}
              writeremail={elements.data().authoremail}
              Likearr={elements.data().Like}
              Unlikearr={elements.data().Dislike}
              Helparr={elements.data().Helpful}
            />
          );
        })}
      </div>
    </>
  );
};
export default AllBlogs;
