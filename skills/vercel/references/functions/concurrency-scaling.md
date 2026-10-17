# Concurrency Scaling

Vercel automatically scales functions based on demand to handle traffic surges. Available on all plans.

## Signature / Usage

```text
Max concurrency: 30,000 (Hobby, Pro) / 100,000 (Enterprise)
Burst concurrency limit: 1000 concurrent executions per 10 seconds, per region
Over the limit: 503 FUNCTION_THROTTLED
```

## Limits

| Limit | Value |
|-------|-------|
| Max concurrent function instances — Hobby and Pro | 30,000 |
| Max concurrent function instances — Enterprise | 100,000 |
| Burst concurrency | 1000 concurrent executions per 10 seconds, per region |

## Notes

- Enterprise customers can purchase extended concurrency
- On a traffic spike Vercel temporarily raises the concurrency limit, then gradually returns it to the previous state; Vercel also preemptively adjusts the limit for growing traffic
- Scaling during substantial surges can take several minutes
- Monitor burst concurrency events with Log Drains or Runtime Logs
- Exceeding the limit triggers a `503 FUNCTION_THROTTLED` error
- Source: https://vercel.com/docs/functions/concurrency-scaling

## Related

- [fluid-compute.md](./fluid-compute.md)
- [limitations.md](./limitations.md)
- [usage-and-pricing.md](./usage-and-pricing.md)
