export type Organization = {
  name: string;
  id: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  projects: Project[];
  members: Member[];
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
};

export type Member = {
  id: string;
  name: string;
  image: string;
  email: string;
};
