---
source: https://docs.cloud.google.com/run/docs/managing/services
---

# Managing Cloud Run services

Create, list, copy, inspect, disable, and delete Cloud Run services (and functions, which are also services). Each service has a permanent `run.app` URL that persists across revisions; functions get a `run.app` address with the service name and a hash.

## Signature / Usage

### List and inspect

```bash
gcloud run services list
```

Each service has an associated URL; filter by service properties such as labels.

```bash
gcloud run services describe SERVICE
```

```bash
gcloud run services describe SERVICE --region REGION --format yaml
```

`--format export` exports YAML without automatically generated labels or status; get only the URL:

```bash
gcloud run services describe SERVICE --region REGION --format export
```

```bash
gcloud run services describe SERVICE --region REGION --format='value(status.url)'
```

### Copy a service (YAML)

```bash
gcloud run services describe SERVICE --format export > service.yaml
```

Edit `metadata.name` (a new name is required if the region is unchanged; the old name is fine in a different region) and `spec.template.metadata.name` (new revision name or delete it). The block below is a fragment of the exported file; `...` stands for the other exported fields:

```text
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  annotations:
    ...
  name: SERVICE
  ...
spec:
  template:
    metadata:
      annotations:
      ...
      name: REVISION
```

```bash
gcloud run services replace service.yaml
```

Use `--region` to deploy the copy to a different region.

### Disable a service (scale to zero)

Disabling lets in-flight requests finish; later requests to the service URL fail with `Service unavailable` or `Service disabled`. Revisions reachable only through traffic tags are not affected. Requires Cloud Run Admin (`roles/run.admin`) on the project.

```bash
gcloud run services update SERVICE --scaling=0
```

YAML form (download with `gcloud run services describe SERVICE --format export > service.yaml`, then `gcloud run services replace service.yaml`).

Adapted (not in the official docs): the source's annotation block is not valid YAML (annotation keys are not nested under `annotations:` and the value is wrapped in backticks); keys are nested and the value quoted.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
  annotations:
    run.googleapis.com/scalingMode: manual
    run.googleapis.com/manualInstanceCount: '0'
```

REST (`PATCH`, uses `update_mask`):

Adapted (not in the official docs): the request URL is wrapped in double quotes so the `?` query string is not treated as a glob (zsh aborts with "no matches found").

```bash
curl -H "Content-Type: application/json" \
-H "Authorization: Bearer ACCESS_TOKEN" \
-X PATCH \
-d '{"scaling":{"manualInstanceCount":0 }}' \
"https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services/SERVICE?update_mask=scaling.manualInstanceCount"
```

### Delete a service

Destructive and permanent (no undo or restore):

```bash
gcloud run services delete SERVICE --region REGION
```

### List via REST

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X GET \
  -d '' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services
```

Get a token with `gcloud auth print-access-token`, or from the metadata server inside Cloud Run. Single service: `GET .../services/SERVICE-NAME`; delete: `DELETE` on the same path.

## Options / Props

| Item | Detail |
|---|---|
| Revision name rules (YAML copy) | Starts with `SERVICE-`; only lowercase letters, numbers, `-`; does not end with `-`; at most 63 characters |
| Role to manage services and revisions | Cloud Run Developer (`roles/run.developer`) on the service |
| Role to disable a service | Cloud Run Admin (`roles/run.admin`) on the project |

### Deletion behavior

- Deletes all related resources, including every revision whether serving traffic or not.
- Container images stay in Artifact Registry; delete them separately. Eventarc triggers on the service are not deleted automatically.
- The service stays visible until deletion completes but cannot be updated. Redeploying the same name in the same region gives the same endpoint URL.
- A deleted function stops accepting requests, but running instances finish within the configured timeout and may appear active in logs briefly.
- Console filter for functions: **Filter services** > **Deployment type** > **Function**; functions deployed through Cloud Functions v2 show *Cloud Functions* in **Deployed by**.

## Notes

- `service delete` is destructive and permanent; try it on a disposable resource first.
- Source inconsistency: this page requires Cloud Run Admin (`roles/run.admin`) on the project to disable a service; https://docs.cloud.google.com/run/docs/configuring/services/manual-scaling lists Cloud Run Developer (`roles/run.developer`) on the Cloud Run service for the same `--scaling=0` change. A resource-level grant on the service is the narrower choice.
- Source inconsistency: the official pages disable a service with `--scaling=0`; the gcloud help for `gcloud run services update` describes the `--scaling` value as either `auto` or a positive integer.
- Adapted from the official docs: the disable-service YAML (`run.googleapis.com/manualInstanceCount: \`0\`` with keys outside `annotations`) was rewritten as valid YAML.
- Adapted from the official docs: the disable-service REST URL `https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services/SERVICE?update_mask=scaling.manualInstanceCount` is quoted (unquoted `?` is a glob character in zsh; bash behavior is unchanged).
- The source also shows Console, Cloud Code, client library (Go, Java, Node.js, Python, Ruby, PHP, .NET) and Terraform (`scaling_mode = "MANUAL"`, `manual_instance_count = "0"`) forms.
- Source: https://docs.cloud.google.com/run/docs/managing/services (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-revisions.md](./managing-revisions.md)
- [rollouts-rollbacks-traffic-migration.md](./rollouts-rollbacks-traffic-migration.md)
- [deploying-source-code.md](./deploying-source-code.md)
