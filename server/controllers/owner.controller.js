import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import { Car } from "../models/car.model.js";
import { client, uploadOnImageKit } from "../db/imagekit.js";

export const changeRoleToOwner = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { role: "owner" },
    { new: true }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Now you can list Cars"));
});




export const addCar = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    throw new ApiError(401, "Unauthorized request");
  }

  if (!req.body.carData) {
    throw new ApiError(400, "Car data is required");
  }

  let carData;
  try {
    carData = JSON.parse(req.body.carData);
  } catch (error) {
    throw new ApiError(400, "Invalid JSON format in carData");
  }

  const imageFile = req.file;

  if (!imageFile) {
    throw new ApiError(400, "Car image file is required");
  }

  const imageResponse = await uploadOnImageKit(imageFile.path);

  if (!imageResponse || !imageResponse.filePath) {
    throw new ApiError(500, "Failed to upload image to ImageKit");
  }

  const optimizedImageURL = client.helper.buildSrc({
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    src: imageResponse.filePath,
    transformation: [{ width: 1280, quality: "auto", format: "webp" }],
  });

  const car = await Car.create({
    ...carData,
    image: optimizedImageURL,
    owner: _id,
  });

  if (!car) {
    throw new ApiError(
      500,
      "Something went wrong while saving the car listing"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, car, "Car added successfully with optimized image")
    );
});



export const getOwnerCars = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id) {
        throw new ApiError(401, "Unauthorized request");
    }

    const cars = await Car.find({ owner: _id });

    return res.status(200).json(
        new ApiResponse(200, cars, "Owner cars fetched successfully")
    );
});


export const togglecarAvailability = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id) {
        throw new ApiError(401, "Unauthorized request");
    }

    const { carId } = req.body;
    if (!carId) {
        throw new ApiError(400, "Car ID is required");
    }

    const car = await Car.findById(carId);
    if (!car) {
        throw new ApiError(404, "Car not found");
    }

    if (car.owner.toString() !== _id.toString()) {
        throw new ApiError(403, "You are not authorized to modify this car");
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    return res.status(200).json(
        new ApiResponse(200, car, "Car availability toggled successfully")
    );
});


export const deleteCar = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id) {
        throw new ApiError(401, "Unauthorized request");
    }

    const { carId } = req.body;
    if (!carId) {
        throw new ApiError(400, "Car ID is required");
    }

    const car = await Car.findById(carId);
    if (!car) {
        throw new ApiError(404, "Car not found");
    }

    if (car.owner.toString() !== _id.toString()) {
        throw new ApiError(403, "Car is removed");
    }

   car.owner =null;
   car.isAvailable = false;
   await car.save()

    return res.status(200).json(
        new ApiResponse(200, car, "Car deactivated Successfully")
    );
});









