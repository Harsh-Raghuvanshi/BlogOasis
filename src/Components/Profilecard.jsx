import React from "react";
const Profilecard = (props) => {
 
  let temp = require(`../Images/${props.temp}`);
  return (
    <>
      <div className="card" style={{ width: "15rem", border: "none" }}>
        <img
          src={temp}
          className="card-img-top"
          alt="..."
          style={{ borderRadius: "100px"}}
        />
        <div className="card-body">
          <h5 className="card-title  center fw-bold">{ props.name}</h5>
          <h6 className="card-text center fw-bold text-secondary">({props.designation})</h6>
          <p className="card-text center">{props.intro}</p>
          <div className="center">
            <a
              href={props.link}
              target="_a"
              className="btn btn-primary px-1 py-0"
              style={{ fontWeight: "700", borderRadius: "8px" }}
            >
              in
            </a>
          </div>
        </div>
        <hr />
      </div>
      
    </>
  );
};
export default Profilecard;
