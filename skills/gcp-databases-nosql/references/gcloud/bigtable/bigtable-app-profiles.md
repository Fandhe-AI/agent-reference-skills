---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/app-profiles
---

# gcloud bigtable app-profiles

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable app-profiles create

```text
NAME
    gcloud bigtable app-profiles create - create a new Bigtable app profile

SYNOPSIS
    gcloud bigtable app-profiles create (APP_PROFILE : --instance=INSTANCE)
        ([--route-any : --restrict-to=[RESTRICT_TO,...] --row-affinity]
          | [--route-to=ROUTE_TO : --transactional-writes])
        [--description=DESCRIPTION] [--force]
        [--data-boost
          --data-boost-compute-billing-owner=DATA_BOOST_COMPUTE_BILLING_OWNER
          | --priority=PRIORITY --standard] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Bigtable app profile.

EXAMPLES
    To create an app profile with a multi-cluster routing policy, run:

        $ gcloud bigtable app-profiles create my-app-profile-id \
            --instance=my-instance-id --route-any

    To create an app profile with a single-cluster routing policy which routes
    all requests to my-cluster-id, run:

        $ gcloud bigtable app-profiles create \
            my-single-cluster-app-profile --instance=my-instance-id \
            --route-to=my-cluster-id

    To create an app profile with a friendly description, run:

        $ gcloud bigtable app-profiles create my-app-profile-id \
            --instance=my-instance-id --route-any \
            --description="Routes requests for my use case"

    To create an app profile with a request priority of PRIORITY_MEDIUM, run:

        $ gcloud bigtable app-profiles create my-app-profile-id \
            --instance=my-instance-id --route-any --priority=PRIORITY_MEDIUM

    To create an app profile with row-affinity routing enabled, run:

        $ gcloud bigtable app-profiles create my-app-profile-id \
            --instance=my-instance-id --route-any --row-affinity

    To create an app profile with Data Boost enabled which bills usage to the
    host project, run:

        $ gcloud bigtable app-profiles create my-app-profile-id \
            --instance=my-instance-id --data-boost \
            --data-boost-compute-billing-owner=HOST_PAYS

POSITIONAL ARGUMENTS
     App profile resource - The app profile to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument app_profile on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APP_PROFILE
          ID of the app profile or fully qualified identifier for the app
          profile.

          To set the name attribute:
          + provide the argument app_profile on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the app profile.

          To set the instance attribute:
          + provide the argument app_profile on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       Multi Cluster Routing Policy

       --route-any
          Use Multi Cluster Routing policy.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --restrict-to=[RESTRICT_TO,...]
          Cluster IDs to route to using the Multi Cluster Routing Policy. If
          unset, all clusters in the instance are eligible.

       --row-affinity
          Use row-affinity routing for this app profile.

       Single Cluster Routing Policy

       --route-to=ROUTE_TO
          Cluster ID to route to using Single Cluster Routing policy.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --transactional-writes
          Allow transactional writes with a Single Cluster Routing policy.

OPTIONAL FLAGS
     --description=DESCRIPTION
        Friendly name of the app profile.

     --force
        Ignore warnings and force create.

     At most one of these can be specified:

       Data Boost Read-only Isolation

       --data-boost
          Use Data Boost serverless compute option, rather than standard
          provisioned node compute. If specified,
          --data-boost-compute-billing-owner is required. Specifying Data Boost
          compute on an app profile that uses standard provisioned node compute
          may cause unexpected behavior for running applications.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --data-boost-compute-billing-owner=DATA_BOOST_COMPUTE_BILLING_OWNER
          Specify the Data Boost compute billing owner, required if
          --data-boost is passed. DATA_BOOST_COMPUTE_BILLING_OWNER must be
          (only one value is supported):

           HOST_PAYS
              Compute billing should be accounted towards the host Cloud
              project (containing the targeted Bigtable instance / table).

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Standard Isolation

       --priority=PRIORITY
          Specify the request priority under standard provisioned node compute
          capabilities. Passing this option implies standard provisioned node
          compute, e.g. the --standard option. If not specified, the app
          profile uses standard provisioned node compute with PRIORITY_HIGH by
          default. Specifying request priority on an app profile that has Data
          Boost serverless compute enabled changes the compute option to
          standard and uses the specified priority, which might cause
          unexpected behavior for running applications. PRIORITY must be one
          of:

           PRIORITY_HIGH
              Requests are treated with high priority.
           PRIORITY_LOW
              Requests are treated with low priority.
           PRIORITY_MEDIUM
              Requests are treated with medium priority.

       --standard
          Use standard provisioned node compute option, rather than Data Boost
          compute option. If specified, --priority is required.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable app-profiles create

        $ gcloud beta bigtable app-profiles create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud bigtable app-profiles create my-app-profile-id \
    --instance=my-instance-id \
    --route-to=my-cluster-id \
    --data-boost \
    --data-boost-compute-billing-owner=HOST_PAYS
```

### gcloud bigtable app-profiles delete

```text
NAME
    gcloud bigtable app-profiles delete - delete a Bigtable app profile

SYNOPSIS
    gcloud bigtable app-profiles delete (APP_PROFILE : --instance=INSTANCE)
        [--force] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Bigtable app profile.

EXAMPLES
    To delete an app profile, run:

        $ gcloud bigtable app-profiles delete my-app-profile-id \
            --instance=my-instance-id

POSITIONAL ARGUMENTS
     App profile resource - The app profile to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument app_profile on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APP_PROFILE
          ID of the app profile or fully qualified identifier for the app
          profile.

          To set the name attribute:
          + provide the argument app_profile on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the app profile.

          To set the instance attribute:
          + provide the argument app_profile on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

FLAGS
     --force
        Ignore warnings and force delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable app-profiles delete

        $ gcloud beta bigtable app-profiles delete
```

### gcloud bigtable app-profiles describe

```text
NAME
    gcloud bigtable app-profiles describe - describe an existing Bigtable app
        profile

SYNOPSIS
    gcloud bigtable app-profiles describe (APP_PROFILE : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an existing Bigtable app profile.

EXAMPLES
    To view an app profile's description, run:

        $ gcloud bigtable app-profiles describe my-app-profile-id \
            --instance=my-instance-id

POSITIONAL ARGUMENTS
     App profile resource - The app profile to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument app_profile on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APP_PROFILE
          ID of the app profile or fully qualified identifier for the app
          profile.

          To set the name attribute:
          + provide the argument app_profile on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the app profile.

          To set the instance attribute:
          + provide the argument app_profile on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable app-profiles describe

        $ gcloud beta bigtable app-profiles describe
```

### gcloud bigtable app-profiles list

```text
NAME
    gcloud bigtable app-profiles list - list Bigtable app profiles

SYNOPSIS
    gcloud bigtable app-profiles list --instance=INSTANCE [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Bigtable app profiles.

EXAMPLES
    To list all app profiles for an instance, run:

        $ gcloud bigtable app-profiles list --instance=my-instance-id

REQUIRED FLAGS
     Instance resource - The instance to list app profiles for. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --instance=INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument --instance on the command line.

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

        $ gcloud alpha bigtable app-profiles list

        $ gcloud beta bigtable app-profiles list
```

### gcloud bigtable app-profiles update

```text
NAME
    gcloud bigtable app-profiles update - update a Bigtable app profile

SYNOPSIS
    gcloud bigtable app-profiles update (APP_PROFILE : --instance=INSTANCE)
        [--async] [--description=DESCRIPTION] [--force]
        [--data-boost
          --data-boost-compute-billing-owner=DATA_BOOST_COMPUTE_BILLING_OWNER
          | --priority=PRIORITY --standard]
        [[--route-any : --restrict-to=[RESTRICT_TO,...] --row-affinity]
          | [--route-to=ROUTE_TO : --transactional-writes]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Bigtable app profile.

EXAMPLES
    To update an app profile to use a multi-cluster routing policy, run:

        $ gcloud bigtable app-profiles update my-app-profile-id \
            --instance=my-instance-id --route-any

    To update an app profile to use a single-cluster routing policy that routes
    all requests to my-cluster-id and allows transactional writes, run:

        $ gcloud bigtable app-profiles update my-app-profile-id \
            --instance=my-instance-id --route-to=my-cluster-id \
            --transactional-writes

    To update the description for an app profile, run:

        $ gcloud bigtable app-profiles update my-app-profile-id \
            --instance=my-instance-id --description="New description"

    To update the request priority for an app profile to PRIORITY_LOW, run:

        $ gcloud bigtable app-profiles update my-app-profile-id \
            --instance=my-instance-id --priority=PRIORITY_LOW

    To update an app profile to enable row-affinity routing, run:

        $ gcloud bigtable app-profiles update my-app-profile-id \
            --instance=my-instance-id --route-any --row-affinity

    To update an app profile to enable Data Boost which bills usage to the host
    project, run:

        $ gcloud bigtable app-profiles update my-app-profile-id \
            --instance=my-instance-id --data-boost \
            --data-boost-compute-billing-owner=HOST_PAYS

POSITIONAL ARGUMENTS
     App profile resource - The app profile to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument app_profile on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       APP_PROFILE
          ID of the app profile or fully qualified identifier for the app
          profile.

          To set the name attribute:
          + provide the argument app_profile on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the app profile.

          To set the instance attribute:
          + provide the argument app_profile on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Friendly name of the app profile.

     --force
        Ignore warnings and force update.

     At most one of these can be specified:

       Data Boost Read-only Isolation

       --data-boost
          Use Data Boost serverless compute option, rather than standard
          provisioned node compute. If specified,
          --data-boost-compute-billing-owner is required. Specifying Data Boost
          compute on an app profile that uses standard provisioned node compute
          may cause unexpected behavior for running applications.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --data-boost-compute-billing-owner=DATA_BOOST_COMPUTE_BILLING_OWNER
          Specify the Data Boost compute billing owner, required if
          --data-boost is passed. DATA_BOOST_COMPUTE_BILLING_OWNER must be
          (only one value is supported):

           HOST_PAYS
              Compute billing should be accounted towards the host Cloud
              project (containing the targeted Bigtable instance / table).

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Standard Isolation

       --priority=PRIORITY
          Specify the request priority under standard provisioned node compute
          capabilities. Passing this option implies standard provisioned node
          compute, e.g. the --standard option. If not specified, the app
          profile uses standard provisioned node compute with PRIORITY_HIGH by
          default. Specifying request priority on an app profile that has Data
          Boost serverless compute enabled changes the compute option to
          standard and uses the specified priority, which might cause
          unexpected behavior for running applications. PRIORITY must be one
          of:

           PRIORITY_HIGH
              Requests are treated with high priority.
           PRIORITY_LOW
              Requests are treated with low priority.
           PRIORITY_MEDIUM
              Requests are treated with medium priority.

       --standard
          Use standard provisioned node compute option, rather than Data Boost
          compute option. If specified, --priority is required.

     At most one of these can be specified:

       Multi Cluster Routing Policy

       --route-any
          Use Multi Cluster Routing policy.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --restrict-to=[RESTRICT_TO,...]
          Cluster IDs to route to using the Multi Cluster Routing Policy. If
          unset, all clusters in the instance are eligible.

       --row-affinity
          Use row-affinity routing for this app profile.

       Single Cluster Routing Policy

       --route-to=ROUTE_TO
          Cluster ID to route to using Single Cluster Routing policy.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --transactional-writes
          Allow transactional writes with a Single Cluster Routing policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable app-profiles update

        $ gcloud beta bigtable app-profiles update
```

### gcloud beta bigtable app-profiles create

```text
NAME
    gcloud beta bigtable app-profiles create - create a new Bigtable app
        profile

SYNOPSIS
    gcloud beta bigtable app-profiles create
        (APP_PROFILE : --instance=INSTANCE)
        ([--route-any : --restrict-to=[RESTRICT_TO,...] --row-affinity]
          | [--route-to=ROUTE_TO : --transactional-writes])
        [--description=DESCRIPTION] [--force]
        [--data-boost
          --data-boost-compute-billing-owner=DATA_BOOST_COMPUTE_BILLING_OWNER
          | --priority=PRIORITY --standard --use-memory-layer]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable app-profiles delete

```text
NAME
    gcloud beta bigtable app-profiles delete - delete a Bigtable app profile

SYNOPSIS
    gcloud beta bigtable app-profiles delete
        (APP_PROFILE : --instance=INSTANCE) [--force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable app-profiles describe

```text
NAME
    gcloud beta bigtable app-profiles describe - describe an existing Bigtable
        app profile

SYNOPSIS
    gcloud beta bigtable app-profiles describe
        (APP_PROFILE : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable app-profiles list

```text
NAME
    gcloud beta bigtable app-profiles list - list Bigtable app profiles

SYNOPSIS
    gcloud beta bigtable app-profiles list --instance=INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable app-profiles update

```text
NAME
    gcloud beta bigtable app-profiles update - update a Bigtable app profile

SYNOPSIS
    gcloud beta bigtable app-profiles update
        (APP_PROFILE : --instance=INSTANCE) [--async]
        [--description=DESCRIPTION] [--force]
        [--data-boost
          --data-boost-compute-billing-owner=DATA_BOOST_COMPUTE_BILLING_OWNER
          | --priority=PRIORITY --standard --use-memory-layer]
        [[--route-any : --restrict-to=[RESTRICT_TO,...] --row-affinity]
          | [--route-to=ROUTE_TO : --transactional-writes]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable app-profiles config export

```text
NAME
    gcloud alpha bigtable app-profiles config export - export the configuration
        for a Cloud Bigtable app profile

SYNOPSIS
    gcloud alpha bigtable app-profiles config export
        ([APP_PROFILE : --instance=INSTANCE] --all) [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable app-profiles create

```text
NAME
    gcloud alpha bigtable app-profiles create - create a new Bigtable app
        profile

SYNOPSIS
    gcloud alpha bigtable app-profiles create
        (APP_PROFILE : --instance=INSTANCE)
        ([--route-any : --restrict-to=[RESTRICT_TO,...] --row-affinity]
          | [--route-to=ROUTE_TO : --transactional-writes])
        [--description=DESCRIPTION] [--force]
        [--data-boost
          --data-boost-compute-billing-owner=DATA_BOOST_COMPUTE_BILLING_OWNER
          | --priority=PRIORITY --standard --use-memory-layer]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable app-profiles delete

```text
NAME
    gcloud alpha bigtable app-profiles delete - delete a Bigtable app profile

SYNOPSIS
    gcloud alpha bigtable app-profiles delete
        (APP_PROFILE : --instance=INSTANCE) [--force] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable app-profiles describe

```text
NAME
    gcloud alpha bigtable app-profiles describe - describe an existing Bigtable
        app profile

SYNOPSIS
    gcloud alpha bigtable app-profiles describe
        (APP_PROFILE : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable app-profiles list

```text
NAME
    gcloud alpha bigtable app-profiles list - list Bigtable app profiles

SYNOPSIS
    gcloud alpha bigtable app-profiles list --instance=INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable app-profiles update

```text
NAME
    gcloud alpha bigtable app-profiles update - update a Bigtable app profile

SYNOPSIS
    gcloud alpha bigtable app-profiles update
        (APP_PROFILE : --instance=INSTANCE) [--async]
        [--description=DESCRIPTION] [--force]
        [--data-boost
          --data-boost-compute-billing-owner=DATA_BOOST_COMPUTE_BILLING_OWNER
          | --priority=PRIORITY --standard --use-memory-layer]
        [[--route-any : --restrict-to=[RESTRICT_TO,...] --row-affinity]
          | [--route-to=ROUTE_TO : --transactional-writes]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the Data Boost example has no routing flag, but the SYNOPSIS requires exactly one of `--route-any` and `--route-to` (gcloud 593.0.0: "Exactly one of ... must be specified"); a Data Boost app profile uses a single-cluster routing policy (https://docs.cloud.google.com/bigtable/docs/data-boost-overview), so the runnable form adds `--route-to=my-cluster-id`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/app-profiles (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
