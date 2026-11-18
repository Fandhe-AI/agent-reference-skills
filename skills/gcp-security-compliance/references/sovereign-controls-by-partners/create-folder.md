---
source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/create-folder
---

# Create a partner-managed folder

Sovereign Controls by Partners is an Assured Workloads offering. You create a partner-managed Assured Workloads folder (with the **Sovereign Controls** control package) before creating any other resource intended for use with it. Folder creation also creates a CMEK project and key ring, but no keys.

## Signature / Usage

### Prerequisites

- You completed onboarding to Google Cloud and received an email instructing you to create a partner-managed folder.
- If your organization enforces the `iam.allowedPolicyMemberDomains` organization policy constraint, allow these additional domain IDs before creating the folder: the partner's Google Cloud organization ID or Google Workspace customer ID (request it from the partner if not provided during onboarding), and Google's customer ID `C02h8e9nw`. Without them the operation fails with `One or more users named in the policy do not belong to a permitted customer.`
- You understand the restrictions and limitations of the data boundary your partner offers.

### Create the folder (Google Cloud console)

The source describes only the console flow: Assured Workloads page, **CREATE**, then these steps.

1. **Add folder details**: folder name (4 to 30 characters; letters, numbers, spaces and hyphens only), organization (can't be changed later), folder location (child of an organization or of another folder).
2. **Choose a control package option**: select **Sovereign Controls**, then select your partner-managed solution and, if your partner created one, a sub-billing account.
3. **Select resource location**: the location where resource creation and usage are enforced by the folder's organization policy.
4. **Configure additional settings**: create a new project and a key ring for CMEK. No keys are created.
5. Optional **Manage partner permissions** step (depends on the partner), then **Review and create folder**.

### Cloud Controls Partner Service Agent email format

```text
service-folder-[FOLDER_ID]@gcp-sa-cloudcontrolspartner.iam.gserviceaccount.com
```

### Inspect the created folder

This is the gcloud help's example for describing an Assured Workloads environment.

```bash
gcloud assured workloads describe \
    organizations/123/locations/us-central1/workloads/456
```

## Options / Props

### Partner permissions (Manage partner permissions step)

| Permission | What the partner can view |
|---|---|
| Monitoring | Assured Workloads monitoring information for the folder, including unresolved or resolved compliance violations and exceptions you granted |
| Access Transparency and emergency access logs | Access Transparency logs and emergency access logs for the folder |
| Access Transparency support case details | Additional support case details used as an access reason within Access Transparency logs; requires the Access Transparency and emergency access logs permission to take effect |
| Access Approval information | Access Approval logs for the folder |

### Monitoring access

| Item | Value |
|---|---|
| Service agent | Cloud Controls Partner Service Agent (visible in the folder's IAM policy) |
| Role granted on the folder | Cloud Controls Partner Monitoring Service Agent (`roles/cloudcontrolspartner.monitoringServiceAgent`) |

### Resources created

| Resource | Purpose |
|---|---|
| Sovereign Controls by Partners folder | Enforces security controls on supported products; sets an organization policy restricting resource usage to supported products and allowing creation or use of resources only in allowed locations |
| CMEK project | Contains the configured CMEK key ring |

## Notes

- Sovereign Controls by Partners shares capabilities and features with Assured Workloads. Name folders with a prefix such as `aw-`, and don't put sensitive data or PII in the folder name.
- Folder creation does not create keys: create an encryption key before adding any resources. With a coordinated external key for Cloud EKM, manually created key versions aren't automatically set as the primary version; set one as primary (see Rotate a key in the Cloud KMS docs).
- To grant or revoke partner access to monitoring and access history data at any time: Assured Workloads page, open the folder, **Configure Partner Permissions**, change the checkboxes, **Save**.
- Allowing the partner's ID and Google's customer ID `C02h8e9nw` in `iam.allowedPolicyMemberDomains` lets the partner and Google grant IAM roles in your organization to manage your workloads; it widens the permitted identity domains, so allow only the IDs the source lists.
- The source shows only the Google Cloud console flow, not gcloud or REST.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/describe (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/create-folder (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-management.md](./key-management.md)
- [supported-products.md](./supported-products.md)
- [shared-responsibility.md](./shared-responsibility.md)
