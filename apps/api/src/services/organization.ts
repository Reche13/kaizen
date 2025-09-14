import db, { Organization } from "../libs/prisma";

export const createOrganization = async (name: string, userId: string) => {
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
