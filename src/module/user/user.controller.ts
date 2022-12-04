import { Controller, Post, Req, Res, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() request: Request, @Res() response: Response) {
    const { username, password } = request.body;
    const user = await this.userService.findUserByUsername(username);
    const token = await this.authService.createToken(user);
    return response.send({
      data: token,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Req() request: Request, @Res() response: Response) {
    const token = request.headers.authorization;
    const result = await this.authService.verifyToken(token);
    const user = await this.userService.findUserByUsername(result.username);
    return response.send({
      data: user,
    });
  }
}
