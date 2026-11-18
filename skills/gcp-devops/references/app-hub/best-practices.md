---
source: https://docs.cloud.google.com/app-hub/docs/best-practices
---

# App Hub and Application Design Center best practices

Principles and strategies for modeling applications in App Hub and Application Design Center so they stay operable, governable and efficient: clear boundaries, business-capability applications, ownership metadata, regional locations, separate environments, and iterative refinement.

## Signature / Usage

### Attribute an application (owners, criticality, environment)

Snippet taken from https://docs.cloud.google.com/app-hub/docs/register-resources (the best practices page has no code block).

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

### Core principles

| Principle | Guidance |
|---|---|
| Define clear boundaries | Set the application management boundary logically for operations, monitoring, governance and troubleshooting; components should share a joint lifecycle or business value. Log, metrics and trace observability scopes should include the same projects as the boundary. |
| Reflect business capabilities | Define applications around business functions or end-to-end workflows, not technical layers. |
| Establish clear ownership and metadata | Assign environment (Production, Staging, Test, Development), criticality and owners to each application. |
| Design for evolution | Application Design Center templates: update the template and redeploy applications. |
| Iterate and refine | Review application definitions regularly; Cloud Hub shows available updates for applications deployed from templates. |

### Data model examples

| Pattern | Model |
|---|---|
| Microservices ecommerce system (for example `my-ecommerce-site`) | One application; microservices (Ad, Cart, Checkout as GKE deployments) as workloads; their network endpoints (load balancers) as services. Avoid registering each microservice as its own application. |
| Three-tier web application (for example `my-web-app`) | One application; services: frontend load balancer, internal load balancer, Cloud SQL or Spanner instance; workloads: MIGs or GKE deployments for frontend and backend. |

### Design and governance strategies

| Strategy | Guidance |
|---|---|
| Location | Prioritize regional applications; multi-regional for `us` / `eu` spans without global resources; global only when components are spread across continents or involve global resources such as a global external Application Load Balancer; otherwise decompose into separate regional applications. |
| Environments | Represent dev, staging and production as distinct applications (for example `my-app-dev`, `my-app-staging`, `my-app-prod`) for access control, policy and monitoring limits. |
| Teams | Align application management boundaries with the teams that develop and operate applications. |
| Lifecycle | Existing resources: register them in App Hub (optionally create an Application Design Center template from a running application). No existing resources: design and deploy from Application Design Center templates; components are registered in App Hub automatically. |

## Notes

- Application management boundaries differ from observability scopes: the boundary defines the projects whose resources you can use to design, create and manage applications; observability scopes let you view telemetry from multiple projects together.
- Application-centric product support varies by boundary type; see set-up-app-hub.md.
- Use Cloud Hub and Gemini Cloud Assist insights to refine applications.
- Source: https://docs.cloud.google.com/app-hub/docs/best-practices (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-app-hub.md](./set-up-app-hub.md)
- [global-regional-applications.md](./global-regional-applications.md)
- [manage-applications.md](./manage-applications.md)
- [key-concepts.md](./key-concepts.md)
