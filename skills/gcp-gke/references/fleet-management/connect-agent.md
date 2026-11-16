---
source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/connect-agent
---

# Connect Agent overview

When you register a cluster outside Google Cloud to your fleet, a Deployment called the Connect Agent establishes a long-lived, encrypted connection between the cluster's Kubernetes API server and your Google Cloud project and handles Kubernetes requests. It is not required for GKE clusters running in Google Cloud.

## Signature / Usage

Connect Agent runs in the `gke-connect` namespace using the `connect-agent-sa` service account (see the Feature Authorizer audit query). Inspect registered memberships with:

```bash
gcloud container fleet memberships list \
  --project=PROJECT_ID
```

## Options / Props

Connect IAM roles (they do not allow direct access to connected clusters):

| Role | Title | Description | Permissions |
|---|---|---|---|
| `roles/gkehub.editor` | GKE Fleet Editor | Edit access to GKE Hub resources | `resourcemanager.projects.get`, `resourcemanager.projects.list`; `gkehub.memberships.{list,get,create,update,delete,generateConnectManifest,getIamPolicy}`; `gkehub.locations.{list,get}`; `gkehub.operations.{list,get,cancel}`; `gkehub.features.{list,get,create,update,delete,getIamPolicy}`; `gkehub.fleet.*`; `gkehub.membershipfeatures.{list,get,create,update,delete}` |
| `roles/gkehub.viewer` | GKE Fleet Viewer | Read-only access to GKE Fleet and related resources | `resourcemanager.projects.get`, `resourcemanager.projects.list`; `gkehub.memberships.{list,get,generateConnectManifest,getIamPolicy}`; `gkehub.locations.{list,get}`; `gkehub.operations.{list,get}`; `gkehub.features.{list,get,getIamPolicy}`; `gkehub.membershipfeatures.{list,get}` |
| `roles/gkehub.connect` | GKE Connect Agent | Establish new connections between external clusters and Google | `gkehub.endpoints.connect` |

Resource usage: the agent typically uses 500m CPU and 200Mi memory at registration. Usage varies with requests per second and request size, affected by cluster size, number of console users and workloads, and the number of fleet-enabled features on the cluster.

## Notes

- Roles may expose cluster metadata: cluster names, public keys, IP addresses, identity providers, Kubernetes versions, cluster size and other metadata.
- With the connection enabled, the agent exchanges account credentials, technical details and metadata about infrastructure and workloads. You stay in control of data: the Kubernetes API server performs authentication, authorization and audit logging on all requests via Connect, and the cluster administrator (for example via RBAC) can revoke authorization.
- If your network allows outbound requests, the agent can traverse NATs, egress proxies and firewalls.
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-creation (the source page has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/connect-agent (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-creation (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [fleet-creation.md](./fleet-creation.md)
- [connect-gateway.md](./connect-gateway.md)
- [connect-gateway-setup.md](./connect-gateway-setup.md)
