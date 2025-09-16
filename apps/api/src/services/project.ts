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

export const canUserAccessProject = async (
  userId: string,
  projectId: string
) => {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: { organization: true },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const membership = await db.organization.findFirst({
      where: {
        id: project.organizationId,
        members: {
          some: { id: userId },
        },
      },
    });

    if (!membership) {
      throw new Error("You do not have access to this project");
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
