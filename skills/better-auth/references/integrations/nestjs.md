# NestJS Integration

Community-maintained integration of Better Auth with NestJS via `@thallesp/nestjs-better-auth`: global auth guard, decorators, and session injection.

## Signature / Usage

```bash
npm install @thallesp/nestjs-better-auth
```

```typescript
// main.ts
const app = await NestFactory.create(AppModule, { bodyParser: false });
```

## Notes

- Disable Nest's default body parser (`bodyParser: false`) so Better Auth can read raw request bodies directly
- Import `AuthModule` into the root application module, passing the Better Auth instance
- The `AuthGuard` is registered globally — all routes are protected by default unless explicitly allowed
- Decorators: `@AllowAnonymous()` permits unauthenticated access, `@OptionalAuth()` allows access with or without auth, `@Session()` injects the session into a route handler
- See the [nestjs-better-auth](https://github.com/ThallesP/nestjs-better-auth) GitHub repository for hooks and advanced configuration

## Related

- [express](./express.md)
- [fastify](./fastify.md)
