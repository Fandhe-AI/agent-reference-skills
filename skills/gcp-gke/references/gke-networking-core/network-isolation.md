---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/network-isolation
---

# About network isolation

You can customize network access to the control plane, to external webhooks called by the API server, and to nodes. This page explains control plane endpoints (DNS-based and IP-based), authorized networks, API server egress, and private nodes.

## Signature / Usage

Find the control plane internal endpoint (used, for example, to allow egress to it from Pods):

```bash
gcloud container clusters describe CLUSTER_NAME
```

Replace `CLUSTER_NAME` with the name of the cluster and read `privateEndpoint` in the output.

## Options / Props

### Control plane endpoints

| Endpoint | Details |
| --- | --- |
| DNS-based (recommended) | Unique immutable FQDN per control plane; reachable from any network that can reach Google Cloud APIs; needs IAM roles/policies and tokens; no bastion needed |
| IP-based | External and internal endpoints, or internal only (most secure IP option). Nodes always use the internal endpoint |

### DNS-based endpoint access controls

- VPC Service Controls: add `container.googleapis.com` and `kubernetesmetadata.googleapis.com` to the perimeter restricted services (enables VPC-SC for all GKE API operations). Not supported directly for public-IP control planes.
- Private Service Connect or Cloud NAT for clients without public internet access.
- Kubernetes ServiceAccount bearer tokens and X.509 client certificates are disabled by default; prefer IAM credentials.

### Authorized networks

| Control plane endpoints | Always allowed | Allowed after allowlisting |
| --- | --- | --- |
| External and internal enabled | Google-reserved IPs; GKE cluster IP ranges | Allowlisted external IPs; allowlisted internal IPs; Google Cloud external IPs |
| Internal only | Google-reserved IPs; GKE cluster IP ranges | Allowlisted internal IPs |

Limit: up to 100 authorized IP ranges (external and internal combined). Expanding a subnet used by the cluster requires updating the list.

### API server egress

| Value | Behavior |
| --- | --- |
| `NONE` | Disables the control plane VM external IP; non-critical API server egress to external destinations (including Google Cloud services outside the cluster) is blackholed; node traffic unaffected |
| `VIA_CONTROL_PLANE` | Retains the external IP for API server egress (default) |

With `NONE`, GKE 1.35.1-gke.1396000 and later prevents creating or updating Validating/MutatingWebhookConfigurations that use `clientConfig.url`; existing ones using `url` stop working. Use `clientConfig.service` with a Service routed to the external server via proxy Pods (Deployment/StatefulSet) or a selector-less Service with a manual EndpointSlice.

## Notes

- Enable authorized networks after disabling the external endpoint if you want internal access only; otherwise allowlisted external addresses can still reach the internal endpoint.
- Disabling the external endpoint blocks remote access without a bastion host or the DNS-based endpoint. IP-based endpoints do not integrate directly with VPC Service Controls.
- TLS: DNS-based endpoint certificates come from a public Google CA via the Google Front End; IP-based endpoint certificates are signed by the cluster root CA.
- Private nodes (cluster, node pool or Autopilot workload level; node-pool/workload overrides cluster) have internal IPs only; egress to the internet needs Cloud NAT or custom NAT. In Shared VPC, enable Private Google Access manually. The control plane always talks to nodes over internal IPs.
- The source has no executable code; the snippet above is taken from https://docs.cloud.google.com/kubernetes-engine/docs/how-to/network-policy (Snippet taken from that page).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/network-isolation (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- For configuring these settings, see https://docs.cloud.google.com/kubernetes-engine/docs/how-to/latest/network-isolation and https://docs.cloud.google.com/kubernetes-engine/networking/docs/restrict-egress-control-plane.

## Related

- [alias-ips.md](./alias-ips.md)
- [network-policy.md](./network-policy.md)
- [dataplane-v2.md](./dataplane-v2.md)
