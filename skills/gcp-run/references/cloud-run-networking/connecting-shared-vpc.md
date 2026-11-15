---
source: https://docs.cloud.google.com/run/docs/configuring/connecting-shared-vpc
---

# Connect to a Shared VPC network

Send egress traffic from a Cloud Run service or job to a Shared VPC network to reach Compute Engine VMs, Memorystore instances, and other resources with internal IPs. Choose Direct VPC egress (no connector) or Serverless VPC Access connectors in service projects or in the host project.

## Signature / Usage

The page has no commands of its own. Setup is documented in these pages:

- Direct VPC egress with a Shared VPC network: `https://docs.cloud.google.com/run/docs/configuring/shared-vpc-direct-vpc`
- Connectors in service projects: `https://docs.cloud.google.com/run/docs/configuring/shared-vpc-service-projects`
- Connectors in the host project: `https://docs.cloud.google.com/run/docs/configuring/shared-vpc-host-project`
- Not using Shared VPC: `https://docs.cloud.google.com/run/docs/configuring/connecting-vpc`

Connector flag used once a connector exists:

```bash
gcloud run deploy SERVICE --image IMAGE_URL --vpc-connector CONNECTOR_NAME
```

## Options / Props

| Method | Advantages |
|--------|------------|
| Direct VPC egress | No Serverless VPC Access connector required |
| Connectors in service projects | Isolation (dedicated bandwidth per connector); chargebacks (charges land on the service project); security (least privilege, firewall rules limit what each project can reach); team independence (teams manage their own connectors; a user with the Compute Engine Security Admin role or a custom role with `compute.firewalls.create` on the host project must still manage firewall rules for the connector) |
| Connectors in the host project | Centralized network management; preserves IP address space (a connector needs an IP per instance, so fewer connectors use fewer IPs); less maintenance (one connector shared by multiple service projects); lower idle cost (connectors incur costs even without traffic, so fewer connectors help when many services are used infrequently) |

## Notes

- Comparison (from the source): see "Compare Direct VPC egress and VPC connectors" at `https://docs.cloud.google.com/run/docs/configuring/connecting-vpc` for a side-by-side view.
- Connectors incur monthly charges (pricing: `https://cloud.google.com/vpc/pricing#serverless-vpc-pricing`).
- Snippet taken from https://docs.cloud.google.com/run/docs/configuring/vpc-connectors (the source page itself has no code).
- Source: https://docs.cloud.google.com/run/docs/configuring/connecting-shared-vpc (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-direct-vpc.md](./vpc-direct-vpc.md)
- [vpc-connectors.md](./vpc-connectors.md)
- [private-networking.md](./private-networking.md)
