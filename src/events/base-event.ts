import { Subjects } from './subjects';

// This is a TypeScript contract.
// Every event in the system MUST have:
//   1. A subject (the Kafka topic name from the Subjects enum)
//   2. A data payload (the shape depends on the specific event)
//
// Think of it like a form template: "All events need these two fields."
// The actual events (like UserCreatedEvent) will fill in the specifics.
export interface Event {
  subject: Subjects;
  data: any;
}