# Redact Private Data

Redact specific fields of a workflow run so they appear as `REDACTED:<SHA256>` in the Upstash Console and API responses. Original values are still delivered to your workflow endpoint.

## Signature / Usage

```typescript
import { Client } from "@upstash/workflow";

const client = new Client({ token: "<QSTASH_TOKEN>" });

const { workflowRunId } = await client.trigger({
  url: "https://my-app.com/api/workflow",
  body: { hello: "world" },
  redact: {
    body: true,
    header: ["Authorization"] // or `header: true` to redact all headers
  },
});
```

```bash
curl -XPOST \
    -H 'Authorization: Bearer XXX' \
    -H "Content-Type: application/json" \
    -H "Upstash-Redact-Fields: body, header[Authorization]" \
    -d '{ "hello": "world" }' \
    'https://qstash.upstash.io/v2/publish/https://my-app.com/api/workflow'
```

## Options / Props

| Option | Description |
|--------|-------------|
| `body` | Redact the body of the workflow steps |
| `headers` | Redact the headers of the workflow steps |
| `headers[header_name]` | Redact a specific header (e.g. `headers[Authorization]`) |

## Notes

- Redaction is one-way; the original value cannot be retrieved from the API or dashboard. The SHA256 hash lets you verify data without revealing it
- Configured per workflow run, so different runs can redact different fields
- When `body` is redacted, step outputs in the dashboard and API show `REDACTED:<SHA256>`; the workflow still executes with the original data
- If a run fails into the DLQ, redacted fields stay redacted there; retry, resume, or restart from the DLQ delivers the original values to your endpoint
- The option names in the docs table are `headers` / `headers[header_name]`, while the TypeScript example uses `header` and the cURL example uses `header[Authorization]`; this inconsistency is in the original docs

## Related

- [client-trigger](./client-trigger.md)
- [dlq](./dlq.md)
- [security](./security.md)
