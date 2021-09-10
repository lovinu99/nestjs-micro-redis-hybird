import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { Reward } from './entities/reward.entity';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}
  
  @Post('create')
  public async create(@Body() createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward = await this.rewardService.create(createRewardDto);
    return reward;
  }

  @Get('all')
  public async findAll(): Promise<Reward[]> {
    const allReward = await this.rewardService.findAll();
    return allReward;
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<Reward> {
    const reward = await this.rewardService.findOne(id);
    return reward;
  }

  @Patch(':id')
  public async update(@Param('id') id: number, @Body() createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward = await this.rewardService.update(id, createRewardDto);
    return reward;
  }

  @Delete(':id')
  public async remove(@Param('id') id: number) {
    const deleteReward = await this.rewardService.remove(id);
    return deleteReward;
  }
}