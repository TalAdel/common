// Enum of all Kafka topic names.
// Think of this as the "master list" of all possible events in the system.
// If a topic isn't here, it doesn't exist.
export enum Subjects {
    UserCreated = 'user:created',
    
    ProductCreated = 'product:created',
    ProductUpdated = 'product:updated',
    ProductDeleted = 'product:deleted',
    
    OrderCreated = 'order:created',
    OrderUpdated = 'order:updated',
    OrderComplete = 'order:complete',
    OrderExpired = 'order:expired',
    
    PaymentComplete = 'payment:complete',
  }