import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { CreateRewardDto } from './dto/create-reward.dto';
import { Reward } from './entities/reward.entity';
import { RewardRepository } from './reward.repository';

@Injectable()
export class RewardService {

  constructor(
    @InjectRepository(RewardRepository)
    private rewardRepository: RewardRepository
  ){}

  public async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    return await this.rewardRepository.createReward(createRewardDto);
  }

  public async findAll(): Promise<Reward[]> {
    return await this.rewardRepository.find();
  }

  public async findPossible(array: number[]): Promise<Reward[]> {
    return await this.rewardRepository.find({
      where: {
        id: In(array)
      }
    });
  }


  public async findOne(id: number): Promise<Reward> {
    const reward = await this.rewardRepository.findOne(id);
    if(!reward){
      throw new NotFoundException('Reward not found');
    }
    return reward;
  }

  public async update(id: number, createRewardDto: CreateRewardDto): Promise<Reward> {
    const editReward = await this.rewardRepository.findOne(id);
    if(!editReward){
      throw new NotFoundException('Reward not found')
    }

    return this.rewardRepository.editReward(createRewardDto, editReward);
  }

  public async remove(id: number): Promise<void> {
    await this.rewardRepository.delete(id);
  }
}
