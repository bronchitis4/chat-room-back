import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwt: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        if(!token) {
            throw new UnauthorizedException("Token is undefined");
        }

        try {
            const payload = await this.jwt.verifyAsync(token)
            request['user'] = payload;
        }catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromRequest(request : Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type == "Bearer" ? token : undefined;
    }
}