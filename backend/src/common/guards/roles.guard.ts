import { ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { required } from "joi";
import { ROLES_KEY } from "../decorators/roles.decorator";



@Injectable() 
export class RolesGuard {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<number[]>(
            ROLES_KEY,
            [
                context.getHandler(), context.getClass()
            ]
        );
        if(!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if(!user.is_active) {
            throw new ForbiddenException('Admin is inactive');
        }

        if(!requiredRoles.includes(user.role_id)) {
            throw new ForbiddenException('Permission denied');
        }
        return true;
    }
}