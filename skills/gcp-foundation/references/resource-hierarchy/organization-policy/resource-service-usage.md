---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-resources
---

# Restricting Resource Service Usage (`gcp.restrictServiceUsage`)

The Restrict Resource Service Usage constraint controls which Google Cloud services can be used within an organization, folder, or project.

## Signature / Usage

```yaml
name: organizations/ORGANIZATION_ID/policies/gcp.restrictServiceUsage
spec:
  rules:
  - values:
      deniedValues:
      - file.googleapis.com
      - bigquery.googleapis.com
      - storage.googleapis.com
```

```bash
gcloud org-policies set-policy /tmp/policy.yaml
```

Restrict untagged resources (deny a service unless the project has the governance tag; build the condition in the console Condition editor):

```text
!resource.matchTag("012345678901/sqlAdmin", "enabled")
```

Error message when a denied service is used:

```
Request is disallowed by organization's constraints/gcp.restrictServiceUsage
constraint for projects/PROJECT_ID attempting to use service
storage.googleapis.com.
```

## Options / Props

| Mode | Behavior |
|------|----------|
| Denylist | Services not denied are allowed |
| Allowlist | Services not allowed are denied |

The two modes are mutually exclusive. Values are service names such as `storage.googleapis.com`.

## Notes

- Only enforceable on services whose resources are direct descendants of an organization, folder, or project (e.g. Compute Engine, Cloud Storage). Essential dependencies (IAM, Cloud Logging, Cloud Monitoring) are excluded; see the supported services page.
- Updates apply immediately to all access to in-scope resources (eventually consistent). Roll out carefully, e.g. conditionally by tag, and test with dry-run (this constraint is dry-run capable).
- Restricting a service also restricts services with a direct dependency that manage the same customer resources (e.g. restricting Compute Engine restricts GKE).
- Console availability: restricted services cannot be reached through the menu, do not appear in search, and show an error on direct links.
- Denials are logged under the billable Policy Denied category of Cloud Audit Logs.
- Governance-tag pattern: with the `!resource.matchTag(...)` condition, projects must carry the tag (attached or inherited) before the API can be used.
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-resources
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0. The official page's "Example Cloud Audit Logs" section is empty in the retrieved copy.

## Related

- [tags-condition.md](./tags-condition.md)
- [dry-run-policy.md](./dry-run-policy.md)
- [../service-usage/enable-disable-services.md](../service-usage/enable-disable-services.md)
