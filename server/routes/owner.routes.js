import express from 'express'
import { userVerifyJWT } from '../middleware/authUser.middleware.js';
import { addCar, changeRoleToOwner, deleteCar, getOwnerCars, togglecarAvailability } from '../controllers/owner.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const ownerRouter = express.Router();

ownerRouter.post("/change-role", userVerifyJWT, changeRoleToOwner)
ownerRouter.post("/add-car",userVerifyJWT,upload.single("image"),addCar)
ownerRouter.get('/cars',userVerifyJWT,getOwnerCars)
ownerRouter.post('/toggle-car',userVerifyJWT,togglecarAvailability)
ownerRouter.post('/delete-car',userVerifyJWT,deleteCar)


export default ownerRouter;