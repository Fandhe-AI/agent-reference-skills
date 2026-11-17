---
source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/overview
---

# Overview of Access Approval

Access Approval requires Cloud Customer Care and engineering teams to get your explicit, cryptographically signed approval before they access your Customer Data. Access Transparency logs show when Google personnel access Customer Data; Access Approval lets you authorize those requests; Key Access Justifications adds key-level control for approvals signed with a customer-managed key.

## Signature / Usage

### How it works

Google administrators request approval from an authorized customer administrator before accessing Customer Data. Customers are notified of a pending request by a preconfigured email or a Pub/Sub message. The request is approved or denied in the Google Cloud console or with the Access Approval API (`https://docs.cloud.google.com/assured-workloads/access-approval/docs/reference/rest`). Access is granted only after approval. Active approvals can be revoked at any time. A Google-managed signing key is the default; you can instead use a Cloud KMS asymmetric signing key or a Cloud EKM externally-managed key.

A sample Access Approval request:

```json
{
  "name": "projects/123456/approvalRequests/xyzabc123",
  "requestedResourceName": "projects/123456",

  "requestedReason": {
    "detail":  "Case number: bar123",
    "type":  "CUSTOMER_INITIATED_SUPPORT"
  },
  "requestedLocations": {
    "principalOfficeCountry": "US",
    "principalPhysicalLocationCountry": "US"
  },
  "requestTime": "2018-08-28T19:07:12.286Z",

  "requestedExpiration": "2018-09-02T19:07:11.877Z"
}
```

## Options / Props

### Service enrollment options

| Option | Behavior |
|---|---|
| All supported services (default) | Enables Access Approval for all supported services regardless of launch stage (Preview or GA), and automatically enrolls services supported in the future. |
| GA services only | Enables Access Approval only for services in the GA launch stage, and automatically enrolls GA services supported in the future. |
| Selected services | You choose the specific services to enroll. |

### Requirements

| Item | Requirement |
|---|---|
| Activation scope | Google Cloud project, folder, or organization. |
| Prerequisite | Access Transparency must be enabled for the organization before enabling Access Approval. |
| Custom signing key | Asymmetric signing key in Cloud KMS, or an externally-managed key hosted through Cloud EKM (see the Cloud EKM restrictions for asymmetric signing keys). Cloud EKM is recommended for an externally-managed signing key. |
| Google-managed signing key | No additional configuration. |

## Notes

- With an Assured Workloads compliance boundary, the Assured Workloads personnel access assurances apply before Access Approval is evaluated; for example, a Canada Protected B folder owner who receives a request for the `global` location has Canada Protected B restrictions applied first.
- The support response time increases by the time Customer Care spends waiting for your approval. Be cautious when enabling Access Approval for projects and services that need high availability and rapid Customer Care response.
- Exclusions: Access Transparency's exclusions also apply to Access Approval. In addition, a request may be automatically approved, without customer action, to address time-sensitive outages; these are logged in an `auto approved` state. Auto-approval is disabled for all workloads deployed with EU Data Boundary with Access Justifications or Sovereign Controls by Partners. Auto-approval is permissive: it bypasses customer action for the stated outage cases.
- To ensure administrative access requests are processed only when approvals are signed with a customer-managed key, configure Access Approval with a customer-managed key and use Key Access Justifications.
- Access Approval provides a justification for each request to access Customer Data; Key Access Justifications provides a justification for each request to access externally-managed keys.
- Snippet taken from https://docs.cloud.google.com/assured-workloads/access-approval/docs/approval-request-details (the source's sample Access Approval request).
- The source also shows Console quickstart links and a Terraform page; they are not reproduced here.
- Source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [approve-requests.md](./approve-requests.md)
- [approval-request-details.md](./approval-request-details.md)
- [review-approve-access-requests-google-keys.md](./review-approve-access-requests-google-keys.md)
- [supported-services.md](./supported-services.md)
- [access-transparency-overview.md](./access-transparency-overview.md)
- [key-access-justifications-overview.md](./key-access-justifications-overview.md)
- Cloud KMS / Cloud EKM signing keys: see the `gcp-security` skill.
