const upload = require("../../middleware/upload");
const passport = require("passport");
const express = require("express");
const router = express.Router();

const { uploadPdf } = require("../../controllers/pdfController");

router.post(
  "/upload",
  upload.single("pdf"),
  passport.authenticate("jwt", { session: false }),
  uploadPdf
);

module.exports = router;
