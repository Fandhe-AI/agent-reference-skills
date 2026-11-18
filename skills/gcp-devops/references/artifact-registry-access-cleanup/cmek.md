---
source: https://docs.cloud.google.com/artifact-registry/docs/cmek
---

# Artifact Registry customer-managed encryption keys (CMEK)

By default Artifact Registry encrypts content at rest with Google default encryption. With CMEK you encrypt a repository with a Cloud KMS key (manual, Cloud KMS Autokey, or an external key via Cloud External Key Manager) and control rotation, location, access and lifecycle. The key is assigned when the repository is created.

## Signature / Usage

### Create the Artifact Registry service account (if no repository exists in the project yet)

```bash
gcloud beta services identity create --service=artifactregistry.googleapis.com --project=PROJECT
```

### Grant the key to the Artifact Registry service account

Adapted (not in the official docs): removed the square brackets around `--project=PROJECT` (invalid in bash); the flags are unchanged.

```bash
gcloud kms keys add-iam-policy-binding KEY \
       --project=PROJECT \
       --location LOCATION --keyring=KEYRING \
       --member serviceAccount:service-PROJECT-NUMBER@gcp-sa-artifactregistry.iam.gserviceaccount.com \
       --role roles/cloudkms.cryptoKeyEncrypterDecrypter
```

Repeat the grant for the account that will create repositories. Then create the repository and specify the key.

## Options / Props

### Placeholders

| Name | Description |
|---|---|
| `PROJECT` | ID of the project that contains the key (for the first command: the project where Artifact Registry is running). |
| `KEY` | Key name. |
| `LOCATION` | Key location; must match the repository location of the repository you will encrypt. |
| `KEYRING` | Key ring name. |
| `PROJECT-NUMBER` | Project number of the project running Artifact Registry. |

### Autokey required roles (on the folder or project)

| Role | ID |
|---|---|
| Cloud KMS Autokey User | `roles/cloudkms.autokeyUser` |
| Artifact Registry Admin | `roles/artifactregistry.admin` |

### Organization policy constraints

| Constraint | Effect |
|---|---|
| `constraints/gcp.restrictNonCmekServices` | When the Artifact Registry API is in the `Deny` list, Artifact Registry refuses to create repositories that are not CMEK-protected. |
| `constraints/gcp.restrictCmekCryptoKeyProjects` | Artifact Registry creates CMEK repositories only with a CryptoKey from an allowed project, folder or organization. |

## Notes

- CMEK is chosen at repository creation. You cannot change the encryption mechanism of an existing repository, move a CMEK repository to Google-owned encryption, or assign a different Cloud KMS key.
- The key can be a Cloud KMS key or an external key (Cloud External Key Manager). Enable the Cloud KMS API in the key project, create a key ring and key; the key location must match the repository location.
- Autokey: key rings and keys are generated on demand in the same location as the repository, and service agents are created and granted the roles. Enable Cloud KMS Autokey first; in the console create the repository and choose **Cloud KMS with Autokey automated management** in the Encryption section.
- Service account format: `service-PROJECT-NUMBER@gcp-sa-artifactregistry.iam.gserviceaccount.com`.
- Irreversible / destructive: revoking the CryptoKey Encrypter/Decrypter role from the Artifact Registry service account, disabling the key, or destroying the key makes all artifact data (artifacts, blobs, manifests such as a Docker manifest or npm packument) inaccessible. Readers / Viewers (`roles/artifactregistry.reader`, `roles/artifactregistry.viewer`) can still see metadata (name, version, tag); `roles/artifactregistry.admin` or `roles/owner` can delete the repository. The source recommends revoking the service account's permission before disabling or destroying a key (permission changes are consistent within seconds, so you can observe the impact). Try this on a disposable project first.
- When you activate the Artifact Registry API, it tries to create a Pub/Sub topic with ID `gcr` using Google-owned keys. If Pub/Sub is in the `Deny` list of `constraints/gcp.restrictNonCmekServices`, Pub/Sub will not create it and you must create the `gcr` topic with CMEK yourself.
- Key creation and KMS details are covered by the `gcp-security` skill (Cloud KMS).
- Omitted from the source: Console steps.
- Source: https://docs.cloud.google.com/artifact-registry/docs/cmek (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source writes `gcloud kms keys add-iam-policy-binding [--project=PROJECT] \ KEY ...`; the brackets were removed so the command is valid shell.
- `gcloud beta services identity create` exists only in the beta track in gcloud 593.0.0 help.

## Related

- [access-control.md](./access-control.md)
- [protect-artifacts.md](./protect-artifacts.md)
