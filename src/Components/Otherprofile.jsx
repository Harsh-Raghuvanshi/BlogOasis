import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../Context/firebase";
import blank_profile_picture from "../Images/blank_profile_picture.png";
const Otherprofile = () => {
  const navigate = useNavigate();
  const firebaseCon = useFirebase();
  let unname = useParams().uniquename;
  console.log(unname);
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
    async function fetchdata() {
      const result = await firebaseCon.getUserDataFromFirestoreViaName(unname);
      setuserData(result);
    }
    fetchdata();
  }, [firebaseCon, unname]);
  useEffect(() => {
    if (firebaseCon.loading) {
      console.log("waiting");
    } else {
      async function applyimage() {
        try {
          const res = await firebaseCon.getImageUrl(userData.imageURL);
          seturl(res);
        } catch (err) {
          console.log("this error is at Otherprofile page", err);
        }
      }
      applyimage();
    }
  }, [firebaseCon, userData, navigate]);

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
export default Otherprofile;
