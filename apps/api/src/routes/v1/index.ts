import { Router } from "express";
import authRouter from "./auth";
import organizationsRouter from "./organizations";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router: Router = Router();

router.use("/auth", authRouter);

router.use("/organizations", authMiddleware, organizationsRouter);

export default router;
