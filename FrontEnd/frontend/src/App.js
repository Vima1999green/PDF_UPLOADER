import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PdfUploader from "./pages/PdfUploader";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ViewPdf from "./pages/ViewPdf";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  const isAuthenticated = !!localStorage.getItem("jwtToken");
  return (
    <div className="App">
      <Router>
        <Navbar style={{ position: "fixed" }} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/uploadPdf"
            element={
              isAuthenticated ? <PdfUploader /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/viewPdfs/:uploader"
            element={isAuthenticated ? <ViewPdf /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
