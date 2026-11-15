---
source: https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc
---

# Direct VPC egress with a VPC network

Direct VPC egress lets a Cloud Run service, function, job, worker pool, or instance send traffic to a VPC network with no Serverless VPC Access connector. Worker pools and instances can also receive traffic from a VPC network (Direct VPC ingress). Each resource gets private IPs from the subnet you choose.

## Signature / Usage

### Supported configurations

- Services: egress only
- Jobs: egress only
- Worker pools: egress and ingress
- Instances: egress and ingress

### Deploy a service (gcloud)

```bash
gcloud components update
gcloud services enable compute.googleapis.com
```

```bash
gcloud run deploy SERVICE_NAME \
    --image=IMAGE_URL \
    --network=NETWORK \
    --subnet=SUBNET \
    --network-tags=NETWORK_TAG_NAMES \
    --vpc-egress=EGRESS_SETTING \
    --region=REGION
```

Specify a network, a subnet, or both. If you specify only a network, the subnet uses the same name as the network. `--vpc-egress` values: `all-traffic` (all outbound traffic through the VPC network) or `private-ranges-only` (only traffic to internal addresses through the VPC network). Network tags are set at the revision level.

```bash
gcloud run services describe SERVICE_NAME \
    --region=REGION
```

Expected output contains `VPC access:` with `Network`, `Subnet`, and `Egress: private-ranges-only`.

### Service YAML

Adapted (not in the official docs): the source indents `kind`, `metadata` and `spec` under `apiVersion`, which is not valid YAML, so the keys were moved to the top level; `tags` is written as an array (`["NETWORK_TAG_NAMES"]`) instead of the source's string.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE_NAME
  labels:
    cloud.googleapis.com/location: REGION
spec:
  template:
    metadata:
      annotations:
        run.googleapis.com/network-interfaces: '[{"network":"NETWORK","subnetwork":"SUBNET","tags":["NETWORK_TAG_NAMES"]}]'
        run.googleapis.com/vpc-access-egress: EGRESS_SETTING
    spec:
      containers:
      - image: IMAGE
```

```bash
gcloud run services describe SERVICE --format export > service.yaml
gcloud run services replace service.yaml
```

### Job

```bash
gcloud run jobs create JOB_NAME \
--image=IMAGE_URL \
--network=NETWORK \
--subnet=SUBNET \
--network-tags=NETWORK_TAG_NAMES \
--vpc-egress=EGRESS_SETTING \
--region=REGION
```

For jobs, network tags are set at the execution level. Job YAML uses `apiVersion: run.googleapis.com/v1`, `kind: Job` with the same two annotations, applied with `gcloud run jobs replace job.yaml`.

### Worker pool

For Direct VPC egress:

```bash
gcloud run worker-pools deploy WORKER_POOL \
    --image=IMAGE_URL \
    --network=NETWORK \
    --subnet=SUBNET \
    --network-tags=NETWORK_TAG_NAMES \
    --region=REGION
```

For Direct VPC ingress:

```bash
gcloud run worker-pools deploy WORKER_POOL \
    --image=IMAGE_URL \
    --network=NETWORK \
    --subnet=SUBNET \
    --region=REGION
```

Worker pool names: 49 characters or less, unique per region and project, and must not share a name with an existing service. In YAML (`kind: WorkerPool`, applied with `gcloud run worker-pools replace worker-pool.yaml`), remove `run.googleapis.com/vpc-access-egress` and `tags` for ingress only.

### Instance (beta)

```bash
gcloud beta run instances deploy INSTANCE_NAME \
    --image=IMAGE_URL \
    --network=NETWORK \
    --subnet=SUBNET \
    --network-tags=NETWORK_TAG_NAMES \
    --region=REGION
```

Omit `--network-tags` for ingress only. Instance YAML (`kind: Instance`) needs `run.googleapis.com/launch-stage: BETA`, applied with `gcloud beta run instances replace instance.yaml`.

### Read the private IP from the metadata server

Run inside a worker pool instance or Cloud Run instance:

```console
curl "http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/ip" -H "Metadata-Flavor: Google"
```

IPv6 path: `/computeMetadata/v1/instance/network-interfaces/0/ipv6` (requires a dual-stack subnet). The server returns `404 Not Found` for IPv6 on an IPv4-only subnet, or for any `network-interfaces` path when the resource is not connected to a VPC network.

### Network tags and disconnect

```bash
gcloud run deploy SERVICE_JOB_NAME \
    --image=IMAGE_URL \
    --network=NETWORK \
    --subnet=SUBNET \
    --network-tags=NETWORK_TAG_NAMES \
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

The same `--clear-network` / `--clear-network-tags` flags exist for `gcloud run jobs update`, `gcloud run worker-pools update`, and `gcloud beta run instances update`.

### Find allocated addresses and Cloud Run subnets

```bash
gcloud compute addresses list --filter="purpose=SERVERLESS"
```

## Options / Props

| Item | Value |
|------|-------|
| `--vpc-egress` | `all-traffic` \| `private-ranges-only` |
| Minimum subnet size (IPv4) | `/26` or larger |
| IP reservation block | 16 addresses (`/28` mask) at a time |
| Services / worker pools IP use | 2x the container instance count at steady state; IPs retained up to 20 minutes after scale down |
| Jobs IP use | 1 IP per task for its execution plus 7 minutes after it completes |
| Instances IP use | 4 IPs per instance while connected |
| Throughput | up to 1 Gbps per container instance; more is throttled |
| Subnet deletion | disconnect or redeploy all resources, then wait 1-2 hours |
| Supported IPv4 ranges | RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), RFC 6598 (`100.64.0.0/10`), Class E (`240.0.0.0/4`) |

Example sizing: revision 1 scales 100 to 0 while revision 2 scales 0 to 100, so reserve at least 400 IPs `(100 + 100) * 2` during the 20-minute window.

Cloud Run Service Agent permissions needed on the project (role `roles/run.serviceAgent` by default): `compute.networks.get`, `compute.subnetworks.get`, `compute.subnetworks.use` (on the project or the specific subnet), `compute.addresses.get`, `compute.addresses.list`, `compute.addresses.createInternal`, `compute.addresses.deleteInternal`, `compute.regionOperations.get`; `compute.addresses.create` / `compute.addresses.delete` only for dual-stack with external IPv6. Alternative: grant `roles/compute.networkUser` to `service-PROJECT_NUMBER@serverless-robot-prod.iam.gserviceaccount.com` (plus `roles/compute.publicIpAdmin` for external IPv6).

## Notes

- Limitations: startup connection delays of a minute or more are possible, so use an HTTP startup probe that tests an egress destination; jobs over 1 hour may see connection breaks during maintenance (container gets `SIGTSTP` 10 seconds before and `SIGCONT` after; retry after `SIGCONT`); with Cloud NAT, cold-start delays of 30s or more are possible and the source recommends Serverless VPC Access connectors with Cloud NAT for better startup performance.
- Source inconsistency: this page recommends Serverless VPC Access connectors with Cloud NAT for better startup performance (https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc), while the networking best practices and static outbound IP pages recommend Direct VPC egress with `all-traffic` and Cloud NAT and present the connector as an option (https://docs.cloud.google.com/run/docs/configuring/networking-best-practices, https://docs.cloud.google.com/run/docs/configuring/static-outbound-ip).
- Source inconsistency: this page's job YAML uses `apiVersion: run.googleapis.com/v1` (https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc), while the connector page's job YAML uses `apiVersion: serving.knative.dev/v1` with `kind: Job` (https://docs.cloud.google.com/run/docs/configuring/vpc-connectors).
- Not supported by Direct VPC egress: VPC firewall rules logging, Packet Mirroring, network tags or service identity in ingress firewall rules, Resource Manager tags in firewall rules, Cloud NGFW Enterprise inspection; VPC Flow Logs lack the revision name. Ingress to worker pools and instances works only with Direct VPC, not connectors; network tags cannot target ingress firewall rules.
- Comparison with connectors (from the source): connectors do not support ingress; Direct VPC egress network costs scale to zero with the service.
- IPs are ephemeral: do not write policies on individual IPs; use the whole subnet range. The same subnet can be shared by many resources.
- Subnet exhaustion error: `Instance failed to start because of insufficient free IP addresses in the subnetwork SUBNET_ID ...`. A reserved address cannot be deleted manually. Custom MTU issues: use the default MTU.
- The `run.allowedVPCEgress` organization policy restricts which egress settings developers can select.
- The metadata server call uses plain HTTP by design (link-local `metadata.google.internal`, reachable only from inside the instance).
- Adapted from the official docs: YAML blocks in the source indent `kind`/`metadata`/`spec` under `apiVersion` (invalid YAML).
- Corrected from the official docs: the source's service, job and worker pool YAML write `'[{"network":"NETWORK","subnetwork":"SUBNET","tags":"NETWORK_TAG_NAMES"}]'` with `tags` as a string, but `NetworkInterface.tags` is `array<string>` in the Cloud Run Admin API and the source's own instance YAML writes `"tags":["NETWORK_TAG_NAMES"]`; use the array form even for one tag (`"tags":["TAG_1","TAG_2"]` for several). The same applies to the job and worker pool YAML described in prose above.
- The source also shows Console, Terraform, and detailed per-resource YAML/disconnect forms (service/job/instance YAML disconnect).
- Cloud Run is Google Cloud's serverless container platform, distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`).
- Source: https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-connectors.md](./vpc-connectors.md)
- [static-outbound-ip.md](./static-outbound-ip.md)
- [connecting-shared-vpc.md](./connecting-shared-vpc.md)
- [networking-best-practices.md](./networking-best-practices.md)
- [private-networking.md](./private-networking.md)
