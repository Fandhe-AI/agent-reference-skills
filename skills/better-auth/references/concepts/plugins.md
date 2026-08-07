# Plugins

Plugins extend Better Auth's core functionality, letting you add auth methods, features, and custom behavior. Server-side plugins, client-side plugins, or both can work together.

## Signature / Usage

### Setup

**Server config:**

```typescript
export const auth = betterAuth({
  plugins: [
    // Add plugins here
  ],
});
```

**Client config:**

```typescript
const authClient = createAuthClient({
  plugins: [
    // Add client plugins here
  ],
});
```

Best practice: keep the auth client and the server auth instance in separate files.

### Creating a server plugin

The minimum requirement is an object with a unique `id` property that satisfies the `BetterAuthPlugin` interface. Wrapping it in a function allows passing options:

```typescript
export const myPlugin = () => {
  return {
    id: "my-plugin",
  } satisfies BetterAuthPlugin;
};
```

### Endpoints

Use `createAuthEndpoint` from `better-auth/api` to create an endpoint:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    endpoints: {
      getHelloWorld: createAuthEndpoint(
        "/my-plugin/hello-world",
        {
          method: "GET",
        },
        async (ctx) => {
          return ctx.json({
            message: "Hello World",
          });
        }
      ),
    },
  } satisfies BetterAuthPlugin;
};
```

### Schema

Define database tables via a `schema` object keyed by table name:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    schema: {
      myTable: {
        fields: {
          name: {
            type: "string",
          },
        },
        modelName: "myTable", // optional
      },
    },
  } satisfies BetterAuthPlugin;
};
```

**Auto-inference:** Adding fields to the `user` or `session` table automatically infers their types in the `getSession()` and `signUpEmail()` responses.

**Security note:** Do not store sensitive data on the `user` or `session` tables — create a separate table instead.

### Hooks

Hooks run before or after actions from client or server calls:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    hooks: {
      before: [
        {
          matcher: (context) => {
            return context.headers.get("x-my-header") === "my-value";
          },
          handler: createAuthMiddleware(async (ctx) => {
            return {
              context: ctx, // Modify context as needed
            };
          }),
        },
      ],
      after: [
        {
          matcher: (context) => {
            return context.path === "/sign-up/email";
          },
          handler: createAuthMiddleware(async (ctx) => {
            return ctx.json({
              message: "Hello World",
            }); // Modify response as needed
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin;
};
```

### Middleware

Middleware runs only on API requests from a client (not on direct endpoint calls):

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    middlewares: [
      {
        path: "/my-plugin/hello-world",
        middleware: createAuthMiddleware(async (ctx) => {
          // Custom logic
        }),
      },
    ],
  } satisfies BetterAuthPlugin;
};
```

You can stop the request by throwing `APIError` or returning a `Response` object.

### onRequest / onResponse

**`onRequest`:** Runs before the request. Returning nothing continues, returning `{ response }` short-circuits, and returning a modified `request` changes the request.

**`onResponse`:** Runs after the response is generated. Return a modified response, or nothing to send it as-is.

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    onRequest: async (request, context) => {
      // Do something
    },
    onResponse: async (response, context) => {
      // Do something
    },
  } satisfies BetterAuthPlugin;
};
```

### Rate limit

Define custom rate limit rules with a path matcher:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    rateLimit: [
      {
        pathMatcher: (path) => {
          return path === "/my-plugin/hello-world";
        },
        limit: 10,
        window: 60,
      },
    ],
  } satisfies BetterAuthPlugin;
};
```

### Trusted origins

Use `isTrustedOrigin()` to validate custom endpoints against configured trusted origins:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    trustedOrigins: ["http://trusted.com"],
    endpoints: {
      getTrustedHelloWorld: createAuthEndpoint(
        "/my-plugin/hello-world",
        {
          method: "GET",
          query: z.object({
            url: z.string(),
          }),
        },
        async (ctx) => {
          if (
            !ctx.context.isTrustedOrigin(ctx.query.url, {
              allowRelativePaths: false,
            })
          ) {
            throw new APIError("FORBIDDEN", {
              message: "origin is not trusted.",
            });
          }

          return ctx.json({
            message: "Hello World",
          });
        }
      ),
    },
  } satisfies BetterAuthPlugin;
};
```

### Server plugin helper functions

**`getSessionFromCtx`:** Gets the client session data from the auth middleware context:

```typescript
const myPlugin = {
  id: "my-plugin",
  hooks: {
    before: [
      {
        matcher: (context) => {
          return context.headers.get("x-my-header") === "my-value";
        },
        handler: createAuthMiddleware(async (ctx) => {
          const session = await getSessionFromCtx(ctx);
          return {
            context: ctx,
          };
        }),
      },
    ],
  },
} satisfies BetterAuthPlugin;
```

**`sessionMiddleware`:** Validates the client session and adds session data to the context:

```typescript
const myPlugin = () => {
  return {
    id: "my-plugin",
    endpoints: {
      getHelloWorld: createAuthEndpoint(
        "/my-plugin/hello-world",
        {
          method: "GET",
          use: [sessionMiddleware],
        },
        async (ctx) => {
          const session = ctx.context.session;
          return ctx.json({
            message: "Hello World",
          });
        }
      ),
    },
  } satisfies BetterAuthPlugin;
};
```

### Creating a client plugin

Client plugins interface with server functionality and make requests using Better Fetch:

```typescript
export const myPluginClient = () => {
  return {
    id: "my-plugin",
  } satisfies BetterAuthClientPlugin;
};
```

### Endpoint inference

Use `$InferServerPlugin` to automatically infer server endpoints. kebab-case paths convert to camelCase (e.g. `/my-plugin/hello-world` -> `myPlugin.helloWorld`):

```typescript
const myPluginClient = () => {
  return {
    id: "my-plugin",
    $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
  } satisfies BetterAuthClientPlugin;
};
```

### Custom actions

Use `$fetch` inside the `getActions` function to define additional methods:

```typescript
const myPluginClient = {
  id: "my-plugin",
  $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
  getActions: ($fetch) => {
    return {
      myCustomAction: async (
        data: { foo: string },
        fetchOptions?: BetterFetchOption
      ) => {
        const res = $fetch("/custom/action", {
          method: "POST",
          body: {
            foo: data.foo,
          },
          ...fetchOptions,
        });
        return res;
      },
    };
  },
} satisfies BetterAuthClientPlugin;
```

**Guideline:** each function should take one argument, with an optional second argument for fetch options. Return an object with `data` and `error` keys.

### Custom atoms (hooks)

Create reusable hooks using nanostores:

```typescript
const myPluginClient = {
  id: "my-plugin",
  $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
  getAtoms: ($fetch) => {
    const myAtom = atom<null>();
    return {
      myAtom,
    };
  },
} satisfies BetterAuthClientPlugin;
```

### Path method override

Override the default HTTP method (GET for requests without a body, otherwise POST):

```typescript
const myPluginClient = {
  id: "my-plugin",
  $InferServerPlugin: {} as ReturnType<typeof myPlugin>,
  pathMethods: {
    "/my-plugin/hello-world": "POST",
  },
} satisfies BetterAuthClientPlugin;
```

## Options / Props

### Plugin capabilities

- Create custom endpoints for arbitrary actions
- Extend database tables with a custom schema
- Target specific route groups with middleware
- Implement hooks for specific routes or requests
- Global request/response handlers via `onRequest`/`onResponse`
- Define custom rate limit rules

### Endpoint rules

- Use kebab-case for paths
- Use only POST or GET methods
- POST for data mutation, GET for data retrieval
- Use the `createAuthEndpoint` function
- Ensure unique paths — prefix with the plugin name to avoid conflicts

### Available context properties

| Property | Description |
|----------|-------------|
| `appName` | Application name (default: "Better Auth") |
| `options` | The Better Auth config that was passed in |
| `tables` | Core table definitions |
| `baseURL` | Auth server base URL with path |
| `session` | Session config (`updateAge`, `expiresIn`) |
| `secret` | Secret key for cryptographic operations |
| `authCookie` | Default cookie configuration |
| `logger` | Better Auth logger instance |
| `db` | Kysely database instance |
| `adapter` | ORM-like database functions |
| `internalAdapter` | Internal database calls (e.g. `createSession()`) |
| `createAuthCookie` | Cookie management helper |
| `trustedOrigins` | List of configured trusted origins |
| `isTrustedOrigin` | Origin validation helper |

### Field properties (schema)

| Property | Description |
|----------|-------------|
| `type` | `"string"`, `"number"`, `"boolean"`, or `"date"` |
| `required` | boolean (default: `true`) |
| `unique` | boolean (default: `false`) |
| `references` | Object with `model`, `field`, `onDelete` (default: cascade) |

### Schema properties

- `disableMigration`: skip table migration when `true`

## Notes

- You can pass Better Fetch plugins via the `fetchPlugins` array for advanced request/response handling (Fetch Plugins)
- Listen to atom changes and re-evaluate dynamically (see built-in plugin examples, Atom Listeners)

## Related

- [Hooks](./hooks.md)
- [API](./api.md)
