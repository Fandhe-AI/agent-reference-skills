---
source: https://developers.cloudflare.com/hyperdrive/configuration/tune-connection-pool/
---

# Tune connection pooling

Set the maximum number of origin connections for a Hyperdrive configuration via dashboard, Wrangler, or REST API.

## Signature / Usage

```sh
npx wrangler hyperdrive update <HYPERDRIVE_ID> --origin-connection-limit=<MAX_CONNECTIONS>
```

REST API:

Adapted (not in the official docs): URL and token use quoted shell variables instead of `<...>` placeholders (unquoted `<` is a shell redirection); see Notes.

```sh
# Set ACCOUNT_ID, HYPERDRIVE_ID, API_TOKEN and MAX_CONNECTIONS (a number, at least 5) first
curl --request PATCH \
  --url "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/hyperdrive/configs/${HYPERDRIVE_ID}" \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer ${API_TOKEN}" \
  --data "{\"origin_connection_limit\": ${MAX_CONNECTIONS}}"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--origin-connection-limit` | number | (Soft) maximum connections Hyperdrive may establish to the origin database; minimum 5, maximum depends on plan |
| `origin_connection_limit` | number | REST API field for the same setting |

## Notes

- Dashboard: Storage & databases > Hyperdrive > configuration > **Settings** > **Origin connection limit** > **Maximum connections** > Save.
- There is no limit on concurrent client connections from Workers to Hyperdrive; the limit applies to origin connections, shared across Workers (each Worker holds one for the duration of a transaction).
- The limit is soft: Hyperdrive may exceed it on network failure for availability. Set it lower than the origin database's limit.
- Adapted from the official docs: the REST example uses shell variables so the URL, token and numeric JSON value are quoted; the official placeholders `<ACCOUNT_ID>` etc. cannot be pasted into a shell unquoted.
- Limit increases: submit the Limit Increase Request form (see [limits](./limits.md)).
- Best practices: start conservatively, monitor database metrics, stay under the database maximum, and count all Hyperdrive configurations sharing the database.

## Related

- [Connection pooling](./connection-pooling.md)
- [Connection lifecycle](./connection-lifecycle.md)
- [Metrics and analytics](./metrics.md)
- [Limits](./limits.md)
