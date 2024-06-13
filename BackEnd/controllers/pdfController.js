const Pdf = require("../models/pdfModel");
const path = require("path");
const fs = require("fs");

const uploadPdf = async (req, res) => {
  const { originalname: filename } = req.file;
  const { _id: uploader } = req.user;

  Pdf.create({ filename, uploader })
    .then(() => {
      res.status(200).send("PDF uploaded successfully");
    })
    .catch((error) => {
      res.status(500).send({ msg: error });
    });
};

const viewUploadedPdf = (req, res) => {
  const userId = req.params.uploader;
  const tokenUserId = req.user.id; //take the user id from the token
  // Check if the user ID in the token matches the requested user ID
  if (userId !== tokenUserId) {
    return res.status(403).send({ msg: "Access forbidden" });
  }
  Pdf.find({ uploader: userId })
    .then((pdfs) => {
      if (pdfs.length === 0) {
        return res
          .status(404)
          .send({ msg: "You have not uploaded any PDFs yet" });
      }
      const pdfDetails = pdfs.map((pdf) => {
        const filePath = path.join(__dirname, "../uploads", pdf.filename);
        const data = fs.readFileSync(filePath);
        return {
          filename: pdf.filename,
          data: data.toString("base64"),
        };
      });
      res.json(pdfDetails);
    })
    .catch((error) => {
      res.status(500).send({ msg: error.message });
    });
};

module.exports = { uploadPdf, viewUploadedPdf };
