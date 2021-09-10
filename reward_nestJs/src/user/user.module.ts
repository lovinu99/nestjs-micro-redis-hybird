import { Module } from '@nestjs/common';
import { RewardModule } from 'src/reward/reward.module';
import { RewardService } from 'src/reward/reward.service';
import { UserController } from './user.controller';

@Module({
  imports: [RewardModule],
  controllers: [UserController]
})
export class UserModule {}
