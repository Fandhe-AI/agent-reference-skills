---
source: https://docs.cloud.google.com/run/docs/configuring/services/containers
---

# Configure containers for services

How to configure the container port, entrypoint command and arguments, working directory, and container start order (sidecars) for a Cloud Run service. A service can have a maximum of 1000 arguments per container.

## Signature / Usage

### Container port

```bash
gcloud run services update SERVICE --port PORT
```

```bash
gcloud run deploy --image IMAGE_URL --port PORT
```

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
        ports:
        - containerPort: PORT
```

Export first with `gcloud run services describe SERVICE --format export > service.yaml`, then apply with `gcloud run services replace service.yaml`.

### Entrypoint command and arguments

```bash
gcloud run services update SERVICE --command COMMAND --args ARG1,ARG-N
```

```bash
gcloud run deploy --image IMAGE_URL --command COMMAND --args ARG1,ARG-N
```

Clear them (restore image defaults) with empty strings:

```bash
gcloud run deploy --image IMAGE_URL --command "" --args ""
```

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    spec:
      containers:
      - image: IMAGE_URL
        command:
        - COMMAND
        args:
        - ARG1
        - ARG-N
```

Arguments containing equals signs:

```bash
gcloud run deploy  \
  --args="--repo-allowlist=github.com/example/example_demo"
```

### Working directory

```bash
gcloud run services update SERVICE --workdir WORKING_DIR
```

```bash
gcloud run deploy --image IMAGE_URL --workdir WORKING_DIR
```

```yaml
spec:
  template:
    spec:
      containers:
      - image: IMAGE_URL
        workingDir: WORKING_DIR
```

### Container start order (sidecars)

Adapted (not in the official docs): the source writes `--depends-on=CONTAINER_1_NAMECONTAINER_2_NAME` with no separator between the two names; a comma separator is inserted here (verify the list syntax with `gcloud run deploy --help` for your gcloud version).

```bash
gcloud run deploy SERVICE \
     --container CONTAINER_1_NAME --image='INGRESS_IMAGE' --port='CONTAINER_PORT' \
     --container CONTAINER_2_NAME --image='SIDECAR_IMAGE' --depends-on=CONTAINER_1_NAME \
     --container CONTAINER_3_NAME --image='SIDECAR_IMAGE' --depends-on=CONTAINER_1_NAME,CONTAINER_2_NAME
```

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  annotations:
  name: SERVICE
spec:
  template:
    metadata:
      annotations:
        run.googleapis.com/container-dependencies: '{"CONTAINER1":["CONTAINER2"], "CONTAINER3":["CONTAINER1","CONTAINER2"]}'
```

In this example `CONTAINER2` starts first, `CONTAINER1` second, `CONTAINER3` last.

### View settings

```bash
gcloud run services describe SERVICE
```

## Options / Props

| Item | Value |
|---|---|
| Container port | Default `8080`; Cloud Run injects the `PORT` environment variable (the ingress container when multiple containers are deployed); port settings do not apply to Cloud Run jobs |
| `--command` / `command` | Overrides image `ENTRYPOINT` |
| `--args` / `args` | Overrides image `CMD`; comma-separated list in gcloud; maximum 1000 arguments per container |
| `--workdir` / `workingDir` | Working directory; empty string `""` (or removing the field) resets to the image default |
| `--depends-on` / `run.googleapis.com/container-dependencies` | Start order; containers without dependencies start first, concurrently |
| Sidecar ingress port | No default port; you must set the port on the ingress container, and only one container can expose a port |

`REVISION` in YAML: a new revision name, or delete it. A new name must start with `SERVICE-`, contain only lowercase letters, numbers and `-`, not end with `-`, and not exceed 63 characters.

Required roles: Cloud Run Developer (`roles/run.developer`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity.

## Notes

- Containers should listen on the port in the `PORT` environment variable rather than a hardcoded port.
- Start order needs startup healthcheck probes on every container that others depend on; without probes, containers start in the specified order even if a dependency failed to start. Ingress containers have a default startup probe.
- Source inconsistency: this page says health checks cannot be configured with the Google Cloud CLI, but the health checks page shows `--startup-probe`, `--liveness-probe` and `--readiness-probe` gcloud flags.
- Adapted from the official docs: the original fragment `--depends-on=CONTAINER_1_NAMECONTAINER_2_NAME` lacked a separator between the names.
- Commas in arguments are escaped as described in the environment variables page (alternate delimiter such as `^@^`).
- Any configuration change creates a new revision.
- The source also shows Console, Terraform, and Compose (`gcloud run compose up`) forms (omitted).
- Source: https://docs.cloud.google.com/run/docs/configuring/services/containers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [environment-variables.md](./environment-variables.md)
- Health checks: https://docs.cloud.google.com/run/docs/configuring/healthchecks
- Container contract: https://docs.cloud.google.com/run/docs/container-contract
