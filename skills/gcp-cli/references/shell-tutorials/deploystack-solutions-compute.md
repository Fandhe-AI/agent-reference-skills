---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack
---

# DeployStack solutions: Compute Engine VMs

Four DeployStack solutions built on Compute Engine: Single VM, Load Balanced VMs, NoSQL Client Server, and Ops Agent. Each is launched with its Open in Cloud Shell link; the page of each solution shows a breakdown of the Terraform in `./main.tf`.

## Signature / Usage

Common to every solution page: clicking the link opens a Cloud Shell session and downloads code from GitHub. "You will have to authorize DeployStack to run. No actions will be taken until you do so." Once there, a single command spins up a working copy of the application in your project. The source does not name that command, and gives no teardown command. You do not need to run each breakdown command individually.

### Single VM

Creates an individual VM with a smart default and the ability to customize it. Product: Compute Engine. You can ssh into the VM and configure it however you like.

Launch (Open in Cloud Shell):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlecloudplatform/deploystack-single-vm&shellonly=true&cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image)
```

`./main.tf` - Enable Services (Compute Engine):

```hcl
variable "gcp_service_list" {
    description = "The list of apis necessary for the project"
    type        = list(string)
    default = [
        "compute.googleapis.com",
    ]
}

resource "google_project_service" "all" {
  for_each                   = toset(var.gcp_service_list)
  project                    = var.project_number
  service                    = each.key
  disable_dependent_services = false
  disable_on_destroy         = false
}
```

`./main.tf` - Create a virtual machine:

```hcl
resource "google_compute_instance" "instance" {
    name         = var.instance-name
    machine_type = var.instance-machine-type
    zone         = var.zone
    project      = var.project_id
    tags         = var.instance-tags


    boot_disk {
        auto_delete = true
        device_name = var.instance-name
        initialize_params {
        image = var.instance-image
        size  = var.instance-disksize
        type  = var.instance-disktype
        }
    }

    network_interface {
        network = "default"
        access_config {
        // Ephemeral public IP
        }
    }

    depends_on = [google_project_service.all]
    }
```

### Load Balanced VMs

Sets up a cluster of VMs and configures a Load Balancer to expose a public route to them. Components: Compute Engine (VMs), Managed Instance Group (cluster), Instance Template (machine template), Cloud Load Balancer. The example sets up a simple static HTML site using NGINX and load balances across the cluster.

Launch (Open in Cloud Shell):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlecloudplatform/deploystack-load-balanced-vms&shellonly=true&cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image)
```

`./main.tf` - Enable services (Compute Engine):

```hcl
variable "gcp_service_list" {
  description = "The list of apis necessary for the project"
  type        = list(string)
  default = [
      "compute.googleapis.com",
  ]
}

resource "google_project_service" "all" {
  for_each                   = toset(var.gcp_service_list)
  project                    = var.project_number
  service                    = each.key
  disable_dependent_services = false
  disable_on_destroy         = false
}
```

The breakdown then creates: an exemplar VM with NGINX installed via startup script; a snapshot and disk image from it; an instance template; a Managed Instance Group; an external global IP address; a health check, a firewall rule `allow-health-check`, a backend service and URL map; and HTTP proxy plus forwarding rule on port 80. The Terraform for these steps is not reproduced here; see https://github.com/googlecloudplatform/deploystack-load-balanced-vms.

### NoSQL Client Server

Configures and creates two Compute Engine instances: a Server that runs MongoDB, and a Client that runs a custom go application that talks to MongoDB and exposes an API for consuming the data.

Launch (Open in Cloud Shell):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlecloudplatform/deploystack-nosql-client-server&shellonly=true&cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image)
```

`./main.tf` - Enable Services (Compute Engine):

```hcl
variable "gcp_service_list" {
    description = "The list of apis necessary for the project"
    type        = list(string)
    default = [
        "compute.googleapis.com",
    ]
}

resource "google_project_service" "all" {
  for_each                   = toset(var.gcp_service_list)
  project                    = var.project_number
  service                    = each.key
  disable_dependent_services = false
  disable_on_destroy         = false
}
```

The breakdown then creates a firewall rule that opens port 80 to machines labeled `http-server`, a Server instance (`e2-standard-2`, MongoDB installed by startup script) and a Client instance (`e2-standard-2`, go app fetched and run by startup script). Those startup-script blocks are omitted here on purpose: the server script rebinds MongoDB to `0.0.0.0` and the client script downloads and runs code without inspection. See https://github.com/googlecloudplatform/deploystack-nosql-client-server.

### Ops Agent

Creates a virtual machine and installs the Ops Agent for integrating with Monitoring and Logging. Products: Compute Engine, Monitoring, Logging. The example sets up a single VM wired up to report to Logging.

Launch (Open in Cloud Shell):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlecloudplatform/deploystack-ops-agent&shellonly=true&cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image)
```

`./main.tf` - Enable Services (Compute Engine):

```hcl
variable "gcp_service_list" {
    description = "The list of apis necessary for the project"
    type        = list(string)
    default = [
        "compute.googleapis.com",
    ]
}

resource "google_project_service" "all" {
  for_each                   = toset(var.gcp_service_list)
  project                    = var.project_number
  service                    = each.key
  disable_dependent_services = false
  disable_on_destroy         = false
}
```

`./main.tf` - Install Ops Agent (Terraform module `agent_policy`):

```hcl
module "agent_policy" {
    source  = "terraform-google-modules/cloud-operations/google//modules/agent-policy"
    version = "~> 0.1.0"
    
    project_id = var.project_id
    policy_id  = "ops-agents-example-policy"
    agent_rules = [
        {
        type               = "ops-agent"
        version            = "current-major"
        package_state      = "installed"
        enable_autoupgrade = true
        },
    ]
    group_labels = [
        {
        env        = "prod"
        app        = "myproduct"
        created_by = "terraform"
        }
    ]
    
    os_types = [
        {
        short_name = "centos"
        version    = "8"
        },
    ]
}
```

The VM resource of this stack uses `f1-micro` with image `centos-cloud/centos-8-v20210817`, labels `env = "prod"`, and the default compute service account with `cloud-platform` scope (the source comment calls this "non production example").

## Notes

- Every stack here creates billable Compute Engine resources in your project. The source gives no teardown / destroy command; do not infer one from this page.
- The Terraform blocks are as shown in the source; only whole blocks are included, and the remaining resources are summarized in prose with a pointer to each GitHub repository. Indentation of the source's 4-space code blocks is removed uniformly.
- The Single VM resource block keeps the source's irregular closing indentation.
- Load Balanced VMs opens a public HTTP endpoint (port 80, source ranges for health checks `130.211.0.0/22` and `35.191.0.0/16`); it is a sample, not a production design.
- Compute Engine product details: not covered by a skill in this repository yet; Terraform in general: future `gcp-iac` skill.
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/single-vm (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/load-balanced-vms (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/nosql-client-server (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/ops-agent (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploystack-overview.md](./deploystack-overview.md)
- [deploystack-solutions-apps.md](./deploystack-solutions-apps.md)
- [deploystack-solutions-data-ops.md](./deploystack-solutions-data-ops.md)
