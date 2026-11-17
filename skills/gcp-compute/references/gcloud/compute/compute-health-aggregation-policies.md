---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/health-aggregation-policies
---

# gcloud compute health-aggregation-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute health-aggregation-policies create

```text
NAME
    gcloud compute health-aggregation-policies create - create a health
        aggregation policy

SYNOPSIS
    gcloud compute health-aggregation-policies create
        (HEALTH_AGGREGATION_POLICY : --region=REGION) [--async]
        [--description=DESCRIPTION]
        [--healthy-percent-threshold=HEALTHY_PERCENT_THRESHOLD; default=60]
        [--min-healthy-threshold=MIN_HEALTHY_THRESHOLD; default=1]
        [--policy-type=POLICY_TYPE; default="backend-service-policy"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a health aggregation policy.

EXAMPLES
    The following command creates a new health aggregation policy:

        $ gcloud compute health-aggregation-policies create \
            <HEALTH_AGGREGATION_POLICY_NAME> --region=<REGION> \
            --healthy-percent-threshold 60 --min-healthy-threshold 2 \
            --policy-type=BACKEND_SERVICE_POLICY

POSITIONAL ARGUMENTS
     Health aggregation policy resource - The name of the health aggregation
     policy you want to create. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument health_aggregation_policy on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HEALTH_AGGREGATION_POLICY
          ID of the health aggregation policy or fully qualified identifier for
          the health aggregation policy.

          To set the health_aggregation_policy attribute:
          + provide the argument health_aggregation_policy on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument health_aggregation_policy on the command
            line with a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A textual description of the health aggregation policy.

     --healthy-percent-threshold=HEALTHY_PERCENT_THRESHOLD; default=60
        Can only be set if the policyType field is BACKEND_SERVICE_POLICY.
        Specifies the threshold (as a percentage) of healthy endpoints required
        in order to consider the aggregated health result HEALTHY. Defaults to
        60. Must be in range [0, 100]. Not applicable if the policyType field
        is DNS_PUBLIC_IP_POLICY. Can be mutated. This field is optional, and
        will be set to the default if unspecified. Note that both this
        threshold and minHealthyThreshold must be satisfied in order for
        HEALTHY to be the aggregated result. "Endpoints" refers to network
        endpoints within a Network Endpoint Group or instances within an
        Instance Group.

     --min-healthy-threshold=MIN_HEALTHY_THRESHOLD; default=1
        Can only be set if the policyType field is BACKEND_SERVICE_POLICY.
        Specifies the minimum number of healthy endpoints required in order to
        consider the aggregated health result HEALTHY. Defaults to 1. Must be
        positive. Not applicable if the policyType field is
        DNS_PUBLIC_IP_POLICY. Can be mutated. This field is optional, and will
        be set to the default if unspecified. Note that both this threshold and
        healthyPercentThreshold must be satisfied in order for HEALTHY to be
        the aggregated result. "Endpoints" refers to network endpoints within a
        Network Endpoint Group or instances within an Instance Group.

     --policy-type=POLICY_TYPE; default="backend-service-policy"
        Specifies the type of the healthAggregationPolicy. The only allowed
        value for regional resources is BACKEND_SERVICE_POLICY. Must be
        specified when the healthAggregationPolicy is created, and cannot be
        mutated. POLICY_TYPE must be one of: backend-service-policy,
        dns-public-ip-policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute health-aggregation-policies create

        $ gcloud beta compute health-aggregation-policies create
```

### gcloud compute health-aggregation-policies delete

```text
NAME
    gcloud compute health-aggregation-policies delete - delete a health
        aggregation policy

SYNOPSIS
    gcloud compute health-aggregation-policies delete
        (HEALTH_AGGREGATION_POLICY : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a health aggregation policy.

EXAMPLES
    To delete a single health aggregation policy, run the following command:

        $ gcloud compute health-aggregation-policies delete \
            <HEALTH_AGGREGATION_POLICY_NAME> --region=<REGION>

POSITIONAL ARGUMENTS
     Health aggregation policy resource - Name of the health aggregation policy
     you want to delete. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument health_aggregation_policy on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HEALTH_AGGREGATION_POLICY
          ID of the health aggregation policy or fully qualified identifier for
          the health aggregation policy.

          To set the health_aggregation_policy attribute:
          + provide the argument health_aggregation_policy on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument health_aggregation_policy on the command
            line with a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute health-aggregation-policies delete

        $ gcloud beta compute health-aggregation-policies delete
```

### gcloud compute health-aggregation-policies describe

```text
NAME
    gcloud compute health-aggregation-policies describe - describe a health
        aggregation policy

SYNOPSIS
    gcloud compute health-aggregation-policies describe
        (HEALTH_AGGREGATION_POLICY : --region=REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a health aggregation policy.

EXAMPLES
    To retrieve a single health aggregation policy and print its properties,
    run the following command:

        $ gcloud compute health-aggregation-policies describe \
            <HEALTH_AGGREGATION_POLICY_NAME> --region=<REGION>

POSITIONAL ARGUMENTS
     Health aggregation policy resource - Name of the health aggregation policy
     you want to inspect. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument health_aggregation_policy on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HEALTH_AGGREGATION_POLICY
          ID of the health aggregation policy or fully qualified identifier for
          the health aggregation policy.

          To set the health_aggregation_policy attribute:
          + provide the argument health_aggregation_policy on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument health_aggregation_policy on the command
            line with a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute health-aggregation-policies describe

        $ gcloud beta compute health-aggregation-policies describe
```

### gcloud compute health-aggregation-policies list

```text
NAME
    gcloud compute health-aggregation-policies list - list health aggregation
        policies

SYNOPSIS
    gcloud compute health-aggregation-policies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List health aggregation policies.

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

     --regions=REGION,[REGION,...]
        If provided, only resources from the given regions are queried.

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

        $ gcloud alpha compute health-aggregation-policies list

        $ gcloud beta compute health-aggregation-policies list
```

### gcloud compute health-aggregation-policies update

```text
NAME
    gcloud compute health-aggregation-policies update - update a health
        aggregation policy

SYNOPSIS
    gcloud compute health-aggregation-policies update
        (HEALTH_AGGREGATION_POLICY : --region=REGION)
        (--description=DESCRIPTION
          --healthy-percent-threshold=HEALTHY_PERCENT_THRESHOLD
          --min-healthy-threshold=MIN_HEALTHY_THRESHOLD) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a health aggregation policy.

EXAMPLES
    The following command updates a health aggregation policy:

        $ gcloud compute health-aggregation-policies update \
            <HEALTH_AGGREGATION_POLICY_NAME> --region=<REGION> \
            --healthy-percent-threshold 60 --min-healthy-threshold 2 \

POSITIONAL ARGUMENTS
     Health aggregation policy resource - The health aggregation policy you
     want to update. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument health_aggregation_policy on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HEALTH_AGGREGATION_POLICY
          ID of the health aggregation policy or fully qualified identifier for
          the health aggregation policy.

          To set the health_aggregation_policy attribute:
          + provide the argument health_aggregation_policy on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument health_aggregation_policy on the command
            line with a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

REQUIRED FLAGS
     At least one of these must be specified:

       --description=DESCRIPTION
          A textual description of the health aggregation policy.

       --healthy-percent-threshold=HEALTHY_PERCENT_THRESHOLD
          Can only be set if the policyType field is BACKEND_SERVICE_POLICY.
          Specifies the threshold (as a percentage) of healthy endpoints
          required in order to consider the aggregated health result HEALTHY.
          Defaults to 60. Must be in range [0, 100]. Not applicable if the
          policyType field is DNS_PUBLIC_IP_POLICY. Can be mutated. This field
          is optional, and will be set to the default if unspecified. Note that
          both this threshold and minHealthyThreshold must be satisfied in
          order for HEALTHY to be the aggregated result. "Endpoints" refers to
          network endpoints within a Network Endpoint Group or instances within
          an Instance Group.

       --min-healthy-threshold=MIN_HEALTHY_THRESHOLD
          Can only be set if the policyType field is BACKEND_SERVICE_POLICY.
          Specifies the minimum number of healthy endpoints required in order
          to consider the aggregated health result HEALTHY. Defaults to 1. Must
          be positive. Not applicable if the policyType field is
          DNS_PUBLIC_IP_POLICY. Can be mutated. This field is optional, and
          will be set to the default if unspecified. Note that both this
          threshold and healthyPercentThreshold must be satisfied in order for
          HEALTHY to be the aggregated result. "Endpoints" refers to network
          endpoints within a Network Endpoint Group or instances within an
          Instance Group.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute health-aggregation-policies update

        $ gcloud beta compute health-aggregation-policies update
```

### gcloud beta compute health-aggregation-policies create

```text
NAME
    gcloud beta compute health-aggregation-policies create - create a health
        aggregation policy

SYNOPSIS
    gcloud beta compute health-aggregation-policies create
        (HEALTH_AGGREGATION_POLICY : --region=REGION) [--async]
        [--description=DESCRIPTION]
        [--healthy-percent-threshold=HEALTHY_PERCENT_THRESHOLD; default=60]
        [--min-healthy-threshold=MIN_HEALTHY_THRESHOLD; default=1]
        [--policy-type=POLICY_TYPE; default="backend-service-policy"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-aggregation-policies delete

```text
NAME
    gcloud beta compute health-aggregation-policies delete - delete a health
        aggregation policy

SYNOPSIS
    gcloud beta compute health-aggregation-policies delete
        (HEALTH_AGGREGATION_POLICY : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-aggregation-policies describe

```text
NAME
    gcloud beta compute health-aggregation-policies describe - describe a
        health aggregation policy

SYNOPSIS
    gcloud beta compute health-aggregation-policies describe
        (HEALTH_AGGREGATION_POLICY : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-aggregation-policies list

```text
NAME
    gcloud beta compute health-aggregation-policies list - list health
        aggregation policies

SYNOPSIS
    gcloud beta compute health-aggregation-policies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute health-aggregation-policies update

```text
NAME
    gcloud beta compute health-aggregation-policies update - update a health
        aggregation policy

SYNOPSIS
    gcloud beta compute health-aggregation-policies update
        (HEALTH_AGGREGATION_POLICY : --region=REGION)
        (--description=DESCRIPTION
          --healthy-percent-threshold=HEALTHY_PERCENT_THRESHOLD
          --min-healthy-threshold=MIN_HEALTHY_THRESHOLD) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-aggregation-policies create

```text
NAME
    gcloud alpha compute health-aggregation-policies create - create a health
        aggregation policy

SYNOPSIS
    gcloud alpha compute health-aggregation-policies create
        (HEALTH_AGGREGATION_POLICY : --region=REGION) [--async]
        [--description=DESCRIPTION]
        [--healthy-percent-threshold=HEALTHY_PERCENT_THRESHOLD; default=60]
        [--min-healthy-threshold=MIN_HEALTHY_THRESHOLD; default=1]
        [--policy-type=POLICY_TYPE; default="backend-service-policy"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-aggregation-policies delete

```text
NAME
    gcloud alpha compute health-aggregation-policies delete - delete a health
        aggregation policy

SYNOPSIS
    gcloud alpha compute health-aggregation-policies delete
        (HEALTH_AGGREGATION_POLICY : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-aggregation-policies describe

```text
NAME
    gcloud alpha compute health-aggregation-policies describe - describe a
        health aggregation policy

SYNOPSIS
    gcloud alpha compute health-aggregation-policies describe
        (HEALTH_AGGREGATION_POLICY : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-aggregation-policies list

```text
NAME
    gcloud alpha compute health-aggregation-policies list - list health
        aggregation policies

SYNOPSIS
    gcloud alpha compute health-aggregation-policies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-aggregation-policies update

```text
NAME
    gcloud alpha compute health-aggregation-policies update - update a health
        aggregation policy

SYNOPSIS
    gcloud alpha compute health-aggregation-policies update
        (HEALTH_AGGREGATION_POLICY : --region=REGION)
        (--description=DESCRIPTION
          --healthy-percent-threshold=HEALTHY_PERCENT_THRESHOLD
          --min-healthy-threshold=MIN_HEALTHY_THRESHOLD) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute health-aggregation-policies list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute health-aggregation-policies list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/health-aggregation-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
