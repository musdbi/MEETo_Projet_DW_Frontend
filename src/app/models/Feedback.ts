import { User } from "./User";
import { Event } from "./event";

export interface Feedback {
    event: Event;
    user: User;
    rating : number;
}
  