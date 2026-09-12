import express from 'express'
import { changeBookingStatus, checkAvailabilityOfCars, createBooking, getOwnerBookings, getUserBookings } from '../controllers/booking.controller.js';
import { userVerifyJWT } from '../middleware/authUser.middleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityOfCars)
bookingRouter.post('/create', userVerifyJWT, createBooking)
bookingRouter.get('/user',userVerifyJWT, getUserBookings)
bookingRouter.get('/owner',userVerifyJWT, getOwnerBookings)
bookingRouter.post('/change-status',userVerifyJWT, changeBookingStatus)


export default bookingRouter;