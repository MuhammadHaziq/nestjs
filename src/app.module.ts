import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';

@Module({
  imports: [UserModule, CustomerModule],
  controllers: [AppController, DatabaseController],
  providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
