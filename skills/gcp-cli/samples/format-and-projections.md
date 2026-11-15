---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/formats
---

# Format Output with --format and Projections

Choose `table`, `csv`, `value`, `json`, or `yaml` output and pick columns with projections and transforms.

## Signature / Usage

### Discover the available keys

```bash
gcloud projects list --format=yaml --limit=1
```

### Table with selected columns and local time

```bash
gcloud projects list \
  --format="table(name, project_id, createTime.date(tz=LOCAL))"
```

### Boxed, titled, sorted table

```bash
gcloud compute instances list \
  --format='table[box,title=Instances](name:sort=1,zone:label=zone,status)'
```

### Nested table

```bash
gcloud compute regions describe us-central1 \
  --format="table(quotas:format='table(metric,limit,usage)')"
```

### CSV from a flattened list

```bash
gcloud compute project-info describe --flatten='quotas[]' \
  --format='csv(quotas.metric,quotas.limit,quotas.usage)'
```

### CSV without a heading row

```bash
gcloud compute instances list --filter=name:instance-1 \
  --format="csv[no-heading](name,id,serviceAccounts[].email.list(),serviceAccounts[].scopes[].map().list(separator=;))"
```

### Single values with `value(...)`

```bash
gcloud info --format='value(config.account)'
```

```bash
gcloud compute instances list --format="value(uri())"
```

```bash
gcloud compute zones list --format="value(selfLink.scope())"
```

### Flattened key and value lines

Adapted (not in the official docs): the official example wraps the projection across two lines inside the quoted value; the runnable form joins them.

```bash
gcloud compute instances list \
  --format="flattened(name,serviceAccounts[].email,serviceAccounts[].scopes[].basename())"
```

### JSON

```bash
gcloud projects list --format="json" \
  --filter="labels.env=test AND labels.version=alpha"
```

### Set a default format

Adapted (not in the official docs): the formats topic names the `core/default_format` property; the `gcloud config set` form with `json` (one of its supported values) is combined from the properties page.

```bash
gcloud config set core/default_format json
```

## Options / Props

| Format | Needs a projection | Common attributes |
| --- | --- | --- |
| `table` | yes | `box`, `all-box`, `no-heading`, `title=TITLE`, `format=FORMAT-STRING` |
| `csv` | yes | `no-heading`, `separator`, `delimiter`, `terminator` |
| `value` | yes | `delimiter`, `separator` (default tab), `quote`, `terminator` |
| `json` | no | `no-undefined` |
| `yaml` | no | `null="string"`, `no-undefined`, `version=VERSION` |
| `flattened` | no | `no-pad`, `separator=SEPARATOR` |
| `list` | no | `always-display-title`, `compact` |

| Projection part | Example |
| --- | --- |
| Column label and sort | `name:sort=1`, `zone:label=zone` |
| Date in local timezone | `createTime.date(tz=LOCAL)` |
| URI helpers | `uri()`, `selfLink.scope()`, `name.basename()` |
| List helpers | `list()`, `map()`, `list(separator=;)` |

## Notes

- Quote the whole `--format` value; parentheses are shell syntax. Inside a double-quoted value use single quotes (`'...'`) for inner strings, and the reverse.
- `table`, `csv`, and `value` require a projection that lists the keys to print.
- `core/default_format` overrides the default yaml format; `core/format` and `--format` both take precedence over it. A command-specific format takes precedence over `core/default_format`.
- Unknown format attributes are silently ignored.
- With a screen reader option enabled, `table` may print a flattened list instead of columns; see `gcloud topic accessibility`.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/formats (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/projections (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/filters (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/scripting-gcloud (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/configurations (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/properties (retrieved 2026-11-14)

## Related

- [scripting-gcloud.md](../references/config-auth/scripting-gcloud.md)
- [cheatsheet.md](../references/config-auth/cheatsheet.md)
- [properties.md](../references/config-auth/properties.md)
