import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [DatabaseModule, BusinessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
