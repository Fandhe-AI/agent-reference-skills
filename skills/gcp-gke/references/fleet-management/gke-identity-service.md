---
source: https://docs.cloud.google.com/kubernetes-engine/enterprise/identity
---

# Introducing GKE Identity Service

GKE Identity Service lets you use existing third-party identity providers (OIDC, SAML, LDAP) to authenticate to Kubernetes clusters registered to a fleet, from the command line or the Google Cloud console, without changing your identity provider.

## Signature / Usage

Setup process (the source gives steps, not commands):

1. Platform administrator registers a client application with the identity provider and gets a client ID and secret.
2. Cluster administrator sets up clusters, at fleet level (many clusters, similar configuration) or per cluster (OIDC, SAML or LDAP guides).
3. Cluster administrator sets up user login (FQDN access recommended, or file-based access) and optionally Kubernetes RBAC for users.

Fleet-level feature management uses the feature's own `enable` command, for example:

```bash
gcloud container fleet identity-service enable
```

## Options / Props

| Cluster type | Supported protocols |
|---|---|
| GDC (VMware) | OIDC, LDAP (user clusters only; admin clusters do not support LDAP), SAML |
| GDC (bare metal) | OIDC, LDAP, SAML |
| GKE on Google Cloud (fleet members only) | OIDC |
| GKE on AWS | OIDC (deprecated; shuts down March 17, 2027) |
| GKE on Azure | OIDC (deprecated; shuts down March 17, 2027) |

## Notes

- Installable only on clusters registered to a fleet. GKE clusters on Google Cloud must be explicitly registered. GKE attached clusters (EKS, AKS and others) are not supported; use the Connect gateway for them. For GKE clusters not in a fleet, use Workforce Identity Federation.
- The GKE Identity Service for GKE clusters on Google Cloud is being deprecated; see the deprecation page. The feature in the Connect gateway and Google Distributed Cloud (software only) is not affected.
- To use Google IDs instead of an identity provider, use the Connect gateway.
- GKE on AWS / Azure are deprecated and presented here only as the source states them. Google Distributed Cloud was formerly Anthos clusters on VMware / bare metal.
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/manage-features (the source page has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/enterprise/identity (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/manage-features (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [identity-service-deprecation.md](./identity-service-deprecation.md)
- [connect-gateway.md](./connect-gateway.md)
- [secure.md](./secure.md)
