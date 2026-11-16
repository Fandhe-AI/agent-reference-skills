---
source: https://docs.cloud.google.com/kubernetes-engine/policy-controller/docs/overview
---

# Policy Controller overview

Policy Controller enables programmable policies for Kubernetes clusters, acting as guardrails for best practices, security, and compliance across a cluster and fleet. It is based on the open source Open Policy Agent Gatekeeper project and integrated with Google Cloud.

## Signature / Usage

### Example constraint

Constraints are the building blocks of policy; a constraint can deny or audit non-compliant API requests. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller (the overview has no code). It requires Pods to use images from one Artifact Registry repository and excludes `kube-system`:

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sAllowedRepos
metadata:
  name: allowed-repos
spec:
  enforcementAction: deny
  match:
    kinds:
    - apiGroups: [""]
      kinds: ["Pod"]
    excludedNamespaces: ["kube-system"]
  parameters:
    repos:
    - "us-docker.pkg.dev/example-project/example-repo/"
```

## Options / Props

| Feature | Description |
|---------|-------------|
| Integrated with Google Cloud | Install through the console, Terraform, or Google Cloud CLI on any cluster connected to the fleet; works with Config Sync, metrics, and Cloud Monitoring |
| Multiple enforcement points | Audit and admission control, plus optional shift-left analysis of changes before they are applied |
| Prebuilt policy bundles | Policy bundles and a constraint template library |
| Custom policies | Custom constraint templates |
| Built-in observability | Console dashboard for all policies applied to the fleet (including unregistered clusters) |

| Example bundle use | Description |
|--------------------|-------------|
| PodSecurityPolicy-like requirements | Enforce many of the same requirements as PodSecurityPolicies, with audit before enforcing |
| Cloud Service Mesh | Constraints to audit mesh security vulnerabilities and best practices |
| Policy essentials | General best practices for cluster resources to strengthen security posture |

| Example constraint template (anchor in the template library) | Purpose |
|--------------------------------------------------------------|---------|
| `k8srequiredlabels` | Require each namespace to have at least one label (for example for GKE Usage Metering) |
| `k8sallowedrepos` | Restrict repositories a container image can be pulled from |
| `k8spspprivilegedcontainer` | Control whether a container can run in privileged mode |

## Notes

- Deprecated: Policy Controller is deprecated as of November 12, 2026, reaches end of support on December 31, 2027, and isn't supported by GKE 1.39 and later; see [policy-controller-deprecation.md](./policy-controller-deprecation.md). The overview page itself does not state this.
- Constraints can be applied through the Kubernetes API or distributed from a central source (such as Git) by using Config Sync.
- Policy bundles install their constraints with the `dryrun` enforcement action by default (per the deprecation page).
- Source: https://docs.cloud.google.com/kubernetes-engine/policy-controller/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [policy-controller-deprecation.md](./policy-controller-deprecation.md)
- [config-sync-overview.md](./config-sync-overview.md)
- [config-controller-overview.md](./config-controller-overview.md)
