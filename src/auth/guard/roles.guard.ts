import { Role } from '../role/role.enum';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    
    if (!roles || roles.length === 0) {
      // No roles are specified, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    let isAllowed = false
    
    if (user) {
      for (let i = 0; i < roles.length; i++) {
        if (user.role === roles[i]) {
          isAllowed = true
        }
      }
    } else {
      console.log("Make sure Jwt Guard is applied before Role Guard")
    }

    if (isAllowed) {
      return true;
    } else {
      throw new ForbiddenException('You are not allowed to access this resource!');
    }
  }
}
