import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, EntityManager, getManager, In, Repository, Transaction, TransactionManager } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { response } from 'express';
import { UserRepository } from '../repository/user.repository';
import { async } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private repository: UserRepository
    ) { }


    async create(user: CreateUserDto): Promise<User> {
        const hashPassword = bcrypt.hashSync(user.password, parseInt(process.env.SALTROUNDS))
        user.password = hashPassword
        return await this.repository.createUser(user)
    }

    async findAll(name: string): Promise<User[]> {
        return await this.repository.find();
    }

    async findWithFilter(query: any): Promise<User[]> {
        return await this.repository.findUserWithFilter(query)
    }

    async findOneByID(id: number): Promise<User> {
        return await this.repository.findOne(id)
    }

    async findByIdList(ids: number[]): Promise<User[]> {
        return await this.repository.find({
            where: {
                id: In(ids)
            }
        })
    }

    async findOneByName(name: string): Promise<User> {
        return await this.repository.findOne({ username: name })
    }



    async update(updateData: UpdateUserDTO, userId: number): Promise<any> {
        return await this.repository.updateUser(updateData, userId)
    }

    async delete(userId: number): Promise<any> {
        return await this.repository.deleteUser(userId)
    }

}
