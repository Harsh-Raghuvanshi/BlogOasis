import React, { useEffect, useState } from "react";
import add_item_image from "../Images/add_item_image.jpg";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import TitleIcon from "@mui/icons-material/Title";
import { useFirebase } from "../Context/firebase";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const navigate = useNavigate();
  const firebaseCon = useFirebase();
  let userinformation = firebaseCon.userallData;

  let [product_obj, set_pro_obj] = useState({
    category: "Generalized",
    tittle: "",
    description: "",
    username: userinformation.username,
    email: userinformation.email,
    Like: [],
    Dislike: [],
    Helpful: [],
  });

  useEffect(() => {
    if (firebaseCon.loading) {
      console.log("waiting");
    } else {
      console.log("Heello",firebaseCon.isLoggedin);
      if (!firebaseCon.isLoggedin) {
        navigate("/signin");
      }
    }
  }, [firebaseCon.isLoggedin, navigate,firebaseCon.loading]);

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
        alert("You have written an invalid Blog");
        return;
      }
      const currdate = new Date().toLocaleDateString();
      await firebaseCon.addingBlog(
        product_obj.category,
        product_obj.tittle,
        product_obj.description,
        product_obj.Like,
        product_obj.Dislike,
        product_obj.Helpful,
        product_obj.username,
        product_obj.email,
        currdate
      );
      alert("Created Successfully");
      navigate("/allblogs");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="page_container ">
        <div className="all_of_content_form" style={{ width: "95%" }}>
          <h1 className="fw-bolder p-2 center heading1">Let's Create</h1>
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
                Create
              </button>
            </form>
            <div className="cartoonistic_image_container">
              <img
                className="cartoonistic_image"
                src={add_item_image}
                alt="Add item"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Create;
