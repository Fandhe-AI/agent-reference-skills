---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/export-rules
---

# gcloud compute firewall-policies export-rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute firewall-policies export-rules

```text
NAME
    gcloud compute firewall-policies export-rules - export Compute Engine
        organization firewall policy rules

SYNOPSIS
    gcloud compute firewall-policies export-rules FIREWALL_POLICY
        [--destination=DESTINATION] [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Exports Firewall Policy rules configuration to a file.

EXAMPLES
    Firewall Policy rules can be exported by running:

        $ gcloud compute firewall-policies export-rules FIREWALL_POLICY \
            --destination=<path-to-file> --organization=<organization>

POSITIONAL ARGUMENTS
     FIREWALL_POLICY
        Short name or ID of the firewall policy to export rules from.

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported.
        Alternatively, you may omit this flag to write to standard output. For
        a schema describing the export/import format, see:
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/compute/v1/FirewallPolicy.yaml.

     --organization=ORGANIZATION
        Organization in which the organization firewall policy rules export
        from. Must be set if FIREWALL_POLICY is short name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute firewall-policies export-rules

        $ gcloud beta compute firewall-policies export-rules
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute firewall-policies export-rules FIREWALL_POLICY \
    --destination=PATH_TO_FILE \
    --organization=ORGANIZATION
```

### gcloud beta compute firewall-policies export-rules

```text
NAME
    gcloud beta compute firewall-policies export-rules - export Compute Engine
        organization firewall policy rules

SYNOPSIS
    gcloud beta compute firewall-policies export-rules FIREWALL_POLICY
        [--destination=DESTINATION] [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies export-rules

```text
NAME
    gcloud alpha compute firewall-policies export-rules - export Compute Engine
        organization firewall policy rules

SYNOPSIS
    gcloud alpha compute firewall-policies export-rules FIREWALL_POLICY
        [--destination=DESTINATION] [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/export-rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
