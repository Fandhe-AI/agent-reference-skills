---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/operations
---

# gcloud scc operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc operations describe

```text
NAME
    gcloud scc operations describe - describe a Cloud SCC's long running scan
        operation

SYNOPSIS
    gcloud scc operations describe (OPERATION : --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud SCC's long running scan operation.

EXAMPLES
    Return long running scan operation status for operation id
    (9c5fa5e5-e368-439a-baa4-08c17b77ec23) and organization 123456. Operation
    id is obtained using run-discovery command:

        $ gcloud scc operations describe \
            9c5fa5e5-e368-439a-baa4-08c17b77ec23 --organization=123456

POSITIONAL ARGUMENTS
     Operation resource - Cloud SCC's API operation to describe. The arguments
     in this group can be used to specify the attributes of this resource.

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --organization=ORGANIZATION
          (Optional) If the full resource name isn't provided e.g.
          organizations/123, then provide the organization id which is the
          suffix of the organization. Example: organizations/123, the id is
          123.

          To set the organization attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line;
          + Set the organization property in configuration using gcloud
            config set scc/organization if it is not specified in command
            line..

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securitycenter/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    These variants are also available:

        $ gcloud alpha scc operations describe

        $ gcloud beta scc operations describe
```

### gcloud beta scc operations describe

```text
NAME
    gcloud beta scc operations describe - describe a Cloud SCC's long running
        scan operation

SYNOPSIS
    gcloud beta scc operations describe
        (OPERATION : --organization=ORGANIZATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc operations describe

```text
NAME
    gcloud alpha scc operations describe - describe a Cloud SCC's long running
        scan operation

SYNOPSIS
    gcloud alpha scc operations describe
        (OPERATION : --organization=ORGANIZATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
