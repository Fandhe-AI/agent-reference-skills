# Express Integration

Integrates Better Auth with Express.js: handler mounting, CORS, and session retrieval.

## Signature / Usage

```javascript
app.all("/api/auth/*", toNodeHandler(auth)); // Express v4
// app.all("/api/auth/*splat", toNodeHandler(auth)); // Express v5
```

```javascript
app.use(
  cors({
    origin: "http://your-frontend-domain.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
```

```javascript
const session = await auth.api.getSession({
  headers: fromNodeHeaders(req.headers),
});
```

## Notes

- Don't use `express.json()` before the Better Auth handler — it blocks the client API. Apply JSON middleware after the auth handler, or only on non-auth routes
- Requires ESM (`"type": "module"` in `package.json`)
- Verify setup with a GET request to `/api/auth/ok`

## Related

- [fastify](./fastify.md)
- [hono](./hono.md)
