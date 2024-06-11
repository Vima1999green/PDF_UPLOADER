const Pdf = require("../models/pdfModel");

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

module.exports = { uploadPdf };
