---
source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines
---

# Workload Identity Federation for GitHub Actions

Let a GitHub Actions job obtain short-lived Google Cloud credentials from its OIDC token, with no service account key.

## Signature / Usage

### Create the pool

```bash
gcloud iam workload-identity-pools create POOL_ID \
    --location="global" \
    --description="DESCRIPTION" \
    --display-name="DISPLAY_NAME"
```

### Attribute mapping and required condition

```text
google.subject=assertion.sub
```

```text
assertion.repository_owner=='ORGANIZATION'
assertion.repository_owner=='ORGANIZATION' && assertion.ref=='refs/heads/main'
```

### Create the OIDC provider

```bash
# GitHub Actions
gcloud iam workload-identity-pools providers create-oidc PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="POOL_ID" \
    --issuer-uri="https://token.actions.githubusercontent.com/" \
    --attribute-mapping="MAPPINGS" \
    --attribute-condition="CONDITIONS"
```

Update the condition later:

```bash
gcloud iam workload-identity-pools providers update-oidc PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="POOL_ID" \
    --attribute-condition="CONDITIONS"
```

### Let the federated identity impersonate a service account

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_EMAIL \
    --role=roles/iam.workloadIdentityUser \
    --member="principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT"
```

### Workflow

Adapted (not in the official docs): the action references are pinned to a full commit SHA placeholder instead of the mutable `@v3` / `@v1` tags shown in the official sample.

```yaml
jobs:
  build:
    # Allow the job to fetch a GitHub ID token
    permissions:
      id-token: write
      contents: read

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@FULL_COMMIT_SHA

      - id: 'auth'
        name: 'Authenticate to Google Cloud'
        uses: 'google-github-actions/auth@FULL_COMMIT_SHA'
        with:
          create_credentials_file: true
          workload_identity_provider: 'projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID'
          service_account: 'SERVICE_ACCOUNT_EMAIL'
```

## Options / Props

| Item | Value |
|---|---|
| Issuer URI | `https://token.actions.githubusercontent.com/` |
| Useful claims | `sub`, `repository`, `repository_id`, `repository_owner`, `repository_owner_id`, `ref` |
| Access grant | `principal://` / `principalSet://` members, or `roles/iam.workloadIdentityUser` on a service account |

## Notes

- GitHub uses one issuer URL for all organizations, so an attribute condition restricting tokens to your organization is mandatory, and every claim used in it must be mapped.
- Prefer numeric `*_id` claims over names; names can be re-claimed after deletion.
- Use the project number, not the project ID, in member identifiers. `gcp-` is a reserved ID prefix.
- Source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-other-providers (retrieved 2026-11-14)

## Related

- [wif-deployment-pipelines.md](../references/iam-guides/workload-identity-federation/wif-deployment-pipelines.md)
- [wif-oidc-saml-providers.md](../references/iam-guides/workload-identity-federation/wif-oidc-saml-providers.md)
- [wif-troubleshooting.md](../references/iam-guides/workload-identity-federation/wif-troubleshooting.md)
