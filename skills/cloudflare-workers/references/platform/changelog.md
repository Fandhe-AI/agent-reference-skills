---
source: https://developers.cloudflare.com/workers/platform/changelog/
---

# Changelog

Meaningful, non-configurable changes to Workers across the dashboard, Wrangler, the API, and the workerd runtime (summarized by date), plus a pre-2023 digest and beta status.

## Signature / Usage

Changelog items are not opt-in. Opt-in runtime behavior is controlled by compatibility dates and flags:

```jsonc
{
	"name": "my-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
}
```

Snippet taken from https://developers.cloudflare.com/workers/best-practices/workers-best-practices/#keep-your-compatibility-date-current.

## Options / Props

### Recent changes (2025-06 to 2026-10, summarized)

| Date | Change |
| --- | --- |
| 2026-10-22 | Hyperdrive bindings expose `ip`, and `node:dns` resolves a binding's host to it. Workers traces include spans for `queue.metrics()` calls. |
| 2026-09-28 / 09-14 / 08-28 / 08-18 / 07-16 / 06-04 | V8 updated to 15.5 / 15.4 / 15.3 / 15.2 / 15.1 / 15.0. |
| 2026-08-20 | Durable Object Dynamic Worker concurrency limit increased from 4 to 10. |
| 2026-05-13 | Fixed regression where an array for to/cc/bcc on the SendEmail builder produced "Invalid email address". |
| 2026-04-27 / 04-17 | V8 14.8 / 14.7; custom limits allowed for dynamic workers (04-17). |
| 2026-03-20 / 01-29 / 01-13 | V8 14.6 / 14.5 / 14.4. |
| 2025-12-19 | Allow null name when creating dynamic workers. |
| 2025-11-25 | V8 14.3. |
| 2025-10-25 | Maximum WebSocket message size raised from 1 MiB to 32 MiB. |
| 2025-10-22 | Warnings previously only in devtools console in preview sessions are also sent to an attached tail Worker. |
| 2025-10-17 | V8 14.2; backported `JSON.parse()` optimization. |
| 2025-09-18 | V8 14.1. |
| 2025-09-11 | `node:fs` and Web File System APIs available. |
| 2025-08-21 | V8 14.0; `Uint8Array` base64 and hex operations. |
| 2025-08-14 | V8 Sandbox enabled. |
| 2025-08-11 | MessageChannel and MessagePort available. |
| 2025-06-27 / 06-04 | V8 13.9 / 13.8. |
| 2025-06-23 | FinalizationRegistry API enabled. |

### Earlier notable changes (2023-01 to 2025-05, selected)

| Date | Change |
| --- | --- |
| 2025-05-27 | A new `ctx` object is always passed per event (retroactive to all compatibility dates); old behavior via flag `nonclass_entrypoint_reuses_ctx_across_invocations`. |
| 2025-05-22 | Explicit resource management and `Float16Array` enabled. |
| 2025-04-14 | JSRPC message size limit increased to 32 MiB. |
| 2025-02-28 | With `nodejs_compat`, flag `nodejs_compat_populate_process_env` populates `process.env` from text bindings. |
| 2025-02-13 | Smart Placement no longer co-locates Workers with bound D1 databases; same logic for all Smart Placement Workers. |
| 2025-01-15 | Runtime no longer reuses isolates across Worker versions, even for identical code. |
| 2024-09-26 | Connect a GitHub/GitLab repo to an existing Worker for auto build/deploy with Workers Builds. |
| 2024-08-19 | `allow_custom_ports` compatibility flag for `fetch()` to custom ports. |
| 2024-07-03 | `node:crypto` adds scrypt; standard `EventSource` API. |
| 2024-06-12 | `bytes()` on Blob and Body. |
| 2024-04-05 | JavaScript-native RPC API available. |
| 2024-04-02 | Python Workers. |
| 2024-03-11 | Flag `fetcher_no_get_put_delete` (default from compatibility date 2024-03-26) removes undocumented `get()/put()/delete()` on service bindings and DO stubs. |
| 2024-02-23 | Durable Object alarm handlers impose a 15-minute wall time. |
| 2023-10-30 | Workers Standard usage model; custom CPU limits. |
| 2023-10-18 | Limit of 3 Cron Triggers per Worker removed (account-level limits remain). |
| 2023-09-14 | `node:crypto` available with `nodejs_compat`. |
| 2023-05-16 | `connect()` TCP sockets; Neon/PlanetScale/Supabase integrations; direct PostgreSQL over TCP. |
| 2023-04-28 | Global `connect` moved to the `cloudflare:sockets` module. |

### Pre-2023 digest (historical changelog)

Weekly runtime notes from 2019-09 to 2022-12. Highlights:

| Date | Change |
| --- | --- |
| 2022-12-02 | Queues no longer support `send()` with an undefined value. |
| 2022-10-10 | Workers runtime built from open-source workerd (https://github.com/cloudflare/workerd). |
| 2022-05-26 | `Response.json()` static method. |
| 2022-03-17 | `ByteLengthQueuingStrategy` and `CountQueuingStrategy`. |
| 2022-03-11 | `CompressionStream` and `DecompressionStream`. |
| 2022-03-04 | `URLPattern`; `navigator.userAgent` behind `global_navigator`. |
| 2021-11-19 | `structuredClone()` supported. |
| 2021-09-24 | `AbortController`/`AbortSignal`, `queueMicrotask`, `EventTarget`. |
| 2021-09-03 | `crypto.randomUUID()`. |
| 2021-04-19 | `waitUntil` and `passThroughOnException` on `ctx` for module Workers; Cron Triggers get a 15-minute wall time limit. |
| 2019-09-19 | Limit of 6 concurrent outgoing `fetch()` requests per incoming request (matches Chrome; HTTP/1.1 to origins). |

### Betas

| Product | Private Beta | Public Beta |
| --- | --- | --- |
| Email Workers | | Yes (https://developers.cloudflare.com/email-service/api/route-emails/email-handler/) |
| Green Compute | | Yes |
| TCP Sockets | | Yes (https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) |

## Notes

- Summarized from https://developers.cloudflare.com/workers/platform/changelog/ and https://developers.cloudflare.com/workers/platform/changelog/historical-changelog/ (pre-2023 entries are selected, not exhaustive; consult the official pages for every entry and RSS feed).
- Also covers the Betas page https://developers.cloudflare.com/workers/platform/betas/ (public betas are openly available; private betas require access).
- Changelog entries are not configurable; compatibility dates and flags are the opt-in mechanism (see the cloudflare-wrangler skill for configuration).
- Source ordering quirk: in the historical changelog the 2019-09-19 entry appears between 2020-12-10 and 2020-12-04.
- The source changelog has no code; the snippet above is borrowed from Workers Best Practices.

## Related

- [best-practices.md](./best-practices.md)
- [limits.md](./limits.md)
- [known-issues.md](./known-issues.md)
- [../nodejs-compat/README.md](../nodejs-compat/README.md)
