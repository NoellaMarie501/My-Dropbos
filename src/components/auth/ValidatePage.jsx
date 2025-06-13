import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { confirmSignUp } from "aws-amplify/auth";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Toast,
  Spinner
} from "react-bootstrap";

function ValidatePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUpConfirmation = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username,
        confirmationCode: authCode,
      });

      if (isSignUpComplete) {
        setSuccessToast(true);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      console.error("Confirmation error:", error);
      setErrorMsg(error.message || "Invalid confirmation code or username.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Email Verification</h3>

          {errorMsg && <p className="text-danger">{errorMsg}</p>}

          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Email or Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email or username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formAuthCode">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the 6-digit code"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleSignUpConfirmation}
              disabled={loading}
              className="w-100"
            >
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" /> Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </Button>

            <div className="text-center mt-3">
              Didn’t receive a code? <Link to="/resend-code">Resend</Link>
              <br />
              <Link to="/" className="text-muted">Cancel</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Toast
        show={successToast}
        onClose={() => setSuccessToast(false)}
        delay={2000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
        bg="success"
      >
        <Toast.Body className="text-white">Account verified! Redirecting...</Toast.Body>
      </Toast>
    </Container>
  );
}

export default ValidatePage;
