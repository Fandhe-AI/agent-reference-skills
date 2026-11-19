---
source: https://docs.cloud.google.com/config-connector/docs/concepts/reconciliation
---

# Config Connector reconciliation strategy

Config Connector moves declared resources toward eventual consistency, so resources can be created and updated in any order. This page covers the reconcile interval annotation, the exponential backoff for failed reconciliations, and how mutable-but-unreadable and immutable fields behave.

## Signature / Usage

### Set the average reconcile interval

```yaml
cnrm.cloud.google.com/reconcile-interval-in-seconds: "3600"
```

Annotate every resource of one kind in a namespace (the source's script):

Adapted (not in the official docs): the variable expansions are quoted so values cannot be word-split.

```bash
#!/bin/bash

KIND=RESOURCE_KIND
NAMESPACE=RESOURCE_NAMESPACE
ANNOTATION_KEY="cnrm.cloud.google.com/reconcile-interval-in-seconds"
ANNOTATION_VALUE=RECONCILE_INTERVAL

kubectl annotate --overwrite --all "${KIND}" "${ANNOTATION_KEY}=${ANNOTATION_VALUE}" -n "${NAMESPACE}"
echo "Annotation added to all ${KIND} RESOURCE"
```

Replace `RESOURCE_KIND` (resource kind), `RESOURCE_NAMESPACE` (namespace of the resources) and `RECONCILE_INTERVAL` (seconds).

### Cap or stop retries after a failed reconciliation

```yaml
metadata:
  annotations:
    cnrm.cloud.google.com/backoff-max-delay-in-seconds: "1800"
```

```yaml
metadata:
  annotations:
    cnrm.cloud.google.com/backoff-max-delay-in-seconds: "0"
```

### Example event for an immutable-field change

```text
Warning  UpdateFailed  37m (x643 over 15d)    computeinstance-controller  Update call failed: the desired mutation for the following field(s) is invalid: [bootDisk.0.InitializeParams.0.Image networkInterface.0.NetworkIp]
```

## Options / Props

| Annotation | Values | Since | Description |
|------------|--------|-------|-------------|
| `cnrm.cloud.google.com/reconcile-interval-in-seconds` | non-negative integer (seconds); `0` stops periodic reconciliation | Config Connector 1.102 | Average interval for periodic reconciliation after the resource reaches `UpToDate`. Overrides "Config Connector Default Average Reconcile Interval In Seconds" on the resource reference page. Does not affect retry intervals when reconciliation fails. |
| `cnrm.cloud.google.com/backoff-max-delay-in-seconds` | `"1"` or greater: maximum delay in seconds between retries; `"0"`: stop automatic retries | Config Connector 1.160.0 | Only for resources managed by direct controllers. Terraform-based and DCL-based controllers ignore it and use the default 2-minute maximum. |

| Backoff fact | Value |
|--------------|-------|
| Initial delay | 250 milliseconds, doubling after each failed attempt (500 ms, 1 s, 2 s, ...) |
| Default maximum delay | 2 minutes |
| After `"0"` | Resource stays failed until a change triggers reconciliation (`spec`, `metadata.labels`, `metadata.annotations`, a referenced resource or `Secret`) |

## Notes

- Example: creating a `PubSubSubscription` before its `PubSubTopic` works; Config Connector waits until the topic exists. A `PubSubTopic` takes seconds; an `SQLInstance` plus `SQLDatabase` stays inconsistent for minutes.
- Errors are visible in the resource's Events.
- With a GitOps workflow (for example Config Sync) the annotate script may not apply; set the annotation in the source of truth instead.
- A reconcile interval of `0` disables drift correction but not actuation: a change to the resource `Spec` is still reconciled.
- Irreversible: setting the interval to `0` cannot be undone by changing the value back to a non-zero number. To revert, modify the resource spec together with the new interval, or abandon the resource (`cnrm.cloud.google.com/deletion-policy: "abandon"`) and recreate it with a non-zero interval.
- Custom backoff values, including `"0"`, do not apply to resources being deleted (`metadata.deletionTimestamp` set); failed deletions always retry with the default backoff so resources do not stick in `Terminating`.
- Mutable but unreadable fields (for example the password of a SQL user) are updated only when the custom resource is modified.
- Immutable fields: Config Connector does not delete and recreate the resource; it emits an `UpdateFailed` event and you must delete and recreate the resource yourself. Deleting a resource can destroy data, so try this on a disposable project first.
- Corrected from the official docs: the original script used unquoted `${KIND} ${ANNOTATION_KEY}=${ANNOTATION_VALUE} -n ${NAMESPACE}`.
- Source: https://docs.cloud.google.com/config-connector/docs/concepts/reconciliation (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [best-practices.md](./best-practices.md)
- [troubleshooting.md](./troubleshooting.md)
- [managing-fields-externally.md](./managing-fields-externally.md)
