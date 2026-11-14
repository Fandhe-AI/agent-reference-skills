# ZDR with Private Safety Processing

Zero Data Retention with Private Safety Processing (ZDR with PSP) enables offline, automated safety review without OpenAI retaining customer prompts or responses. Encrypted safety records live in customer-controlled storage (AWS S3, Azure Blob, Google Cloud Storage, or Oracle Cloud Infrastructure (OCI) Object Storage) connected per project.

## Signature / Usage

Register external storage with the Management API (organization Admin API key), then validate it. Set the project's base retention policy first (`zero_data_retention` or `modified_abuse_monitoring`); the selected policy stays active after PSP is enabled:

```bash
curl --fail-with-body -sS -X POST \
  "$OPENAI_API_BASE/v1/organization/projects/CUSTOMER_PROJECT_ID/data_retention" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID" \
  -H 'Content-Type: application/json' \
  --data-binary '{"retention_type":"zero_data_retention"}'
```

AWS registration example:

```bash
OPENAI_API_BASE='<OPENAI_API_BASE>'
OPENAI_ORG_ID='<OPENAI_ORG_ID>'
OPENAI_STORAGE_URL="$OPENAI_API_BASE/v1/organization/external_storage"

curl --fail-with-body -sS -X POST "$OPENAI_STORAGE_URL" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID" \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "project_id": "CUSTOMER_PROJECT_ID",
    "provider": {
      "type": "aws",
      "bucket": "CUSTOMER_BUCKET_ARN",
      "role_arn": "CUSTOMER_ROLE_ARN"
    }
  }'
```

OCI Object Storage registration:

```bash
curl --fail-with-body -sS -X POST "$OPENAI_STORAGE_URL" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID" \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "project_id": "CUSTOMER_PROJECT_ID",
    "provider": {
      "type": "oci",
      "tenancy_ocid": "CUSTOMER_TENANCY_OCID",
      "region": "CUSTOMER_OCI_REGION",
      "bucket": "CUSTOMER_BUCKET_NAME"
    }
  }'
```

Validate the registration:

```bash
EXTERNAL_STORAGE_ID='<EXTERNAL_STORAGE_ID>'
curl --fail-with-body -sS -X POST \
  "$OPENAI_STORAGE_URL/$EXTERNAL_STORAGE_ID/validate" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID"
```

## Options / Props

`provider` object fields by `type`:

| type | Fields |
|------|--------|
| `aws` | `bucket` (bucket ARN), `role_arn` |
| `azure` | `tenant_id`, `subscription_id`, `resource_group`, `account_name`, `container` |
| `gcp` | `bucket`, `workload_identity_project_number`, `workload_identity_pool_id`, `workload_identity_provider_id` |
| `oci` | `tenancy_ocid`, `region` (region identifier such as `us-ashburn-1`, not a URL), `bucket` (bucket name, not its OCID or URL) |

Endpoints: `OPENAI_API_BASE` is `https://api.openai.com` (global), `https://us.api.openai.com` (US), or `https://eu.api.openai.com` (Europe).

Storage status:

| Status | Meaning |
|--------|---------|
| `pending` (Pending validation) | Registered but not validated; project retention policy unchanged. |
| `validated` (Validated) | Passed a validation check; does not guarantee live connectivity. |
| `unhealthy` (Needs attention) | A check found a problem; fix and validate again. |

Common errors:

| Error | Action |
|-------|--------|
| `customer_managed_retention_not_enabled` | Ask your onboarding contact to confirm organization access. |
| `401 customer_storage_not_ready` | Check validated storage exists for the project's geography. |
| `incorrect_hostname` | Use the hostname matching the fixed-residency project. |
| `503 external_storage_validation_unavailable` | Retry later; contact support if it persists. |

## Notes

- Three principles: customers control their content; no human review (decryption only in a hardware-attested Safety Review Runtime, only bounded safety signals and operational metadata leave in plaintext); content retention for safety only (no training).
- Records are doubly encrypted: OpenAI-managed HPKE inner layer plus optional customer-managed Enterprise Key Management (EKM) outer layer. Revoking EKM authorization prevents decryption but does not delete records.
- Enabled per project; once enabled the PSP policy applies to all API traffic in that project, including models that do not otherwise require PSP. Use a separate project for ZDR without PSP.
- Registration alone does not change the policy; validation activates customer-managed retention. Organization administrators register/validate; a project inference key does not work for Management API calls.
- Retention: storage lifecycle rules must retain PSP records at least 30 days (AWS rule `psp-retention`, prefix `openai/`, expire after 30 days; Azure delete after 30 days since last modification with no prefix/tag filter; GCS Delete object rule, prefix `openai/`, age 30). Records are written with a TTL of 30 days.
- AWS: dedicated bucket with ACLs disabled and Block all Public Access; IAM role trust policy principal `arn:aws:iam::790389265272:role/CustomerStorage` with `sts:ExternalId` equal to your OpenAI project ID. Bucket policy actions: `s3:GetLifecycleConfiguration` on the bucket and `s3:GetObject` / `s3:PutObject` / `s3:DeleteObject` on `bucket/*`. If Data Residency is off, recommended region is us-west-1. AWS "Sign up for AWS (new)" accounts have a default RCP that blocks cross-account role assumption and must be updated.
- Azure: `StorageV2`, Standard, LRS/ZRS, Hot, hierarchical namespace disabled, storage account key access disabled, Entra authorization enabled, TLS 1.2+. Container metadata `openai_organization_id`. Add OpenAI's application (`az ad sp create --id e5627955-3059-4a88-89f8-73843190624d`) and assign Reader and Storage Blob Data Contributor to `CSG - Azure Blob Storage Prod`. Do not create storage keys, SAS tokens, or client secrets.
- GCP: Public access prevention On, Uniform access control; OIDC provider with issuer `https://accounts.google.com`, allowed audience = OpenAI project ID, attribute condition `assertion.sub == '112981926705442324573' && assertion.aud == '<CUSTOMER_PROJECT_ID>'`; custom role with `storage.buckets.get`, `storage.objects.create`, `storage.objects.get`, `storage.objects.delete`.
- OCI Object Storage: dedicated bucket with Standard storage tier (automatic tiering disabled), Private visibility, object versioning disabled, replication disabled, in a commercial region matching the project's geography (US: `us-ashburn-1`, `us-chicago-1`, `us-phoenix-1`, `us-sanjose-1`; EU: `eu-amsterdam-1`, `eu-frankfurt-1`, `eu-madrid-1`, `eu-madrid-3`, `eu-marseille-1`, `eu-milan-1`, `eu-paris-1`, `eu-stockholm-1`, `eu-turin-1`, `eu-zurich-1`). Freeform bucket tags `openai_organization_id` and `openai_project_id` bind the bucket to one organization and project. Create the tenancy-root policy `psp-storage-access` (statements defined in the official page, including `Define tenancy OpenAICSG` / `Define group OpenAICSGProduction` and an `Allow service objectstorage-<region>` statement so Oracle's regional service can delete expired objects), and a lifecycle rule `psp-retention` (target Objects, action Delete, 30 days, enabled, include-by-prefix `openai/CUSTOMER_ORG_ID/CUSTOMER_PROJECT_ID/` with the trailing slash). OpenAI manages its credentials; no API signing key or access key is shared. Keep the OCID values for OpenAI's tenancy and group exactly as the official page gives them (not reproduced here).
- Base retention policy: PSP can be used with Zero Data Retention or Modified Abuse Monitoring (MAM). Set the base policy (`zero_data_retention` / `modified_abuse_monitoring`) before registering storage; successful validation enables PSP while keeping the selected base policy (shown as, for example, "Modified Abuse Monitoring with Private Safety Processing").
- PSP decryption (separate from EKM): lets you decrypt PSP records in your connected storage with an asymmetric key you control; the private key stays in your KMS. Key setup covers AWS KMS, Azure Key Vault, Google Cloud KMS, and OCI Vault (see the official asymmetric keys guide); registering a key does not enable PSP or configure storage, and existing records aren't converted.
- Validation writes test objects named `csg_validation_<hex suffix>` (no customer content) and attempts an unauthenticated `GET` to check for public access; for AWS it also tests `AssumeRole` without an external ID and with `proj_smoketest-verifier`, both expected to return `AccessDenied`. Do not weaken the trust policy to make probes succeed.
- Refresh reloads saved status and does not rerun validation. Disconnecting the last storage connection of a ZDR with PSP project resets the project to the organization default retention policy (if other connections remain the policy is unchanged) and may make PSP-required models unavailable; it does not delete cloud storage contents.
- Customer responsibilities: register and validate storage per project and residency location, retain encrypted records at least 30 days, maintain storage and key access, repair configuration issues after notification, respond to safety-concern notices.
- Source: https://developers.openai.com/api/docs/guides/private-safety-processing (fetched 2026-10-17; OCI Object Storage, Modified Abuse Monitoring base policy and PSP decryption added from the page re-fetched 2026-11-14).
- Dated onboarding video: psp-onboarding-2026-10-07 (AWS walkthrough).

## Related

- [Admin API Keys](./admin-api-keys.md)
- [Projects](./projects.md)
