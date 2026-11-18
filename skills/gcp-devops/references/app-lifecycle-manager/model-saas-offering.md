---
source: https://docs.cloud.google.com/app-lifecycle-manager/model-saas-offering
---

# Model and package units of deployment

Model a SaaS offering by creating one unit kind for each component you want to manage independently (a single unit kind for the whole offering is also allowed). In the source's flow, unit kinds are defined in Application Design Center composite templates, either created from App Lifecycle Manager or connected from an existing space.

## Signature / Usage

### Decide the model

- Review dependencies between components (for example, an application on a shared Kubernetes cluster suggests a unit kind for the shared cluster).
- Consider release and maintenance cycles; components managed together, such as the infrastructure, can share one unit kind.
- Example: one unit kind for infrastructure such as a VM, and one for the application deployed onto it.

### Create a unit kind with gcloud

```bash
gcloud beta app-lifecycle-manager unit-kinds create flags-unit-kind \
  --project=PROJECT_ID \
  --location=global \
  --saas=flags-quickstart-saas-offering
```

## Options / Props

| Name | Description |
|------|-------------|
| Template ID | Must start with a lowercase letter followed by up to 30 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. |
| Template name | Optional. |
| Description | Optional short description of the template. |
| Space / Composite application template / Revision | Selected when connecting an existing composite template; the chosen revision populates the offering's unit kinds. |

## Notes

- Before you begin: create the SaaS offering, have service accounts with the required permissions, and have a composite template for each offering.
- Creating a template takes a few minutes. After connecting an existing template, App Lifecycle Manager imports it from Application Design Center and the Unit kinds tab is populated with the unit kinds it defines.
- Snippet taken from https://docs.cloud.google.com/app-lifecycle-manager/flags/flags-quickstart (the source page has no code). `unit-kinds create` also takes `--dependencies` and `--input-variable-mappings` / `--output-variable-mappings`; see the variables page. The command exists in the GA and `beta` tracks (`--saas` is required); the quickstart uses `beta`.
- The source describes only Console steps (App Lifecycle Manager > SaaS offerings > Create new template / Connect existing template); they are omitted here.
- Source: https://docs.cloud.google.com/app-lifecycle-manager/model-saas-offering (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-saas-offering.md](./create-saas-offering.md)
- [deploy-saas-offering.md](./deploy-saas-offering.md)
- [variables.md](./variables.md)
- [service-accounts.md](./service-accounts.md)
