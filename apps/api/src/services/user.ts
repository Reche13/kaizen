import db from "@kaizen/db/client";

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
