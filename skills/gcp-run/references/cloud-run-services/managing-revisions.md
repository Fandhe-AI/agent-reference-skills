---
source: https://docs.cloud.google.com/run/docs/managing/revisions
---

# Managing revisions

Deploying to a service or changing its configuration creates an immutable revision. This page lists, inspects, and deletes revisions.

## Signature / Usage

### List revisions

```bash
gcloud run services list
```

```bash
gcloud run revisions list --service SERVICE --region REGION
```

### View revision details

```bash
gcloud run revisions describe REVISION --region REGION
```

```bash
gcloud run revisions describe REVISION --region REGION --format yaml
```

REST (`GET` on the revisions endpoint):

```bash
curl -H "Content-Type: application/json" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -X GET \
  -d '' \
  https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services/SERVICE-NAME/revisions/REVISION-NAME
```

List all revisions of a service by omitting `/REVISION-NAME`. A non-current revision may have status `RETIRED` (Cloud Run retired the infrastructure for it).

### Delete a revision

Cannot be undone:

```bash
gcloud run revisions delete REVISION --region REGION
```

REST uses `-X DELETE` on the same revision path.

## Options / Props

### Revision facts

| Item | Detail |
|---|---|
| Traffic | A new revision can receive all, none, or some traffic; gradual rollout, split, rollback supported |
| Testing | Revision tags test a revision that serves no traffic |
| Billing | Revisions that receive no requests use no resources and are not billed (minimum instances still bill) |
| Limit | Maximum 1000 revisions per service; older revisions auto-deleted beyond that |
| Revision suffix | Assigned automatically; set your own with `--revision-suffix` on `gcloud run deploy` |
| Role | Cloud Run Developer (`roles/run.developer`) on the service |

### Cannot delete a revision if

- it can receive traffic,
- it is the only revision of the service,
- it is the latest revision of the service.

## Notes

- Deleting a revision does not delete its image from Artifact Registry (or Container Registry); delete images separately. Revision deletion is destructive; try it on a disposable service first.
- Source inconsistency: this page says you cannot delete a revision that "is able to receive traffic"; https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration says a revision that is not serving traffic (0% allocation) can be deleted even if it has an assigned tag, although a tagged revision can receive requests through its tag URL.
- The revision details panel shows build and source repository info only if the Artifact Analysis API is enabled and the container was built with Cloud Build (source repository info also needs a Cloud Build trigger).
- The source also shows Console, Cloud Code, and client library forms.
- Source: https://docs.cloud.google.com/run/docs/managing/revisions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-services.md](./managing-services.md)
- [rollouts-rollbacks-traffic-migration.md](./rollouts-rollbacks-traffic-migration.md)
