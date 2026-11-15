---
source: https://docs.cloud.google.com/run/docs/configuring/vpc-connectors
---

# Serverless VPC Access connectors

Let a Cloud Run service, job, or worker pool send traffic to a VPC network through a Serverless VPC Access connector. Connectors incur a monthly charge (pricing: `https://cloud.google.com/vpc/pricing#serverless-vpc-pricing`). Direct VPC egress needs no connector.

## Signature / Usage

### Create a connector (gcloud)

```bash
gcloud components update
gcloud services enable vpcaccess.googleapis.com
```

With an existing subnet:

```bash
gcloud compute networks vpc-access connectors create CONNECTOR_NAME \
 --region REGION \
 --subnet SUBNET_NAME \
 --subnet-project HOST_PROJECT_ID \
 --min-instances MIN \
 --max-instances MAX \
 --machine-type MACHINE_TYPE
```

Omit `--subnet-project` if the connector and subnet are in the same project. With a new subnet:

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

Verify the connector is `READY` (output contains `state: READY`):

```bash
gcloud compute networks vpc-access connectors describe CONNECTOR_NAME \
--region REGION
```

### Attach to a service or job

```bash
gcloud run deploy SERVICE --image IMAGE_URL --vpc-connector CONNECTOR_NAME
gcloud run services update SERVICE --vpc-connector CONNECTOR_NAME
gcloud run jobs create JOB --image IMAGE_URL --vpc-connector CONNECTOR_NAME
gcloud run jobs update JOB --vpc-connector CONNECTOR_NAME
```

Use `--clear-vpc-connector` on `gcloud run services update` / `gcloud run jobs update` to disconnect.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    metadata:
      annotations:
        run.googleapis.com/vpc-access-connector: CONNECTOR_NAME
      name: REVISION
```

A new `REVISION` name must start with `SERVICE-`, contain only lowercase letters, numbers and `-`, not end with `-`, and not exceed 63 characters. Apply with `gcloud run services replace service.yaml`. Worker pool connectors are Preview and configured with Terraform (`vpc_access { connector, egress = "ALL_TRAFFIC" }`).

### Egress setting

```bash
gcloud run deploy SERVICE \
--image IMAGE_URL \
--vpc-connector CONNECTOR_NAME \
--vpc-egress EGRESS_SETTING
```

```bash
gcloud run services update SERVICE --vpc-egress EGRESS_SETTING
gcloud run jobs update JOB --vpc-egress EGRESS_SETTING
```

YAML annotation: `run.googleapis.com/vpc-access-egress: EGRESS_SETTING` (requires `run.googleapis.com/vpc-access-connector`).

### Firewall rules for connectors in service projects (Shared VPC host project)

Required ranges: serverless infrastructure `35.199.224.0/19`; health check probes `35.191.0.0/16`, `35.191.192.0/18`, `130.211.0.0/22`. Required role on the host project: `roles/owner`, `roles/compute.securityAdmin`, or a custom role with `compute.firewalls.create`. Do not change the listed ports.

```bash
gcloud compute firewall-rules create serverless-to-vpc-connector \
    --allow tcp:667,udp:665-666,icmp \
    --source-ranges=35.199.224.0/19 \
    --direction=INGRESS \
    --target-tags vpc-connector \
    --network=VPC_NETWORK
```

```bash
gcloud compute firewall-rules create vpc-connector-to-serverless \
    --allow tcp:667,udp:665-666,icmp \
    --destination-ranges=35.199.224.0/19 \
    --direction=EGRESS \
    --target-tags vpc-connector \
    --network=VPC_NETWORK
```

```bash
gcloud compute firewall-rules create vpc-connector-health-checks \
    --allow tcp:667 \
    --source-ranges=35.191.0.0/16,35.191.192.0/18,130.211.0.0/22 \
    --direction=INGRESS \
    --target-tags vpc-connector \
    --network=VPC_NETWORK
```

Allow connector requests into the network (this rule opens every resource in the network to all connectors targeting it):

```bash
gcloud compute firewall-rules create vpc-connector-requests \
    --allow tcp,udp,icmp \
    --direction=INGRESS \
    --source-tags vpc-connector \
    --network=VPC_NETWORK
```

### Restrict connector access (network tags)

Deny first (priority lower than 1000 overrides the implicit rule), then allow with a lower priority number:

```bash
gcloud compute firewall-rules create RULE_NAME \
--action=DENY \
--rules=PROTOCOL \
--source-tags=VPC_CONNECTOR_NETWORK_TAG \
--direction=INGRESS \
--network=VPC_NETWORK \
--priority=PRIORITY
```

```bash
gcloud compute firewall-rules create RULE_NAME \
--allow=PROTOCOL \
--source-tags=VPC_CONNECTOR_NETWORK_TAG \
--direction=INGRESS \
--network=VPC_NETWORK \
--target-tags=RESOURCE_TAG \
--priority=PRIORITY
```

Egress variant: a DENY rule with `--direction=EGRESS --target-tags=VPC_CONNECTOR_NETWORK_TAG`, then an allow rule with `--destination-ranges=RESOURCE_CIDR_RANGE`. CIDR variant: use `--source-ranges=VPC_CONNECTOR_CIDR_RANGE` instead of `--source-tags`.

### Update, monitor, delete

```bash
gcloud beta compute networks vpc-access connectors update CONNECTOR_NAME --region=REGION --machine-type=MACHINE_TYPE
gcloud beta compute networks vpc-access connectors update CONNECTOR_NAME --region=REGION --min-instances=MIN_INSTANCES --max-instances=MAX_INSTANCES
gcloud compute networks vpc-access connectors describe CONNECTOR_NAME --region=REGION --project=PROJECT
```

```bash
gcloud compute networks vpc-access connectors delete CONNECTOR_NAME --region=REGION
```

### Custom organization policy constraint

```yaml
name: organizations/ORGANIZATION_ID/customConstraints/CONSTRAINT_NAME
resourceTypes:
- vpcaccess.googleapis.com/Connector
methodTypes:
- CREATE
condition: "CONDITION"
actionType: ACTION
displayName: DISPLAY_NAME
description: DESCRIPTION
```

```bash
gcloud org-policies set-custom-constraint CONSTRAINT_PATH
gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID
gcloud org-policies set-policy POLICY_PATH --update-mask=dryRunSpec
gcloud org-policies set-policy POLICY_PATH --update-mask=spec
```

## Options / Props

| Item | Value |
|------|-------|
| Connector name | Compute Engine naming rules, fewer than 21 characters, hyphens count as two |
| Subnet | Dedicated `/28`, cannot be changed after creation; custom IP range (for example `10.8.0.0/28`) creates a hidden subnet with `aet-` prefix that cannot be used in firewall rules or NAT |
| `--min-instances` | Integer `2` (default) to `9`; console range `2`-`10` |
| `--max-instances` | Integer `3` to `10` (default `10`); at max it does not scale back down |
| `--machine-type` | `f1-micro`, `e2-micro` (default), `e2-standard-4` |
| `--vpc-egress` | `private-ranges-only` (default; routes RFC 1918, RFC 6598, `199.36.153.4/30`, `199.36.153.8/30` through the VPC) \| `all-traffic` |
| Region | Must match the serverless resource's region |
| Network tags | `vpc-connector` (all) and `vpc-connector-REGION-CONNECTOR_NAME` (one connector) |
| Custom constraint | name starts with `custom.` (max 70 chars excluding prefix); `CONDITION` max 1,500; `DISPLAY_NAME` max 200; `DESCRIPTION` max 2,000; most resource types allow up to 20 custom constraints; only `CREATE` method; machine type and min/max instances not supported; role `roles/orgpolicy.policyAdmin` |
| Service agents | `service-PROJECT_NUMBER@gcp-sa-vpcaccess.iam.gserviceaccount.com` (`roles/vpcaccess.serviceAgent`); `PROJECT_NUMBER@cloudservices.gserviceaccount.com` (Editor; can instead be granted `roles/vpcaccess.serviceAgent`, but other services rely on its Editor permissions, so removing Editor might affect them) |

Use `all-traffic` when sending to privately used external IP ranges, a Private Service Connect endpoint for Google APIs with such an address, or other privately used external IP destinations routable in the connector's VPC.

## Notes

- Connectors scale up automatically but do not scale down. Decreasing instance counts is not supported: create a new connector, move traffic, delete the old one. Changing machine type can drop long-running connections.
- Connectors incur charges even with no traffic and after disconnect; delete unused connectors. Deleting does not warn about active use, cannot be restored, and blocks later VPC network deletion if resources still use it. It is destructive: try it on a disposable connector first.
- Limitations: connector VMs keep costing even if a Budget spend cap pauses workloads (Direct VPC egress is covered by spend caps); on `f1` / `e2-micro`, high packet rates can exhaust shared CPU credits and conntrack memory (use `e2-standard-4` for production); not supported in Assured Workloads (use Direct VPC egress). Only IPv4 is routed.
- Comparison (from the source): connectors support egress only, whereas Direct VPC supports L4 ingress for worker pools.
- If the connector is in a Shared VPC service project, a Shared VPC admin must create the subnet first and you must use the existing subnet.
- The source's job YAML indents keys under `apiVersion` (invalid YAML), so it is omitted.
- Source inconsistency: this page's job YAML uses `apiVersion: serving.knative.dev/v1` with `kind: Job` (https://docs.cloud.google.com/run/docs/configuring/vpc-connectors), while the Direct VPC page's job YAML uses `apiVersion: run.googleapis.com/v1` (https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc).
- With the default `private-ranges-only` egress, do not associate Cloud Run subnets with Public NAT: you are charged for Cloud NAT even though connector traffic to external IPs does not flow through it. With `all-traffic` egress and a default route in the VPC, a Cloud NAT gateway serving the connector's subnet is how packets reach the internet after the connector (see static-outbound-ip.md).
- Troubleshooting: a deny rule with priority lower than 1000 can block the connector; shard services across multiple connectors if one serves thousands of instances; use connection pools for `connection refused` / timeouts; connector creation errors: use a non-overlapping RFC 1918 range and allow images from project `serverless-vpc-access-images`.
- Allow-all ingress rule `vpc-connector-requests` gives the connector access to every resource in the network; restrict it as shown above.
- Corrected from the official docs: the source command reads `--range IP_RANGE` followed directly by `--min-instances MIN \` with no continuation backslash; a `\` was added after `--range IP_RANGE`.
- The source also shows Console, Terraform, and job YAML forms.
- Source: https://docs.cloud.google.com/run/docs/configuring/vpc-connectors (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-direct-vpc.md](./vpc-direct-vpc.md)
- [connecting-shared-vpc.md](./connecting-shared-vpc.md)
- [static-outbound-ip.md](./static-outbound-ip.md)
- [networking-best-practices.md](./networking-best-practices.md)
