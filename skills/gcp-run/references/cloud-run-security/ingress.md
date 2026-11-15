---
source: https://docs.cloud.google.com/run/docs/securing/ingress
---

# Restrict network ingress for Cloud Run

Use ingress settings to restrict which network sources can reach Cloud Run services and instances, and optionally disable the default `run.app` URL.

## Signature / Usage

### Set ingress on a service

New service:

```bash
gcloud run deploy SERVICE \
    --image IMAGE_URL \
    --ingress INGRESS
```

Existing service:

```bash
gcloud run services update SERVICE \
    --ingress INGRESS
```

`INGRESS` is one of `all`, `internal`, `internal-and-cloud-load-balancing`. `IMAGE_URL` is an image reference such as `us-docker.pkg.dev/cloudrun/container/hello:latest` (Artifact Registry format `LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/PATH:TAG`).

### Set ingress in YAML

```bash
gcloud run services describe SERVICE --format export > service.yaml
```

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
  annotations:
    run.googleapis.com/ingress: INGRESS
spec:
  template:
    metadata:
      name: REVISION
```

```bash
gcloud run services replace service.yaml
```

### Set ingress on an instance

```bash
gcloud beta run instances deploy INSTANCE \
    --image IMAGE_URL \
    --ingress INGRESS
```

```bash
gcloud beta run instances update INSTANCE \
    --ingress INGRESS
```

### Disable the default URL (service)

```bash
gcloud run services update SERVICE_NAME --no-default-url
```

```bash
gcloud run deploy SERVICE_NAME --no-default-url
```

The output URL displays as `None`. Restore with `--default-url`. YAML form:

Adapted (not in the official docs): quoted the annotation value (`'true'`); annotation values must be strings, and an unquoted `true` makes `gcloud run services replace` fail.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  annotations:
    run.googleapis.com/default-url-disabled: 'true'
  name: SERVICE
spec:
  template:
    metadata:
      name: REVISION
```

### Disable the default URL (instance)

```bash
gcloud beta run instances update INSTANCE --no-default-url
```

```yaml
apiVersion: run.googleapis.com/v1
kind: Instance
metadata:
  name: INSTANCE
  annotations:
    run.googleapis.com/default-url-disabled: 'true'
    run.googleapis.com/launch-stage: BETA
spec:
  containers:
  - name: CONTAINER_NAME
    image: IMAGE_URL
```

## Options / Props

| Setting | gcloud value | Allows |
|---|---|---|
| Internal | `internal` | Most restrictive. Internal Application Load Balancer (including Shared VPC through it); resources allowed by a VPC Service Controls perimeter containing the resource (Cloud Run must be a restricted service); VPC networks in the same project; the attached Shared VPC network; Cloud Scheduler, Cloud Tasks, Dialogflow CX, Eventarc, Gemini Enterprise, Pub/Sub subscriptions, synthetic monitors (including uptime checks), Workflows, BigQuery, if in the same project or perimeter and using the default `run.app` URL (not a custom URL or domain) |
| Internal and Cloud Load Balancers | `internal-and-cloud-load-balancing` | Everything in "internal" plus external Application Load Balancer. Direct internet requests to the `run.app` URL are not allowed. Console: Internal > Allow traffic from external Application Load Balancers |
| All | `all` | Least restrictive; all requests including direct internet requests to the `run.app` URL. This is the default |

| Revision name rule (YAML `REVISION`) | Requirement |
|---|---|
| Prefix | Starts with `SERVICE-` |
| Characters | Only lowercase letters, numbers, and `-` |
| Suffix | Does not end with `-` |
| Length | At most 63 characters |

Disabling the default `run.app` URL breaks callers that use it: `cloudfunctions.net` URL of Cloud Functions v2 based on the Cloud Run service, Cloud Scheduler, Cloud Service Mesh, Cloud Tasks, Dialogflow CX, Eventarc, Firebase App Hosting, Firebase Hosting, Pub/Sub, synthetic monitors and uptime checks, Workflows.

## Notes

- Network ingress paths: default `run.app` URL, any domain mapping, any external or internal Application Load Balancer. All are subject to the ingress setting; the default allows any resource on the internet. IAM authentication still applies; use both ingress settings and IAM for layered access.
- Internal-source callers: requests from VPC networks in the same project are internal even if the source has an external IP; on-premises over Cloud VPN and Cloud Interconnect are internal. Calls from Cloud Run or App Engine to a service set to `internal` or `internal-and-cloud-load-balancing` must route through a VPC network that is considered internal. Compute Engine VMs with external IPs or Cloud NAT need no extra setup.
- Custom URLs are independent of the default URL: disabling `run.app` leaves a custom URL mapping active. Map a custom domain before disabling the `run.app` URL.
- Administrators can restrict ingress choices with the `run.allowedIngress` organization policy, or a custom constraint.
- Corrected from the official docs: the service YAML had `run.googleapis.com/default-url-disabled: true` (a YAML boolean); `metadata.annotations` values are strings, so it is quoted as `'true'`, matching the source's own instance YAML.
- `gcloud run deploy SERVICE_NAME --no-default-url` (verbatim) has no `--image`; the deploy command defaults to source deployment (of the current directory) when neither `--image` nor `--source` is supplied (https://docs.cloud.google.com/run/docs/deploying-source-code). Add `--image IMAGE_URL` to deploy an existing image.
- The source also shows Console and Terraform forms (not reproduced).
- Source: https://docs.cloud.google.com/run/docs/securing/ingress (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [security.md](./security.md)
- [service-identity.md](./service-identity.md)
- Private networking: https://docs.cloud.google.com/run/docs/securing/private-networking
