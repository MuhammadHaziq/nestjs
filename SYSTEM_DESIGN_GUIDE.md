# System Design & Design Patterns Guide

A comprehensive guide to system design principles, patterns, and best practices with TypeScript examples.

## Table of Contents

1. [System Design Fundamentals](#system-design-fundamentals)
2. [High-Level Design (HLD)](#high-level-design-hld)
3. [Low-Level Design (LLD)](#low-level-design-lld)
4. [Design Patterns](#design-patterns)
5. [System Design Use Cases](#system-design-use-cases)
6. [Free Learning Resources](#free-learning-resources)

---

## System Design Fundamentals

### 1. Scalability

**Definition**: The ability of a system to handle increased load by adding resources.

**Types**:
- **Vertical Scaling (Scale Up)**: Adding more power to existing machines
- **Horizontal Scaling (Scale Out)**: Adding more machines to the system

### 2. Availability

**Definition**: The percentage of time a system is operational and accessible.

**Common Metrics**:
- 99.9% (Three 9s) = ~8.76 hours downtime/year
- 99.99% (Four 9s) = ~52.56 minutes downtime/year
- 99.999% (Five 9s) = ~5.26 minutes downtime/year

### 3. Reliability

**Definition**: The probability that a system will function correctly for a specified time period.

### 4. Consistency

**Types**:
- **Strong Consistency**: All nodes see the same data simultaneously
- **Weak Consistency**: System doesn't guarantee immediate consistency
- **Eventual Consistency**: System will become consistent over time

### 5. CAP Theorem

**States**: A distributed system can guarantee only 2 out of 3:
- **Consistency**: All nodes see the same data
- **Availability**: System remains operational
- **Partition Tolerance**: System continues despite network failures

### 6. Load Balancing

**Purpose**: Distribute incoming requests across multiple servers.

**Types**:
- Round Robin
- Least Connections
- IP Hash
- Weighted Round Robin

### 7. Caching

**Purpose**: Store frequently accessed data in fast storage.

**Strategies**:
- Cache-Aside (Lazy Loading)
- Write-Through
- Write-Back (Write-Behind)
- Refresh-Ahead

### 8. Database Sharding

**Definition**: Splitting a database into smaller, more manageable pieces.

**Sharding Strategies**:
- Horizontal Sharding
- Vertical Sharding
- Directory-Based Sharding

---

## High-Level Design (HLD)

### What is High-Level Design?

**High-Level Design (HLD)** is a system design approach that focuses on the overall architecture, components, and their interactions at a macro level. It provides a bird's-eye view of the system without diving into implementation details.

### Key Characteristics of HLD

1. **System Architecture**: Overall structure and organization
2. **Component Identification**: Major modules and subsystems
3. **Interfaces**: How components communicate
4. **Data Flow**: How data moves through the system
5. **Technology Stack**: High-level technology choices
6. **Scalability & Performance**: Architectural decisions for scale

### HLD Components

#### 1. System Architecture Diagrams

**Types of Architectures**:
- **Monolithic**: Single unified application
- **Microservices**: Multiple independent services
- **Service-Oriented Architecture (SOA)**: Services communicate via protocols
- **Event-Driven**: Components communicate via events
- **Layered Architecture**: Presentation, Business, Data layers

#### 2. Component Diagram

Shows major components and their relationships:
```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Client    │──────│  API Gateway│──────│   Services  │
└─────────────┘      └─────────────┘      └─────────────┘
                            │
                            │
                     ┌──────┴──────┐
                     │             │
                ┌────▼────┐   ┌───▼────┐
                │  Cache  │   │Database │
                └─────────┘   └─────────┘
```

#### 3. Deployment Diagram

Shows physical deployment of components:
- Servers
- Load balancers
- Databases
- CDN
- Message queues

### HLD Process

1. **Requirements Analysis**
   - Functional requirements
   - Non-functional requirements
   - Constraints

2. **System Architecture Design**
   - Choose architecture pattern
   - Identify major components
   - Define component interactions

3. **Technology Selection**
   - Programming languages
   - Databases
   - Caching solutions
   - Message queues
   - Cloud services

4. **Scalability Design**
   - Horizontal vs vertical scaling
   - Load balancing strategy
   - Database scaling approach

5. **Security Design**
   - Authentication/Authorization
   - Data encryption
   - Network security

### HLD Example: E-Commerce Platform

**System Architecture**:
```
┌─────────────────────────────────────────────────────────────┐
│                        CDN Layer                             │
│              (Static Assets, Images, Videos)                 │
└──────────────────────────┬───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                    Load Balancer                             │
└──────────┬──────────────┬──────────────┬────────────────────┘
           │              │              │
    ┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼─────┐
    │  Web Server │ │Web Server │ │Web Server │
    │   (Node.js) │ │ (Node.js) │ │ (Node.js) │
    └──────┬──────┘ └─────┬─────┘ └─────┬─────┘
           │              │              │
           └──────────────┼──────────────┘
                          │
           ┌──────────────┴──────────────┐
           │      API Gateway            │
           └──────────────┬──────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
  ┌─────▼─────┐    ┌─────▼─────┐    ┌─────▼─────┐
  │  Product  │    │   Order   │    │   User    │
  │  Service  │    │  Service  │    │  Service  │
  └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
           ┌──────────────┴──────────────┐
           │      Message Queue           │
           │      (RabbitMQ/Kafka)        │
           └──────────────┬──────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
  ┌─────▼─────┐    ┌─────▼─────┐    ┌─────▼─────┐
  │  Product  │    │   Order   │    │   User    │
  │  Database │    │  Database │    │  Database │
  │ (PostgreSQL)│  │(PostgreSQL)│  │(PostgreSQL)│
  └───────────┘    └───────────┘    └───────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                  ┌───────▼───────┐
                  │  Redis Cache  │
                  └───────────────┘
```

**Component Description**:

1. **CDN Layer**: Serves static content globally
2. **Load Balancer**: Distributes traffic across web servers
3. **Web Servers**: Handle HTTP requests (Node.js/NestJS)
4. **API Gateway**: Routes requests to appropriate services
5. **Microservices**: 
   - Product Service: Manages products catalog
   - Order Service: Handles order processing
   - User Service: Manages user accounts
6. **Message Queue**: Asynchronous communication between services
7. **Databases**: Each service has its own database
8. **Cache**: Redis for frequently accessed data

### HLD Example: URL Shortener (TinyURL)

**Architecture**:
```
Client → Load Balancer → Web Servers → Application Layer
                                    ↓
                              ┌─────┴─────┐
                              │           │
                         ┌────▼────┐ ┌───▼────┐
                         │  Cache  │ │Database│
                         │ (Redis) │ │(MySQL) │
                         └─────────┘ └─────────┘
```

**Components**:
- **Load Balancer**: Distributes requests
- **Web Servers**: Handle URL shortening/expansion
- **Cache**: Store frequently accessed URL mappings
- **Database**: Persistent storage for all URLs
- **ID Generator Service**: Generates unique short codes

### HLD Best Practices

1. **Start with Requirements**: Understand functional and non-functional requirements
2. **Identify Major Components**: Break system into logical components
3. **Define Interfaces**: Clearly define how components interact
4. **Consider Scalability**: Design for future growth
5. **Plan for Failure**: Include redundancy and failover mechanisms
6. **Document Decisions**: Record architectural decisions and rationale
7. **Keep It Simple**: Avoid over-engineering
8. **Consider Trade-offs**: Balance between consistency, availability, and partition tolerance

---

## Low-Level Design (LLD)

### What is Low-Level Design?

**Low-Level Design (LLD)** focuses on the detailed design of individual components, classes, functions, and data structures. It bridges the gap between high-level architecture and actual code implementation.

### Key Characteristics of LLD

1. **Class Diagrams**: Detailed class structures and relationships
2. **Sequence Diagrams**: Step-by-step interactions between objects
3. **Database Schema**: Detailed table structures and relationships
4. **API Specifications**: Detailed endpoint definitions
5. **Algorithm Design**: Specific algorithms and data structures
6. **Error Handling**: Exception handling strategies

### LLD Components

#### 1. Class Diagrams

Show classes, their attributes, methods, and relationships:
- **Inheritance**: IS-A relationship
- **Composition**: HAS-A relationship (strong)
- **Aggregation**: HAS-A relationship (weak)
- **Dependencies**: Uses relationship

#### 2. Sequence Diagrams

Show object interactions over time:
```
User → Controller → Service → Repository → Database
  │       │          │          │            │
  │       │          │          │            │
  │       │◄─────────┼──────────┼────────────┤
  │       │          │          │            │
  │◄──────┼──────────┼──────────┼────────────┤
```

#### 3. Database Schema

Detailed table structures:
- Tables and columns
- Primary keys and foreign keys
- Indexes
- Constraints
- Relationships

#### 4. API Design

Detailed endpoint specifications:
- Request/Response formats
- HTTP methods
- Status codes
- Error responses
- Authentication requirements

### LLD Process

1. **Component Breakdown**: Break HLD components into smaller modules
2. **Class Design**: Design classes with responsibilities
3. **Interface Design**: Define interfaces and contracts
4. **Data Structure Selection**: Choose appropriate data structures
5. **Algorithm Design**: Design efficient algorithms
6. **Database Design**: Design tables, indexes, and relationships
7. **API Design**: Design RESTful or GraphQL APIs
8. **Error Handling**: Design error handling strategies

### LLD Example: E-Commerce Order Service

**Class Diagram**:
```typescript
// Entity Classes
class Order {
  private id: string;
  private userId: string;
  private items: OrderItem[];
  private totalAmount: number;
  private status: OrderStatus;
  private createdAt: Date;
  private updatedAt: Date;
  
  // Methods
  calculateTotal(): number;
  updateStatus(status: OrderStatus): void;
  addItem(item: OrderItem): void;
  removeItem(itemId: string): void;
}

class OrderItem {
  private id: string;
  private productId: string;
  private quantity: number;
  private price: number;
  
  calculateSubtotal(): number;
}

enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// Service Layer
interface IOrderService {
  createOrder(userId: string, items: OrderItem[]): Promise<Order>;
  getOrder(orderId: string): Promise<Order>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>;
  cancelOrder(orderId: string): Promise<void>;
}

class OrderService implements IOrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private inventoryService: IInventoryService,
    private paymentService: IPaymentService,
    private notificationService: INotificationService
  ) {}
  
  async createOrder(userId: string, items: OrderItem[]): Promise<Order> {
    // 1. Validate items
    // 2. Check inventory
    // 3. Calculate total
    // 4. Process payment
    // 5. Create order
    // 6. Update inventory
    // 7. Send notification
  }
  
  async getOrder(orderId: string): Promise<Order> {
    return this.orderRepository.findById(orderId);
  }
  
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    order.updateStatus(status);
    await this.orderRepository.save(order);
    
    if (status === OrderStatus.SHIPPED) {
      await this.notificationService.sendShippingNotification(order);
    }
  }
  
  async cancelOrder(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    
    if (order.getStatus() === OrderStatus.DELIVERED) {
      throw new Error('Cannot cancel delivered order');
    }
    
    order.updateStatus(OrderStatus.CANCELLED);
    await this.orderRepository.save(order);
    await this.inventoryService.restoreItems(order.getItems());
    await this.paymentService.refund(order);
  }
}

// Repository Layer
interface IOrderRepository {
  findById(id: string): Promise<Order>;
  findByUserId(userId: string): Promise<Order[]>;
  save(order: Order): Promise<void>;
  delete(id: string): Promise<void>;
}

class OrderRepository implements IOrderRepository {
  constructor(private db: Database) {}
  
  async findById(id: string): Promise<Order> {
    const row = await this.db.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    );
    return this.mapToOrder(row);
  }
  
  async save(order: Order): Promise<void> {
    await this.db.query(
      `INSERT INTO orders (id, user_id, total_amount, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE SET
       total_amount = $3, status = $4, updated_at = $6`,
      [order.getId(), order.getUserId(), order.getTotalAmount(), 
       order.getStatus(), order.getCreatedAt(), new Date()]
    );
  }
  
  private mapToOrder(row: any): Order {
    // Map database row to Order object
  }
}
```

**Sequence Diagram for Create Order**:
```
User → OrderController → OrderService → OrderRepository
  │         │                │                │
  │ POST /orders             │                │
  │─────────>│                │                │
  │         │ createOrder()   │                │
  │         │───────────────>│                │
  │         │                │ validateItems()│
  │         │                │───────────────>│
  │         │                │ checkInventory()│
  │         │                │───────────────>│
  │         │                │ processPayment()│
  │         │                │───────────────>│
  │         │                │ save()         │
  │         │                │───────────────>│
  │         │                │<───────────────│
  │         │<───────────────│                │
  │<────────│                │                │
```

**Database Schema**:
```sql
-- Orders Table
CREATE TABLE orders (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);

-- Order Items Table
CREATE TABLE order_items (
  id VARCHAR(36) PRIMARY KEY,
  order_id VARCHAR(36) NOT NULL,
  product_id VARCHAR(36) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  INDEX idx_order_id (order_id),
  INDEX idx_product_id (product_id)
);
```

**API Design**:
```typescript
// REST API Endpoints

// Create Order
POST /api/orders
Request Body:
{
  "items": [
    {
      "productId": "prod-123",
      "quantity": 2,
      "price": 29.99
    }
  ]
}
Response: 201 Created
{
  "id": "order-456",
  "userId": "user-789",
  "items": [...],
  "totalAmount": 59.98,
  "status": "PENDING",
  "createdAt": "2024-01-15T10:30:00Z"
}

// Get Order
GET /api/orders/:orderId
Response: 200 OK
{
  "id": "order-456",
  "userId": "user-789",
  "items": [...],
  "totalAmount": 59.98,
  "status": "CONFIRMED",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:31:00Z"
}

// Update Order Status
PATCH /api/orders/:orderId/status
Request Body:
{
  "status": "SHIPPED"
}
Response: 200 OK

// Cancel Order
DELETE /api/orders/:orderId
Response: 200 OK
```

### LLD Example: Rate Limiter Implementation

**Class Design**:
```typescript
// Rate Limiter Interface
interface IRateLimiter {
  isAllowed(identifier: string): Promise<boolean>;
  getRemainingRequests(identifier: string): Promise<number>;
  reset(identifier: string): Promise<void>;
}

// Token Bucket Implementation
class TokenBucketRateLimiter implements IRateLimiter {
  private capacity: number;
  private refillRate: number; // tokens per second
  private storage: Map<string, TokenBucket>;

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.storage = new Map();
  }

  async isAllowed(identifier: string): Promise<boolean> {
    const bucket = this.getOrCreateBucket(identifier);
    const now = Date.now();
    
    // Refill tokens
    const timePassed = (now - bucket.lastRefill) / 1000;
    const tokensToAdd = timePassed * this.refillRate;
    bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }

    return false;
  }

  async getRemainingRequests(identifier: string): Promise<number> {
    const bucket = this.getOrCreateBucket(identifier);
    return Math.floor(bucket.tokens);
  }

  async reset(identifier: string): Promise<void> {
    this.storage.delete(identifier);
  }

  private getOrCreateBucket(identifier: string): TokenBucket {
    if (!this.storage.has(identifier)) {
      this.storage.set(identifier, {
        tokens: this.capacity,
        lastRefill: Date.now(),
      });
    }
    return this.storage.get(identifier)!;
  }
}

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

// Sliding Window Log Implementation
class SlidingWindowRateLimiter implements IRateLimiter {
  private maxRequests: number;
  private windowSize: number; // milliseconds
  private requests: Map<string, number[]>;

  constructor(maxRequests: number, windowSize: number) {
    this.maxRequests = maxRequests;
    this.windowSize = windowSize;
    this.requests = new Map();
  }

  async isAllowed(identifier: string): Promise<boolean> {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowSize
    );

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }

  async getRemainingRequests(identifier: string): Promise<number> {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowSize
    );
    return Math.max(0, this.maxRequests - validRequests.length);
  }

  async reset(identifier: string): Promise<void> {
    this.requests.delete(identifier);
  }
}

// Rate Limiter Factory
class RateLimiterFactory {
  static create(
    type: 'token-bucket' | 'sliding-window',
    config: any
  ): IRateLimiter {
    switch (type) {
      case 'token-bucket':
        return new TokenBucketRateLimiter(
          config.capacity,
          config.refillRate
        );
      case 'sliding-window':
        return new SlidingWindowRateLimiter(
          config.maxRequests,
          config.windowSize
        );
      default:
        throw new Error(`Unknown rate limiter type: ${type}`);
    }
  }
}
```

### LLD Example: Cache Implementation

**Class Design**:
```typescript
// Cache Entry Interface
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  accessCount: number;
  lastAccessed: number;
}

// Cache Interface
interface ICache<T> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<boolean>;
  clear(): Promise<void>;
  size(): Promise<number>;
}

// LRU Cache Implementation
class LRUCache<T> implements ICache<T> {
  private capacity: number;
  private cache: Map<string, CacheEntry<T>>;
  private accessOrder: string[];

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.accessOrder = [];
  }

  async get(key: string): Promise<T | null> {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check expiration
    if (Date.now() > entry.expiresAt) {
      await this.delete(key);
      return null;
    }

    // Update access order (move to end)
    this.accessOrder = this.accessOrder.filter(k => k !== key);
    this.accessOrder.push(key);

    // Update access metadata
    entry.accessCount++;
    entry.lastAccessed = Date.now();

    return entry.value;
  }

  async set(key: string, value: T, ttl: number = 3600000): Promise<void> {
    // Evict if at capacity
    if (this.cache.size >= this.capacity && !this.cache.has(key)) {
      await this.evictLRU();
    }

    const entry: CacheEntry<T> = {
      value,
      expiresAt: Date.now() + ttl,
      accessCount: 0,
      lastAccessed: Date.now(),
    };

    this.cache.set(key, entry);
    
    // Update access order
    if (!this.accessOrder.includes(key)) {
      this.accessOrder.push(key);
    }
  }

  async delete(key: string): Promise<boolean> {
    const deleted = this.cache.delete(key);
    this.accessOrder = this.accessOrder.filter(k => k !== key);
    return deleted;
  }

  async clear(): Promise<void> {
    this.cache.clear();
    this.accessOrder = [];
  }

  async size(): Promise<number> {
    return this.cache.size;
  }

  private async evictLRU(): Promise<void> {
    if (this.accessOrder.length > 0) {
      const lruKey = this.accessOrder.shift()!;
      this.cache.delete(lruKey);
    }
  }
}
```

### LLD Best Practices

1. **Single Responsibility Principle**: Each class should have one reason to change
2. **Open/Closed Principle**: Open for extension, closed for modification
3. **Dependency Inversion**: Depend on abstractions, not concretions
4. **Interface Segregation**: Many specific interfaces are better than one general interface
5. **DRY (Don't Repeat Yourself)**: Avoid code duplication
6. **SOLID Principles**: Follow SOLID design principles
7. **Design Patterns**: Use appropriate design patterns
8. **Error Handling**: Design comprehensive error handling
9. **Testing**: Design for testability
10. **Documentation**: Document complex logic and decisions

### HLD vs LLD Comparison

| Aspect | High-Level Design (HLD) | Low-Level Design (LLD) |
|--------|-------------------------|------------------------|
| **Scope** | System-wide architecture | Component/Module level |
| **Focus** | What components exist | How components work |
| **Detail Level** | Abstract, high-level | Detailed, specific |
| **Audience** | Architects, Tech Leads | Developers, Engineers |
| **Diagrams** | Architecture, Component | Class, Sequence, ER |
| **Technology** | Technology stack choices | Specific implementations |
| **Time Horizon** | Long-term | Short-term |
| **Changes** | Less frequent | More frequent |

### Design Process Flow

```
Requirements
    ↓
High-Level Design (HLD)
    ├── System Architecture
    ├── Component Identification
    ├── Technology Stack
    └── Scalability Design
    ↓
Low-Level Design (LLD)
    ├── Class Design
    ├── Database Schema
    ├── API Design
    └── Algorithm Design
    ↓
Implementation
    ├── Coding
    ├── Unit Testing
    └── Integration Testing
```

---

## Design Patterns

### 1. Singleton Pattern

**Use Case**: Ensure only one instance of a class exists (e.g., database connection, logger).

```typescript
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: any;

  private constructor() {
    // Private constructor prevents direct instantiation
    this.connection = this.initializeConnection();
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  private initializeConnection(): any {
    // Initialize database connection
    return { connected: true };
  }

  public getConnection(): any {
    return this.connection;
  }
}

// Usage
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true - same instance
```

### 2. Factory Pattern

**Use Case**: Create objects without specifying the exact class (e.g., payment processors, notification systems).

```typescript
// Product Interface
interface PaymentProcessor {
  processPayment(amount: number): void;
}

// Concrete Products
class CreditCardProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing ${amount} via Credit Card`);
  }
}

class PayPalProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing ${amount} via PayPal`);
  }
}

class CryptoProcessor implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing ${amount} via Cryptocurrency`);
  }
}

// Factory
class PaymentProcessorFactory {
  static createProcessor(type: string): PaymentProcessor {
    switch (type) {
      case 'creditcard':
        return new CreditCardProcessor();
      case 'paypal':
        return new PayPalProcessor();
      case 'crypto':
        return new CryptoProcessor();
      default:
        throw new Error(`Unknown payment type: ${type}`);
    }
  }
}

// Usage
const processor = PaymentProcessorFactory.createProcessor('paypal');
processor.processPayment(100);
```

### 3. Observer Pattern

**Use Case**: Notify multiple objects about state changes (e.g., event systems, pub/sub).

```typescript
// Observer Interface
interface Observer {
  update(data: any): void;
}

// Subject Interface
interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(data: any): void;
}

// Concrete Subject
class NewsPublisher implements Subject {
  private observers: Observer[] = [];
  private news: string = '';

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data: any): void {
    this.observers.forEach(observer => observer.update(data));
  }

  publishNews(news: string): void {
    this.news = news;
    this.notify(news);
  }
}

// Concrete Observers
class EmailSubscriber implements Observer {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  update(data: any): void {
    console.log(`Sending email to ${this.email}: ${data}`);
  }
}

class SMSSubscriber implements Observer {
  private phone: string;

  constructor(phone: string) {
    this.phone = phone;
  }

  update(data: any): void {
    console.log(`Sending SMS to ${this.phone}: ${data}`);
  }
}

// Usage
const publisher = new NewsPublisher();
const emailSub = new EmailSubscriber('user@example.com');
const smsSub = new SMSSubscriber('+1234567890');

publisher.subscribe(emailSub);
publisher.subscribe(smsSub);

publisher.publishNews('Breaking: New product launched!');
```

### 4. Strategy Pattern

**Use Case**: Define a family of algorithms and make them interchangeable (e.g., sorting, compression).

```typescript
// Strategy Interface
interface SortingStrategy {
  sort(data: number[]): number[];
}

// Concrete Strategies
class BubbleSort implements SortingStrategy {
  sort(data: number[]): number[] {
    console.log('Using Bubble Sort');
    const arr = [...data];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class QuickSort implements SortingStrategy {
  sort(data: number[]): number[] {
    console.log('Using Quick Sort');
    if (data.length <= 1) return data;
    const pivot = data[Math.floor(data.length / 2)];
    const left = data.filter(x => x < pivot);
    const middle = data.filter(x => x === pivot);
    const right = data.filter(x => x > pivot);
    return [...this.sort(left), ...middle, ...this.sort(right)];
  }
}

// Context
class Sorter {
  private strategy: SortingStrategy;

  constructor(strategy: SortingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortingStrategy): void {
    this.strategy = strategy;
  }

  sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

// Usage
const data = [64, 34, 25, 12, 22, 11, 90];
const sorter = new Sorter(new BubbleSort());
console.log(sorter.sort(data));

sorter.setStrategy(new QuickSort());
console.log(sorter.sort(data));
```

### 5. Decorator Pattern

**Use Case**: Add behavior to objects dynamically (e.g., middleware, logging).

```typescript
// Component Interface
interface Coffee {
  getCost(): number;
  getDescription(): string;
}

// Concrete Component
class SimpleCoffee implements Coffee {
  getCost(): number {
    return 5;
  }

  getDescription(): string {
    return 'Simple Coffee';
  }
}

// Base Decorator
abstract class CoffeeDecorator implements Coffee {
  protected coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost(): number {
    return this.coffee.getCost();
  }

  getDescription(): string {
    return this.coffee.getDescription();
  }
}

// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
  getCost(): number {
    return this.coffee.getCost() + 2;
  }

  getDescription(): string {
    return this.coffee.getDescription() + ', Milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  getCost(): number {
    return this.coffee.getCost() + 1;
  }

  getDescription(): string {
    return this.coffee.getDescription() + ', Sugar';
  }
}

// Usage
let coffee: Coffee = new SimpleCoffee();
console.log(coffee.getDescription(), coffee.getCost());

coffee = new MilkDecorator(coffee);
console.log(coffee.getDescription(), coffee.getCost());

coffee = new SugarDecorator(coffee);
console.log(coffee.getDescription(), coffee.getCost());
```

### 6. Adapter Pattern

**Use Case**: Allow incompatible interfaces to work together (e.g., third-party integrations).

```typescript
// Target Interface
interface PaymentGateway {
  processPayment(amount: number): boolean;
}

// Adaptee (Incompatible Interface)
class LegacyPaymentSystem {
  pay(amount: number): string {
    return amount > 0 ? 'SUCCESS' : 'FAILED';
  }
}

// Adapter
class PaymentAdapter implements PaymentGateway {
  private legacySystem: LegacyPaymentSystem;

  constructor(legacySystem: LegacyPaymentSystem) {
    this.legacySystem = legacySystem;
  }

  processPayment(amount: number): boolean {
    const result = this.legacySystem.pay(amount);
    return result === 'SUCCESS';
  }
}

// Usage
const legacySystem = new LegacyPaymentSystem();
const adapter = new PaymentAdapter(legacySystem);
const success = adapter.processPayment(100);
console.log(success); // true
```

### 7. Repository Pattern

**Use Case**: Abstract data access logic (e.g., database operations).

```typescript
// Entity
interface User {
  id: string;
  name: string;
  email: string;
}

// Repository Interface
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: Omit<User, 'id'>): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<boolean>;
}

// Concrete Repository
class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const id = Math.random().toString(36).substr(2, 9);
    const newUser: User = { id, ...user };
    this.users.set(id, newUser);
    return newUser;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const existing = this.users.get(id);
    if (!existing) throw new Error('User not found');
    const updated = { ...existing, ...user };
    this.users.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }
}

// Usage
const userRepo = new InMemoryUserRepository();
const user = await userRepo.create({ name: 'John Doe', email: 'john@example.com' });
console.log(user);
```

### 8. Command Pattern

**Use Case**: Encapsulate requests as objects (e.g., undo/redo, queuing operations).

```typescript
// Command Interface
interface Command {
  execute(): void;
  undo(): void;
}

// Receiver
class Light {
  private isOn: boolean = false;

  turnOn(): void {
    this.isOn = true;
    console.log('Light is ON');
  }

  turnOff(): void {
    this.isOn = false;
    console.log('Light is OFF');
  }

  getState(): boolean {
    return this.isOn;
  }
}

// Concrete Commands
class TurnOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOn();
  }

  undo(): void {
    this.light.turnOff();
  }
}

class TurnOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOff();
  }

  undo(): void {
    this.light.turnOn();
  }
}

// Invoker
class RemoteControl {
  private history: Command[] = [];

  executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}

// Usage
const light = new Light();
const remote = new RemoteControl();

remote.executeCommand(new TurnOnCommand(light));
remote.undo();
```

---

## System Design Use Cases

### Use Case 1: URL Shortener (like bit.ly)

**Requirements**:
- Shorten long URLs
- Redirect to original URL
- Handle 100M URLs/day
- 5-year expiration

**Design**:
```
Client → Load Balancer → Web Servers → Cache → Database
                                    ↓
                                 Analytics Service
```

**TypeScript Implementation**:

```typescript
// URL Shortener Service
class URLShortener {
  private baseUrl: string = 'https://short.ly/';
  private urlMap: Map<string, string> = new Map();
  private reverseMap: Map<string, string> = new Map();

  // Generate short code using base62 encoding
  private generateShortCode(): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 7; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  shorten(longUrl: string): string {
    // Check if URL already exists
    if (this.reverseMap.has(longUrl)) {
      return this.baseUrl + this.reverseMap.get(longUrl);
    }

    // Generate unique short code
    let shortCode: string;
    do {
      shortCode = this.generateShortCode();
    } while (this.urlMap.has(shortCode));

    // Store mapping
    this.urlMap.set(shortCode, longUrl);
    this.reverseMap.set(longUrl, shortCode);

    return this.baseUrl + shortCode;
  }

  expand(shortCode: string): string | null {
    return this.urlMap.get(shortCode) || null;
  }
}

// Usage
const shortener = new URLShortener();
const shortUrl = shortener.shorten('https://www.example.com/very/long/url');
console.log(shortUrl);
console.log(shortener.expand(shortUrl.split('/').pop()!));
```

### Use Case 2: Rate Limiter

**Requirements**:
- Limit API requests per user
- Support multiple rate limiting algorithms
- Handle millions of requests

**TypeScript Implementation**:

```typescript
// Rate Limiter Interface
interface RateLimiter {
  isAllowed(identifier: string): boolean;
}

// Token Bucket Algorithm
class TokenBucketRateLimiter implements RateLimiter {
  private capacity: number;
  private refillRate: number; // tokens per second
  private tokens: Map<string, { tokens: number; lastRefill: number }> = new Map();

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const bucket = this.tokens.get(identifier);

    if (!bucket) {
      this.tokens.set(identifier, { tokens: this.capacity - 1, lastRefill: now });
      return true;
    }

    // Refill tokens
    const timePassed = (now - bucket.lastRefill) / 1000; // seconds
    const tokensToAdd = timePassed * this.refillRate;
    bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }

    return false;
  }
}

// Sliding Window Log Algorithm
class SlidingWindowRateLimiter implements RateLimiter {
  private maxRequests: number;
  private windowSize: number; // milliseconds
  private requests: Map<string, number[]> = new Map();

  constructor(maxRequests: number, windowSize: number) {
    this.maxRequests = maxRequests;
    this.windowSize = windowSize;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];

    // Remove old requests outside the window
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowSize
    );

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
}

// Usage
const tokenBucket = new TokenBucketRateLimiter(10, 2); // 10 tokens, refill 2/sec
const slidingWindow = new SlidingWindowRateLimiter(10, 60000); // 10 requests per minute

console.log(tokenBucket.isAllowed('user1')); // true
console.log(slidingWindow.isAllowed('user1')); // true
```

### Use Case 3: Distributed Cache

**Requirements**:
- Store key-value pairs
- Support TTL (Time To Live)
- Handle cache eviction
- Thread-safe operations

**TypeScript Implementation**:

```typescript
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class DistributedCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private maxSize: number;
  private defaultTTL: number; // milliseconds

  constructor(maxSize: number = 1000, defaultTTL: number = 3600000) {
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  set(key: string, value: T, ttl?: number): void {
    // Evict if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictLRU();
    }

    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { value, expiresAt });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private evictLRU(): void {
    // Simple eviction: remove first entry
    // In production, use proper LRU algorithm
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.cache.delete(firstKey);
    }
  }

  // Cleanup expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

// Usage
const cache = new DistributedCache<string>(100, 5000); // 5 second TTL
cache.set('user:1', 'John Doe');
console.log(cache.get('user:1')); // 'John Doe'

setTimeout(() => {
  console.log(cache.get('user:1')); // null (expired)
}, 6000);
```

### Use Case 4: Message Queue

**Requirements**:
- Enqueue and dequeue messages
- Support multiple consumers
- Handle message acknowledgments
- Support priority queues

**TypeScript Implementation**:

```typescript
interface Message {
  id: string;
  content: any;
  priority: number;
  timestamp: number;
}

class MessageQueue {
  private queue: Message[] = [];
  private processing: Set<string> = new Set();

  enqueue(content: any, priority: number = 0): string {
    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      priority,
      timestamp: Date.now(),
    };

    // Insert based on priority
    let inserted = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].priority < priority) {
        this.queue.splice(i, 0, message);
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      this.queue.push(message);
    }

    return message.id;
  }

  dequeue(): Message | null {
    if (this.queue.length === 0) {
      return null;
    }

    const message = this.queue.shift()!;
    this.processing.add(message.id);
    return message;
  }

  acknowledge(messageId: string): boolean {
    return this.processing.delete(messageId);
  }

  size(): number {
    return this.queue.length;
  }

  processingCount(): number {
    return this.processing.size;
  }
}

// Usage
const queue = new MessageQueue();
queue.enqueue({ type: 'email', to: 'user@example.com' }, 1);
queue.enqueue({ type: 'sms', to: '+1234567890' }, 2);

const message = queue.dequeue();
if (message) {
  console.log('Processing:', message.content);
  queue.acknowledge(message.id);
}
```

### Use Case 5: Load Balancer

**Requirements**:
- Distribute requests across multiple servers
- Support multiple algorithms
- Health checking
- Session affinity

**TypeScript Implementation**:

```typescript
interface Server {
  id: string;
  url: string;
  isHealthy: boolean;
  activeConnections: number;
}

class LoadBalancer {
  private servers: Server[] = [];
  private algorithm: 'round-robin' | 'least-connections' | 'random';
  private currentIndex: number = 0;

  constructor(algorithm: 'round-robin' | 'least-connections' | 'random' = 'round-robin') {
    this.algorithm = algorithm;
  }

  addServer(server: Server): void {
    this.servers.push(server);
  }

  removeServer(serverId: string): void {
    this.servers = this.servers.filter(s => s.id !== serverId);
  }

  getNextServer(): Server | null {
    const healthyServers = this.servers.filter(s => s.isHealthy);
    
    if (healthyServers.length === 0) {
      return null;
    }

    switch (this.algorithm) {
      case 'round-robin':
        const server = healthyServers[this.currentIndex % healthyServers.length];
        this.currentIndex = (this.currentIndex + 1) % healthyServers.length;
        return server;

      case 'least-connections':
        return healthyServers.reduce((min, server) =>
          server.activeConnections < min.activeConnections ? server : min
        );

      case 'random':
        return healthyServers[Math.floor(Math.random() * healthyServers.length)];

      default:
        return healthyServers[0];
    }
  }

  handleRequest(): void {
    const server = this.getNextServer();
    if (server) {
      server.activeConnections++;
      console.log(`Routing request to ${server.url}`);
      // Simulate request processing
      setTimeout(() => {
        server.activeConnections--;
      }, 1000);
    } else {
      console.log('No healthy servers available');
    }
  }
}

// Usage
const lb = new LoadBalancer('least-connections');
lb.addServer({ id: '1', url: 'http://server1.com', isHealthy: true, activeConnections: 0 });
lb.addServer({ id: '2', url: 'http://server2.com', isHealthy: true, activeConnections: 0 });

lb.handleRequest();
lb.handleRequest();
```

---

## Free Learning Resources

### System Design

1. **High Scalability**
   - URL: http://highscalability.com/
   - Description: Real-world system design case studies and architectures

2. **System Design Primer (GitHub)**
   - URL: https://github.com/donnemartin/system-design-primer
   - Description: Comprehensive guide to system design with examples

3. **Gaurav Sen - YouTube**
   - URL: https://www.youtube.com/c/GauravSensei
   - Description: Excellent system design tutorials and mock interviews

4. **Tech Dummies Narendra L - YouTube**
   - URL: https://www.youtube.com/c/TechDummiesNarendraL
   - Description: System design concepts explained simply

5. **Alex Xu - System Design Interview**
   - URL: https://www.educative.io/courses/grokking-the-system-design-interview
   - Description: Free course on system design (partially free)

6. **System Design Interview - YouTube Playlist**
   - URL: https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX
   - Description: Comprehensive system design interview preparation

7. **AWS Architecture Center**
   - URL: https://aws.amazon.com/architecture/
   - Description: Real-world cloud architecture patterns

8. **Google Cloud Architecture Center**
   - URL: https://cloud.google.com/architecture
   - Description: Google Cloud system design patterns

9. **Martin Kleppmann - Designing Data-Intensive Applications**
   - URL: https://dataintensive.net/
   - Description: Book website with additional resources

10. **System Design Course - freeCodeCamp**
    - URL: https://www.freecodecamp.org/news/systems-design-for-interviews/
    - Description: Free system design course

### Design Patterns

1. **Refactoring Guru - Design Patterns**
   - URL: https://refactoring.guru/design-patterns
   - Description: Comprehensive design patterns guide with examples in multiple languages

2. **SourceMaking - Design Patterns**
   - URL: https://sourcemaking.com/design_patterns
   - Description: Design patterns explained with real-world examples

3. **Design Patterns - JavaScript**
   - URL: https://www.patterns.dev/
   - Description: Modern design patterns for JavaScript developers

4. **Addy Osmani - Learning JavaScript Design Patterns**
   - URL: https://addyosmani.com/resources/essentialjsdesignpatterns/book/
   - Description: Free online book on JavaScript design patterns

5. **TypeScript Design Patterns**
   - URL: https://github.com/torokmark/design_patterns_in_typescript
   - Description: Design patterns implemented in TypeScript

6. **Head First Design Patterns - Free Resources**
   - URL: https://www.oreilly.com/library/view/head-first-design/0596007124/
   - Description: Book companion resources

7. **Design Patterns Library**
   - URL: https://www.dofactory.com/net/design-patterns
   - Description: Design patterns with code examples

8. **JavaScript Design Patterns - Udemy (Free Courses)**
   - URL: https://www.udemy.com/topic/javascript-design-patterns/
   - Description: Free courses on JavaScript design patterns

9. **Gang of Four Design Patterns - TutorialsPoint**
   - URL: https://www.tutorialspoint.com/design_pattern/index.htm
   - Description: Free tutorials on classic design patterns

10. **Design Patterns in TypeScript - GitHub**
    - URL: https://github.com/RefactoringGuru/design-patterns-typescript
    - Description: TypeScript implementations of design patterns

### Additional Resources

1. **LeetCode System Design**
   - URL: https://leetcode.com/discuss/interview-question/system-design
   - Description: System design interview questions and discussions

2. **System Design Interview Questions**
   - URL: https://github.com/checkcheckzz/system-design-interview
   - Description: Collection of system design interview questions

3. **Distributed Systems Reading List**
   - URL: https://dancres.github.io/Pages/
   - Description: Essential reading for distributed systems

4. **System Design Cheat Sheet**
   - URL: https://github.com/vasanthk/system-design-primer
   - Description: Quick reference for system design concepts

5. **Microservices Patterns**
   - URL: https://microservices.io/patterns/
   - Description: Microservices design patterns

6. **Database Design Patterns**
   - URL: https://www.postgresql.org/docs/current/ddl-partitioning.html
   - Description: Database partitioning and design patterns

7. **Caching Strategies**
   - URL: https://aws.amazon.com/caching/best-practices/
   - Description: Best practices for caching

8. **API Design Best Practices**
   - URL: https://restfulapi.net/
   - Description: RESTful API design guidelines

9. **Scalability Patterns**
   - URL: https://www.lecloud.net/post/7295452622/scalability-for-dummies-part-1-clones
   - Description: Scalability patterns explained

10. **System Design Interview Prep**
    - URL: https://www.pramp.com/
    - Description: Practice system design interviews with peers

---

## Best Practices

### 1. Start with Requirements
- Functional requirements
- Non-functional requirements (scalability, availability, consistency)
- Constraints and assumptions

### 2. Estimate Scale
- Traffic estimates
- Storage requirements
- Bandwidth calculations

### 3. Design High-Level Architecture
- Draw components and their interactions
- Identify APIs
- Define data models

### 4. Design Deep Dive
- Database schema
- Caching strategy
- Load balancing
- Security considerations

### 5. Identify Bottlenecks
- Single points of failure
- Scalability issues
- Performance bottlenecks

### 6. Scale the Design
- Horizontal vs vertical scaling
- Database sharding
- CDN usage
- Caching layers

---

## Common System Design Patterns

### 1. Microservices Architecture
- Break monolith into smaller services
- Each service handles specific business logic
- Services communicate via APIs

### 2. Event-Driven Architecture
- Services communicate via events
- Loose coupling between services
- Better scalability

### 3. CQRS (Command Query Responsibility Segregation)
- Separate read and write operations
- Optimize for different access patterns
- Improve performance

### 4. API Gateway Pattern
- Single entry point for clients
- Handles routing, authentication, rate limiting
- Simplifies client-server communication

### 5. Circuit Breaker Pattern
- Prevent cascading failures
- Fail fast when service is down
- Automatic recovery

### 6. Saga Pattern
- Manage distributed transactions
- Compensating transactions for rollback
- Eventual consistency

---

## Conclusion

This guide provides a foundation for understanding system design and design patterns. Practice implementing these patterns and designing systems for real-world scenarios. Use the provided resources to deepen your understanding and stay updated with the latest practices.

**Key Takeaways**:
- Understand scalability, availability, and consistency trade-offs
- Master common design patterns
- Practice system design with real-world use cases
- Continuously learn from the provided resources

Happy learning! 🚀

