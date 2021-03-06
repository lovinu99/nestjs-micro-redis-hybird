import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardModule } from './reward/reward.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), RewardModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
