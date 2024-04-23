import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

function LoginForm({ email, setEmail, password, setPassword, handleSubmit, error }) {
  return (
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

        {error && <Alert variant="danger">{error}</Alert>}

        <Button className="mb-4 px-5 mx-5 w-100" color="info" size="lg" type="submit">
          Login
        </Button>
        <p className="ms-5">
          Don't have an account?{" "}
          <Link to="/signup" className="link-info">
            Register here
          </Link>
        </p>
      </div>
    </Form>
  );
}

export default LoginForm;
