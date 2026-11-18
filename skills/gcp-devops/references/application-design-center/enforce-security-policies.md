---
source: https://docs.cloud.google.com/application-design-center/docs/enforce-security-policies
---

# Enforce security policies

Preview. Integrating Application Design Center with Security Command Center lets you attach compliance frameworks to application templates and run assessments before deployment. Deployed applications inherit the frameworks of their templates, and Security Command Center monitors runtime resources for configuration drift and traces issues to a template revision.

## Signature / Usage

These commands use the `alpha` release track as in the source (the commands also exist in the GA group in gcloud 593.0.0).

### Attach a framework to an application template

Find available frameworks:

```bash
gcloud alpha design-center locations fetch-frameworks LOCATION \
    --project=PROJECT
```

Create the policy attachment:

```bash
gcloud alpha design-center spaces application-templates policies create POLICY \
    --application-template=APPLICATION_TEMPLATE \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE \
    --policy-type=compliance-framework \
    --policy-uri=POLICY_URI
```

### Run an assessment

```bash
gcloud alpha design-center spaces application-templates generate-assessment-report APPLICATION_TEMPLATE \
--project=PROJECT \
--location=LOCATION \
--space=SPACE
```

## Options / Props

### Service tiers

| Security Command Center tier | Assessment behavior |
|---|---|
| Standard | Templates and instances are validated against the Google Cloud Security Essentials framework |
| Premium or Enterprise | Security Essentials plus additional frameworks you create in Security Command Center and attach to templates for custom or regulatory compliance |

### Required roles (on the management project)

| Task | Role |
|---|---|
| Manage frameworks | Application Design Center Admin (`roles/designcenter.admin`) |
| Attach frameworks to templates and run assessments | Application Design Center User (`roles/designcenter.user`) |

### Placeholders

| Name | Description |
|---|---|
| `POLICY` | Name for the policy attachment, for example `my-security-policy` |
| `POLICY_URI` | URI of the Security Command Center framework, for example `organizations/12345/locations/global/frameworks/my-framework` |
| `LOCATION` | The application template region |

## Notes

- Security Command Center must be active for your organization. An administrator must deploy frameworks in Security Command Center before you can attach them.
- Assessments run at design time are optional, but misconfigurations should be resolved early because assessments are enforced during the application pre-deployment phase.
- After the application management boundary is set up, frameworks can be viewed and attached on the design canvas; the assessment produces a security scorecard that can be resolved manually or with Gemini assistance.
- The assessment output is a report based on the attached frameworks.
- Source: https://docs.cloud.google.com/application-design-center/docs/enforce-security-policies (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [design-application-templates.md](./design-application-templates.md)
- [setup.md](./setup.md)
- [overview.md](./overview.md)
