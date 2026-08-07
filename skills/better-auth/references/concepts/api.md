# API

Better Auth provides server-side API access through the `api` object exposed on the auth instance. You can interact directly with authentication endpoints as regular function calls instead of HTTP requests.

## Signature / Usage

Once you create an auth instance, the `api` object is provided. This object exposes every endpoint that exists on the Better Auth instance. The API leverages [better-call](https://github.com/bekacru/better-call), a lightweight web framework that lets you call REST endpoints as standard functions.

### Getting the session

```typescript
import { auth } from "@/lib/auth";

await auth.api.getSession({
  headers: await headers(),
});
```

### With body parameters

```typescript
await auth.api.signInEmail({
  body: {
    email: "john@doe.com",
    password: "password",
  },
  headers: await headers(),
});
```

### With query parameters

```typescript
await auth.api.verifyEmail({
  query: {
    token: "my_token",
  },
});
```

### Email sign-up

```typescript
await auth.api.signUpEmail({
  returnHeaders: true,
  body: {
    email: "john@doe.com",
    password: "password",
    name: "John Doe",
  },
});
```

### Getting response headers

```typescript
const { headers, response } = await auth.api.signUpEmail({
  returnHeaders: true,
  body: {
    email: "john@doe.com",
    password: "password",
    name: "John Doe",
  },
});

const cookies = headers.getSetCookie();
const customHeader = headers.get("x-custom-header");
```

### Getting the Response object

```typescript
const response = await auth.api.signInEmail({
  body: {
    email: "",
    password: "",
  },
  asResponse: true,
});
```

### Error handling

```typescript
import { APIError, isAPIError } from "better-auth/api";

try {
  await auth.api.signInEmail({
    body: {
      email: "",
      password: "",
    },
  });
} catch (error) {
  if (isAPIError(error)) {
    console.log(error.message, error.status);
  }
}
```

## Options / Props

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `body` | Object | No | Request body data |
| `headers` | Headers | Conditional | HTTP headers (auth tokens, IP info) |
| `query` | Object | No | URL query parameters |
| `returnHeaders` | boolean | No | Include response headers in the return value |
| `asResponse` | boolean | No | Return the raw Response object |

## Notes

- Unlike client-side calls, server implementations receive plain JavaScript objects directly
- The `returnHeaders` option obtains a standard `Headers` object for cookie extraction
- The `asResponse` option is used when full HTTP response metadata is needed
- All endpoints defined by core features or plugins are automatically available
- Error instances inherit from `APIError`, providing a consistent error-handling pattern

### Security

- Some endpoints require headers (for session tokens, IP detection)
- Headers provide metadata such as user session tokens and IP address information needed for rate limiting and fraud detection
- Response headers include auth cookies and require careful handling for security
- All server-side calls execute as trusted code

## Related

- [Client](./client.md)
- [Hooks](./hooks.md)
