# Upstash Workflow Changelog

Condensed list of SDK, server and console changes published on the official changelog (since October 2025 the changelog and roadmap live in GitHub Discussions of the `upstash` organization).

## Signature / Usage

Snippet taken from https://upstash.com/docs/workflow/steps/run (step-level options, `@upstash/workflow` 1.5.0; the official changelog page has no entry for it).

```typescript
await context.run(
  "charge customer",
  () => chargeCustomer("customer-id"),
  {
    flowControl: { key: "payment-provider", parallelism: 3 },
  }
);
```

## Options / Props

| When | Change |
|------|--------|
| 1.5.0 / 1.5.1 | Step-level flow control and retries on `context.run` (third argument); 1.5.1 bumps `@upstash/qstash` to 2.12.1 for a dev-mode hint (GitHub release notes, not on the changelog page) |
| June 2026 | Multiple labels per run: `label` on `client.trigger` / `context.invoke` accepts `string \| string[]`; log / DLQ / cancel filters accept arrays (OR); logs expose `labels`; `context.labels` replaces deprecated `context.label` |
| March 2026 | Optional `workflowRunId` on `notify` for lookback |
| Sept 2025 | `label` feature; `notBefore` on `trigger`; console redesign (flat view removed) |
| Aug 2025 | `retryDelay` option (trigger, `context.call`; later moved from `serve` to `client.trigger`); detection of non-workflow URLs on trigger (since 0.2.17); console local mode |
| July 2025 | DLQ restart / resume; `WorkflowNonRetryableError` |
| June 2025 | `failureFunction` / `useFailureFunction` on `client.trigger`; batch trigger; Python failure function |
| May 2025 | `workflow` parameter on `context.call`; `delay` on `client.trigger`; flow control `period` (up to 1 week on the server) |
| March 2025 | `onError` on `serve`; fetch-compatible models in Agents |
| Feb 2025 | `WorkflowTool`; `context.invoke`; flow control parameters |
| Jan 2025 | Agents API; `workflow-py` released; local development server public; Workflow and QStash consoles separated |
| Dec 2024 | Integrations (Anthropic, Resend, OpenAI); `timeout` on `context.call`; `useJSONContent` for Express / SvelteKit; `sleepUntil` floats |
| Nov 2024 | String durations in `context.sleep` / `context.waitForEvent`; Astro and Express integrations; `client.trigger`; retry option for `context.call`; `context.cancel`; bulk cancel |
| Oct 2024 | Wait Notify feature |
| Aug 2024 | Upstash Workflow released |

## Notes

- Several features listed as added in the changelog were later moved or removed in 1.0.0 (see migrations); the changelog is a history, not the current API
- Source: https://upstash.com/docs/workflow/changelog (fetched 2026-11-14; no version pin on the site)
- Source: https://github.com/upstash/workflow-js/releases (release notes, checked 2026-11-14)

## Related

- [migrations](./migrations.md)
- [context-run](./context-run.md)
- [retries](./retries.md)
- [flow-control](./flow-control.md)
