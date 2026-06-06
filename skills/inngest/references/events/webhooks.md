# Webhooks

Consume HTTP webhook events from external services and convert them into Inngest events using transform functions.

## Signature / Usage

Transform function shape (runs on Inngest's servers, no infrastructure required):

```ts
function transform(
  evt: object,         // raw JSON body from the POST request
  headers: object,     // HTTP headers (case-insensitive, canonicalized)
  queryParams: object, // parsed query string (values are arrays)
  raw: string,         // raw request body string (for signature verification)
): { name: string; data: object; id?: string; ts?: number } {
  return {
    name: `stripe/${evt.type}`,
    data: evt,
    id: evt.id,           // optional: deduplication
    ts: evt.created * 1000, // optional: explicit timestamp
  };
}
```

## Notes

- Inngest generates a unique webhook URL per configured webhook. Share this URL with the provider.
- **Transform requirements**: return an object with `name` and `data`. Returning without `name`/`data` (or throwing) responds with HTTP 400.
- **Error handling**: wrap the transform body in try/catch and return a fallback event to always respond HTTP 200.
- **Provider-specific patterns**:
  - GitHub: extract `X-Github-Event` header for the event name.
  - Stripe: use `evt.id` for `id` (deduplication) and `evt.type` for `name`.
  - Clerk: map `evt.type` to name, `evt.data` to data.
- **Signature verification**: pass `raw` and the signature header through `data`; verify inside your Inngest function using `NonRetriableError` on failure.
- **Content types supported**: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`. Form data values are arrays of strings.
- **Branch environments**: target a specific branch by sending `x-inngest-env: <branch-name>` as a query param or header.
- Webhooks can also be created, updated, and deleted via the Inngest REST API for code-managed configuration.

## Related

- [Event Payload Schema](./event-payload-schema.md)
- [Event Keys](./event-keys.md)
- [Event Naming Conventions](./event-naming-conventions.md)
