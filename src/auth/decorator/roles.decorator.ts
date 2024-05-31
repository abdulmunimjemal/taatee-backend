import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Role } from '../role/role.enum';

// Example Roles decorator
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
