import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IGenericResult } from 'src/domain/interfaces/genericResult.interface';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { UserServiceImpl } from 'src/infrastructure/database/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(UserServiceImpl)
    private readonly userService: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<number[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();

    if ('user' in request) {
      const user = request['user'] as IGenericResult;
      if (!user || !user.result || !user.data) return false;
      const result = await this.userService.findById(user.data);
      if (!result) return false;
      if (!user || !requiredRoles.includes(result.roleId)) {
        throw new ForbiddenException(
          'Rights not enough to access this resource',
        );
      }
      return true;
    }
    return false;
  }
}
