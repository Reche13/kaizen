import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("<h1>API is running</h1>");
});

const PORT = process.env.PORT ?? 8000;
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
