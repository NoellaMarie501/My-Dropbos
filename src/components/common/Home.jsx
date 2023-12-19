import { Amplify } from "aws-amplify";
import { uploadData } from "aws-amplify/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import amplifyconfig from "../../amplifyconfiguration.json";
import Layout from "../layout";

Amplify.configure(amplifyconfig);

const Home = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploadedSuccessfully, setFileUploadedSuccessfully] =
    useState(false);

  // file change method
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // file upload method
  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("Upload File", selectedFile, selectedFile.name);

    try {
      const result = await uploadData({
        key: selectedFile.name,
        data: selectedFile,
        options: {
          accessLevel: "guest",
        },
      }).result;

      console.log("Succeeded: ", result);
    } catch (error) {
      console.log("Error : ", error);
    }

    setSelectedFile(null);
    setFileUploadedSuccessfully(true);
  };

  // function to display the file data
  const fileData = () => {
    console.log("file selected", selectedFile);

    if (selectedFile) {
      return (
        <div>
          <h2>File Details</h2>
          <p>File Name : {selectedFile.name}</p>
          <p>File Type : {selectedFile.type}</p>
          <p>Last Modified : {selectedFile.lastModified}</p>
        </div>
      );
    } else if (fileUploadedSuccessfully) {
      return (
        <div>
          <br />
          <h4>Your File has successfully been Uploaded</h4>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose a file and then press "upload"</h4>
        </div>
      );
    }
  };
  return (
    <Layout>
      <div className="container">
        <h2>Noella File UPload System</h2>
        <h3>File UPload Wth Reactjs And Serverless API</h3>
        <div>
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}>upload</button>
        </div>
        {fileData()}
        OR
        <h1>
          <Link to="/files">
            <Button variant="primary">View Files</Button>
          </Link>
        </h1>
      </div>
    </Layout>
  );
};

export default Home;
