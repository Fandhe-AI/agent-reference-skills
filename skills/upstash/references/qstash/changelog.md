# QStash Changelog

Month-by-month summary of the official QStash changelog (server, console, TypeScript and Python SDKs), plus recent SDK releases.

## Signature / Usage

Flow control management API (added February 2026; `client.flowControl` in TypeScript, `client.flow_control` in Python):

```ts
const info = await client.flowControl.get("USER_GIVEN_KEY");
```

## Options / Props

| Month | Change |
| --- | --- |
| February 2026 | SDKs: `list()`, `get(key)`, `reset(key)` on the flow control client; responses include `waitListSize`, `parallelismMax`, `parallelismCount`, `rateMax`, `rateCount`, `ratePeriod`, `ratePeriodStart`. Server: `GET /v2/flowControl` takes an optional `search` query parameter; new `POST /v2/flowControl/:flowControlKey/reset`; `GET /v2/globalParallelism` returns `{ parallelismMax, parallelismCount }` instead of `{ waitListSize }` |
| September 2025 | TypeScript SDK: `Label` feature (filter Logs and DLQ by label). Console: Logs `Flat view` removed |
| August 2025 | Console: hide/show columns on Schedules; local mode for the console with a local dev environment |
| July 2025 | TypeScript SDK: `retryDelay` option (publish / batch / enqueue / schedules) |
| June 2025 | No new features |
| May 2025 | TypeScript SDK: flow control `period`, `ratePerSecond` deprecated, `IN_PROGRESS` state filter. Python SDK: `IN_PROGRESS` filter, callback headers, schedule with queue, overwrite schedule ID, flow control period. Server: filtering messages by `FlowControlKey`, bulk cancel / bulk publish performance, fix for scheduled publishes with queues resetting queue parallelism to 1, queue parallelism updates allowed at the max queue limit |
| April 2025 | Server: flow control `period` up to 1 week (for example `rate: 3 period: 1d`); previously fixed at 1 second. Console: `IN_PROGRESS` filter when grouping by message ID |

### SDK releases (checked 2026-11-14)

- `@upstash/qstash` 2.12.1: `runNow`, `Client.fromEnv`, dev-mode hints, dev mode respected in h3 / svelte / solid `verifySignature`, `batchJSON` / `publishJSON` no longer mutate the caller's input
- `@upstash/qstash` 2.12.2: fetch `duplex` set for stream request bodies; bundles docs

## Notes

- Since October 2025 the roadmap and changelog live in GitHub Discussions (https://github.com/orgs/upstash/discussions); the docs changelog page has no entries after February 2026
- Snippet taken from https://upstash.com/docs/qstash/sdks/ts/examples/flow-control
- Source: https://upstash.com/docs/qstash/overall/changelog (fetched 2026-11-14; no version pin on the site)
- Source: https://github.com/upstash/qstash-js/releases (release notes, checked 2026-11-14)

## Related

- [flow-control.md](./flow-control.md)
- [retry.md](./retry.md)
- [overview.md](./overview.md)
- [messages.md](./messages.md)
