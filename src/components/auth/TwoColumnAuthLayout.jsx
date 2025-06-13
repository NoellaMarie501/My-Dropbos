// src/components/TwoColumnAuthLayout.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const TwoColumnAuthLayout = ({ children }) => {
  return (
    <Container fluid className="min-vh-100 p-0">
      <Row className="g-0 h-100">
        {/* Left side with welcome message */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center bg-primary text-white p-5"
          style={{ minHeight: "100vh" }}
        >
          <h1>Welcome to MyDropbox</h1>
          <p className="mt-3 fs-5">
            Securely upload and manage your files anywhere, anytime.
          </p>
          {/* You can add images or branding here */}
        </Col>

        {/* Right side with form */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center p-5"
          style={{ minHeight: "100vh" }}
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default TwoColumnAuthLayout;
