import api from "@/libs/api";
import { Organization } from "../../types";

interface createOrganizationResponse {
  success: boolean;
  organization: Organization;
}

interface getOrganizationResponse {
  organizations: Organization[];
}

export async function createOrganization(name: string) {
  const { data } = await api.post<createOrganizationResponse>(
    "/organizations",
    { name }
  );
  return data;
}

export async function getOrganizations() {
  const { data } = await api.get<getOrganizationResponse>("/organizations");
  return data;
}
