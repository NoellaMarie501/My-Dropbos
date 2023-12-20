import { signIn } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout";

function LoginPage(props) {
  // State to hold the email and password values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isSignedIn") || false);
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with email and password, e.g., login logic
    console.log("Email:", email);
    console.log("Password:", password);
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      try {
        var { isSignedIn, nextStep, signInUserSession } = await signIn({
          username: email,
          password,
        });
        localStorage.setItem('isSignedIn', isSignedIn);
        props?.setIsAuthenticated(true);
        console.log("issigned in:", isSignedIn);
      } catch (error) {
        console.log("error signing in", error);
      }
      // Redirect to /files after loginconsole.log("Email:", email);
      if (isSignedIn) {
        console.log("Email:", email);
        console.log("Password:", password);
        navigate("/files");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      // Handle login error, show message to the user
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
     navigate("/files")
  }
  },[isAuthenticated])

  return (
    <Container>
      <Row className="px-4 my-5">
        <Col>
          <h1>Login</h1>
        </Col>
      </Row>
      <Row className="px-4 my-5">
        <Col sm={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                minLength="8"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Link
              to={`/register`}
              style={{ marginBottom: "1rem", marginRight: "1rem" }}
            >
              register instead?
            </Link>
            <Button variant="primary" type="submit">
              Login &gt;&gt;
            </Button>
            &nbsp;
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
