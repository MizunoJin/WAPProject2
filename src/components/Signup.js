import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

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
      const response = await axios.post("/api/Account/register", {
        email: email,
        password: password,
      });
      setMessage(
        "A confirmation email has been sent. Please click the link in the email to complete the registration."
      );
    } catch (error) {
      setError(error.response?.data?.message || "Failed to register.");
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
                  Sign up now
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

                <Button
                  className="mb-4 px-5 mx-5 w-100"
                  color="info"
                  size="lg"
                  type="submit"
                >
                  Login
                </Button>
                <p className="ms-5">
                  Do have an account?{" "}
                  <Link to="/login" class="link-info">
                    Login here
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

export default Signup;
