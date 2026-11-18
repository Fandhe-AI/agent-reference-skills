---
source: https://docs.cloud.google.com/vpc-service-controls/docs/overview
---

# Overview of VPC Service Controls

VPC Service Controls lets you define service perimeters around resources of Google-managed services to mitigate data exfiltration risks from services such as Cloud Storage and BigQuery. It is an extra layer of defense that is independent of IAM: IAM provides granular identity-based access control, while VPC Service Controls provides broader context-based perimeter security, including control of data egress across the perimeter. Use both for defense in depth.

## Signature / Usage

Access policies hold the service perimeters and access levels. Create an organization-level access policy (example from the gcloud help):

```bash
gcloud access-context-manager policies create \
    --organization=organizations/123 --title="My Policy"
```

### What a perimeter does

- A service perimeter creates a security boundary around Google Cloud resources. It allows free communication within the perimeter but, by default, blocks communication to Google Cloud services across the perimeter.
- The perimeter works only with Google Cloud managed services. It does not block access to third-party APIs or services on the internet.
- A perimeter can control: public internet to customer resources within managed services; VMs to a Google Cloud service (API); communication between Google Cloud services.
- A VPC network is not required. To use VPC Service Controls without resources on a VPC network, allow traffic from external IP ranges or certain IAM principals through access levels.
- A copy between two Cloud Storage buckets succeeds if both are in the same perimeter and fails if one is outside it.
- A VM in a VPC network outside the perimeter cannot reach Cloud Storage buckets inside the perimeter unless an ingress policy allows it.
- A host project that contains multiple VPC networks has a different perimeter policy for each VPC network in the host project.

### Capabilities (use cases)

- Isolate Google Cloud resources and VPC networks into service perimeters.
- Extend perimeters to on-premises networks using authorized VPN or Cloud Interconnect landing zone VPC networks (Private Google Access; the VPC network that contains the on-premises landing zone must be part of the perimeter).
- Control access to Google Cloud resources from the internet. Internet access to resources in a perimeter is denied by default; enable it with ingress rules or access levels based on source IP address, identity, or source Google Cloud project. To use the Google Cloud console on resources inside a perimeter, configure an access level that allows one or more IPv4 and IPv6 ranges, or specific user accounts.
- Protect data exchange across perimeters and organizations with ingress and egress rules.
- Allow context-aware access based on client attributes (identity type, identity, device data, network origin such as IP address or VPC network) with ingress rules.
- Control access to Google services not fully integrated with VPC Service Controls on private network paths with VPC Service Controls service patterns.
- Monitor access with Cloud Audit Logs, and test with dry run mode (including honeypot perimeters to detect probing).

### Policy scope

- VPC Service Controls is managed at the organization level by default. Scoped policies configure it for a folder or project and delegate administration down the resource hierarchy.
- An organization can have only one organization-level access policy.

### Other controls against data exfiltration

- Domain restricted sharing (organization policy), uniform bucket-level access on Cloud Storage, multi-factor authentication.
- Post-deployment scans for open Cloud Storage buckets: Security Command Center, Cloud Asset Inventory, third-party tools such as Palo Alto PrismaCloud.
- De-identification with Sensitive Data Protection (redaction, tokenization, or encryption).
- Deploy Cloud Storage buckets with infrastructure-as-code, passed through human or automated review before deployment.

## Options / Props

### Security risks mitigated

| Risk | How VPC Service Controls helps |
|------|--------------------------------|
| Access from unauthorized networks using stolen credentials | Allows private access only from authorized VPC networks, protecting against exfiltration with stolen OAuth or service account credentials. |
| Data exfiltration by malicious insiders or compromised code | Prevents clients in the networks from accessing resources of Google-managed services outside the perimeter, and prevents reading from or copying to resources outside it (for example `gcloud storage cp` to a public Cloud Storage bucket, or `bq mk` to a permanent external BigQuery table). |
| Public exposure of private data caused by misconfigured IAM policies | Denies access from unauthorized networks even if data is exposed by misconfigured IAM policies. |
| Monitoring access to services | Dry run mode monitors requests to protected services without preventing access. |

### Glossary

| Term | Definition |
|------|------------|
| VPC Service Controls | Technology that defines a service perimeter around resources of Google-managed services to control communication to and between those services. |
| service perimeter | A perimeter around Google-managed resources. Allows free communication within the perimeter but, by default, blocks all communication across it. |
| ingress rule | Allows an API client outside the perimeter to access resources within a perimeter. |
| egress rule | Allows an API client or resource inside the perimeter to access Google Cloud resources outside the perimeter. Does not block access to third-party APIs or services on the internet. |
| service perimeter bridge | Allows projects in different perimeters to communicate bidirectionally. Instead of a bridge, the source recommends ingress and egress rules, which give more granular control. |
| Access Context Manager | Context-aware request classification service that maps a request to an access level based on client attributes such as source IP address. |
| access level | Classification of requests over the internet based on attributes such as source IP range, client device, and geolocation. Like an ingress rule, it can grant internet access to a perimeter. |
| access policy | Google Cloud resource object that defines service perimeters. Scoped policies for folders or projects can exist alongside the organization-wide policy. An organization can have only one organization-level access policy. |
| scoped policy | An access policy scoped to specific folders or projects. |
| restricted VIP | Private network route for products and APIs supported by VPC Service Controls. `restricted.googleapis.com` resolves to `199.36.153.4/30`, a range that is not announced to the internet. |

## Notes

- Source: https://docs.cloud.google.com/vpc-service-controls/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/policies/create (gcloud 593.0.0 help).
- Metadata: VPC Service Controls is not designed to enforce comprehensive controls on metadata movement. Its primary goal is to control movement of data (content stored in a resource, such as a Cloud Storage object), not metadata (resource attributes, such as bucket names). Metadata can in some scenarios be copied and accessed without policy checks; rely on IAM, including custom roles, to control metadata access.
- Unsupported services: although it may be possible to enable unsupported services to access data of supported products, the source recommends against it. Unsupported services may not function at all in a protected project, especially when low-level services such as Cloud Storage or Pub/Sub are restricted. Deploy unsupported services in projects outside perimeters. To let them reach data inside a perimeter, create an access level that includes the service account for that service and apply it to perimeters as needed.
- Attempting to restrict an unsupported service with the `gcloud` tool or the Access Context Manager API results in an error. Cross-project access to data of supported services is blocked by VPC Service Controls; the restricted VIP can block workloads from calling unsupported services.
- Do not enable unsupported Google Cloud services in the perimeter; if you need one, enable it in a project outside the perimeter. Review the service limitations before including a service in a perimeter.
- Perimeter changes can block production traffic. Test in dry run mode first and try changes on disposable projects.
- Cloud Audit Logs are in `gcp-observability` (`audit-logs/`); the audit logs that VPC Service Controls writes (Policy Denied entries) have no dedicated page in either skill, see https://docs.cloud.google.com/vpc-service-controls/docs/audit-logging; Organization Policy and Cloud Asset Inventory are in the `gcp-foundation` skill.

## Related

- [service-perimeters.md](./service-perimeters.md)
- [architect-perimeters.md](./architect-perimeters.md)
- [ingress-egress-rules.md](./ingress-egress-rules.md)
- [context-aware-access.md](./context-aware-access.md)
- [vpc-accessible-services.md](./vpc-accessible-services.md)
- [private-connectivity.md](./private-connectivity.md)
- [quotas.md](./quotas.md)
