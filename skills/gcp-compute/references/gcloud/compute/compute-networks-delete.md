---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/delete
---

# gcloud compute networks delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute networks delete

```text
NAME
    gcloud compute networks delete - delete Compute Engine networks

SYNOPSIS
    gcloud compute networks delete NAME [NAME ...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute networks delete deletes one or more Compute Engine networks.
    Networks can only be deleted when no other resources (e.g., virtual machine
    instances) refer to them.

EXAMPLES
    To delete a network with the name 'network-name', run:

        $ gcloud compute networks delete network-name

    To delete two networks with the names 'network-name1' and 'network-name2',
    run:

        $ gcloud compute networks delete network-name1 network-name2

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the networks to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute networks delete

        $ gcloud beta compute networks delete
```

### gcloud beta compute networks delete

```text
NAME
    gcloud beta compute networks delete - delete Compute Engine networks

SYNOPSIS
    gcloud beta compute networks delete NAME [NAME ...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute networks delete

```text
NAME
    gcloud alpha compute networks delete - delete Compute Engine networks

SYNOPSIS
    gcloud alpha compute networks delete NAME [NAME ...] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
