# Receiver

Verifies that incoming HTTP requests originate from QStash. Uses HMAC SHA-256 signed JWTs sent in the `Upstash-Signature` header. Supports automatic key rotation via `currentSigningKey` / `nextSigningKey`.

## Signature / Usage

```ts
import { Receiver } from "@upstash/qstash";

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
});

// In your request handler:
const isValid = await receiver.verify({
  body: rawBodyString,           // must be the unparsed raw string
  signature: req.headers["upstash-signature"],
  url: "https://your-api.example.com/handler",
});
```

**Next.js App Router helper (wraps verify automatically):**

```ts
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

async function handler(req: Request) {
  const payload = await req.json();
  // ...
  return Response.json({ ok: true });
}

export const POST = verifySignatureAppRouter(handler);
```

## Options / Props

**`Receiver` constructor:**

| Name | Type | Description |
| --- | --- | --- |
| `currentSigningKey` | `string` | Active HMAC signing key from Upstash Console |
| `nextSigningKey` | `string` | Next signing key; used as fallback during key rotation |

**`receiver.verify()` options:**

| Name | Type | Description |
| --- | --- | --- |
| `body` | `string` | Raw (unparsed) request body string |
| `signature` | `string` | Value of `Upstash-Signature` request header |
| `url` | `string` | Your endpoint URL; must match the JWT `sub` claim |

**Returns:** `Promise<boolean>` — `true` if signature is valid.

## Notes

- Always pass the **raw body string**; re-serializing a parsed object may break the SHA-256 body hash check
- JWT claims verified: `iss === "Upstash"`, `sub === url`, `exp` / `nbf` timestamps, `body` SHA-256 hash
- JWT lifetime defaults to 5 minutes (`exp` - `iat`)
- `QSTASH_CURRENT_SIGNING_KEY` and `QSTASH_NEXT_SIGNING_KEY` env vars are automatically read by the Next.js helpers
- Rotate keys in the Upstash Console; `nextSigningKey` allows zero-downtime rotation
- Requests that fail verification should return `403`

## Related

- [overview.md](./overview.md)
- [publish.md](./publish.md)
