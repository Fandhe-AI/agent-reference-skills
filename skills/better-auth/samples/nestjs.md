# NestJS Integration

Wire Better Auth into NestJS with the community `@thallesp/nestjs-better-auth` module; routes are protected globally by default.

```ts
// main.ts — disable Nest's body parser so Better Auth can read the raw body
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const app = await NestFactory.create(AppModule, { bodyParser: false });
await app.listen(process.env.PORT ?? 3000);
```

```ts
// app.module.ts
import { Module } from "@nestjs/common";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "./auth";

@Module({
  imports: [AuthModule.forRoot({ auth })],
})
export class AppModule {}
```

```ts
// user.controller.ts
import { Controller, Get } from "@nestjs/common";
import { Session, UserSession, AllowAnonymous, OptionalAuth } from "@thallesp/nestjs-better-auth";

@Controller("users")
export class UserController {
  @Get("me")
  getProfile(@Session() session: UserSession) {
    return { user: session.user };
  }

  @Get("public")
  @AllowAnonymous()
  getPublic() {
    return { message: "Public route" };
  }
}
```

## Notes

- `@thallesp/nestjs-better-auth` is community-maintained, not a Better Auth core package
- `AuthGuard` is registered globally by `AuthModule.forRoot`; opt individual routes out with `@AllowAnonymous()` or `@OptionalAuth()`
- Fastify adapter support is currently beta
- Full docs (decorators, hooks, global guard config): github.com/ThallesP/nestjs-better-auth
