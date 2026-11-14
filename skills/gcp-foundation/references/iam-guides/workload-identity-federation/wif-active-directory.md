---
source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-active-directory
---

# Workload Identity Federation with Active Directory (AD FS)

Let Windows workloads exchange Active Directory credentials (via AD FS and integrated Windows authentication) for short-lived Google Cloud credentials, using OIDC, SAML-POST, or WS-Trust and the Workload Authenticator for Windows.

## Signature / Usage

Flow: (1) the workload gets an OIDC token or SAML assertion from AD FS using IWA; (2) Workload Identity Federation exchanges it for an STS token and optionally impersonates a service account.

### AD FS relying party identifier

```
https://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/WORKLOAD_POOL_ID/providers/WORKLOAD_PROVIDER_ID
```

SAML 2.0 SSO service URL for the relying party trust:

```
https://sts.googleapis.com/v1/token
```

### Attribute mappings and conditions

OIDC (authenticate an application by its client ID):

```
google.subject=assertion.appid
```

```
assertion.authmethod=='http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows'
```

SAML / WS-Trust:

```
google.subject=assertion.subject
```

```
google.groups=assertion.attributes['http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid']
```

```
"S-1-5-6" in google.groups
```

### Pool and provider

```
gcloud iam workload-identity-pools create WORKLOAD_POOL_ID \
    --location="global" \
    --description="DESCRIPTION" \
    --display-name="DISPLAY_NAME"
```

OIDC provider:

```
gcloud iam workload-identity-pools providers create-oidc WORKLOAD_PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="WORKLOAD_POOL_ID" \
    --issuer-uri="https://ADFS_DOMAIN/adfs" \
    --allowed-audiences="RELYING_PARTY_ID" \
    --attribute-mapping="MAPPINGS" \
    --attribute-condition="CONDITIONS"
```

SAML / WS-Trust provider:

```
curl -O https://ADFS_DOMAIN/federationmetadata/2007-06/federationmetadata.xml

gcloud iam workload-identity-pools providers create-saml WORKLOAD_PROVIDER_ID \
    --location="global" \
    --workload-identity-pool="POOL_ID" \
    --idp-metadata-path="federationmetadata.xml" \
    --attribute-mapping="MAPPINGS" \
    --attribute-condition="CONDITIONS"
```

### Optional: SAML assertion encryption

```bash
gcloud iam workload-identity-pools providers keys create KEY_ID \
    --workload-identity-pool WORKLOAD_POOL_ID \
    --provider WORKLOAD_PROVIDER_ID \
    --location global \
    --use encryption \
    --spec KEY_SPECIFICATION
```

```bash
gcloud iam workload-identity-pools providers keys describe KEY_ID \
    --workload-identity-pool WORKLOAD_POOL_ID \
    --provider WORKLOAD_PROVIDER_ID \
    --location global \
    --format "value(keyData.key)" \
    > CERTIFICATE_PATH
```

Move the certificate to the AD FS server and, in an elevated PowerShell:

```
Set-AdfsRelyingPartyTrust `
  -TargetName NAME `
  -SamlResponseSignature MessageAndAssertion `
  -EncryptionCertificate PATH `
  -EncryptClaims $True
```

```bash
gcloud iam workload-identity-pools providers keys delete KEY_ID \
    --workload-identity-pool WORKLOAD_POOL_ID \
    --provider WORKLOAD_PROVIDER_ID \
    --location global
```

### Grant access

Direct resource access and service account impersonation use the same commands as the grant-access page, for example:

```
gcloud storage buckets add-iam-policy-binding BUCKET_ID \
    --role=roles/storage.objectViewer \
    --member="principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT"
```

```
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_EMAIL \
    --role=roles/iam.workloadIdentityUser \
    --member="principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT"
```

### Credential configuration with Workload Authenticator for Windows

Download and launch `wwauth.exe` in PowerShell:

```
(New-Object Net.WebClient).DownloadFile(
  "https://github.com/GoogleCloudPlatform/iam-windows-authenticator/releases/latest/download/wwauth.exe",
  "${env:ProgramData}\wwauth.exe")
```

```
& ${env:ProgramData}\wwauth.exe
```

In the **AD FS** tab set Issuer URI `https://ADFS_DOMAIN/adfs/` and protocol (`AdfsOidc` with the server application Client ID; `AdfsSamlPost` with assertion consumer service URL `https://sts.googleapis.com/v1/token` and **Sign requests using certificate** disabled; or `AdfsWsTrust`). In the **Workload identity** tab set project number, pool ID, provider ID, and optionally the service account to impersonate. Click **Apply** to save the config file, then **Test**.

System environment variables for workloads:

| Name | Value |
|---|---|
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to the credential configuration file |
| `GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES` | `1` |

```
gcloud auth login --cred-file=FILEPATH.json
```

## Options / Props

| Name | Description |
|------|-------------|
| `ADFS_DOMAIN` | Public domain name of the AD FS server or farm. |
| `RELYING_PARTY_ID` | Relying party identifier of the Web API app; needed for `--allowed-audiences` only with a custom identifier. |
| `WORKLOAD_POOL_ID` / `WORKLOAD_PROVIDER_ID` | IDs you choose; must match those used in the relying party identifier. Prefix `gcp-` is reserved. |
| `KEY_SPECIFICATION` | `rsa-2048`, `rsa-3072`, `rsa-4096`. |
| Protocol requirements | SAML / WS-Trust: AD FS 3.0, AD FS for Windows Server 2016 or newer. OIDC: AD FS for Windows Server 2016 or newer. |
| Minimum tool versions | gcloud CLI 363.0.0 (bq: 390.0.0); C++ client v2.6.0 with gRPC 1.36.0; Go `golang.org/x/oauth2` v0.0.0-20210218202405-ba52d332ba99; Java `google-auth-library-oauth2-http` 0.24.0; Node.js `google-auth-library` 7.0.2; Python `google-auth` 1.27.0; Terraform Google provider 3.61.0. |

## Notes

- OIDC uses the `client_credentials` grant and returns only an access token (no ID token), so it carries no AD user or group information; SAML / WS-Trust is more flexible. Encrypted assertions are available only with SAML.
- AD FS setup: register a server application client (enable Windows Integrated Authentication, run as the workload's domain user) and a Web API application (OIDC), or a claims-aware relying party trust (SAML / WS-Trust). SAML assertions must contain at least one claim uniquely identifying the AD user, typically Name ID via a transform claim rule (outgoing format Unspecified, incoming Primary SID or UPN). Use AD FS client permissions, not attribute conditions, to control which OIDC applications may obtain credentials.
- Prerequisites for IWA: AD FS configured for Windows authentication with the right SPN, and extended protection for authentication compatible with the deployment. The IdP must return signed authentication information.
- Use a dedicated project for pools and providers; roles needed: `roles/iam.workloadIdentityPoolAdmin` and `roles/iam.serviceAccountAdmin`. Enable the IAM, Resource Manager, Service Account Credentials, and STS APIs.
- The credential configuration file contains no secrets, but it stores the path of `wwauth.exe`; moving or deleting the executable breaks workloads. Prefer a regional STS endpoint in the config. Workload Authenticator downloads an executable from GitHub; verify it before running it on production servers.
- The source SAML provider example (`--attribute-mapping=google.subject=assertion.subject"` with an unbalanced quote) and the `attribute.userip=['http://schemas.microsoft.com/2014/09/requestcontext/claims/userip'][0]` mapping (missing `assertion.attributes`) are malformed and are not reproduced; build mappings from the verified patterns above.
- Source: https://docs.cloud.google.com/iam/docs/workload-identity-federation-with-active-directory (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Grant access and download credential config](./wif-grant-access-and-download-config.md)
- [OIDC and SAML providers](./wif-oidc-saml-providers.md)
