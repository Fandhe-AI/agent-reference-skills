---
source: https://docs.cloud.google.com/app-hub/docs/overview
---

# App Hub overview

App Hub groups and manages Google Cloud infrastructure as applications across multiple projects. It is the central registry (single source of truth for ownership, dependencies and business context) and provides the application data model for Application-centric Google Cloud. Its data model is applications, services and workloads, registered inside an application management boundary.

## Signature / Usage

### Create an application

Snippet taken from https://docs.cloud.google.com/app-hub/docs/register-resources (the overview page has no code block).

```bash
gcloud apphub applications create APPLICATION_NAME \
  --project=PROJECT_ID \
  --scope-type=SCOPE_TYPE \
  --location=LOCATION \
  --display-name=DISPLAY_NAME \
  --criticality-type=CRITICALITY \
  --environment-type=ENVIRONMENT \
  --developer-owners=display-name=DEV_NAME,email=DEV_EMAIL \
  --operator-owners=display-name=OPERATOR_NAME,email=OPERATOR_EMAIL \
  --business-owners=display-name=BUSINESS_NAME,email=BUSINESS_EMAIL
```

## Options / Props

### Concepts: App Hub definition vs common usage

| Concept | App Hub definition | Common industry usage |
|---|---|---|
| Application | A logical grouping of services and workloads that together deliver a business function. | Can refer to a single deployable unit, a codebase, or a broad system. |
| Service | A network or API interface that exposes functionality to clients and can route requests to workloads, such as a load balancer. Some services, such as GKE clusters, are shared services that you can register to multiple applications (see registration type). | Often a microservice, a deployable component, or binary code with its own business logic and data. |
| Workload | The compute resources where the binary deployments of your application are installed, for example a GKE deployment or a Compute Engine managed instance group (MIG) running the code of an AI agent. | Any process or component that consumes computing resources. |

### Application locations

| Location type | Groups |
|---|---|
| Global applications | Services and workloads from multiple Google Cloud regions. |
| Multi-regional applications | Services and workloads within a multi-region (`us` or `eu`) and its constituent regions. |
| Regional applications | Services and workloads that all reside within a single region. |

### Registration status

| Status | Meaning |
|---|---|
| Discovered | Can be registered: part of the application management boundary and not registered to another application (or can be registered to multiple applications). Also covers services and workloads you delete or unregister but can register again. Registered shared services can still be `discovered` for other applications. |
| Registered | Registered to an application and managed by App Hub. Only discovered services and workloads can be registered. |
| Detached | Registered, but App Hub can no longer manage or monitor them because the underlying resource is deleted, or a project or folder containing it is moved out of the boundary. They stay in the application until you unregister them. |

### Properties (immutable, discovered automatically)

| Property | Stage | Description |
|---|---|---|
| Registration type | Preview | Output-only, for services: `EXCLUSIVE` (register to a single application) or `SHARED` (register to multiple applications; a shared service). |
| Functional type | Preview | Output-only: known function of a service or workload. Example: an AI agent deployed through Vertex AI Agent Engine is classified `AGENT`. |
| Extended metadata | Preview | Schema-driven key-value field with type-specific data. Example: `AGENT` workloads can carry `apphub.googleapis.com/AgentProperties` (compatible with the A2A Agent Card). |
| Identity | Preview | Output-only: service account or managed workload identity name. |

### Attributes (mutable, user-defined)

| Attribute | Supported values |
|---|---|
| Owners | `developer_owners` (development and coding), `operator_owners` (runtime and operations integrity), `business_owners` (quality and user expectations). |
| Criticality | `MISSION_CRITICAL`, `HIGH`, `MEDIUM`, `LOW` |
| Environment | `PRODUCTION`, `STAGING`, `DEVELOPMENT`, `TEST` |

### Application management boundary models

| Model | Stage | Description |
|---|---|---|
| Folder-level boundary | Recommended | A Google Cloud folder is the boundary; all projects in the folder are included. |
| Single-project boundary | Preview | One project is the boundary, configured as a standalone management project. |
| Multiple-project boundary with a host project | Legacy | Host project (App Hub API enabled) plus manually connected service projects. |

## Notes

- Registering at once is limited to 10 services and workloads at a time.
- You cannot set or modify attributes for shared services.
- Location choice affects which services and workloads you can register and data residency; it cannot be changed after the application is created (see global-regional-applications.md).
- Application metadata ingestion of supported resources' `Service` metadata is always on; the ingested metadata is accessible only when you explicitly enable App Hub.
- Cloud Hub, Gemini Cloud Assist and Google Cloud Observability application monitoring use the App Hub data model.
- Console and Terraform forms of application creation are omitted; see register-resources.md.
- Source: https://docs.cloud.google.com/app-hub/docs/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-concepts.md](./key-concepts.md)
- [set-up-app-hub.md](./set-up-app-hub.md)
- [supported-resources.md](./supported-resources.md)
- [global-regional-applications.md](./global-regional-applications.md)
- [register-resources.md](./register-resources.md)
