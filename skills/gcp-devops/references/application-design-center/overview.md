---
source: https://docs.cloud.google.com/application-design-center/docs/overview
---

# Application Design Center overview

Application Design Center (App Design Center, ADC) lets platform and development teams design and deploy applications on Google Cloud. Platform teams create and share templates that follow organizational standards; developers select a verified template and deploy it. Spaces isolate teams, components are the building blocks, templates carry governance, catalogs share templates across spaces, and application drafts become applications when deployed.

## Signature / Usage

### Concept map

- Space: an exclusive area where a platform team designs templates and deploys applications; templates are shared with other spaces by adding them to a catalog.
- Components: Google components (best-practice, secure defaults) or imported components (your own Terraform modules). Component kinds: Assets (supporting resources such as service accounts or secrets), Services (network or API interfaces such as load balancers or databases), Workloads (running applications such as containers or VM groups).
- Templates: Application template (Standard = components and connections; Composite = standard templates, components and connections), Catalog template (added to the space's catalog), Shared template (shared into your space; development teams can modify and deploy it).
- Catalogs: Default catalog (templates a platform team shares with other spaces) and Shared catalog (shared to your space from another space).
- Application draft: a customized template ready to deploy; once deployed it becomes an application.

### Team collaboration workflow

1. Set up collaboration: administrators create spaces and assign team access.
2. Design templates: platform engineers create and verify templates with guardrails and security policies.
3. Enable self-service: publish verified templates to a catalog.
4. Deploy: developers select a template, customize an application, assess against security policies, and deploy.
5. Manage and iterate: monitor performance and apply template updates.

### Example: list spaces with the gcloud CLI

The source has no code; this command comes from the gcloud help (see Notes).

```bash
gcloud design-center spaces list --project=my-project \
    --location=us-central1
```

## Options / Props

### Design and deployment approaches

| Your goal | Primary benefit | Approach |
|---|---|---|
| Visualize your architecture | Real-time suggestions and visual layout | Design canvas |
| Rapid prototyping | AI-driven starting points from requirements | Natural language chat (Gemini Cloud Assist) |
| Automation and integration | Repeatable, programmable workflows | REST API (`https://docs.cloud.google.com/application-design-center/docs/reference/rest`) |
| Command-line management | Efficient terminal-based operations | Google Cloud CLI (`gcloud design-center`) |

### Application use cases named in the source

| Use case | Description |
|---|---|
| Web application platforms | Scalable three-tier architectures separating frontend, backend and data layers |
| Microservice modernization | Containerized services that scale automatically |
| AI-powered experiences | Generative AI templates such as Retrieval-Augmented Generation (RAG) |

## Notes

- Validating application designs against security policies defined in Security Command Center (security frameworks attached to templates, security scorecard) is Preview; see the enforce-security-policies page.
- Template updates: when requirements change, update a template and notify developers to apply the changes.
- The source also shows a video and a concept diagram, which are omitted.
- Source: https://docs.cloud.google.com/application-design-center/docs/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/list (gcloud 593.0.0 help).

## Related

- [setup.md](./setup.md)
- [manage-spaces.md](./manage-spaces.md)
- [design-application-templates.md](./design-application-templates.md)
- [manage-catalogs.md](./manage-catalogs.md)
- [supported-resources.md](./supported-resources.md)
- [enforce-security-policies.md](./enforce-security-policies.md)
