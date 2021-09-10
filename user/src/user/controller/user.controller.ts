import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UpdateUserDTO } from '../dto/update-user.dto';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAllUser() {
        return await this.userService.findAll()
    }

    @Get(':id')
    @Roles('admin', 'user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    get(@Param() params: any) {
        return this.userService.findOneByID(params.id);
    }

    @Post()
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Roles('user', 'admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    updateUser(@Body() user: UpdateUserDTO, @Request() req: any) {
        return this.userService.update(user, req.user.id)
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteUser(@Param() id: any) {
        return this.userService.delete(id)
    }


}
