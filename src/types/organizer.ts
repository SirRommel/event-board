import { UUID } from "crypto";
import { ManagerDTO } from "./manager";

export interface OrganizerDTO {
  id: UUID;
  name: string;
  managers: ManagerDTO[];
}