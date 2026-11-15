---
source: https://docs.cloud.google.com/run/docs/configuring/services/secrets
---

# Configure secrets for services

Make Secret Manager secrets available to a Cloud Run service as environment variables or as files in a mounted volume. Google recommends storing API keys, passwords, certificates, and other sensitive values in Secret Manager.

## Signature / Usage

### Mount a secret as a volume

```bash
gcloud run deploy SERVICE --image IMAGE_URL  \
--update-secrets=PATH=SECRET_NAME:VERSION
```

`PATH` is the mount path plus filename and must start with a leading slash, for example `/etc/secrets/dbconfig/password` (mount path `/etc/secrets/dbconfig/`, filename `password`). `VERSION` is `latest` or a number such as `2`.

### Expose a secret as an environment variable

```bash
gcloud run deploy SERVICE \
--image IMAGE_URL \
--update-secrets=ENV_VAR_NAME=SECRET_NAME:VERSION
```

### Update several secrets at once

```bash
gcloud run deploy SERVICE --image IMAGE_URL \
--update-secrets=PATH=SECRET_NAME:VERSION,ENV_VAR_NAME=SECRET_NAME:VERSION
```

### Replace all secrets

```bash
gcloud run services update SERVICE \
--set-secrets="ENV_VAR_NAME=SECRET_NAME:VERSION"
```

### YAML: environment variable

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    metadata:
      name: REVISION
    spec:
      containers:
      - image: IMAGE_URL
        env:
        - name: ENV_VAR
          valueFrom:
            secretKeyRef:
              key: VERSION
              name: SECRET_NAME
```

### YAML: mounted file

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    metadata:
      name: REVISION
    spec:
      containers:
      - image: IMAGE_URL
        volumeMounts:
        - mountPath: MOUNT_PATH
          name: VOLUME_NAME
      volumes:
      - name: VOLUME_NAME
        secret:
          items:
          - key: VERSION
            path: FILENAME
          secretName: SECRET_NAME
```

In both YAML forms, quote a numeric version so it stays a string, for example `key: '2'`; an unquoted `key: 2` is a YAML integer and `gcloud run services replace` rejects it. `key: latest` needs no quotes.

Apply with `gcloud run services replace service.yaml` (download the current config with `gcloud run services describe SERVICE --format export > service.yaml`).

### Reference a secret from another project

```bash
gcloud run deploy SERVICE --image IMAGE_URL  \
--update-secrets=PATH=projects/PROJECT_NUMBER/secrets/SECRET_NAME:VERSION
```

In YAML, the secret location goes in an annotation: `run.googleapis.com/secrets: SECRET_LOOKUP_NAME:projects/PROJECT_NUMBER/secrets/SECRET_NAME`, and `secretKeyRef.name` / `secretName` use `SECRET_LOOKUP_NAME`.

### Remove secrets

```bash
gcloud run deploy SERVICE --image IMAGE_URL \
--clear-secrets
```

```bash
gcloud run deploy SERVICE --image IMAGE_URL \
--remove-secrets=ENV_VAR_NAME,SECRET_FILE_PATH
```

### View secret settings

```bash
gcloud run services describe SERVICE
```

## Options / Props

| Item | Value |
|---|---|
| Required deployer roles | Cloud Run Admin (`roles/run.admin`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity |
| Required service identity role | Secret Manager Secret Accessor (`roles/secretmanager.secretAccessor`) |
| Enable API | Secret Manager API (needs `serviceusage.services.enable`, for example via `roles/serviceusage.serviceUsageAdmin`) |
| `--update-secrets` / `--set-secrets` / `--remove-secrets` / `--clear-secrets` | Add or update, replace all, remove named, remove all |
| Volume owner (gen1, single container) | The identity used for the container |
| Volume owner (all other cases) | root (gen1 multi-container, and gen2) |

Limitations:

- Secrets cannot be mounted at `/dev`, `/proc`, `/sys`, or their subdirectories.
- Mounting on `/tmp` in the first generation execution environment has a known issue.
- Two secrets cannot be mounted at the same path.
- Regional secrets are not supported.
- If the last directory of the mount path already exists, its existing contents become inaccessible (for example `/etc/app_data` shows only `/etc/app_data/my-secret`); mount into a new directory such as `/etc/app_data/secrets`.

## Notes

- Volume mounts fetch the secret value from Secret Manager at read time (the source: "to use the value with the latest version"), so a volume that references `latest` picks up new versions and suits secret rotation; a volume that references a pinned version number serves that version. Environment variables are resolved at instance startup, so Google recommends pinning to a specific version instead of `latest`. If env var retrieval fails, the instance doesn't start; for volumes, no startup check is made and reads fail if the secret is inaccessible.
- At deployment, Cloud Run checks that the service account running the container can access every secret.
- Any configuration change creates a new revision.
- For secrets in another project, the secret resource ID uses the project number: `projects/PROJECT_NUMBER/secrets/SECRET_NAME`. Keep `PROJECT_NUMBER` as written (not project ID).
- Prefer Secret Manager (`--set-secrets` / `--update-secrets`) over plain `--set-env-vars` for sensitive values. Grant `secretAccessor` to a dedicated user-managed service account, not the Compute Engine default service account.
- Grant `roles/secretmanager.secretAccessor` on each secret the service uses rather than on the project, since a project-level grant can read every secret in the project (https://docs.cloud.google.com/secret-manager/docs/manage-access-to-secrets).
- The source also shows Console, Terraform, and `gcloud run compose up` (`compose.yaml` `secrets:`) forms; these are not reproduced.
- The revision name in the template (`spec.template.metadata.name`, `REVISION` in the YAML above) must be new and unique for each change, or remove the line; revision names are immutable, so reusing an existing revision name with a changed configuration is rejected.
- Source: https://docs.cloud.google.com/run/docs/configuring/services/secrets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-identity.md](./service-identity.md)
- [security.md](./security.md)
- Secret Manager best practices: https://docs.cloud.google.com/secret-manager/docs/best-practices
