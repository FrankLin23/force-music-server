import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
