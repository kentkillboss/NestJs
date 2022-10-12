import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/models/users/entities/user.entities';
import { RolesGuard } from 'src/common/guards/role.guards';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard],
})
export class AuthModule {}
