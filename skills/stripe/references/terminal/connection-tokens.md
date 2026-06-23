# Terminal Connection Tokens

A Connection Token authenticates the Stripe Terminal SDK to communicate with a reader. It is generated server-side and passed to the client-side SDK on each initialization.

## Signature / Usage

```bash
# Server-side: create a connection token
curl https://api.stripe.com/v1/terminal/connection_tokens \
  -u "sk_test_..." \
  -X POST
```

Client-side JS SDK integration:

```javascript
async function fetchConnectionToken() {
  const response = await fetch('/connection_token', { method: 'POST' });
  const data = await response.json();
  return data.secret; // pass the secret to the SDK
}

const terminal = StripeTerminal.create({
  onFetchConnectionToken: fetchConnectionToken,
  onUnexpectedReaderDisconnect: () => { /* handle disconnect */ },
});
```

## Options / Props

### Create (`POST /v1/terminal/connection_tokens`)

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `location` | string | No | ID of a Location to scope the token; when set, the token only works with readers assigned to that location (internet-connected readers only) |

### Connection Token Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `object` | string | Always `"terminal.connection_token"` |
| `secret` | string | Short-lived secret passed to the SDK (`pst_test_...`) |

## Notes

- Connection tokens are short-lived; do not cache or hardcode them — the SDK calls `onFetchConnectionToken` automatically when a new token is needed
- The `secret` must be transmitted over HTTPS; never expose it in client-side source or logs
- When `location` is omitted, the token grants access to all readers on the account
- Location-scoping only applies to internet-connected readers; Bluetooth readers ignore the scope

## Related

- [readers.md](./readers.md)
- [locations.md](./locations.md)
- [in-person-payment.md](./in-person-payment.md)
