import { list, remove, downloadData } from "aws-amplify/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Table, Badge, Card, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFileImage, FaFileVideo, FaFileAlt, FaFileArchive, FaFolderOpen, FaTrashAlt, FaDownload } from "react-icons/fa";
import Layout from "./layout";

const FileDisplayPage = () => {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const getList = async () => {
    try {
      const response = await list({ options: { listAll: true } });
      setFiles(response.items);
    } catch (error) {
      console.log("List Error:", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleDelete = async (key) => {
    try {
      await remove({ key });
      getList();
    } catch (error) {
      console.log("Delete Error:", error);
      setErrorMsg("Unauthorized Action");
    }
  };

  const handleDownload = async (key) => {
    try {
      const { body } = await downloadData({
        key,
        options: {
          validateObjectExistence: true,
          onProgress: (progress) => {
            console.log(`Download progress: ${(progress.transferredBytes / progress.totalBytes) * 100}%`);
          },
        },
      }).result;

      const blob = await body.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = key;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download Error:", error);
    }
  };

  const getIcon = (key) => {
    const ext = key.split(".").pop().toLowerCase();
    if (["jpeg", "jpg", "png", "gif"].includes(ext)) return <FaFileImage className="text-primary" />;
    if (["mp4", "mkv", "mov"].includes(ext)) return <FaFileVideo className="text-danger" />;
    if (["doc", "docx", "pdf", "txt"].includes(ext)) return <FaFileAlt className="text-success" />;
    if (["zip", "rar", "7z"].includes(ext)) return <FaFileArchive className="text-warning" />;
    return <FaFolderOpen className="text-secondary" />;
  };

  const filteredFiles = files
    .filter((file) => {
      if (filter === "All") return true;
      if (filter === "image" && file.key.match(/\.(jpg|jpeg|png|gif)$/i)) return true;
      if (filter === "video" && file.key.match(/\.(mp4|mkv|mov)$/i)) return true;
      if (filter === "doc" && file.key.match(/\.(doc|docx|pdf|txt)$/i)) return true;
      if (filter === "zip" && file.key.match(/\.(zip|rar|7z)$/i)) return true;
      return false;
    })
    .filter((file) => file.key.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Layout>
      <Container className="mt-5">
        <Row className="mb-4 justify-content-between align-items-center">
          <Col md={6}>
            <h3 className="fw-bold">📂 My Files</h3>
            <p className="text-muted">Access, download, or delete your uploaded files.</p>
           {errorMsg && <p className="text-danger">{errorMsg}</p>}
          </Col>
          <Col md="auto">
            <Link to="/home">
              <Button variant="primary">+ Upload File</Button>
            </Link>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="🔍 Search file by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <ButtonGroup className="w-100">
              {["All", "image", "video", "doc", "zip"].map((type) => (
                <Button
                  key={type}
                  variant={filter === type ? "dark" : "outline-dark"}
                  onClick={() => setFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>

        {filteredFiles.length === 0 ? (
          <p className="text-center text-muted">No files found.</p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredFiles.map((file, index) => (
              <Col key={index}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <span className="fs-3 me-2">{getIcon(file.key)}</span>
                      <div className="flex-grow-1">
                        <Card.Title className="fs-6 text-truncate" title={file.key}>
                          {file.key}
                        </Card.Title>
                        <Badge bg="secondary" className="text-uppercase">
                          {file.key.split(".").pop()}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-muted small">
                      Last Modified: {new Date(file.lastModified).toLocaleString()}
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between">
                    <Button variant="outline-success" size="sm" onClick={() => handleDownload(file.key)}>
                      <FaDownload className="me-1" />
                      Download
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(file.key)}>
                      <FaTrashAlt className="me-1" />
                      Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Layout>
  );
};

export default FileDisplayPage;
