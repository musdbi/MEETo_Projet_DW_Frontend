import { User } from "./User";

export interface Event {
  eventId: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  description: string;
  startEvent: string;
  endEvent: string;
  organizer: User;
}

export type EventCreateInput = Omit<Event, "eventId">;
