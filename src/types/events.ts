import { UUID } from "crypto";
import { OrganizerDTO } from "./organizer";

export interface DataType {
  id: UUID;
  name: string;
  description: string;
  startDate: string,
  place: string,
  organizer: OrganizerDTO;
}

export interface EventDTO {
  status: string;
  message?: string;
  data: DataType;
}