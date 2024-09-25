import { UUID } from "crypto";

export interface ManagerDTO {
  id: UUID;
  fullName: string,
  email: string,
  companyId: UUID,
  confirmed: boolean
}