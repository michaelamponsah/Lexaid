const Quote = require("../models/Quote");
const path = require("path");

// @Desc Create quote
// @Route POST /api/v1/quote/quote
// @Access Pivate

exports.createQuote = async (req, res) => {
  const { quoteCategory, quoteTitle } = req.body;
  const quoteFile = req.files.quoteFile;
  const quotes = await Quote.find();

  const errors = [];

  if (!quoteCategory || !quoteTitle) {
    /*return res
          .status(400)
          .json({ success: false, message: "Please add a quote category" }); */
    errors.push({ message: "Please fill in all fields" });
  }

  if (!quoteFile) {
    /*return res
          .status(400)
          .json({ success: false, message: "Please upload a quote file" });*/
    error.push({ message: "Please attach a file (image only)" });
  }
  // Ensure quote file is an image file only
  if (!quoteFile.mimetype.startsWith("image")) {
    /*return res
          .status(400)
          .json({ sucess: false, message: "Please upload an image" });*/
    errors.push({ message: "Only image files are allowed" });
  }

  // Check for the size of the file
  if (quoteFile.size > process.env.MAX_FILE_UPLOAD) {
    /*return res.status(400).json({
        success: false,
        message: `Please upload a file less than ${process.env.MAX_FILE_UPLOAD}`,
      }); */
    errors.push({
      message: `Please upload a file less than ${process.env.MAX_FILE_UPLOAD}`,
    });
  }

  // Create a custom file name using the format [quote_current-timestamp]
  quoteFile.name = `quote_${+new Date()}${path.parse(quoteFile.name).ext}`;

  quoteFile.mv(
    `${process.env.QUOTE_FILE_UPLOAD_PATH}/${quoteFile.name}`,
    (err) => {
      if (err) {
        console.log(err);
        /*res.status(500).json({
            success: false,
            message: "Problem with file upload",
            desc: err.message,
          }); */
        errors.push({ message: "problem with file upload" });
      }
    }
  );

  if (errors.length > 0) {
    res.render("./admin-area/quotes", {
      title: "Lexaid-Quotes",
      errors,
      quoteCategory,
      quoteFile,
      quotes: quotes,
    });
  } else {
    try {
      await Quote.create({
        title: quoteTitle,
        category: quoteCategory,
        quote: quoteFile.name,
      });
      /*return res.status(201).json({
          success: true,
          message: "Quote added successfully",
          data: quoteFile.name,
        });*/
      res.render("./admin-area/quotes", {
        title: "Lexaid-Quotes",
        success: "Quote added successfully",
        quotes: quotes,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
};

// @Desc Display all quotes
// Route GET /api/v1/quote/quotes
// Access Private
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.render("./admin-area/quotes", {
      title: "Lexaid-Briefs",
      quotes: quotes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
