---
source: https://docs.cloud.google.com/app-lifecycle-manager/deploy-saas-offering
---

# Deploy a SaaS offering

Deploying means App Lifecycle Manager provisions the Google Cloud resources and deploys the SaaS application in the regions specified in the SaaS offering. It does so by creating a unit, which deploys the resources associated with a unit kind; units are provisioned in each region that is part of the offering.

## Signature / Usage

### Create a unit

```bash
gcloud app-lifecycle-manager units create my-unit \
    --location=us-central1 --unit-kind=my-unit-kind \
    --tenant=my-tenant --management-mode=user --labels=env=prod
```

### Provision the unit (Console path in the source)

1. On Units > Create a unit, select Provision.
2. Select the release for the unit kind versions you want to deploy.
3. Select the service account (the actuation service account).
4. Optional: Add tenant project variables, or other input variables (name, variable type, value).
5. Select Provision.

### View the deployed unit

On Units > Unit details, the State is Ready (or Provisioning while the operation is in progress); the Variables section shows output variables specified in the unit kind.

## Options / Props

| Name | Description |
|------|-------------|
| Unit name | Only lowercase letters, numbers, or hyphens. |
| SaaS offering | The offering created earlier. |
| Region | The region where resources or the application are deployed. |
| Unit kind | The unit kind that defines the resources or application. |
| Management mode: Unspecified | No management mode set. |
| Management mode: User | Units are deprovisioned manually; not deprovisioned automatically by App Lifecycle Manager. |
| Management mode: System | App Lifecycle Manager deprovisions dependent units when they are no longer needed. |
| Labels | Optional key-value labels on the resources. |

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/units/create (gcloud 593.0.0 help); the source page has no code. The gcloud help lists management modes `system` and `user`, and says the mode cannot be changed after the unit is created (beta help).
- Provision, upgrade and deprovision of a unit are unit operations (`gcloud app-lifecycle-manager unit-operations create ... --provision --provision-release=RELEASE`, `--deprovision`).
- Provisioning applies the unit kind's Terraform in the tenant project through the actuation service account; deprovisioning deletes those resources. Try on a disposable project first, and use management mode System only when you want automatic deprovisioning of dependent units.
- Example: a unit kind for a single VM provisions that VM in the regions defined in the offering.
- Before you begin: create the SaaS offering and the unit kinds. The Console flow (Unit details, Provision) is summarized above.
- Source: https://docs.cloud.google.com/app-lifecycle-manager/deploy-saas-offering (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [model-saas-offering.md](./model-saas-offering.md)
- [update-saas-offering.md](./update-saas-offering.md)
- [variables.md](./variables.md)
- [service-accounts.md](./service-accounts.md)
- [create-tenants.md](./create-tenants.md)
