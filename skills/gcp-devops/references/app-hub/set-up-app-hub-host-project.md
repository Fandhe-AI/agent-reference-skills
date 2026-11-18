---
source: https://docs.cloud.google.com/app-hub/docs/set-up-app-hub-host-project
---

# Set up an App Hub host project (Legacy)

A host project creates a multiple-project boundary in environments that already use App Hub: attach service projects to it and assign App Hub roles to manage application resources across them. It is a legacy setup model; for new deployments use an app-enabled folder to get all Application-centric Google Cloud features. A host project can attach to itself, but for a single-project setup the single-project approach is recommended.

## Signature / Usage

### Enable the App Hub API in the host project

```bash
gcloud components update
```

```bash
gcloud config set project HOST_PROJECT_ID
```

```bash
gcloud services enable apphub.googleapis.com \
    --project=HOST_PROJECT_ID
```

### Attach service projects

```bash
gcloud apphub service-projects add SERVICE_PROJECT_ID \
    --project=HOST_PROJECT_ID
```

### Grant App Hub roles (host project, then each service project)

```bash
gcloud projects add-iam-policy-binding HOST_PROJECT_ID \
    --member='user:EMAIL_ADDRESS' \
    --role='ROLE_NAME'
```

```bash
gcloud projects add-iam-policy-binding SERVICE_PROJECT_ID \
    --member='user:EMAIL_ADDRESS' \
    --role='ROLE_NAME'
```

### Remove service projects

```bash
gcloud apphub service-projects remove SERVICE_PROJECT_ID \
    --project=HOST_PROJECT_ID
```

## Options / Props

### Service project requirements

| Requirement | Detail |
|---|---|
| Organization | Service projects must be in the same organization as the host project. |
| Attachment | A service project can only be attached to one host project at a time. |
| Self-attachment | A host project can act as a service project for itself, but cannot be attached as a service project to any other host project. |
| Folders | Choose a host project and service projects that are not descendants of folders configured for application management, so all resources in a folder use the same setup model. |

### Required roles

| Role | Where |
|---|---|
| App Hub Admin (`roles/apphub.admin`) | On the host project and on each service project you want to attach. |

### Placeholders

| Placeholder | Meaning |
|---|---|
| `HOST_PROJECT_ID` | ID of the host project. |
| `SERVICE_PROJECT_ID` | ID of the service project to attach, remove or grant access in. |
| `EMAIL_ADDRESS` | Principal's email, format `username@yourdomain` (for example `my.user@example.com`). |
| `ROLE_NAME` | An App Hub IAM role, for example `roles/apphub.admin`. |

## Notes

- The host and service project model is distinct from Shared VPC; you cannot use a Shared VPC host project and its attached service projects for App Hub.
- The setup enables several APIs, but only App Hub and Application Monitoring support host projects; other enabled APIs might not work as expected in this legacy model.
- Add the host and service projects to a VPC Service Controls perimeter before you create applications (see https://docs.cloud.google.com/app-hub/docs/using-vpc-service-controls).
- Optionally add attached service projects to the host project's Cloud Monitoring metrics scope to view application system metrics; remove a service project from the metrics scope when you remove it from the host project.
- Removing a service project from a host project changes the registration status of its registered services and workloads to `detached`. Try it on a disposable project first.
- The role grants above are project-level IAM bindings, as the source shows; grant them only to the administrators who need them.
- Terraform: `google_apphub_service_project_attachment` (with a 120s `time_sleep` after creating the project). The source also shows Console and Terraform forms, omitted here.
- Source: https://docs.cloud.google.com/app-hub/docs/set-up-app-hub-host-project (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-app-hub.md](./set-up-app-hub.md)
- [set-up-app-hub-folder.md](./set-up-app-hub-folder.md)
- [register-resources.md](./register-resources.md)
