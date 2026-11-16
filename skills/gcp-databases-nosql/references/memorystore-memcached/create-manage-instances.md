---
source: https://docs.cloud.google.com/memorystore/docs/memcached/create-manage-instances
---

# Create and manage Memcached instances

How to create, view, edit, and delete Memorystore for Memcached instances with the Google Cloud console and gcloud. Any network used must have a private services access connection, otherwise it cannot be selected at creation.

## Signature / Usage

### Create an instance

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud config set core/project PROJECT_ID
```

Adapted (not in the official docs): placeholders upper-cased; `zone(s)` replaced by `ZONES` because unquoted parentheses are a shell syntax error.

```bash
gcloud memcache instances create INSTANCE_ID --node-count=NUMBER_OF_NODES --node-cpu=NUMBER_OF_CPUS --node-memory=MEMORY_PER_NODE --region=REGION --zones=ZONES --memcached-version=MEMCACHED_VERSION
```

Example:

```bash
gcloud memcache instances create myinstance --node-count=3 --node-cpu=2 --node-memory=2GB --region=us-central1 --zones=us-central1-a,us-central1-b,us-central1-c --memcached-version=1.6.15
```

Exclude `--zones` to distribute nodes automatically among zones.

### Create an instance with a specific IP range

Adapted (not in the official docs): placeholders upper-cased; `zone(s)` and `range-name(s)` replaced by `ZONES` and `RANGE_NAMES` because unquoted parentheses are a shell syntax error.

```bash
gcloud memcache instances create INSTANCE_ID --node-count=NUMBER_OF_NODES --node-cpu=NUMBER_OF_CPUS --node-memory=MEMORY_PER_NODE --region=REGION --zones=ZONES --authorized-network=NETWORK --reserved-ip-range-id=RANGE_NAMES
```

Example:

```bash
gcloud memcache instances create myinstance --node-count=3 --node-cpu=2 --node-memory=2GB --region=us-central1 --zones=us-central1-a,us-central1-b,us-central1-c --authorized-network=projects/my-project-335118/global/networks/default --reserved-ip-range-id=myrange1,myrange2
```

### View instances

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances list --region=REGION_ID
```

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances describe INSTANCE_ID --region=REGION_ID
```

### Edit an instance

Updatable after creation: number of nodes, Memcached configuration, labels, display name.

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances update INSTANCE_ID --region=REGION_ID --display-name=NAME --labels=KEY=VALUE
```

### Delete an instance

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances delete INSTANCE_ID --region=REGION_ID
```

## Options / Props

| Flag | Description |
|---|---|
| `--node-count` | Number of nodes. |
| `--node-cpu` | vCPU count: `1` or `2-32` (even values only). Each vCPU requires 0.9 GB of node memory and supports up to 8 GB. |
| `--node-memory` | Memory per node. Minimum 1 GB or (0.9 GB * vCPUs per node), whichever is greater; maximum 256 GB (requires `--node-cpu=32`). |
| `--region` | Region in which to create the nodes. |
| `--zones` | Zones for the nodes; omit for automatic distribution. |
| `--memcached-version` | Source says acceptable values are `1.5` and `1.6.15`. |
| `--authorized-network` | Format `projects/NETWORK_PROJECT_ID/global/networks/NETWORK_ID`. Must match the network of the allocated IP range, otherwise the create operation fails. |
| `--reserved-ip-range-id` | Name(s) of one or more allocated private services access ranges. |

Instance ID (gcloud section): 1 to 63 characters, lowercase letters, numbers, or hyphens; starts with a lowercase letter and ends with a lowercase letter or number.

## Notes

- Destructive: `gcloud memcache instances delete` removes the instance and its data. Try it on a disposable instance first.
- Source inconsistency: `--memcached-version` accepts `1.5` and `1.6.15` here, while other pages list `1.5.16` and `1.6.15`; instance ID length is 1 to 63 characters here but at most 40 on instance-node-properties.
- Editing the number of nodes in the console is also possible; the source also shows Console steps for create, edit, view and delete, omitted here.
- Distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`): this is managed Memcached on Google Cloud.
- Corrected from the official docs: the source's create templates contain `--zones=zone(s)` and `--reserved-ip-range-id=range-name(s)`; unquoted parentheses make the command a shell syntax error, so they are written `ZONES` and `RANGE_NAMES`.
- Adapted from the official docs: the source writes its placeholders in lower case (`project-id`, `instance-id`, `instance_id`, `number-of-nodes`, `number-of-cpus`, `memory-per-node`, `region`, `region-id`, `region_id`, `memcached-version`, `network`, `name`, `key=value`); they are upper-cased here.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/create-manage-instances (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-instance-gcloud.md](./create-instance-gcloud.md)
- [networking.md](./networking.md)
- [access-control.md](./access-control.md)
- [scale-instances.md](./scale-instances.md)
- [configure-memcached.md](./configure-memcached.md)
- [connect-memcached-instance.md](./connect-memcached-instance.md)
