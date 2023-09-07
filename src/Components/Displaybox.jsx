import React, { useState,useEffect } from "react";
import { useFirebase } from "../Context/firebase";
import { Link } from "react-router-dom";
const Displaybox = (props) => {
  const firebaseCon = useFirebase();
  let [result, setresult] = useState([]);
  useEffect(() => {
    async function gettingblogs() {
      try {
        let res = await firebaseCon.getBlogsNameInOrder(props.heading);
        setresult(res);
      } catch (err) {
        console.log("Error while getting blog on display box component", err);
      }
    }
    gettingblogs();
  }, [props.heading,firebaseCon]);

  return (
    <>
      <div
        className="card card1 m-3"
        style={{
          width: "18rem",
          border: "2px solid black",
          borderRadius: "2rem",
        }}
      >
        <ul className="">
          <li className="list-group-item center fw-bold text-warning center h5">
            {props.heading}
          </li>
          {result.map((element,ind) => {
             return <Link to='/allblogs' style={{textDecoration:"none",color: "rgb(77, 76, 76)"}} key={ind}><li className="list-group-item p-1" >{element}</li></Link>;
          })}
         
        </ul>
      </div>
    </>
  );
};
export default Displaybox;
