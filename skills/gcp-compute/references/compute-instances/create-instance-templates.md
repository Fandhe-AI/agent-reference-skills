---
source: https://docs.cloud.google.com/compute/docs/instance-templates/create-instance-templates
---

# Create instance templates

How to create regional or global instance templates that define machine type, boot disk image, network and other VM properties. Templates can be used to create individual VMs, VMs in a managed instance group (MIG), and reservations for VMs. You must specify the machine type, boot disk and network.

## Signature / Usage

Required permissions: all permissions required to call the `instanceTemplates.insert` method.

### Create a template (gcloud)

For a regional template you must set `--instance-template-region`.

```bash
gcloud compute instance-templates create INSTANCE_TEMPLATE_NAME \
    --instance-template-region=REGION
```

Global template:

```bash
gcloud compute instance-templates create INSTANCE_TEMPLATE_NAME
```

Secondary non-boot disks (up to 15), one `--create-disk` flag per disk. `^:^` makes the separator between `replica-zones` values a colon instead of a comma. Omit `replica-zones` for zonal disks; omit image properties for blank disks.

```bash
gcloud compute instance-templates create INSTANCE_TEMPLATE_NAME \
    --machine-type=MACHINE_TYPE \
    --create-disk=image-family=DISK_IMAGE_FAMILY,image-project=DISK_IMAGE_PROJECT,size=SIZE_GB_DISK1 \
    --create-disk=device-name=DISK_NAME,type=DISK_TYPE,size=SIZE_GB_DISK2,replica-zones=^:^ZONE:REMOTE_ZONE,boot=false
```

Shielded VM flags: `--no-shielded-secure-boot`, `--no-shielded-vtpm`, `--no-shielded-integrity-monitoring`.

### Create a template (REST)

For a regional template, make a `POST` request to the `regionInstanceTemplates.insert` method:

```text
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/instanceTemplates
```

For a global template, make a `POST` request to the `instanceTemplates.insert` method:

```text
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/instanceTemplates
```

Request body:

Adapted (not in the official docs): the source writes `projects/PROJECT_NAME/zones/...` in `replicaZones`; zone URLs take the project ID, not the project name, so the placeholder is `PROJECT_ID`.

```json
{
  "name": "INSTANCE_TEMPLATE_NAME",
  "properties": {
    "machineType": "MACHINE_TYPE",
    "networkInterfaces": [
      {
        "network": "global/networks/default",
        "accessConfigs":
        [
          {
            "name": "external-IP",
            "type": "ONE_TO_ONE_NAT"
          }
        ]
      }
    ],
    "disks":
    [
      {
        "type": "PERSISTENT",
        "boot": true,
        "mode": "READ_WRITE",
        "initializeParams":
        {
          "sourceImage": "projects/IMAGE_PROJECT/global/images/IMAGE"
        }
      },
      {
        "type": "PERSISTENT",
        "boot": false,
        "deviceName": "DISK_NAME",
        "initializeParams":
        {
          "replicaZones": [
              "projects/PROJECT_ID/zones/ZONE",
              "projects/PROJECT_ID/zones/REMOTE_ZONE"
          ]
        }
      }
    ]
  }
}
```

### Create a template from an existing instance

Use `--source-instance` and `--source-instance-zone` (plus `--instance-template-region` for a regional template). Add `--configure-disk` to override how source disks are defined.

```bash
gcloud compute instance-templates create INSTANCE_TEMPLATE_NAME \
    --source-instance=SOURCE_INSTANCE \
    --source-instance-zone=SOURCE_INSTANCE_ZONE
```

Example overriding two disks:

Adapted (not in the official docs): the source writes `custom-image=projects/cps-cloud/global/images/...`; the image project is `cos-cloud`, as in the source's own text and REST example for the same image.

```bash
gcloud compute instance-templates create my-instance-template  \
    --source-instance=my-source-instance \
    --configure-disk=device-name=data-disk-a,instantiate-from=source-image,auto-delete=true \
    --configure-disk=device-name=data-disk-b,instantiate-from=custom-image,custom-image=projects/cos-cloud/global/images/cos-89-16108-403-15
```

REST (global; `sourceInstance` is required, `diskConfigs` optional). In REST the `instantiateFrom` enum values are upper case (the Go, Java, Node.js and Python samples on the same page use `CUSTOM_IMAGE`).

Adapted (not in the official docs): the source REST example writes `instantiateFrom` as lower-case `custom-image`, which is the gcloud spelling; the API enum value is `CUSTOM_IMAGE` as in the source's own client-library samples. The source URL also uses `projects/my_project`, which is not a valid project ID; it is replaced with the placeholder `PROJECT_ID`.

```text
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/instanceTemplates

{
  "name": "my-instance-template",
  "sourceInstance": "zones/us-central1-a/instances/my-source-instance",
  "sourceInstanceParams":
  {
    "diskConfigs":
    [
      {
        "deviceName": "data-disk-a",
        "instantiateFrom": "CUSTOM_IMAGE",
        "customImage": "projects/cos-cloud/global/images/cos-89-16108-403-15"
      }
    ]
  }
}
```

### Create a similar template

Templates cannot be updated. In the console, open **Instance templates**, select a template, click **Create similar**, edit and click **Create**.

### GPU VM template

Set `--maintenance-policy=TERMINATE` (REST: `scheduling.onHostMaintenance` = `TERMINATE`). For an N1 machine type add `--accelerator` (REST: `guestAccelerators`).

```bash
gcloud compute instance-templates create instance-template-gpu \
    --accelerator=count=1,type=nvidia-tesla-t4 \
    --machine-type=n1-standard-2 \
    --image-family=debian-13 \
    --image-project=debian-cloud \
    --maintenance-policy=TERMINATE
```

### Template that specifies a subnet

`--subnet` requires `--region`. For a regional template use a subnet from the same region as `--instance-template-region`.

```bash
gcloud compute instance-templates create INSTANCE_TEMPLATE_NAME \
    --region=REGION \
    --subnet=SUBNET_NAME_OR_URL \
    --stack-type=STACK_TYPE \
    --instance-template-region=INSTANCE_TEMPLATE_REGION
```

## Options / Props

| Item | Value |
|---|---|
| Max secondary non-boot disks | 15 |
| gcloud defaults when no settings given | machine type (for example `n1-standard-1`); latest Debian image; new standard boot disk named after the VM; `default` VPC network; ephemeral external IPv4 address; stack type `IPV4_ONLY` |
| `--stack-type` / stack type values | `IPV4_ONLY` (default), `IPV4_IPV6`, `IPV6_ONLY` |
| `--configure-disk` `instantiate-from` | `source-image` or `source-image-family` (boot and other persistent read-write disks); `custom-image` (same disk kinds; give image path/URL or `projects/PROJECT_ID/global/images/family/IMAGE_FAMILY_NAME`); `attach-read-only` (read-only disks); `blank` (non-boot persistent disks and local SSDs; created unformatted, format and mount in a startup script); `do-not-include` (non-boot persistent and read-only disks) |
| `--configure-disk` `auto-delete` | `false`, `no`, `true`, `yes` |
| REST Shielded VM fields | `enableSecureBoot`, `enableVtpm`, `enableIntegrityMonitoring` |
| REST `disks` options | `initializeParams` (create boot or extra disks from image; `diskSizeGb`, `diskType`, `labels`); `source` (attach an existing boot disk; then only one instance can be created from the template; `diskSizeGb`) |

Default handling of disks when overriding from a source instance:

| Disk type | Options |
|---|---|
| Boot disk | Default: same source image or family as the source boot disk; or any image URL / image family |
| Other read/write persistent disks | Default: same source image or family (if the source disk has none, it is included as a blank disk); or an image URL / family; or blank (unformatted); or not included |
| Read-only disk(s) | Default: included read-only; or not included |
| Local SSD(s) | Default: blank local SSD (unformatted; format and mount in a startup script) |

## Notes

- Limitations: Shared VPC on interfaces other than `nic0` is supported in gcloud and REST but not the console. An existing template cannot be updated or changed; create a new one. Image families and regional disks in a template cannot be set in the console (use gcloud or REST). A template can create VMs with a Hyperdisk Balanced boot disk in a storage pool if the pool is in the VM's zone; global templates cannot create VMs with non-boot disks in a storage pool.
- If the source instance has a static external IP address, it is copied into the template and might limit the template's use.
- Disabling the vTPM also disables integrity monitoring, because integrity monitoring depends on Measured Boot data.
- For a regional GPU template, the GPU type must be available in at least one zone of the region. The machine type must support the GPU type. GPU on Compute Engine is covered here; GPUs on GKE nodes are in `gcp-gke`, CUDA programming is in `nvidia-cuda`.
- With a `--subnet` URL the template can only create instances in that subnet's region; with a subnet name Google finds the subnet in the target region.
- Corrected from the official docs: the source REST example for overriding disks used `"instantiateFrom": "custom-image"` (gcloud spelling); the enum is upper case in REST.
- Corrected from the official docs: the source gcloud `--configure-disk` example uses `custom-image=projects/cps-cloud/global/images/cos-89-16108-403-15`; `cps-cloud` is a typo for `cos-cloud`, which the same page uses for this image in its text and REST example, so the copied command would point at a wrong project.
- Corrected from the official docs: the source REST URL for creating a template from an instance uses `projects/my_project`; a project ID "can only contain lowercase letters, numbers, and hyphens", so the underscore value is rejected and it was replaced with `PROJECT_ID`.
- Not copied: the source's container image section (`gcloud compute instance-templates create-with-container`). The source says "The container startup agent (konlet) that deploys containers on VMs during VM creation is deprecated. Use the `docker run` commands in a startup script or use the `cloud-init` tool to configure and to run containers on your VMs and MIGs." The container startup agent deprecation page lists "July 21, 2025: Compute Engine container startup agent was deprecated." and "July 31, 2026: Compute Engine container startup agent shutdown.", so the example is not reproduced.
- Custom images are more deterministic and start faster than public images plus startup scripts, which are more flexible. An image from another project requires that the project owner grant the MIG access to it.
- Corrected from the official docs: the REST body's `replicaZones` used `projects/PROJECT_NAME/zones/ZONE` and `projects/PROJECT_NAME/zones/REMOTE_ZONE`; the placeholder was changed to `PROJECT_ID` because the URL needs the project ID.
- The GPU example uses `nvidia-tesla-t4`; the deprecations page lists NVIDIA T4 as deprecated August 1, 2026 with shutdown August 1, 2027, so check availability before relying on it. The `cos-89-16108-403-15` image in the `--configure-disk` samples is the source's sample value (an old Container-Optimized OS release), not a recommendation.
- Omitted to keep the page short: the source's "explicit settings" example (`--machine-type=e2-standard-4 --image-family=debian-13 --image-project=debian-cloud --boot-disk-size=250GB`); the GPU example below shows the same flags.
- Not copied: the source's generic `--configure-disk= device-name=…` multi-line template (it contains spaces after line continuations and does not run as written); the concrete example above is kept instead. The source also shows Console, Terraform and Go, Java, Node.js and Python client-library samples, and a "Use custom or public images" section, none of which are reproduced.
- VPC networks and firewall policies are in the planned `gcp-networking`.
- Source (project ID requirements): https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects (retrieved 2026-11-17)
- Source (container startup agent shutdown): https://docs.cloud.google.com/compute/docs/deprecations/container-startup-agent-on-compute (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instance-templates/create-instance-templates (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-creation-overview.md](./instance-creation-overview.md)
