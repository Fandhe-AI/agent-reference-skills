---
source: https://docs.cloud.google.com/docs/terraform/best-practices/working-with-resources
---

# Terraform on Google Cloud: Working with Resources

Best practices for provisioning Google Cloud resources with Terraform, drawn from the Cloud Foundation Toolkit modules Google maintains: bake VM images instead of provisioning at boot, and prefer non-authoritative IAM resources.

## Signature / Usage

### Launch a VM from an image

Terraform launches the machine; the image is set in `boot_disk.initialize_params`:

```hcl
resource "google_compute_instance" "default" {
  name         = "my-vm"
  machine_type = "n1-standard-1"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "ubuntu-minimal-2210-kinetic-amd64-v20230126"
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }
}
```

## Options / Props

| Terraform IAM resource | Behavior |
|------------------------|----------|
| `google_*_iam_policy` (for example `google_project_iam_policy`) | Authoritative: Terraform is the only source of truth for permissions on the resource |
| `google_*_iam_binding` (for example `google_project_iam_binding`) | Authoritative for the binding's role |
| `google_*_iam_member` (for example `google_project_iam_member`) | Non-authoritative; recommended |

## Notes

- Bake VM images with a tool such as Packer; Terraform then only launches machines from pre-baked images. If pre-baked images are not available, a `provisioner` block can hand new VMs to a configuration management tool, but avoid this and use it only as a last resort. Provisioners that need teardown logic should use `when = destroy`. Provide VM configuration to configuration management through instance metadata.
- If permissions change outside Terraform, the next run overwrites all permissions to match an authoritative policy or binding. That removes roles Google Cloud manages automatically, potentially disrupting some services. Use `google_*_iam_member` resources directly or the IAM module from Google (`terraform-google-modules/terraform-google-iam`).
- The working with resources page has no code. Snippet taken from https://docs.cloud.google.com/docs/terraform/create-vm-instance
- The borrowed block pins the image `ubuntu-minimal-2210-kinetic-amd64-v20230126` (Ubuntu 22.10 minimal, build 20230126) from the create-vm-instance quickstart; this page recommends launching from your own pre-baked images instead.
- `access_config {}` in the borrowed block assigns an external IP address to the VM, and the block uses the `default` network.
- IAM concepts are in `gcp-foundation`; Compute Engine is in `gcp-compute`.
- Source: https://docs.cloud.google.com/docs/terraform/best-practices/working-with-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [reusable-modules.md](./reusable-modules.md)
- [version-control.md](./version-control.md)
- [operations.md](./operations.md)
