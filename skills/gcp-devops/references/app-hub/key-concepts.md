---
source: https://docs.cloud.google.com/app-hub/docs/key-concepts
---

# App Hub key concepts

Glossary of Application-centric Google Cloud terms: applications, application management boundary, app-enabled folder, attachment, component (service, workload, asset), host project (legacy), management project, service project (legacy), and the Application Design Center terms (catalog, design canvas, draft, space, template).

## Signature / Usage

### Describe an application

Snippet taken from https://docs.cloud.google.com/app-hub/docs/manage-applications (the key concepts page has no code block).

```bash
gcloud apphub applications describe APPLICATION_NAME \
    --project=PROJECT_ID \
    --location=LOCATION
```

## Options / Props

### App Hub terms

| Term | Definition |
|---|---|
| Application (App Hub application) | Logical grouping of services and workloads that together deliver a business function; services expose the functionality that workloads provide. In App Hub you define one by grouping existing resources as application components. |
| Application management boundary (boundary) | The collection of one or more projects or folders whose underlying resources App Hub can discover, group in applications and manage as components. Defined during setup by creating attachments within the management project. |
| App-enabled folder | A folder configured as an application management boundary; it contains a management project that manages the applications within it. |
| Attachment | Persistent configuration created within a management project that adds a project or folder as a member of the boundary. For single-project and folder attachments App Hub manages the integration automatically; all other attachments you create manually. |
| Component (application component) | A Google Cloud resource used to compose an application: a service, a workload, or an asset. In App Hub, resources within the boundary that can function as services or workloads are discovered, then registered. |
| Host project (Legacy) | Project that is the central management point; you typically enable the App Hub API on it and grant it permissions to other projects, then manually connect service projects. In this legacy model the host project is equivalent to the management project, and host plus service projects form a multiple-project boundary. |
| Management project | Project that centralizes application management tasks and metadata: you manage APIs, access control, billing, quotas, and define the boundary here. A single-project boundary is a standalone management project (the project is attached to itself). |
| Service | Component that is a network or API interface exposing functionality to clients, acting as an interface to workloads (for example a load balancer with a stable IP address and port, a Pub/Sub topic, or a Vertex AI model). |
| Service project (Legacy) | Project containing application components (VMs, GKE clusters, load balancers) that you manually connect to a host project. A service project can only be connected to one host project at a time. |
| Workload | Component that provides compute resources to run binary deployments and code for a discrete part of the business logic, for example a GKE deployment or a Compute Engine MIG for payment processing. May have functional type and extended metadata properties (AI agents). |

### Service registration types (`RegistrationType`, output-only, cannot be modified)

| Value | Meaning |
|---|---|
| `EXCLUSIVE` | Service can only be registered to one application. |
| `SHARED` | Service can be registered to multiple applications. Supports foundational components such as GKE clusters; even after being registered, it can have a `discovered` registration status for other applications. |

### Application Design Center terms

| Term | Definition |
|---|---|
| Asset | Component that provides supporting resources for an application, such as a service account for access control or a Secret Manager secret. |
| Catalog | Collection of templates that can be shared between spaces. |
| Design canvas | Interface for adding components and creating an application diagram. |
| Draft (application draft) | Instance created from a template that you customize and deploy. |
| Space | Dedicated area for a team to collaborate, create templates and deploy applications. |
| Template (application template) | Reusable, deployable architecture built from components: Standard (components and connections) or Composite (standard application templates, components, and connections). |

## Notes

- In Application Design Center you define applications by customizing and deploying an application draft created from an application template.
- Application Design Center supported assets / services / workloads are listed on the Application Design Center supported resources page (https://docs.cloud.google.com/application-design-center/docs/supported-resources).
- Source: https://docs.cloud.google.com/app-hub/docs/key-concepts (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [set-up-app-hub.md](./set-up-app-hub.md)
- [supported-resources.md](./supported-resources.md)
