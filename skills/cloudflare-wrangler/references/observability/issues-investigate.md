---
source: https://developers.cloudflare.com/workers/observability/issues/investigate/
---

# Investigate issues

Investigate a Workers Issue by comparing occurrences and reviewing diagnostic context (stack traces, logs, traces, application context).

## Signature / Usage

Add application context early in each invocation via the active span (requires tracing enabled):

```ts
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request: Request): Promise<Response> {
		const { userId, accountId, sessionId } = await getAuthDetails(request);
		const span = tracing.getActiveSpan();

		span?.setAttribute("user.id", userId);
		span?.setAttribute("account.id", accountId);
		span?.setAttribute("session.id", sessionId);

		return handleRequest(request);
	},
} satisfies ExportedHandler;
```

## Options / Props

| Status | Behavior |
| --- | --- |
| `Active` | The issue is unresolved. New issues start with this status. |
| `Resolved` | The issue is considered fixed. A newer occurrence changes the status back to `Active`. |
| `Ignored` | The issue remains ignored when new occurrences arrive. Change the status to review it again. |

## Notes

- Detected failures: uncaught exceptions, failed invocations, HTTP `5xx` responses returned by the Worker, and console logs at error level or containing an `Error` object or stack trace. Detection does not require Workers Logs or tracing; tracing is only required to add custom application context.
- Occurrence details can include: the detected error and stack trace (when available), related logs and traces, the Worker version, invocation and request details, and application context from the active trace span. Available context depends on failure type and captured telemetry.
- Cloudflare does not know which application users, accounts or sessions matter, so add identifiers yourself with `tracing.getActiveSpan()` or the custom spans API. Do not add secrets, tokens or sensitive request content to span attributes, logs, or error messages.
- Issues do not resolve automatically. A delayed occurrence observed before an issue was resolved does not reopen it.
- Retention: occurrence details for seven days; issues remain listed after occurrences expire.

## Related

- [issues.md](./issues.md)
- [custom-spans.md](./custom-spans.md)
- [traces.md](./traces.md)
