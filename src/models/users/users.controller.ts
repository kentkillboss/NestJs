import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import { UpdateUserDTO, UserDTO } from './dto/user.dto';
import { UserEntity } from './entities/user.entities';
import { UsersService } from './users.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { Role } from 'src/common/helpers/roles.enum';
import { Roles } from 'src/common/decorators/role.decorators';
import { RolesGuard } from 'src/common/guards/role.guards';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Get()
  @UseGuards(new AuthGuard())
  getUsers(): Promise<UserDTO[]> {
    return this.usersService.showAll();
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  updateUser(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
    return this.usersService.updateUser(id, userData);
  }

  @Delete()
  @Roles(Role.Admin)
  @UseGuards(new AuthGuard(), RolesGuard)
  deleteUser(@Body() data: any) {
    return this.usersService.deleteUser(data.id);
  }

  @Post('abc')
  createOtp(@Body() email: any) {
    return this.usersService.sendOtp(email);
  }

  @Post('create-password')
  createNewPassword(@Body() data: any) {
    return this.usersService.newPasswordByOtp(data);
  }
}
