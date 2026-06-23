# Signature Verification

Verifies that webhook events are genuinely sent by Stripe using the `Stripe-Signature` header and a per-endpoint signing secret.

## Signature / Usage

```javascript
// Node.js (stripe-node)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // handle event.type ...
  res.status(200).send();
});
```

## Options / Props

### `constructEvent(payload, signature, secret)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `payload` | string / Buffer | Raw, **unmodified** UTF-8 request body |
| `signature` | string | Value of the `Stripe-Signature` request header |
| `secret` | string | Endpoint signing secret (`whsec_...`) |

### `Stripe-Signature` header format

```
t=1492774577,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
```

| Part | Description |
|------|-------------|
| `t=` | Unix timestamp of the request |
| `v1=` | HMAC-SHA256 signature of `{timestamp}.{raw_body}` using the signing secret |

### Manual verification steps

| Step | Action |
|------|--------|
| 1 | Extract `t` and `v1` values from `Stripe-Signature` header |
| 2 | Construct signed payload string: `{t_value}.{raw_request_body}` |
| 3 | Compute HMAC-SHA256 of the signed payload using the endpoint secret as key |
| 4 | Compare computed hash with `v1` using constant-time comparison |
| 5 | Reject if timestamp is more than 5 minutes old (replay attack prevention) |

## Notes

- The signing secret is displayed once at creation; retrieve it from the Dashboard ("Reveal secret") or `stripe listen` output.
- **Never** parse the request body before signature verification — any whitespace change or key reordering breaks the signature.
- In Express, mount the webhook route before `express.json()` middleware, or use `express.raw()` exclusively for that route.
- For Next.js App Router, read `await request.arrayBuffer()` directly; for Pages Router, disable `bodyParser` and use `buffer(request)`.
- AWS API Gateway: configure a Body Mapping Template for `application/json` to preserve the raw body.
- Only accept `v1` signatures; ignore any other scheme prefixes (downgrade attack prevention).
- Secrets from the Stripe CLI (`stripe listen`) and Dashboard endpoints are different — do not mix them.
- Periodically rotate signing secrets via the Dashboard to limit exposure.

## Related

- [Webhook Endpoints](./webhook-endpoints.md)
- [Event Types](./event-types.md)
