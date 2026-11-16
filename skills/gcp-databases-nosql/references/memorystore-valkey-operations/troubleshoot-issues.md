---
source: https://docs.cloud.google.com/memorystore/docs/valkey/troubleshoot-issues
---

# Troubleshoot issues

Error scenarios and resolutions for Memorystore for Valkey: replication lag, CPU and latency, memory stress, alerts, connection limits, I/O timeouts, firewall and organization policy connectivity errors, Cluster Mode Disabled errors and AOF persistence.

## Signature / Usage

### Isolate the source of latency

From a Compute Engine VM in the same region and VPC network as the instance, install `valkey-cli` if needed:

```bash
sudo apt-get install valkey-tools
```

```bash
sudo yum install valkey-tools
```

Measure latency in milliseconds (let it run a few minutes, `Ctrl+C` for results). If the instance uses in-transit encryption, append the `--tls` flag and specify your certificate authorities (CAs):

Adapted (not in the official docs): the source runs `redis-cli` after installing `valkey-tools`, which provides `valkey-cli`; the command uses `valkey-cli`.

```bash
valkey-cli --latency -h ENDPOINT_ADDRESS -p PORT
```

ENDPOINT_ADDRESS is the IP address of the instance's endpoint; PORT is typically 6379. A consistently low average (typically 1 millisecond or less) means the instance is healthy; remaining delays come from the network (cross-region or cross-zone routing) or the client (high CPU or memory, exhausted connection pools, application logic).

### Allow Private Service Connect from organization policies

If the policy uses `restrictPrivateServiceConnectProducer`, allowlist the Memorystore for Valkey folder `672235397475`:

```yaml
name: organizations/Consumer-org-1/policies/compute.restrictPrivateServiceConnectProducer
spec:
    rules:
      - values:
          allowedValues:
          - under:folders/672235397475
```

If it uses `disablePrivateServiceConnectCreationForConsumers`, allowlist `SERVICE_PRODUCERS`:

```yaml
name: organizations/Consumer-org-1/policies/compute.disablePrivateServiceConnectCreationForConsumers
spec:
    rules:
      - values:
          allowedValues:
          - SERVICE_PRODUCERS
```

## Options / Props

| Scenario | Guidance |
|---|---|
| Monitor replication lag | Metric `/instance/replication/maximum_offset_diff`; alert below 64 MB for `shared-core-nano`, `custom-pico`, `custom-micro`, `custom-mini`, `standard-small`, `highmem-medium`, `highcpu-medium`, `standard-large`; below 1 GB for `highmem-xlarge`, `highmem-2xlarge` |
| Replication lag | Too many writes: increase the number of shards |
| Output buffer out of space | Set a smaller `maxmemory`; use the `allkeys-lru` `maxmemory` policy (evicts least recently used keys from the entire keyset) |
| Memory stress | `/instance/memory/maximum_utilization`; scale up when approaching 80% and growth is expected |
| Connection limit reached (connection rejection) | `/instance/node/stats/rejected_connections_count`, `/instance/node/clients/connected_clients`; stop leaked connections with `client kill`; reduce connection count or pool size; adjust the maximum clients limit; scale to a larger node type |
| I/O timeout | `instance/cpu/maximum_utilization` below 80% on all nodes; retry with exponential backoff and jitter |
| Firewall | Allow TCP port 6379 and TCP ports 11000 through 13047 for all Private Service Connect endpoints |
| Unresponsive connections | Configure TCP keep-alive (`time`, `interval`, `probes`; for example 30 s, 10 s, 3) and TCP user timeout (for example 15 s) |
| Cluster Mode Disabled: read endpoint without replicas | Connection closes with `ERR no replicas found`; connect to the primary endpoint or add read replicas |
| Cluster Mode Disabled: failover or all read replicas failing | Connections close with `ERR role change occurred`; retry with exponential backoff |
| AOF cannot keep up with write traffic | AOF grows faster than rewriting; leads to disk exhaustion, write failures and blocks replica creation and full sync; Memorystore applies guardrails to regulate write throughput |

## Notes

- `shared-core-nano` has no SLA; use it only for development or testing and choose another node type in production.
- If CPU is high or resources are exhausted (for example too many connections), external metrics might be missing.
- Corrected from the official docs: the source installs `valkey-tools` (which provides `valkey-cli`) but runs the latency check as `redis-cli --latency -h ENDPOINT_ADDRESS -p PORT`; the example uses `valkey-cli`.
- Org policy folder `672235397475` and the PSC port ranges are service specifics; do not widen allowlists beyond what the source shows.
- Memorystore for Valkey on Google Cloud: managed Valkey, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/troubleshoot-issues (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [general-best-practices.md](./general-best-practices.md)
- [supported-monitoring-metrics.md](./supported-monitoring-metrics.md)
- [monitor-instances.md](./monitor-instances.md)
