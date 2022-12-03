import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() request: Request, @Res() response: Response) {
    const { username, password } = request.body;
    // const token = this.authService.createToken();
    // return response.send({
    //   code: 200,
    //   data: token
    // })
  }
}
