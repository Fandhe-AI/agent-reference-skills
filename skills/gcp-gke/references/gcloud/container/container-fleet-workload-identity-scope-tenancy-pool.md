---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/workload-identity/scope-tenancy-pool
---

# gcloud container fleet workload-identity scope-tenancy-pool

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet workload-identity scope-tenancy-pool set

```text
NAME
    gcloud container fleet workload-identity scope-tenancy-pool set - set Scope
        Tenancy Pool

SYNOPSIS
    gcloud container fleet workload-identity scope-tenancy-pool set
        WORKLOAD_IDENTITY_POOL [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the scope tenancy pool for a fleet.

EXAMPLES
    To set the scope tenancy pool using a fully qualified identifier for the
    Workload Identity Pool:

        $ gcloud container fleet workload-identity scope-tenancy-pool set \
            projects/my-project/locations/global/workloadIdentityPools/\
        test-pool

    To set the scope tenancy pool using a Workload Identity Pool ID and
    project:

        $ gcloud container fleet workload-identity scope-tenancy-pool set \
            test-pool --project=my-project

POSITIONAL ARGUMENTS
     Workloadidentitypool resource - The group of arguments defining a Workload
     Identity Pool. This represents a Cloud resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument WORKLOAD_IDENTITY_POOL on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument WORKLOAD_IDENTITY_POOL on the command line with
        a fully specified name;
      * provide the argument --location on the command line;
      * set the property gkehub/location.

     This must be specified.

       WORKLOAD_IDENTITY_POOL
          ID of the workloadidentitypool or fully qualified identifier for the
          workloadidentitypool.

          To set the workloadidentitypool attribute:
          + provide the argument WORKLOAD_IDENTITY_POOL on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet workload-identity \
            scope-tenancy-pool set

        $ gcloud beta container fleet workload-identity scope-tenancy-pool \
            set
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud container fleet workload-identity scope-tenancy-pool set projects/my-project/locations/global/workloadIdentityPools/test-pool
```

### gcloud container fleet workload-identity scope-tenancy-pool unset

```text
NAME
    gcloud container fleet workload-identity scope-tenancy-pool unset - unset
        Scope Tenancy Pool

SYNOPSIS
    gcloud container fleet workload-identity scope-tenancy-pool unset
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Unset the scope tenancy pool for a fleet.

EXAMPLES
    To unset the scope tenancy pool, run:

        $ gcloud container fleet workload-identity scope-tenancy-pool unset

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet workload-identity \
            scope-tenancy-pool unset

        $ gcloud beta container fleet workload-identity scope-tenancy-pool \
            unset
```

### gcloud beta container fleet workload-identity scope-tenancy-pool set

```text
NAME
    gcloud beta container fleet workload-identity scope-tenancy-pool set - set
        Scope Tenancy Pool

SYNOPSIS
    gcloud beta container fleet workload-identity scope-tenancy-pool set
        WORKLOAD_IDENTITY_POOL [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet workload-identity scope-tenancy-pool unset

```text
NAME
    gcloud beta container fleet workload-identity scope-tenancy-pool unset -
        unset Scope Tenancy Pool

SYNOPSIS
    gcloud beta container fleet workload-identity scope-tenancy-pool unset
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet workload-identity scope-tenancy-pool set

```text
NAME
    gcloud alpha container fleet workload-identity scope-tenancy-pool set - set
        Scope Tenancy Pool

SYNOPSIS
    gcloud alpha container fleet workload-identity scope-tenancy-pool set
        WORKLOAD_IDENTITY_POOL [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet workload-identity scope-tenancy-pool unset

```text
NAME
    gcloud alpha container fleet workload-identity scope-tenancy-pool unset -
        unset Scope Tenancy Pool

SYNOPSIS
    gcloud alpha container fleet workload-identity scope-tenancy-pool unset
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/workload-identity/scope-tenancy-pool (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
