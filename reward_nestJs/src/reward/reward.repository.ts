import { Repository, EntityRepository } from 'typeorm';
import { Reward } from './entities/reward.entity';
import { CreateRewardDto } from './dto/create-reward.dto';

@EntityRepository(Reward)
export class RewardRepository extends Repository<Reward> {

    public async createReward (
        createRewardDto: CreateRewardDto
    ): Promise< Reward > {

        const {title, price} = createRewardDto;
        const reward = new Reward();

        reward.title = title;
        reward.price = price;

        await reward.save();
        return reward
    }

    public async editReward (
        createRewardDto: CreateRewardDto,
        editReward: Reward
    ): Promise< Reward > {

        const {title, price} = createRewardDto;

        editReward.title = title;
        editReward.price = price;

        await editReward.save();
        return editReward
    }
}