---
source: https://docs.cloud.google.com/security-command-center/docs/ciem-enable-service
---

# Enable the CIEM detection service

Set up the Security Command Center (SCC) Cloud Infrastructure Entitlement Management (CIEM) detection service for Google Cloud, Amazon Web Services (AWS) and Microsoft Azure (Preview). Applies to Standard-legacy, Standard, Premium and Enterprise (Deprecated) service tiers; the AWS and Azure setup is Enterprise (Deprecated) only.

## Signature / Usage

Grant pattern for `roles/securitycenter.admin` from the AI Protection configuration page. `RESOURCE_TYPE` is `organizations` or `projects`, `RESOURCE_ID` the numeric ID, `USER_EMAIL_ID` the user's email address. CIEM itself needs no additional permissions on Standard-legacy, Standard and Premium after SCC activation; the Enterprise setup roles below include `roles/securitycenter.admin`.

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
  --member=user:USER_EMAIL_ID \
  --role=roles/securitycenter.admin
```

## Options / Props

### Setup by cloud platform

| Platform | Tier / stage | Steps |
|---|---|---|
| Google Cloud | Standard-legacy, Standard, Premium, Enterprise (Deprecated) | Enabled by default; no extra configuration. After SCC activation the services generate and publish Google Cloud findings. |
| AWS | Enterprise (Deprecated) | Connect AWS to SCC (Connect to AWS); optionally integrate ticketing systems and enable case synchronization; configure AWS log ingestion for CIEM. |
| Microsoft Azure | Preview; Enterprise (Deprecated) | Connect Azure to SCC (Connect to Microsoft Azure); optionally integrate ticketing systems and enable case synchronization; configure Azure log ingestion for CIEM. |

### Roles for Enterprise tier activations (on the Google Cloud organization)

| Role | ID |
|---|---|
| Chronicle API Admin | `roles/chronicle.admin` |
| Chronicle SOAR Admin | `roles/chronicle.soarAdmin` |
| Chronicle Service Admin | `roles/chroniclesm.admin` |
| Cloud Asset Owner | `roles/cloudasset.owner` |
| Create Service Accounts | `roles/iam.serviceAccountCreator` |
| Folder IAM Admin | `roles/resourcemanager.folderIamAdmin` |
| IAM Recommender Admin | `roles/recommender.iamAdmin` |
| Organization Administrator | `roles/resourcemanager.organizationAdmin` |
| Organization Role Administrator | `roles/iam.roleAdmin` |
| Project Creator | `roles/resourcemanager.projectCreator` |
| Project IAM Admin | `roles/resourcemanager.projectIamAdmin` |
| Security Admin | `roles/iam.securityAdmin` |
| Security Center Admin | `roles/securitycenter.admin` |

## Notes

- Before you begin: purchase and activate SCC for the organization (Standard, Premium or Enterprise activation) and read the CIEM capabilities overview.
- Enterprise tier shutdown: "The Security Command Center Enterprise service tier will shut down on May 21, 2027. If your organization uses the Enterprise service tier, then the organization will automatically move to the Premium service tier on or after May 21, 2027."
- The role set for Enterprise activation is broad (organization, IAM and project administration); the source says custom or other predefined roles may also provide the permissions. Grant them only to the administrators doing the setup.
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/configure-ai-protection.
- Azure support is Preview (Pre-GA Offerings Terms: available "as is", limited support).
- Source: https://docs.cloud.google.com/security-command-center/docs/ciem-enable-service (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [ciem-overview.md](./ciem-overview.md)
- [ciem-identity-access-findings.md](./ciem-identity-access-findings.md)
