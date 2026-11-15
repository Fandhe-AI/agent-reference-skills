---
source: https://docs.cloud.google.com/run/docs/configuring/services/manual-scaling
---

# Manual scaling

Manual scaling sets a specific instance count for a Cloud Run service regardless of traffic or utilization, without redeploying. It overrides default autoscaling and can be driven by an external system, for example a schedule.

## Signature / Usage

### Set manual scaling

New service:

```bash
gcloud run deploy SERVICE \
    --scaling=INSTANCE_COUNT \
    --image IMAGE_URL
```

Existing service:

```bash
gcloud run services update SERVICE \
   --scaling=INSTANCE_COUNT
```

`INSTANCE_COUNT` sets manual scaling; `0` disables the service; `auto` restores default autoscaling.

Adapted (not in the official docs): the source YAML shows the annotation keys at the same indentation as `annotations:`; they are indented under it here, matching the YAML shape used in the minimum instances page, and the `INSTANCE_COUNT` value is quoted because annotation values must be strings.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
  annotations:
    run.googleapis.com/scalingMode: MODE
    run.googleapis.com/manualInstanceCount: 'INSTANCE_COUNT'
```

`MODE` is `manual` or `automatic`. Export with `gcloud run services describe SERVICE --format export > service.yaml`, then apply:

```bash
gcloud run services replace service.yaml
```

REST:

Adapted (not in the official docs): the request URL is wrapped in double quotes so the `?` query string is not treated as a glob (zsh aborts with "no matches found").

```bash
    curl -H "Content-Type: application/json" \
    -H "Authorization: Bearer ACCESS_TOKEN" \
    -X PATCH \
    -d '{"scaling":{"manualInstanceCount":MANUAL_INSTANCE_COUNT }}' \
    "https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services/SERVICE?update_mask=scaling.manualInstanceCount"
```

Switch back to automatic (set `scalingMode` to `AUTOMATIC`):

Adapted (not in the official docs): the request URL is wrapped in double quotes so the `?` query string is not treated as a glob.

```bash
      curl -H "Content-Type: application/json" \
      -H "Authorization: Bearer ACCESS_TOKEN" \
      -X PATCH \
      -d '{"launchStage":"BETA","scaling":{"scalingMode": "AUTOMATIC","manualInstanceCount":null}}' \
      "https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services/SERVICE?update_mask=launchStage,scaling.scalingMode,scaling.manualInstanceCount"
```

### Disable a service

```bash
gcloud run services update SERVICE --scaling=0
```

### View scaling configuration

```bash
gcloud run services describe SERVICE
```

Look for `Scaling: Manual (Instances: )` near the top; in YAML the fields are `scalingMode` and `manualInstanceCount`.

### Schedule-based scaling with Cloud Scheduler

Adapted (not in the official docs): the source splits `--uri` across two lines with no continuation, which breaks the command; it is joined onto one line here.

```bash
gcloud scheduler jobs create http hello-start-instances \
  --location=REGION \
  --schedule="0 9 * * MON-FRI" \
  --time-zone=America/Los_Angeles \
  --uri="https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services/hello?update_mask=launchStage,scaling.manualInstanceCount" \
  --headers=Content-Type=application/json,X-HTTP-Method-Override=PATCH \
  --http-method=PUT \
  --message-body='{"scaling":{"manualInstanceCount":INSTANCE_COUNT}}' \
  --oauth-service-account-email=PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

## Options / Props

| Item | Behavior |
|---|---|
| `--scaling` value | integer = manual count; `0` = disable service; `auto` = default autoscaling |
| YAML `run.googleapis.com/scalingMode` | `manual` or `automatic` |
| YAML `run.googleapis.com/manualInstanceCount` | instance count (`0` disables) |
| REST `scaling.manualInstanceCount` / `scaling.scalingMode` | `AUTOMATIC` switches back |
| Terraform | `scaling { scaling_mode = "MANUAL"  manual_instance_count = ... }` |

Required roles: Cloud Run Developer (`roles/run.developer`) on the service; Service Account User (`roles/iam.serviceAccountUser`) on the service identity; Artifact Registry Reader (`roles/artifactregistry.reader`) on the Artifact Registry repository of the deployed image (if applicable).

Billing: with instance-based billing, idle manually scaled instances are billed as active instances; with request-based billing, they are billed as idle minimum instances.

## Notes

- Source inconsistency: this page lists Cloud Run Developer (`roles/run.developer`) on the service for manual scaling, including the `--scaling=0` disable; https://docs.cloud.google.com/run/docs/managing/services requires Cloud Run Admin (`roles/run.admin`) on the project to disable a service.
- Source inconsistency: this page uses `--scaling=0` to disable the service; the gcloud help for `gcloud run services update` / `gcloud run deploy` describes the `--scaling` value as either `auto` or a positive integer.
- Changing scaling mode (automatic to manual or reverse) or the manual instance count does not create a new revision.
- Revision-level minimum and maximum instance settings are ignored under manual scaling.
- Traffic splits: instances are allocated to revisions proportionally to the split. If more revisions receive traffic than the manual count, some get no instances and return the same error as disabled revisions. Revision-level min and max are disabled for revisions in a split. A revision active only through a traffic tag: with revision min set, that many instances start but do not count toward the manual total and the revision does not autoscale; without revision min, it scales to at most one instance.
- Disabling a service lets in-flight requests finish; further requests to the service URL fail with `Service unavailable` or `Service disabled`. Tag-only revisions are not affected.
- The Scheduler example sets 10 instances for business hours (9am-5pm, Mon-Fri) and a second job (`hello-stop-instances`, schedule `0 17 * * MON-FRI`, same flags) scales down off-hours; setting its count to `0` disables the service but not the Scheduler jobs, which later re-enable it.
- The Scheduler CLI cannot set `http-method=PATCH`, hence `PUT` plus `X-HTTP-Method-Override=PATCH`; in the Console the method can be PATCH without the header.
- The example uses the Compute Engine default service account; any service account that can update Cloud Run services works. A dedicated (user-managed) service account is preferable.
- The source YAML for disabling also shows a backtick-wrapped `0`; use the quoted string `'0'` (annotation values must be strings; an unquoted `0` is a YAML integer) or `--scaling=0`.
- Corrected from the official docs: in the source YAML the annotation keys (`run.googleapis.com/scalingMode: MODE`, `run.googleapis.com/manualInstanceCount: INSTANCE_COUNT`) are not nested under `metadata.annotations`, so the YAML is not valid; they are indented under `annotations:` here. The source also leaves `INSTANCE_COUNT` unquoted, which becomes a YAML integer when replaced with a number; it is quoted here (`'INSTANCE_COUNT'`) because `metadata.annotations` values must be strings.
- Adapted from the official docs: the manual-count REST URL `https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services/SERVICE?update_mask=scaling.manualInstanceCount` is quoted (unquoted `?` is a glob character in zsh; bash behavior is unchanged).
- Adapted from the official docs: the switch-to-automatic REST URL `...?update_mask=launchStage,scaling.scalingMode,scaling.manualInstanceCount` is quoted for the same reason.
- Corrected from the official docs: the Scheduler `--uri="https://run.googleapis.com/v2/projects/PROJECT_ID/locations/REGION/services/hello?update_mask=..."` value was split over two lines with no `\` continuation; it is joined into one line.
- The source also shows Console and Terraform forms (omitted).
- If the exported file has `spec.template.metadata.name` (a revision name), delete it or set a new revision name before applying; revision names are immutable, so reusing the existing name with a changed configuration is rejected.
- Source: https://docs.cloud.google.com/run/docs/configuring/services/manual-scaling (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [min-instances.md](./min-instances.md)
- [max-instances.md](./max-instances.md)
- Scaling controls: https://docs.cloud.google.com/run/docs/configuring/scaling-controls
