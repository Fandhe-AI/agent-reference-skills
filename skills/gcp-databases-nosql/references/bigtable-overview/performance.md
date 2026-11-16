---
source: https://docs.cloud.google.com/bigtable/docs/performance
---

# Understand performance

Approximate Bigtable performance under optimal conditions, capacity planning guidance, causes of slower performance, performance testing guidelines, troubleshooting steps and direct connectivity. Performance scales linearly with nodes; the numbers are estimates for 1 KB rows, read-only or write-only workloads, and must not be used for exact sizing or cost estimates.

## Signature / Usage

### Capacity examples from the source

- A 10-node SSD cluster: up to 140,000 rows per second for a typical read-only or write-only workload; with the in-memory tier enabled, read throughput up to 1.2 million rows per second.
- 3 HDD nodes with 9 TB: about 3 TB per node, 18.75% of the 16 TB HDD per-node limit.

Set a cluster to 10 nodes (example from the gcloud reference):

```bash
gcloud bigtable clusters update my-cluster-id \
    --instance=my-instance-id --num-nodes=10
```

### Testing guidelines

- Test with enough data: at least 100 GB per node (or the production total if smaller); test with a single table.
- Stay below the recommended storage utilization per node.
- Run a heavy pre-test for several minutes, then run the test for at least 10 minutes.
- For in-memory tier testing, run long enough to populate the tier with reads.
- Google's PerfKit Benchmarker with YCSB can be used; model table size (at least 100 GB), row shape, access pattern and read/write mix.

### Troubleshooting checklist

- Examine Key Visualizer scans (new scan data every 15 minutes).
- Comment out Bigtable reads/writes to see whether the problem is Bigtable-related.
- Create as few clients as possible: one per app profile (with replication or app profiles), otherwise one shared client (HBase client: few `Connection` objects).
- Read and write many different rows; compare read and write performance (aim for at least 90% of reads returning valid results).
- Check first-row latency of `ReadRows` (Java metric `read_rows_first_row_latency` with client-side metrics enabled).
- Use a separate app profile per workload; enable client-side metrics.
- Consume read stream responses before the request times out, otherwise you get `ABORTED`.

## Options / Props

### Approximate throughput per node

| Storage tier | Reads | Writes | Scans |
|--------------|-------|--------|-------|
| In-memory tier (Preview) | up to 120,000 rows/s | up to 10,000 rows/s | N/A |
| SSD | up to 17,000 rows/s | up to 14,000 rows/s | up to 220 MBps |
| HDD | up to 500 rows/s | up to 10,000 rows/s | up to 180 MBps |
| Infrequent access storage | up to 100 rows/s | up to 10,000 rows/s | up to 36 MBps |

Reads or writes (not both) per node. Enterprise Plus node includes 40,000 in-memory rows/s, scalable vertically to 120,000 in increments of 40,000. High write rates to in-memory data can reduce write throughput.

### Recommended maximum utilization

| Optimization goal | Max CPU utilization | Max storage utilization |
|-------------------|---------------------|-------------------------|
| Throughput | 90% | 70% |
| Latency | 60% | 60% |

## Notes

- Slower performance causes: many non-contiguous row keys/ranges in one read; poor schema (hotspots); large rows; very many cells per row; too few nodes (compute or storage); recent scaling (up to 20 minutes under load to improve; do not reduce cluster size by more than 10% in a 10-minute period); HDD; network issues (clients outside the cluster's zone or Google Cloud); outdated client library with replication; replication without more nodes; cold starts and low QPS (send low-rate artificial traffic or configure the connection pool).
- Java client before 2.17.1: enable channel refreshing; later versions enable it by default. The server disconnects long-lived connections every hour.
- Bigtable keeps roughly equal data per node and spreads reads/writes evenly; hot tablets may be isolated on their own node and tablets are split. Under several GB of data, all tablets are on one node.
- Direct connectivity bypasses the Google frontend (enabled by default in Java 2.76.0+, HBase adapter 2.17.0+, Go 1.50.1+). It requires a standard app profile (not Data Boost), clients on Compute Engine or GKE, and a VPC network whose routes and firewall rules allow egress to `34.126.0.0/18` and `2001:4860:8040::/42`; it uses ALTS. Clients outside Google Cloud use a standard connection. IPv4 and IPv6 supported.
- Plan storage with the expected compressed size, not uncompressed source size.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/clusters/update (the performance page has no code block).
- Source: https://docs.cloud.google.com/bigtable/docs/performance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [quotas.md](./quotas.md)
- [scaling.md](./scaling.md)
- [in-memory-overview.md](./in-memory-overview.md)
- [choosing-ssd-hdd.md](./choosing-ssd-hdd.md)
- [instances-clusters-nodes.md](./instances-clusters-nodes.md)
