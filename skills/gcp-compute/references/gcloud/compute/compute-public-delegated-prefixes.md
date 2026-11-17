---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/public-delegated-prefixes
---

# gcloud compute public-delegated-prefixes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute public-delegated-prefixes create

```text
NAME
    gcloud compute public-delegated-prefixes create - creates a Compute Engine
        public delegated prefix

SYNOPSIS
    gcloud compute public-delegated-prefixes create NAME --range=RANGE
        (--public-advertised-prefix=PUBLIC_ADVERTISED_PREFIX
          | --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX)
        [--allocatable-prefix-length=ALLOCATABLE_PREFIX_LENGTH]
        [--description=DESCRIPTION] [--enable-live-migration] [--mode=MODE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a public delegated prefix:

        $ gcloud compute public-delegated-prefixes create \
            my-public-delegated-prefix --public-advertised-prefix=my-pap \
            --range=120.120.10.128/27 --global

POSITIONAL ARGUMENTS
     NAME
        Name of the public delegated prefix to operate on.

REQUIRED FLAGS
     --range=RANGE
        IP range from this public delegated prefix that should be delegated, in
        CIDR format. It must be smaller than parent public advertised prefix
        range.

     Exactly one of these must be specified:

       --public-advertised-prefix=PUBLIC_ADVERTISED_PREFIX
          Public advertised prefix that this delegated prefix is created from.

       --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX
          Regional Public delegated prefix that this delegated prefix is
          created from.

OPTIONAL FLAGS
     --allocatable-prefix-length=ALLOCATABLE_PREFIX_LENGTH
        The allocatable prefix length supported by this PDP.

     --description=DESCRIPTION
        Description of this public delegated prefix.

     --enable-live-migration
        Specify if this public delegated prefix is meant to be live migrated.

     --mode=MODE
        Specifies the mode of this IPv6 PDP. MODE must be one of: delegation,
        external-ipv6-forwarding-rule-creation,
        external-ipv6-subnetwork-creation, internal-ipv6-subnetwork-creation.

     At most one of these can be specified:

       --global
          If set, the public delegated prefix is global.

       --region=REGION
          Region of the public delegated prefix to operate on. Overrides the
          default compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute public-delegated-prefixes create

        $ gcloud beta compute public-delegated-prefixes create
```

### gcloud compute public-delegated-prefixes delegated-sub-prefixes create

```text
NAME
    gcloud compute public-delegated-prefixes delegated-sub-prefixes create -
        creates a Compute Engine delegated sub prefix

SYNOPSIS
    gcloud compute public-delegated-prefixes delegated-sub-prefixes create NAME
        --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX
        [--allocatable-prefix-length=ALLOCATABLE_PREFIX_LENGTH]
        [--create-addresses] [--delegatee-project=DELEGATEE_PROJECT]
        [--description=DESCRIPTION] [--mode=MODE] [--range=RANGE]
        [--global-public-delegated-prefix
          | --public-delegated-prefix-region=PUBLIC_DELEGATED_PREFIX_REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a Compute Engine delegated sub prefix.

EXAMPLES
    To create a delegated sub prefix for a global public delegated prefix:

        $ gcloud compute public-delegated-prefixes delegated-sub-prefixes \
            create my-sub-prefix --range=120.120.10.128/28 \
            --public-delegated-prefix=my-pdp \
            --global-public-delegated-prefix

    To create a delegated sub prefix for a regional public delegated prefix:

        $ gcloud compute public-delegated-prefixes delegated-sub-prefixes \
            create my-sub-prefix --range=120.120.10.128/30 \
            --create-addresses --public-delegated-prefix=my-pdp \
            --public-delegated-prefix-region=us-east1

POSITIONAL ARGUMENTS
     NAME
        Name of the delegated sub prefix to create.

REQUIRED FLAGS
     --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX
        Name of the public delegated prefix to create the delegate sub prefix
        for.

OPTIONAL FLAGS
     --allocatable-prefix-length=ALLOCATABLE_PREFIX_LENGTH
        Specify allocatable prefix length supported by this sub prefix.

     --create-addresses
        Specify if the sub prefix is delegated to create address resources in
        the delegatee project. Default is false.

     --delegatee-project=DELEGATEE_PROJECT
        Project to delegate the IPv4 range specified in --range to. If empty,
        the sub-range is delegated to the same/existing project.

     --description=DESCRIPTION
        Description of the delegated sub prefix to create.

     --mode=MODE
        Specifies the mode of this IPv6 PDP. MODE must be one of: delegation,
        external-ipv6-forwarding-rule-creation,
        external-ipv6-subnetwork-creation, internal-ipv6-subnetwork-creation.

     --range=RANGE
        IPv4 range from this public delegated prefix that should be delegated,
        in CIDR format. If not specified, the entire range ofthe public
        advertised prefix is delegated.

     At most one of these can be specified:

       --global-public-delegated-prefix
          If set, the public delegated prefix is global.

       --public-delegated-prefix-region=PUBLIC_DELEGATED_PREFIX_REGION
          Region of the public delegated prefix to create the delegate sub
          prefix for. If not specified, you might be prompted to select a
          region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute public-delegated-prefixes \
            delegated-sub-prefixes create

        $ gcloud beta compute public-delegated-prefixes \
            delegated-sub-prefixes create
```

### gcloud compute public-delegated-prefixes delegated-sub-prefixes delete

```text
NAME
    gcloud compute public-delegated-prefixes delegated-sub-prefixes delete -
        deletes a Compute Engine delegated sub prefix

SYNOPSIS
    gcloud compute public-delegated-prefixes delegated-sub-prefixes delete NAME
        --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX
        [--global-public-delegated-prefix
          | --public-delegated-prefix-region=PUBLIC_DELEGATED_PREFIX_REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a Compute Engine delegated sub prefix.

EXAMPLES
    To delete a delegated sub prefix for a global public delegated prefix:

        $ gcloud compute public-delegated-prefixes delegated-sub-prefixes \
            delete my-sub-prefix --public-delegated-prefix=my-pdp \
            --global-public-delegated-prefix

    To delete a delegated sub prefix for a regional public delegated prefix:

        $ gcloud compute public-delegated-prefixes delegated-sub-prefixes \
            delete my-sub-prefix --public-delegated-prefix=my-pdp \
            --public-delegated-prefix-region=us-east1

POSITIONAL ARGUMENTS
     NAME
        Name of the delegated sub prefix to delete.

REQUIRED FLAGS
     --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX
        Name of the public delegated prefix to delete the delegate sub prefix
        for.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global-public-delegated-prefix
          If set, the public delegated prefix is global.

       --public-delegated-prefix-region=PUBLIC_DELEGATED_PREFIX_REGION
          Region of the public delegated prefix to delete the delegate sub
          prefix for. If not specified, you might be prompted to select a
          region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute public-delegated-prefixes \
            delegated-sub-prefixes delete

        $ gcloud beta compute public-delegated-prefixes \
            delegated-sub-prefixes delete
```

### gcloud compute public-delegated-prefixes delete

```text
NAME
    gcloud compute public-delegated-prefixes delete - deletes a Compute Engine
        public delegated prefix

SYNOPSIS
    gcloud compute public-delegated-prefixes delete NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete a public delegated prefix:

        $ gcloud compute public-delegated-prefixes delete \
            my-public-delegated-prefix --global

POSITIONAL ARGUMENTS
     NAME
        Name of the public delegated prefix to operate on.

FLAGS
     At most one of these can be specified:

       --global
          If set, the public delegated prefix is global.

       --region=REGION
          Region of the public delegated prefix to operate on. Overrides the
          default compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute public-delegated-prefixes delete

        $ gcloud beta compute public-delegated-prefixes delete
```

### gcloud compute public-delegated-prefixes describe

```text
NAME
    gcloud compute public-delegated-prefixes describe - describes a Compute
        Engine public delegated prefix

SYNOPSIS
    gcloud compute public-delegated-prefixes describe NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To describe a public delegated prefix:

        $ gcloud compute public-delegated-prefixes describe \
            my-public-delegated-prefix --global

POSITIONAL ARGUMENTS
     NAME
        Name of the public delegated prefix to operate on.

FLAGS
     At most one of these can be specified:

       --global
          If set, the public delegated prefix is global.

       --region=REGION
          Region of the public delegated prefix to operate on. Overrides the
          default compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute public-delegated-prefixes describe

        $ gcloud beta compute public-delegated-prefixes describe
```

### gcloud compute public-delegated-prefixes list

```text
NAME
    gcloud compute public-delegated-prefixes list - list Google Compute Engine
        public delegated prefixes

SYNOPSIS
    gcloud compute public-delegated-prefixes list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute public-delegated-prefixes list displays all Google Compute
    Engine public delegated prefixes in a project.

EXAMPLES
    To list all public delegated prefixes in a project in table form, run:

        $ gcloud compute public-delegated-prefixes list

    To list the URIs of all public delegated prefixes in a project, run:

        $ gcloud compute public-delegated-prefixes list --uri

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

        $ gcloud alpha compute public-delegated-prefixes list

        $ gcloud beta compute public-delegated-prefixes list
```

### gcloud compute public-delegated-prefixes update

```text
NAME
    gcloud compute public-delegated-prefixes update - updates a Compute Engine
        public delegated prefix

SYNOPSIS
    gcloud compute public-delegated-prefixes update NAME
        (--announce-prefix | --withdraw-prefix) [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To announce a regional v2 public delegated prefix:

        $ gcloud compute public-delegated-prefixes update my-pdp \
            --announce-prefix --region=us-central1

    To withdraw a regional v2 public delegated prefix:

        $ gcloud compute public-delegated-prefixes update my-pdp \
            --withdraw-prefix --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the public delegated prefix to operate on.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --announce-prefix
          Specify if the prefix will be announced. Default is false.

       --withdraw-prefix
          Specify if the prefix will be withdrawn. Default is false.

OPTIONAL FLAGS
     --region=REGION
        Region of the public delegated prefix to operate on. Overrides the
        default compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute public-delegated-prefixes update

        $ gcloud beta compute public-delegated-prefixes update
```

### gcloud beta compute public-delegated-prefixes create

```text
NAME
    gcloud beta compute public-delegated-prefixes create - creates a Compute
        Engine public delegated prefix

SYNOPSIS
    gcloud beta compute public-delegated-prefixes create NAME --range=RANGE
        (--public-advertised-prefix=PUBLIC_ADVERTISED_PREFIX
          | --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX)
        [--allocatable-prefix-length=ALLOCATABLE_PREFIX_LENGTH]
        [--description=DESCRIPTION] [--enable-live-migration] [--mode=MODE]
        [--purpose=PURPOSE] [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute public-delegated-prefixes delegated-sub-prefixes create

```text
NAME
    gcloud beta compute public-delegated-prefixes delegated-sub-prefixes create
        - creates a Compute Engine delegated sub prefix

SYNOPSIS
    gcloud beta compute public-delegated-prefixes delegated-sub-prefixes create
        NAME --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX
        [--allocatable-prefix-length=ALLOCATABLE_PREFIX_LENGTH]
        [--create-addresses] [--delegatee-project=DELEGATEE_PROJECT]
        [--description=DESCRIPTION] [--mode=MODE] [--range=RANGE]
        [--global-public-delegated-prefix
          | --public-delegated-prefix-region=PUBLIC_DELEGATED_PREFIX_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute public-delegated-prefixes delegated-sub-prefixes delete

```text
NAME
    gcloud beta compute public-delegated-prefixes delegated-sub-prefixes delete
        - deletes a Compute Engine delegated sub prefix

SYNOPSIS
    gcloud beta compute public-delegated-prefixes delegated-sub-prefixes delete
        NAME --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX
        [--global-public-delegated-prefix
          | --public-delegated-prefix-region=PUBLIC_DELEGATED_PREFIX_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute public-delegated-prefixes delete

```text
NAME
    gcloud beta compute public-delegated-prefixes delete - deletes a Compute
        Engine public delegated prefix

SYNOPSIS
    gcloud beta compute public-delegated-prefixes delete NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute public-delegated-prefixes describe

```text
NAME
    gcloud beta compute public-delegated-prefixes describe - describes a
        Compute Engine public delegated prefix

SYNOPSIS
    gcloud beta compute public-delegated-prefixes describe NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute public-delegated-prefixes list

```text
NAME
    gcloud beta compute public-delegated-prefixes list - list Google Compute
        Engine public delegated prefixes

SYNOPSIS
    gcloud beta compute public-delegated-prefixes list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute public-delegated-prefixes update

```text
NAME
    gcloud beta compute public-delegated-prefixes update - updates a Compute
        Engine public delegated prefix

SYNOPSIS
    gcloud beta compute public-delegated-prefixes update NAME
        (--announce-prefix | --withdraw-prefix) [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-delegated-prefixes create

```text
NAME
    gcloud alpha compute public-delegated-prefixes create - creates a Compute
        Engine public delegated prefix

SYNOPSIS
    gcloud alpha compute public-delegated-prefixes create NAME --range=RANGE
        (--public-advertised-prefix=PUBLIC_ADVERTISED_PREFIX
          | --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX)
        [--allocatable-prefix-length=ALLOCATABLE_PREFIX_LENGTH]
        [--description=DESCRIPTION] [--enable-live-migration] [--mode=MODE]
        [--purpose=PURPOSE] [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-delegated-prefixes delegated-sub-prefixes create

```text
NAME
    gcloud alpha compute public-delegated-prefixes delegated-sub-prefixes
        create - creates a Compute Engine delegated sub prefix

SYNOPSIS
    gcloud alpha compute public-delegated-prefixes delegated-sub-prefixes
        create NAME --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX
        [--allocatable-prefix-length=ALLOCATABLE_PREFIX_LENGTH]
        [--create-addresses] [--delegatee-project=DELEGATEE_PROJECT]
        [--description=DESCRIPTION] [--mode=MODE] [--range=RANGE]
        [--global-public-delegated-prefix
          | --public-delegated-prefix-region=PUBLIC_DELEGATED_PREFIX_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-delegated-prefixes delegated-sub-prefixes delete

```text
NAME
    gcloud alpha compute public-delegated-prefixes delegated-sub-prefixes
        delete - deletes a Compute Engine delegated sub prefix

SYNOPSIS
    gcloud alpha compute public-delegated-prefixes delegated-sub-prefixes
        delete NAME --public-delegated-prefix=PUBLIC_DELEGATED_PREFIX
        [--global-public-delegated-prefix
          | --public-delegated-prefix-region=PUBLIC_DELEGATED_PREFIX_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-delegated-prefixes delete

```text
NAME
    gcloud alpha compute public-delegated-prefixes delete - deletes a Compute
        Engine public delegated prefix

SYNOPSIS
    gcloud alpha compute public-delegated-prefixes delete NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-delegated-prefixes describe

```text
NAME
    gcloud alpha compute public-delegated-prefixes describe - describes a
        Compute Engine public delegated prefix

SYNOPSIS
    gcloud alpha compute public-delegated-prefixes describe NAME
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-delegated-prefixes list

```text
NAME
    gcloud alpha compute public-delegated-prefixes list - list Google Compute
        Engine public delegated prefixes

SYNOPSIS
    gcloud alpha compute public-delegated-prefixes list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-delegated-prefixes update

```text
NAME
    gcloud alpha compute public-delegated-prefixes update - updates a Compute
        Engine public delegated prefix

SYNOPSIS
    gcloud alpha compute public-delegated-prefixes update NAME
        (--announce-prefix | --withdraw-prefix) [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/public-delegated-prefixes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
