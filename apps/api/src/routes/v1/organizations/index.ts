import { Router } from "express";
import {
  createOrganizationRouter,
  createOrganizationSchema,
} from "./createOrganizationRouter";
import { getOrganizationRouter } from "./getOrganizationRouter";
import { validate } from "../../../middlewares/validate";
import {
  createProjectRouter,
  createProjectSchema,
} from "./createProjectRouter";
import { getSingleOrganizationRouter } from "./getSingleOrganizationRouter";

const router: Router = Router();

// CREATE ORGANIZATION
router.post("/", validate(createOrganizationSchema), createOrganizationRouter);

// GET USER ORGANIZATIONS
router.get("/", getOrganizationRouter);

// CREATE PROJECT
router.post(
  "/:orgId/projects",
  validate(createProjectSchema),
  createProjectRouter
);

// GET SINGLE ORGANIZATION
router.get("/:orgId", getSingleOrganizationRouter);

export default router;
