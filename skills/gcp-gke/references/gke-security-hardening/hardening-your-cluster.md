---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster
---

# Harden your cluster's security

Best practices for improving the security of GKE environments, grouped by area. New clusters implement many of them by default; Autopilot clusters have a stricter default posture than Standard. Security Command Center can check many of the practices automatically, and the Organization Policy Service can enforce them through managed constraints.

## Signature / Usage

### Re-enable the DenyServiceExternalIPs admission controller

Enabled by default in clusters created on GKE 1.21 and later. For clusters originally created on an earlier version, enable it:

```bash
gcloud container clusters update CLUSTER_NAME \
    --location=LOCATION \
    --no-enable-service-externalips
```

### Limit anonymous access to health check endpoints

Available in GKE version 1.32.2-gke.1234000 and later. Specify `LIMITED` for the `--anonymous-authentication-config` flag when you create or update Standard and Autopilot clusters with the gcloud CLI or the GKE API. The source gives no full command line; see the `gcloud container clusters` reference at https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/update for the exact syntax.

## Options / Props

### Managed Organization Policy constraints named in the source

| Best practice | Constraint |
|---------------|-----------|
| Custom node service account instead of the Compute Engine default | `constraints/container.managed.disallowDefaultComputeServiceAccount` |
| Shielded GKE Nodes | `constraints/container.managed.enableShieldedNodes` |
| Disable insecure kubelet read-only port (10255) | `constraints/container.managed.disableInsecureKubeletReadOnlyPort` |
| Workload Identity Federation for GKE | `constraints/container.managed.enableWorkloadIdentityFederation` |
| Google Groups for RBAC | `constraints/container.managed.enableGoogleGroupsRBAC` |
| DNS-only control plane access | `constraints/container.managed.enableControlPlaneDNSOnlyAccess` |
| Private nodes | `constraints/container.managed.enablePrivateNodes` |
| Network policy | `constraints/container.managed.enableNetworkPolicy` |
| Security bulletin notifications | `constraints/container.managed.enableSecurityBulletinNotifications` |
| Cloud Logging | `constraints/container.managed.enableCloudLogging` |
| No legacy client certificate issuance | `constraints/container.managed.disableLegacyClientCertificateIssuance` |
| ABAC disabled | `constraints/container.managed.disableABAC` |
| DenyServiceExternalIPs | `constraints/container.managed.denyServiceExternalIPs` |
| Restrict anonymous access (custom constraint) | custom constraint using the `resource.anonymousAuthenticationConfig.mode` condition |

### Best practices by area

| Area | Recommendations |
|------|-----------------|
| Environment design | Enterprise foundations blueprint; multi-tenant best practices; Tags on clusters and node pools for conditional IAM / firewall policy; plan VPC networks; incident response plan. |
| Google Cloud network security | Least-privilege firewall rules that don't conflict with or override GKE default firewall rules; Shared VPC for cross-project traffic; separate Shared VPC networks for staging, test and production. |
| Immutable settings (create time only) | Custom IAM node service account (minimum `roles/container.defaultNodeServiceAccount`); Container-Optimized OS node image unless Ubuntu or Windows is required. |
| Node configuration | Shielded GKE Nodes: don't disable them, enable secure boot on all node pools, don't disable integrity monitoring. Disable the kubelet read-only port and move workloads from port `10255` to `10250`. Disable node self-registration (Preview). |
| Access control | Restrict API discovery (DNS-only endpoint or authorized networks, plus private nodes); separate namespaces or clusters per team and environment; least-privilege IAM and RBAC; Workload Identity Federation for GKE; manage access with Google Groups; restrict anonymous access. |
| GKE network security | DNS-based endpoint with IP-based endpoints disabled; private nodes; NetworkPolicies and/or Cloud Service Mesh (verify policies with network policy logging). |
| Sensitive data | Confidential GKE Nodes for data in use; keep secrets outside the cluster (preference order: Secret Manager client libraries, Secret Manager add-on mounted volumes, third-party tools such as HashiCorp Vault, Kubernetes Secrets as the last resort with optional application-layer encryption). |
| Workload security | GKE Sandbox to isolate untrusted code; RBAC for ServiceAccounts. |
| Policy enforcement | Organization Policy across the hierarchy; admission control with Policy Controller or the PodSecurity admission controller. |
| Cluster management | Release channels, accelerated patch auto-upgrades, automatic node upgrades, maintenance windows (auto-upgrade at least once a month); security bulletin notifications through Pub/Sub; keep log collection on; use the security posture dashboard and Security Command Center. |
| Default configurations | Leave legacy client authentication (static certificates and passwords) disabled; leave ABAC disabled; leave DenyServiceExternalIPs enabled. |

## Notes

- Control plane access options: DNS-based endpoint only (recommended; VPC Service Controls can control who reaches it); or disable the external IP-based endpoint (works with Cloud Interconnect / Cloud VPN); or use authorized networks with the external endpoint. With IP-based endpoints enabled, authorized networks limit access to your ranges, GKE nodes in the same VPC and Google-reserved management addresses. Do not add `0.0.0.0/0` to authorized networks.
- Without network isolation, treat all API discovery information (CustomResource schemas, APIService definitions, extension API server discovery) as publicly disclosed. Default API discovery roles grant broad read access to groups such as `system:authenticated`, which includes anyone with a Google account.
- Anonymous access: by default requests get `system:anonymous` / `system:unauthenticated`. With `LIMITED`, only `/healthz`, `/livez` and `/readyz` are reachable anonymously; other requests are rejected with HTTP `401` even if RBAC grants access. In GKE 1.35.0-gke.1171000 and later, anonymous access to non-health-check endpoints is denied by default only on newly created clusters. Don't rely on this alone; add network isolation and avoid default roles and groups.
- Node self-registration disabling is Preview (Pre-GA terms apply). It requires Shielded GKE Nodes and is motivated by CVE-2025-5187; GKE rejects `kubelet` attempts to create `Node` objects.
- The default node service account is the Compute Engine default service account; the least-privilege recommendation is a custom service account with `roles/container.defaultNodeServiceAccount`. Use Workload Identity Federation for GKE, not the node account, for your own workloads. Secure boot on Container-Optimized OS does not change whether unsigned modules can be loaded.
- Node auto-upgrade is enabled by default for clusters created with the console since June 2019 and with the GKE API since November 11, 2019. Node pools without auto-upgrade should be upgraded at least once a month.
- Third-party secret tools: if they run in a cluster, use a different cluster than the workloads, store tool data in Cloud Storage or Spanner, and expose them with an internal passthrough Network Load Balancer. Kubernetes Secrets are encrypted at the storage layer by default.
- Workload Identity Federation for GKE here is distinct from Workload Identity Federation for external workloads (AWS / Azure / OIDC), which is in `gcp-foundation`.
- Policy Controller, recommended above for admission control, is deprecated as of November 12, 2026 and reaches end of support on December 31, 2027; clusters on GKE 1.39 and later don't support it. For new setups use the PodSecurity admission controller or Kubernetes ValidatingAdmissionPolicies (self-managed OPA Gatekeeper is the other migration target). See [policy-controller-deprecation.md](../config-sync-policy/policy-controller-deprecation.md).
- Source (deprecation): https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-overview.md](./security-overview.md)
- [sandbox-pods.md](./sandbox-pods.md)
- [about-configuration-scanning.md](./about-configuration-scanning.md)
- [container-threat-detection-overview.md](./container-threat-detection-overview.md)
