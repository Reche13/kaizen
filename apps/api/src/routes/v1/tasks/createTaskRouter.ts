import { NextFunction, Request, Response } from "express";

import z from "zod";
import UnauthorizedException from "../../../exceptions/unauthorized";
import { canUserAccessProject } from "../../../services/project";
import NotFoundException from "../../../exceptions/notFound";
import { createTask } from "../../../services/task";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1),
  projectId: z.string().min(1, "Project ID is required"),
  assigneeId: z.string().optional(),
  dueDate: z.iso.date(),
  status: z.enum(["TODO", "PROGRESS", "REVIEW", "DONE"]).optional(),
});

export const createTaskRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, projectId, dueDate, assigneeId, status } =
      req.body as z.infer<typeof createTaskSchema>;

    if (!req.user) {
      throw new UnauthorizedException();
    }

    const userCanAccess = await canUserAccessProject(req.user.id, projectId);

    // do not specify whther the project doesnt exist or user does'nt have access
    if (!userCanAccess) throw new NotFoundException("Project not found");

    const task = createTask({
      title,
      description,
      projectId,
      createdById: req.user.id,
      assigneeId,
      dueDate: new Date(dueDate),
      status,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};
