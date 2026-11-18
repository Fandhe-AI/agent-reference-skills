---
source: https://docs.cloud.google.com/monitoring/uptime-checks
---

# Uptime check ICMP pings and failure causes

Public uptime checks can send up to 3 ICMP pings per check to help tell network-connectivity problems from application timeouts. This page also lists what makes a check succeed and the common causes of failure.

## Signature / Usage

The `HttpCheck` and `TcpCheck` objects both carry a `pingConfig` field of type `PingConfig`:

```text
{
  "pingsCount": integer
}
```

## Options / Props

### Fields added to `httpRequest` in the log entry when a ping fails

| Field | Meaning |
|---|---|
| `rtt_usec` | Round-trip time for each unsuccessful ping request |
| `unreachable_count` | Number of ping requests that returned `ICMP_DEST_UNREACH` |
| `no_answer_count` | Number of ping requests that timed out with no response |

### Common failure causes

| Symptom | Likely cause |
|---|---|
| Connection Error - Refused | No web server answering HTTP on a new instance; HTTPS may need extra configuration; check firewall |
| Name or service not found | Hostname incorrect |
| 403 Forbidden | Service returns an error to the checker (for Cloud Run targets, check the `run.routes.invoke` permission on the service) |
| 404 Not found | Path incorrect |
| 408 Request timeout or no response | Port wrong, service not running or inaccessible, timeout too low, or firewall blocks uptime servers |

## Notes

- By default no pings are sent. Each ping adds latency to the check. Private uptime checks cannot send pings.
- Ping results are written to Cloud Logging only when the public check fails; pings of successful checks are not logged.
- Console: expand More target options and set ICMP Pings. API: use the `PingConfig` object.
- The response timeout is set in the Response Validation options. One failing checker out of several (for example from network congestion) does not cause a notification under the default alerting policy configuration.
- In the console you can click Test before saving. A check is successful when the HTTP status matches and the required content (if any) is found.
- Snippet taken from https://docs.cloud.google.com/monitoring/uptime-checks (the `PingConfig` structure shown in the ICMP section).
- Source: https://docs.cloud.google.com/monitoring/uptime-checks (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [uptime-checks.md](./uptime-checks.md)
- [introduction.md](./introduction.md)
