---
source: https://docs.cloud.google.com/vpc-service-controls/docs/dry-run-mode
---

# Dry run mode for service perimeters

Dry run mode is a second evaluation pass of a perimeter configuration: requests that violate it are logged, not denied. Use it to preview new perimeters, test changes to existing ones, and monitor requests to protected services. Perimeters can be dry run only, or hybrid (enforced plus dry run).

## Signature / Usage

### Create a dry run perimeter

A perimeter with only a dry run configuration logs violations without denying requests. Example from the create service perimeter page: a dry run perimeter named `ProdPerimeter` with two projects that restricts Cloud Storage and BigQuery.

```bash
gcloud access-context-manager perimeters \
  dry-run create ProdPerimeter --perimeter-title="Production Perimeter" \
  --perimeter-type="regular" \
  --perimeter-resources=projects/12345,projects/67890 \
  --perimeter-restricted-services=storage.googleapis.com,bigquery.googleapis.com \
  --perimeter-ingress-policies=ingress.yaml \
  --perimeter-egress-policies=egress.yaml \
  --policy=330193482019
```

## Options / Props

### Dry run configuration statuses

| Status | Meaning |
|---|---|
| Inherited from enforced | Default for enforced perimeters. Changes to the enforced configuration are also applied to the dry run configuration. |
| Modified | The dry run configuration was viewed or changed, then saved. Later changes to the enforced configuration are not applied to it. |
| New | The perimeter has only a dry run configuration; the status stays New until it has an enforced configuration. |
| Deleted | The dry run configuration was deleted. Remains until you create a new one or undo the action; enforced-config changes are not applied. |

### Dry run actions

| Action |
|---|
| Create a perimeter with only a dry run configuration |
| Update an existing perimeter's dry run configuration |
| Move a new project into an existing perimeter |
| Move a project from one perimeter to another |
| Delete a perimeter's dry run configuration |

## Notes

- Dry run inherits the enforced configuration by default, so at each step both configurations must be valid. A project can be in only one enforced configuration and one dry run configuration (not necessarily of the same perimeter), so moves between perimeters must be sequenced: for example, remove the project from perimeter PA's dry run configuration before adding it to PB's dry run configuration.
- To enforce a move, either manually remove the project from PA's enforced configuration and then add it to PB's, or enforce all dry run configurations with gcloud or the Access Context Manager API. Enforcing all applies every modified dry run configuration, so coordinate with anyone else who modified dry run configurations; enforcing replaces the enforced configuration and can block production traffic.
- Dry run logs a request only if it is not already denied by the dry run or enforced configuration and it violates the dry run configuration. The enforced configuration is evaluated first: requests allowed by enforced but denied by dry run are logged as dry run violations; requests denied by enforced but allowed by dry run are not logged.
- Dry run audit logs have `metadata.dryRun` set to `True`. Set `useExplicitDryRunSpec` to `True` in the service perimeter configuration to evaluate the dry run configuration.
- Access levels have no dry run equivalent. To test an access level change, create a new access level that reflects the change and apply it to the perimeter's dry run configuration.
- Dry run changes do not affect actual enforcement: adding a project to another perimeter's dry run configuration leaves it protected by its enforced perimeter.
- Resources, ingress rules and egress rules used in dry run count toward the access policy quota. See the VPC Service Controls quotas and limits page.
- If dry run issues cannot be resolved, you can keep the dry run configuration and monitor the logs for unexpected denials that may indicate an exfiltration attempt; requests are not denied.
- Limitation: dry run applies only to perimeters. It does not show the impact of restricting Google Cloud API access to the restricted or private VIP. Make sure all services you use are available on the restricted VIP before you configure `restricted.googleapis.com`. If you are unsure, use the private VIP, but with the private VIP, entities in your network can reach services not supported by VPC Service Controls (for example consumer Gmail and Drive), so compromised code, malware or a malicious user could exfiltrate data through them.
- Source: https://docs.cloud.google.com/vpc-service-controls/docs/dry-run-mode (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/vpc-service-controls/docs/create-service-perimeters (retrieved 2026-11-18). The command needs the `ingress.yaml` and `egress.yaml` rule files and access policy `330193482019` from that example; replace them with your own.

## Related

- [create-service-perimeters.md](./create-service-perimeters.md)
- [manage-service-perimeters.md](./manage-service-perimeters.md)
- [set-up-private-connectivity.md](./set-up-private-connectivity.md)
