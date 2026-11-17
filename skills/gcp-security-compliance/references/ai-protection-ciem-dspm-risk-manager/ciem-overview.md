---
source: https://docs.cloud.google.com/security-command-center/docs/ciem-overview
---

# Overview of Cloud Infrastructure Entitlement Management

Security Command Center's Cloud Infrastructure Entitlement Management (CIEM) capabilities show which identities have access to which resources across Google Cloud, Amazon Web Services (AWS) and Microsoft Azure (Preview), and help you find misconfigurations and enforce least privilege. Applies to Standard-legacy, Standard, Premium and Enterprise (Deprecated) service tiers; case-based remediation is Enterprise (Deprecated) only.

## Signature / Usage

CIEM, IAM recommender and Security Health Analytics findings appear under their own source (the **Source display name** in the console). List the ACTIVE findings of one source (`123456` is the organization ID, `5678` the source ID in the help example):

```bash
gcloud scc findings list 123456 --source=5678 \
    --filter="state=\"ACTIVE\""
```

## Options / Props

| CIEM feature | Detail |
|---|---|
| Multicloud misconfiguration detection | Google Cloud, AWS and Microsoft Azure (Preview). |
| Role vulnerability findings | Roles granted to principals in Google Cloud, AWS and Microsoft Azure (Preview), including federated identities from Entra ID (Azure AD), Okta and on-premises Active Directory (for Google Cloud and AWS IAM Identity Center). |
| Remediation guidance | For example, removing permissions from a principal with excess permissions. |
| Case management | Track remediation with cases in SCC Enterprise (Deprecated tier) or other ticket systems. |
| Standard / Standard-legacy tiers | Recommendations for Google Cloud basic roles only (see IAM recommender features). |
| Findings sources | IAM recommender, Security Health Analytics and the CIEM detection service all produce identity and access findings; the CIEM detection service itself produces a subset for AWS and Microsoft Azure (Preview) about highly privileged roles, groups and users. |
| Federated identities | Offending access grants and recommended remediations are visible from the SCC **Findings** page; the IAM page in the Google Cloud console shows permissions of principals from other identity providers. |

## Notes

- Enterprise tier shutdown: "The Security Command Center Enterprise service tier will shut down on May 21, 2027. If your organization uses the Enterprise service tier, then the organization will automatically move to the Premium service tier on or after May 21, 2027."
- Typical issues CIEM alerts on: highly privileged principals, dormant identities, unrotated service account keys, lack of multifactor authentication.
- The IAM recommender functionality powers CIEM.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/list (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/security-command-center/docs/ciem-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [ciem-enable-service.md](./ciem-enable-service.md)
- [ciem-identity-access-findings.md](./ciem-identity-access-findings.md)
