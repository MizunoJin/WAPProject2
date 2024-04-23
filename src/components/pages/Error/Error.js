// components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div class="col-md-12 text-center my-5">
      <h2>Unexpected error happened.</h2>
      <p>Sorry, an unexpected error happened.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default Error;
