import { Amplify } from "aws-amplify";
import { uploadData } from "aws-amplify/storage";
import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import amplifyconfig from "../../amplifyconfiguration.json";
import Layout from "../layout";
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Toast } from 'react-bootstrap';

Amplify.configure(amplifyconfig);

const Home = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderPath, setFolderPath] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

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
        key: key,
        data: selectedFile,
        options: {
          accessLevel: "guest",
        },
      });

      setSelectedFile(null);
      setFolderPath('');
      setUploadMessage('Your file has been successfully uploaded!');
      setShowToast(true);
    } catch (error) {
      setUploadMessage(`Error: ${error.message}`);
      setShowToast(true);
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <Container>
          <Row>
            <Col>
              <h2>File Details</h2>
              <p>File Name: {selectedFile.name}</p>
              <p>File Type: {selectedFile.type}</p>
              <p>Last Modified: {new Date(selectedFile.lastModified).toLocaleDateString()}</p>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Please choose a file and then press "upload"</h4>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="upload-container">
        <h2>Noella File Upload System</h2>
        <div 
          className="drop-area" 
          onDragOver={onDragOver} 
          onDrop={onDrop}
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          <p>Drag & drop files here or click to upload</p>
        </div>
        <input type="file" onChange={onFileChange} style={{ display: 'none' }} />
        
        <Form.Group controlId="folderPath">
          <Form.Label>Folder Path (Optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter folder path (e.g., folder/subfolder)"
            value={folderPath}
            onChange={(e) => setFolderPath(e.target.value)}
          />
        </Form.Group>

        <Button onClick={onFileUpload} variant="primary" className="mt-2">Upload</Button>
        
        {fileData()}

        <div className="view-files-section">
          <h3>OR</h3>
          <Link to="/files">
            <Button variant="primary" size="lg"><FontAwesomeIcon icon={faArrowLeft} /> View Files</Button>
          </Link>
        </div>

        <Toast 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={3000} 
          autohide 
          className="upload-toast"
        >
          <Toast.Body>{uploadMessage}</Toast.Body>
        </Toast>
      </div>
    </Layout>
  );
};

export default Home;