import db, { Organization } from "../libs/prisma";

export const createOrganization = async (
  name: string,
  userId: string
): Promise<Organization> => {
  try {
    const organization = await db.organization.create({
      data: {
        name,
        ownerId: userId,
      },
    });

    return organization;
  } catch (error) {
    throw new Error("something went wrong in creating organization");
  }
};

export const getUserOrganizations = async (
  userId: string
): Promise<Organization[]> => {
  try {
    const organizations = await db.organization.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    });
    return organizations;
  } catch (error) {
    throw new Error("failed to get user organizations");
  }
};

export const getOrganizationMembers = async (orgId: string) => {
  try {
    const organization = await db.organization.findUnique({
      where: { id: orgId },
      select: {
        id: true,
        ownerId: true,
        members: { select: { id: true } },
      },
    });
    return organization;
  } catch (error) {
    return null;
  }
};
