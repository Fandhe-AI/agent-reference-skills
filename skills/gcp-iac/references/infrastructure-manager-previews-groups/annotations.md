---
source: https://docs.cloud.google.com/infrastructure-manager/docs/annotations
---

# Annotations and labels

Infrastructure Manager lets you attach optional key-value metadata to deployments (and previews) as annotations and labels to organize, track, and filter them.

## Signature / Usage

Adapted (not in the official docs): the source writes `--annotation=`; the gcloud 593.0.0 flag on `infra-manager previews create` and `deployments apply` is `--annotations`.

```text
--annotations="appVersion=v.1.2.3,environment=production"
```

## Options / Props

| Constraint | Value |
|---|---|
| Key and value size | Both must be 128 bytes or less. |
| Allowed characters | Lowercase letters, numeric characters, underscores, and dashes. |
| Key start | Must start with a lowercase letter or international character. |
| Encoding | UTF-8; international characters are allowed. |

## Notes

- Annotations are free-form key-value text for non-identifying information, typically used by client tools to store arbitrary data; labels are typically used to organize resources (for example, to apply logic based on label selection). Labels follow the same limits as annotations.
- Corrected from the official docs: the source example writes `--annotation="appVersion=v.1.2.3,environment=production"`; the flag in the gcloud help is `--annotations`.
- Preview annotations and labels cannot be updated after creation (gcloud help).
- Use them when creating or updating deployments, or previewing a deployment, to monitor deployments or query sets of information.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/annotations (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [preview-deployment.md](./preview-deployment.md)
