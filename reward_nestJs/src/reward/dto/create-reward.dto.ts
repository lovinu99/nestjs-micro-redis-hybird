import { IsString } from 'class-validator';

export class CreateRewardDto {
    @IsString()
    title: string;

    @IsString()
    price: string;
}