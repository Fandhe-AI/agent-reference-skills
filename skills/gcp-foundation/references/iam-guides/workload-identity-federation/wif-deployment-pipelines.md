---
source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines
---

# Workload Identity Federation with deployment pipelines

Configure GitHub Actions, GitLab SaaS, Azure DevOps, and HCP Terraform to obtain short-lived Google Cloud credentials from their OIDC tokens instead of service account keys.

## Signature / Usage

### Attribute mappings

```text
google.subject=assertion.sub
```

```text
google.subject=assertion.sub
attribute.project_id=assertion.project_id
attribute.namespace_id=assertion.namespace_id
```

```text
google.subject=assertion.terraform_workspace_id
```

### Attribute conditions (required to restrict the shared issuer)

```text
assertion.oid=='APPLICATION_OBJECT_ID'
assertion.repository_owner=='ORGANIZATION'
assertion.repository_owner=='ORGANIZATION' && assertion.ref=='refs/heads/main'
assertion.namespace_id=='GROUP_ID'
assertion.namespace_id=='GROUP_ID' && assertion.environment=='production'
assertion.terraform_organization_id=='ORGANIZATION_ID'
assertion.terraform_organization_id=='ORGANIZATION_ID' && assertion.terraform_workspace_id=='WORKSPACE_ID'
```

### Providers

```bash
gcloud iam workload-identity-pools create POOL_ID \
    --location="global" \
    --description="DESCRIPTION" \
    --display-name="DISPLAY_NAME"
```

```bash
# Azure DevOps (audience for new connections: fb60f99c-7a34-4190-8149-302f77469936)
gcloud iam workload-identity-pools providers create-oidc PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="POOL_ID" \
    --issuer-uri="ISSUER" \
    --allowed-audiences="AUDIENCE" \
    --attribute-mapping="MAPPINGS" \
    --attribute-condition="CONDITIONS"
```

```bash
# GitHub Actions
gcloud iam workload-identity-pools providers create-oidc PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="POOL_ID" \
    --issuer-uri="https://token.actions.githubusercontent.com/" \
    --attribute-mapping="MAPPINGS" \
    --attribute-condition="CONDITIONS"
```

```bash
# GitLab SaaS: --issuer-uri="https://gitlab.com"
# HCP Terraform: --issuer-uri="https://app.terraform.io"
gcloud iam workload-identity-pools providers create-oidc PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="POOL_ID" \
    --issuer-uri="https://gitlab.com" \
    --attribute-mapping="MAPPINGS" \
    --attribute-condition="CONDITIONS"
```

Update the attribute condition on an existing provider:

```bash
gcloud iam workload-identity-pools providers update-oidc PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="POOL_ID" \
    --attribute-condition="CONDITIONS"
```

### GitHub Actions workflow

Adapted (not in the official docs): `actions/checkout@v3` and `google-github-actions/auth@v1` are mutable tags; replace them with a full commit SHA you have verified (the SHAs are not verifiable from the official page).

```yaml
jobs:
  build:
    # Allow the job to fetch a GitHub ID token
    permissions:
      id-token: write
      contents: read

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - id: 'auth'
        name: 'Authenticate to Google Cloud'
        uses: 'google-github-actions/auth@v1'
        with:
          create_credentials_file: true
          workload_identity_provider: 'projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID'
          service_account: 'SERVICE_ACCOUNT_EMAIL'
```

### GitLab CI/CD job

Adapted (not in the official docs): the token is written with `printf '%s'` and all expansions are quoted.

```yaml
job:
  variables:
    WORKLOAD_IDENTITY_PROJECT_NUMBER: PROJECT_NUMBER
    WORKLOAD_IDENTITY_POOL: POOL_ID
    WORKLOAD_IDENTITY_PROVIDER: PROVIDER_ID
    SERVICE_ACCOUNT: SERVICE_ACCOUNT_EMAIL
    GOOGLE_APPLICATION_CREDENTIALS: $CI_BUILDS_DIR/.workload_identity.wlconfig

  id_tokens:
    WORKLOAD_IDENTITY_TOKEN:
      aud: https://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID

  script:
    - |-
      printf '%s' "${WORKLOAD_IDENTITY_TOKEN}" > "${CI_BUILDS_DIR}/.workload_identity.jwt"
      cat << EOF > "${GOOGLE_APPLICATION_CREDENTIALS}"
      {
        "type": "external_account",
        "audience": "//iam.googleapis.com/projects/$WORKLOAD_IDENTITY_PROJECT_NUMBER/locations/global/workloadIdentityPools/$WORKLOAD_IDENTITY_POOL/providers/$WORKLOAD_IDENTITY_PROVIDER",
        "subject_token_type": "urn:ietf:params:oauth:token-type:jwt",
        "token_url": "https://sts.REGION.rep.googleapis.com/v1/token",
        "credential_source": {
          "file": "$CI_BUILDS_DIR/.workload_identity.jwt"
        },
        "service_account_impersonation_url": "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/$SERVICE_ACCOUNT:generateAccessToken"
      }
      EOF
```

### Azure DevOps pipeline

Adapted (not in the official docs): the token is written with `printf '%s'`, expansions are quoted, and the verification step runs `gcloud auth list` instead of `gcloud auth print-access-token` so the access token is never printed to the pipeline log.

```yaml
variables:
- name: Azure.WorkloadIdentity.Connection
  value: CONNECTION
- name: GoogleCloud.WorkloadIdentity.ProjectNumber
  value: PROJECT_NUMBER
- name: GoogleCloud.WorkloadIdentity.Pool
  value: POOL_ID
- name: GoogleCloud.WorkloadIdentity.Provider
  value: PROVIDER_ID
- name: GoogleCloud.WorkloadIdentity.ServiceAccount
  value: SERVICE_ACCOUNT_EMAIL
- name: GOOGLE_APPLICATION_CREDENTIALS
  value: $(Pipeline.Workspace)/.workload_identity.wlconfig

steps:
  - task: AzureCLI@2
    inputs:
      connectedServiceNameARM: $(Azure.WorkloadIdentity.Connection)
      addSpnToEnvironment: true
      scriptType: 'bash'
      scriptLocation: 'inlineScript'
      inlineScript: |
        printf '%s' "${idToken}" > "$(Pipeline.Workspace)/.workload_identity.jwt"
        cat << EOF > "${GOOGLE_APPLICATION_CREDENTIALS}"
        {
          "type": "external_account",
          "audience": "//iam.googleapis.com/projects/$(GoogleCloud.WorkloadIdentity.ProjectNumber)/locations/global/workloadIdentityPools/$(GoogleCloud.WorkloadIdentity.Pool)/providers/$(GoogleCloud.WorkloadIdentity.Provider)",
          "subject_token_type": "urn:ietf:params:oauth:token-type:jwt",
          "token_url": "https://sts.REGION.rep.googleapis.com/v1/token",
          "credential_source": {
            "file": "$(Pipeline.Workspace)/.workload_identity.jwt"
          },
          "service_account_impersonation_url": "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/$(GoogleCloud.WorkloadIdentity.ServiceAccount):generateAccessToken"
        }
        EOF

  - task: Bash@3
    displayName: 'Verify Google Cloud authentication'
    inputs:
      targetType: 'inline'
      script: |
        gcloud auth login --cred-file="$(GOOGLE_APPLICATION_CREDENTIALS)"
        gcloud auth list
```

### HCP Terraform workspace variables

```text
TFC_GCP_PROVIDER_AUTH=true
TFC_GCP_RUN_SERVICE_ACCOUNT_EMAIL=terraform@my-project-123.iam.gserviceaccount.com
TFC_GCP_PROJECT_NUMBER=<project number of the pool project>
TFC_GCP_WORKLOAD_POOL_ID=<pool ID>
TFC_GCP_WORKLOAD_PROVIDER_ID=<provider ID>
```

```text
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.48.0"
    }
  }
}
```

## Options / Props

| Pipeline | Issuer URI | Useful claims |
|---|---|---|
| Azure DevOps | Service connection issuer; audience `fb60f99c-7a34-4190-8149-302f77469936` for new connections | `oid` (Entra object ID of the application) |
| GitHub Actions | `https://token.actions.githubusercontent.com/` | `sub`, `repository`, `repository_id`, `repository_owner`, `repository_owner_id`, `ref` |
| GitLab SaaS | `https://gitlab.com` | `sub` (e.g. `project_path:groupname/projectname:ref_type:branch:ref:main`), `namespace_id`, `project_id`, `user_id`, `environment`, `ref_path` |
| HCP Terraform | `https://app.terraform.io` | `terraform_organization_id`, `terraform_workspace_id`, `terraform_workspace_name`, `sub` |

| Credential configuration field | Value |
|---|---|
| `type` | `external_account` |
| `audience` | `//iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID` |
| `subject_token_type` | `urn:ietf:params:oauth:token-type:jwt` |
| `token_url` | `https://sts.REGION.rep.googleapis.com/v1/token` (regional) or `https://sts.googleapis.com/v1/token` |
| `service_account_impersonation_url` | `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/SERVICE_ACCOUNT_EMAIL:generateAccessToken`; omit with direct resource access |

## Notes

- Warning: GitHub, GitLab SaaS and HCP Terraform use one issuer URL for all organizations, and some claims are not unique to your organization. You must set an attribute condition limiting tokens to your GitHub organization, GitLab group, or HCP Terraform organization, and map every claim used in a condition.
- Prefer numeric `*_id` claims over names (`repository`, `repository_owner`): names can be re-claimed after deletion (cybersquatting / typosquatting).
- Setup is per Azure DevOps project, GitHub organization, GitLab group, or HCP Terraform organization; no account-side configuration for GitHub, GitLab, or HCP Terraform. `gcp-` is a reserved ID prefix.
- Grant access with direct resource access (`principal://` / `principalSet://` members) or service account impersonation (`roles/iam.workloadIdentityUser`) exactly as in the OIDC and SAML page; use the project number in member identifiers.
- Adapted from the official docs: token written with `printf '%s'` and quoted expansions; the Azure verification step uses `gcloud auth list` so the access token is not logged.
- Pin third-party actions such as `google-github-actions/auth` and `actions/checkout` to a full commit SHA rather than the mutable tag shown in the official sample (`@v1`, `@v3`) in production workflows.
- Source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [wif-oidc-saml-providers.md](./wif-oidc-saml-providers.md)
- [wif-troubleshooting.md](./wif-troubleshooting.md)
- gcp-security covers Secret Manager and IAP; gcp-cli covers gcloud generally.
