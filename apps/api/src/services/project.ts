import db, { Project } from "../libs/prisma";

export const createProject = async (
  orgId: string,
  name: string,
  description?: string
): Promise<Project> => {
  try {
    const project = await db.project.create({
      data: {
        name,
        description,
        organizationId: orgId,
      },
    });

    return project;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while creating project");
  }
};
