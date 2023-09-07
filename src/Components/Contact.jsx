import React, { useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/firebase";

const Contact = () => {
  const navigate = useNavigate();
  const firebaseCon = useFirebase();

  let [registerdata, set_registerdata] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const Inputhandler = (event) => {
    let { name, value } = event.target;

    set_registerdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitFeed = async (event) => {
    try {
      event.preventDefault();
      if (!registerdata.name || !registerdata.email || !registerdata.feedback) {
        alert("Invalid Details for Feedback");
        return;
      }
      await firebaseCon.addingFeed(
        registerdata.name,
        registerdata.email,
        registerdata.feedback
      );
      alert("Feeback/Report Submitted Successfully");
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="page_container">
        <div className="all_of_content_form">
          <h1 className="fw-bolder center">Get In Touch</h1>
          <div className="super_form_container">
            <form
              method="POST"
              className="form_container"
              //  onSubmit={submitted}
            >
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
                <DescriptionIcon />
                <textarea
                  style={{ height: "50px " }}
                  className="input_element"
                  name="feedback"
                  id=""
                  cols="30"
                  rows="1"
                  placeholder="Write our FeedBack/ Query / Complain etc..."
                  value={registerdata.feedback}
                  onChange={Inputhandler}
                ></textarea>
              </div>
              <button
                className="form_submit_btn"
                type="submit"
                onClick={submitFeed}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Contact;
