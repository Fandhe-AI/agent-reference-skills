# REST API: Signing Keys

Read and rotate the current and next signing keys through the QStash REST API.

## Signature / Usage

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/v2/keys` | Get `{ current, next }` signing keys |
| `POST` | `/v2/keys/rotate` | Rotate keys; returns the new `{ current, next }` |

Adapted (not in the official docs): the official page is an OpenAPI spec without a curl example; this request is built from its path definition.

```bash
curl "https://qstash.upstash.io/v2/keys" \
  -H "Authorization: Bearer <QSTASH_TOKEN>"
```

## Options / Props

No parameters.

### Response fields (200, both endpoints)

| Name | Type | Description |
| --- | --- | --- |
| `current` | string | Maps to `QSTASH_CURRENT_SIGNING_KEY` used by the receiver |
| `next` | string | Maps to `QSTASH_NEXT_SIGNING_KEY` used by the receiver |

## Notes

- Treat the responses as secrets; do not log or commit them.
- Verification with these keys is described in `receiver.md`.
- The REST API (`https://qstash.upstash.io`, bearer `QSTASH_TOKEN`) is distinct from the Upstash developer API and from Redis / Vector REST. Auth is the `Authorization: Bearer <QSTASH_TOKEN>` header, or the `qstash_token` query parameter where headers cannot be set. The OpenAPI spec lists regional servers `https://qstash-{region}.upstash.io` (`eu-central-1` default, `us-east-1`).
- Source: https://upstash.com/docs/qstash/api/authentication (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/api-reference/signing-keys/get-signing-keys , https://upstash.com/docs/qstash/api-reference/signing-keys/rotate-signing-keys (fetched 2026-11-14; no version pin on the site)

## Related

- [receiver.md](./receiver.md)
