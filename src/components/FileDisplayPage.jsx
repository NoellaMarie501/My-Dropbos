import { list, remove, downloadData } from "aws-amplify/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "./layout";

const FileDisplayPage = (props) => {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const getList = async () => {
    try {
      const response = await list({
        options: {
          listAll: true,
        },
      });
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

  const fileIcons = {
    image: "📷",
    video: "🎥",
    doc: "📄",
    zip: "📦",
    default: "📁"
  };

  const getIcon = (type) => {
    const imageExtensions = ["jpeg", "png", "gif", "jpg"];
    const videoExtensions = ["mp4", "mkv", "mov"];
    const zipExtensions = ["zip"];
  
    // Check for image types
    if (imageExtensions.some(ext => type.endsWith(ext))) {
      return fileIcons.image;
    }
  
    // Check for video types
    if (videoExtensions.some(ext => type.endsWith(ext))) {
      return fileIcons.video;
    }
  
    // Check for document types
    if (type.includes('application')) {
      if (zipExtensions.some(ext => type.endsWith(ext))) {
        return fileIcons.zip;
      }
      return fileIcons.doc;
    }
  
    // Default icon
    return fileIcons.default;
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredFiles = files.filter((file) => {
    if (filter === 'All') return true;
    if (filter === 'image' && file.key.match(/\.(jpg|jpeg|png|gif)$/i)) return true;
    if (filter === 'video' && file.key.match(/\.(mp4|mkv|mov)$/i)) return true;
    if (filter === 'doc' && file.key.match(/\.(doc|docx|pdf|txt)$/i)) return true;
    if (filter === 'zip' && file.key.match(/\.(zip|rar|7z)$/i)) return true;
    return false;
  }).filter((file) => file.key.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDownload = async (key) => {
    try {
      console.log('path: ', `public/${key}`);
      const { body } = await downloadData({
        key,
        options: {
          validateObjectExistence: true,
          onProgress: (progress) => {
            console.log(`Download progress: ${(progress.transferredBytes / progress.totalBytes) * 100}%`);
          },
        },
      }).result;
  
      // Create a Blob from the response body
      const blob = await body.blob(); // Get the blob data
      const link = document.createElement('a'); // Create a temporary anchor element
      link.href = window.URL.createObjectURL(blob); // Create a URL for the Blob
      link.download = key; // Use the file name from the key
      document.body.appendChild(link); // Append the link to the body
      link.click(); // Trigger the download
      link.remove(); // Remove the link after triggering the download
    } catch (error) {
      console.error('Download error: ', error);
    }
  };
  return (
    <Layout>
      <Container className="mt-5">
        <h2>File Display Page</h2>
        <InputGroup className="mb-3">
          <Form.Check 
            type="checkbox" 
            label="All" 
            value="All" 
            checked={filter === 'All'} 
            onChange={handleFilterChange}
            className="radio" 
          />
          <Form.Check 
            type="checkbox" 
            label="Image" 
            value="image" 
            checked={filter === 'image'} 
            onChange={handleFilterChange}
            className="radio"
          />
          <Form.Check 
            type="checkbox" 
            label="Video" 
            value="video" 
            checked={filter === 'video'} 
            onChange={handleFilterChange}
            className="radio"
          />
          <Form.Check 
            type="checkbox" 
            label="Doc" 
            value="doc" 
            checked={filter === 'doc'} 
            onChange={handleFilterChange}
            className="radio"
          />
          <Form.Check 
            type="checkbox" 
            label="Zip" 
            value="zip" 
            checked={filter === 'zip'} 
            onChange={handleFilterChange}
            className="radio"
          />
          <Form.Control 
            type="text" 
            placeholder="Search File" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="radio"
          />
        </InputGroup>
        <Link to="/home">
          <Button variant="primary" className="mb-3">Upload file</Button>
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Type</th>
              <th>Last Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((file, index) => (
              <tr key={index}>
                <td>
                  {getIcon(file.key)} {file.key}
                </td>
                <td>{file.key.split('.').pop().toUpperCase()}</td>
                <td>{new Date(file.lastModified).toLocaleString()}</td>
                <td>
                  <Button variant="link" onClick={() =>  handleDownload(file.key) }>
                    Download
                  </Button>
                  <Button variant="link" className="text-danger" onClick={() => handleDelete(file.key)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
};

export default FileDisplayPage;
