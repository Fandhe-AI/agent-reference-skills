# Webhooks

Receiving HTTP POST webhook payloads from external providers and converting them into Inngest events via transform functions.

## Signature / Usage

```js
// Transform function — runs server-side to convert raw webhook payload
function transform(evt, headers = {}, queryParams = {}) {
  return {
    name: "stripe/charge.failed",   // required; prefix with provider name
    data: {
      chargeId: evt.data.object.id,
      amount: evt.data.object.amount,
    },
  };
}
```

## Notes

- Create a webhook in the Inngest dashboard: Manage tab → Webhooks → Create Webhook — this generates a unique inbound URL for the provider to POST events to
- Transform functions accept three parameters: `evt` (raw POST body), `headers` (HTTP headers), `queryParams` (query string); they must return an object with at minimum `name` and `data` fields
- Naming convention: prefix event names with the provider (e.g., `clerk/user.created`, `stripe/charge.failed`)
- Transform errors return HTTP 400 to the provider, triggering a provider retry; wrapping in try/catch and returning an alternate event returns 200 (no retry)
- The dashboard includes a transform testing tool; use TypedWebhooks.tools for payload testing
- Inbound signatures can be verified using request headers and the raw body
- Local testing: use the Dev Server to receive and inspect webhook payloads
- Advanced options: allow/deny lists for event names and source IP addresses
- Webhook management is also available via the Inngest REST API
- Branch environments: pass `?env=<branch-name>` or `x-inngest-env` header to route events to a specific branch environment
- Supported content types: JSON, `application/x-www-form-urlencoded`, and multipart

## Related

- [Event Keys](./event-keys.md)
- [Environments](./environments.md)
- [Dev Server](./dev-server.md)
