---
source: https://docs.cloud.google.com/compute/vm-manager/docs/overview
---

# VM Manager overview

VM Manager is a suite of tools for managing operating systems of large Windows and Linux VM fleets on Compute Engine. It consists of Patch, OS inventory management and OS policies, all driven by the OS Config API and the OS Config agent running on each VM. VM Manager supports projects in VPC Service Controls service perimeters.

## Signature / Usage

### Enable the OS Config API and the agent metadata

```bash
gcloud services enable osconfig.googleapis.com --project=PROJECT_ID
```

```bash
gcloud compute project-info add-metadata \
  --project PROJECT_ID \
  --metadata=enable-osconfig=TRUE
```

Snippet taken from https://docs.cloud.google.com/compute/vm-manager/docs/setup (the overview twin itself has no code). See [setup.md](./setup.md).

## Options / Props

| Service | Purpose |
|---------|---------|
| Patch | Apply on-demand and scheduled patches; patch compliance reporting |
| OS inventory management | Collect and review operating system information |
| OS policies | Install, remove and auto-update software packages (declarative OS configuration) |

| Component | Detail |
|-----------|--------|
| Enablement | Automatic (Google Cloud console, whole project) or manual (per VM or whole project). Enabling activates the OS Config service API on the project and activates the OS Config agent on each selected VM by setting instance metadata. |
| OS Config agent | Preinstalled on most VMs but not active until instance metadata is set. Uses OS utilities (`yum`, `apt`, `rpm`, Windows Update Agent) for Patch and OS policies; collects inventory data for OS inventory management (stored in instance metadata and log streams, queryable with the Google Cloud CLI). |
| Service agent | `service-PROJECT_NUMBER@gcp-sa-osconfig.iam.gserviceaccount.com`, role Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`). Created only when Patch starts a patch job and filters VM data; OS policies does not use it. |
| Package sources | VMs must reach package sources and repositories; for VMs in private networks set up Private Google Access. Caveat (from patch.md, quoted in Notes): "The Patch service does not host or maintain package updates or patches." |
| Terraform | Resources `os_config_patch_deployment` and `os_config_os_policy_assignment` (Terraform google provider) extend VM Manager across an organization; examples are in the GoogleCloudPlatform/osconfig GitHub repository. |

## Notes

- Limitation: VM Manager supports only operating systems configured with an English locale. With a non-English locale the OS Config agent might fail to parse package manager output, which can make Patch, OS inventory management and OS policies fail.
- If the Cloud OS Config Service Agent role was revoked from the service agent, the agent is not visible on the IAM page.
- VPC-side requirements (Private Google Access, Cloud NAT) are only the VM-side setting here; VPC networks themselves are in the planned `gcp-networking`. Service agents and IAM in general are in `gcp-foundation`.
- For pricing see https://docs.cloud.google.com/compute/vm-manager/pricing (not copied).
- Source inconsistency: this page says "For VMs in private networks, you can set up Private Google Access" to reach package sources and repositories, while patch.md says "The Patch service does not host or maintain package updates or patches" and, for a VM that "doesn't use public IPs" or a "private VPC network", recommends "hosting your own local repository or a Windows Server Update Service" or making "external update sources available to your VMs by using Cloud NAT or other proxy services"; private-google-access.md says such VMs "can reach the external IP addresses of Google APIs and services". For package repositories outside Google, follow patch.md.
- Source (Patch, cited above as `patch.md`): https://docs.cloud.google.com/compute/vm-manager/docs/patch (retrieved 2026-11-17)
- Source (Private Google Access, cited above as `private-google-access.md`): https://docs.cloud.google.com/vpc/docs/private-google-access (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/vm-manager/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/compute/vm-manager/docs/setup (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup.md](./setup.md)
- [patch.md](./patch.md)
- [os-policies.md](./os-policies.md)
- [os-inventory-management.md](./os-inventory-management.md)
