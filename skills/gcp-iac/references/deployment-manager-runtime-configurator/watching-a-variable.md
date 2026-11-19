---
source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/watching-a-variable
---

# Watching a Variable

The `variables().watch` method watches a variable for 60 seconds and returns if its value changes. Use `gcloud beta runtime-config configs variables watch` or the REST `:watch` method; Deployment Manager does not support watchers (use a waiter).

## Signature / Usage

### gcloud

Adapted (not in the official docs): bracketed placeholders are written without brackets.

```bash
gcloud beta runtime-config configs variables watch VARIABLE_KEY --max-wait TIMEOUT_SEC --config-name CONFIG_NAME
```

### API

`POST`:

```text
https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_KEY]:watch
```

Optional payload:

```json
{
"newerThan": "[TIMESTAMP]"
}
```

Timestamp example (RFC 3339, UTC "Zulu"):

```text
2014-10-02T15:01:23.045123456Z
```

## Options / Props

| Item | Description |
|------|-------------|
| `--max-wait` | Seconds to wait; default and maximum 60 |
| `--config-name` | RuntimeConfig resource |
| `--newer-than` | Return immediately if the stored variable is newer than this time (in gcloud 593.0.0 help) |
| `newerThan` | If the variable's current timestamp is newer, the method returns immediately; use it to avoid missing changes between `watch()` calls |

### Results

| Case | Result |
|------|--------|
| Value changes | Returns the variable with its applicable state |
| No change within 60 seconds | Returns with `state=VARIABLE_STATE_UNSPECIFIED` |
| Variable deleted | Returns `state=DELETED` and the last known value |

## Notes

- Beta: subject to the "Pre-GA Offerings Terms"; gcloud commands are under `gcloud beta runtime-config` only (gcloud 593.0.0).
- Adapted from the official docs: the gcloud example writes bracketed placeholders (`[VARIABLE_KEY]`), which zsh treats as glob patterns; the bash fence uses the bare words. `--max-wait` takes a duration such as `60s`.
- Deployment Manager: "This is not supported in Deployment Manager. Create a waiter instead."
- Variable states are listed in the REST reference: https://docs.cloud.google.com/deployment-manager/runtime-configurator/reference/rest/v1beta1/projects.configs.variables#VariableState
- Source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/watching-a-variable (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-and-get-variables.md](./set-and-get-variables.md)
- [creating-a-waiter.md](./creating-a-waiter.md)
- [runtime-configurator.md](./runtime-configurator.md)
