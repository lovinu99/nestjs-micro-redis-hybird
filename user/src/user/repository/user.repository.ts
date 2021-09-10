import { Repository, EntityRepository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new User()
        newUser.name = createUserDto.name
        newUser.username = createUserDto.username
        newUser.password = createUserDto.password
        newUser.email = createUserDto.email
        if (createUserDto.role)
            newUser.role = createUserDto.role

        return await newUser.save()
    }

    public async getById(id: number): Promise<User> {
        return await this.findOne(id)
    }

    public async getByUsername(username: string): Promise<User> {
        return await this.findOne({ username: username })
    }

}