import { NextFunction, Request, Response } from "express";
import { getSingleOrganization } from "../../../services/organization";
import UnauthorizedException from "../../../exceptions/unauthorized";
import BadRequestException from "../../../exceptions/badRequest";
import NotFoundException from "../../../exceptions/notFound";

export const getSingleOrganizationRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orgId } = req.params;
    if (!orgId) throw new BadRequestException("Org Id is required");

    if (!req.user) {
      throw new UnauthorizedException();
    }

    const organization = await getSingleOrganization(orgId);

    if (!organization) throw new NotFoundException("Organization not found");

    const isOwner = organization.ownerId === req.user.id;
    const isMember = organization.members.some((m) => m.id === req.user?.id);

    if (!isOwner && !isMember)
      throw new UnauthorizedException(
        "Not authorized to access this organization"
      );

    res.status(201).json({ success: true, organization });
  } catch (error) {
    next(error);
  }
};
