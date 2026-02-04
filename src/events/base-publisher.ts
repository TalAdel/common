import { Producer } from 'kafkajs';
import { Event } from './base-event';

// Abstract base class for all publishers.
// Each concrete publisher (like UserCreatedPublisher) will:
//   1. Specify which topic (subject) it publishes to
//   2. Call publish() with the typed data
//
// The Kafka Producer is injected via constructor — we don't create it here.
export abstract class BasePublisher<T extends Event> {
  abstract subject: T['subject'];
  protected producer: Producer;

  constructor(producer: Producer) {
    this.producer = producer;
  }

  async publish(data: T['data']): Promise<void> {
    await this.producer.send({
      topic: this.subject,
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
    });

    console.log(`Event published to topic: ${this.subject}`);
  }
}