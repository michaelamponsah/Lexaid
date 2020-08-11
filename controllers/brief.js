const Brief = require("../models/Brief");
const path = require("path");

// @Desc Get all briefs
// @Route GET /api/v1/brief/brief
// @Access Private
exports.getBriefs = async (req, res) => {
    try {
      const briefs = await Brief.find();
      res.render("./admin-area/briefs", {
        title: "Lexaid-Briefs",
        briefs: briefs,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // @Desc Create brief
  // @Route POST /api/v1/brief/brief
  // @Access Private
  exports.createBrief = async (req, res) => {
    const { briefCategory, subCategory, briefTitle } = req.body;
    const briefFile = req.files.briefFile;
    const briefs = await Brief.find();
  
    const errors = [];
  
    if (!briefCategory || !briefTitle) {
      /*return res.status(400).json({
          success: false,
          message: "Brief category or Title cannot be empty",
        }); */
      errors.push({ message: "Please fill in all fields" });
    }
  
    if (!briefFile) {
      /*return res
          .status(400)
          .json({ success: false, message: "Please upload a file (pdf)" });*/
      errors.push({ message: "Please upload a file (pdf)" });
    }
  
    // Make sure that the file is a pdf
    if (!briefFile.mimetype.endsWith("pdf")) {
      /*return res
          .status(400)
          .json({ success: false, message: "Please upload pdf only" });*/
      errors.push({ message: "Please upload pdf only" });
    }
  
    // Check file size
    if (briefFile.size > process.env.MAX_FILE_UPLOAD) {
      /*return res.status(400).json({
          success: false,
          message: `Please upload a file less than ${process.env.MAX_FILE_UPLOAD}`,
        });*/
      errors.push({
        message: `Please upload a file less than ${process.env.MAX_FILE_UPLOAD}`,
      });
    }
  
    // Create custom file name using the format [brief_current_timestamp]
    briefFile.name = `brief_${+new Date()}${path.parse(briefFile.name).ext}`;
  
    briefFile.mv(
      `${process.env.BRIEF_FILE_UPLOAD_PATH}/${briefFile.name}`,
      (err) => {
        if (err) {
          console.log(err);
          /*return res
              .status(500)
              .json({ success: false, message: "Problem with file upload" }); */
          errors.push({ message: "Problem with file upload" });
        }
      }
    );
  
    if (errors.length > 0) {
      res.render("./admin-area/briefs", {
        title: "Lexaid-Briefs",
        errors: errors,
        briefCategory,
        subCategory,
        briefTitle,
        briefFile,
        briefs: briefs,
      });
    } else {
      try {
        await Brief.create({
          category: briefCategory,
          subCategory: subCategory,
          title: briefTitle,
          brief: briefFile.name,
        });
        /*res.status(201).json({
          success: true,
          data: briefFile.name,
          message: "Brief added successfully",
        });*/
        res.render("./admin-area/briefs", {
          title: "Lexaid-Briefs",
          success: "Brief added successfully",
          briefs: briefs,
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  };
  