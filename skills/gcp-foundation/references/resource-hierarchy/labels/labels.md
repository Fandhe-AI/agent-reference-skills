---
source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-labels
---

# Labels (Projects) and Labeling Best Practices

Labels are key-value metadata for organizing resources and tracking costs. Project labels are managed through Resource Manager; they apply to projects only and do not propagate to child resources. Labels are not usable in policy conditions (use tags for that).

## Signature / Usage

Create a project with labels, or update labels:

```
gcloud projects create PROJECT_ID \
    --labels=KEY1=VALUE1,KEY2=VALUE2
```

```
gcloud projects update PROJECT_ID \
    --update-labels=KEY1=VALUE1,KEY2=VALUE2
```

```
gcloud projects update PROJECT_ID \
    --remove-labels=KEY1,KEY2
```

```
gcloud projects update PROJECT_ID \
    --clear-labels
```

REST create:

```
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_ID",
    "displayName": "PROJECT_NAME",
    "labels": {
      "environment": "development"
    }
  }' \
  "https://cloudresourcemanager.googleapis.com/v3/projects"
```

REST update with `projects.patch`:

```
curl -X PATCH \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "labels": {
      "environment": "development"
    }
  }' \
  "https://cloudresourcemanager.googleapis.com/v3/projects/PROJECT_ID?updateMask=labels"
```

## Options / Props

| Requirement | Value |
|-------------|-------|
| Labels per resource | Up to 64 |
| Key | 1-63 characters, cannot be empty, must start with a lowercase letter or international character, unique within the resource |
| Value | 0-63 characters (may be empty) |
| Characters | Lowercase letters, digits, underscores, dashes; UTF-8; international characters allowed |
| Permissions | `resourcemanager.projects.update` (add / modify via `projects.patch`); `resourcemanager.projects.get` (view) |

Example standard label set (best practices): `environment` = prod / dev / staging; `data-classification` = public / internal-only / confidential / restricted / na; `cost-center`; `team`; `component` = frontend / cache / backend / database; `application`; `compliance` = pci / hipaa. A policy table per key records value set, stakeholder, target resource, and exceptions (for example `altostrat-environment` = prod, sb1, staging, dev, tools; stakeholder Finance).

## Notes

- Folders and organizations do not support labels. Labels on a project are not inherited by service resources; label service resources (Compute Engine, Cloud Storage, Pub/Sub topics / subscriptions) individually. Egress billing SKUs do not support labels.
- Labels flow to billing for cost breakdown; enable billing export to BigQuery to group costs by label (for example `costcenter`, `service`, `environment`). When filtering billing by label keys, labels applied to a project cannot be selected.
- Do not put sensitive information or PII in labels. Avoid many unique labels (timestamps, per-call values); keep to about ten standard keys; apply labels programmatically (scripts, Terraform) with a consistent case-sensitive format; allow optional non-standard labels such as `version:5_0_1`, `replica:primary` (the official page writes `version:5.0.1`, but label values cannot contain periods; corrected here).
- Old network tags on a VM appear as labels without a value.
- Labels vs tags: labels are queryable annotations; tags (IAM-governed, inherited) can condition policies (see `../organization-policy/tags-condition.md`).
- Project labels can also be edited in the console Labels page or Manage resources info panel (multi-select supported).
- Source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-labels
- Source: https://docs.cloud.google.com/resource-manager/docs/labels-overview
- Source: https://docs.cloud.google.com/resource-manager/docs/best-practices-labels
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [../projects-folders/projects.md](../projects-folders/projects.md)
- [../organization-policy/tags-condition.md](../organization-policy/tags-condition.md)
