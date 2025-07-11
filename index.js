import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: [
    "http://localhost:5173", // for development
    "https://jobjunction-samad.netlify.app/" // replace after Netlify deploy
  ], credentials: true,
};
app.use(cors(corsOption));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const startServer = async () => {
  console.log("🚀 Starting server...");
  try {
    await connectDB();
    app.listen(PORT);
    console.log(`Server connected At "http://localhost/${PORT}"`)
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();