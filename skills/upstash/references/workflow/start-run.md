# Start a Run

Start a workflow run with `client.trigger` (recommended), or with a plain HTTP request for quick testing during development.

## Signature / Usage

```ts
import { Client } from "@upstash/workflow";

const client = new Client({ token: "<QSTASH_TOKEN>" })

const { workflowRunId } = await client.trigger({
  url: "https://<YOUR_WORKFLOW_ENDPOINT>/<YOUR-WORKFLOW-ROUTE>",
  body: "hello there!",         // optional body
  headers: { ... },             // optional headers
  workflowRunId: "my-workflow", // optional workflow run id
  retries: 3                    // optional retries in the initial request
  delay: "10s"                  // optional delay value
  failureUrl: "https://<YOUR_FAILURE_URL>", // optional failure url
  flowControl: { ... }          // optional flow control
})

console.log(workflowRunId)
// prints wfr_my-workflow
```

```bash
curl -X POST https://<YOUR_WORKFLOW_ENDPOINT>/<YOUR-WORKFLOW-ROUTE> \
   -H "my-header: foo" \
   -d '{"foo": "bar"}'
```

## Notes

- The official first snippet is missing a comma after `retries: 3`; `client-trigger` has the valid option list
- A direct HTTP request is for quick testing only; do **not** start workflow runs in production by calling the endpoint directly
- If the endpoint is secured with signing keys only `trigger` works: direct calls (curl, fetch) lack the `Upstash-Signature` header (see security)
- Source: https://upstash.com/docs/workflow/howto/start (fetched 2026-11-14; no version pin on the site)

## Related

- [client-trigger](./client-trigger.md)
- [security](./security.md)
- [configure-run](./configure-run.md)
