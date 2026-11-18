---
source: https://docs.cloud.google.com/vpc-service-controls/docs/architect-perimeters
---

# Design and architect service perimeters

Recommended VPC Service Controls deployment architectures for network administrators, security architects, and cloud operations teams running large production deployments. Plan enablement in advance and keep the design as simple as possible; avoid designs that use multiple bridges, perimeter network projects or a DMZ perimeter, and complex access levels.

## Signature / Usage

Create a dry-run configuration for an existing perimeter so its impact can be tested before enforcing (example from the gcloud help):

```bash
gcloud access-context-manager perimeters dry-run create \
    my-perimeter --resources="projects/0123456789" \
    --access-levels="accessPolicies/a_policy/accessLevels/a_level" \
    --restricted-services="storage.googleapis.com"
```

### Use a common unified perimeter

- A single large perimeter (common unified perimeter) gives the most effective protection against data exfiltration compared with multiple segmented perimeters, and lower management overhead.
- Inside one perimeter, services and network resources communicate freely subject to IAM and network permissions, so teams mainly manage north-south access (internet to resources inside the perimeter).
- With multiple smaller perimeters, teams must also manage east-west traffic between the perimeters.
- Layer the perimeter with other controls, for example ensuring resources in the VPC network have no direct internet egress.
- Perimeters do not replace IAM. Follow least privilege and IAM best practices.

### When to use multiple perimeters

- A separate perimeter for high-trust, non-obfuscated data (for example healthcare data) and one for lower-tier, de-identified data to share with external entities.
- A separate perimeter around regulated data if you want to comply with standards such as PCI DSS.
- When data sharing is a primary use case, for example sharing de-identified patient health data.
- One perimeter per independent third-party tenant (partners or customers) if data movement between tenants counts as exfiltration.

### Perimeter design

- Enable all protected services when you create a perimeter to reduce operational complexity and exfiltration vectors. Leaving an API unprotected needs review and justification.
- Pass every new project through the review and qualification process and include in the perimeter all projects that qualify.
- Make sure no VPC in the perimeter has a path to the private VIP. A network route to `private.googleapis.com` negates VPC Service Controls protection from insider data exfiltration.
- If you must allow a non-supported service, isolate it into a separate project or move the whole workload outside the perimeter.

### Review and qualify projects

Ask for each project:

- Does a component have a hard dependency on a service that VPC Service Controls does not support? Enforcement is unambiguous, so such a dependency might not function in a perimeter. Isolate the unsupported service into a separate project or move the workload out.
- Does the project contain only components with no sensitive data that do not consume sensitive data from other projects?

If the answer to either is yes, the source recommends not putting the project into a perimeter. You can work around this with the allowlist design (see the access-level design page), but minimize perimeter complexity.

## Notes

- Source: https://docs.cloud.google.com/vpc-service-controls/docs/architect-perimeters (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/dry-run/create (gcloud 593.0.0 help). The positional `PERIMETER` also needs an access policy (`--policy` or the `access_context_manager/policy` property). The source recommends testing a perimeter's impact in dry run mode before enforcing.

## Related

- [overview.md](./overview.md)
- [service-perimeters.md](./service-perimeters.md)
- [access-level-design.md](./access-level-design.md)
- [ingress-egress-rules.md](./ingress-egress-rules.md)
