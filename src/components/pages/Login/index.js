import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import LoginForm from './components/LoginForm';
import { axiosClient } from "../../../axiosClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axiosClient.post("/api/Account/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("accessToken", response.data.token);
      navigate("/");
    } catch (err) {
      if (err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError(err.response.data);
      }
    }
  };

  return (
    <>
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm="6">
            <LoginForm
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

export default Login;
