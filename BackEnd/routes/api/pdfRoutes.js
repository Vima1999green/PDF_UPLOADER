const upload = require("../../middleware/upload");
const passport = require("passport");
const express = require("express");
const router = express.Router();

const {
  uploadPdf,
  viewUploadedPdf,
} = require("../../controllers/pdfController");

router.post(
  "/upload",
  upload.single("pdf"),
  passport.authenticate("jwt", { session: false }),
  uploadPdf
);

router.get(
  "/viewPdf/:uploader",
  passport.authenticate("jwt", { session: false }),
  viewUploadedPdf
);

module.exports = router;
