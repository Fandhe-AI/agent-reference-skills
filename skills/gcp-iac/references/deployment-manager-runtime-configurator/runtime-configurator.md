---
source: https://docs.cloud.google.com/deployment-manager/runtime-configurator
---

# Runtime Configurator Overview

Runtime Configurator (Beta) stores a hierarchy of key-value pairs in Google Cloud so services can be configured dynamically, report state, send change notifications and share information between tiers. It offers a Watcher service and a Waiter service and is used through the gcloud CLI or as a standalone API.

## Signature / Usage

Variable keys are hierarchical; the full resource name has this format:

```text
projects/[project_id]/configs/[CONFIG_ID]/variables/[VARIABLE_NAME]
```

Sample variable keys:

```text
webserver-1/users/name
webserver-1/users/favorite_color
```

Cardinality example from the source: for the path `/foo` with the number of paths set to 2, the setup `/foo/variable1 = "value1"`, `/foo/variable2 = "value2"`, `/bar/variable3 = "value3" # Not /foo path` meets the condition.

## Options / Props

| Concept | Description |
|---------|-------------|
| Config resource | Contains a hierarchical list of variables; create separate configs per environment (prod, dev, test), per application tier (back end, front end) or per entity (for example one per application user) |
| Variables | Key-value pairs belonging to a RuntimeConfig resource; can be set, got and watched |
| Watchers | `watch()` returns when the variable changes, the watcher times out, or the watcher is deleted |
| Waiters | Watch a path prefix and return when the number of variables under it reaches a number (Cardinality condition); have a success and a failure condition; creation returns an operation to poll |
| Waiter operation completes when | the `success` condition is met, the `failure` condition is met, or the timeout deadline in the request is reached |

## Notes

- Beta: subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support. gcloud commands exist only under `gcloud beta runtime-config` in gcloud 593.0.0.
- A waiter is suited to startup scenarios where a deployment pauses until a certain number of services is running.
- Quotas: see https://cloud.google.com/deployment-manager/pricing-and-quotas#runtime_configurator. REST reference: https://docs.cloud.google.com/deployment-manager/runtime-configurator/reference/rest. Machine-generated gcloud and REST pages for this API are covered separately.
- Source: https://docs.cloud.google.com/deployment-manager/runtime-configurator (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-and-delete-runtimeconfig-resources.md](./create-and-delete-runtimeconfig-resources.md)
- [set-and-get-variables.md](./set-and-get-variables.md)
- [watching-a-variable.md](./watching-a-variable.md)
- [creating-a-waiter.md](./creating-a-waiter.md)
- [access-control.md](./access-control.md)
