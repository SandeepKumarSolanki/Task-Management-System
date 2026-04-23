import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TeamLeaderGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<number[]>(ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (user.role_id !== 2) {
      throw new ForbiddenException(
        'Access denied: Only team leaders can perform this action',
      );
    }

    if (!user.is_active) {
      throw new ForbiddenException(
        'Access denied: Your account is inactive',
      );
    }

    return true;
  }
}
