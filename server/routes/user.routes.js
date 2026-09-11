import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { userVerifyJWT } from "../middleware/authUser.middleware.js";

const userRouter = express.Router();

userRouter.get("/test", (req, res) => {
  res.send("user router is working");
});

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.route("/logout").post(userVerifyJWT, logoutUser)
userRouter.get("/get-data", userVerifyJWT, getUserProfile);
userRouter.route("/refreshToken").post(refreshAccessToken)


export default userRouter;
