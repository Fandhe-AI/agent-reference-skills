# Security, Tokens and Signing Keys

QStash API requests are authorized with `QSTASH_TOKEN`; deliveries to your endpoint carry an `Upstash-Signature` JWT signed with your current signing key.

## Signature / Usage

```bash
curl https://qstash.upstash.io/v2/publish/... \
  -H "Authorization: Bearer <QSTASH_TOKEN>"
```

```bash
curl https://qstash.upstash.io/v2/publish/...?qstash_token=<QSTASH_TOKEN>
```

```typescript
import { Receiver } from "@upstash/qstash";

const receiver = new Receiver({
  currentSigningKey: "YOUR_CURRENT_SIGNING_KEY",
  nextSigningKey: "YOUR_NEXT_SIGNING_KEY",
});

// ... in your request handler, with a Fetch API `request`

const signature = request.headers.get("upstash-signature") ?? "";
const body = await request.text(); // the raw body, not parsed JSON

const isValid = await receiver.verify({
  body,
  signature,
  url: "YOUR-SITE-URL",
});
```

## Options / Props

JWT claims in `Upstash-Signature` (HS256, signed with the current signing key):

| Claim | Description |
| --- | --- |
| `iss` | Always `Upstash` |
| `sub` | URL of your endpoint the request is sent to |
| `exp` | Unix timestamp (seconds) after which to reject; lifetime 5 minutes by default |
| `iat` | Unix timestamp (seconds) when the JWT was created |
| `nbf` | Unix timestamp (seconds) before which to reject |
| `jti` | Unique token id |
| `body` | Base64url (RFC 4648 section 5) SHA-256 hash of the request body |

### Token management

| Action | Where | Effect |
| --- | --- | --- |
| Read-only token | Console, QStash tab, Quickstart section | Can read logs, messages, schedules and other resources; cannot publish, create or modify |
| Reset token | Console, "Reset token" button | Invalidates the current token; update all applications immediately |
| Roll signing keys | Console, "Roll keys" button | `currentKey = nextKey`, `nextKey = generateNewKey()` |

## Notes

- Manual verification: split the JWT, verify the signature, then check `iss` is `Upstash`, `sub` is the destination URL you published to (even if QStash followed a redirect), `exp` / `nbf`, and that the SHA-256 hash of the raw body equals `body`
- Always verify with both keys (current and next) so rotation causes no downtime; rolling twice without updating applications makes them reject all requests
- Use the raw body string: re-serializing parsed JSON can break verification
- A read-only token can still read sensitive logs and messages; combine with redact-fields.md to hide sensitive data
- Keep signing keys in a secure location; anyone holding them can forge requests to your API
- The `qstash_token` query parameter is for environments where setting the header is not possible; keep tokens safe and reset them if compromised
- Source: https://upstash.com/docs/qstash/features/security (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/howto/signature (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/howto/readonly-token (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/howto/reset-token (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/howto/roll-signing-keys (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/api/authentication (fetched 2026-11-14; no version pin on the site)

## Related

- [receiver.md](./receiver.md)
- [redact-fields.md](./redact-fields.md)
- [overview.md](./overview.md)
