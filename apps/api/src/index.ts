import dotenv from "dotenv";
dotenv.config();

import cors, { CorsOptions } from "cors";

import express from "express";

import v1Router from "./routes/v1";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

const corsOptions: CorsOptions = {
  origin: ["http://localhost:3000", "https://yourdomain.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1", v1Router);

app.use(errorHandler);
const PORT = process.env.PORT ?? 8000;
app.listen(PORT, () => console.log(`api running on port ${PORT}...`));
