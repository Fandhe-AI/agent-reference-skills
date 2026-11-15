---
source: https://docs.cloud.google.com/run/docs/testing/local
---

# Test a container locally

Run and test your container image locally before deploying, using Docker, Docker with Google Cloud access, the Cloud Code emulator, or the `gcloud beta code dev` local development environment.

## Signature / Usage

### Registry access (Artifact Registry)

```bash
gcloud auth configure-docker LOCATION-docker.pkg.dev
```

Replace `LOCATION` with the region of your repository, for example `us-west2`.

### Docker

```bash
PORT=8080 && docker run -p 9090:${PORT} -e PORT=${PORT} IMAGE_URL
```

Open `http://localhost:9090`. The `PORT` variable is a requirement of the container runtime contract. The default Cloud Run service account is not available locally.

### Docker with Google Cloud access

Use a service account key (see the source's security warning below), mount it read-only and set `GOOGLE_APPLICATION_CREDENTIALS`:

```bash
PORT=8080 && docker run \
-p 9090:${PORT} \
-e PORT=${PORT} \
-e K_SERVICE=dev \
-e K_CONFIGURATION=dev \
-e K_REVISION=dev-00001 \
-e GOOGLE_APPLICATION_CREDENTIALS=/tmp/keys/FILE_NAME.json \
-v $GOOGLE_APPLICATION_CREDENTIALS:/tmp/keys/FILE_NAME.json:ro \
IMAGE_URL
```

The `GOOGLE_APPLICATION_CREDENTIALS` value in the container must match the bind mount location.

### gcloud CLI local environment

```bash
gcloud beta code dev
```

Builds from the local Dockerfile if present, otherwise with Google Cloud's buildpacks, rebuilds on source changes, and serves at `http://localhost:8080/` (or the port in `--local-port`). Stop with Control-C (macOS/Linux) or Control-Break (Windows).

Customize with a YAML file: `gcloud beta code dev` uses files ending `*.service.dev.yaml` in the current directory, otherwise `*.service.yaml`. Supported settings: environment variables, memory limits, CPU limits, service name, service accounts. The `image` field is not required.

```yaml
  apiVersion: serving.knative.dev/v1
  kind: Service
  metadata:
    name: my-service-name
  spec:
    template:
      spec:
        containers:
        - env:
          - name: FOO
            value: bar
```

### Credentials with `gcloud beta code dev`

```bash
gcloud auth application-default login
gcloud beta code dev --dockerfile=PATH_TO_DOCKERFILE --application-default-credential
```

```bash
gcloud beta code dev --dockerfile=PATH_TO_DOCKERFILE --service-account=SERVICE_ACCOUNT_EMAIL
```

## Options / Props

### Confirm the code runs locally (`K_REVISION`)

| Method | `K_REVISION` value |
|--------|--------------------|
| Docker | not set (no value) |
| Docker with Google Cloud access (values above) | `dev-00001` |
| Cloud Code emulator | `local` |
| gcloud CLI (`gcloud beta code dev`) | begins with `dev-` |

## Notes

- Service account keys are a security risk if not managed correctly; choose a more secure alternative whenever possible. You are responsible for the private key and the practices in "Best practices for managing service account keys". Key creation might be disabled by organization policy. Validate keys acquired from external sources. `--service-account` downloads and caches a key locally.
- Source inconsistency: the page calls the Docker env flag `--environment (-e)`; the Docker CLI long form is `--env`, and the examples use `-e`.
- The Cloud Code emulator (VS Code, JetBrains) can configure CPU/memory, environment variables, and Cloud SQL connections.
- Docker's `-v $GOOGLE_APPLICATION_CREDENTIALS:...` is shown unquoted in the source; quote the variable if your path contains spaces.
- See the `docker` skill for Dockerfile / image build in general.
- Source: https://docs.cloud.google.com/run/docs/testing/local (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [troubleshooting.md](./troubleshooting.md)
- [logging.md](./logging.md)
