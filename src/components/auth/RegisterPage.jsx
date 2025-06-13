import React, { useState } from "react";
import {
  Container, Row, Col, Form, Button, Card, Toast, Spinner
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "aws-amplify/auth";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { isSignUpComplete, userId } = await signUp({
        username: email,
        password,
      });

      if (userId || isSignUpComplete) {
        setShowToast(true);
        setTimeout(() => navigate("/validate"), 1500);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setErrorMsg(error.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">


      <div
        style={{
          display: "flex",
          maxWidth: "900px",
          width: "100%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        {/* Left Side - Welcome Text */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#007bff",
            color: "white",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderTopLeftRadius: "1rem",
            borderBottomLeftRadius: "1rem",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <h2>Welcome to 📁 My-Dropbox</h2>
          <p className="lead text-center">
            Sign up to securely store, organize and download your files anytime, anywhere.<br />
            Enjoy a simple and reliable cloud storage experience built just for you.
          </p>
        </div>

        {/* Vertical Divider */}
        <div
          style={{
            width: "1px",
            backgroundColor: "#ddd",
          }}
        />

        {/* Right Side - Login Form */}
        <div
          style={{
            flex: 1,
            padding: "3rem",
            backgroundColor: "white",
            borderTopRightRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >

          <h3 className="mb-4 text-center">Create an Account</h3>

          {errorMsg && <p className="text-danger">{errorMsg}</p>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                minLength={8}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                minLength={8}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" /> Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>

            <div className="text-center mt-3">
              <Link to="/signin">Already have an account? Sign in</Link>
            </div>
          </Form>

          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={2000}
            autohide
            className="position-fixed bottom-0 end-0 m-3"
            bg="success"
          >
            <Toast.Body className="text-white">Registration successful!</Toast.Body>
          </Toast>
        </div>
      </div>
    </Container>
  );
}

export default RegisterPage;
