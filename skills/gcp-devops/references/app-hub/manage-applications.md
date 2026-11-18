---
source: https://docs.cloud.google.com/app-hub/docs/manage-applications
---

# Manage App Hub applications

List and view registered applications, update their attributes, and delete applications. To avoid configuration drift, use App Hub only to update or delete applications you registered directly; manage applications deployed from Application Design Center templates in Application Design Center (revise the template or create an application revision).

## Signature / Usage

### List applications

```bash
gcloud apphub applications list \
    --project=PROJECT_ID \
    --location=LOCATION
```

Adapted (not in the official docs): the trailing `\` after `--filter=FILTER_EXPRESSION` is removed because it continues the command onto an empty line.

```bash
gcloud apphub applications list \
    --project=PROJECT_ID \
    --location=LOCATION \
    --filter=FILTER_EXPRESSION
```

### View application details

```bash
gcloud apphub applications describe APPLICATION_NAME \
    --project=PROJECT_ID \
    --location=LOCATION
```

### Update application attributes

```bash
gcloud apphub applications update APPLICATION_NAME \
    --project=PROJECT_ID \
    --location=LOCATION \
    --display-name=DISPLAY_NAME \
    --criticality-type=CRITICALITY_LEVEL \
    --environment-type=ENVIRONMENT \
    --developer-owners=display-name=DEV_NAME,email=DEV_EMAIL \
    --operator-owners=display-name=OPERATOR_NAME,email=OPERATOR_EMAIL \
    --business-owners=display-name=BUSINESS_NAME,email=BUSINESS_EMAIL
```

### Delete an application

Unregister all services and workloads first, then:

```bash
gcloud apphub applications delete APPLICATION_NAME \
    --project=PROJECT_ID \
    --location=LOCATION
```

## Options / Props

### Required roles (on the management project)

| Task | Role |
|---|---|
| Update and delete applications | App Hub Editor (`roles/apphub.editor`) |
| View applications | App Hub Viewer (`roles/apphub.viewer`) |

### Values

| Placeholder | Meaning |
|---|---|
| `LOCATION` | `global` for global applications, a multi-region (`us` or `eu`) for multi-regional applications, or a specific region such as `us-east1` for regional applications. |
| `FILTER_EXPRESSION` | `--filter` expression on attributes, for example `attributes.environment.type=PRODUCTION`. |
| `CRITICALITY_LEVEL` | `MISSION_CRITICAL`, `HIGH`, `MEDIUM`, `LOW` |
| `ENVIRONMENT` | `PRODUCTION`, `STAGING`, `DEVELOPMENT`, `TEST` |
| `APPLICATION_NAME`, `PROJECT_ID`, `LOCATION` (update) | Required. Display name, criticality, environment and owners are optional and mutable; owner emails use the format `username@yourdomain`. |

## Notes

- Deleting an application requires that all its services and workloads are unregistered first. Deletion is destructive; try the sequence on a disposable project first.
- Terraform: deleting the `google_apphub_application` block and applying, or `terraform destroy`, also deletes the application.
- Adapted from the official docs: the filtered `gcloud apphub applications list` command ended with a trailing `\` after `--filter=FILTER_EXPRESSION`.
- The source also shows Console and Terraform forms, omitted here.
- Source: https://docs.cloud.google.com/app-hub/docs/manage-applications (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [register-resources.md](./register-resources.md)
- [set-up-app-hub.md](./set-up-app-hub.md)
- [best-practices.md](./best-practices.md)
