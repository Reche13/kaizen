import db from "@kaizen/db/client";
import AlreadyExisitsException from "../exceptions/alreadyExists";

export const getUserbyEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      console.log("user not found: ", email);
      return null;
    }
    return user;
  } catch (error) {
    console.log("Error in getting user by email:", email);
    return null;
  }
};

export const createUser = async (
  name: string,
  email: string,
  hashedPassword: string
) => {
  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return user;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new AlreadyExisitsException("user with this email already exists");
    }
    throw new Error("Something went wrong in creating user");
  }
};
