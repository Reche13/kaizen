import { NextFunction, Request, Response } from "express";
import {
  createOrganization,
  getUserOrganizations,
} from "../../../services/organization";
import z from "zod";
import UnauthorizedException from "../../../exceptions/unauthorized";
import AlreadyExisitsException from "../../../exceptions/alreadyExists";

export const createTaskSchema = z.object({
  name: z.string(),
});

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body as z.infer<typeof createTaskSchema>;

    if (!req.user) {
      throw new UnauthorizedException();
    }

    const userOrganizations = await getUserOrganizations(req.user.id);
    if (userOrganizations.length > 0) {
      throw new AlreadyExisitsException("User already owns an organization");
    }

    const organization = await createOrganization(name, req.user.id);

    res.status(201).json({ success: true, organization });
  } catch (error) {
    next(error);
  }
};
