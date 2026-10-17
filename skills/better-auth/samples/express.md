# Express Integration

Mount the handler with `toNodeHandler` on a catch-all route, and retrieve sessions with `fromNodeHeaders`.

```ts
// server.ts
import express from "express";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth";

const app = express();

app.all("/api/auth/*", toNodeHandler(auth)); // Express v5: "/api/auth/*splat"

// mount express.json() AFTER the Better Auth handler
app.use(express.json());

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  return res.json(session);
});

app.listen(3005);
```

## Notes

- CommonJS is not supported; set `"type": "module"` in `package.json` or configure ESM in `tsconfig.json`
- Mount the Better Auth handler before body-parsing middleware such as `express.json()`; body parsers consume the request stream before passing control to the next handler
- Express v4 uses `"/api/auth/*"`; Express v5 uses `"/api/auth/*splat"`
- After setup, `GET /api/auth/ok` verifies the server is running
