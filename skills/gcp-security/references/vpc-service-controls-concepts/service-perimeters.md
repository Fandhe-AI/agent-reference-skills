---
source: https://docs.cloud.google.com/vpc-service-controls/docs/service-perimeters
---

# Service perimeter details and configuration

Service perimeters protect Google Cloud services in your projects at the project or VPC network level. A perimeter runs in enforced mode (the default) or dry run mode; the same configuration steps apply to both, but dry run perimeters only log violations.

## Signature / Usage

Configure VPC Service Controls with the Google Cloud console, the `gcloud access-context-manager` command group, or the Access Context Manager APIs. After testing in dry run mode, this command (example from the gcloud help) turns the dry-run configuration of a perimeter into the enforced configuration:

```bash
gcloud access-context-manager perimeters dry-run enforce \
    my-perimeter
```

### Configuration stages

1. Create an access policy. It collects the service perimeters and access levels for the organization: one policy for the whole organization and multiple scoped policies for folders and projects.
2. Secure Google-managed resources with service perimeters. Identify the projects and services to protect, then create one or more perimeters.
3. Set up VPC accessible services to add restrictions on how services can be used inside perimeters (optional).
4. Set up private connectivity from a VPC network (optional). Private Google Access is recommended.
5. Allow context-aware access from outside a perimeter using ingress rules (optional), based on identity type, identity, device data, and network origin (IP address or VPC network).
6. Configure secure data exchange using ingress and egress rules (optional).

### Dry run use cases

- Determine the impact of changes to existing perimeters.
- Preview the impact of adding new perimeters.
- Monitor requests to restricted services that originate outside a perimeter, for example to find unexpected service usage.
- Build a perimeter architecture in a development environment analogous to production and fix issues before changing production.

## Options / Props

| Mode | Behavior |
|------|----------|
| Enforced (default) | Requests that violate the perimeter policy, such as requests to restricted services from outside the perimeter, are denied. API requests to restricted services do not cross the boundary unless the conditions of the necessary ingress and egress rules are satisfied. |
| Dry run | Violating requests are not denied, only logged as though the perimeter were enforced. |

## Notes

- Source: https://docs.cloud.google.com/vpc-service-controls/docs/service-perimeters (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/dry-run/enforce (gcloud 593.0.0 help).
- `perimeters dry-run enforce` is disruptive: requests that were only logged become denied. Check the dry-run violation logs first and try it on a disposable perimeter. The positional `PERIMETER` also needs an access policy (`--policy` or the `access_context_manager/policy` property).
- An enforced perimeter protects against stolen credentials, misconfigured permissions, and malicious insiders with access to the projects.
- If you use Shared VPC, you must include the host project in a service perimeter along with the projects that belong to the Shared VPC.
- A project can be in only one service perimeter. To communicate across the boundary, use ingress and egress rules (for example, projects from multiple perimeters sharing logs in a separate perimeter).
- Restricting access to private access from VPC networks means interfaces such as the Google Cloud console and the Cloud Monitoring console are denied. You can continue to use the `gcloud` tool or API clients from VPC networks that share a perimeter or perimeter bridge with the restricted resources.
- VPC accessible services restrict the services reachable from network endpoints inside a perimeter.

## Related

- [overview.md](./overview.md)
- [architect-perimeters.md](./architect-perimeters.md)
- [ingress-egress-rules.md](./ingress-egress-rules.md)
- [vpc-accessible-services.md](./vpc-accessible-services.md)
- [private-connectivity.md](./private-connectivity.md)
