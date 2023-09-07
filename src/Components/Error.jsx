import React from "react";
import errorimage from "../Images/errorimage.jpg"
const Error=()=>{
    return(
        <>
            <h1 className="fw-bolder center p-2">This Page is not available</h1>
            <div className="center p-3">

            <img src={errorimage} alt="404 Error" className="center" style={{ width:"65vw",height:"80vh"}}/>
            </div>
        </>
    )
}
export default Error;