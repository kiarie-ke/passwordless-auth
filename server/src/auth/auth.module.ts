import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import type { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Authenticator, User } from './entities/auth.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Authenticator]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): JwtModuleOptions => ({
                secret: configService.getOrThrow<string>('jwt.secret'),
                signOptions: {
                    expiresIn: '1h',
                },
            }),
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
