export type AuthPayload = {
  id: string;
  email: string;
  name: string;
  image?: string;
};

export type TaskStatus = "TODO" | "PROGRESS" | "REVIEW" | "DONE";
