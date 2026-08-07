# Concepts

| Name | Description | Path |
|------|-------------|------|
| API | Better Auth provides server-side API access through the `api` object exposed on the auth instance. You can interact directly with authentication endpoints as regular function calls instead of HTTP requests. | [api.md](./api.md) |
| Client | Better Auth provides a framework-agnostic client library for frontend authentication. The core client supports React, Vue, Svelte, Solid, and vanilla JavaScript through framework-specific imports. | [client.md](./client.md) |
| CLI | Better Auth includes a built-in CLI for managing the database schema, initializing projects, generating secret keys, and collecting diagnostic information about the auth setup. | [cli.md](./cli.md) |
| Cookies | Better Auth uses cookies to store session tokens, session data, OAuth state, and other authentication-related information. All cookies are cryptographically signed using the `secret` key in the auth options or the `BETTER_AUTH_SECRET` environment variable. During rotation with versioned secrets, encrypted cookie data automatically uses the current key while still being decryptable with previous keys. | [cookies.md](./cookies.md) |
| Database | Better Auth connects to a database to store users, sessions, accounts, and verification records. It supports multiple database adapters and can operate without a database using stateless session management. | [database.md](./database.md) |
| Dynamic Base URL | Supports dynamic base URL resolution through an allowlist-based approach, letting an application operate across multiple domains and preview deployments (custom domains, Vercel previews, branch deployments, etc.) at the same time. | [dynamic-base-url.md](./dynamic-base-url.md) |
| Email | Email is a required field for all Better Auth users regardless of the auth method. The framework provides email verification, password reset, and token-based workflows. | [email.md](./email.md) |
| Hooks | Hooks intercept specific points in the auth lifecycle (before/after endpoint execution) to run custom logic, without needing to build a separate endpoint. | [hooks.md](./hooks.md) |
| OAuth | Better Auth provides built-in OAuth 2.0 and OpenID Connect support for authenticating users through popular providers such as Google, Facebook, and GitHub. Unsupported providers can be integrated with custom code via the Generic OAuth Plugin. | [oauth.md](./oauth.md) |
| Plugins | Plugins extend Better Auth's core functionality, letting you add auth methods, features, and custom behavior. Server-side plugins, client-side plugins, or both can work together. | [plugins.md](./plugins.md) |
| Rate Limit | Better Auth includes a built-in rate limiter for traffic management and abuse prevention. | [rate-limit.md](./rate-limit.md) |
| Session Management | Better Auth implements traditional cookie-based session management: sessions are stored in a cookie and validated on each request. | [session-management.md](./session-management.md) |
| TypeScript | Better Auth is designed as a type-safe auth library, with both the client and server built in TypeScript. Enabling strict mode and using the `$Infer` property for type inference is recommended. | [typescript.md](./typescript.md) |
| Users & Accounts | Better Auth provides comprehensive user and account management beyond basic authentication, including user info updates, email/password changes, account deletion with verification, token encryption, and multi-provider account linking. | [users-accounts.md](./users-accounts.md) |
