---
source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/create-and-delete-runtimeconfig-resources
---

# Creating and Deleting RuntimeConfig Resources

A Config resource stores variables as key-value pairs and must exist before variables are set. Create it with Deployment Manager (type `runtimeconfig.v1beta1.config`), `gcloud beta runtime-config configs create`, or the REST API. Deleting a config deletes everything it contains.

## Signature / Usage

Prerequisites: install gcloud, set up API access, enable the Runtime Configurator API (`runtimeconfig.googleapis.com`).

### Deployment Manager

```text
resources:
- name: [CONFIG_NAME]
  type: runtimeconfig.v1beta1.config
  properties:
    config: [CONFIG_NAME]
    description: [DESCRIPTION]
```

### gcloud

Adapted (not in the official docs): bracketed placeholders are written without brackets.

```bash
gcloud beta runtime-config configs create CONFIG_NAME --description DESCRIPTION
```

Response:

```text
Created [https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]].
```

### API

`POST` to:

```text
https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/
```

```json
{
   "name": "projects/[PROJECT_ID]/configs/[CONFIG_NAME]",
   "description": "[DESCRIPTION]"
}
```

### Delete (destructive)

Adapted (not in the official docs): bracketed placeholders are written without brackets.

```bash
gcloud beta runtime-config configs delete CONFIG_NAME
```

```text
Deleted [https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]].
```

API: `DELETE` to:

```text
https://runtimeconfig.googleapis.com/v1beta1/projects/[PROJECT_ID]/configs/[CONFIG_NAME]
```

## Options / Props

| Item | Description |
|------|-------------|
| `CONFIG_NAME` | Name of the config |
| `DESCRIPTION` | Optional description (`--description`) |
| `PROJECT_ID` | Project ID for the request |

## Notes

- Beta: subject to the "Pre-GA Offerings Terms"; gcloud commands are under `gcloud beta runtime-config` only (gcloud 593.0.0).
- The Deployment Manager method on this page relies on a discontinued service: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026." and "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down." (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19; see [deprecations.md](./deprecations.md)).
- Destructive: deleting a RuntimeConfig resource deletes all resources it contains, including all variables and waiters. Try it on a disposable project first.
- For a config that is part of a deployment, either update the deployment to omit the config and redeploy, or delete the deployment and its resources.
- Adapted from the official docs: the gcloud examples write `[CONFIG_NAME]` and `[DESCRIPTION]`, which zsh treats as glob patterns; the bash fences use the bare words. Quote a description that contains spaces.
- Required permissions are in the access-control page.
- Source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/create-and-delete-runtimeconfig-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [runtime-configurator.md](./runtime-configurator.md)
- [set-and-get-variables.md](./set-and-get-variables.md)
- [access-control.md](./access-control.md)
