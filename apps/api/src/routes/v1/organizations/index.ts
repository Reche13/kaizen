import { Router } from "express";
import {
  createOrganizationRouter,
  createOrganizationSchema,
} from "./createOrganizationRouter";
import { validate } from "../../../middlewares/validate";

const router: Router = Router();

// CREATE ORGANIZATION
router.post("/", validate(createOrganizationSchema), createOrganizationRouter);

export default router;
