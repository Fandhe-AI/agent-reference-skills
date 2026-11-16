---
source: https://docs.cloud.google.com/compute/vm-manager/docs/os-policies
---

# OS policies

OS policies automate and centralize deployment, configuration, maintenance and reporting of software configuration on VMs. An OS policy declares desired OS resources; an OS policy assignment applies policies to a dynamic group of VMs in a zone.

## Signature / Usage

An OS policy is a YAML or JSON file (details in [working-with-os-policies.md](./working-with-os-policies.md)):

```yaml
# An OS policy to install a Windows MSI downloaded from a Google Cloud Storage bucket.
id: install-msi-policy
mode: ENFORCEMENT
resourceGroups:
  - resources:
      - id: install-msi
        pkg:
          desiredState: INSTALLED
          msi:
            source:
              gcs:
                bucket: my-bucket
                object: my-app.msi
                generation: 1619136883923956
```

## Options / Props

| Concept | Detail |
|---------|--------|
| OS policy | File with declarative configuration of packages, repositories, files or script-defined custom resources |
| OS policy assignment | Combines policies and targets VMs via labels, OS families and zones. Zonal resource: one assignment targets VMs in a single zone. |
| Rollout: wave size (disruption budget) | Fixed number or percentage of VMs that can experience a rollout at one time |
| Rollout: wait time | Time between applying policies to a VM and removing it from the disruption threshold (e.g. 15 minutes) |
| Enforcement interval | VM Manager checks and enforces policies every 60 minutes |
| Linux execution | `apt` / `yum` for packages, `/bin/sh` for scripts |
| Windows execution | `googet` package manager, PowerShell for scripts |

Example assignment: Policy A (monitoring agent), B (logging agent), C (security agent); include label `env:test`; exclude label `goog-gke-node`; OS family `ubuntu`.

## Notes

- Use cases: install and maintain monitoring / logging / security agents, flexible startup-script replacement, compliance checks, add update repositories, manage files, condition-based scripts.
- Custom OS policy scripts and output files defined with the `Exec` resource do not use customer-managed encryption keys (CMEK) and are incompatible with Access Transparency and Access Approval. Do not include sensitive information in these scripts or output files.
- Each create / update / delete of an assignment starts a rollout; apply changes slowly so you can cancel and fix problems. When updating an assignment VM Manager enforces the changed configuration on the VM.
- Compliance reports: https://docs.cloud.google.com/compute/vm-manager/docs/os-policies/view-compliance. Creating assignments: https://docs.cloud.google.com/compute/vm-manager/docs/os-policies/create-os-policy-assignment. Managing: https://docs.cloud.google.com/compute/vm-manager/docs/os-policies/manage-os-policy
- Pricing: https://docs.cloud.google.com/compute/vm-manager/pricing (not copied).
- Snippet taken from https://docs.cloud.google.com/compute/vm-manager/docs/os-policies/working-with-os-policies (Example 1); the overview twin has no code.
- Source: https://docs.cloud.google.com/compute/vm-manager/docs/os-policies (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [working-with-os-policies.md](./working-with-os-policies.md)
- [overview.md](./overview.md)
- [setup.md](./setup.md)
