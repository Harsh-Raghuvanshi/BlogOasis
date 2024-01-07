import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import login_image from "../Images/signinimage.jpg";
import { useFirebase } from "../Context/firebase";
import { useNavigate } from "react-router-dom";
import Alerts from "./Alerts";
const Signin = () => {
  const navigate = useNavigate();
  const firebaseCon = useFirebase();
  let [showAlert, setshowAlert] = useState({
    toshow: false,
    message: "",
    type: "",
  });
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
        setshowAlert({
          toshow: true,
          message: "Invalid Credentials provided",
          type: "danger",
        });
        setTimeout(() => {
          setshowAlert({ toshow: false, message: "", type: "" });
        }, 2000);
        return;
      }
      const res = await firebaseCon.loginUserWithEmailAndPassword(
        logindata.email,
        logindata.password
      );
      if (res) {
        setshowAlert({
          toshow: true,
          message: "Succesful Login",
          type: "success",
        });
        setTimeout(() => {
          setshowAlert({ toshow: false, message: "", type: "" });
          navigate("/");
        }, 2000);
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
      {showAlert.toshow && (
        <Alerts message={showAlert.message} type={showAlert.type} />
      )}
      ;
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
