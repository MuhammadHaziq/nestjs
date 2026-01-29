import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private connection: boolean = false;
  /** Nest Lifecycle Hooks */
  onModuleInit() {
    this.connection = true;
    console.log('Database connected');
  }
  onModuleDestroy() {
    this.connection = false;
    console.log('Database disconnected');
  }

  onApplicationBootstrap() {
    console.log('Database connected: application bootstrap');
  }

  onApplicationShutdown(signal: string) {
    this.connection = false;
    console.log('Database disconnected: source of shutdown', signal);
  }
  getStatus() {
    return this.connection;
  }
}
