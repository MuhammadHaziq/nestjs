import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '../roles/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<{
      headers: { authorization?: string };
      user?: { id?: number; email?: string; roles?: Role[] };
    }>();
    const token: string | undefined = request.headers?.authorization;
    if (!token) {
      return false;
    }

    // Extract user info from token
    // In a real application, you would decode and verify the JWT token here
    // For learning purposes, we'll extract basic info from the token
    try {
      // Simple token parsing (in production, use JWT library to decode and verify)
      // Assuming token format: "Bearer <token>" or just "<token>"
      const cleanToken = token.replace('Bearer ', '');

      // For learning: extract user info from token
      // In production, decode JWT and verify signature
      // For now, we'll set a default user structure
      // You can enhance this to decode actual JWT tokens
      const userInfo = this.extractUserFromToken(cleanToken);
      request.user = userInfo;
      console.log('Authenticated user:', userInfo);
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }

  private extractUserFromToken(token: string): {
    id: number;
    email: string;
    roles: Role[];
  } {
    // In a real application, decode JWT token here
    // For learning purposes, this is a simplified version
    // You would typically use: jwt.verify(token, secret) or similar

    // For now, we'll check if token contains role info or use defaults
    // This is a placeholder - replace with actual JWT decoding
    if (token.includes('admin')) {
      return {
        id: 1,
        email: 'admin@example.com',
        roles: [Role.ADMIN],
      };
    }

    // Default user role
    return {
      id: 2,
      email: 'user@example.com',
      roles: [Role.USER],
    };
  }
}
