---
source: https://docs.cloud.google.com/build/docs/view-build-results
---

# View build results

View build status, source, images, steps and timing in the Google Cloud console (**Build history**, **Build details**), with `gcloud builds list` / `describe`, or through the Cloud Build API; filter builds with queries or build tags.

## Signature / Usage

### gcloud

```bash
gcloud builds list
```

Adapted (not in the official docs): the source writes `gcloud builds describe [BUILD_ID]`; the brackets are dropped because they read as a shell glob, and `BUILD_ID` is a placeholder.

```bash
gcloud builds describe BUILD_ID
```

### Filter queries

The query form is `field="value"`, with `=` and `!=` (plus `>`, `>=`, `<`, `<=` for numeric / time fields such as `create_time`) and `AND` / `OR` for compound queries. Enter them in the **Filter Builds** field of the **Build history** page.

```text
status="SUCCESS"
```

```text
status="QUEUED" OR status="WORKING"
```

Adapted (not in the official docs): the image path includes a repository (`my-repo`); Artifact Registry paths are `LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE`.

```text
(status="SUCCESS" OR status="FAILURE") AND \
    results.images.name="us-east1-docker.pkg.dev/my-project/my-repo/my-image"
```

```text
options.requested_verify_option="VERIFIED"
```

```text
source.storage_source.bucket!=""
```

```text
create_time>"2016-10-12T18:43:49+00:00" AND finish_time<"2016-10-13T18:43:49+00:00"
```

### Tag builds and filter by tag

Adapted (not in the official docs): the image path includes a repository (`REPOSITORY`) before `cb-demo-img`.

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: [ 'build', '-t', 'us-east1-docker.pkg.dev/$PROJECT_ID/REPOSITORY/cb-demo-img', '.' ]
images:
- 'us-east1-docker.pkg.dev/$PROJECT_ID/REPOSITORY/cb-demo-img'
tags:
- 'test1'
- 'test2'
```

```bash
gcloud builds list --filter "tags='test1'"
```

```bash
gcloud builds list --filter "tags=('test1' OR 'test2') AND 'test3'"
```

## Options / Props

### Build and step status

| Event | Build status | Step status |
|-------|--------------|-------------|
| Build succeeds | `SUCCESS` | All steps `SUCCESS` |
| Build succeeds with failed steps permitted | `SUCCESS` | Steps with `allowFailure` or `allowExitCodes` that failed are `FAILURE`; build is `SUCCESS` |
| Build fails | `FAILURE` | Failed step `FAILURE`; earlier successful steps `SUCCESS`; steps mid-execution `CANCELLED`; steps not started `QUEUED` |
| Build cancelled by the user | `CANCELLED` | Succeeded steps `SUCCESS`; mid-execution `CANCELLED`; not started `QUEUED` |
| Build times out | `TIMEOUT` | Succeeded steps `SUCCESS`; mid-execution `CANCELLED`; not started `QUEUED` |
| Step times out | `FAILURE` | Timed-out step `TIMEOUT`; earlier steps `SUCCESS`; mid-execution `CANCELLED`; not started `QUEUED` |

### Queryable fields

| Field |
|-------|
| `status`, `build_id`, `trigger_id` |
| `source.storage_source.bucket`, `source.storage_source.object` |
| `source.repo_source.repo_name`, `.branch_name`, `.tag_name`, `.commit_sha` |
| `source_provenance.resolved_repo_source.commit_sha` |
| `results.images.name`, `results.images.digest` |
| `options.requested_verify_option` |
| `tags`, `images` |
| `create_time`, `start_time`, `finish_time` |

### Build tag limits

| Limit | Value |
|-------|-------|
| Characters per tag | 128 |
| Tags per build | 64 |
| Allowed characters | Letters, numbers and underscores anywhere; periods and hyphens anywhere except the first position |

### Roles to view logs

| Where logs are | Role |
|----------------|------|
| Default Cloud Storage bucket | Project > Viewer |
| User-specified Cloud Storage bucket | Storage Object Viewer |

## Notes

- Corrected from the official docs: the filter and tag examples use Artifact Registry paths without a repository (`us-east1-docker.pkg.dev/my-project/my-image`, `us-east1-docker.pkg.dev/$PROJECT_ID/cb-demo-img`); Artifact Registry Docker paths are `LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE`, so a repository is added (`my-repo`, `REPOSITORY`, an existing Docker repository).
- These roles are in addition to the Cloud Build IAM permissions.
- Build tags are separate from Docker image tags.
- Time values in queries are ISO 8601 (UTC).
- Corrected from the official docs: the source's status table writes `FAILED` for failed steps and for the build when a step times out. `Build.status` and `BuildStep.status` share one enum (`STATUS_UNKNOWN`, `PENDING`, `QUEUED`, `WORKING`, `SUCCESS`, `FAILURE`, `INTERNAL_ERROR`, `TIMEOUT`, `CANCELLED`, `EXPIRED` in the Cloud Build v1 Discovery document), which has no `FAILED`, so the table uses `FAILURE`.
- `$PROJECT_ID` in the tags example is a built-in substitution.
- Adapted from the official docs: the source writes `gcloud builds describe [BUILD_ID]`; the brackets are dropped because they read as a shell glob, and `BUILD_ID` is a placeholder.
- Omitted: sample `gcloud builds list` / `describe` output, per-step timeout output and a Console walk-through of the Build summary tabs (Build Log, Execution Details, Build dependencies, Build Artifacts).
- Source: https://docs.cloud.google.com/build/docs/view-build-results (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [store-manage-build-logs.md](./store-manage-build-logs.md)
- [manage-dependencies.md](./manage-dependencies.md)
- Results for build triggers: https://docs.cloud.google.com/build/docs/view-build-results-triggers
