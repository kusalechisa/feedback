import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";
import userRoutes from "./router/user.js";
import feedbackRoutes from "./router/feedbacks.js";
import complaintRoutes from "./router/complaints.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/** Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");
const port = 8085;

/** API routes */
app.use("/api", router);
app.use("/api/user", userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/feedbacks", feedbackRoutes);

const buildPath = path.join(__dirname, "/client/build");
app.use(express.static(buildPath));

// Serve the React app for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

/** Start server only when we have a valid connection */
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
