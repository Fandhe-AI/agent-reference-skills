---
source: https://developers.cloudflare.com/workers/observability/profiling-in-production/
---

# Profiling in production

Capture CPU and allocation profiles for deployed Workers and Durable Objects using the dashboard, the Cloudflare CLI (`cf`), or the Cloudflare API.

## Signature / Usage

CLI (see all options with `cf workers versions profile --help`). Worker CPU profile for 5 seconds:

```bash
cf workers versions profile latest \
  --worker-id "$WORKER_ID" \
  --duration-ms 5000 \
  --profile-type cpu > worker-cpu.pprof
```

Durable Object heap profile:

```bash
cf workers versions profile latest \
  --worker-id "$WORKER_ID" \
  --duration-ms 5000 \
  --profile-type heap \
  --namespace-id "$NAMESPACE_ID" \
  --actor-id "$DURABLE_OBJECT_ID" > durable-object-heap.pprof
```

API, Worker CPU profile:

```bash
curl --fail --silent --show-error --request POST \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/versions/latest/profile" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "duration_ms": 10000
  }' \
  --output worker-cpu.pprof.gz
```

API, Durable Object heap profile:

```bash
curl --fail --silent --show-error --request POST \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/versions/latest/profile" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data "{
    \"duration_ms\": 10000,
    \"profile_type\": \"heap\",
    \"namespace_id\": \"$NAMESPACE_ID\",
    \"actor_id\": \"$DURABLE_OBJECT_ID\"
  }" \
  --output durable-object-heap.pprof.gz
```

## Options / Props

API request body fields:

| Field | Meaning |
| --- | --- |
| `duration_ms` | Required integer from `1000` to `50000` milliseconds. |
| `profile_type` | Optional: `cpu` (default) or `heap`. |
| `namespace_id` | Durable Object namespace ID. Required together with `actor_id` for a Durable Object capture. |
| `actor_id` | Durable Object instance ID, a 64-character hexadecimal string. Required together with `namespace_id` for a Durable Object capture. |

Frame table values:

| Value | Meaning |
| --- | --- |
| Self | CPU time or allocated memory attributed to the frame, excluding descendants |
| Total | CPU time or allocated memory attributed to the frame and its descendants |
| Percent of profile | Share of the whole capture |

API error messages:

| Error message | Meaning or action |
| --- | --- |
| `No recent executions were found for this Worker.` | Send traffic to the selected Worker version or target Durable Object instance, then retry capture. |
| `The Worker has no loaded isolate in its recent execution locations.` | Send traffic to the target version or Durable Object instance, then retry capture. |
| `Worker profiling is unavailable in this environment.` | Profiling is unavailable in the target environment. |
| `This Worker does not support runtime profiling.` | The selected Worker does not support profiling. |
| `The Worker runtime could not start profiling. Please try again.` | Retry capture. |

## Notes

- Profile types: CPU (default) finds functions consuming CPU time. Heap collects a stack trace every 512 kB allocated during capture; it measures allocations, not retained memory, and is not a heap snapshot.
- Traffic is needed before and during capture: capture targets a recently active, already-loaded isolate and does not invoke your code. Log time range and filters do not control capture.
- Enable source maps first (uploaded by default from Wrangler 4.150.0; earlier set `upload_source_maps` to `true`), otherwise frames reference the minified bundle.
- Dashboard (Worker): **Workers & Pages** > your Worker > **Observability** > view dropdown *Flamegraph* > **Profile type** CPU or Heap > **Duration (ms)** 1000 to 50000 (default 10000) > **Version** *Latest* or an active-deployment version > **Capture profile**. Durable Object: **Durable Objects** > namespace > instance > **Observability** > *Flamegraph*, same fields.
- CLI: requires a positional version identifier (`latest`, a UUID, or UUID prefix of at least eight characters) and `--worker-id`. `latest` selects the most recently created version, not necessarily a deployed one. Output is raw binary pprof on stdout. For Durable Objects, `$WORKER_ID` is the Worker that owns the namespace, not a Worker that only calls it through a binding; pass both `--namespace-id` and `--actor-id`.
- API token needs **Workers Scripts Read** permission or the **Content Read-Only** Workers role. The API returns a gzip-compressed pprof profile. The selected version must be loaded and running, with traffic during capture.
- Flamegraph: callers appear above callees; frame width is proportional to CPU time or allocated memory; not a timeline. Select a frame to focus on its subtree; percentages stay relative to the whole capture. **Download profile** gives the raw pprof file.
- Capture requests are rate limited; the API returns HTTP `429`. Follow the `Retry-After` header.

## Related

- [source-maps.md](./source-maps.md)
- [cpu-profiling.md](./cpu-profiling.md)
- [memory-profiling.md](./memory-profiling.md)
- [devtools.md](./devtools.md)
