import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardRepository } from './reward.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RewardRepository])],
  controllers: [RewardController],
  providers: [RewardService],
  exports: [RewardService]
})
export class RewardModule {}
