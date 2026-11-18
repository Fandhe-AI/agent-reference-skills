---
source: https://docs.cloud.google.com/app-lifecycle-manager/overview
---

# App Lifecycle Manager overview

App Lifecycle Manager (previously known as SaaS Runtime) lets you store, host, manage, and monitor software as a service (SaaS) applications on Google Cloud. It manages Terraform deployments at scale, so you manage both your SaaS application and the infrastructure it runs on. Each component of an offering is defined by a Terraform configuration and modeled as a unit kind; you provision units (instances of a unit kind) for tenants and update them with versioned releases and configurable rollouts.

## Signature / Usage

### Create a SaaS offering (first step of the workflow)

```bash
gcloud app-lifecycle-manager saas create SAAS_OFFERING_NAME --location=global --locations=name=REGION_1 --locations=name=REGION_2
```

### End-to-end workflow

1. Design and package your application: author modular Terraform components and assemble a composite application template in Application Design Center, or package Terraform configurations into OCI blueprints.
2. Configure projects and service accounts: set up the producer and tenant projects and grant the required IAM roles to the App Lifecycle Manager service accounts.
3. Create and model your SaaS offering: create the offering with target regions, connect a composite template or define unit kinds, and configure variables and dependencies.
4. Provision units and deploy releases: deploy unit instances for each tenant, then deploy updates across locations with rollout strategies.

## Options / Props

### Core concepts

| Concept | Resource / gcloud group | Description |
|---------|-------------------------|-------------|
| SaaS offering | `Saas` / `saas` | Top-level resource for the SaaS product; defines the available regions where resources and units reside. |
| Composite templates and blueprints | Application Design Center / OCI image | Terraform configurations that specify the Google Cloud resources. Composite templates come from Application Design Center; blueprints are OCI artifacts stored in Artifact Registry. |
| Unit kind | `UnitKind` / `unit-kinds` | Template for an independently managed component (for example a database tier or an application cluster). Can declare dependencies and variable mappings. |
| Unit and tenant | `Unit`, `Tenant` / `units`, `tenants` | A unit is a deployed instance of a unit kind; units are typically grouped by tenant and provisioned into tenant projects through Infrastructure Manager and a user-managed actuation service account. |
| Release | `Release` / `releases` | Immutable snapshot of a unit kind that references a specific blueprint version and default input variables. |
| Rollout kind and rollout | `RolloutKind`, `Rollout` / `rollout-kinds`, `rollouts` | A rollout applies a release across a fleet of units, following the strategy, error budget and unit filter of its rollout kind. |
| Feature flags | flags | Runtime configuration controls that toggle features across units and tenants without redeploying infrastructure. |

### SaaS tenancy models

| Tenancy model | Isolation boundary | Implementation in App Lifecycle Manager | Best for |
|---|---|---|---|
| Silo (single-tenant) | Dedicated tenant project, VPC network, IAM policies, and `actuation_sa` per tenant | Separate tenant projects (`tenant_project_id`), dedicated units, and `ToMapping` with per-tenant lookup keys (`ignore_for_lookup: false`) | Regulated workloads, strict compliance or data residency, custom release schedules, and per-project billing |
| Pool (multi-tenant) | Logical separation within shared infrastructure and application units | Shared unit kinds, `ToMapping` matching shared scope keys (`ignore_for_lookup: false`), unit labels, and runtime feature flags | Cost-optimized high-density tiers, self-service onboarding, and uniform fleet updates |
| Hybrid (bridge) | Shared ingress or compute tier combined with isolated per-tenant workload or data projects | Mix of shared pooled unit kinds and per-tenant siloed unit kinds (`tenant_project_id` with `ignore_for_lookup: false`) linked by variable mappings | Tiered enterprise offerings and shared control planes with isolated customer datastores |

## Notes

- Former name: the source states App Lifecycle Manager was "previously known as SaaS Runtime". The API is `saasservicemgmt` (`saasservicemgmt.googleapis.com`) and the gcloud group is `app-lifecycle-manager`.
- Snippet taken from https://docs.cloud.google.com/app-lifecycle-manager/create-saas-offering (the `gcloud app-lifecycle-manager saas create` command).
- Silo: keep `ignore_for_lookup: false` (the default) on a per-tenant lookup key such as `tenant_project_id` in a `ToMapping` so a dedicated dependency unit is provisioned per tenant instead of reusing another tenant's unit. Pool: leaving it `false` lets dependent units look up and reuse shared dependency units when lookup keys match.
- Organize components that should be updated or scaled together into one Terraform configuration and model each grouping as a separate unit kind. When a composite template is attached to an offering, unit kinds, blueprints and releases are populated automatically; importing a new template revision deploys updates across units.
- Rollouts apply a new release to existing units through Terraform run by the actuation service account, which creates, modifies and deletes the resources defined in the configuration. Try releases and rollouts on a disposable project first.
- Distance: this is Google Cloud's managed SaaS lifecycle service; Terraform / Infrastructure Manager as a standalone tool is planned in `gcp-iac`. Application Design Center composite templates are covered in the `application-design-center` category of this skill.
- The source also shows architecture diagrams and links to a glossary, blueprints, a quickstart and the end-to-end tutorial `tutorials/adc-alm-deployment`.
- Source: https://docs.cloud.google.com/app-lifecycle-manager/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-saas-offering.md](./create-saas-offering.md)
- [model-saas-offering.md](./model-saas-offering.md)
- [deploy-saas-offering.md](./deploy-saas-offering.md)
- [update-saas-offering.md](./update-saas-offering.md)
- [rollout-strategies.md](./rollout-strategies.md)
- [tenants.md](./tenants.md)
- [variables.md](./variables.md)
- [service-accounts.md](./service-accounts.md)
- [regionalization.md](./regionalization.md)
- [flags-overview.md](./flags-overview.md)
