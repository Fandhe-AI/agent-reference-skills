---
source: https://docs.cloud.google.com/infrastructure-manager/docs/upload-terraform-configuration
---

# Upload a Terraform configuration to Cloud Storage

Store a Terraform configuration in a Cloud Storage bucket to control access to it. For configurations that need no access control the source suggests a public Git repository.

## Signature / Usage

### Steps

1. Ensure Infra Manager is enabled and identify the configuration to upload.
2. Create or identify a bucket in any project and location (commonly the project and location where Infra Manager runs).
3. If the bucket is in a different project, grant the Infra Manager service account read permission on it.
4. Recommended: enable Object Versioning on the bucket.
5. Upload the configuration with a method from the Cloud Storage uploads page.

### Deploy the uploaded configuration

Adapted (not in the official docs): a `\` is added after `--annotations="ANNOTATION_KEY=ANNOTATION_VALUE"` so the last line `--provider-source=SERVICE_MAINTAINED` is part of the same command.

```bash
gcloud infra-manager deployments apply projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID \
        --service-account projects/SERVICE_ACCOUNT_PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT \
        --gcs-source gs://BUCKET_NAME/OBJECT_NAME \
        --quota-validation=QUOTA_VALIDATION \
        --input-values=INPUT_1_NAME=VALUE,INPUT_2_NAME=VALUE \
        --tf-version-constraint=TERRAFORM_VERSION \
        --annotations="ANNOTATION_KEY=ANNOTATION_VALUE" \
        --provider-source=SERVICE_MAINTAINED
```

## Options / Props

| Item | Detail |
|---|---|
| Bucket location | Any project and location |
| Cross-project read | Service account needs read permission; same-project buckets are already readable with `roles/config.agent` |
| Object Versioning | Recommended to track changes to the configuration |

## Notes

- Snippet taken from https://docs.cloud.google.com/infrastructure-manager/docs/deploy-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0); the source page itself has no code block. Cloud Storage is in `gcp-storage`.
- Corrected from the official docs: the source command ends with `--annotations="ANNOTATION_KEY=ANNOTATION_VALUE"` followed by a separate line `--provider-source=SERVICE_MAINTAINED` without a `\` continuation, so the shell would run that line as a separate command; a `\` was added after `--annotations`.
- `--provider-source` is accepted by gcloud 593.0.0 (values `PROVIDER_SOURCE_UNSPECIFIED`, `SERVICE_MAINTAINED`) but is not listed in its help text; the REST field is `providerConfig.sourceType` (Discovery document `config.v1`: `PROVIDER_SOURCE_UNSPECIFIED` "Unspecified source type, default to public sources.", `SERVICE_MAINTAINED` "Service maintained provider source type.").
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/upload-terraform-configuration (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-resources.md](./deploy-resources.md)
- [configure-service-account.md](./configure-service-account.md)
