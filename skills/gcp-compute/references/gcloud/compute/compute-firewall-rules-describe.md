---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-rules/describe
---

# gcloud compute firewall-rules describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute firewall-rules describe

```text
NAME
    gcloud compute firewall-rules describe - describe a Compute Engine firewall
        rule

SYNOPSIS
    gcloud compute firewall-rules describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute firewall-rules describe displays all data associated with a
    Compute Engine firewall rule in a project.

EXAMPLES
    To describe a firewall rule, run:

        $ gcloud compute firewall-rules describe my-firewall-rule

POSITIONAL ARGUMENTS
     NAME
        Name of the firewall rule to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute firewall-rules describe

        $ gcloud beta compute firewall-rules describe
```

### gcloud beta compute firewall-rules describe

```text
NAME
    gcloud beta compute firewall-rules describe - describe a Compute Engine
        firewall rule

SYNOPSIS
    gcloud beta compute firewall-rules describe NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-rules describe

```text
NAME
    gcloud alpha compute firewall-rules describe - describe a Compute Engine
        firewall rule

SYNOPSIS
    gcloud alpha compute firewall-rules describe NAME [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-rules/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
