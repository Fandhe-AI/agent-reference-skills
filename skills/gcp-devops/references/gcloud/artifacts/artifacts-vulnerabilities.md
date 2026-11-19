---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/vulnerabilities
---

# gcloud artifacts vulnerabilities

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts vulnerabilities list

```text
NAME
    gcloud artifacts vulnerabilities list - command for listing
        vulnerabilities. To see all fields, use --format=json

SYNOPSIS
    gcloud artifacts vulnerabilities list URI [--location=LOCATION]
        [--occurrence-filter=OCCURRENCE_FILTER] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Command for listing vulnerabilities. To see all fields, use --format=json.

EXAMPLES
    To list vulnerabilities for an artifact, run:

        $ gcloud artifacts vulnerabilities list \
            us-east1-docker.pkg.dev/project123/repository123/\
        someimage@sha256:49765698074d6d7baa82f

POSITIONAL ARGUMENTS
     URI
        An URI identifying a container image or package in Artifact Registry or
        Google Cloud Registry.

FLAGS
     --location=LOCATION
        If specified, all requests to Artifact Analysis for occurrences will go
        to location specified

     --occurrence-filter=OCCURRENCE_FILTER
        A filter for the occurrences which will be summarized. See link for
        officially supported filters:
        https://cloud.google.com/container-analysis/docs/os-scanning-automatically#filtering

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts vulnerabilities list us-east1-docker.pkg.dev/project123/repository123/someimage@sha256:49765698074d6d7baa82f
```

### gcloud artifacts vulnerabilities load-vex

```text
NAME
    gcloud artifacts vulnerabilities load-vex - load VEX data from a CSAF file
        into Artifact Analysis

SYNOPSIS
    gcloud artifacts vulnerabilities load-vex --source=SOURCE --uri=URI
        [--location=LOCATION] [--project=PROJECT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Command loads VEX data from a Common Security Advisory Framework (CSAF)
    file into Artifact Analysis as VulnerabilityAssessment Notes. VEX data
    tells Artifact Analysis whether vulnerabilities are relevant and how.

EXAMPLES
    To load a CSAF security advisory file given an artifact in Artifact
    Registry and the file on disk, run:

        $ gcloud artifacts vulnerabilities load-vex \
        --uri=us-east1-docker.pkg.dev/project123/repository123/\
        someimage@sha256:49765698074d6d7baa82f --source=/path/to/vex/file

    To load a CSAF security advisory file given an artifact with a tag and a
    file on disk, run:

        $ gcloud artifacts vulnerabilities load-vex \
        --uri=us-east1-docker.pkg.dev/project123/repository123/\
        someimage:latest --source=/path/to/vex/file

REQUIRED FLAGS
     --source=SOURCE
        The path of the VEX file.

     --uri=URI
        The path of the artifact in Artifact Registry. A 'gcr.io' image can
        also be used if redirection is enabled in Artifact Registry. Make sure
        'artifactregistry.projectsettings.get' permission is granted to the
        current gcloud user to verify the redirection status.

OPTIONAL FLAGS
     --location=LOCATION
        If specified, all requests to Artifact Analysis for occurrences will go
        to location specified

     --project=PROJECT
        The parent project to load security advisory into.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud artifacts vulnerabilities load-vex \
    --uri=us-east1-docker.pkg.dev/project123/repository123/someimage@sha256:49765698074d6d7baa82f \
    --source=/path/to/vex/file

gcloud artifacts vulnerabilities load-vex \
    --uri=us-east1-docker.pkg.dev/project123/repository123/someimage:latest \
    --source=/path/to/vex/file
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/vulnerabilities (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
