---
source: https://docs.cloud.google.com/config-connector/docs/how-to/import-export/export
---

# Export and import resources to Config Connector

Uses `config-connector export` to turn one existing Google Cloud resource into Config Connector YAML, which Config Connector can then acquire. If you already have the resource's YAML, acquire it as described in "Managing and deleting resources" instead.

## Signature / Usage

### Before you begin

Install the `config-connector` CLI, then set the default namespace (replace `NAMESPACE_NAME`):

```bash
kubectl config set-context --current --namespace NAMESPACE_NAME
```

Get the full resource name, for example:

```bash
gcloud pubsub topics describe sample-topic --format "value(name)"
```

### Export a resource

```bash
config-connector export RESOURCE_ID
```

Output resembles:

```yaml
apiVersion: pubsub.cnrm.cloud.google.com/v1beta1
kind: PubSubTopic
metadata:
  annotations:
    cnrm.cloud.google.com/project-id: my-example-project
  name: sample-topic
```

### Import into Config Connector

```bash
config-connector export RESOURCE_ID | kubectl apply -f -  --namespace NAMESPACE
```

Confirm that Config Connector manages it (`RESOURCE_TYPE` such as `pubsubtopic`; `RESOURCE_NAME` need not be the full name):

```bash
kubectl describe RESOURCE_TYPE RESOURCE_NAME
```

### Optional fields

```text
config-connector export RESOURCE_NAME \
    --output FILENAME \
    --oauth2-token TOKEN \
    --iam-format [policy | policymember | none] \
    --filter-deleted-iam-members [true | false] \
    --verbose
```

## Options / Props

| Flag | Values | Description |
|------|--------|-------------|
| `--output` | file or directory | Output path that disables standard output. A file receives all output; a directory receives one new file per resource. |
| `--oauth2-token` | OAuth2 token | OAuth2 access token used as the Google Cloud identity (as printed by `gcloud auth application-default print-access-token`). By default `config-connector` uses the Google Cloud CLI credentials. |
| `--iam-format` | `policy` (default), `policymember`, `none` | Kind of IAM resources output with the export (`IAMPolicy` or `IAMPolicyMember`). |
| `--filter-deleted-iam-members` | `true`, `false` (default `false`) | Whether to filter out deleted IAM principals. |
| `--verbose` | flag | Verbose logging. |

## Notes

- Not all resources support `export`; run `config-connector print-resources` for the list. If a resource is supported only by `bulk-export`, try filtering an Asset Inventory export with `bulk-export`.
- Full-resource-name lookups in the source: Cloud Asset Inventory search, the product's `describe` / `list` command, or the product documentation (for example "Getting a Cloud Key Management Service resource ID").
- Prefer the default Google Cloud CLI credentials over `--oauth2-token`; a token on the command line can be exposed in shell history and process lists.
- After acquisition, manage the resource as described in "Managing and deleting resources".
- Source: https://docs.cloud.google.com/config-connector/docs/how-to/import-export/export (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [import-export-overview.md](./import-export-overview.md)
- [bulk-export.md](./bulk-export.md)
