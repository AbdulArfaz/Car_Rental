import { Booking } from "../models/booking.model.js";
import { Car } from "../models/car.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const checkAvailability = async (carId, pickupDate, returnDate) => {
  try {
    const bookings = await Booking.find({
      car: carId,
      pickupDate: { $lte: returnDate },
      returnDate: { $gte: pickupDate },
    });
    return bookings.length === 0;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while checking car availability"
    );
  }
};

export const checkAvailabilityOfCars = asyncHandler(async (req, res) => {
  const { location, pickupDate, returnDate } = req.body;

  if (!location || !pickupDate || !returnDate) {
    throw new ApiError(
      400,
      "Location, pickupDate, and returnDate are all required"
    );
  }

  const cars = await Car.find({ location, isAvailable: true });

  const availableCarsPromises = cars.map(async (car) => {
    const isAvailable = await checkAvailability(
      car._id,
      pickupDate,
      returnDate
    );
    return { ...car._doc, isAvailable };
  });

  const evaluatedCars = await Promise.all(availableCarsPromises);
  const availableCars = evaluatedCars.filter((car) => car.isAvailable === true);

  return res
    .status(200)
    .json(
      new ApiResponse(200, availableCars, "Available cars fetched successfully")
    );
});

export const createBooking = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { car, pickupDate, returnDate } = req.body;

  if (!car || !pickupDate || !returnDate) {
    throw new ApiError(400, "Car, pickupDate, and returnDate are required");
  }

  const isAvailable = await checkAvailability(car, pickupDate, returnDate);
  if (!isAvailable) {
    throw new ApiError(400, "Car is not available");
  }

  const carData = await Car.findById(car);
  if (!carData) {
    throw new ApiError(404, "Car not found");
  }

  const picked = new Date(pickupDate);
  const returned = new Date(returnDate);
  const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));

  const rentalDays = noOfDays <= 0 ? 1 : noOfDays;
  const price = carData.pricePerDay * rentalDays;

  const booking = await Booking.create({
    car,
    owner: carData.owner,
    user: _id,
    pickupDate,
    returnDate,
    price,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Car booked successfully"));
});

export const getUserBookings = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const bookings = await Booking.find({ user: _id })
    .populate("car")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "User bookings fetched successfully"));
});

export const getOwnerBookings = asyncHandler(async (req, res) => {
  if (req.user.role !== "owner") {
    throw new ApiError(403, "Unauthorized access. Owner role required.");
  }

  const bookings = await Booking.find({ owner: req.user._id })
    .populate("car")
    .populate({
      path: "user",
      select: "-password -refreshToken",
    })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(200, bookings, "Owner bookings fetched successfully")
    );
});

export const changeBookingStatus = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bookingId, status } = req.body;

  if (!bookingId || !status) {
    throw new ApiError(400, "Booking ID and status are required");
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.owner.toString() !== _id.toString()) {
    throw new ApiError(
      403,
      "Unauthorized access. You do not own this booking."
    );
  }

  booking.status = status;
  await booking.save();

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking status updated successfully"));
});
