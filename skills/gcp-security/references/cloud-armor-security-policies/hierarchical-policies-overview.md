---
source: https://docs.cloud.google.com/armor/docs/hierarchical-policies-overview
---

# Hierarchical security policies overview

Hierarchical security policies extend Cloud Armor WAF and DDoS protection beyond individual projects. They are attached at the organization, folder, or project level and inherited by lower nodes, unlike service-level policies attached to backend services or backend buckets. They support a subset of service-level features.

## Signature / Usage

### Associate a hierarchical policy with a folder

A policy is created at the organization or folder level, then associated with an organization, folder, or project (the owner or another node). You can use only one of the scope flags (`--organization`, `--folder`, or `--project`) per hierarchical policy.

```bash
gcloud compute org-security-policies associations create \
    --security-policy=123456789 --folder=987654321
```

## Options / Props

### Hierarchical vs service-level (backend) policy features

| Feature | Service-level global backend policy | Hierarchical backend policy |
|---|---|---|
| Frontend type | Global external Application Load Balancer, classic Application Load Balancer | Same |
| Attachment point | Backend service | Resource hierarchy nodes |
| Rule actions | Allow, Deny, Redirect (`GOOGLE_RECAPTCHA` and `EXTERNAL_302`), Throttle, Rate-based ban | Allow, Deny, Redirect (only `EXTERNAL_302`), Goto next |
| Client IP / geography / ASN | Yes | Yes |
| Rate limiting | Yes | No |
| TLS fingerprinting (JA3 and JA4) | Yes | Yes |
| Bot management | Yes | Yes (only `EXTERNAL_302` and request decoration) |
| HTTP filtering, body filtering, WAF | Yes | Yes |
| Managed rules | Yes | No |
| Google Threat Intelligence | Yes | Yes |
| reCAPTCHA | Yes | No |
| Adaptive Protection | Yes | No |
| Address Groups | Yes | No |
| Org-level Address Groups | Yes | Yes |
| Security Command Center, Cloud Monitoring, request logging | Yes | Yes |

### Association scope flags

| Scope | Flag | Use |
|---|---|---|
| Organization | `--organization` | Default type; broad IAM permissions; applies to all nodes under the organization |
| Folder | `--folder` | Same rules across multiple projects but not the whole organization |
| Project | `--project-number` | Same rules across all resources in a project (for example an IP denylist across several backend services) |
| Service-level | none (not an association) | Unique rules per service: a regular security policy attached to a backend service with `gcloud compute backend-services update --security-policy` (see `configure-security-policies.md`) |

### Evaluation order

| Order | Policy level |
|---|---|
| 1 | Organization-level hierarchical policies |
| 2 | Folder-level hierarchical policies (parent folder first, then each subfolder) |
| 3 | Project-level hierarchical policies |
| 4 | Service-level policies |

## Notes

- After you create a hierarchical policy, its rules are not applied to any resource until you associate it with a node. You can only use one of the scope flags per policy; other flags such as `--name` or `--type` are specified as for service-level policies.
- A low-priority hierarchical rule is evaluated before a high-priority service-level rule. Consider what happens when a request allowed or denied by the hierarchical policy never reaches your service-level rules.
- `goto_next` is exclusive to hierarchical policies: it stops evaluating the current policy and begins evaluating the next policy. Example: a top-priority rule matching a trusted IP range with `goto_next` skips the other organization-level rules; `allow` or `deny` there would end all policy evaluation for that request.
- Associating a policy at an organization or folder affects many projects at once and can block production traffic; try it on a disposable folder first and use preview mode for rules.
- Deleting a node (folder or project) deletes an attached hierarchical policy only if it was created under that node. To avoid accidental deletion, move policies you keep to another node first. Policies can be moved between nodes.
- Use cases: organization-wide IP blocking, geography-based restrictions, CVE mitigation with WAF rules, compliance enforcement, and granting IP ranges or regions access to a folder.
- Enterprise enrollment: every project inheriting a hierarchical policy (not explicitly excluded, or with a policy attached directly) must be enrolled in Cloud Armor Enterprise.
  - Projects linked to a Cloud Billing account with a Cloud Armor Enterprise Annual subscription are auto-enrolled in Annual.
  - Without Annual, projects are auto-enrolled in Enterprise Paygo when they inherit a policy. Subscribing the billing account to Annual later does not move an already auto-enrolled project to Annual.
  - A project excluded after auto-enrollment is not automatically unenrolled; you cannot remove a project from Cloud Armor Enterprise while it has inherited hierarchical policies.
  - Auto-enrollment can take up to the next business day; during that time policies are effective and no Enterprise costs are incurred. Projects are auto-enrolled only when at least one backend service for global external load balancers uses HTTP, HTTPS, HTTP2, H2C, or GRPC.
- Limitations: not available for projects outside an organization; for new or recently restored projects, or projects that recently enabled the Compute Engine API, propagation can take a few hours; owners of inheriting services cannot tune preconfigured WAF rules (only the policy owner can); the console **Edit** and **Delete** buttons may appear active with view-only permission and then return a permission error.
- Corrected from the official docs: the source names `--project` for project-level association and `--project-number` for service-level policies; the table uses `--project-number` for project-level association, and service-level policies are regular security policies attached to backend services rather than hierarchical associations. In the gcloud 593.0.0 help of `gcloud compute org-security-policies associations create`, `--project-number` is "Project number to associate the security policy with" and `--project` exists only as the gcloud-wide flag.
- The help of `associations create` also states: "This command has billing implications. Projects in the hierarchy with effective hierarchical security policies will be automatically enrolled into Cloud Armor Enterprise if not already enrolled."
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/associations/create (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/armor/docs/hierarchical-policies-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-policy-overview.md](./security-policy-overview.md)
- [best-practices.md](./best-practices.md)
