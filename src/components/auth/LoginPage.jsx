import { signIn } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isSignedIn") || false);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMsg(""); // Clear previous error messages
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      localStorage.setItem('isSignedIn', isSignedIn);
      props?.setIsAuthenticated(true);
      if (isSignedIn) {
        navigate("/files");
      }
    } catch (error) {

      setErrorMsg(error.message || "An error occurred during login.");
      console.log("error signing in", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/files");
    }
  }, [isAuthenticated, navigate]);

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
          <h2>Welcome back to 📁 MyDropBox</h2>
          <p>
            Your secure place to upload, manage, and share files easily.
          </p>
          <p>
            Please sign in to continue, or create an account if you don't have one.
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
          <h1 className="mb-4">Login</h1>
           {errorMsg && <p className="text-danger">{errorMsg}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                minLength={8}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className="mb-3">
              <Link to="/register" style={{ textDecoration: "underline" }}>
                Register instead?
              </Link>
            </div>
            <Button variant="primary" type="submit" className="w-100">
              Login &gt;&gt;
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;
