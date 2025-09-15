import api from "@/libs/api";
import { Organization } from "@/types";

interface createOrganizationResponse {
  success: boolean;
  organization: Organization;
}

interface getOrganizationsResponse {
  success: boolean;
  organizations: Omit<Organization, "projects">[];
}

interface getSingleOrganizationResponse {
  success: boolean;
  organization: Organization;
}

export async function createOrganization(name: string) {
  const { data } = await api.post<createOrganizationResponse>(
    "/organizations",
    { name }
  );
  return data;
}

export async function getOrganizations() {
  const { data } = await api.get<getOrganizationsResponse>("/organizations");
  return data;
}

export async function getSingleOrganization(orgId: string) {
  const { data } = await api.get<getSingleOrganizationResponse>(
    `/organizations/${orgId}`
  );
  return data;
}
