---
source: https://docs.cloud.google.com/iam/docs/tags-access-control
---

# Controlling Access with Tags

A tag is a key-value pair attached to a Google Cloud resource and inherited from the organization, folders, and project. Use tags in IAM Conditions to conditionally grant roles, or in deny policies to conditionally deny permissions.

## Signature / Usage

Conditions with permanent IDs:

```
resource.matchTagId('tagKeys/123456789012', 'tagValues/567890123456')

resource.hasTagKeyId('tagKeys/123456789012')

resource.matchTagId('tagKeys/123456789012', 'tagValues/567890123456') &&
    resource.hasTagKeyId('tagKeys/987654321098')
```

Conditions with namespaced names and short names:

```
resource.matchTag('123456789012/env', 'prod')

resource.hasTagKey('123456789012/env')

resource.matchTag('123456789012/env', 'prod') &&
    resource.hasTagKey('123456789012/project')
```

## Options / Props

| Identifier | Example | Notes |
|---|---|---|
| Permanent ID | `tagKeys/123456789012`, `tagValues/567890123456` | Globally unique, never reused; safest, but allow policies must be updated if you recreate keys or values |
| Short name | `env`, `prod` | Unique within the project or organization (key) or the key (value) |
| Namespaced name | `123456789012/env` (organization), `myproject/env` (project) | Short name plus organization ID or project ID |

## Notes

- Common use cases: environments (`environment: dev` / `prod`), component types (`component: frontend` / `batch`), project codenames (`project: atlas`).
- Choosing identifiers: namespaced name plus short name is easier for experiments and declarative tools such as Terraform, but if a key or value is deleted and recreated with a different meaning, the condition applies to the new one and may grant unintended access. Permanent IDs minimize that risk.
- Do not put sensitive information (such as PII) in tags.
- Some parts of the Google Cloud console do not recognize role bindings with tag-based conditions and may block actions; use the gcloud CLI instead.
- Tag definitions are created at organization or project level via Resource Manager.
- Source: https://docs.cloud.google.com/iam/docs/tags-access-control
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [limit-role-granting.md](./limit-role-granting.md)
- [troubleshoot-org-policies.md](../iam-troubleshooting/troubleshoot-org-policies.md)
