---
source: https://docs.cloud.google.com/security-command-center/docs/assess-software-vulnerabilities-overview
---

# Assess software vulnerabilities overview

Security Command Center offers several services that detect vulnerabilities in containers, in the operating systems and software on VMs, and in web applications. Where vulnerabilities can be detected depends on the cloud service you use, and each service is enabled and configured independently. Applies to the Standard-legacy, Standard, Premium and Enterprise (Deprecated) service tiers (some features need organization-level activation). The Enterprise tier shuts down on May 21, 2027; organizations on it move to Premium on or after that date.

## Signature / Usage

Each service below is enabled and configured independently. The gcloud 593.0.0 help for `gcloud scc manage services list` shows how to list the Security Command Center services of an organization together with their module information; the service names gcloud accepts include `vm-manager` (`vmm`), `web-security-scanner` (`wss`), `gce-vulnerability-assessment` (`gce-va`), `ec2-vulnerability-assessment` (`ec2-va`) and `azure-vulnerability-assessment` (`azure-va`).

```bash
gcloud scc manage services list --organization=organizations/123
```

## Options / Props

### Google Cloud

| Service | What it finds | Finding category / class | Tiers |
|---------|---------------|--------------------------|-------|
| Artifact Registry vulnerability assessment | Vulnerabilities in container images stored in Artifact Registry or deployed to App Engine, Cloud Run job, Cloud Run, or a GKE cluster | `CONTAINER_IMAGE_VULNERABILITY` | Standard-legacy, Standard, Premium, Enterprise (Deprecated) (some features need organization-level activation) |
| Kubernetes security posture dashboard | Opinionated, actionable findings about potential security issues in GKE clusters | `VULNERABILITY` and `MISCONFIGURATION` finding classes | same |
| VM Manager | Vulnerabilities (including CVEs) in operating systems installed on VMs | `OS_VULNERABILITY` | Premium and Enterprise (Deprecated) |
| Vulnerability Assessment for Google Cloud | Critical and high severity software vulnerabilities in Compute Engine VM instances without installing agents | `OS_VULNERABILITY` and `SOFTWARE_VULNERABILITY` | Standard, Premium, Enterprise (Deprecated) |
| Web Security Scanner | Security vulnerabilities in App Engine, GKE and Compute Engine web applications | — | Standard-legacy, Premium, Enterprise (Deprecated) |

### AWS (Enterprise (Deprecated) tier)

| Service | What it finds | Finding category |
|---------|---------------|------------------|
| Vulnerability Assessment for AWS | Software packages installed on Amazon EC2 instances; software packages and operating system misconfigurations in Elastic Container Registry (ECR) images | `SOFTWARE_VULNERABILITY` |

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/list (gcloud 593.0.0 help); the source page has no code block. The service names are from the `SERVICE_NAME` list of https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/describe.
- Vulnerability Assessment for Google Cloud is described in `vulnerability-assessment-google-cloud.md`; Security Health Analytics (misconfigurations rather than software vulnerabilities) in `security-health-analytics-overview.md`. Web Security Scanner, VM Manager and the Artifact Registry / Kubernetes security posture dashboard sources are covered in other categories of this skill or by `gcp-gke` and `gcp-compute` (VM Manager).
- Source: https://docs.cloud.google.com/security-command-center/docs/assess-software-vulnerabilities-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [vulnerability-assessment-google-cloud.md](./vulnerability-assessment-google-cloud.md)
- [security-health-analytics-overview.md](./security-health-analytics-overview.md)
