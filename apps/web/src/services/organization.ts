import api from "@/libs/api";
import { Organization } from "../../types";

interface createOrganizationResponse {
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
