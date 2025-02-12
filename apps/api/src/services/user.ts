import db, { Account } from "@kaizen/db/client";
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

export const updateUserEmailVerify = async (
  email: string,
  emailVerified: boolean
) => {
  try {
    const user = await db.user.update({
      where: { email },
      data: {
        emailVerified: emailVerified,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error("Something went wrong in updating user email verified");
  }
};

export const upsetUserAccount = async (
  data: Pick<Account, "userId" | "provider" | "providerAccountId">
) => {
  try {
    const account = await db.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: data.provider,
          providerAccountId: data.providerAccountId,
        },
      },
      update: {},
      create: {
        provider: data.provider,
        providerAccountId: data.providerAccountId,
        userId: data.userId,
      },
    });
    return account;
  } catch (error: any) {
    throw new Error("Something went wrong in creating user account");
  }
};
