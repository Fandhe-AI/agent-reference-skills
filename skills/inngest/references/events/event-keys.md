# Event Keys

Secret keys that authenticate event publishing to a specific Inngest environment. Required in production to ensure only authorized applications can send events.

## Signature / Usage

```ts
// Option 1 (recommended): environment variable
// Set INNGEST_EVENT_KEY in your deployment environment.
const inngest = new Inngest({ id: "my-app" });

// Option 2: pass explicitly at client construction
const inngest = new Inngest({
  id: "my-app",
  eventKey: "xyz...",
});
```

Via the HTTP API directly:

```bash
curl -X POST https://inn.gs/e/$INNGEST_EVENT_KEY \
  -H 'Content-Type: application/json' \
  --data '{"name":"user.signup","data":{"userId":"123"}}'
```

## Notes

- Event keys are **not** required in local development with the Inngest Dev Server.
- The Vercel integration sets `INNGEST_EVENT_KEY` automatically for Vercel deployments.
- Create keys in the Inngest Cloud dashboard under **Manage → Event Keys**.
- Maintain separate keys per environment (production, staging, branch) and per application to enable independent rotation.
- Never hardcode keys in source code; store them as secrets in your deployment platform.
- Do not expose event keys in client-side browser code — proxy event sending through a backend endpoint instead.
- After creation, keys can be renamed, deleted, or filtered by event name and source IP for additional security.
- For branch environments, include the `x-inngest-env: <branch-name>` header when posting events via HTTP.

## Related

- [Sending Events](./sending-events.md)
- [Webhooks](./webhooks.md)
