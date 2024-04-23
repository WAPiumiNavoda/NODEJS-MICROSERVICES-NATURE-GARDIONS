import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Article} from "../models/articleSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllArticles = catchAsyncErrors(async (req, res, next) => {
  const articles = await Article.find();
  res.status(200).json({
    success: true,
    articles,
  });
});

export const postArticle = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "User") {
    return next(
      new ErrorHandler("User not allowed to access this resource.", 400)
    );
  }
  const {
    title,
    description,
  } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler("Please provide full post details.", 400));
  }

  const postedBy = req.user._id;
  const article = await Article.create({
    title,
    description,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Article Posted Successfully!",
    article,
  });
});

export const updateArticle = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "User") {
    return next(
      new ErrorHandler("User not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let article = await Article.findById(id);
  if (!article) {
    return next(new ErrorHandler("OOPS! Tech Article not found.", 404));
  }
  article = await Article.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Tech Article Updated!",
  });
});

export const deleteArticle = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "User") {
    return next(
      new ErrorHandler("User not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const article = await Article.findById(id);
  if (!article) {
    return next(new ErrorHandler("Tech Article not found.", 404));
  }
  await Article.deleteOne();
  res.status(200).json({
    success: true,
    message: "Tech Article Deleted!",
  });
});

export const getSingleArticle = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (!article) {
      return next(new ErrorHandler("Article not found.", 404));
    }
    res.status(200).json({
      success: true,
      article,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});