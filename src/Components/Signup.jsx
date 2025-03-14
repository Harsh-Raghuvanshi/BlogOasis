import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import signup_image from "../Images/signupimage.jpg";
import { useFirebase } from "../Context/firebase";

const Signup = () => {
  const navigate = useNavigate();
  const firebaseCon = useFirebase();
  useEffect(() => {
    if (firebaseCon.isLoggedin) {
      navigate("/");
    }
  }, [firebaseCon.isLoggedin, navigate]);
  const [registerdata, setregisterdata] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    aboutmyself: "",
  });

  const Inputhandler = (event) => {
    let { name, value } = event.target;

    setregisterdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [userphoto, setuserphoto] = useState();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (
        !registerdata.email ||
        !registerdata.password ||
        !registerdata.name ||
        !registerdata.username ||
        !registerdata.aboutmyself
      ) {
        alert("Please fill all fields");
        return;
      }
      if(registerdata.password.length<6){
        alert("Password length is less than 6 should be more");
        return;
      }
      console.log("Signing Up user ");
      await firebaseCon.savingUserDetails(
        registerdata.email,
        registerdata.name,
        registerdata.username,
        userphoto,
        registerdata.aboutmyself
      );
      await firebaseCon.signUpuserWithEmailAndPassword(
        registerdata.email,
        registerdata.password
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="page_container">
        <div className="all_of_content_form">
          <h1 className="fw-bolder center heading1">Sign Up</h1>
          <div className="super_form_container">
            <form className="form_container">
              <div className="form_element">
                <PersonIcon />
                <input
                  className="input_element"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  autoComplete="off"
                  value={registerdata.name}
                  onChange={Inputhandler}
                />
              </div>
              <div className="form_element">
                <PersonIcon />
                <input
                  className="input_element"
                  type="text"
                  name="username"
                  placeholder="Enter unique username"
                  autoComplete="off"
                  value={registerdata.username}
                  onChange={Inputhandler}
                />
              </div>

              <div className="form_element">
                <EmailIcon />
                <input
                  className="input_element"
                  type="email"
                  name="email"
                  placeholder="Enter you Email id"
                  autoComplete="off"
                  value={registerdata.email}
                  onChange={Inputhandler}
                />
              </div>
              <div className="form_element">
                <KeyIcon />
                <input
                  className="input_element"
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  value={registerdata.password}
                  onChange={Inputhandler}
                />
              </div>
              <div className="form_element">
                <DescriptionIcon />
                <textarea
                  className="input_element"
                  type="text"
                  name="aboutmyself"
                  placeholder="Describe yourself in 50 words"
                  value={registerdata.aboutmyself}
                  onChange={Inputhandler}
                />
              </div>
              <div className="center ml-4 my-2 fw-bold">
                Profile Photo :{" "}
                <input
                  className="input_element"
                  type="file"
                  name="userPhoto"
                  onChange={(event) => setuserphoto(event.target.files[0])}
                />
              </div>
              <button
                className="btn btn-outline-dark rounded-pill px-1 py-0 border-2 my-1"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
            <div className="cartoonistic_image_container">
              <img
                className="cartoonistic_image"
                src={signup_image}
                alt="signup"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
