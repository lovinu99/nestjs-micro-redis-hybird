import { Controller, Get } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, MessagePattern, Transport } from '@nestjs/microservices';
import { RewardService } from 'src/reward/reward.service';

@Controller('user')
export class UserController {
    client: ClientProxy

    constructor(
        private rewardService: RewardService
    ) {
        this.client = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                url: 'redis://localhost:6379',
            },
        })
    }

    @Get('owner')
    async getOwn() {
        const pattern = { cmd: "owner" }
        console.log("enterd")
        return await this.client.send<number>(pattern, 1)
    }
    @Get('awarder')
    async getAllReward() {
        const pattern = { cmd: "awarder" }
        console.log("enterd")
        return await this.client.send<number[]>(pattern, [1,2,3])
    }

    // 
    @MessagePattern({ cmd: "allReward" }, Transport.REDIS)
    async getRewardOwner() {
        return await this.rewardService.findAll()
    }

    // cột id bên t bỏ int, bên m dùng uuid nên tìm k dc mấy cái trong array
    // m chỉnh lại cái hàm findPossible cho nó cái điều kiện gì cũng dc
    @MessagePattern({ cmd: "posibleReward" }, Transport.REDIS)
    async getAwardUsers(array: number[]) {
        return await this.rewardService.findPossible(array)
    }
}
