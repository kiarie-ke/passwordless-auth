import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/server';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/options')
  getRegistrationOptions(
    @Body() body: { email: string },
  ): Promise<PublicKeyCredentialCreationOptionsJSON> {
    return this.authService.generateRegistrationOptions(body.email);
  }

  @Post('register/verify')
  verifyRegistration(
    @Body() body: { email: string; response: RegistrationResponseJSON },
  ) {
    return this.authService.verifyRegistration(body.email, body.response);
  }

  @Post('login/options')
  getAuthenticationOptions(
    @Body() body: { email: string },
  ): Promise<PublicKeyCredentialRequestOptionsJSON> {
    return this.authService.generateAuthenticationOptions(body.email);
  }

  @Post('login/verify')
  verifyAuthentication(
    @Body() body: { email: string; response: AuthenticationResponseJSON },
  ) {
    return this.authService.verifyAuthentication(body.email, body.response);
  }

  @Get('authenticators')
  @UseGuards(JwtAuthGuard)
  getAuthenticators(@Req() request: AuthenticatedRequest) {
    return this.authService.getAuthenticators(request.user.userId);
  }
}
