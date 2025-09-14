import { NextFunction, Request, Response } from "express";

import z from "zod";
import UnauthorizedException from "../../../exceptions/unauthorized";
import { getOrganizationMembers } from "../../../services/organization";
import BadRequestException from "../../../exceptions/badRequest";
import NotFoundException from "../../../exceptions/notFound";
import { createProject } from "../../../services/project";

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const createProjectRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body as z.infer<
      typeof createProjectSchema
    >;
    const { orgId } = req.params;

    if (!orgId) throw new BadRequestException("Organization ID required");

    if (!req.user) {
      throw new UnauthorizedException();
    }

    const organization = await getOrganizationMembers(orgId);
    if (!organization) throw new NotFoundException("Organization not found");

    const isOwner = organization.ownerId === req.user.id;
    const isMember = organization.members.some((m) => m.id === req.user?.id);

    if (!isOwner && !isMember)
      throw new UnauthorizedException(
        "Not authorized to create project in this org"
      );

    const project = await createProject(orgId, name, description);

    res.status(201).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};
