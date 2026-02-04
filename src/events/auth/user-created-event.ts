import { Subjects } from '../subjects';
import { Event } from '../base-event';

// This is the CONCRETE event.
// It takes the generic Event interface and fills in the specifics:
//   - subject is locked to 'user:created'
//   - data is locked to this exact shape: { id, email, name }
//
// Think of Event as "event template", and this as "filled-out form".
export interface UserCreatedEvent extends Event {
  subject: Subjects.UserCreated;
  data: {
    id: string;
    email: string;
    name: string;
  };
}