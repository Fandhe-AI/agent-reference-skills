---
source: https://docs.cloud.google.com/run/docs/configuring/services/environment-variables
---

# Configure environment variables for services

Set, update, view and delete environment variables on a Cloud Run service. Environment variables are bound to a specific service revision and are not visible to other services in the project.

## Signature / Usage

### Set variables at deploy time

```bash
gcloud run deploy SERVICE --image IMAGE_URL --set-env-vars KEY1=VALUE1,KEY2=VALUE2
```

### Set variables in YAML

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
      - image: IMAGE
        env:
        - name: KEY-1
          value: VALUE-1
        - name: KEY-N
          value: VALUE-N
```

Export with `gcloud run services describe SERVICE --format export > service.yaml`; apply with `gcloud run services replace service.yaml`.

### Multiple variables from a file

`.env` file:

```text
KEY-1=VALUE-1
KEY-2=VALUE-2
KEY-3=VALUE-3
```

YAML file:

```yaml
KEY-1: VALUE-1
KEY-2: VALUE-2
KEY-3: VALUE-3
```

```bash
gcloud run deploy SERVICE --image=IMAGE_URL --env-vars-file=ENV_FILE_PATH
```

Repeat the flag when values do not fit the `KEY=VALUE,KEY=VALUE` form:

Adapted (not in the official docs): the source's `[...]` placeholder line (a glob bracket expression in bash) is replaced with the start of a `gcloud run deploy` command.

```bash
   gcloud run deploy SERVICE --image IMAGE_URL \
   --set-env-vars "KEY1=VALUE1" \
   --set-env-vars "KEY2=VALUE2" \
   --set-env-vars "KEY3=VALUE3"
```

Values containing commas need an alternate delimiter (here `@`); this is a flag fragment to add to a `gcloud run deploy` or `gcloud run services update` command:

```text
--set-env-vars "^@^KEY1=value1,value2,value3@KEY2=..."
```

### Update, remove, clear

```bash
gcloud run services update SERVICE --update-env-vars KEY1=VALUE1,KEY2=VALUE2
```

```bash
gcloud run services update SERVICE --remove-env-vars KEY1,KEY2
```

```bash
gcloud run services update SERVICE --clear-env-vars
```

### View

```bash
gcloud run services describe SERVICE
```

## Options / Props

| Item | Value |
|---|---|
| Maximum number of variables | 1000 per service |
| Maximum variable length | 32 Kb |
| `--set-env-vars` | Destructive: deletes previously set variables not in the new list |
| `--update-env-vars` | Non-destructive: changes or adds, deletes nothing |
| `--remove-env-vars` | Removes the listed keys |
| `--clear-env-vars` | Clears all previously set variables |
| `--env-vars-file` | `.env` or YAML file of variables |

Invalid variables:

| Key | Reason |
|---|---|
| Empty (`''`) | Keys can't be an empty string |
| `=` | Keys can't contain `=` |
| `X_GOOGLE_` | Keys can't contain the prefix `X_GOOGLE_` |

Required roles: Cloud Run Developer (`roles/run.developer`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity.

## Notes

- `--set-env-vars` replaces the whole variable list; it is destructive. Try it on a disposable service first, or use `--update-env-vars`.
- Do not store secrets such as database credentials or API keys in environment variables; use Secret Manager (see https://docs.cloud.google.com/run/docs/configuring/secrets).
- Never set `GOOGLE_APPLICATION_CREDENTIALS` as an environment variable on a service that uses service identity; configure a user-managed service account instead.
- A variable set on the service takes precedence over a default of the same name set in the container image (Dockerfile `ENV`). The source's Dockerfile example writes `ENV KEY1=VALUE1,KEY2=VALUE2`; Dockerfile `ENV` pairs are space-separated (the comma form would define one variable), so the example is not reproduced here. See the `docker` skill for Dockerfile syntax.
- Variables in the container runtime contract are reserved and cannot be set; in particular `PORT` is injected by Cloud Run. Functions also get `FUNCTION_TARGET` and `FUNCTION_SIGNATURE_TYPE` (`http` or `event`) plus runtime-specific variables (for example `DEBIAN_FRONTEND`, `SHLVL`, `PATH`, `NODE_ENV`, `VIRTUAL_ENV`, `GOPATH`); do not depend on or modify variables you did not set explicitly, and prefix your own with a unique key.
- Multi-region services are updated with `gcloud run multi-region-services update` (https://docs.cloud.google.com/run/docs/multiple-regions).
- Build-time variables for source deployments: https://docs.cloud.google.com/run/docs/configuring/services/build-environment-variables.
- Corrected from the official docs: the repeated `--set-env-vars` example starts with a `[...]` line, which is not a command; it is replaced with `gcloud run deploy SERVICE --image IMAGE_URL \`.
- Any configuration change creates a new revision.
- The source also shows Console, Terraform, and Compose forms (omitted).
- The revision name in the template (`spec.template.metadata.name`, `REVISION` in the YAML above) must be new and unique for each change, or remove the line; revision names are immutable, so reusing an existing revision name with a changed configuration is rejected.
- Source: https://docs.cloud.google.com/run/docs/configuring/services/environment-variables (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [containers.md](./containers.md)
- Secrets: https://docs.cloud.google.com/run/docs/configuring/secrets
- Container contract: https://docs.cloud.google.com/run/docs/reference/container-contract
