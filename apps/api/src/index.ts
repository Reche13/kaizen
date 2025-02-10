import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";

import v1Router from "./routes/v1";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>API is running</h1>");
});

app.use("/api/v1", v1Router);

const PORT = process.env.PORT ?? 8000;
app.listen(PORT, () => console.log(`api running on port ${PORT}...`));
