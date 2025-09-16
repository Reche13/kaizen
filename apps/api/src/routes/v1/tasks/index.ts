import { Router } from "express";

import { validate } from "../../../middlewares/validate";
import { createTask, createTaskSchema } from "./createTaskRouter";

const router: Router = Router();

// CREATE A TASK
router.post("/", validate(createTaskSchema), createTask);

export default router;
