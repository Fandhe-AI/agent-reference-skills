---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-configuration-scanning
---

# About Kubernetes security posture scanning

Kubernetes security posture scanning is a feature of the security posture dashboard with two parts: workload configuration auditing against a subset of the Pod Security Standards, and surfacing of security bulletins that affect your clusters, workloads and Standard mode node pools. It is offered at no extra charge in GKE; entries added to Cloud Logging are subject to Cloud Logging pricing.

## Signature / Usage

### How a violation is detected

GKE continuously compares each eligible workload's specification against the controls of the underlying policy. For example, `spec.containers[*].securityContext.privileged=true` violates the Baseline Pod Security Standard, and a Pod with `spec.securityContext.runAsNonRoot` set to `false` violates the Restricted standard.

The source page has no code. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/update (the security posture flag; configuration scanning is a feature of the security posture dashboard):

```text
--security-posture=SECURITY_POSTURE
   Sets the mode of the Kubernetes security posture API's off-cluster
   features.
```

Auditing runs on Google's infrastructure and does not use compute resources on your nodes. Results appear in the Google Cloud console security posture dashboard (https://console.cloud.google.com/kubernetes/security) with a severity rating and recommended actions, and as Cloud Logging entries. To enable it, see https://docs.cloud.google.com/kubernetes-engine/docs/how-to/protect-workload-configuration.

## Options / Props

### What workload configuration auditing checks

Container fields apply to `containers`, `initContainers` and `ephemeralContainers` unless a different path is shown.

| Concern | Fields | Allowed values | Severity |
|---------|--------|----------------|----------|
| Host namespaces | `spec.hostNetwork`, `spec.hostIPC`, `spec.hostPID` | Undefined or nil; `false` | High |
| Privileged containers | `spec.containers[*].securityContext.privileged` (and init / ephemeral) | Undefined or nil; `false` | High |
| Host port access | `spec.containers[*].ports[*].hostPort` (and init / ephemeral) | Undefined or nil; `0` | High |
| Non-default capabilities | `spec.containers[*].securityContext.capabilities.add` (and init / ephemeral) | Undefined or nil; `AUDIT_WRITE`, `CHOWN`, `DAC_OVERRIDE`, `FOWNER`, `FSETID`, `KILL`, `MKNOD`, `NET_BIND_SERVICE`, `SETFCAP`, `SETGID`, `SETPCAP`, `SETUID`, `SYS_CHROOT` | Medium |
| Mounting host path volumes | `spec.volumes[*].hostPath` | Undefined or nil | Medium |
| Non-default `/proc` mask | `spec.containers[*].securityContext.procMount` (and init / ephemeral) | Undefined or nil; `Default` | Medium |
| Unsafe sysctls mask | `spec.securityContext.sysctls[*].name` | Undefined or nil; `kernel.shm_rmid_forced`, `net.ipv4.ip_local_port_range`, `net.ipv4.ip_unprivileged_port_start`, `net.ipv4.tcp_syncookies`, `net.ipv4.ping_group_range` | Medium |
| Running as non-root | `spec.securityContext.runAsNonRoot` and `spec.containers[*].securityContext.runAsNonRoot` (and init / ephemeral) | `true` | Medium |
| Privilege escalation | `spec.containers[*].securityContext.allowPrivilegeEscalation` (and init / ephemeral) | `false` | Medium |
| Unconfined AppArmor profile | `metadata.annotations["container.apparmor.security.beta.kubernetes.io/*"]` | `false` | Low |

GKE also reports a **Medium** finding named **Effectively Anonymous Users Granted GKE Cluster Access** when any RoleBinding or ClusterRoleBinding references `system:anonymous`, `system:authenticated` or `system:unauthenticated`.

## Notes

- Benefits: automated detection across all workloads, actionable recommendations, a console overview, and an auditable Logging trail.
- Security bulletin surfacing is automatically enabled when you create an Autopilot or Standard cluster. The console shows affected clusters, versions and recommended patch versions, and only bulletins for which a mitigation is available in the cluster's region or zone.
- The "Allowed values" column is as written in the source (for `procMount` it lists "Default").
- Bindings to `system:authenticated` etc. are effectively anonymous; avoid them (see the default roles and groups guidance, https://docs.cloud.google.com/kubernetes-engine/docs/best-practices/rbac#default-roles-groups).
- The source has no code blocks; the fenced text above quotes its examples. Related GKE security posture dashboard: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-security-posture-dashboard
- The code block quotes the `--security-posture` flag description from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/update; the concept page itself has no code.
- Corrected from the official docs: the introductory example writes the field path as `spec.containers.securityContext.privileged`; `containers` is a list, so the path is `spec.containers[*].securityContext.privileged` (as in the source's own control table).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/about-configuration-scanning (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [hardening-your-cluster.md](./hardening-your-cluster.md)
- [security-overview.md](./security-overview.md)
- [container-threat-detection-overview.md](./container-threat-detection-overview.md)
