---
source: https://docs.cloud.google.com/workstations/docs/create-configuration
---

# Create a workstation configuration

A workstation configuration is the template for consistent workstations (machine type, zones, disk size, tools, libraries). Changes such as machine type or container image take effect on each workstation the next time it starts.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/workstations/docs/architecture (optional prerequisite in this page, for faster startup):

```bash
gcloud services enable containerfilesystem.googleapis.com
```

### Console flow

1. **Configure basics**: name (for example `test-configuration`), region, cluster (if none exists in the region a cluster is created automatically; creation can take up to 20 minutes), **Machine preset** (for example **Moderate** or **Custom**), **Quick start workstations** (**Enabled** = faster start but VMs kept pre-started are billed; **Disabled** = lower cost), code editor (Base Editor or a preconfigured IDE).
2. **Machine settings**: **Machine type** (for example `e2-standard-4`), two **Zones** in the region, Quick start pool size, auto-sleep, **Advanced options**.
3. **Environment**: preconfigured base image (**Code editors on base images**) or **Custom container image** with a **Container image URL**; service account; storage; readiness checks; **Advanced container options** (working directory, user, command and entrypoint arguments overrides, environment variables).
4. **Users and permissions**: users or Google groups get a Cloud Workstations Creator IAM policy.
5. **Labels and tags**, then **Create**.

## Options / Props

| Option | Default / valid values | Description |
|--------|------------------------|-------------|
| Quick start pool size | `1` | Number of pre-started VMs; billed. |
| Auto-sleep (Cost savings) | After 2 hours of inactivity (default) | Shuts down workstations inactive longer than two hours. |
| Disk type | **Balanced** (higher performance, more economical than **SSD**) | Cannot be modified after creating a workstation. |
| Disk size | default `200` GB; valid `10`, `50`, `100`, `200`, `500`, `1000` GB | Persistent home directory size. |
| Reclaim policy | **Delete** (default) or **Retain** | What happens to the persistent disk when a workstation is deleted. |
| Disable public IP addresses | checkbox | Requires Private Google Access or Cloud NAT on your network. With `private.googleapis.com` or `restricted.googleapis.com` for Artifact Registry, set DNS records for `*.pkg.dev`. |
| Enable nested virtualization | checkbox | N1 or N2 machine series only; nested VMs may lose 10% or more performance; blocked if the Disable VM nested virtualization org policy constraint is enforced. |
| Confidential VM service | checkbox | Encrypts data while processed. |
| CMEK | **Use customer-managed encryption key (CMEK)** | Default is a Google-owned and Google-managed key. |
| Grant Policy Admin role to workstation creators | checkbox (Advanced IAM options) | Grants `roles/workstations.policyAdmin`; the creator always gets `roles/workstations.user` on their workstation. |

## Notes

- Disabling public IP addresses without Private Google Access or Cloud NAT leaves workstation VMs without a route to Google services and image repositories.
- With **Retain**, deleting the workstation keeps the disk (admins delete it manually); recreating the workstation attaches a new empty disk. To read the data, create a Compute Engine instance, add the disk and mount it.
- Custom image service account: it must have permission to pull the image (or the image must be publicly accessible). Org policy prerequisites (`constraints/compute.trustedimageProjects`, `restrictPrivateServiceConnectProducer`, `disablePrivateServiceConnectCreationForConsumers`, `under:organizations/433637338589`) are the same as in [create-cluster.md](./create-cluster.md).
- For GPUs on N1 machine types, choose two zones where the GPU type is available (https://docs.cloud.google.com/workstations/docs/available-gpus).
- The source shows only Console steps; the API fields are on https://docs.cloud.google.com/workstations/docs/customize-development-environment.
- Source: https://docs.cloud.google.com/workstations/docs/create-configuration (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-cluster.md](./create-cluster.md)
- [preconfigured-base-images.md](./preconfigured-base-images.md)
- [customize-container-images.md](./customize-container-images.md)
- [access-control.md](./access-control.md)
