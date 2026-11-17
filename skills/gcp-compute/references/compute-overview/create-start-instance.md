---
source: https://docs.cloud.google.com/compute/docs/instances/create-start-instance
---

# Create and start a Compute Engine instance

Introductory guide to creating a Compute Engine instance with the console, the gcloud CLI or REST, with an index of pages for specific configurations (custom machine types, GPUs, images, networking, security, Spot, MIGs and more).

## Signature / Usage

### Set up gcloud

```bash
gcloud init
```

If you installed gcloud previously, run `gcloud components update` for the latest version. Then set a default region and zone. If you use an external identity provider, sign in to the gcloud CLI with your federated identity first.

### Create with gcloud

Use `gcloud compute instances create` (https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/create) for an instance with your own configuration. It can't create instances in bulk or instances that run container images:

- Bulk: `gcloud compute instances bulk create`
- Containers: `gcloud compute instances create-with-container`

### Create with REST

Make a `POST` request to `instances.insert` (https://docs.cloud.google.com/compute/docs/reference/rest/v1/instances/insert). For bulk creation use a `POST` to `instances.bulkInsert`.

### Local authentication for Terraform and client libraries

Snippet from the same page; Application Default Credentials for local development (not needed in Cloud Shell):

```bash
gcloud auth application-default login
```

## Options / Props

### Required role

`roles/compute.instanceAdmin.v1` (Compute Instance Admin (v1)) on the project.

### Required permissions

| Permission | Needed when |
|------------|-------------|
| `compute.instances.create` on the project | Always |
| `compute.images.useReadOnly` on the image | Using a custom image |
| `compute.snapshots.useReadOnly` on the snapshot | Using a snapshot |
| `compute.instanceTemplates.useReadOnly` on the template | Using an instance template |
| `compute.subnetworks.use` on the project or subnet | Specifying a subnet |
| `compute.addresses.use` on the project | Specifying a static IP |
| `compute.subnetworks.useExternalIp` on the project or subnet | External IP with a VPC network |
| `compute.networks.use` on the project | Assigning a legacy network |
| `compute.networks.useExternalIp` on the project | External IP with a legacy network |
| `compute.instances.setMetadata` on the project | Setting metadata |
| `compute.instances.setTags` on the VM | Setting tags |
| `compute.instances.setLabels` on the VM | Setting labels |
| `compute.instances.setServiceAccount` on the VM | Setting a service account |
| `compute.disks.create` on the project | Creating a new disk |
| `compute.disks.use` on the disk | Attaching an existing disk read-only or read-write |
| `compute.disks.useReadOnly` on the disk | Attaching an existing disk read-only |

### Pages for specific configurations (from the source)

| Area | Topics |
|------|--------|
| Preconfigured | Google-configured, workload-optimized instance |
| Machine | Custom hostname, custom machine type, attached GPUs, attached TPUs, minimum CPU platform |
| OS | Public image, custom image, shared image, RHEL BYOS image |
| Networking | Specific subnet, IPv6, gVNIC, higher bandwidth |
| Observability | Ops Agent monitoring and logging, virtual displays |
| Security | User-managed service account, managed workload identities, OS Login at creation |
| Disaster recovery | Backup and DR backup plan |
| From a backup | Machine image, disk snapshot, backup vault |
| From existing config | Instance template, similar instance |
| Workloads | Container deployment, Windows Server, SQL Server, HPC image |
| Provisioning | Spot instance, instances consuming reservations |
| Multiple instances | MIG, bulk creation |
| Other | Sole-tenant nodes, instance schedule |

## Notes

- Instance creation troubleshooting is on a separate "Troubleshooting instance creation" page.
- The console's "Equivalent code" button on the Create an instance page generates gcloud, REST or Terraform code.
- Console panes: Machine configuration, OS and storage, Data protection, Networking, Observability, Security, Advanced.
- Deprecated related feature: the deprecations page lists "Container startup agent in Compute Engine" as deprecated July 21, 2025 with shutdown July 31, 2026. `create-with-container` (container deployment on instances) is mentioned by this page only as the command for container instances; do not present it as current guidance.
- The source also shows Console, Terraform and client-library (C#, Go, Java, Node.js, PHP, Python, Ruby) tabs; they are omitted here.
- The source lists "Create an instance that uses a user-managed service account" as a security configuration option; IAM and service accounts in general are in `gcp-foundation`.
- VPC subnets, IPv6 and firewall settings used during creation are VM-side settings here; VPC networks and firewall policies themselves are in `gcp-networking`.
- Source: https://docs.cloud.google.com/compute/docs/instances/create-start-instance (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [instances.md](./instances.md)
- [provisioning-models.md](./provisioning-models.md)
- [instance-lifecycle.md](./instance-lifecycle.md)
- [deprecations.md](./deprecations.md)
