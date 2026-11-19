---
source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/deleting-a-variable
---

# Deleting a Variable

Delete a single variable, or all variables under a path, with `gcloud beta runtime-config configs variables unset` or the REST `DELETE` method. In Deployment Manager, remove the variable from the deployment instead.

## Signature / Usage

### gcloud

Adapted (not in the official docs): bracketed placeholders are written without brackets.

```bash
gcloud beta runtime-config configs variables unset VARIABLE_KEY --config-name CONFIG_NAME
```

Add `--recursive` to delete every variable under a path. Response:

```text
Deleted [https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_KEY].
```

### API

`DELETE`:

```text
https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_KEY]
```

Adapted (not in the official docs): the source sends `{"recursive": true}` as a payload; the Discovery document for `runtimeconfig.v1beta1` defines `recursive` as a query parameter, so recursive deletion is shown as a query parameter.

```text
https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_KEY]?recursive=true
```

A successful call returns an empty response.

## Options / Props

| Item | Description |
|------|-------------|
| `VARIABLE_KEY` | Variable (or path prefix with `--recursive`) to delete |
| `--config-name` | Config the variable belongs to |
| `--recursive` | Delete all variables under the path |
| `--fail-if-absent` | Fail if the variable does not exist (in gcloud 593.0.0 help) |

## Notes

- Beta: subject to the "Pre-GA Offerings Terms"; gcloud commands are under `gcloud beta runtime-config` only (gcloud 593.0.0).
- The Deployment Manager method on this page relies on a discontinued service: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026." and "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down." (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19; see [deprecations.md](./deprecations.md)).
- Destructive: recursive deletion removes every variable under the prefix. Try it on a disposable project first.
- Corrected from the official docs: the source text says to use the `variables delete` command but shows `variables unset`; `unset` exists in gcloud 593.0.0 help and `delete` does not. The bracketed placeholders (`[VARIABLE_KEY]`) of the gcloud example are written as bare words in the bash fence. The source's `recursive` request payload is replaced by the query parameter (Discovery `recursive`, location `query`).
- To delete a variable in a deployment, either update the deployment to omit it and redeploy, or delete the deployment and its resources.
- Source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/deleting-a-variable (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-and-get-variables.md](./set-and-get-variables.md)
- [create-and-delete-runtimeconfig-resources.md](./create-and-delete-runtimeconfig-resources.md)
