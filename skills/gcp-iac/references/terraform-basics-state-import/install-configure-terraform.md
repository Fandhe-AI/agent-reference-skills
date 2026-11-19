---
source: https://docs.cloud.google.com/docs/terraform/install-configure-terraform
---

# Install and configure Terraform

Steps to install Terraform for Google Cloud in Cloud Shell and in a local shell, and the Google Cloud tasks to complete before use.

## Signature / Usage

### Verify that Terraform is available (Cloud Shell and local shell)

```bash
terraform
```

Expected output is similar to:

```text
Usage: terraform [global options] <subcommand> [args]

The available commands for execution are listed below.
The primary workflow commands are given first, followed by
less common or more advanced commands.

Main commands:
  init          Prepare your working directory for other commands
  validate      Check whether the configuration is valid
  plan          Show changes required by the current configuration
  apply         Create or update infrastructure
  destroy       Destroy previously-created infrastructure
```

## Options / Props

### Google Cloud prerequisites

| Task | Detail |
|------|--------|
| Project | Create or have a Google Cloud project. |
| Billing | Enable billing for the project. |
| APIs | Enable APIs for the Google Cloud services you intend to work with. |
| Authentication | Set up authentication for Terraform. |

## Notes

- Cloud Shell: install the Terraform CLI by following the HashiCorp instructions; customize the environment to install on startup, or install the binary to your home directory to persist it between sessions.
- Local shell: use the installation instructions provided by Terraform.
- Source: https://docs.cloud.google.com/docs/terraform/install-configure-terraform (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [basic-commands.md](./basic-commands.md)
- [create-vm-instance.md](./create-vm-instance.md)
