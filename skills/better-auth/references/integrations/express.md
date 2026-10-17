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

- Mount the Better Auth handler before body-parsing middleware such as `express.json()`: body parsers consume the incoming request stream before passing control to the next handler. Mount `app.use(express.json())` after the auth handler (or only on non-auth routes).

  ```javascript
  app.all("/api/auth/*", toNodeHandler(auth)); // ExpressJS v4 (v5: "/api/auth/*splat")

  // Mount body-parsing middleware after the Better Auth handler.
  app.use(express.json());
  ```
- Requires ESM (`"type": "module"` in `package.json`)
- Verify setup with a GET request to `/api/auth/ok`

## Related

- [fastify](./fastify.md)
- [hono](./hono.md)
