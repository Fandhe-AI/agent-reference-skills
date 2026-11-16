---
source: https://docs.cloud.google.com/kubernetes-engine/enterprise/multicluster-management/gateway
---

# Connect to registered clusters with the Connect gateway

The Connect gateway builds on fleets to let users and CI/CD systems connect to and run commands against fleet member clusters (on Google Cloud, other public clouds or on-premises) in a simple, consistent and secured way, using `kubectl`, `client-go` or other tools that accept a `kubeconfig`.

## Signature / Usage

Typical flow after authentication and authorization are set up:

```bash
gcloud container fleet memberships list
```

```bash
gcloud container fleet memberships get-credentials membership-name
```

Then run `kubectl` (or `client-go`) with the downloaded `kubeconfig`. This is similar to `gcloud container clusters get-credentials` but for any cluster registered and connected in the project's fleet.

## Options / Props

| Topic | Details |
|---|---|
| Authentication | Google ID by default; third-party providers through Workforce Identity Federation; group-based authentication through GKE Identity Service |
| Request path (GKE clusters) | The gateway authenticates the identity, checks gateway authorization and connects to the GKE cluster directly |
| Request path (non-GKE clusters) | Forwarded through the Connect service and Connect Agent to the Kubernetes API server, which authorizes the request; the Connect agent must be authorized to impersonate the user and the user must be authorized for the request |
| Google Groups support | Needs extra setup with GKE Identity Service; for Google Distributed Cloud on VMware and bare metal it needs Distributed Cloud software only 1.13 or later; for attached clusters or other environments contact Cloud Customer Care |
| Third-party identity | Azure Active Directory, Okta and others through Workforce Identity Federation plus GKE Identity Service for groups; for attached clusters available for all supported Kubernetes versions |
| Latency | RTT from gateway service to Connect agent p95 < 500 ms and p99 < 1 s; most `kubectl` commands make several round trips |

## Notes

- Chrome Enterprise Premium with IP address restrictions as an attribute (including geographic restrictions) is not supported by the Connect gateway for GKE clusters.
- Connect gateway is not the Kubernetes Gateway API. It is a way to reach cluster API servers, unrelated to the Gateway / Ingress load balancing resources.
- The source links a Cloud Build integration tutorial and a console flow for logging in to clusters outside Google Cloud.
- Source: https://docs.cloud.google.com/kubernetes-engine/enterprise/multicluster-management/gateway (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-gateway-setup.md](./connect-gateway-setup.md)
- [connect-agent.md](./connect-agent.md)
- [gke-identity-service.md](./gke-identity-service.md)
- [secure.md](./secure.md)
