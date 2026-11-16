---
source: https://docs.cloud.google.com/memorystore/docs/memcached/scale-instances
---

# Scale Memcached instances

You can scale the number of nodes between 1 and 20. Node memory and vCPU count cannot be scaled; that requires recreating the instance.

## Signature / Usage

### View the node list

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances describe INSTANCE_ID --region=REGION
```

### Scale the node count

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances update INSTANCE_ID --region=REGION --node-count=DESIRED_NUMBER_OF_NODES
```

Example:

```bash
gcloud memcache instances update myinstance --region=us-central1 --node-count=6
```

## Notes

- Scaling out: unless you use Auto Discovery, add the new node IPs to your application manually. Memorystore does not rebalance data across nodes.
- Scaling in: data on deleted nodes is lost. Nodes are removed from the end of the node list (12 to 8 nodes deletes nodes 9-12). If you manage nodes manually, remove references to nodes before scaling in; Auto Discovery handles this automatically.
- Destructive when scaling in: try it on a disposable instance first.
- The Console flow (Edit, Nodes field, Save) is omitted.
- Adapted from the official docs: the source writes `gcloud memcache instances describe instance-id --region=us-region` and `gcloud memcache instances update instance-id --region=region --node-count=desired-number-of-nodes`; the placeholders are upper-cased here.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/scale-instances (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-auto-discovery.md](./about-auto-discovery.md)
- [configure-memcached.md](./configure-memcached.md)
- [monitor-instances.md](./monitor-instances.md)
- [quotas.md](./quotas.md)
