---
source: https://docs.cloud.google.com/integration-connectors/docs/network-connectivity-gc-vpc
---

# Network connectivity in Google Cloud VPC

Set up private connectivity from Integration Connectors to a backend service (for example MySQL, Postgres or SQL Server) hosted in a Google Cloud VPC. The backend is exposed through an internal load balancer and a PSC service attachment, then consumed by an endpoint attachment. The backend service and the PSC service attachment can be in the same or in different Google Cloud projects or VPCs.

## Signature / Usage

The examples assume the backend service is already installed and configured (the source's example uses MySQL on port 3306).

### Health check and firewall rule

```bash
gcloud compute health-checks create tcp HEALTH_CHECK_NAME --port BACKEND_SERVER_PORT --region=REGION
```

```bash
gcloud compute firewall-rules create VPC_NETWORK-allow-health-check --direction=INGRESS --priority=1000 --network=VPC_NETWORK --allow=tcp:BACKEND_SERVER_PORT --source-ranges=35.191.0.0/16,130.211.0.0/22
```

### Internal L4 load balancer

Adapted (not in the official docs): added `--region=REGION` to the backend service.

```bash
gcloud compute backend-services create BACKEND_SERVICE --load-balancing-scheme=internal --protocol=tcp --health-checks=HEALTH_CHECK_NAME --health-checks-region=REGION --region=REGION
```

Adapted (not in the official docs): added `--region=REGION` to `add-backend`.

```bash
gcloud compute backend-services add-backend BACKEND_SERVICE --instance-group=INSTANCE_GROUP_NAME --instance-group-zone=ZONE --region=REGION
```

Adapted (not in the official docs): added `--region=REGION` to the forwarding rule.

```bash
gcloud compute forwarding-rules create FORWARDING_RULE_NAME --load-balancing-scheme=internal --network=VPC_NETWORK --subnet=SUBNET_NAME_2 --ip-protocol=TCP --ports=BACKEND_SERVER_PORT --backend-service=BACKEND_SERVICE --backend-service-region=REGION --region=REGION
```

```bash
gcloud compute firewall-rules create VPC_NETWORK-allow-internal --direction=INGRESS --priority=1000 --network=VPC_NETWORK --action=ALLOW --rules=all --source-ranges=SUBNET_RANGE_2
```

### PSC NAT subnet, firewall policy rule and service attachment

Adapted (not in the official docs): added `--region=REGION` to the subnet.

```bash
gcloud compute networks subnets create psc-nat-subnet1 \
          --network=VPC_NETWORK --range=SUBNET_RANGE_1 \
          --purpose=PRIVATE_SERVICE_CONNECT --region=REGION
```

Adapted (not in the official docs): removed `--network=VPC_NETWORK`, replaced `--allow=` with the required `--layer4-configs=` (gcloud 593.0.0 rejects `--network` and `--allow` for this command as unrecognized arguments), and added the policy scope flag `--global-firewall-policy` as in the gcloud help example for a global network firewall policy.

```bash
gcloud compute network-firewall-policies rules create PRIORITY --firewall-policy FIREWALL_POLICY_NAME_SA \
    --direction=INGRESS \
    --action=allow --layer4-configs=tcp:BACKEND_SERVER_PORT --src-ip-ranges=SUBNET_RANGE_1 \
    --global-firewall-policy
```

Create the service attachment with explicit approval (`ACCEPT_MANUAL`), accepting only the service directory project of your Integration Connectors project.

Adapted (not in the official docs): added `--region=REGION`.

```bash
gcloud compute service-attachments create SERVICE_ATTACHMENT_NAME --producer-forwarding-rule=FORWARDING_RULE_NAME  --connection-preference=ACCEPT_MANUAL --consumer-accept-list=SERVICE_DIRECTORY_PROJECT_ID=LIMIT --nat-subnets=psc-nat-subnet1 --region=REGION
```

### Get SERVICE_DIRECTORY_PROJECT_ID (allowlist the Integration Connectors project)

Ensure at least one connection exists in the project. In the sample output (an excerpt of the List Connections response) the service directory project ID for `connectors-test` is `abcdefghijk-tp`.

```bash
curl -X GET \
    -H "authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    "https://connectors.googleapis.com/v1/projects/CONNECTORS_PROJECT_ID/locations/-/connections"
```

```text
      "serviceDirectory": "projects/abcdefghijk-tp/locations/asia-northeast1/namespaces/connectors/services/runtime",
      "nodeConfig": {
        "minNodeCount": 2,
        "maxNodeCount": 50
      }
    },
....
```

### Troubleshooting: find the NAT subnet and the proxy-only subnet

Adapted (not in the official docs): `--region=REGION` changed to `--regions=REGION`; `gcloud compute networks subnets list` has no `--region` flag.

```bash
gcloud compute networks subnets list --project=PROJECT_ID --regions=REGION --filter="purpose=PRIVATE_SERVICE_CONNECT"
```

Adapted (not in the official docs): same fix as the previous block (`--region=REGION` changed to `--regions=REGION`).

```bash
gcloud compute networks subnets list --project=PROJECT_ID --regions=REGION --filter="purpose=REGIONAL_MANAGED_PROXY"
```

## Options / Props

### Placeholders

| Placeholder | Description |
|---|---|
| `BACKEND_SERVER_PORT` | Port of the backend service; 3306 for the MySQL example. Load balancer traffic and health-check probe traffic must use the same port. |
| `LIMIT` | Connection limit for the accepted project: the number of consumer PSC endpoints that can connect to the service. |
| `SERVICE_DIRECTORY_PROJECT_ID` | Project ID of the service directory associated with your Google Cloud project, from List Connections. |
| `SUBNET_RANGE_1` / `SUBNET_RANGE_2` | Range of the PSC NAT subnet / of the load balancer subnet. |

### Considerations when creating the PSC service attachment

| Point | Detail |
|---|---|
| Subnets | The service attachment and the load balancer are created in different subnets of the same VPC; the service attachment is always created in a NAT subnet. |
| Region | The PSC service attachment, load balancer and all other components must be in the same region. |
| Ingress | Traffic from the PSC service attachment's subnet must reach the backend service. |
| Egress | Enabled by default unless specific deny rules exist. |
| Health check | Google Cloud probe ranges are 35.191.0.0/16 and 130.211.0.0/22 and must be allowed to reach the backend. |

## Notes

- Adapted from the official docs: `--region=REGION` was added to `backend-services create`, `backend-services add-backend`, `forwarding-rules create`, `networks subnets create` and `service-attachments create`; the source commands omitted it (for example `... --backend-service-region=REGION` with no `--region`). The gcloud help says of `--region` on `forwarding-rules create`, `networks subnets create` and `service-attachments create`: "If not specified, you might be prompted to select a region (interactive mode only)"; on `backend-services create` and `add-backend` it "Overrides the default compute/region property value for this command invocation."
- Corrected from the official docs: `--network=VPC_NETWORK` and `--allow=tcp:BACKEND_SERVER_PORT` in `network-firewall-policies rules create`; the gcloud 593.0.0 SYNOPSIS requires `--action`, `--firewall-policy` and `--layer4-configs` and has no `--network` or `--allow`. A network firewall policy is applied to a VPC network with `gcloud compute network-firewall-policies associations create` (see its help).
- Corrected from the official docs: `gcloud compute networks subnets list --project=PROJECT_ID --region=REGION ...` (both troubleshooting commands); the help lists `--regions=REGION,[REGION,...]`.
- Different projects: create the load balancer (zonal NEG as backend, forwarding rule, internal firewall rule) and the service attachment as above, allowlist the service directory project, then create the endpoint attachment. Pass-through (L4 TCP/UDP ILB) backends must allow the whole PSC NAT subnet range; proxy-based or HTTP(S) load balancers (L4 proxy ILB, L7 ILB) send from the region's proxy-only subnet, which must be allowed.
- Use a hostname endpoint attachment (with managed zones) for TLS-enabled backends that need hostnames for TLS validation; otherwise an IP endpoint attachment. In the connection, choose Endpoint attachment (or Host Address when a managed zone exists) as Destination Type.
- Corrected from the official docs: the source's `network-firewall-policies rules create` passes no policy scope flag, and gcloud 593.0.0 fails with "Underspecified resource [...]. Specify one of the [--firewall-policy-region, --global-firewall-policy] flags." The example uses `--global-firewall-policy`; for a regional network firewall policy pass `--firewall-policy-region=REGION` instead.
- Verify with the endpoint attachment connection state and with Google Cloud Connectivity Tests.
- The service attachment uses `--connection-preference=ACCEPT_MANUAL` (explicit approval) with a consumer accept list. The gcloud help gives `ACCEPT_AUTOMATIC` as the default and describes it as "Always accept connection requests from consumers automatically."
- VPC and Private Service Connect are in `gcp-networking`.
- Omitted: images, repeated copies of the List Connections snippet, and Console click-paths.
- Source: https://docs.cloud.google.com/integration-connectors/docs/network-connectivity-gc-vpc (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [network-connectivity-private.md](./network-connectivity-private.md)
- [network-connectivity-public.md](./network-connectivity-public.md)
- [vpcsc-connectors.md](./vpcsc-connectors.md)
