---
source: https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration
---

# Gradual Rollout and Rollback with Revision Tags

Deploy a new revision with no traffic and a tag, test it on its tag URL with an identity token, shift traffic in steps, and roll back or clean up.

## Signature / Usage

### 1. Deploy a tagged revision that receives no traffic

`myservice` (steps 1 and 3, from the source) is the same service as `SERVICE` in the other steps. For source deploys use `--source` instead of `--image`.

```bash
gcloud run deploy myservice --image IMAGE_URL  --no-traffic --tag TAG_NAME
```

The revision is reachable at `https://TAG---SERVICE-HASH.a.run.app` (for example `https://green---myservice-abcdef.a.run.app`).

### 2. Test the tag URL of a private service

Your account needs `roles/run.invoker` on the service. `SERVICE_URL` here is the tag URL from step 1.

```bash
curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" SERVICE_URL
```

For testing in a browser, proxy the tagged revision to `http://localhost:8080` (the default `--port`) instead. In this gcloud reference example `my-service` is `SERVICE` and `my-tag` is `TAG_NAME`; without `--tag` the proxy reaches the revision that serves traffic, not the new one:

```bash
gcloud run services proxy my-service --tag=my-tag
```

### 3. Move a share of traffic to the tag

```bash
gcloud run services update-traffic myservice --to-tags TAG_NAME=TRAFFIC_PERCENT
```

### 4. Or shift percentages by revision

`LATEST` works as the revision name, for example `LATEST=5`. Repeat with larger percentages when satisfied.

```bash
gcloud run services update-traffic SERVICE --to-revisions REVISION=PERCENTAGE
```

`LIST` is comma delimited, for example `hello2-00005-red=25,hello2-00001-bod=25,hello2-00002-nan=50`.

```bash
gcloud run services update-traffic SERVICE --to-revisions LIST
```

### 5. Finish: send everything to the latest revision

This overrides any existing split.

```bash
gcloud run services update-traffic SERVICE --to-latest
```

### 6. Roll back

Rollback updates the routing configuration immediately (traffic still shifts over during the transition); Cloud Run does not re-run deployment health checks.

```bash
gcloud run services update-traffic SERVICE --to-revisions REVISION=100
```

### 7. Remove the tag

```bash
gcloud run services update-traffic SERVICE --remove-tags TAG_NAME
```

## Options / Props

| Role | Scope |
|---|---|
| Cloud Run Developer (`roles/run.developer`) | the service |
| Service Account User (`roles/iam.serviceAccountUser`) | the service identity |
| Artifact Registry Reader (`roles/artifactregistry.reader`) | the image repository |
| Cloud Run Invoker (`roles/run.invoker`) | the tester, to call a private service |

For source deploys the deployer needs `roles/run.sourceDeveloper` and `roles/serviceusage.serviceUsageConsumer` on the project, and the Cloud Build service account needs `roles/run.builder`.

## Notes

- Once you split traffic or pin a revision, later deployments follow that split until you send all traffic to the latest revision.
- Routing changes are not instantaneous: in-flight requests may go to either revision during the transition.
- With service-level minimum instances, traffic tags do not allocate minimum instances for tagged revisions (a tagged revision that is also part of a traffic split is still counted toward the service-level minimum); with revision-level minimum instances, traffic tags allocate minimum instances for tagged revisions.
- gcloud-generated identity tokens lack an audience claim and suit development only; production callers use ID tokens issued for a service account with the intended audience.
- A revision with 0% traffic can be deleted even if tagged. Deleting a revision is destructive; try it on a disposable service first.
- Source inconsistency: https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration says a 0% revision can be deleted even if tagged; https://docs.cloud.google.com/run/docs/managing/revisions says you cannot delete a revision that "is able to receive traffic", and a tagged revision can receive requests through its tag URL.
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails.
- Source: https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/authenticating/developers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/services/proxy (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-service-from-source.md](./deploy-service-from-source.md)
- [deploy-image-from-artifact-registry.md](./deploy-image-from-artifact-registry.md)
- Developer authentication and proxy: https://docs.cloud.google.com/run/docs/authenticating/developers
