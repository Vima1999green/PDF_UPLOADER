import React, { useState } from "react";
import axios from "axios";
import "../styles/PdfUploader.css";

function PdfUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    const token = localStorage.getItem("jwtToken");
    console.log("Token from localStorage:", token);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/pdfs/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );
      console.log("PDF uploaded successfully:", response.data);
      alert("PDF uploaded successfully!");
    } catch (error) {
      // Enhanced error logging
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response.data);
        alert(
          `Failed to upload PDF: ${
            error.response.data.message || error.response.data
          }`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
        alert("Failed to upload PDF: No response from server.");
      } else {
        // Something else happened while setting up the request
        console.error("Error message:", error.message);
        alert(`Failed to upload PDF: ${error.message}`);
      }
    }
  };

  return (
    <div className="pdf-uploader-container">
      <div className="header-container">
        <h2>Upload PDF</h2>
      </div>

      <form onSubmit={handleUploadFile}>
        <div className="field-container">
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="button-container">
          <button type="submit">Upload</button>
          <button
            type="reset"
            onClick={(e) => {
              setFile(null);
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default PdfUploader;
