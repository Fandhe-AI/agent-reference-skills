---
source: https://docs.cloud.google.com/workstations/docs/access-control
---

# Access control with IAM

Cloud Workstations uses IAM to manage access to workstations and workstation configurations. Assign roles to a principal (user, group or service account).

## Signature / Usage

Role IDs copied from this page (the source has no code block):

```text
roles/workstations.user
roles/workstations.operationViewer
roles/workstations.workstationCreator
roles/workstations.admin
roles/workstations.networkAdmin
roles/workstations.workstationLimitExemptedCreator
roles/workstations.policyAdmin
```

Console: **Workstation configurations** > **Add users** (enter **New principals**), or the row expander > **Edit permissions** > **Add principal**. Requires Cloud Workstations Admin (or basic Editor / Owner).

## Options / Props

| Persona | Roles | Granted on |
|---------|-------|------------|
| Developer using a workstation | Cloud Workstations User (`roles/workstations.user`) | the workstation |
| | Cloud Workstations Operation Viewer (`roles/workstations.operationViewer`) | the project |
| Developer creating and connecting | Cloud Workstations Creator (`roles/workstations.workstationCreator`) | project or individual workstation configuration |
| | Cloud Workstations Operation Viewer (`roles/workstations.operationViewer`) | the project |
| Administrator (clusters and configurations) | Cloud Workstations Admin (`roles/workstations.admin`) | the project |
| Network administrator (Shared VPC permissions) | Cloud Workstations Network Admin (`roles/workstations.networkAdmin`) | the project |
| Creator exempt from `maxUsableWorkstations` | Cloud Workstations Limit Exempted Creator (`roles/workstations.workstationLimitExemptedCreator`) | project or individual workstation configuration |
| | Cloud Workstations Operation Viewer (`roles/workstations.operationViewer`) | the project |
| Update the workstation IAM policy (whole workstation or individual ports) | Cloud Workstations Policy Admin (`roles/workstations.policyAdmin`) | the workstation |

## Notes

- Creating a workstation as Creator automatically grants you `roles/workstations.user` on it. `roles/workstations.policyAdmin` is granted automatically only if **Grant Policy Admin role to workstation creators** is enabled on the configuration.
- Custom roles or other predefined roles may supply the same permissions. IAM role concepts are in the `gcp-foundation` skill. Per-limit setup: https://docs.cloud.google.com/workstations/docs/limit-workstations-per-developer.
- Source: https://docs.cloud.google.com/workstations/docs/access-control (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-configuration.md](./create-configuration.md)
- [quotas-and-locations.md](./quotas-and-locations.md)
