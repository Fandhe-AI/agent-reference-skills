---
source: https://docs.cloud.google.com/memorystore/docs/memcached/configure-memcached
---

# Configure Memcached instances

Memorystore for Memcached supports a subset of native Memcached parameters. Configurations are updated first (staged) and then applied to nodes. Applying a parameter update to a node causes a full cache flush on that node. Use the same configuration for all nodes.

## Signature / Usage

### View configuration

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances describe INSTANCE_ID --region=REGION
```

### Modify parameters (stage, then apply)

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances update INSTANCE_ID --region=REGION --parameters=PARAMETER=VALUE,PARAMETER=VALUE
```

List node IDs:

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances describe INSTANCE_ID --region=REGION --format="value(memcacheNodes.nodeId.list())"
```

Apply one by one or in batches (recommended; avoids unavailability and reduces data loss):

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances apply-parameters INSTANCE_ID --region=REGION --node-ids=NODE_1_ID,NODE_2_ID
```

Apply to all nodes at once (not recommended):

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances apply-parameters INSTANCE_ID --region=REGION --apply-all
```

### Set parameters at creation

Adapted (not in the official docs): `--size=size` replaced by the required `--node-count`, `--node-cpu` and `--node-memory` flags (gcloud has no `--size` for Memcached instances); placeholders upper-cased.

```bash
gcloud memcache instances create INSTANCE_NAME --node-count=NUMBER_OF_NODES --node-cpu=NUMBER_OF_CPUS --node-memory=MEMORY_PER_NODE --region=REGION --parameters=PARAMETER=VALUE,PARAMETER=VALUE
```

## Options / Props

| Command | Rule |
|---|---|
| `update --parameters` | Cannot be combined with any other flag. |
| `create --parameters` | Can be combined with all other flags. |
| `describe` | Parameters appear only if changed from their default. |

To reset a parameter to default in the console, clear its value in Edit Configuration, stage, and update nodes.

## Notes

- Destructive: `apply-parameters` flushes the cache of each targeted node, and `--apply-all` flushes all nodes at once. Try it on a disposable instance first.
- The console flow (Edit Configuration, Continue, Update Selected Nodes) is omitted.
- Distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Corrected from the official docs: the source's create example is `gcloud memcache instances create instance-name --size=size --region=region --parameters=parameter=value,parameter=value`; gcloud rejects `--size` (`unrecognized arguments`) and requires `--node-count`, `--node-cpu` and `--node-memory` (see https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/create and create-manage-instances.md).
- Adapted from the official docs: the source writes its placeholders in lower case (`instance-id`, `region`, `parameter=value,parameter=value`, `node-1-id,node-2-id`); they are upper-cased here.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/configure-memcached (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-memcached-configurations.md](./supported-memcached-configurations.md)
- [memory-management-best-practices.md](./memory-management-best-practices.md)
- [scale-instances.md](./scale-instances.md)
