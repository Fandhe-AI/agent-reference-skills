---
source: https://docs.cloud.google.com/config-connector/docs/concepts/managing-fields-externally
---

# Manage fields externally

Fields left unspecified in a Config Connector spec take values from the Google Cloud API unless they are not readable. Such fields are "externally managed" because Kubernetes is not the source of truth. This page explains the behavior with and without server-side apply, list fields, and the `state-into-spec` annotation.

## Signature / Usage

### Without server-side apply

Applied configuration:

```yaml
spec:
    foo: "foo"
```

Object in the api-server after the first reconciliation, when `bar` is `baz` in the Google Cloud API:

```yaml
# object in the api-server
spec:
    foo: "foo"
    bar: "baz"  # populated by first reconciliation
```

If `bar` is later changed to `baz-2` directly in Google Cloud, Config Connector corrects it back to `baz`:

```yaml
# object in the api-server
spec:
    foo: "foo"
    bar: "baz"  # still the originally populated value, and overrides the Google Cloud value
```

### Let list fields be managed externally

```yaml
metadata:
  annotations:
    cnrm.cloud.google.com/state-into-spec: absent
```

## Options / Props

| Setting | Behavior |
|---------|----------|
| Server-side apply enabled | Values of externally managed fields in the object are updated continuously to match the Google Cloud resource. A field present in the applied spec is not externally managed; if the field is removed it becomes externally managed. Does not hold for list fields. |
| Server-side apply not enabled | Unspecified fields are populated from the Google Cloud API on first reconciliation and Config Connector enforces those initial values. |
| List fields | Cannot be managed externally by default; Config Connector reads the list at apply time, treats it as desired state and reverts outside changes. |
| `cnrm.cloud.google.com/state-into-spec: absent` | Config Connector ignores list fields not specified in your configuration, leaving them externally managed. Not supported for all resources; check the resource reference page. |

## Notes

- For CRDs added in version 1.114.0 and later, externally managed fields are not populated by default.
- Caveat: fields that are both managed by Config Connector and automatically updated by external services (autoscaling or auto-updating fields) can trigger endless updates. Treat them as externally managed by enabling server-side apply for the resource and leaving the field out of your config file.
- Source: https://docs.cloud.google.com/config-connector/docs/concepts/managing-fields-externally (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [reconciliation.md](./reconciliation.md)
- [managing-conflicts.md](./managing-conflicts.md)
- [troubleshooting.md](./troubleshooting.md)
