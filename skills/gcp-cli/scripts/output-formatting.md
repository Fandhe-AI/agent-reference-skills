---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/formats
---

# Output Formatting and Filtering

Copy-paste `--format`, `--filter`, `--flatten`, `--limit`, and `--sort-by` examples, plus the `gcloud topic` pages that document them.

## Signature / Usage

### Read the topic help

```bash
gcloud topic formats
```

```bash
gcloud topic filters
```

```bash
gcloud topic projections
```

### Discover the fields of a resource

```bash
gcloud projects list --format=yaml --limit=1
```

The command prints one full record as YAML; use it to discover the field keys for `--filter` and `--format`.

### Print a single value

```bash
gcloud info --format="value(config.account)"
```

```bash
gcloud compute instances list --format="value(uri())"
```

```bash
gcloud compute zones list --format="value(selfLink.scope())"
```

```bash
gcloud auth list --filter=status:ACTIVE --format="value(account)"
```

### Print a table

```bash
gcloud compute instances list \
    --format="table(name,creationTimestamp.date(tz=LOCAL))"
```

```bash
gcloud projects list \
    --format="table(projectNumber,projectId,createTime)" \
    --filter="createTime>=2018-01-15"
```

### Print nested and flattened data

```bash
gcloud compute regions describe us-central1 \
    --format="table(quotas:format='table(metric,limit,usage)')"
```

```bash
gcloud compute project-info describe --flatten="quotas[]" \
    --format="csv(quotas.metric,quotas.limit,quotas.usage)"
```

```bash
gcloud compute instances list \
    --format="value(disks[].interface.list())"
```

### Add box decorations and a title

```bash
gcloud compute instances list \
    --format='table[box,title=Instances](name:sort=1,zone:label=zone,status)'
```

### Filter resources

```bash
gcloud compute instances list --filter="zone:us-central1-a"
```

```bash
gcloud compute instances list --filter="machineType:f1-micro"
```

```bash
gcloud compute instances list \
    --filter="zone ~ us AND -machineType:f1-micro"
```

```bash
gcloud compute instances list --filter="tags.items=my-tag"
```

```bash
gcloud compute instances list \
    --filter="tags.items=(my-tag,my-other-tag)"
```

```bash
gcloud compute instances list --filter="labels.my-label:*"
```

```bash
gcloud projects list --format="json" \
    --filter="labels.env=test AND labels.version=alpha"
```

```bash
gcloud projects list \
    --format="table(projectNumber,projectId,createTime)" \
    --filter="createTime>-P2W"
```

Adapted (not in the official docs): the official example omits the required positional `IMAGE_NAME`; `gcr.io/PROJECT_ID/IMAGE` is added so the command runs, and the single quotes enclose only the value so the filter matches.

```bash
gcloud container images list-tags gcr.io/PROJECT_ID/IMAGE --filter="tags:'30e5504145'"
```

The `createTime>-P2W` filter uses an ISO 8601 duration (the last two weeks). The last command single-quotes only the value so `30e5504145` is not read as a number in scientific notation.

### Filter and sort in one command

```bash
gcloud projects list \
    --format="table(projectNumber,projectId,createTime.date(tz=LOCAL))" \
    --filter="createTime>=2018-01-15T12:00:00" --sort-by=createTime
```

The help text wraps this command in the middle of a quoted string (`tz=LOCAL` then `))`); the block above joins the lines.

### Limit results

```bash
gcloud compute instances list --filter="labels.my-label:*" --limit=10
```

### Filter a nested list with --flatten

Adapted (not in the official docs): `PROJECT_ID` replaces the help-text sample project `cloudsdktest`; the flags are unchanged.

```bash
gcloud projects get-iam-policy PROJECT_ID --flatten=bindings \
    --filter=bindings.role:roles/editor \
    --format='value(bindings.members)'
```

## Notes

- `--flatten`, `--sort-by`, `--filter`, and `--limit` are applied in that order. `--format` and `--flatten` are gcloud-wide flags; `--filter`, `--limit`, and `--sort-by` are list-command flags (for example on `gcloud projects list`).
- The format names for `--format` include `json`, `yaml`, `csv`, `text`, `list`, `table(...)`, and `value(...)`; see `gcloud topic formats`. `core/format` and `core/default_format` can set a default format; `--format` takes precedence over both. See config.md.
- Adapted from the official docs: the `gcloud projects get-iam-policy` example uses `PROJECT_ID` instead of the help-text sample project `cloudsdktest`.
- Corrected from the official docs: the filters topic example `gcloud container images list-tags --filter="'tags:30e5504145'"` has no `IMAGE_NAME`, which the SYNOPSIS requires; `gcr.io/PROJECT_ID/IMAGE` follows the documented `*.gcr.io/PROJECT_ID/IMAGE_PATH` format. Inside the filter, only the value is quoted (`tags:'30e5504145'`): the official form quotes the whole expression, which gcloud 593.0.0's filter parser (`resource_filter.Compile`) treats as a single quoted term that does not match a resource whose `tags` contains `30e5504145`.
- Scripts should rely on `--format` output rather than the default human-readable output, which can change between releases; see scripting.md.
- Resource field names differ between services; the examples use Compute Engine and Resource Manager fields from the official help.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/formats (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/filters (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/projections (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/docs/scripting-gcloud (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/cheatsheet (retrieved 2026-11-14)

## Related

- [scripting-gcloud.md](../references/config-auth/scripting-gcloud.md)
- [cheatsheet.md](../references/config-auth/cheatsheet.md)
- [properties.md](../references/config-auth/properties.md)
