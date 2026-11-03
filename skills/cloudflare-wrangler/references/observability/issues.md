---
source: https://developers.cloudflare.com/workers/observability/issues/
---

# Issues

Issues is built-in error monitoring for Workers: it detects production failures and groups related failures into issues without an SDK or application wrapper. Also covers automations (https://developers.cloudflare.com/workers/observability/issues/automations/).

## Signature / Usage

Enable Issues (requires Wrangler 4.134.0 or later), then deploy:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "observability": {
    "issues": {
      "enabled": true
    }
  }
}
```

```toml
[observability.issues]
enabled = true
```

```
npx wrangler deploy
```

With the Cloudflare CLI (`cf`), in `cloudflare.config.ts`:

```ts
import { defineConfig } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

export default defineConfig({
  worker: {
    name: "example-worker",
    entrypoint,
    compatibilityDate: "<COMPATIBILITY_DATE>",
    observability: {
      issues: {
        enabled: true,
      },
    },
  },
});
```

```sh
cf deploy
```

Report a handled error by passing it to `console.error()`:

```ts
try {
	return await handleRequest(request);
} catch (error) {
	console.error(error);
	return new Response("Service unavailable", { status: 503 });
}
```

## Options / Props

Limits:

| Limit | Value |
| --- | --- |
| Automations per account | 50 |
| Minimum occurrence threshold | 1 |
| Recurrence inactivity period | 1 hour to 365 days |
| Completed automation-run history | 30 days |

Automation triggers:

| Trigger | Behavior |
| --- | --- |
| Occurrence threshold | Runs once when an issue's occurrence count crosses the configured threshold. |
| Recurrence after inactivity | Runs when an existing issue returns after the configured period without a newer occurrence. |

Destinations:

| Destination type | Use |
| --- | --- |
| Coding agent | Send diagnostic context to an agent that can investigate a connected codebase. |
| Generic webhook | Send an issue event to your HTTPS endpoint. You can add a webhook secret or use mutual TLS. |
| Chat | Post an issue summary to a team channel for review and triage. |
| Incident management | Create an incident or notify an on-call workflow when an issue meets its trigger condition. |

Coding-agent integrations (all require a display name):

| Integration | Required fields | Optional fields | Setup documentation |
| --- | --- | --- | --- |
| Claude Code | Routine ID and authorization token | None | https://code.claude.com/docs/en/routines#add-an-api-trigger |
| Cursor | Automation webhook URL | Authorization header | https://cursor.com/docs/cloud-agent/automations#webhook-triggers |
| Devin | Authorization token and organization ID | Repositories and playbook ID | https://docs.devin.ai/api-reference/authentication and https://docs.devin.ai/product-guides/creating-playbooks |

## Notes

- Issues records an uncaught exception, failed invocation, `5xx` response, or error log as an occurrence and groups related occurrences from the same Worker into one issue. It processes new traffic only, not historical failures.
- Dashboard enablement: **Issues** page > **Enable issues**. If you deploy with Wrangler, also set `observability.issues.enabled` to `true` in the config file, otherwise the next deployment turns Issues off. Set it to `false` and deploy to stop detecting new failures.
- Pricing: open beta, free during the beta period.
- Enable source maps so captured stacks point to original files and lines.
- Automations: set up from the **Issues** page > **Automations** > **Add automation**, choose a trigger and value, select or create a destination, turn on **Enabled**, **Create**. An occurrence-threshold automation does not run for every occurrence after the threshold; a recurrence automation requires at least one earlier occurrence.
- Generic webhooks use the standard Cloudflare Notifications webhook payload (https://developers.cloudflare.com/notifications/get-started/configure-webhooks/): name, HTTPS endpoint URL, then a webhook secret or mTLS. Treat destination URLs, secrets and tokens as credentials.
- An automation does not give the destination permission to query your Cloudflare account; configure the Cloudflare API MCP server separately (https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/#cloudflare-api-mcp-server). Review proposed code and test changes before deploying. Issue data can include error messages, stack traces, request metadata, logs and application context; do not put secrets, tokens or sensitive request content in telemetry.
- Runs: open an issue and pick a destination action to send manually. A run is pending, succeeded, or failed; Cloudflare attempts handoff up to three times before failing. Succeeded means Cloudflare Notifications accepted the event for delivery.

## Related

- [issues-investigate.md](./issues-investigate.md)
- [source-maps.md](./source-maps.md)
- [errors.md](./errors.md)
- [workers-logs.md](./workers-logs.md)
- [../configuration/observability.md](../configuration/observability.md)
