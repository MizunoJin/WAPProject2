import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/Account/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("accessToken", response.data.token);
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Server not responding.");
      }
    }
  };

  return (
    <>
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm="6">
            <Form onSubmit={handleSubmit} className="my-5">
              <div className="d-flex flex-row ps-5 pt-5">
                <MDBIcon
                  fas
                  icon="crow fa-3x me-3"
                  style={{ color: "#709085" }}
                />
                <span className="h1 fw-bold mb-0">Tender</span>
              </div>

              <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
                <h3
                  className="fw-normal mb-3 ps-5 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Log in
                </h3>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-danger">{error}</p>}

                <Button className="mb-4 px-5 mx-5 w-100" color="info" size="lg" type="submit">
                  Login
                </Button>
                <p className="ms-5">
                  Don't have an account?{" "}
                  <Link to="/signup" class="link-info">
                    Register here
                  </Link>
                </p>
              </div>
            </Form>
          </MDBCol>

          <MDBCol sm="6" className="d-none d-sm-block px-0">
            <img
              src="https://i.pinimg.com/736x/c4/52/8e/c4528e0de41c8cb80c8fd9f025db9eb8.jpg"
              alt="Login image"
              className="w-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Login;
