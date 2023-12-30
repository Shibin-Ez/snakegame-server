import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import cors from "cors";
import helmet from "helmet";

import recordRoutes from "./routes/record.js";


// CONFIGURATIONS
const app = express();
app.use(express.json());
dotenv.config();
app.use(helmet()); // if not used with helmet, cors will not work
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something broke!");
});

// ROUTES`
app.use("/records", recordRoutes);


app.listen(3001, () => console.log("Server running on port 3001"));