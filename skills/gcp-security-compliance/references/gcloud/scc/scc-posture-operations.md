---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/posture-operations
---

# gcloud scc posture-operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc posture-operations describe

```text
NAME
    gcloud scc posture-operations describe - describe a Cloud Security Command
        Center posture long running operation

SYNOPSIS
    gcloud scc posture-operations describe OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Security Command Center (SCC) posture long running
    operation.

EXAMPLES
    To return long running operation status for operation
    (operation-1694515698847-605272e4bcd7c-f93dade6-067467ae) of parent
    organizations/123/locations/global, run:

        $ gcloud scc posture-operations describe \
            organizations/123/locations/global/operations/\
        operation-1694515698847-605272e4bcd7c-f93dade6-067467ae

POSITIONAL ARGUMENTS
     OPERATION_NAME
        Relative resource name of the operation, of the format:
        organizations/<organizationID>/locations/<location>/operations/<operationID>.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securityposture/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    This variant is also available:

        $ gcloud alpha scc posture-operations describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud scc posture-operations describe organizations/123/locations/global/operations/operation-1694515698847-605272e4bcd7c-f93dade6-067467ae
```

### gcloud alpha scc posture-operations describe

```text
NAME
    gcloud alpha scc posture-operations describe - describe a Cloud Security
        Command Center posture long running operation

SYNOPSIS
    gcloud alpha scc posture-operations describe OPERATION_NAME
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/posture-operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
