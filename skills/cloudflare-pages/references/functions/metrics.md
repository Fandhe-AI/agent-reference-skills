---
source: https://developers.cloudflare.com/pages/functions/metrics/
---

# Functions metrics

Request, invocation status, CPU time and duration metrics for a Pages project's Functions.

## Signature / Usage

Dashboard: **Workers & Pages** > your Pages project > **Functions Metrics**.

GraphQL field names for invocation statuses (see table):

```text
success | clientDisconnected | scriptThrewException | exceededResources | internalError
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Success | invocation status | — | Worker script executed successfully (GraphQL `success`). |
| Client disconnected | invocation status | — | HTTP client disconnected before the request completed (`clientDisconnected`). |
| Script threw exception | invocation status | — | Unhandled JavaScript exception; Workers error code 1101 (`scriptThrewException`). |
| Exceeded resources | invocation status | — | Runtime limits exceeded (most commonly CPU time; also startup time or free tier limits); codes 1102, 1027 (`exceededResources`). |
| Internal error | invocation status | — | Workers runtime internal failure; not counted toward billing (`internalError`). |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Total requests exclude requests blocked by WAF or other security features. Success = Success or Client Disconnected; Errors = Script Threw Exception, Exceeded Resources or Internal Error. Subrequests are `fetch` calls from a Function (fetching a static asset counts); a subrequest throwing an uncaught error is not counted.
- Graphs under six hours may drop off in the last minutes because of aggregation delay.
- Invocation statuses differ from HTTP status codes.
- CPU time and Duration charts use quantiles (reservoir sampling); higher quantiles can appear to exceed CPU limits without errors due to rollover CPU time.
- Retention: up to three months in the past, in maximum increments of one week.

## Related

- [debugging-and-logging.md](./debugging-and-logging.md)
- [pricing.md](./pricing.md)
