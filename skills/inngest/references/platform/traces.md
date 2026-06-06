# Traces

Detailed interactive execution timeline for every function run — queue delays, step execution, HTTP connection phases, retries, and optional OpenTelemetry spans.

## Signature / Usage

Basic traces are automatic — no setup needed. Access them via **Inngest Cloud → Functions → [select a run]** or in the local Dev Server.

To enable **Extended Traces** (TypeScript opt-in) for capturing external calls and DB queries as nested OTel spans:

```ts
// Must be imported before all other code
import { extendedTracesMiddleware } from "inngest/experimental";
const extendedTraces = extendedTracesMiddleware();

import { Inngest } from "inngest";

const inngest = new Inngest({
  id: "my-app",
  middleware: [extendedTraces],
});
```

## Notes

- Every function run is automatically traced with no configuration required; traces are available in both the Dev Server and Inngest Cloud
- **Two-panel layout**: left panel shows run information and an execution timeline; right panel shows contextual details for the selected step or entire run
- **Run header** displays: function name, run ID, queued/started/ended timestamps, total duration, and action buttons (rerun, invoke)
- **Timeline bars** represent execution spans positioned proportionally to timing:
  - Status-colored bars: run and step executions
  - Gray bars: pauses, waits, and queue delays
  - Striped patterns: server-side execution time
  - Dotted outlines: connection phases
  - Compound bars: gray queue-delay segment immediately followed by a status-colored execution segment
- **Step details panel** includes: attempt badges for retries, precise timestamps, delay measurements, duration, and tabs for input, output, error messages, response headers, and metadata
- **Run details panel** shows trigger information (event name, cron expression, or batch details) plus the triggering payload and function output
- **Extended Traces** (opt-in, TypeScript): integrates OpenTelemetry instrumentation to capture external API calls, database queries, and third-party service interactions as nested spans

## Related

- [Observability & Metrics](./observability-metrics.md)
- [Inspecting Function Runs](./inspecting-function-runs.md)
