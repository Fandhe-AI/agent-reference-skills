---
source: https://docs.cloud.google.com/memorystore/docs/memcached/quotas
---

# Quotas and limits

Resource capacity limits and per-second management API quotas for Memorystore for Memcached. There is no limit or quota for the total number of queries/operations made to a Memcached instance.

## Signature / Usage

### Create an instance (nodes, vCPUs and memory count against the regional limits)

```bash
gcloud memcache instances create my-memcache-instance \
    --region=us-central1 --node-count=3 --node-cpu=2 \
    --node-memory=2GB
```

## Options / Props

### Regional limits

| Limit | Value |
|---|---|
| Nodes per region | 100 |
| vCPUs available per region | 2000 |
| Total memory available per region | 10 TiB |

### Node limits

| Limit | Value |
|---|---|
| Connected clients per node | 65,000 |

### Management operations quota

Subject to change. Applies to `memcache.googleapis.com` requests (not OSS Memcached commands), per Google Cloud console project, shared across all applications and IP addresses of that project.

| Quota | Value |
|---|---|
| API read requests per 100s | 500 (5 QPS) |
| API write requests per 100s | 500 (5 QPS) |

## Notes

- To request higher regional capacity: open the Quotas page in the Google Cloud console, select the Memorystore for Memcached API service, tick the quota for the desired region, click Edit Quotas, enter contact information and the desired quota, and submit the request.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/create (the quotas page has no code); the node count, vCPUs and memory requested at creation count against the regional limits.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-node-properties.md](./instance-node-properties.md)
- [scale-instances.md](./scale-instances.md)
