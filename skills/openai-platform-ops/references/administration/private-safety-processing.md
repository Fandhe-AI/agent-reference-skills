# ZDR with Private Safety Processing

Zero Data Retention with Private Safety Processing (ZDR with PSP) enables offline, automated safety review without OpenAI retaining customer prompts or responses. Encrypted safety records live in customer-controlled storage (AWS S3, Azure Blob, or Google Cloud Storage) connected per project.

## Signature / Usage

Register external storage with the Management API (organization Admin API key), then validate it. AWS example:

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
- Validation writes test objects named `csg_validation_<hex suffix>` (no customer content) and attempts an unauthenticated `GET` to check for public access; for AWS it also tests `AssumeRole` without an external ID and with `proj_smoketest-verifier`, both expected to return `AccessDenied`. Do not weaken the trust policy to make probes succeed.
- Refresh reloads saved status and does not rerun validation. Disconnecting the last storage connection resets the project to the organization default retention policy and may make PSP-required models unavailable; it does not delete cloud storage contents.
- Customer responsibilities: register and validate storage per project and residency location, retain encrypted records at least 30 days, maintain storage and key access, repair configuration issues after notification, respond to safety-concern notices.
- Source: https://developers.openai.com/api/docs/guides/private-safety-processing (fetched 2026-10-17).
- Dated onboarding video: psp-onboarding-2026-10-07 (AWS walkthrough).

## Related

- [Admin API Keys](./admin-api-keys.md)
- [Projects](./projects.md)
