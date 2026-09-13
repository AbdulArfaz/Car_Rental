import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import ownerRouter from "./routes/owner.routes.js";
import bookingRouter from "./routes/booking.routes.js";

const app = express();

app.use(cors(
 {
  origin: process.env.CORS_ORIGIN,
  credentials: true
})
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings",bookingRouter);


app.get("/", (req, res) => {
  res.send("Server is working");
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (statusCode !== 401) {
    console.log(err)
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || [],
  });
});

export { app };
