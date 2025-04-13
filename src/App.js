import React from "react";
import BlogWriter from "./components/BlogWriter.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Alert,AlertHeading} from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <div >
      <header>
        <h1>Form Generation Tool!</h1>
        <p>Write your blog, then generate the output!</p>
      </header>
      <div className="container">
        <br></br>
        {/* <Alert variant="success">
          <AlertHeading>
            <h4>Blog Formatter and Generator</h4>
          </AlertHeading>
          <p>Write your blog, then generate the output!</p>
        </Alert> */}
        <BlogWriter></BlogWriter>
      </div>
    </div>
  );
}

export default App;
