import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ViewPdf.css";
import { Link } from "react-router-dom";

const ViewPdf = () => {
  const [pdfs, setPdfs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    // Fetch current user's information
    axios
      .get("http://localhost:5000/api/users/currentUser", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const currentUser = response.data;
        setUserId(currentUser.id); // Assuming user ID is stored in the '_id' field
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      });
  }, []);

  useEffect(() => {
    if (!userId) return; // Wait for userId to be set

    // Fetch PDFs for the current user
    axios
      .get(`http://localhost:5000/api/pdfs/viewPdf/${userId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setPdfs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching PDFs:", error);
      });
  }, [userId]);

  const handlePdfClick = (pdf) => {
    setSelectedPdf(pdf);
  };

  const handleBackButtonClick = () => {
    setSelectedPdf(null);
  };

  return (
    <div className="pdf-viewer-container">
      {selectedPdf ? (
        <div className="pdf-viewer">
          <button className="back-button" onClick={handleBackButtonClick}>
            Back to PDF titles
          </button>
          <iframe
            className="pdf-viewer-frame"
            title="PDF Viewer"
            src={`data:application/pdf;base64,${selectedPdf.data}`}
          ></iframe>
        </div>
      ) : (
        <div className="pdf-titles">
          <Link to="/uploadPDf">Click here to Upload a PDF</Link>
          {pdfs.length === 0 ? (
            <p className="no-pdf-message">You have not uploaded any PDFs yet</p>
          ) : (
            <>
              <h1 className="pdf-titles-header">Click on Your PDF name...</h1>
              <div className="pdf-titles-list">
                {pdfs.map((pdf) => (
                  <div
                    className="pdf-title"
                    key={pdf._id}
                    onClick={() => handlePdfClick(pdf)}
                  >
                    {pdf.filename}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewPdf;
