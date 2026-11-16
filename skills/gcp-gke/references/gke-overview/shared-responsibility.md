---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/shared-responsibility
---

# GKE shared responsibility

Explains which security responsibilities belong to Google and which to the customer when running business-critical applications on GKE. The page is not an exhaustive list. It is aimed at security specialists.

## Signature / Usage

### Check patch versions to remediate vulnerabilities (borrowed snippet)

The page has no code. Customers must manually upgrade when auto-upgrades are postponed or a patch is needed before it reaches their channel. The block below is taken from the GKE versioning page and lists available versions in a release channel.

```bash
gcloud container get-server-config \
    --flatten="channels" \
    --filter="channels.channel=RELEASE_CHANNEL" \
    --format="yaml(channels.channel,channels.validVersions)" \
    --location=COMPUTE_LOCATION
```

## Options / Props

### Google's responsibilities

| Area | Details |
| --- | --- |
| Infrastructure | Hardware, firmware, kernel, OS, storage, network; encryption at rest by default, optional customer-managed disk encryption (CMEK), encryption in transit, custom hardware, physical data-center protection, Shielded Nodes protecting bootloader and kernel. |
| Node OS | Hardening and patching Container-Optimized OS or Ubuntu; patches are deployed automatically with auto-upgrade or a release channel. This is the OS under the container, not the OS inside containers. |
| Threat detection | Container-specific threat detection in the kernel with Container Threat Detection (priced separately with Security Command Center). |
| Node components | Hardening and patching Kubernetes node components upgraded with node versions: vTPM-backed kubelet certificate bootstrap and rotation, kubelet configuration following CIS benchmarks, GKE metadata server for Workload Identity, GKE CNI plugin and Calico for NetworkPolicy, CSI driver storage integrations, logging and monitoring agents. |
| Control plane | Control plane VM, API server, scheduler, controller manager, cluster CA, TLS issuance/rotation, root-of-trust key material, IAM authenticator and authorizer, audit logging configuration, etcd. Runs on single-tenant Google-operated Compute Engine instances. |
| Integrations | Connect, IAM, Cloud Audit Logs, Google Cloud Observability, Cloud KMS, Security Command Center and others. |
| Admin access | Restricts and logs Google administrative access for support with Access Transparency. |

### Customer's responsibilities

| Area | Details |
| --- | --- |
| Workloads | Application code, build files, container images, data, RBAC/IAM policy, containers and Pods. |
| Credentials | Rotate cluster credentials. |
| Upgrades | Keep Standard node pools enrolled in automatic upgrades; manually upgrade clusters and node pools within your patching timelines when auto-upgrades are postponed (for example by maintenance policies) or a patch is needed before it reaches your release channel. |
| Monitoring | Monitor clusters and applications and respond to alerts with tools such as the security posture dashboard and Google Cloud Observability. |
| Support | Provide environmental details to Google on request. |
| Logging | Ensure Logging and Monitoring are enabled on clusters; otherwise, if support cannot access logs, support is best-effort. |

## Notes

- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/versioning
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/shared-responsibility (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-architecture.md](./cluster-architecture.md)
- [versioning.md](./versioning.md)
- [autopilot-overview.md](./autopilot-overview.md)
