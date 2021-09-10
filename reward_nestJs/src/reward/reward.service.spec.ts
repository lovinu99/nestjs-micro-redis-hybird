import { Test, TestingModule } from '@nestjs/testing';
import { RewardService } from './reward.service';
import { RewardRepository } from './reward.repository'
import { NotFoundException } from '@nestjs/common';

describe('RewardService', () => {
  let service: RewardService;
  let rewardRepository;

  const mockRewardRepository = () => ({
    createReward: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardService, {
        provide: RewardRepository,
        useFactory: mockRewardRepository
      },],
    }).compile();

    service = await module.get<RewardService>(RewardService);
    rewardRepository = await module.get<RewardRepository>(RewardRepository)
  });


  describe('createReward', ()  => {
    it('should save a reward in the database', async () => {
      rewardRepository.createReward.mockResolvedValue('someReward');
      expect(rewardRepository.createReward).not.toHaveBeenCalled();

      const createReward = {
        title: 'sample title',
        price: 'sample price'
      }

      const result = await service.create(createReward)

      expect(rewardRepository.createReward).toHaveBeenCalledWith(createReward)
      expect(result).toEqual('someReward')
    })
  })

  describe('getRewards', ()  => {
    it('should get all reward', async () => {

      const mockReward = {
        title: 'sample title',
        price: 'sample price'
      } 

      rewardRepository.findOne.mockResolvedValue(mockReward);
      expect(rewardRepository.find).not.toHaveBeenCalled();

      const result = await service.findOne(1)
      expect(result).toEqual(mockReward)

      expect(rewardRepository.findOne).toHaveBeenCalledWith(1)
    });

    it('throw an error as a reward is not found', () => {
      rewardRepository.findOne.mockResolvedValue(null)
      expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    })
  })

  describe('getReward', ()  => {
    it('should retrieve a reward with an ID', async () => {
      rewardRepository.find.mockResolvedValue('someReward');
      expect(rewardRepository.find).not.toHaveBeenCalled();

      const result = await service.findAll()

      expect(rewardRepository.find).toHaveBeenCalled()
      expect(result).toEqual('someReward')
    })
  })

  describe('deleteReward', ()  => {
    it('should delete reward', async () => {
      rewardRepository.delete.mockResolvedValue();
      expect(rewardRepository.delete).not.toHaveBeenCalled();

      await service.remove(1)

      expect(rewardRepository.delete).toHaveBeenCalledWith(1)
    })
  })
});