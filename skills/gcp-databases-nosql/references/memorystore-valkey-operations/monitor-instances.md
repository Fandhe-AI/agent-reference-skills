---
source: https://docs.cloud.google.com/memorystore/docs/valkey/monitor-instances
---

# Monitor instances

Monitor a Memorystore for Valkey instance with the Google Cloud console, Cloud Monitoring (Metrics Explorer) and an alert policy on average memory utilization. The service is compatible with open source Valkey, so existing Valkey monitoring tools can also be run from Compute Engine VMs.

## Signature / Usage

### Latency check from a VM

The source describes monitoring only through the console; this latency command is from the troubleshooting page.

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/troubleshoot-issues (run from a Compute Engine VM in the same region and VPC network; append `--tls` and specify CAs if the instance uses in-transit encryption):

```bash
redis-cli --latency -h ENDPOINT_ADDRESS -p PORT
```

### View core metrics in the console

1. Go to the **Memorystore for Valkey** page (https://console.cloud.google.com/memorystore/valkey/instances).
2. Click the instance ID. The instance **Monitoring** page charts CPU seconds, memory usage, received connections and others.

### View memory utilization in Metrics Explorer

In **Monitoring**, open **Metrics Explorer** (or **Resources** > **Metrics Explorer**) and select resource type *Memorystore Instance* and metric *Memory utilization - average*.

### Alert on memory usage

1. **Monitoring** > **Alerting** > **Create a Policy**.
2. Condition: metric *Memory utilization - average* for the *Memorystore Instance* resource; **Next**.
3. Trigger: **Any time the series violates**, **Threshold position** = **Above threshold**, **Threshold** = the memory usage percentage to be notified at.
4. Select a notification channel and name the policy (for example "Memorystore instance memory utilization alert"); **Create Policy**.

## Notes

- Cloud Monitoring pricing: https://cloud.google.com/stackdriver/pricing
- The list of Cloud Monitoring metrics is in [supported-monitoring-metrics.md](./supported-monitoring-metrics.md).
- Memorystore for Valkey on Google Cloud: managed Valkey, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/monitor-instances (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-monitoring-metrics.md](./supported-monitoring-metrics.md)
- [troubleshoot-issues.md](./troubleshoot-issues.md)
- [general-best-practices.md](./general-best-practices.md)
