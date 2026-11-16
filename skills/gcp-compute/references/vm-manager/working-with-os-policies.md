---
source: https://docs.cloud.google.com/compute/vm-manager/docs/os-policies/working-with-os-policies
---

# OS policy and OS policy assignment

An OS policy is a JSON or YAML file with a mode, resource groups and resources. An OS policy assignment is an API resource (`OSPolicyAssignment`) that applies OS policies to VMs in one zone with filters and a rollout.

## Signature / Usage

### Policy: install a Windows MSI from Cloud Storage

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

### Policy: ensure Apache is running (exec; exit 100 = desired state, 101 = not)

Adapted (not in the official docs): `resources` is a list, so the single resource is written as a list item (the source writes `resources:` followed by a bare `id:`).

```yaml
# An OS policy that ensures Apache web server is running on Linux OSes.
id: apache-always-up-policy
mode: ENFORCEMENT
resourceGroups:
  - resources:
      - id: ensure-apache-is-up
        exec:
          validate:
            interpreter: SHELL
            # If Apache web server is already running, return an exit code 100 to indicate
            # that exec resource is already in desired state. In this scenario,
            # the `enforce` step will not be run.
            # Otherwise return an exit code of 101 to indicate that exec resource is not in
            # desired state. In this scenario, the `enforce` step will be run.
            script: if systemctl is-active --quiet httpd; then exit 100; else exit 101; fi
          enforce:
            interpreter: SHELL
            # Start Apache web server and return an exit code of 100 to indicate that the
            # resource is now in its desired state.
            script: systemctl start httpd && exit 100
```

### Policy: exec scripts stored in Cloud Storage

The `apache-validate.sh` script is stored in a Cloud Storage bucket. To copy the output to a Cloud Storage bucket, the `apache-enforce.sh` script must include a command similar to the following:

Adapted (not in the official docs): replaced the non-existent `gcsutil` with `gcloud storage cp`.

```text
gcloud storage cp my-exec-output-file gs://my-gcs-bucket
```

Adapted (not in the official docs): `resources` is a list, so the single resource is written as a list item (the source writes `resources:` followed by a bare `id:`).

```yaml
# An OS policy that ensures Apache web server is running on Linux OSes.
id: gcs-test-apache-always-up-policy
mode: ENFORCEMENT
resourceGroups:
  - resources:
      - id: ensure-apache-is-up
        exec:
          validate:
            interpreter: SHELL
            # If Apache web server is already running, return an exit code 100 to indicate
            # that exec resource is already in desired state. In this scenario,
            # the enforce step will not be run.
            # Otherwise return an exit code of 101 to indicate that exec resource is not in
            # desired state. In this scenario, the enforce step will be run.
            file:
              gcs:
                bucket: my-gcs-bucket
                object: apache-validate.sh
                generation: 1726747503303299
          enforce:
            interpreter: SHELL
            # Start Apache web server and return an exit code of 100 to indicate that the
            # resource is now in its desired state.
            file:
              gcs:
                bucket: my-gcs-bucket
                object: apache-enforce.sh
                generation: 1726747503250884
```

### Assignment: policy + instance filter + rollout

```yaml
# An OS policy assignment to install a Windows MSI downloaded from a Google Cloud Storage bucket
# on all VMs running Windows Server OS.
osPolicies:
  - id: install-msi-policy
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
instanceFilter:
  inventories:
    - osShortName: windows
rollout:
  disruptionBudget:
    fixed: 10
  minWaitDuration: 300s
```

### Assignment: label-based filter

The tail of the source's assignment Example 2 (the assignment applies only to VMs labelled `type:webserver`; contiguous range from `instanceFilter:` to the end of the block):

```yaml
instanceFilter:
  inclusionLabels:
    - labels:
        type: webserver
rollout:
  disruptionBudget:
    fixed: 10
  minWaitDuration: 300s
```

### Policy for multiple operating systems

```yaml
# An OS policy assignment that applies to multiple Linux and Windows operating systems.
id: multi-os
mode: VALIDATION
resourceGroups:
  - inventoryFilters:
      - osShortName: debian
      - osShortName: centos
      - osShortName: ubuntu
      - osShortName: rhel
      - osShortName: rocky
      - osShortName: cos
      - osShortName: opensuse-leap
      - osShortName: ol
      - osShortName: sles
    resources:
      - id: linux
        exec:
          validate:
            interpreter: SHELL
            # Linux-specific script.
            # Exit code of 100 = resource is in the desired state
            script: |
              exit 100
  - inventoryFilters:
      - osShortName: windows
    resources:
      - id: windows
        exec:
          validate:
            interpreter: POWERSHELL
            # Windows-specific script.
            # Exit code of 100 = resource is in the desired state
            script: |
              exit 100
```

## Options / Props

| Section | Field | Detail |
|---------|-------|--------|
| OS policy | Mode `Validation` | Checks desired state and reports compliance, takes no action |
| OS policy | Mode `Enforcement` | Checks and, if needed, performs actions to reach desired state |
| OS policy | Resource groups | OS name and version the resources apply to |
| OS policy | Resources | Maximum 10 resource IDs per resource group |
| Resource type | `pkg` | Install or remove Linux and Windows packages |
| Resource type | `repository` | Repository packages can be installed from |
| Resource type | `exec` | Ad hoc shell (`/bin/sh`) or PowerShell script |
| Resource type | `file` | Manage files on the system |
| Assignment | Quota | Maximum 20 OS policy assignments per zone per project (request an increase for more) |
| Assignment | Target VMs | Single zone; OS short name and version; include set and exclude set of labels (`key:value` or a single system label such as `goog-gke-node`) |
| Assignment | Rollout | Wave size (disruption budget, fixed or percent) and wait time (`minWaitDuration`) |

| OS | Short name |
|----|-----------|
| CentOS | `centos` |
| Container-Optimized OS | `cos` |
| Debian | `debian` |
| openSUSE Leap | `opensuse-leap` |
| Oracle Linux | `ol` |
| RHEL | `rhel` |
| Rocky Linux | `rocky` |
| SLES | `sles` |
| Ubuntu | `ubuntu` |
| Windows Server | `windows` |

## Notes

- Rollout example from the source: 10 target VMs, 20% disruption threshold, 15-minute bake time means 2 VMs are updated at a time and each stays in the threshold for 15 minutes.
- `exec` scripts and output files do not use CMEK; avoid sensitive data, or keep scripts and output in a Cloud Storage bucket (service accounts attached to the VMs need IAM permission to upload objects to that bucket).
- os-policies.md says that OS policies with `Exec` scripts "are incompatible with Google Cloud's Access Transparency and Access Approval"; Example 3, which this page offers as the Cloud Storage alternative, still uses an `exec` resource.
- Corrected from the official docs: policy Example 2 and Example 3 write `resources:` followed by a bare `id: ensure-apache-is-up` mapping; `resources` is a repeated field (`OSPolicyResourceGroup.resources`, a list of `OSPolicyResource` in the osconfig v1 Discovery document), so the list form (`- resources:` then `- id: ...`) is shown. The comments inside the blocks are kept as in the source.
- Corrected from the official docs: the source's copy command is `gcsutil cp my-exec-output-file gs://my-gcs-bucket`; `gcsutil` is not an existing command, so `gcloud storage cp` ("upload, download, and copy Cloud Storage objects") is shown.
- The source's multi-OS example (assignment Example 4) is introduced as an OS policy assignment but the block is an OS policy (`id`, `mode`, `resourceGroups` with `inventoryFilters`, no `osPolicies` / `instanceFilter` / `rollout`); it is shown as the source gives it. `mode` values are `VALIDATION` and `ENFORCEMENT`; `interpreter` values are `NONE`, `SHELL` and `POWERSHELL`.
- The assignment Example 2 and Example 3 in the source have the same bare-mapping list problem (`resources:` / `resourceGroups:` followed by a mapping); only the correct tail of Example 2 (`instanceFilter` / `rollout`) is reproduced here.
- Omitted: policy Example 4 (yum repository + Ops Agent install and version pin), Example 5 (CIS Level 1 scan for COS, see https://docs.cloud.google.com/container-optimized-os/docs/how-to/cis-compliance#using-os-policy), assignment Example 3 (CentOS Ops Agent). More samples: https://github.com/GoogleCloudPlatform/osconfig/tree/master/examples/OSPolicyAssignments
- The `generation` values and bucket names are the source's placeholders. `exec` scripts run with agent privileges on the VM; review them before assigning.
- Source (`gcloud storage cp`): `gcloud storage cp --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source (OS policies, cited above as `os-policies.md`): https://docs.cloud.google.com/compute/vm-manager/docs/os-policies (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/vm-manager/docs/os-policies/working-with-os-policies (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [os-policies.md](./os-policies.md)
- [setup.md](./setup.md)
- REST: https://docs.cloud.google.com/compute/docs/osconfig/rest/v1/projects.locations.osPolicyAssignments
