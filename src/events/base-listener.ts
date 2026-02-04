import { Consumer, EachMessagePayload } from 'kafkajs';
import { Event } from './base-event';

// Abstract base class for all listeners.
// Each concrete listener (like UserCreatedListener) will:
//   1. Specify which topic (subject) to listen to
//   2. Specify the consumer group name (Kafka's version of queue groups)
//   3. Implement onMessage() to handle the event
//
// The Kafka Consumer is injected via constructor — we don't create it here.
export abstract class BaseListener<T extends Event> {
  abstract subject: T['subject'];
  abstract groupId: string;  // Kafka's "consumer group" = NATS "queue group"
  abstract onMessage(data: T['data']): Promise<void>;

  protected consumer: Consumer;

  constructor(consumer: Consumer) {
    this.consumer = consumer;
  }

  async listen(): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: this.subject, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        console.log(`Event received: ${this.subject}`);
        
        const parsedData = this.parseMessage(message.value);
        await this.onMessage(parsedData);
      },
    });
  }

  parseMessage(data: Buffer | null): T['data'] {
    if (!data) {
      throw new Error('Received empty message');
    }
    return JSON.parse(data.toString('utf8'));
  }
}