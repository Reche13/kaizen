import { NextFunction, Request, Response } from "express";
import { getUserOrganizations } from "../../../services/organization";
import UnauthorizedException from "../../../exceptions/unauthorized";

export const getOrganizationRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const organizations = await getUserOrganizations(req.user.id);

    res.status(201).json({ success: true, organizations });
  } catch (error) {
    next(error);
  }
};
