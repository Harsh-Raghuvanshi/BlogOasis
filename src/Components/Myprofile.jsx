import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/firebase";
import blank_profile_picture from "../Images/blank_profile_picture.png";
const MyProfile = () => {
  const navigate = useNavigate();
  const firebaseCon = useFirebase();

  let [userData, setuserData] = useState({
    userID: "",
    name: "",
    username: "",
    email: "",
    imageURL: "",
    aboutmyself: "",
  });
  let [url, seturl] = useState(null);

  useEffect(() => {
    setuserData(firebaseCon.userallData);
  }, [firebaseCon.userallData]);
  useEffect(() => {
    if (firebaseCon.loading) {
      console.log("waiting");
    } else {
      if (!firebaseCon.isLoggedin) {
        console.log("user is not signed in");
        navigate("/signin");
      } else {
        console.log("user is signed in");

        async function applyimage() {
          try {
            const res = await firebaseCon.getImageUrl(
              firebaseCon.userallData.imageURL
            );
            console.log("This is res", res);
            seturl(res);
          } catch (err) {
            console.log("this error is at myprofile page", err);
          }
        }
        applyimage();
        // firebaseCon.getImageUrl(userData.imageURL).then((url)=>seturl(url));
      }
    }
  }, [firebaseCon, firebaseCon.userallData, navigate]);

  return (
    <>
      <div className="card mx-auto" style={{ width: "15rem", border: "none" }}>
        <img
          src={url || blank_profile_picture}
          className="card-img-top"
          alt="Loading . . ."
          style={{ borderRadius: "120px" }}
        />
        <div className="card-body">
          <h5 className="card-title  center fw-bold">{userData.name}</h5>
          <h6 className="card-text center fw-bold text-secondary">
            ({userData.username})
          </h6>
          <p className="card-text center">{userData.aboutmyself}</p>
        </div>
        <hr />
      </div>
    </>
  );
};
export default MyProfile;
