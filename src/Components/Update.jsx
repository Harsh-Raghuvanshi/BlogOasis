import React, { useEffect, useState } from "react";
import update_item_image from "../Images/update_item_image.jpg";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import TitleIcon from "@mui/icons-material/Title";
import { useFirebase } from "../Context/firebase";
import { useNavigate, useParams } from "react-router-dom";
import Alerts from "./Alerts";

const Update = () => {
  let blogid = useParams()._id;
  const navigate = useNavigate();
  const firebaseCon = useFirebase();

  let [product_obj, set_pro_obj] = useState({
    category: "",
    tittle: "",
    description: "",
  });
  let [showAlert, setshowAlert] = useState({
    toshow: false,
    message: "",
    type: "",
  });
  const gettingBlogWaitForSometime = async (bid) => {
    try {
      let blogToBeEdited = await firebaseCon.getBlogWithId(bid);
      set_pro_obj({
        category: blogToBeEdited.category,
        tittle: blogToBeEdited.tittle,
        description: blogToBeEdited.description,
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
      navigate("/");
    }
  };

  useEffect(() => {
    if (firebaseCon.loading) {
      console.log("waiting");
    } else {
      if (!firebaseCon.isLoggedin) {
        navigate("/signin");
      } else {
        gettingBlogWaitForSometime(blogid);
      }
    }
  }, [firebaseCon.isLoggedin, navigate]);

  const changing = (event) => {
    let { name, value } = event.target;
    set_pro_obj((prevval) => {
      return {
        ...prevval,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!product_obj.tittle || !product_obj.description) {
        alert("You have dona an invalid Change");
        return;
      }
      await firebaseCon.updateBlogWithId(
        blogid,
        product_obj.category,
        product_obj.tittle,
        product_obj.description
      );
      console.log("hello i am here ");
      console.log(showAlert);
      setshowAlert({
        toshow: true,
        message: "Succesfully Updated Your Blog",
        type: "success",
      });
      console.log("hii how are you");
      console.log(showAlert);
      setTimeout(() => {
        setshowAlert({ toshow: false, message: "", type: "" });
        navigate("/allblogs");
      }, 2000);
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  return (
    <>
      {showAlert.toshow && (
        <Alerts message={showAlert.message} type={showAlert.type} />
      )}
      <div className="page_container ">
        <div className="all_of_content_form" style={{ width: "95%" }}>
          <h1 className="fw-bolder p-2 center heading1">Update/Edit</h1>
          <div className="super_form_container">
            <form
              className="form_container"
              style={{ width: "70%", textAlign: "center" }}
            >
              <div className="form_element">
                <CategoryIcon />
                <select
                  className="input_element"
                  name="category"
                  id="category"
                  placeholder="Select Category"
                  onChange={changing}
                  value={product_obj.category}
                >
                  <option value="Generalized">Generalized</option>
                  <option value="Experience">Experience</option>
                  <option value="Review">Review</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Bugs and Error">Bugs and Error</option>
                  <option value="Problems(Doubts)">Problems(Doubts)</option>
                </select>
              </div>

              <div className="form_element">
                <TitleIcon />
                <input
                  className="input_element"
                  type="text"
                  name="tittle"
                  autoComplete="off"
                  placeholder="Enter Blog tittle"
                  onChange={changing}
                  value={product_obj.tittle}
                />
              </div>

              <div className="form_element blog_area">
                <DescriptionIcon />
                <textarea
                  className="input_element text-area-styling"
                  name="description"
                  id=""
                  cols="30"
                  rows="1"
                  placeholder="Write Your Content here . . . "
                  onChange={changing}
                  value={product_obj.description}
                  style={{
                    height: "300px",
                    width: "100%",
                    textAlign: "left",
                    border: "2px solid black",
                    borderRadius: "1rem",
                  }}
                ></textarea>
              </div>
              <button
                className="btn btn-outline-dark rounded-pill px-1 py-0 border-2 my-1"
                type="submit"
                onClick={handleSubmit}
              >
                Update
              </button>
            </form>
            <div className="cartoonistic_image_container">
              <img
                className="cartoonistic_image"
                src={update_item_image}
                alt="Add item"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Update;
