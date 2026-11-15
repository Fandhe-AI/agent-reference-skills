---
source: https://docs.cloud.google.com/run/docs/securing/private-networking
---

# Private networking and Cloud Run

How to receive requests from, and send requests to, your private network (VPC, Shared VPC, on-premises, other clouds). Unlike VMs, Cloud Run resources are not associated with any VPC network by default.

## Signature / Usage

### Require requests from your private network (ingress)

The most restrictive ingress setting is `internal`: the service only accepts requests from your project, attached Shared VPC networks, and your VPC Service Controls perimeter. Enforce an ingress setting for a project, folder, or organization with the `run.allowedIngress` organization policy constraint.

### Require all egress to go to your VPC network

Specify the `all-traffic` egress setting (`--vpc-egress=all-traffic`) when you want a static outbound IP, firewall rules on all egress, or requests to on-premises/other clouds through your private network. Enforce it org-wide with the `run.allowedVPCEgress` constraint.

```bash
gcloud run deploy SERVICE_NAME \
--image=IMAGE_URL \
--network=NETWORK \
--subnet=SUBNET \
--region=REGION \
--vpc-egress=all-traffic
```

For a connector, use `--vpc-connector=CONNECTOR_NAME` instead of `--network` / `--subnet` (see `static-outbound-ip.md`).

## Options / Props

### Receiving requests (destination uses `internal` or `internal-and-cloud-load-balancing` ingress)

| Source | What is required |
|--------|------------------|
| Other Cloud Run resources or App Engine | Source uses Direct VPC egress or a connector, and traffic must route through the VPC: (a) source routes all traffic through the VPC and Private Google Access is enabled on the subnet, or (b) front the destination with Private Service Connect or an internal Application Load Balancer, or (c) enable Private Google Access on the source subnet and configure DNS so `run.app` resolves to `private.googleapis.com` (`199.36.153.8/30`) or `restricted.googleapis.com` (`199.36.153.4/30`) |
| VPC network | Private Google Access on the subnet (reach default `run.app` URL; request IP range is `0.0.0.0/32`, so `remoteIp` in request logs is `0.0.0.0`), or a Private Service Connect endpoint plus private DNS zone for `run.app`, or an internal Application Load Balancer, or publish through Private Service Connect |
| Shared VPC | Recognized as internal only if: resource runs in the host project; or resource is attached to the Shared VPC network (revisions/instances with Direct VPC egress or a connector to that network accept its traffic); or an internal Application Load Balancer proxies; or host and service projects share a VPC Service Controls perimeter |
| Other VPC networks outside the project | Not internal, except: VPC Service Controls allows `run.googleapis.com` and Private Google Access is on for the source subnet; or the service is published via Private Service Connect (needs internal Application Load Balancer). Peering does not make traffic internal |
| Google Cloud services | BigQuery, Cloud Scheduler, Cloud Tasks, Dialogflow CX, Eventarc, Pub/Sub, synthetic monitors (including uptime checks), and Workflows in the same project or perimeter are internal. Others are not and cannot reach `internal` / `internal-and-cloud-load-balancing` services |
| On-premises / other clouds | Private Google Access for on-premises hosts; or Private Service Connect endpoint for Google APIs with private DNS for `run.app`; or internal Application Load Balancer via Cloud VPN / Interconnect; or publish via Private Service Connect |

### Sending requests

| Destination | Configuration |
|-------------|---------------|
| VPC network | Direct VPC egress or a Serverless VPC Access connector. All DNS queries go to the VPC network's DNS server; internal IPs route to the VPC and public destinations go directly to the internet unless the egress setting says otherwise |
| Peered VPC | No extra configuration; VMs in the egress subnet must reach the target network |
| Other VPC outside project (not Shared VPC / peered) | Private Service Connect after setting up VPC egress |
| Other Cloud Run resources / Google Cloud services | Stay on Google's network and are subject to VPC Service Controls; restrictive ingress needs extra setup |
| On-premises / other clouds | VPC routes privately (for example a VPN tunnel), send requests to the VPC, require `all-traffic` egress |

## Notes

- With `all-traffic` egress, bandwidth on connectors grows and costs might increase; connectors scale out when traffic increases but do not scale in.
- Comparison pointer in the source: "Compare Direct VPC egress and VPC connectors" at `https://docs.cloud.google.com/run/docs/configuring/connecting-vpc`; see also pricing at `https://cloud.google.com/vpc/pricing#serverless-vpc-pricing`.
- Additional controls: VPC Service Controls perimeters (see `https://docs.cloud.google.com/run/docs/securing/using-vpc-service-controls`) and service accounts for granular access (authentication guides at `https://docs.cloud.google.com/run/docs/authenticating/overview`).
- Pub/Sub and Dialogflow CX support both `internal` ingress and authentication; API Gateway supports authenticating to Cloud Run. Requiring authentication may suffice instead of `internal` ingress.
- To detach a resource from a Shared VPC network, redeploy without VPC network access or with a different network.
- Responses return on the same path the request used.
- Source: https://docs.cloud.google.com/run/docs/securing/private-networking (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/run/docs/configuring/static-outbound-ip (the source page itself has no code).

## Related

- [vpc-direct-vpc.md](./vpc-direct-vpc.md)
- [vpc-connectors.md](./vpc-connectors.md)
- [connecting-shared-vpc.md](./connecting-shared-vpc.md)
- [static-outbound-ip.md](./static-outbound-ip.md)
