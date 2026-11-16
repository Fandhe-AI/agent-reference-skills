---
source: https://docs.cloud.google.com/compute/docs/instances
---

# Compute Engine instances overview

A Compute Engine instance is either a virtual machine (VM) or a bare metal instance hosted on Google's infrastructure. Instances belong to a project, are created in a zone with a machine type and OS, and can be created individually or as a managed instance group (MIG).

## Signature / Usage

### List instances

The instances overview has no code. The command below lists the instances in a project in table form.

```bash
gcloud compute instances list
```

## Options / Props

| Topic | Details |
|-------|---------|
| Terminology | Compute Engine instance, compute instance and instance are synonymous. VM instance, virtual machine instance and VM are synonymous. |
| Bare metal vs VM | If the machine type name ends in `-metal`, the instance is a bare metal instance with no hypervisor installed; otherwise it is a VM. |
| Images | Public Linux and Windows Server images, private custom images (created or imported), and Docker containers on the Container-Optimized OS public image. |
| Machine properties | Predefined machine types or custom machine types. |
| Boot disk | Each instance has a small boot disk with the OS by default; more disks can be added at creation or while running. |
| Networking | Each network interface is associated with a subnet of a unique VPC network. |
| Default time zone | UTC, regardless of region. |

### Managing access

| OS | Method |
|----|--------|
| Linux | OS Login: associates SSH keys with your Google Account or Google Workspace account and manages admin or non-admin access through IAM roles. |
| Linux | SSH keys in project or instance metadata: project-level keys access all instances in the project; instance-level keys access individual instances. |
| Linux | Connecting with the Google Cloud CLI or SSH from the console: Compute Engine generates SSH keys automatically. |
| Windows Server | Generate credentials for Windows instances (associates a password with a Windows user). |

## Notes

- Containers: you can supply a Docker image name and launch configuration when creating an instance or an instance template; Compute Engine supplies a Container-Optimized OS image with Docker and launches the container at start. The source links to "Deploying containers on instances and MIGs". This uses the container startup agent (konlet): the container startup agent deprecation page lists "July 21, 2025: Compute Engine container startup agent was deprecated." and "July 31, 2026: Compute Engine container startup agent shutdown.", so as of the retrieval date this mechanism is shut down. That page names as alternatives running Docker containers with a startup script or `cloud-init` on one of the "Container-optimized VM images", GKE, Cloud Run, or Batch.
- Source inconsistency: this page says "You can use SSH keys stored in project metadata to access all instances in a project", while oslogin.md (compute-access-ssh) says "Compute instances that use OS Login can't use metadata-based SSH keys. If you enable OS Login for a compute instance, then the compute instance's guest agent ignores the keys stored in metadata", and predefined-metadata-keys.md lists `block-project-ssh-keys` ("Block project SSH keys from VMs that use metadata-based SSH keys"). Project metadata keys reach only VMs without OS Login that do not block project keys.
- OS Login here means OS Login on Compute Engine VMs; IAM concepts in general are in `gcp-foundation`.
- VPC networks themselves are in the planned `gcp-networking`; this page only covers the VM-side association with a subnet.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/list (gcloud 593.0.0 help); the instances overview itself has no code.
- Source (container startup agent shutdown): https://docs.cloud.google.com/compute/docs/deprecations/container-startup-agent-on-compute (retrieved 2026-11-17)
- Source (OS Login and metadata SSH keys): https://docs.cloud.google.com/compute/docs/oslogin (retrieved 2026-11-17)
- Source (block-project-ssh-keys): https://docs.cloud.google.com/compute/docs/metadata/predefined-metadata-keys (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-start-instance.md](./create-start-instance.md)
- [instance-lifecycle.md](./instance-lifecycle.md)
- [suspend-stop-reset-instances-overview.md](./suspend-stop-reset-instances-overview.md)
- [global-regional-zonal-resources.md](./global-regional-zonal-resources.md)
