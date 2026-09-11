import express from 'express'
import { userVerifyJWT } from '../middleware/authUser.middleware.js';
import { addCar, changeRoleToOwner } from '../controllers/owner.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const ownerRouter = express.Router();

ownerRouter.post("/change-role", userVerifyJWT, changeRoleToOwner)
ownerRouter.post("/add-car",userVerifyJWT,upload.single("image"),addCar)

export default ownerRouter;