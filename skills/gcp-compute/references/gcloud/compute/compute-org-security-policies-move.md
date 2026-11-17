---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/move
---

# gcloud compute org-security-policies move

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute org-security-policies move

```text
NAME
    gcloud compute org-security-policies move - move a Compute Engine
        organization security policy

SYNOPSIS
    gcloud compute org-security-policies move SECURITY_POLICY [--folder=FOLDER]
        [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies move is used to move is used to move
    organization security policies to new parent nodes.

EXAMPLES
    To move an organization security policy under folder with ID 123456789 to
    folder 987654321, run:

        $ gcloud compute org-security-policies move 123456789 \
            --folder=987654321

POSITIONAL ARGUMENTS
     SECURITY_POLICY
        Short name or ID of the security policy to move.

FLAGS
     --folder=FOLDER
        Folder to which the organization security policy is to be moved.

     --organization=ORGANIZATION
        Organization in which the organization security policy is to be moved.
        Must be set if SECURITY_POLICY is the short name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies move

        $ gcloud beta compute org-security-policies move
```

### gcloud beta compute org-security-policies move

```text
NAME
    gcloud beta compute org-security-policies move - move a Compute Engine
        organization security policy

SYNOPSIS
    gcloud beta compute org-security-policies move SECURITY_POLICY
        [--folder=FOLDER] [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies move

```text
NAME
    gcloud alpha compute org-security-policies move - move a Compute Engine
        organization security policy

SYNOPSIS
    gcloud alpha compute org-security-policies move SECURITY_POLICY
        [--folder=FOLDER] [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/move (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
