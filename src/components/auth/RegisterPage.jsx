import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "aws-amplify/auth";

function RegisterPage() {
  // State to hold the email, password, and confirm password values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
 
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if(password !== confirmPassword){
        console.log("different password")
      }
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
        confirmPassword,
      });
      //console.log("UserId:", userId);
      if(userId){
        console.log("UserId:", userId);
        navigate("/validate");
      }
    } catch (error) {
      console.log('error signing up:', error);
    }
    // Do something with email, password, and confirmPassword, e.g., register logic
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <Container>
      <Row className="px-4 my-5">
        <Col>
          <h1>Register</h1>
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
              <Form.Text className="text-muted">
                We'll never share your email!
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                minLength="8"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                minLength="8"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Link
              to={`/signin`}
              style={{ marginBottom: "1rem", marginRight: "1rem" }}
            >
              signin instead?
            </Link>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Register &gt;&gt;
            </Button>
            &nbsp;
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
