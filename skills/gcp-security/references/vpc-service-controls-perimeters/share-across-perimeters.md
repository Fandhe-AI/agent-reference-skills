---
source: https://docs.cloud.google.com/vpc-service-controls/docs/share-across-perimeters
---

# Sharing across perimeters with bridges

A project can belong to only one service perimeter. A perimeter bridge lets projects in different perimeters communicate bidirectionally, while each project's access levels and service restrictions stay controlled by its own perimeter.

## Signature / Usage

### Create a bridge between two projects

The projects are given by project number (required for the `resources` option).

```bash
gcloud access-context-manager perimeters create Bridge \
  --title="Perimeter Bridge" --perimeter-type=bridge \
  --resources=projects/12345,projects/67890
```

## Options / Props

### Considerations

| Constraint | Detail |
|---|---|
| Membership | A project must already belong to a service perimeter before it can be connected by a bridge. |
| Organization | Bridges cannot include projects from different organizations; the connected perimeters must be in the same organization. |
| Scoped policies | Bridges cannot include projects from different scoped policies; use ingress or egress rules instead. |
| VPC networks | After you create a bridge for a project, you cannot add that project's VPC networks to a perimeter. |
| Transitivity | Not transitive: if A-B and B-C are bridged, data cannot pass between A and C. |
| Multiple bridges | A project can have multiple bridges. |

## Notes

- The bridge boundary is bidirectional: both directions of a copy (for example DMZ Perimeter to Private Perimeter and back) are allowed. For directional control, combine perimeters with IAM permissions on the service account or identity that performs the copy.
- Example from the source: allow copies between Cloud Storage buckets in the DMZ Perimeter and only the buckets in the Sink Project, but not allow VMs in the DMZ Perimeter to access data in buckets in the Private Project.
- Bridges cannot have VPC accessible services (see manage-service-perimeters.md).
- The bridge command omits `--policy`; it needs an access policy (`--policy` or the `access_context_manager/policy` property). Creating a bridge changes what data can move between the connected projects; try it on disposable projects first (the console offers a dry run mode for bridges, see create-perimeter-bridges.md).
- Source: https://docs.cloud.google.com/vpc-service-controls/docs/share-across-perimeters (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-perimeter-bridges.md](./create-perimeter-bridges.md)
- [create-service-perimeters.md](./create-service-perimeters.md)
- [configuring-ingress-egress-policies.md](./configuring-ingress-egress-policies.md)
