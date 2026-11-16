---
source: https://docs.cloud.google.com/memorystore/docs/redis/create-manage-instances
---

# Create and manage Redis instances

Create, list, view, edit and delete Memorystore for Redis instances with the Google Cloud console or gcloud, including Shared VPC, centralized IP range and custom IP range setups.

## Signature / Usage

### Create an instance on a VPC network

```bash
gcloud redis instances create INSTANCE_ID --size=SIZE --region=REGION_ID
```

Where INSTANCE_ID is the instance ID, SIZE is the size in GiB and REGION_ID is the region ID.

```bash
gcloud redis instances create myinstance --size=5 --region=us-central1
```

Optional flags: version, Standard Tier, AUTH, in-transit encryption.

Adapted (not in the official docs): `--redis-version=redis_6_X` changed to `redis_6_x`, the value gcloud accepts (it rejects `redis_6_X` as an invalid choice).

```bash
gcloud redis instances create myinstance --size=5 --region=us-central1 \
    --zone=us-central1-a --redis-version=redis_6_x
```

Enable AUTH with `--enable-auth`. Enable in-transit encryption with `--transit-encryption-mode=SERVER_AUTHENTICATION`.

Adapted (not in the official docs): `--region=REGION_ID` is added; without it gcloud fails with `Error parsing [instance]` unless the `redis/region` property is set.

```bash
gcloud redis instances create INSTANCE_ID --size=SIZE --region=REGION_ID --zone=ZONE --alternative-zone=ALTERNATIVE_ZONE --tier=STANDARD 
```

```bash
gcloud redis instances create myinstance --size=5 --region=us-central1 --tier=standard 
```

### Create on a Shared VPC network from a service project

Establish a private services access connection on the host project network first; otherwise create fails. Enable the Service Networking API in both host and service projects.

```bash
gcloud redis instances create INSTANCE_ID --size=SIZE --region=REGION_ID --project=SERVICE_PROJECT_ID \
  --network=projects/HOST_PROJECT_ID/global/networks/HOST_NETWORK_NAME \
  --connect-mode=private-service-access
```

### Create with a centralized IP range (private services access)

```bash
gcloud redis instances create INSTANCE_ID --size=SIZE --region=REGION_ID --project=PROJECT_ID \
  --network=projects/PROJECT_ID/global/networks/NETWORK_NAME \
  --connect-mode=private-service-access
```

### Create with a specific IP range

Direct peering:

```bash
gcloud redis instances create INSTANCE_ID --region=REGION --size=SIZE --connect-mode=DIRECT_PEERING --network=VPC_NETWORK_NAME --reserved-ip-range=RESERVED_RANGE
```

Private services access (several allocated ranges; comma-separated names allowed):

```bash
gcloud redis instances create INSTANCE_ID --region=REGION --size=SIZE --connect-mode=PRIVATE_SERVICE_ACCESS --network=VPC_NETWORK_NAME --reserved-ip-range=RESERVED_RANGE_NAME
```

### List, view, edit

```bash
gcloud redis instances list \
--region=REGION_ID
```

```bash
gcloud redis instances describe INSTANCE_ID \
--region=REGION_ID
```

```bash
gcloud redis instances update INSTANCE_ID --region=REGION_ID --display-name=NEW_DISPLAY_NAME
```

### Delete

Deleting is destructive; see Notes.

```bash
gcloud redis instances delete INSTANCE_ID --region=REGION_ID
```

## Options / Props

| Flag / value | Description |
|---|---|
| `--redis-version` | `redis_7_2`, `redis_7_0` (Default), `redis_6_x`, `redis_5_0`, `redis_4_0`, `redis_3_2` |
| `--connect-mode` | `PRIVATE_SERVICE_ACCESS` (recommended) or `DIRECT_PEERING` |
| `--reserved-ip-range` | Direct peering: a CIDR such as `10.0.0.0/29`; minimum block `/29` without read replicas, `/28` with read replicas; one range only. Private services access: name(s) of allocated range(s), comma separated |
| `--enable-auth` | Enable Redis AUTH |
| `--transit-encryption-mode=SERVER_AUTHENTICATION` | Enable in-transit encryption |
| `--tier=STANDARD` | Standard Tier |
| `--zone`, `--alternative-zone` | Primary and alternative zone |
| Instance ID | Lowercase letters, numbers and hyphens; must start with a lowercase letter; unique in its region |
| Capacity | 1 to 300 GB |
| Editable after creation | Display name, Redis configuration, labels, size |

## Notes

- Source inconsistency: the Console steps say to select Redis version `7.0 (recommended)`, the create flag list marks `redis_7_0` as default, while the supported-versions page says the default is 7.2.
- Corrected from the official docs: the source lists `redis_6_X` among the `--redis-version` values and its example ends with `--redis-version=redis_6_X`, which gcloud rejects (`Invalid choice: 'redis_6_X'. Did you mean 'redis_6_x'?`); the `--redis-version` choices in the gcloud reference are lower case (`redis_3_2`, `redis_4_0`, `redis_5_0`, `redis_6_x`, `redis_7_0`, `redis_7_2`).
- Corrected from the official docs: the generic Standard Tier command (`gcloud redis instances create INSTANCE_ID --size=SIZE --zone=ZONE --alternative-zone=ALTERNATIVE_ZONE --tier=STANDARD`) has no `--region`; gcloud 593.0.0 requires the region either from `--region` or from the `redis/region` property, otherwise it fails with `Error parsing [instance]`.
- The source writes `--tier=STANDARD` and `--connect-mode=DIRECT_PEERING` / `PRIVATE_SERVICE_ACCESS` in upper case while the gcloud help lists lower-case choices (`standard`, `direct-peering`, `private-service-access`); gcloud 593.0.0 accepts both spellings for these flags (checked locally; an invalid value is rejected with `Invalid choice`).
- Delete is destructive and all instance data is lost; try it on a disposable resource first. A recreated instance with the same name gets different IP addresses; clients that hardcode the old IPs cannot connect and must use the new primary and read endpoints.
- Creating with `--connect-mode=private-service-access` fails unless a private services access connection exists on the network. If the Console shows `No existing IP ranges available`, add the `compute.globalAddresses.list` permission.
- Default connection mode is direct peering when none is specified in scripts; private services access is recommended.
- Read replica creation and CMEK creation are covered on other pages (read replicas management, `configure-cmek`).
- The source also shows Console steps for every task.
- Source: https://docs.cloud.google.com/memorystore/docs/redis/create-manage-instances (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instances.md](./instances.md)
- [networking.md](./networking.md)
- [about-read-replicas.md](./about-read-replicas.md)
- [about-redis-auth.md](./about-redis-auth.md)
- [connect-redis-instance.md](./connect-redis-instance.md)
