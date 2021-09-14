import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UpdateUserDTO } from '../src/user/dto/update-user.dto';
import { User } from '../src/user/entities/user.entity';
import { UserRepository } from '../src/user/repository/user.repository';
import { UserService } from '../src/user/services/user.service';

describe('UserServices', () =>{
  let service : UserService;
  let repository: UserRepository;
  const mockUserRepository = () => ({
    createUser: jest.fn().mockResolvedValue('CreatedAnUser'),
    find: jest.fn().mockResolvedValue('ListOfUsers'),
    findOne: jest.fn().mockResolvedValue('OneUser'),
    update: jest.fn(),
    delete: jest.fn()

  }); 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      imports: [ConfigModule.forRoot()],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();
    service = await module.get<UserService>(UserService);
    repository = await module.get<UserRepository>(UserRepository);
  })

  describe('UserServices', () => {

    it('create an user', async () => {
      const createuser = new CreateUserDto()
      createuser.password="123456"
      const result = await service.create(createuser);
      console.log(result)
      expect(repository.createUser).toHaveBeenCalled();
      expect(result).toEqual('CreatedAnUser');
    });

    it('get all user', async () => {
      expect(repository.find).not.toHaveBeenCalled();
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual('ListOfUsers');
    });

    it('get an user by id', async () => {
      const result = await service.findOneByID(1);
      expect(repository.findOne).toHaveBeenCalled();
      expect(result).toEqual('OneUser');
    });

    it('get an user by username', async () => {
      const result = await service.findOneByName("test");
      expect(repository.findOne).toHaveBeenCalled();
      expect(result).toEqual('OneUser');
    });

    it('update user at id', async () => {
      const result = await service.update(new UpdateUserDTO(),1);
      expect(repository.update).toHaveBeenCalled();
      expect(result).toEqual({"message": "Updated", "status": 200});
    });

    it('delete user at id', async () => {
      const result = await service.delete(1);
      expect(repository.delete).toHaveBeenCalled();
      expect(result).toEqual({"message": "Deleted", "status": 200});
    });
  });
})