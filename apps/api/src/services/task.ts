import db, { Task } from "../libs/prisma";
import { TaskStatus } from "../types";

interface createTaskProps {
  title: string;
  description: string;
  assigneeId?: string;
  createdById: string;
  projectId: string;
  dueDate?: Date;
  status?: TaskStatus;
}

export const createTask = async ({
  title,
  description,
  assigneeId,
  createdById,
  projectId,
  dueDate,
  status,
}: createTaskProps): Promise<Task> => {
  try {
    const task = await db.task.create({
      data: {
        title,
        description,
        assigneeId,
        createdById,
        projectId,
        dueDate,
        status,
      },
    });

    return task;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while creating project");
  }
};
