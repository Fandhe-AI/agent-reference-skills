---
source: https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/describe
---

# gcloud assured workloads describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud assured workloads describe

```text
NAME
    gcloud assured workloads describe - describe Assured Workloads environment

SYNOPSIS
    gcloud assured workloads describe
        (WORKLOAD : --location=LOCATION --organization=ORGANIZATION)
        [--version=VERSION; default="v1"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Obtain details about a given Assured Workloads environment.

EXAMPLES
    To describe an Assured Workloads environment in the us-central1 region,
    belonging to an organization with ID 123, with workload ID 456, run:

        $ gcloud assured workloads describe \
            organizations/123/locations/us-central1/workloads/456

    To describe an Assured Workloads V2 environment:

        $ gcloud assured workloads describe \
            organizations/123/locations/us-central1/workloads/456 \
            --version=v2

POSITIONAL ARGUMENTS
     Workload resource - The Assured Workloads environment resource to
     describe. The arguments in this group can be used to specify the
     attributes of this resource.

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

        $ gcloud alpha assured workloads describe

        $ gcloud beta assured workloads describe
```

### gcloud beta assured workloads describe

```text
NAME
    gcloud beta assured workloads describe - describe Assured Workloads
        environment

SYNOPSIS
    gcloud beta assured workloads describe
        (WORKLOAD : --location=LOCATION --organization=ORGANIZATION)
        [--version=VERSION; default="v1"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha assured workloads describe

```text
NAME
    gcloud alpha assured workloads describe - describe Assured Workloads
        environment

SYNOPSIS
    gcloud alpha assured workloads describe
        (WORKLOAD : --location=LOCATION --organization=ORGANIZATION)
        [--version=VERSION; default="v1"] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
