import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import login_image from "../Images/signinimage.jpg";
import { useFirebase } from "../Context/firebase";
// import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const navigate = useNavigate();
  const firebaseCon = useFirebase();

  let [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });

  const Inputhandler = (event) => {
    let { name, value } = event.target;

    setlogindata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (firebaseCon.isLoggedin) {
      navigate("/");
    }
  }, [firebaseCon.isLoggedin, navigate]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!logindata.email || !logindata.password) {
        alert("Please fill all fields");
        return;
      }
      const res = await firebaseCon.loginUserWithEmailAndPassword(
        logindata.email,
        logindata.password
      );
      if (res) {
        navigate("/");
      }
      setlogindata({
        email: "",
        password: "",
      });
    } catch (err) {
      alert("User don't EXIST");
      console.log(err);
    }
  };

  // const handleGoogleLogin=async()=>{
  //   await firebaseCon.loginWithGoogle();
  // }

  return (
    <>
      <div className="page_container">
        <div className="all_of_content_form">
          <h1 className="fw-bolder center heading1">Sign In</h1>
          <div className="super_form_container">
            <form className="form_container">
              <div className="form_element">
                <EmailIcon />
                <input
                  className="input_element"
                  type="email"
                  name="email"
                  placeholder="Enter you Email id"
                  autoComplete="off"
                  value={logindata.email}
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
                  value={logindata.password}
                  onChange={Inputhandler}
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
                src={login_image}
                alt="signup"
              />
            </div>
          </div>
          {/* For now I put this service at halt */}
          {/* <div className="center m-3"> <button className="btn btn-outline-danger rounded-pill px-2 py-0" onClick={handleGoogleLogin}>Sign in with <GoogleIcon/></button> </div> */}
        </div>
      </div>
    </>
  );
};
export default Signin;
