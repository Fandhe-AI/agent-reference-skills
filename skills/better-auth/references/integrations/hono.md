# Hono Integration

Integrates Better Auth with Hono: handler mounting, CORS, and session middleware.

## Signature / Usage

```typescript
app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});
```

```typescript
app.use("/api/auth/*", cors({
	origin: "http://localhost:3001",
	allowHeaders: ["Content-Type", "Authorization"],
	allowMethods: ["POST", "GET", "OPTIONS"],
	credentials: true,
}));
```

```typescript
// session middleware
app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	c.set("user", session?.user || null);
	c.set("session", session?.session || null);
	await next();
});
```

## Notes

- CORS middleware must be registered before your routes
- Enable `crossSubDomainCookies` for subdomains, or use `SameSite=None` + `Secure=true` for different domains
- Client-side: configure `credentials: "include"` to send auth cookies on cross-origin requests

## Related

- [elysia](./elysia.md)
- [fastify](./fastify.md)
