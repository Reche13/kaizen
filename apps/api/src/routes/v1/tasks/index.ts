import { Router } from "express";

import { validate } from "../../../middlewares/validate";
import { createTaskRouter, createTaskSchema } from "./createTaskRouter";

const router: Router = Router();

// CREATE A TASK
router.post("/", validate(createTaskSchema), createTaskRouter);

export default router;
