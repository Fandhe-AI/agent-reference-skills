---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/filters
---

# Filter and Flatten List Output

Select resources with `--filter` expressions and expand nested lists such as IAM bindings with `--flatten`.

## Signature / Usage

### Match a value, a pattern, or an existing key

```bash
gcloud compute instances list --filter="zone:us-central1-a"
```

```bash
gcloud compute instances list --filter="machineType:f1-micro"
```

```bash
gcloud compute instances list --filter="labels.my-label:*"
```

### Regular expression and negation

```bash
gcloud compute instances list --filter="zone ~ ^us AND -machineType:f1-micro"
```

### Combine terms with AND, OR, and parentheses

```bash
gcloud compute instances list \
  --filter="tags.items=(my-tag,my-other-tag)"
```

```bash
gcloud compute instances list \
  --filter="(tags.items=my-tag AND -tags.items=my-other-tag) OR tags.items=alternative-tag"
```

### Dates and durations

```bash
gcloud projects list \
  --format="table(projectNumber,projectId,createTime)" \
  --filter="createTime>=2018-01-15"
```

```bash
gcloud projects list \
  --format="table(projectNumber,projectId,createTime)" \
  --filter="createTime>-P2W"
```

### Values that look like numbers

```bash
gcloud container images list-tags --filter="'tags:30e5504145'"
```

### Metadata keys

Adapted (not in the official docs): the runnable form from the filters topic, with the inner quotes of `show="keys"` changed to single quotes so the double-quoted filter is not closed early.

```bash
gcloud compute instances list --limit=1 \
  --filter="metadata.list(show='keys'):fingerprint"
```

### Filter on a nested list with --flatten

List the members of a project that hold the editor role. `--flatten=bindings` turns each IAM binding into its own record, so the filter and the projection can use `bindings.role` and `bindings.members`.

```bash
gcloud projects get-iam-policy cloudsdktest --flatten=bindings \
  --filter=bindings.role:roles/editor \
  --format='value(bindings.members)'
```

Adapted (not in the official docs): `PROJECT_ID` replaces the official sample project `cloudsdktest`; the flags are unchanged.

```bash
gcloud projects get-iam-policy PROJECT_ID --flatten=bindings \
  --filter=bindings.role:roles/editor \
  --format='value(bindings.members)'
```

### Flatten a repeated field into CSV

```bash
gcloud compute project-info describe --flatten='quotas[]' \
  --format='csv(quotas.metric,quotas.limit,quotas.usage)'
```

## Options / Props

| Operator | Meaning |
| --- | --- |
| `key:pattern` | Word match; `key:*` tests that the key is defined, `-key:*` that it is undefined |
| `key=value`, `key!=value` | Equal / not equal |
| `key<value`, `key<=value`, `key>=value`, `key>value` | Numeric if both sides are numbers, otherwise lexicographic |
| `key~regex`, `key!~regex` | Regular expression match (Python `re`) |
| `AND`, `OR`, `NOT` | Uppercase; parenthesize expressions that mix `AND` and `OR` |

## Notes

- Quote the whole filter. If the shell quoting is `'...'`, use `"..."` for string literals inside, and the reverse. A `~` must be inside quotes so the shell does not expand it as `HOME`.
- Flags apply in the order `--flatten`, `--sort-by`, `--filter`, `--limit`. `--flatten` also flattens the keys used by `--format` and `--filter`.
- Depending on the API, filtering may run on the client, on the server, or both.
- The `:` operator is changing for consistency across Google APIs (a deprecated and a new implementation exist); a warning appears when the two would return different matches. `=` behaves differently across APIs: where you want matching, use `:`.
- Add `--format=yaml --limit=1` (or `--format=text`) to see which keys a resource has before writing a filter.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/filters (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/cheatsheet (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/scripting-gcloud (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference (Google Cloud CLI 593.0.0 help for `--flatten`, retrieved 2026-11-14)

## Related

- [scripting-gcloud.md](../references/config-auth/scripting-gcloud.md)
- [cheatsheet.md](../references/config-auth/cheatsheet.md)
