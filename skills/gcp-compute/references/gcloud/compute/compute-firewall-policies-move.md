---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/move
---

# gcloud compute firewall-policies move

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute firewall-policies move

```text
NAME
    gcloud compute firewall-policies move - move a Compute Engine organization
        firewall policy

SYNOPSIS
    gcloud compute firewall-policies move FIREWALL_POLICY [--folder=FOLDER]
        [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute firewall-policies move is used to move is used to move
    organization firewall policies to new parent nodes.

EXAMPLES
    To move an organization firewall policy under folder with ID ``123456789"
    to folder ``987654321", run:

        $ gcloud compute firewall-policies move 123456789 --folder=987654321

POSITIONAL ARGUMENTS
     FIREWALL_POLICY
        Short name or ID of the firewall policy to move.

FLAGS
     --folder=FOLDER
        Folder to which the organization firewall policy is to be moved.

     --organization=ORGANIZATION
        Organization in which the organization firewall policy is to be moved.
        Must be set if FIREWALL_POLICY is short name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

IAM PERMISSIONS
    To move a firewall policy, the user must have the following permission:
    compute.firewallPolicies.move.

    To find predefined roles that contain those permissions, see the Compute
    Engine IAM roles (https://cloud.google.com/compute/docs/access/iam).

NOTES
    These variants are also available:

        $ gcloud alpha compute firewall-policies move

        $ gcloud beta compute firewall-policies move
```

### gcloud beta compute firewall-policies move

```text
NAME
    gcloud beta compute firewall-policies move - move a Compute Engine
        organization firewall policy

SYNOPSIS
    gcloud beta compute firewall-policies move FIREWALL_POLICY
        [--folder=FOLDER] [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies move

```text
NAME
    gcloud alpha compute firewall-policies move - move a Compute Engine
        organization firewall policy

SYNOPSIS
    gcloud alpha compute firewall-policies move FIREWALL_POLICY
        [--folder=FOLDER] [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/move (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
