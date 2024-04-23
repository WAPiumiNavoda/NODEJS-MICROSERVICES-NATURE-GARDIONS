import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Feedback } from "../models/feedbackSchema.js";

 
export const postFeedback = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Admin") {
    return next(
      new ErrorHandler("Admin not allowed to access this resource.", 400)
    );
  }
  const {
    name,
    email,
    phone,
    address,
    feedbackComment,
  } = req.body;

  if (!name || !email ||  !phone ||!address || !feedbackComment ) {
    return next(new ErrorHandler("Please provide full post details.", 400));
  }

  const postedBy = req.user._id;
  const feedback = await Feedback.create({
    name,
    email,
    phone,
    address,
    feedbackComment,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Feedback Posted Successfully!",
    feedback,
  });
});

 
export const GetAllFeedback  = catchAsyncErrors(async (req, res, next) => {
  const feedback = await Feedback.find();
  res.status(200).json({
    success: true,
    feedback,
  });
});
 
export const userGetAllFeedback = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    console.log("Feedback appplied user ------- " + req.user);
    if (role === "Admin") {
      return next(
        new ErrorHandler("Admin not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const feedback = await Feedback.find({ "feedbackId.user": _id });
    res.status(200).json({
      success: true,
      feedback,
    });
  }
);
 
export const userDeleteFeedback = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    console.log("Feedback appplied user ------- " + req.user);
    if (role === "Admin") {
      return next(
        new ErrorHandler("Admin not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return next(new ErrorHandler("Feedback not found!", 404));
    }
    await feedback.deleteOne();
    res.status(200).json({
      success: true,
      message: "Feedback Deleted!",
    });
  }
);