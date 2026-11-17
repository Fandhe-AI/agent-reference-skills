---
source: https://docs.cloud.google.com/security-command-center/docs/ciem-identity-access-findings
---

# Investigate identity and access findings

Work with identity and access findings (CIEM) in the Security Command Center (SCC) console to find misconfigurations. Applies to Standard-legacy, Standard, Premium and Enterprise (Deprecated) service tiers. Findings come from CIEM (AWS and Microsoft Azure), IAM recommender, Security Health Analytics and Event Threat Detection (Google Cloud). Prerequisites: read the CIEM overview and enable the CIEM detection service.

## Signature / Usage

The console **Identity** view filters on `domains.category` containing `IDENTITY_AND_ACCESS`. From the gcloud CLI, list only the category and resource name of the ACTIVE findings of one source (`123456` is the organization ID, `5678` the source ID in the help example):

```bash
gcloud scc findings list 123456 --source=5678 \
    --filter="state=\"ACTIVE\"" \
    --field-mask="finding.category,finding.resource_name"
```

### View findings in the console

On the SCC **Findings** page select your organization and the **Identity** view (also on the **Risk overview** page), narrow with **Quick Filters** and the **Query Editor** (**Source display name** `CIEM` for AWS and Microsoft Azure, `IAM recommender` for Google Cloud; **Category**, **Project ID**, **Resource type**, **Severity**), and open a finding from the **Category** column.

## Options / Props

### Findings page columns relevant to CIEM

| Column | Meaning |
|---|---|
| Severity | Prioritize remediation. |
| Resource display name | Resource where the finding was detected. |
| Source display name | Detecting service: CIEM, IAM recommender, Security Health Analytics, Event Threat Detection. |
| Cloud provider | Google Cloud, AWS, Microsoft Azure. |
| Offending access grants | Link to review principals potentially granted inappropriate roles. |
| Case ID | Related case (Enterprise (Deprecated) tier). |

### Finding detail sections (Summary tab)

| Section | Detail |
|---|---|
| Offending access grants | Shown only when IAM recommender detects principals with highly permissive, basic and unused roles on Google Cloud resources. **Review offending access grants** lists principal name (user accounts, groups, federated identities, service accounts), role, and recommended action. |
| Case information | Enterprise (Deprecated) tier: links to the case and Jira / ServiceNow ticket, assignee, status and priority. |
| Next steps | Step-by-step remediation guidance tailored to the finding. |

### Findings per cloud platform

| Platform | Category (ID) | Source | Description |
|---|---|---|---|
| AWS | Assumed identity has excessive permissions (`ASSUMED_IDENTITY_HAS_EXCESSIVE_PERMISSIONS`) | CIEM | Assumed IAM roles with highly permissive policies. |
| AWS | Group has excessive permissions (`GROUP_HAS_EXCESSIVE_PERMISSIONS`) | CIEM | AWS IAM or IAM Identity Center groups with highly permissive policies. |
| AWS | User has excessive permissions (`USER_HAS_EXCESSIVE_PERMISSIONS`) | CIEM | AWS IAM or IAM Identity Center users with highly permissive policies. |
| AWS | User is inactive (`INACTIVE_USER`) | CIEM | Inactive AWS IAM or IAM Identity Center users. |
| AWS | Group is inactive (`INACTIVE_GROUP`) | CIEM | Inactive AWS IAM or IAM Identity Center groups. |
| AWS | Assumed identity is inactive (`INACTIVE_ASSUMED_IDENTITY`) | CIEM | Inactive assumed IAM roles. |
| AWS | Overly permissive trust policy enforced on assumed identity (`OVERLY_PERMISSIVE_TRUST_POLICY_ENFORCED_ON_ASSUMED_IDENTITY`) | CIEM | Highly permissive trust policy on an assumed IAM role. |
| AWS | Assumed identity has lateral movement risk (`ASSUMED_IDENTITY_HAS_LATERAL_MOVEMENT_RISK`) | CIEM | Identities that can move laterally through role impersonation. |
| Microsoft Azure | Assumed identity has excessive permissions (`ASSUMED_IDENTITY_HAS_EXCESSIVE_PERMISSIONS`) | CIEM | Service principals or managed identities with highly permissive role assignments. |
| Microsoft Azure | Group has excessive permissions (`GROUP_HAS_EXCESSIVE_PERMISSIONS`) | CIEM | Groups with highly permissive role assignments. |
| Microsoft Azure | User has excessive permissions (`USER_HAS_EXCESSIVE_PERMISSIONS`) | CIEM | Users with highly permissive role assignments. |
| Google Cloud | MFA not enforced (`MFA_NOT_ENFORCED`) | Security Health Analytics | Users not using 2-Step Verification. |
| Google Cloud | Custom role not monitored (`CUSTOM_ROLE_NOT_MONITORED`) | Security Health Analytics | No log metrics and alerts for Custom Role changes. |
| Google Cloud | KMS role separation (`KMS_ROLE_SEPARATION`) | Security Health Analytics | A user holds Cloud KMS Admin together with CryptoKey Encrypter/Decrypter, Encrypter, Decrypter, Public Key Viewer, Signer or Signer/Verifier (separation of duties not enforced). |
| Google Cloud | Primitive roles used (`PRIMITIVE_ROLES_USED`) | Security Health Analytics | A user has Owner (`roles/owner`), Editor (`roles/editor`) or Viewer (`roles/viewer`). |
| Google Cloud | Redis role used on org (`REDIS_ROLE_USED_ON_ORG`) | Security Health Analytics | A Redis IAM role is assigned at organization or folder level. |
| Google Cloud | Service account role separation (`SERVICE_ACCOUNT_ROLE_SEPARATION`) | Security Health Analytics | A user has Service Account Admin and Service Account User (separation of duties). |
| Google Cloud | Non org IAM member (`NON_ORG_IAM_MEMBER`) | Security Health Analytics | A user not using organizational credentials; per CIS Google Cloud Foundations 1.0 only `@gmail.com` addresses trigger it. |
| Google Cloud | Open group IAM member (`OPEN_GROUP_IAM_MEMBER`) | Security Health Analytics | A Google Group joinable without approval is an IAM allow policy principal. |
| Google Cloud | Unused IAM role (`UNUSED_IAM_ROLE`) | IAM recommender | A user account has an IAM role not used in the last 90 days. |
| Google Cloud | IAM role has excessive permissions (`IAM_ROLE_HAS_EXCESSIVE_PERMISSIONS`) | IAM recommender | A service account has roles giving excessive permissions. |
| Google Cloud | Service agent role replaced with basic role (`SERVICE_AGENT_ROLE_REPLACED_WITH_BASIC_ROLE`) | IAM recommender | A service agent's default role was replaced with Owner, Editor or Viewer. |
| Google Cloud | Service agent granted basic role (`SERVICE_AGENT_GRANTED_BASIC_ROLE`) | IAM recommender | A service agent was granted Owner, Editor or Viewer. |
| Google Cloud | Admin service account (`ADMIN_SERVICE_ACCOUNT`) | Security Health Analytics | A service account has Admin, Owner or Editor privileges. |
| Google Cloud | Default service account used (`DEFAULT_SERVICE_ACCOUNT_USED`) | Security Health Analytics | An instance uses the default service account. |
| Google Cloud | Over privileged account (`OVER_PRIVILEGED_ACCOUNT`) | Security Health Analytics | A service account has overly broad project access in a cluster. |
| Google Cloud | Over privileged service account user (`OVER_PRIVILEGED_SERVICE_ACCOUNT_USER`) | Security Health Analytics | Service Account User or Token Creator at project level. |
| Google Cloud | Service account key not rotated (`SERVICE_ACCOUNT_KEY_NOT_ROTATED`) | Security Health Analytics | Key not rotated for more than 90 days. |
| Google Cloud | Over privileged scopes (`OVER_PRIVILEGED_SCOPES`) | Security Health Analytics | A node service account has broad access scopes. |
| Google Cloud | KMS public key (`KMS_PUBLIC_KEY`) | Security Health Analytics | A Cloud KMS key is publicly accessible. |
| Google Cloud | Public bucket ACL (`PUBLIC_BUCKET_ACL`) | Security Health Analytics | A Cloud Storage bucket is publicly accessible. |
| Google Cloud | Public log bucket (`PUBLIC_LOG_BUCKET`) | Security Health Analytics | A log sink bucket is publicly accessible. |
| Google Cloud | User managed service account key (`USER_MANAGED_SERVICE_ACCOUNT_KEY`) | Security Health Analytics | A user manages a service account key. |
| Google Cloud | Too many KMS users (`TOO_MANY_KMS_USERS`) | Security Health Analytics | More than three users of cryptographic keys. |
| Google Cloud | KMS project has owner (`KMS_PROJECT_HAS_OWNER`) | Security Health Analytics | A user has Owner on a project with cryptographic keys. |
| Google Cloud | Owner not monitored (`OWNER_NOT_MONITORED`) | Security Health Analytics | No log metrics and alerts for project ownership changes. |

## Notes

- Enterprise tier shutdown: "The Security Command Center Enterprise service tier will shut down on May 21, 2027. If your organization uses the Enterprise service tier, then the organization will automatically move to the Premium service tier on or after May 21, 2027."
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/list (gcloud 593.0.0 help).
- CIEM findings for AWS and Microsoft Azure come from the CIEM detection service (Microsoft Azure is Preview); Google Cloud findings come from IAM recommender, Security Health Analytics and Event Threat Detection.
- The source's last column links each category to the SCC vulnerability findings reference (CIEM, IAM, IAM recommender, KMS, Storage, Container, Compute, Monitoring and MFA sections); descriptions above are condensed from the source table.
- The source page describes Console navigation only; it gives no API or CLI form of the **Identity** view.
- Corrected from the official docs: this page describes `KMS_ROLE_SEPARATION` as a user holding "any of the following Cloud Key Management Service roles at the same time: CryptoKey Encrypter/Decrypter, Encrypter, or Decrypter". The Security Health Analytics findings reference defines it as a user with the Cloud KMS Admin role and any of CryptoKey Encrypter/Decrypter, Encrypter, Decrypter, Public Key Viewer, Signer or Signer/Verifier at the same time, available only for organization-level activations (https://docs.cloud.google.com/security-command-center/docs/concepts-vulnerabilities-findings, retrieved 2026-11-18).
- Source: https://docs.cloud.google.com/security-command-center/docs/ciem-identity-access-findings (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [ciem-overview.md](./ciem-overview.md)
- [ciem-enable-service.md](./ciem-enable-service.md)
