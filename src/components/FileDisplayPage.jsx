import { list, remove } from "aws-amplify/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./layout";

const FileDisplayPage = (props) => {
  const [files, setFiles] = useState([]);

  var getList = async () => {
    try {
      const response = await list({
        options: {
          listAll: true,
        },
      });
      console.log("response", response.items);
      setFiles(response.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  const handleDelete = async (key) => {
    try {
      await remove({ key: key });
      getList();
    } catch (error) {
      console.log("Error ", error);
    }
    
  };

  return (
    <Layout>
      <Container className="mt-5">
        <h2>File Display Page</h2>
        <Link to="/home">
          <Button variant="primary">Upload file</Button>
        </Link>
        <Row>
          {files.map((file) => (
            <Col key={file.key} md={4} className="mb-3">
              <div className="card">
                <img
                  // src={/* Assuming you have the public URL of the image */}
                  className="card-img-top"
                  alt={file.key}
                />
                <div className="card-body">
                  <h5 className="card-title">{file.key}</h5>
                  <p className="card-text">
                    Last Modified:{" "}
                    {new Date(file.lastModified).toLocaleString()}
                    <br />
                    Size: {file.size} bytes
                  </p>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(file.key)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default FileDisplayPage;
