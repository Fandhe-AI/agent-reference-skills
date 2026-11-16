---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/import-rules
---

# gcloud compute firewall-policies import-rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute firewall-policies import-rules

```text
NAME
    gcloud compute firewall-policies import-rules - import Compute Engine
        organization firewall policy rules

SYNOPSIS
    gcloud compute firewall-policies import-rules FIREWALL_POLICY
        [--organization=ORGANIZATION] [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Imports Firewall Policy rules configuration from a file.

EXAMPLES
    Firewall Policy rules can be imported by running:

        $ gcloud compute firewall-policies import-rules FIREWALL_POLICY \
            --source=<path-to-file> --organization=<organization>

POSITIONAL ARGUMENTS
     FIREWALL_POLICY
        Short name or ID of the firewall policy to imports rules to.

FLAGS
     --organization=ORGANIZATION
        Organization in which the organization firewall policy rules import to.
        Must be set if FIREWALL_POLICY is short name.

     --source=SOURCE
        Path to a YAML file containing configuration export data.
        Alternatively, you may omit this flag to read from standard input. For
        a schema describing the export/import format, see:
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/compute/v1/FirewallPolicy.yaml.

            Note: $CLOUDSDKROOT represents the Google Cloud CLI's installation directory.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute firewall-policies import-rules

        $ gcloud beta compute firewall-policies import-rules
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute firewall-policies import-rules FIREWALL_POLICY \
    --source=PATH_TO_FILE \
    --organization=ORGANIZATION
```

### gcloud beta compute firewall-policies import-rules

```text
NAME
    gcloud beta compute firewall-policies import-rules - import Compute Engine
        organization firewall policy rules

SYNOPSIS
    gcloud beta compute firewall-policies import-rules FIREWALL_POLICY
        [--organization=ORGANIZATION] [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies import-rules

```text
NAME
    gcloud alpha compute firewall-policies import-rules - import Compute Engine
        organization firewall policy rules

SYNOPSIS
    gcloud alpha compute firewall-policies import-rules FIREWALL_POLICY
        [--organization=ORGANIZATION] [--source=SOURCE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/import-rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
