const Blog = require("../models/BlogPost");
const slugify = require("slugify");

// @Desc Get all blog posts
// @Route GET /api/v1/blog/blog
// @Access Private
exports.getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render("./admin-area/blog", {
      title: "Lexaid-Blog",
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @Desc Create Blog
// Route POST /api/v1/blog/blog
// Access Private
exports.createBlog = async (req, res) => {
  const { postTitle, postAuthor, postBody } = req.body;
  const blogs = await Blog.find();
  const errors = [];

  const slug = slugify(postTitle, { lower: true, strict: true });

  // console.log(postTitle, postAuthor, postBody);

  if (!postTitle || !postAuthor || !postBody) {
    errors.push({
      message: "Please fill in all required fields",
    });
  }
  if (errors.length > 0) {
    res.render("./admin-area/blog", {
      title: "Lexaid-Blog",
      errors,
      postTitle,
      postAuthor,
      postBody,
      blogs: blogs,
    });
  } else {
    try {
      await Blog.create({
        title: postTitle,
        author: postAuthor,
        body: postBody,
        slug: slug,
      });
      res.render("./admin-area/blog", {
        title: "Lexaid-Blog",
        success: "Blog post created successfully",
        blogs: blogs,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
