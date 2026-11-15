---
source: https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration
---

# Rollbacks, gradual rollouts, and traffic migration

Control which revisions of a service receive traffic and in what percentages: roll back, roll out gradually, split traffic, send all traffic to the latest revision, and use tags to test and migrate. Routing changes are not instantaneous; in-flight requests complete and may go to either the new or the previous revision during the transition.

## Signature / Usage

### Roll back to a previous revision

Rollback updates the routing configuration immediately (traffic still shifts over during the transition, see above); Cloud Run does not re-run deployment health checks or verify external dependencies first.

```bash
gcloud run services update-traffic SERVICE --to-revisions REVISION=100
```

YAML (`gcloud run services describe SERVICE --format export > service.yaml`, edit, then `gcloud run services replace service.yaml`). The YAML blocks on this page are fragments of the exported file; `...` stands for the other exported fields:

```text
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
 name: SERVICE
spec:
...
  traffic:
  - revisionName: REVISION
    percent: 100
```

### Gradual rollout

Deploy a revision that receives no traffic:

```bash
gcloud run deploy --image IMAGE --no-traffic
```

```bash
gcloud run deploy SERVICE --source . --no-traffic
```

Then shift a percentage (`LATEST` works as the revision name, for example `LATEST=5`), and repeat with larger percentages when satisfied:

```bash
gcloud run services update-traffic SERVICE --to-revisions REVISION=PERCENTAGE
```

YAML form (fragment; percentages must add up to 100):

```text
spec:
...
  traffic:
  - revisionName: REVISION-NEW
    percent: PERCENT-NEW
  - revisionName: REVISION-FORMER
    percent: PERCENT-FORMER
```

### Split traffic between revisions

```bash
gcloud run services update-traffic SERVICE --to-revisions LIST
```

`LIST` is comma delimited, for example `hello2-00005-red=25,hello2-00001-bod=25,hello2-00002-nan=50`.

### Send all traffic to the latest revision

Overrides any existing split; later deployments serve 100% until you split again.

```bash
gcloud run services update-traffic SERVICE --to-latest
```

YAML form (fragment):

```text
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
 name: SERVICE
spec:
...
  traffic:
  - latestRevision: true
    percent: 100
```

### Tags for testing and migration

Deploy a revision with no traffic and a tag; test it at `https://TAG---SERVICE-HASH.a.run.app` (for example `https://green---myservice-abcdef.a.run.app`):

```bash
gcloud run deploy myservice --image IMAGE_URL  --no-traffic --tag TAG_NAME
```

For source deploys use `--source` instead of `--image`, and add `--function` for a function.

Migrate traffic to a tagged revision:

```bash
gcloud run services update-traffic myservice --to-tags TAG_NAME=TRAFFIC_PERCENT
```

Remove a tag:

```bash
gcloud run services update-traffic SERVICE --remove-tags TAG_NAME
```

YAML tag form (fragment):

```text
spec:
...
  traffic:
  - revisionName: REVISION
    percent: 100
  - revisionName: REVISION-A
    tag: TAG-A
```

## Options / Props

### Required roles

| Service deployed from | Roles |
|---|---|
| Container image | Cloud Run Developer (`roles/run.developer`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity; Artifact Registry Reader (`roles/artifactregistry.reader`) on the images' repository |
| Source code | Cloud Run Source Developer (`roles/run.sourceDeveloper`) and Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`) on the project; Service Account User on the service identity; Cloud Run Builder (`roles/run.builder`) to the Cloud Build service account (defaults to the Compute Engine default service account) |

## Notes

- Traffic split lifecycle: once you split traffic or pin a previous revision, all later deployments follow that split until you send all traffic to the latest revision. With session affinity, see the session affinity page for the effect on splitting.
- Tags and minimum instances: with service-level minimum instances, traffic tags do not allocate minimum instances for tagged revisions (a tagged revision that is also part of a traffic split is still counted toward the service-level minimum, see https://docs.cloud.google.com/run/docs/configuring/min-instances); with revision-level minimum instances, traffic tags allocate minimum instances for tagged revisions. To avoid cost for tagged revisions use service-level min instances or remove tags when done.
- A revision with 0% traffic can be deleted even if tagged; Cloud Run tries to remove the tag. Errors updating traffic may mean a tag still references a deleted revision.
- Source inconsistency: this page says a revision with 0% traffic can be deleted even if it has a tag; https://docs.cloud.google.com/run/docs/managing/revisions says you cannot delete a revision that "is able to receive traffic", and a tagged revision can receive requests through its tag URL.
- Terraform: referenced revisions must already exist, otherwise `Error 400: spec.template.spec: Revision template was empty`.
- Source inconsistency: in the gradual rollout steps both bullets are labeled "To deploy a service from source code"; the first (`--image IMAGE`) is the container image case.
- The source also shows Console and Terraform forms for every task.
- If the exported file has `spec.template.metadata.name` (a revision name), delete it or set a new revision name before applying; revision names are immutable, so reusing the existing name with a changed configuration is rejected.
- Source: https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-revisions.md](./managing-revisions.md)
- [managing-services.md](./managing-services.md)
- [deploying-source-code.md](./deploying-source-code.md)
