import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";

import v1Router from "./routes/v1";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/v1", v1Router);

app.use(errorHandler);
const PORT = process.env.PORT ?? 8000;
app.listen(PORT, () => console.log(`api running on port ${PORT}...`));
