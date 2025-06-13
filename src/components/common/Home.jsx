import { Amplify } from "aws-amplify";
import { uploadData } from "aws-amplify/storage";
import React, { useState } from "react";
import { Button, Container, Row, Col, Form, Toast, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import amplifyconfig from "../../amplifyconfiguration.json";
import Layout from "../layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUpload } from '@fortawesome/free-solid-svg-icons';
import "./Home.css";
import { useNavigate } from "react-router-dom";
Amplify.configure(amplifyconfig);

const Home = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderPath, setFolderPath] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const navigate = useNavigate();   

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length) {
      setSelectedFile(files[0]);
    }
  };

  const onFileUpload = async () => {
    if (!selectedFile) return;

    const key = folderPath ? `${folderPath}/${selectedFile.name}` : selectedFile.name;

    try {
      await uploadData({
        key,
        data: selectedFile,
        options: {
          accessLevel: "guest",
        },
      });

      //setSelectedFile(null);
      //setFolderPath('');
      //setUploadMessage('✅ File uploaded successfully!');
      //setShowToast(true);
      navigate("/files", {
        state: {
          toastMessage: "✅  File uploaded successfully!",
        },
      });
    } catch (error) {
      setUploadMessage(`❌ Upload failed: ${error.message}`);
      setShowToast(true);
    }
  };

  return (
    <Layout>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <Card className="shadow p-4 w-100" style={{ maxWidth: '600px' }}>
          <h3 className="mb-4 text-center">Upload File</h3>

          <div
            className="drop-area border border-2 border-primary rounded p-4 text-center mb-3"
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={() => document.querySelector('input[type="file"]').click()}
            style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
          >
            <FontAwesomeIcon icon={faUpload} size="2x" className="text-primary mb-2" />
            <p className="mb-0">Drag & drop file here or click to browse</p>
            <input
              type="file"
              onChange={onFileChange}
              style={{ display: "none" }}
            />
          </div>

          {selectedFile && (
            <div className="mb-3">
              <h6 className="mb-1">📄 {selectedFile.name}</h6>
              <small className="text-muted">Type: {selectedFile.type} | Last Modified: {new Date(selectedFile.lastModified).toLocaleDateString()}</small>
            </div>
          )}

          <Form.Group controlId="folderPath" className="mb-3">
            <Form.Label>Folder Path <small className="text-muted">(optional)</small></Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., myfolder/subfolder"
              value={folderPath}
              onChange={(e) => setFolderPath(e.target.value)}
            />
          </Form.Group>

          <Button onClick={onFileUpload} variant="primary" className="w-100 mb-3">
            Upload
          </Button>

          <div className="text-center">
            <span className="text-muted">or</span>
          </div>

          <Link to="/files" className="d-block mt-3 text-center">
            <Button variant="outline-secondary" className="w-100">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              View Files
            </Button>
          </Link>

          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            className="mt-3"
          >
            <Toast.Body>{uploadMessage}</Toast.Body>
          </Toast>
        </Card>
      </Container>
    </Layout>
  );
};

export default Home;
