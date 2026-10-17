# Troubleshooting (General / Vercel)

Common Upstash Workflow errors, their causes, and fixes, plus Vercel preview deployment protection.

## Signature / Usage

Do not wrap steps in try/catch; if you must, re-throw `WorkflowAbort`:

```typescript
import { WorkflowAbort } from '@upstash/workflow';

try {
  await context.run( ... );
} catch (error) {
  if (error instanceof WorkflowAbort) {
    throw error;
  } else {
    // handle other errors
  }
}
```

### General issues

| Symptom | Cause / Fix |
|---------|-------------|
| `WorkflowAbort: This is an Upstash Workflow error thrown after a step executes...` | The SDK throws `WorkflowAbort` after a step executes successfully. Do not wrap `context.run/sleep/sleepUntil/call` in try/catch (put the try/catch inside `context.run`), or re-throw `WorkflowAbort` |
| `context.requestPayload` is undefined | Pass `Content-type: text/plain` or `application/json` when starting (`publishJSON` can only publish `application/json`). While `context.call` executes the endpoint is called at least twice; reading `requestPayload` before any step can give undefined. Fix: `const payload = await context.run("get payload", () => context.requestPayload)` |
| `Failed to verify that the Workflow request comes from QStash: ...` | Start the workflow with `client.trigger` or by publishing to QStash; check `QSTASH_CURRENT_SIGNING_KEY` / `QSTASH_NEXT_SIGNING_KEY`; pass appropriate `Content-type`. If the signature is missing, do not call the endpoint directly; start the run through QStash |
| HTTP 400 `Failed to authenticate Workflow request.` | Returning before running any step is read as an authentication failure. Turn non-deterministic conditions into a step: `const shouldReturn = await context.run("check condition", () => someCondition())` |
| Wrong retry count | Defaults: `client.trigger` retries 3; `context.call` retries 0 |
| `Workflow URL contains localhost...` | Publish requests fail. Verify `baseUrl`, check `UPSTASH_WORKFLOW_URL`, or pass the full `url` explicitly to `serve` |
| `The step '...' with id '...' has run twice during workflow execution` | QStash is at-least-once; a duplicate step logs this and terminates. Keep steps idempotent |
| Warnings: `Workflow run wfr-*** already exists. A new one isn't created.` / `tried to append to a cancelled workflow. exiting without publishing.` / `Failed to remove workflow run wfr-*** as it doesn't exist.` | Rare network issues; the endpoint returns `200` and logs one of these |
| `Couldn't fetch workflow run steps...` | Can occur with two parallel `context.call` steps at the end of a workflow; the run still succeeds |
| HTTPS inferred as HTTP behind a proxy | Set `UPSTASH_WORKFLOW_URL` to the app base URL; for Express behind a proxy, `app.set("trust proxy", true)` |
| Workflow stuck in first step | Check step logs in the dashboard; confirm the endpoint is reachable (curl) and the `client.trigger` URL matches; use the latest SDK on both sides; if the first step completed, try the `baseUrl` option of `serve` to override URL inference |
| `detected a non-workflow destination for trigger/invoke...` | The target is not a workflow endpoint, or a newer-SDK caller targets an endpoint on an SDK older than 0.2.17 (TypeScript) / 0.1.4 (Python). Use a valid workflow endpoint and latest SDKs on both sides |

### Vercel: preview deployment protection

When Deployment Protection is enabled, a workflow cannot be triggered and completed on a preview deployment. Create a protection bypass secret in Vercel project settings (Deployment Protection, Protection Bypass for Automation, Add Secret) and store it as an environment variable (e.g. `VERCEL_AUTOMATION_BYPASS_SECRET`). The header must then be passed in two places.

Step 1: configure the QStash client in `serve` options (applies to all steps including `context.invoke`):

```typescript
import { Client } from '@upstash/qstash'
import { serve } from '@upstash/workflow/nextjs'

export const { POST } = serve<string>(async (context) => {
  // your workflow logic
}, {
  qstashClient: new Client({
    token: process.env.QSTASH_TOKEN!,
    headers: {
      "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET!
    }
  })
})
```

Step 2: pass the header when triggering:

```typescript
import { Client } from "@upstash/workflow";

const client = new Client({ token: "<QSTASH_TOKEN>" })

await client.trigger({
  url: "https://vercel-preview.com/workflow",
  headers: {
    "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET!
  },
  body: "Hello world!"
})
```

## Notes

- Both Vercel steps are required: the header must be passed when triggering AND configured in the QStash client for subsequent steps
- Verbose mode diagnostics (the localhost, deduplication, and network-warning logs above) are not yet available in workflow-py
- Clearing both signing-key env variables disables verification; never do this on a publicly reachable endpoint (local development only)
- Retry settings live in two places: `client.trigger` (the run) and `context.call` (third-party requests)
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/troubleshooting/general (and `troubleshooting/vercel`)

## Related

- [best-practices](./best-practices.md)
- [security](./security.md)
- [local-development](./local-development.md)
- [client-trigger](./client-trigger.md)
- [serve](./serve.md)
