---
source: https://docs.cloud.google.com/run/docs/configuring/services/secrets
---

# Use Secret Manager Secrets as Environment Variables and Mounted Files

Expose Secret Manager secrets to a Cloud Run service as an environment variable or as a file, update them, and remove them, with the service running as a service account that may read the secrets.

## Signature / Usage

Enable the Secret Manager API first. `SERVICE` and `SERVICE_NAME` are the same service name; each block keeps the placeholder of its source page.

### 1. Run the service as a dedicated service account

The service identity needs Secret Manager Secret Accessor (`roles/secretmanager.secretAccessor`) on the secrets; grant it to this user-managed service account. The deployer needs `roles/iam.serviceAccountUser` on it.

```bash
gcloud run services update SERVICE_NAME --service-account SERVICE_ACCOUNT
```

### 2. Expose a secret as an environment variable

`VERSION` is `latest` or a number such as `2`.

```bash
gcloud run deploy SERVICE \
--image IMAGE_URL \
--update-secrets=ENV_VAR_NAME=SECRET_NAME:VERSION
```

### 3. Mount a secret as a file

`PATH` is the mount path plus filename and starts with a slash, for example `/etc/secrets/dbconfig/password`.

```bash
gcloud run deploy SERVICE --image IMAGE_URL  \
--update-secrets=PATH=SECRET_NAME:VERSION
```

### 4. Update several secrets at once

```bash
gcloud run deploy SERVICE --image IMAGE_URL \
--update-secrets=PATH=SECRET_NAME:VERSION,ENV_VAR_NAME=SECRET_NAME:VERSION
```

### 5. Use a secret from another project

The resource ID uses the project number.

```bash
gcloud run deploy SERVICE --image IMAGE_URL  \
--update-secrets=PATH=projects/PROJECT_NUMBER/secrets/SECRET_NAME:VERSION
```

### 6. Or edit the exported YAML and replace the service

`services replace` replaces the whole service configuration with the file, so start from the existing service's exported configuration rather than a hand-written file:

```bash
gcloud run services describe SERVICE --format export > service.yaml
```

In `service.yaml`, under `spec.template.spec.containers[].env`, add or update an entry with `name: ENV_VAR` and `valueFrom.secretKeyRef` set to `key: VERSION` and `name: SECRET_NAME` (`ENV_VAR` is the `ENV_VAR_NAME` of steps 2, 4 and 7). Quote a numeric version (`key: '2'`) so it stays a string; `key: latest` needs no quotes. Leave the rest of the exported file, including the service account and the secret `volumes` / `volumeMounts`, in place. For `spec.template.metadata.name` (`REVISION`), set a new revision name or delete it (if present); a new name must start with `SERVICE-`, contain only lowercase letters, numbers and `-`, not end with `-`, and not exceed 63 characters. Then replace the service:

```bash
gcloud run services replace service.yaml
```

### 7. Remove secrets and check the result

```bash
gcloud run deploy SERVICE --image IMAGE_URL \
--remove-secrets=ENV_VAR_NAME,SECRET_FILE_PATH
```

```bash
gcloud run services describe SERVICE
```

## Options / Props

| Flag | Effect |
|---|---|
| `--update-secrets` | Add or update the listed secrets |
| `--set-secrets` | Replace all secrets with the listed ones |
| `--remove-secrets` | Remove the named secrets |
| `--clear-secrets` | Remove all secrets |

Limitations: no mounts at `/dev`, `/proc`, `/sys` or their subdirectories; two secrets cannot share a mount path; regional secrets are not supported; if the last directory of the mount path already exists its contents become inaccessible, so mount into a new directory such as `/etc/app_data/secrets`.

## Notes

- Volume mounts fetch the secret value from Secret Manager at read time, so a volume that references `latest` picks up new versions (suited to rotation); a volume that references a pinned version number serves that version. Environment variables are resolved at instance startup, so pin a specific version instead of `latest`; if env var retrieval fails the instance does not start.
- Prefer Secret Manager (`--update-secrets` / `--set-secrets`) over plain `--set-env-vars` for sensitive values. Grant `secretAccessor` to a dedicated user-managed service account, not the Compute Engine default service account.
- Any configuration change creates a new revision. At deployment Cloud Run checks that the service account can access every secret.
- `gcloud run services replace` replaces the existing service configuration with the one in the YAML file. A hand-written minimal YAML (for example the source's `env`-only snippet) drops the service account and the secret volumes set in steps 1 to 5; always edit the exported file. Settings changed with the console or other gcloud commands can be overwritten by a later YAML replace.
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails.
- Source: https://docs.cloud.google.com/run/docs/configuring/services/secrets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/deploying (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/troubleshooting (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-service-from-source.md](./deploy-service-from-source.md)
- [deploy-image-from-artifact-registry.md](./deploy-image-from-artifact-registry.md)
- Secret Manager best practices: https://docs.cloud.google.com/secret-manager/docs/best-practices
