---
source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/set-and-get-variables
---

# Setting and Getting Variables

Variables are key-value pairs in a RuntimeConfig resource. Create, update and read them with Deployment Manager (`runtimeconfig.v1beta1.variable`), `gcloud beta runtime-config configs variables`, or the REST API. Values are plaintext (`text`) or base64 (`value`).

## Signature / Usage

Keys can be flat or hierarchical (`status`, `users/jane-smith/favorite-color`, `users/total`). Only leaf keys can hold values; `users` and `users/jane-smith` cannot be assigned a value because keys exist beneath them.

### Create: Deployment Manager

```text
- name: [NAME]
  type: runtimeconfig.v1beta1.variable
  properties:
    parent: $(ref.[CONFIG_NAME].name)
    variable: [VARIABLE_KEY]
    [value | text]: [VARIABLE_VALUE]
```

### Create or update: gcloud

`--is-text` is optional: with it the value is stored as plaintext; without it gcloud base64-encodes the value.

Adapted (not in the official docs): bracketed placeholders are written as upper-case words without brackets.

```bash
gcloud beta runtime-config configs variables set VARIABLE_KEY \
    VARIABLE_VALUE --config-name CONFIG_NAME --is-text
```

Value from a file (gcloud base64-encodes it):

Adapted (not in the official docs): bracketed placeholders are written without brackets.

```bash
cat FILE_NAME | gcloud beta runtime-config configs variables set VARIABLE_KEY --config-name CONFIG_NAME
```

Example:

```bash
gcloud beta runtime-config configs variables set example-variable \
      my-test-value --config-name example-config
```

Response:

```text
Created [https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_KEY]].
```

### Create: API

`POST` to:

```text
https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables
```

Adapted (not in the official docs): the source payload lacks the comma after `name`, uses the key `"[value | text]"` and ends with a `#` comment; the comma is added, the `text` key is chosen and the comment is dropped (use `value` instead for a base64 string, never both).

```json
{
   "name": "projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_KEY]",
   "text": "[VARIABLE_VALUE]"
}
```

```json
{
"name": "projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_KEY]",
"value": "dGVhbA==",
"updateTime": "2016-04-11T21:49:00.773366134Z"
}
```

### Update: API

`PUT` to `https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_KEY]` with a body that sets either `value` or `text` to `[VARIABLE_VALUE]`. Response:

```json
{
  "name": "projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_KEY]",
  "value": "dGVhbA==",
  "updateTime": "2016-04-11T21:46:11.591713370Z",
  "state": "UPDATED"
}
```

### Get: gcloud

Adapted (not in the official docs): bracketed placeholders are written without brackets.

```bash
gcloud beta runtime-config configs variables get-value VARIABLE_KEY --config-name CONFIG_NAME
```

```bash
gcloud beta runtime-config configs variables list --config-name example-config --values
```

```text
NAME                         UPDATE_TIME                     VALUE
not-my-favorite-color/shade  2016-04-18T21:14:59.932428461Z  orange
not-my-favorite-food/group   2016-04-18T21:14:59.932428461Z  vegetables
```

### Get: API

`GET`:

```text
https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_KEY]
```

```json
{
  "name": "projects/[PROJECT_ID]/configs/[CONFIG_NAME]/variables/[VARIABLE_KEY]",
  "value": "[VARIABLE_VALUE]",
  "updateTime": "2016-04-11T21:49:00.773366134Z"
}
```

List with values:

```text
GET uri: https://runtimeconfig.googleapis.com/v1beta1/projects/myproject/configs/example-config/variables?returnValues=True
```

```json
{
  "variables": [
    {
      "name": "projects/compute-writers-project/configs/example-config/variables/not-my-favorite-color/shade",
      "updateTime": "2016-04-18T21:14:59.932428461Z",
      "value": "b3Jhbmdl"
    }
  ]
}
```

## Options / Props

| Item | Description |
|------|-------------|
| `VARIABLE_KEY` | Digits, letters, dashes and slashes; maximum length 256 characters |
| `value` | Base64-encoded string |
| `text` | Plaintext string; must be valid UTF-8 |
| `--config-name` | RuntimeConfig resource that holds the variable (for example `frontend-config`) |
| `--is-text` | Value is plaintext; otherwise gcloud base64-encodes it |
| `--fail-if-present` | Create only if the variable does not exist (default is to silently overwrite) |
| `--fail-if-absent` | Fail if the variable does not exist |
| `--values` (`list`) | Include values for variables you have `runtimeconfig.variables.get` permission on |

## Notes

- Beta: subject to the "Pre-GA Offerings Terms"; gcloud commands are under `gcloud beta runtime-config` only (gcloud 593.0.0).
- The Deployment Manager method on this page relies on a discontinued service: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026." and "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down." (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19; see [deprecations.md](./deprecations.md)).
- By default `variables set` silently overwrites an existing variable. Variables omitted from `list --values` are those without `get` permission, including ones where you have only `list`.
- The API returns base64 values; you must decode them yourself.
- Corrected from the official docs: the source create payload `"name": "..."` without a comma and the trailing `# Choose either 'value' or 'text' but not both` comment are invalid JSON; the gcloud examples write bracketed placeholders (`[VARIABLE_KEY]`), which zsh treats as glob patterns, so they are written without brackets in the bash fences. The source update section's bullet describes `VARIABLE_VALUE` as base64 only, while the payload allows `value` or `text`.
- To update in Deployment Manager, change the variable properties and make an update request; in gcloud, repeat `variables set`.
- In Deployment Manager, get a value with a `get` request to the resource or by viewing the manifest.
- Source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/set-and-get-variables (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-and-delete-runtimeconfig-resources.md](./create-and-delete-runtimeconfig-resources.md)
- [deleting-a-variable.md](./deleting-a-variable.md)
- [watching-a-variable.md](./watching-a-variable.md)
- [creating-a-waiter.md](./creating-a-waiter.md)
- [access-control.md](./access-control.md)
