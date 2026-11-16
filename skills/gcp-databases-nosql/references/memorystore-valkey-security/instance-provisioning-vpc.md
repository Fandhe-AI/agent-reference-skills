---
source: https://docs.cloud.google.com/memorystore/docs/valkey/instance-provisioning-vpc
---

# Instance provisioning on a VPC network

gcloud quickstart for enabling APIs, creating a service connection policy, and creating, describing and deleting a Memorystore for Valkey instance on a standard VPC network (Shared VPC has its own page).

## Signature / Usage

### Enable APIs

```bash
gcloud services enable --project=PROJECT_ID networkconnectivity.googleapis.com
gcloud services enable --project=PROJECT_ID compute.googleapis.com
gcloud services enable --project=PROJECT_ID serviceconsumermanagement.googleapis.com
gcloud services enable --project=PROJECT_ID memorystore.googleapis.com
```

### Create a service connection policy

Uses the `default` network and `default` subnet. Replace POLICY_NAME, PROJECT_ID and REGION (the region of the future instance).

```bash
gcloud network-connectivity service-connection-policies create POLICY_NAME \
  --network=default \
  --project=PROJECT_ID \
  --region=REGION \
  --service-class=gcp-memorystore \
  --subnets=https://www.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/subnetworks/default
```

### Validate the policy

```bash
gcloud network-connectivity service-connection-policies list --region=REGION --project=PROJECT_ID
```

### Create an instance

```bash
gcloud memorystore instances create INSTANCE \
--project=PROJECT_ID \
--location=REGION \
--node-type=NODE_TYPE \
--shard-count=SHARD_COUNT \
--replica-count=REPLICA_COUNT \
--endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/PROJECT_ID/global/networks/NETWORK_ID", "projectId": "PROJECT_ID"}}]}]'
```

### Describe and delete

```bash
gcloud memorystore instances describe INSTANCE \
--project=PROJECT_ID \
--location=REGION
```

```bash
gcloud memorystore instances delete INSTANCE \
--project=PROJECT_ID \
--location=REGION
```

## Options / Props

| Placeholder | Meaning |
|-------------|---------|
| INSTANCE | instance ID |
| NODE_TYPE | node type; `shared-core-nano` has no SLA, use only for development or testing |
| SHARD_COUNT | number of shards; determines total memory capacity |
| REPLICA_COUNT | read replicas per shard; accepted values `0`-`5` |
| NETWORK_ID | network used to create the instance |

## Notes

- Run `create` with the same network and region where the service connection policy is defined.
- `instances delete` is destructive; try it on a disposable instance first.
- Managed Valkey on Google Cloud; distinct from Upstash Redis (`upstash`). gcloud setup is in `gcp-cli`.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/instance-provisioning-vpc (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [networking.md](./networking.md)
- [about-multiple-vpc-networking.md](./about-multiple-vpc-networking.md)
