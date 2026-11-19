---
source: https://docs.cloud.google.com/docs/terraform/create-vm-instance
---

# Quickstart: Create a VM instance using Terraform

Create a Compute Engine VM instance with Terraform and connect to it, using the `terraform-docs-samples` repository.

## Signature / Usage

### Before you begin

```bash
gcloud projects create PROJECT_ID
```

```bash
gcloud config set project PROJECT_ID
```

```bash
gcloud services enable compute.googleapis.com
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="user:USER_IDENTIFIER" --role=ROLE
```

Run the last command once for `roles/compute.instanceAdmin.v1`.

### Prepare and review

```bash
git clone https://github.com/terraform-google-modules/terraform-docs-samples.git --single-branch
```

```bash
cd terraform-docs-samples/compute/quickstart/create_vm
```

```bash
cat main.tf
```

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

### Create, connect, clean up

```bash
terraform init
```

```bash
terraform plan
```

```bash
terraform apply
```

Enter `yes` when prompted by `terraform apply`. Expected: `Apply complete! Resources: 1 added, 0 changed, 0 destroyed`.

```bash
gcloud compute ssh --zone=us-central1-a my-vm
```

```bash
terraform destroy
```

Enter `yes` when prompted. Expected: `Destroy complete! Resources: 1 destroyed.`

## Options / Props

| Property | Value |
|----------|-------|
| `name` | `my-vm` |
| `machine_type` | `n1-standard-1` |
| `zone` | `us-central1-a` |
| `boot_disk` | boot disk for the instance |
| `network_interface` | uses the `default` network of the project |

### Roles and permissions

| Role / permission | Purpose |
|-------------------|---------|
| `roles/resourcemanager.projectCreator` (`resourcemanager.projects.create`) | Create a project |
| `serviceusage.services.enable` (Service Usage Admin `roles/serviceusage.serviceUsageAdmin`, or Owner `roles/owner` if you created the project) | Enable APIs |
| `roles/compute.instanceAdmin.v1` | Granted to your user account for the quickstart |

## Notes

- `access_config {}` assigns an external IP address to the VM. The configuration uses the `default` network.
- The source presents the `main.tf` listing as output "similar to the following" of `cat main.tf`; the cloned repository's file is the one Terraform applies. The listing pins the image `ubuntu-minimal-2210-kinetic-amd64-v20230126` (Ubuntu 22.10 minimal, build 20230126); check that the image is still available before applying.
- Billing must be enabled for the project. If you do not plan to keep the resources, create a new project and delete it afterwards.
- `terraform destroy` is destructive; try it on a disposable project first.
- Example `terraform init` output installs `hashicorp/google v5.35.0`; Terraform writes `.terraform.lock.hcl` and the source says to include it in version control.
- The source also shows Cloud Shell activation and a `terraform` availability check with its output (omitted).
- The VM resource itself belongs to `gcp-compute`.
- Source: https://docs.cloud.google.com/docs/terraform/create-vm-instance (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [basic-commands.md](./basic-commands.md)
- [install-configure-terraform.md](./install-configure-terraform.md)
- [store-state.md](./store-state.md)
