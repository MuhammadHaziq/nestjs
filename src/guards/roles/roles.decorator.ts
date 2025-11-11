/**
 * Decorator to set the roles for a controller or method
 * @param roles - The roles to set
 * @returns The decorator function
 */
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
