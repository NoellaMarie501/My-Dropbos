import { Amplify } from 'aws-amplify';

import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import awsExports from './aws-exports';
import FileDisplayPage from "./components/FileDisplayPage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ValidatePage from "./components/auth/ValidatePage";
import Home from "./components/common/Home";

Amplify.configure(awsExports);

const App = () => {

  return (
        <div className="container">
          <Router>
            <Routes>
              <Route path="/validate" element={<ValidatePage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/home" element={ <Home />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/files" element={<FileDisplayPage />} />
            </Routes>
          </Router>
        </div>
  );
};

export default App;
