const Blog = require("../models/BlogPost");
const Brief = require("../models/Brief");

// Controllers containing functions to process / handle routes
exports.getHomepage = async (req, res) => {
  try {
    const blogPosts = await Blog.find().sort({ date: "desc" });

    const lawOfEvidenceBriefs = await Brief.find({
      category: "Law of Evidence",
    });

    const criminalLawBriefs = await Brief.find({ category: "criminal law" });

    const civilProcedureBriefs = await Brief.find({
      category: "Civil Procedure",
    });

    const landLawBriefs = await Brief.find({
      category: "Land Law",
    });

    const constitutionalLawBriefs = await Brief.find({
      category: "Constitutional Law",
    });

    const lawOfContractBriefs = await Brief.find({
      category: "Law of Contract",
    });

    if (blogPosts == null) {
      res.render("./homepage/index", {
        title: "Lexaid",
      });
    } else {
      res.render("./homepage/index", {
        title: "Lexaid",
        blogPosts: blogPosts,
        lawOfContractBriefs: lawOfContractBriefs,
        constitutionalLawBriefs: constitutionalLawBriefs,
        landLawBriefs: landLawBriefs,
        civilProcedureBriefs: civilProcedureBriefs,
        criminalLawBriefs: criminalLawBriefs,
        lawOfEvidenceBriefs: lawOfEvidenceBriefs,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single blog view
exports.getSingleBlogPost = async (req, res) => {
  try {
    const blog = await Blog.find({ slug: req.params.slug });
    console.log(blog)
    if (blog == null) {
      res.render("./homepage/index", {
        title: "Lexaid",
      });
    } else {
      res.render("./homepage/single-blog-post", {
        title: "Lexaid-Blogs",
        blog: blog,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  
};

// PDF DOWNLOAD
exports.getPdf = (req, res) => {
  res.render("./homepage/pdf-download", {
    title: "Lexaid-Pdf Download",
  });
};
