---
source: https://docs.cloud.google.com/secure-source-manager/docs/create-instance
---

# Create a Secure Source Manager instance

Secure Source Manager is a single-tenant service: one instance should only include users from one Google Cloud customer, unless multiple companies with a contractual relationship need to collaborate in a single instance. When working with multiple companies, create a separate instance for each company. Instance creation is a long-running operation that takes up to 60 minutes.

## Signature / Usage

### Create the service agent (first instance in a project)

If this is the first Secure Source Manager instance in the project, create the service agent manually, then grant `roles/securesourcemanager.serviceAgent` to `service-PROJECT-NUMBER@gcp-sa-sourcemanager.iam.gserviceaccount.com`, or instance creation fails.

```bash
gcloud beta services identity create \
    --service=securesourcemanager.googleapis.com \
    --project=PROJECT_ID
```

### Create an instance with the gcloud CLI

`--kms-key` is optional: include it for CMEK, omit it for Google default encryption.

```bash
gcloud source-manager instances create INSTANCE_ID \
    --region=LOCATION \
    --project=PROJECT_ID \
    --kms-key=projects/KEY_PROJECT/locations/KEY_LOCATION/keyRings/KEYRING_NAME/cryptoKeys/KEY
```

Note the `OPERATION_NAME` from the output (`projects/PROJECT/locations/LOCATION/operations/operation-...`), then check the operation:

```bash
gcloud source-manager operations describe OPERATION_NAME \
    --region=LOCATION
```

When `done` is `true`, `response.hostConfig.html` is the instance HTML URL (for example `test-098765432109.us-central1.sourcemanager.dev`); `hostConfig` also has `api` and `gitHttp`.

### Create an instance with the API

Adapted (not in the official docs): the request URL is quoted so the shell does not treat `?` as a glob character, and the query parameter and request body field use the camelCase names of the REST reference (`instanceId`, `kmsKey`) instead of `instance_id` and `kms_key`.

```bash
curl \
    -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://securesourcemanager.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/instances?instanceId=INSTANCE_ID" \
    -H "Content-Type: application/json" \
    -d '{ "kmsKey":"projects/KEY_PROJECT/locations/KEY_LOCATION/keyRings/KEYRING_NAME/cryptoKeys/KEY"}'
```

Check the operation with:

```bash
curl \
    -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    https://securesourcemanager.googleapis.com/v1/OPERATION_NAME
```

### Access the instance

Open this URL in a browser, then click **Allow** on the OAuth screen for `sourcemanager.dev`:

```text
INSTANCE_ID-PROJECT_NUMBER.LOCATION.sourcemanager.dev
```

## Options / Props

| Item | Value |
|------|-------|
| `INSTANCE_ID` | Permanent ID. Lowercase letters, numbers and hyphens only; must start with a letter; cannot be changed after creation. |
| `LOCATION` | Region of the instance (see the Locations page of the official docs). |
| CMEK key location | Must be in the same location as the instance; may be in a different project. |
| Time to create | Up to 60 minutes. |
| Instance creation role | `roles/securesourcemanager.instanceOwner` on the project (the basic `roles/owner` also contains the permissions; not for production). |
| Creating repositories later | `roles/securesourcemanager.repoCreator` on the instance project and `roles/securesourcemanager.instanceRepositoryCreator` on the instance. |
| Service agent role | `roles/securesourcemanager.serviceAgent` on `service-PROJECT-NUMBER@gcp-sa-sourcemanager.iam.gserviceaccount.com` (first instance in a project). |

## Notes

- Domain-scoped projects are not supported: if the project ID contains a colon (`:`), create a new project first.
- Secure Source Manager roles do not appear in the Google Cloud console until granted to a principal at least once (see [grant-iam-roles.md](./grant-iam-roles.md)).
- Do not store sensitive data in instance IDs or label key-value pairs; they are not encrypted with CMEK.
- The status check can report completion before the instance is fully operational. If errors persist, wait 60 minutes and retry before contacting Secure Source Manager Support.
- Corrected from the official docs: the page names the CMEK flag `-kms-key` in prose; the command and `gcloud source-manager instances create` help use `--kms-key`.
- Adapted from the official docs: the `curl` create command originally had the URL unquoted and used `instance_id` / `kms_key`; the REST reference (Discovery document) names them `instanceId` and `kmsKey`.
- The `gcloud source-manager instances create` help (gcloud 593.0.0) also lists `--enable-workforce-identity-federation`, `--is-private` with `--ca-pool` / `--psc-allowed-projects`, custom hostname flags and `--async` / `--max-wait`; the source page does not use them.
- The source also shows Terraform (`google_secure_source_manager_instance`) and the Console web interface.
- CMEK keys are in Cloud KMS (`gcp-security`); service agents and IAM are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/secure-source-manager/docs/create-instance (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [ssm-overview.md](./ssm-overview.md)
- [create-repository.md](./create-repository.md)
- [grant-iam-roles.md](./grant-iam-roles.md)
