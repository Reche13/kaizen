import { NextFunction, Request, Response } from "express";
import { createOrganization } from "../../../services/organization";
import z from "zod";
import UnauthorizedException from "../../../exceptions/unauthorized";

export const createOrganizationSchema = z.object({
  name: z.string(),
});

export const createOrganizationRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body as z.infer<typeof createOrganizationSchema>;

    if (!req.user) {
      throw new UnauthorizedException();
    }
    const organization = await createOrganization(name, req.user.id);

    res.status(201).json({ success: true, organization });
  } catch (error) {
    next(error);
  }
};
