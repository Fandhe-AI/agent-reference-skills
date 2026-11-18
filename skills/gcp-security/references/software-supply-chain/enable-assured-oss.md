---
source: https://docs.cloud.google.com/assured-open-source-software/docs/enable
---

# Enable the Assured Open Source Software free tier

Enable the Assured OSS free tier to access a subset of curated open source packages. You prepare at least one service account or AWS account, optionally set up Pub/Sub notifications, and submit the customer enablement form. The premium tier is enabled through Security Command Center instead.

## Signature / Usage

### Create a service account for Assured OSS

The source recommends new accounts used exclusively for Assured OSS. The gcloud example creates a service account.

```bash
gcloud iam service-accounts create some-account-name \
    --display-name="My Service Account"
```

### Submit the enablement form

1. Go to the customer enablement form and set **Choose one of the actions to perform** to **Enable access**.
2. Enter company name and contact information, including a valid corporate email address (Google uses the company name to verify the match with your email address).
3. Enter the service account and AWS account information.
4. Add the Pub/Sub endpoint.
5. Review the terms of service and click **Submit**.

## Options / Props

### Accounts and access

| Item | Detail |
|------|--------|
| Identities | At least one Google Cloud service account or AWS account ID; up to ten identities in total across both |
| Direct Artifact Registry use (no proxy) | One of the service accounts must be the Artifact Registry Service Agent of the project you want to use Assured OSS with |
| Resources the accounts can access | Google-managed Artifact Registry (curated packages); Google-managed Artifact Analysis APIs (enriched metadata); secured Cloud Storage bucket with SPDX, VEX, package health and license files; Pub/Sub topic for package status and vulnerability notifications; scripts for signature verification, metadata download and Python `requirements.txt` generation; the Assured OSS APIs |

### Enrollment website actions

| Action | Form selection | Process |
|--------|----------------|---------|
| Add service accounts or AWS account IDs | Enable access (again) | Corporate email must belong to the same company domain; confirmation email follows |
| Update notification preferences | Update notification preferences | Needs approval and confirmation from the registered administrator; offline |
| Disable specific accounts | Disable access | Needs approval and confirmation from the registered administrator; offline |
| Halt all usage and disconnect | Close all access | Needs approval and confirmation from the registered administrator; offline |

## Notes

- Notifications cover images uploaded, new tags added and images deleted (configured through Artifact Registry Pub/Sub notifications).
- After submission you receive a confirmation email; in rare cases enablement takes an hour or more. Save the email: it summarizes the information needed to change the configuration later. The system then grants the service accounts the permissions to access and download packages and security metadata.
- Closing all access and disabling accounts disrupts consumers of the packages; confirm which pipelines still use the accounts first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/create (gcloud 593.0.0 help). Service accounts are covered in the `gcp-foundation` skill.
- Source: https://docs.cloud.google.com/assured-open-source-software/docs/enable (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [assured-oss-overview.md](./assured-oss-overview.md)
- [remote-repository-access.md](./remote-repository-access.md)
- [download-python-packages.md](./download-python-packages.md)
