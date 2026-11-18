---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/security-overview
---

# GKE security overview

Layered overview of how GKE helps secure workloads: authentication and authorization, control plane, nodes, network, workloads, Binary Authorization, audit logging, and the built-in restrictions enforced by the GKE Warden admission webhook. GKE Autopilot clusters implement many of these configurations for you.

## Signature / Usage

### Built-in admission errors

GKE enforces restrictions on system objects through an admission webhook named *warden-validating*. Admission errors caused by this policy look like the following:

```text
GKE Warden rejected the request because it violates one or more constraints.
```

## Options / Props

### Layers and the main controls

| Layer | Controls described in the source |
|-------|----------------------------------|
| Authentication / authorization | Kubernetes user accounts are managed by Google Cloud (Google Account or Google Cloud service account). Use RBAC for fine-grained access; keep legacy ABAC disabled so RBAC and IAM are the sources of truth. Use Google Cloud service accounts only when their capabilities are required (least privilege). |
| Control plane | Managed by Google. Access through a DNS-based endpoint (recommended), IP-based endpoints, or both. With IP-based endpoints use authorized networks and do not enable the external endpoint. With the DNS-based endpoint use IAM and VPC Service Controls. Rotate credentials regularly (rotates SSL certificates, cluster CA and control plane IP). |
| Nodes | Container-Optimized OS by default (locked-down firewall, read-only filesystem where possible, limited user accounts, root login disabled). Autopilot nodes always use it. Automatic node upgrades (always on in Autopilot; manual upgrade possible in Standard). GKE Sandbox (gVisor) for untrusted workloads. Workload Identity Federation for GKE enables the GKE metadata server, which filters requests to sensitive fields such as `kube-env`. |
| Network | NetworkPolicies (default: all ingress and egress allowed until a policy is applied; apply default deny for both directions). `loadBalancerSourceRanges` on Services of type `LoadBalancer` (if not set, all addresses are allowed); internal load balancers for non-external access. Cloud Next Generation Firewall for traffic outside the cluster; firewalls do not control which registries images come from. |
| Workloads | Pod and container `securityContext` (user/group, Linux capabilities, privilege escalation). Cluster-level enforcement with the PodSecurity admission controller (Pod Security Standards) or Gatekeeper. Default Docker AppArmor profile applied to all containers on COS and Ubuntu nodes. SELinux is not supported on GKE. |
| Supply chain | Binary Authorization (images from Artifact Registry or another registry) and Binary Authorization continuous validation (CV). |
| Audit logging | Admin Activity logs by default; Data Access logs optional. |

### Ways to give Pods access to Google Cloud resources

| Method | Status in the source |
|--------|----------------------|
| Workload Identity Federation for GKE | Recommended, most secure. Lets a Kubernetes service account run as an IAM service account. Compatible with GKE Sandbox. |
| Node service account | Standard clusters only. Any Pod can use the node's service account credentials from VM metadata, so use a custom service account with minimum IAM roles. Not compatible with GKE Sandbox (it blocks the Compute Engine metadata server). |
| Service account JSON key | Not recommended; strongly discouraged. Use a custom service account per application with minimum roles; mount the key through a Kubernetes Secret. |

### Standard cluster security measures

- You can't update the ServiceAccount used by GKE-managed system workloads, such as workloads in the `kube-system` namespace.
- You can't bind the `cluster-admin` default ClusterRole to the `system:anonymous`, `system:unauthenticated`, or `system:authenticated` groups.
- You can manually enable specific Autopilot security policies in a Standard cluster.

## Notes

- Loading kernel modules that aren't shipped with Container-Optimized OS is unsupported and can cause security vulnerabilities and reliability issues.
- In Standard clusters, Pods can access instance metadata unless Workload Identity Federation for GKE is enabled; it is always enabled in Autopilot.
- PodSecurity admission and Gatekeeper policies can't override the built-in security configuration of Autopilot.
- The default Docker AppArmor profile is applied by the container runtime at the node level, so scanners that only inspect Kubernetes API resources can falsely report Pods without the `container.apparmor.security.beta.kubernetes.io/container-name` annotation as missing an AppArmor profile. The profile denies, among other things, writing files directly in `/proc/`, writing to non-PID-directory files under `/proc`, writing to `/proc/sys` other than `/proc/sys/kernel/shm*`, and mounting filesystems.
- Service account keys are a security risk if not managed correctly; prefer a more secure alternative, and validate keys that come from an external source.
- This page is distinct from Workload Identity Federation for external workloads (AWS / Azure / OIDC), which is in `gcp-foundation`.
- The source has no code blocks; the Warden error text above is quoted from it. IAM in general is in `gcp-foundation`; Binary Authorization policies are in `gcp-security`; Security Command Center in general is in `gcp-security-compliance`.
- Autopilot details: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/security-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [hardening-your-cluster.md](./hardening-your-cluster.md)
- [sandbox-pods.md](./sandbox-pods.md)
- [configure-policy-gke.md](./configure-policy-gke.md)
- [about-configuration-scanning.md](./about-configuration-scanning.md)
- [container-threat-detection-overview.md](./container-threat-detection-overview.md)
