---
source: https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc
---

# Reach a Private VPC Resource with Direct VPC Egress or a Connector

Send Cloud Run traffic to a VPC network, preferably with Direct VPC egress and otherwise with a Serverless VPC Access connector.

## Signature / Usage

### Option A: Direct VPC egress (no connector)

```bash
gcloud components update
gcloud services enable compute.googleapis.com
```

`--vpc-egress` is `all-traffic` or `private-ranges-only`. Specify a network, a subnet, or both.

```bash
gcloud run deploy SERVICE_NAME \
    --image=IMAGE_URL \
    --network=NETWORK \
    --subnet=SUBNET \
    --network-tags=NETWORK_TAG_NAMES \
    --vpc-egress=EGRESS_SETTING \
    --region=REGION
```

```bash
gcloud run services describe SERVICE_NAME \
    --region=REGION
```

The output contains `VPC access:` with `Network`, `Subnet` and `Egress`. The same flags work for jobs:

```bash
gcloud run jobs create JOB_NAME \
--image=IMAGE_URL \
--network=NETWORK \
--subnet=SUBNET \
--network-tags=NETWORK_TAG_NAMES \
--vpc-egress=EGRESS_SETTING \
--region=REGION
```

To remove the service from the VPC network:

```bash
gcloud run services update SERVICE_NAME --region=REGION \
--clear-network
```

Or, to remove only the network tags while keeping the service connected to the VPC network:

```bash
gcloud run services update SERVICE_NAME --region=REGION \
--clear-network-tags
```

### Option B: Serverless VPC Access connector

```bash
gcloud services enable vpcaccess.googleapis.com
```

Adapted (not in the official docs): the source omits the line-continuation backslash after `--range IP_RANGE`, which breaks the command; it was added.

```bash
gcloud compute networks vpc-access connectors create CONNECTOR_NAME \
 --region REGION \
 --network VPC_NETWORK \
 --range IP_RANGE \
 --min-instances MIN \
 --max-instances MAX \
 --machine-type MACHINE_TYPE
```

Verify the connector shows `state: READY`:

```bash
gcloud compute networks vpc-access connectors describe CONNECTOR_NAME \
--region REGION
```

Attach it to a service and choose the egress setting:

```bash
gcloud run deploy SERVICE \
--image IMAGE_URL \
--vpc-connector CONNECTOR_NAME \
--vpc-egress EGRESS_SETTING
```

Delete an unused connector (destructive, cannot be restored; try it on a disposable connector first):

```bash
gcloud compute networks vpc-access connectors delete CONNECTOR_NAME --region=REGION
```

## Options / Props

| Item | Direct VPC egress | Connector |
|---|---|---|
| Subnet | `/26` or larger (IPv4) | Dedicated `/28`, cannot change after creation |
| `--vpc-egress` | `all-traffic` \| `private-ranges-only` | `private-ranges-only` (default) \| `all-traffic` |
| Capacity | Throughput up to 1 Gbps per container instance | `--min-instances` 2 to 9 (default 2), `--max-instances` 3 to 10 (default 10), `--machine-type` `f1-micro` \| `e2-micro` (default) \| `e2-standard-4` |

## Notes

- Direct VPC egress network costs scale to zero with the service; connector VMs incur monthly charges even with no traffic and do not scale down. Connectors support egress only.
- Startup connection delays of a minute or more are possible with Direct VPC egress; use an HTTP startup probe that tests an egress destination.
- IPs are ephemeral: write firewall policies against the whole subnet range. Subnet exhaustion fails instance startup.
- The `run.allowedVPCEgress` organization policy can restrict the egress settings.
- Corrected from the official docs: the connector create command read `--range IP_RANGE` followed directly by `--min-instances MIN \` with no continuation backslash.
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails.
- Source: https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/vpc-connectors (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-service-from-source.md](./deploy-service-from-source.md)
- [worker-pool-deploy-and-scale.md](./worker-pool-deploy-and-scale.md)
- Static outbound IP: https://docs.cloud.google.com/run/docs/configuring/static-outbound-ip
