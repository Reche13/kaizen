import { Router } from "express";
import {
  createOrganizationRouter,
  createOrganizationSchema,
} from "./createOrganizationRouter";
import { getOrganizationRouter } from "./getOrganizationRouter";
import { validate } from "../../../middlewares/validate";

const router: Router = Router();

// CREATE ORGANIZATION
router.post("/", validate(createOrganizationSchema), createOrganizationRouter);

// GET USER ORGANIZATIONS
router.get("/", getOrganizationRouter);

export default router;
