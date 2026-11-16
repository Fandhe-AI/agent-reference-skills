---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/packages/rollouts
---

# gcloud container fleet packages rollouts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet packages rollouts abort

```text
NAME
    gcloud container fleet packages rollouts abort - abort Rollout resource

SYNOPSIS
    gcloud container fleet packages rollouts abort
        (ROLLOUT : --fleet-package=FLEET_PACKAGE --location=LOCATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Abort Rollout resource.

EXAMPLES
    To abort Rollout 20240318 for cert-manager-app in us-central1, run:

        $ gcloud container fleet packages rollouts abort 20240318 \
             --fleet-package=cert-manager-app --location=us-central1

POSITIONAL ARGUMENTS
     Rollout resource - The rollout to abort. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --fleet-package=FLEET_PACKAGE
          Fleet Package name.

          To set the fleet-package attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --fleet-package on the command line.

       --location=LOCATION
          Google Cloud zone or region for the rollout.

          To set the location attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property config_delivery/location.

FLAGS
     --reason=REASON
        Reason for aborting rollout.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet packages rollouts abort

        $ gcloud beta container fleet packages rollouts abort
```

### gcloud container fleet packages rollouts describe

```text
NAME
    gcloud container fleet packages rollouts describe - describe Rollout
        resource

SYNOPSIS
    gcloud container fleet packages rollouts describe NAME
        --fleet-package=FLEET_PACKAGE [--less] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe Rollout resource.

EXAMPLES
    To view Rollout 20240318 for cert-manager-app in us-central1, run:

        $ gcloud container fleet packages rollouts describe 20240318 \
             --fleet-package=cert-manager-app --location=us-central1

POSITIONAL ARGUMENTS
     NAME
        Resource name.

REQUIRED FLAGS
     --fleet-package=FLEET_PACKAGE
        Parent Fleet Package of the Rollout.

OPTIONAL FLAGS
     --less
        Show less verbose output.

     --location=LOCATION
        Google Cloud zone or region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet packages rollouts describe

        $ gcloud beta container fleet packages rollouts describe
```

### gcloud container fleet packages rollouts list

```text
NAME
    gcloud container fleet packages rollouts list - list Rollouts of a Fleet
        Package

SYNOPSIS
    gcloud container fleet packages rollouts list --fleet-package=FLEET_PACKAGE
        [--less] [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Rollouts of a Fleet Package.

EXAMPLES
    To list all Rollouts for Fleet Package cert-manager-app in us-central1,
    run:

        $ gcloud container fleet packages rollouts list \
             --fleet-package=cert-manager-app --location=us-central1

REQUIRED FLAGS
     --fleet-package=FLEET_PACKAGE
        Parent Fleet Package of the Rollout.

FLAGS
     --less
        Show less verbose output.

     --location=LOCATION
        Google Cloud zone or region.

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

NOTES
    These variants are also available:

        $ gcloud alpha container fleet packages rollouts list

        $ gcloud beta container fleet packages rollouts list
```

### gcloud container fleet packages rollouts resume

```text
NAME
    gcloud container fleet packages rollouts resume - resume suspended Rollout

SYNOPSIS
    gcloud container fleet packages rollouts resume
        (ROLLOUT : --fleet-package=FLEET_PACKAGE --location=LOCATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Resume suspended Rollout.

EXAMPLES
    To resume Rollout 20240318 for cert-manager-app in us-central1, run:

        $ gcloud container fleet packages rollouts resume 20240318 \
             --fleet-package=cert-manager-app --location=us-central1

POSITIONAL ARGUMENTS
     Rollout resource - The rollout to resume. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --fleet-package=FLEET_PACKAGE
          Fleet Package name.

          To set the fleet-package attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --fleet-package on the command line.

       --location=LOCATION
          Google Cloud zone or region for the rollout.

          To set the location attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property config_delivery/location.

FLAGS
     --reason=REASON
        Reason for resuming rollout.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet packages rollouts resume

        $ gcloud beta container fleet packages rollouts resume
```

### gcloud container fleet packages rollouts suspend

```text
NAME
    gcloud container fleet packages rollouts suspend - suspend in-progress
        Rollout

SYNOPSIS
    gcloud container fleet packages rollouts suspend
        (ROLLOUT : --fleet-package=FLEET_PACKAGE --location=LOCATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Suspend in-progress Rollout.

EXAMPLES
    To suspend Rollout 20240318 for cert-manager-app in us-central1, run:

        $ gcloud container fleet packages rollouts suspend 20240318 \
             --fleet-package=cert-manager-app --location=us-central1

POSITIONAL ARGUMENTS
     Rollout resource - The rollout to suspend. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rollout or fully qualified identifier for the rollout.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --fleet-package=FLEET_PACKAGE
          Fleet Package name.

          To set the fleet-package attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --fleet-package on the command line.

       --location=LOCATION
          Google Cloud zone or region for the rollout.

          To set the location attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property config_delivery/location.

FLAGS
     --reason=REASON
        Reason for suspending rollout.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet packages rollouts suspend

        $ gcloud beta container fleet packages rollouts suspend
```

### gcloud beta container fleet packages rollouts abort

```text
NAME
    gcloud beta container fleet packages rollouts abort - abort Rollout
        resource

SYNOPSIS
    gcloud beta container fleet packages rollouts abort
        (ROLLOUT : --fleet-package=FLEET_PACKAGE --location=LOCATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet packages rollouts describe

```text
NAME
    gcloud beta container fleet packages rollouts describe - describe Rollout
        resource

SYNOPSIS
    gcloud beta container fleet packages rollouts describe NAME
        --fleet-package=FLEET_PACKAGE [--less] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet packages rollouts list

```text
NAME
    gcloud beta container fleet packages rollouts list - list Rollouts of a
        Fleet Package

SYNOPSIS
    gcloud beta container fleet packages rollouts list
        --fleet-package=FLEET_PACKAGE [--less] [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet packages rollouts resume

```text
NAME
    gcloud beta container fleet packages rollouts resume - resume suspended
        Rollout

SYNOPSIS
    gcloud beta container fleet packages rollouts resume
        (ROLLOUT : --fleet-package=FLEET_PACKAGE --location=LOCATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet packages rollouts suspend

```text
NAME
    gcloud beta container fleet packages rollouts suspend - suspend in-progress
        Rollout

SYNOPSIS
    gcloud beta container fleet packages rollouts suspend
        (ROLLOUT : --fleet-package=FLEET_PACKAGE --location=LOCATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet packages rollouts abort

```text
NAME
    gcloud alpha container fleet packages rollouts abort - abort Rollout
        resource

SYNOPSIS
    gcloud alpha container fleet packages rollouts abort
        (ROLLOUT : --fleet-package=FLEET_PACKAGE --location=LOCATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet packages rollouts describe

```text
NAME
    gcloud alpha container fleet packages rollouts describe - describe Rollout
        resource

SYNOPSIS
    gcloud alpha container fleet packages rollouts describe NAME
        --fleet-package=FLEET_PACKAGE [--less] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet packages rollouts list

```text
NAME
    gcloud alpha container fleet packages rollouts list - list Rollouts of a
        Fleet Package

SYNOPSIS
    gcloud alpha container fleet packages rollouts list
        --fleet-package=FLEET_PACKAGE [--less] [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet packages rollouts resume

```text
NAME
    gcloud alpha container fleet packages rollouts resume - resume suspended
        Rollout

SYNOPSIS
    gcloud alpha container fleet packages rollouts resume
        (ROLLOUT : --fleet-package=FLEET_PACKAGE --location=LOCATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet packages rollouts suspend

```text
NAME
    gcloud alpha container fleet packages rollouts suspend - suspend
        in-progress Rollout

SYNOPSIS
    gcloud alpha container fleet packages rollouts suspend
        (ROLLOUT : --fleet-package=FLEET_PACKAGE --location=LOCATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/packages/rollouts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
