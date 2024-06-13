import React from "react";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <div className="header-container">
        <h1>Welcome to PDF Uploader</h1>
      </div>
      <div className="description-container">
        <p>
          The PDF Uploader Application is a web-based tool built using the MERN
          stack (MongoDB, Express.js, React, and Node.js) that allows users to
          upload and manage PDF files. This application provides a simple and
          intuitive interface for users to upload their PDF documents, view the
          list of uploaded files, and manage their uploads efficiently.
        </p>
        <h2>Key Features:</h2>
        <ul>
          <li>
            <strong>User Authentication:</strong> Secure user login and
            registration using JWT and Passport.js.
          </li>
          <li>
            <strong>PDF Upload:</strong> Users can select and upload PDF files
            through a user-friendly interface.
          </li>
          <li>
            <strong>File Management:</strong> Uploaded PDFs are listed with
            options to view and manage them.
          </li>
          <li>
            <strong>Responsive Design:</strong> The application is designed to
            be responsive and accessible on various devices.
          </li>
        </ul>
        <h2>Frontend:</h2>
        <ul>
          <li>
            <strong>React:</strong> Utilizes React for building a dynamic and
            responsive user interface.
          </li>
          <li>
            <strong>React Router:</strong> Implements navigation and routing
            within the application.
          </li>
          <li>
            <strong>Styling:</strong> Custom CSS for a professional and
            aesthetic look.
          </li>
        </ul>
        <h2>Backend:</h2>
        <ul>
          <li>
            <strong>Node.js & Express.js:</strong> Handles server-side
            operations, including file uploads and API endpoints.
          </li>
          <li>
            <strong>MongoDB:</strong> Stores user data and metadata about the
            uploaded PDFs.
          </li>
          <li>
            <strong>JWT & Passport.js:</strong> Provides secure authentication
            mechanisms for user login and registration.
          </li>
        </ul>
        <h2>Usage:</h2>
        <ul>
          <li>
            <strong>Sign Up / Login:</strong> Users need to sign up or log in to
            access the application.
          </li>
          <li>
            <strong>Upload PDF:</strong> Users can upload PDF files using the
            upload form. The uploaded files are securely stored on the server.
          </li>
          <li>
            <strong>View Uploaded PDFs:</strong> Users can navigate to the "View
            Uploaded PDFs" section to see a list of their uploaded files.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
