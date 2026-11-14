---
source: https://docs.cloud.google.com/iam/docs/workforce-identity-federation
---

# Workforce Identity Federation overview and gcloud sign-in

Workforce Identity Federation lets users from an external OIDC or SAML 2.0 IdP use single sign-on to access Google Cloud without synchronizing identities into Google Accounts. Covers pools, providers, attributes, principal identifiers, and signing in to the gcloud CLI.

## Signature / Usage

Principal identifiers for allow policies:

```text
principal://iam.googleapis.com/locations/global/workforcePools/POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE
principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/group/GROUP_ID
principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE
principalSet://iam.googleapis.com/locations/global/workforcePools/POOL_ID/*
```

Attribute mapping examples:

```text
principalSet://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/attribute.costcenter/1234
attribute.username=assertion.email.split("@")[0]
attribute.department=assertion.department.join(".")
google.email=assertion.email
```

Create a login configuration file for the gcloud CLI, then sign in:

```bash
gcloud iam workforce-pools create-login-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --output-file=LOGIN_CONFIG_PATH
```

```json
{
  "universe_domain": "googleapis.com",
  "universe_cloud_web_domain": "cloud.google",
  "type": "external_account_authorized_user_login_config",
  "audience": "//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID",
  "auth_url": "https://auth.cloud.google/authorize",
  "token_url": "https://sts.googleapis.com/v1/oauthtoken",
  "token_info_url": "https://sts.googleapis.com/v1/introspect"
}
```

```bash
gcloud auth login --login-config="LOGIN_CONFIG_FILE_PATH"
```

With `--activate` on `create-login-config`, plain `gcloud auth login` works:

```bash
gcloud auth login
```

Delegating pool administration to a partner (allow policy on the partner pool):

```json
{
  "bindings": [
    {
      "role": "roles/iam.workforcePoolEditor",
      "members": [
        "principal://iam.googleapis.com/locations/global/workforcePools/enterprise-example-organization-employees/subject/partner-organization-admin@example.com"
      ]
    }
  ]
}
```

VPC Service Controls egress rule needed for Security Token Service calls whose audience is a workforce pool:

```yaml
- egressTo:
    operations:
      - serviceName: 'sts.googleapis.com'
        methodSelectors:
          - method: '*'
    resources:
      - '*'
  egressFrom:
    identityType: ANY_IDENTITY
```

## Options / Props

| Attribute | Required | Limits and use |
|---|---|---|
| `google.subject` | Yes | Unique identifier of the user, logged as the principal in Cloud Audit Logs; max 127 bytes; avoid mutable values |
| `google.groups` | No | CEL expression producing an array of strings; keep names to 40 characters; sign-in fails for users in more than 400 groups |
| `google.display_name` | No | Console display name; max 100 bytes; not usable in allow policies or conditions |
| `google.profile_photo` | No | Thumbnail URL (400x400 recommended); not usable in policies or conditions |
| `google.posix_username` | No | POSIX username for SSH-in-browser and OS Login (Preview); max 32 characters; not usable in policies or conditions |
| `google.email` | No | Email for OAuth client integrations (IAP, Secure Source Manager); not usable in policies or conditions |
| `attribute.KEY` | No | Custom attributes usable in allow policies; max 50 rules, 2048 characters each |

Total attribute mappings are limited to 16 KB, otherwise sign-in fails. Custom CEL functions: `split`, `join` (plus standard CEL).

| OIDC flow | Behavior |
|---|---|
| Authorization code flow | Most secure; tokens returned back-channel, any size; claims either `merge-user-info-over-id-token-claims` or `only-id-token-claims` |
| Implicit flow | ID token returned via browser (URL size limits); only `only-id-token-claims` |

## Notes

- Workforce Identity Federation federates human users and is sync-less (no Google Cloud Directory Sync). Use Workload Identity Federation for automated workloads. The token-exchange quota `sts.googleapis.com/workforce_requests` defaults to 1,000 requests per minute per organization and is shared by all pools, providers, users and workloads; retry with exponential backoff and monitor the quota.
- Pools are organization-level resources; the pool ID must be globally unique across Google Cloud and is referenced from any project or folder in the organization. Pools support grouping identities, multiple IdPs, attribute mapping/conditions, gcloud and API access for third-party identities, and Cloud Audit Logs with pool ID.
- Providers follow OAuth 2.0 Token Exchange (RFC 8693): the Security Token Service verifies the IdP credential and returns a short-lived Google Cloud access token.
- Warning: for multi-tenant IdPs with a single issuer URI (such as GitHub or Terraform Cloud), you must use attribute conditions to restrict access to the correct tenant. Attribute conditions also prevent confused-deputy problems.
- If every user mapped to `google.groups` is granted access, ensure only authorized users can modify membership of those groups. Prefer multiple pools over deeply nested security groups.
- Detailed audit logging (enabled at provider creation) logs IdP attributes to Cloud Audit Logs to debug attribute mapping errors. Upload JWKs manually when the OIDC issuer is not publicly accessible. SCIM provisioning applies only to Gemini Enterprise.
- Workforce pool principals cannot directly access resources outside their organization, but service account impersonation can bypass this constraint.
- The workforce pools user project (specified in the configuration file) is the default quota project for client-based APIs unless gcloud is used; it requires `serviceusage.services.use` (`roles/serviceusage.serviceUsageConsumer`).
- Workforce pool configuration APIs do not support VPC Service Controls; products that support both operate normally. Workforce pool users and workload identities can be used in ingress/egress rules.
- Provide Essential Contacts (Legal and Suspension, or All) because federated users have no Cloud Identity email; the console shows a banner until configured.
- Console (federated) gives workforce users UI access to supported products.
- The login configuration file is not validated and contains no secrets, but a malicious actor with write access can change endpoints and intercept credentials; make it read-only and restrict with an ACL.
- Corrected from the official docs: the individual-subject delegation example uses `principal://` (not `principalSet://`), and the workforce `principalSet` example omits `projects/PROJECT_NUMBER/` (workforce pools are organization-scoped).
- Source: https://docs.cloud.google.com/iam/docs/workforce-identity-federation
- Source: https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- Workload Identity Federation OIDC / SAML providers (see the workload-identity-federation pages in this skill)
- gcp-security covers VPC Service Controls and IAP; gcp-cli covers gcloud generally.
