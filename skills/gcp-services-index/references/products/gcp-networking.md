---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-networking

## Signature / Usage

Owner skill: `gcp-networking` (status: 未収録（予定）). gcloud groups: `dns`, `edge-cache`, `edge-cloud`, `ids`, `network-connectivity`, `network-management`, `network-security`, `network-services`, `number-registry`, `service-directory`, `service-extensions`, `zone-management`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Docs | Status |
|---|---|---|---|---|---|---|---|---|
| API Management | `apim.googleapis.com` (v1alpha) | Enables users to discover shadow APIs in existing Google Cloud infrastructure. | — | `apim.` | 3 | — | https://cloud.google.com/apigee/ | 未収録（予定） |
| Cloud DNS | `dns.googleapis.com` (v1, v1beta2) | — | `dns` | `dns.` | 6 | — | https://cloud.google.com/dns/docs | 未収録（予定） |
| Cloud Intrusion Detection System | `ids.googleapis.com` (v1) | Cloud IDS (Cloud Intrusion Detection System) detects malware, spyware, command-and-control attacks, and other network-based threats. Its security efficacy is industry leading, built with Palo Alto Networks technologies. When you use this product, your organization name and consumption levels will be shared with Palo Alto Networks. | `ids` | `ids.` | 3 | — | https://cloud.google.com/ | 未収録（予定） |
| Distributed Cloud Edge Container | — | — | — | `edgecontainer.` | 23 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/edgecontainer | 未収録（予定） |
| Distributed Cloud Edge Network | — | — | — | `edgenetwork.` | 3 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/edgenetwork | 未収録（予定） |
| Firewall Insights | — | — | — | `firewallinsights.` | 1 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/firewallinsights | 未収録（予定） |
| Network Connectivity Center | `networkconnectivity.googleapis.com` (v1, v1alpha1) | This API enables connectivity with and between Google Cloud resources. | — | `networkconnectivity.` | 18 | — | https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest | 未収録（予定） |
| Network Management API | `networkmanagement.googleapis.com` (v1, v1beta1) | The Network Management API provides a collection of network performance monitoring and diagnostic capabilities. | — | `networkmanagement.` | 7 | — | https://cloud.google.com/ | 未収録（予定） |
| Network Security | `networksecurity.googleapis.com` (v1, v1beta1) | — | — | `networksecurity.` | 22 | — | https://cloud.google.com/networking | 未収録（予定） |
| Network Services | `networkservices.googleapis.com` (v1, v1beta1) | — | — | `networkservices.` | 6 | — | https://cloud.google.com/networking | 未収録（予定） |
| Serverless VPC Access | `vpcaccess.googleapis.com` (v1, v1beta1) | API for managing VPC access connectors. | — | `vpcaccess.` | 4 | — | https://cloud.google.com/vpc/docs/configure-serverless-vpc-access | 未収録（予定） |
| Service Directory | `servicedirectory.googleapis.com` (v1, v1beta1) | Service Directory is a platform for discovering, publishing, and connecting services. | — | `servicedirectory.` | 6 | — | https://cloud.google.com/service-directory | 未収録（予定） |
| Service Extensions | — | — | — | `networkactions.` | 1 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/networkactions | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
