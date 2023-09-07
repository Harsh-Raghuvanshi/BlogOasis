import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
const Footer = () => {
  let content = ` 1- Personal Information: When you use our website or subscribe to our services, we may collect personal information such as your name, email address, and any other information you choose to provide when interacting with our platform.
    2-  Log Data: Like most websites, we automatically collect information that your browser sends whenever you visit our website. This may include your IP address, browser type, device information, and the pages you visit on our website.
    3- Personalization: We use your personal information to personalize your experience on our website and to provide you with relevant content and recommendations.
    `;
  return (
    <>
      <div className="footer pt-2">
        <div className="f1 footchild">
          <p className="fw-bold">Term and Conditions</p>
          <ul className="footerlist">
            <li className="pointer" onClick={() => alert(content)}>
              Privacy Policy
            </li>
            <li
              className="pointer"
              onClick={() =>
                alert("Report Your problem with full Detail on Contact Page ")
              }
            >
              Report Problem
            </li>
            <li
              className="pointer"
              onClick={() =>
                alert(
                  "Report the Plagrism on the Contact Page also do not forgot to add cheaters email address we are assuring you if user found guilty we will take STRICT ACTIONS "
                )
              }
            >
              Report Plagrism
            </li>
          </ul>
        </div>
        <div className="f2 footchild">
          <p className="fw-bold">Follow Us on</p>
          <div>
            <a
              href="https://www.linkedin.com/in/harsh-raghuvanshi-a89bb8232/"
              style={{ color: "white" }}
            >
              <InstagramIcon className="pointer" />
            </a>
            {"    "}
            {"    "}
            <a
              href="https://www.linkedin.com/in/harsh-raghuvanshi-a89bb8232/"
              style={{ color: "white" }}
            >
              <LinkedInIcon className="pointer" />
            </a>
            {"    "}
            <a
              href="https://twitter.com/harshraghu30"
              style={{ color: "white" }}
            >
              <TwitterIcon className="pointer" />
            </a>
          </div>
        </div>
        <div className="f2 footchild">
          <p className="fw-bold">Contact Us</p>
          <div>
            <p>
              Mail us at :{" "}
              <EmailIcon
                className="pointer"
                onClick={() => alert("Mail us at blogoasissupport@gmail.com ")}
              />{" "}
            </p>
          </div>
        </div>
        <div className="center" style={{ width: "100%" }}>
          {" "}
          All rights are reserved &copy;
        </div>
      </div>
    </>
  );
};
export default Footer;
