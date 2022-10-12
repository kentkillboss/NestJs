import { AuthDTO } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() data: AuthDTO) {
    return this.authService.login(data);
  }

  @Post('register')
  register(@Body() data: AuthDTO) {
    return this.authService.register(data);
  }
}
