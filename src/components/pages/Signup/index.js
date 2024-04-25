import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import SignupForm from "./components/SignupForm";
import { axiosClient } from "../../../axiosClient";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await axiosClient.post("/api/Account/register", {
        email: email,
        password: password,
      });
      setMessage(
        "A confirmation email has been sent. Please click the link in the email to complete the registration."
      );
    } catch (error) {
      console.log("Error registering:", error.response.data)
      if (error.response?.data?.$values) {
        setError(
          error.response.data?.$values
            .map((value) => value.description)
            .join(" ")
        );
      } else {
        setError("Failed to register.");
      }
    }
  };

  return (
    <>
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm="6">
            <SignupForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              error={error}
            />
          </MDBCol>

          <MDBCol sm="6" className="d-none d-sm-block px-0">
            <img
              src="https://i.pinimg.com/736x/c4/52/8e/c4528e0de41c8cb80c8fd9f025db9eb8.jpg"
              alt="Login image"
              className="w-100 my-auto h-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Signup;
