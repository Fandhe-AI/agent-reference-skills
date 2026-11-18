---
source: https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/delete
---

# gcloud assured workloads delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud assured workloads delete

```text
NAME
    gcloud assured workloads delete - delete Assured Workloads environment

SYNOPSIS
    gcloud assured workloads delete
        (WORKLOAD : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--etag=ETAG] [--version=VERSION; default="v1"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a given Assured Workloads environment.

EXAMPLES
    To delete a V1 Assured Workload using a full resource name:

        $ gcloud assured workloads delete \
            organizations/123/locations/us-central1/workloads/456 --etag=789

    To delete a V1 Assured Workload using discrete resource flags:

        $ gcloud assured workloads delete 456 --organization=123 \
            --location=us-central1 --etag=789

    To delete a V2 Assured Workload using a full resource name:

        $ gcloud assured workloads delete \
            organizations/123/locations/us-central1/workloads/456 \
            --version=v2

    To delete a V2 Assured Workload using discrete resource flags:

        $ gcloud assured workloads delete 456 --organization=123 \
            --location=us-central1 --version=v2

    To delete a V2 Assured Workload asynchronously:

        $ gcloud assured workloads delete 456 --organization=123 \
            --location=us-central1 --async --version=v2

POSITIONAL ARGUMENTS
     Workload resource - The Assured Workloads environment resource to delete.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       WORKLOAD
          ID of the workload or fully qualified identifier for the workload.

          To set the workload attribute:
          + provide the argument workload on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the workload.

          To set the location attribute:
          + provide the argument workload on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The parent organization for the workload.

          To set the organization attribute:
          + provide the argument workload on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        The etag acquired by reading the Assured Workloads environment.

     --version=VERSION; default="v1"
        Assured Workloads API version to use. Options are v1 and v2. Defaults
        to v1. VERSION must be one of: v1, v2.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha assured workloads delete

        $ gcloud beta assured workloads delete
```

### gcloud beta assured workloads delete

```text
NAME
    gcloud beta assured workloads delete - delete Assured Workloads environment

SYNOPSIS
    gcloud beta assured workloads delete
        (WORKLOAD : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--etag=ETAG] [--version=VERSION; default="v1"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha assured workloads delete

```text
NAME
    gcloud alpha assured workloads delete - delete Assured Workloads
        environment

SYNOPSIS
    gcloud alpha assured workloads delete
        (WORKLOAD : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--etag=ETAG] [--version=VERSION; default="v1"] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
