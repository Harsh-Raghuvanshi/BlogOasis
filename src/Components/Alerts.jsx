import React from "react";

export default function Alerts({ message, type}) {
  
  return (
    (
      <div
        className={`alert alert-${type} alert-dismissible fade show w-25 container`}
        role="alert"
      >
        <strong>{type}</strong> {message}
      </div>
    )
  );
}
