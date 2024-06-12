import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PdfUploader from "./pages/PdfUploader";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/uploadPdf" element={<PdfUploader />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
