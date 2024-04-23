import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Complain } from "../models/complainsSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllComplains = catchAsyncErrors(async (req, res, next) => {
  const complains = await Complain.find({ expired: false });
  res.status(200).json({
    success: true,
    complains,
  });
});

export const postComplains = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Admin") {
    return next(
      new ErrorHandler("Admin not allowed to access this resource.", 400)
    );
  }
  const {
    title,
    description,
    city,
    location
  } = req.body;

  if (!title || !description || !city || !location) {
    return next(new ErrorHandler("Please provide full complain details.", 400));
  }


  const postedBy = req.user._id;
  const complain = await Complain.create({
    title,
    description,
    city,
    location,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Complains Posted Successfully!",
    complain,
  });
});

export const getMyComplains = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Admin") {
    return next(
      new ErrorHandler("Admin not allowed to access this resource.", 400)
    );
  }
  const myComplains = await Complain.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myComplains,
  });
});

export const updateComplains = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Admin") {
    return next(
      new ErrorHandler("Admin not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let complains = await Complain.findById(id);
  if (!complains) {
    return next(new ErrorHandler("OOPS! User not found.", 404));
  }
  complains = await Complain.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Complains Updated!",
  });
});

export const deleteComplains = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "User") {
    return next(
      new ErrorHandler("User not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const complains = await Complain.findById(id);
  if (!complains) {
    return next(new ErrorHandler("OOPS! Complains not found.", 404));
  }
  await complains.deleteOne();
  res.status(200).json({
    success: true,
    message: "Complain Deleted!",
  });
});

export const getSingleComplain = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const complains = await Complain.findById(id);
    if (!complains) {
      return next(new ErrorHandler("Complain not found.", 404));
    }
    res.status(200).json({
      success: true,
      complain,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
