---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-edge-security-services
---

# gcloud compute network-edge-security-services

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-edge-security-services create

```text
NAME
    gcloud compute network-edge-security-services create - create a Compute
        Engine network edge security service

SYNOPSIS
    gcloud compute network-edge-security-services create NAME
        [--description=DESCRIPTION] [--region=REGION]
        [--security-policy=SECURITY_POLICY]
        [--security-policy-region=SECURITY_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-edge-security-services create is used to create
    network edge security services.

EXAMPLES
    To create a network edge security service with the name 'my-service' in
    region 'us-central1', run:

        $ gcloud compute network-edge-security-services create my-service \
            --region=us-central1

    To create a network edge security service with the name 'my-service' with
    security policy 'my-policy' attached in region 'us-central1', run:

        $ gcloud compute network-edge-security-services create my-service \
            --security-policy=my-policy --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the network edge security service to create.

FLAGS
     --description=DESCRIPTION
        An optional, textual description for the network edge security service.

     --region=REGION
        Region of the network edge security service to create. Overrides the
        default compute/region property value for this command invocation.

     --security-policy=SECURITY_POLICY
        The security policy that will be set for this network edge security
        service. To remove the policy from this network edge security service
        set the policy to an empty string.

     --security-policy-region=SECURITY_POLICY_REGION
        Region of the security policy to operate on. Overrides the default
        compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-edge-security-services create

        $ gcloud beta compute network-edge-security-services create
```

### gcloud compute network-edge-security-services delete

```text
NAME
    gcloud compute network-edge-security-services delete - delete network edge
        security services

SYNOPSIS
    gcloud compute network-edge-security-services delete NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-edge-security-services delete deletes Compute Engine
    network edge security services.

EXAMPLES
    To delete a network edge security service with the name 'my-service' in
    region 'us-central1', run:

        $ gcloud compute network-edge-security-services delete my-service \
            --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the network edge security service to delete.

FLAGS
     --region=REGION
        Region of the network edge security service to delete. Overrides the
        default compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-edge-security-services delete

        $ gcloud beta compute network-edge-security-services delete
```

### gcloud compute network-edge-security-services describe

```text
NAME
    gcloud compute network-edge-security-services describe - describe a Compute
        Engine network edge security service

SYNOPSIS
    gcloud compute network-edge-security-services describe NAME
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-edge-security-services describe displays all data
    associated with a Compute Engine network edge security service in a
    project.

EXAMPLES
    To describe a network edge security service with the name 'my-service' in
    region 'us-central1', run:

        $ gcloud compute network-edge-security-services describe \
            my-service --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the network edge security service to describe.

FLAGS
     --region=REGION
        Region of the network edge security service to describe. Overrides the
        default compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-edge-security-services describe

        $ gcloud beta compute network-edge-security-services describe
```

### gcloud compute network-edge-security-services list

```text
NAME
    gcloud compute network-edge-security-services list - list Google Compute
        Engine network edge security services

SYNOPSIS
    gcloud compute network-edge-security-services list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-edge-security-services list displays all Google
    Compute Engine network edge security services in a project.

    By default, network edge security services from all regions are listed. The
    results can be narrowed down using a filter: --filter="region:( REGION ...
    )".

EXAMPLES
    To list all network edge security services in a project in table form, run:

        $ gcloud compute network-edge-security-services list

    To list the URIs of all network edge security services in a project, run:

        $ gcloud compute network-edge-security-services list --uri

    To list all network edge security services in the us-central1 and
    europe-west1 regions, run:

        $ gcloud compute network-edge-security-services list \
            --filter="region:( us-central1 europe-west1 )"

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

        $ gcloud alpha compute network-edge-security-services list

        $ gcloud beta compute network-edge-security-services list
```

### gcloud compute network-edge-security-services update

```text
NAME
    gcloud compute network-edge-security-services update - update a network
        edge security service

SYNOPSIS
    gcloud compute network-edge-security-services update NAME
        [--description=DESCRIPTION] [--region=REGION]
        [--security-policy=SECURITY_POLICY]
        [--security-policy-region=SECURITY_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-edge-security-services update is used to update
    network edge security services.

EXAMPLES
    To attach a new security policy 'my-policy' to a network edge security
    service with the name 'my-service' in region 'us-central1', run:

        $ gcloud compute network-edge-security-services update my-service \
            --security-policy=my-policy --region=us-central1

    To remove the security policy attached to a network edge security service
    with the name 'my-service' in region 'us-central1', run:

        $ gcloud compute network-edge-security-services update my-service \
            --security-policy="" --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the network edge security service to update.

FLAGS
     --description=DESCRIPTION
        An optional, textual description for the network edge security service.

     --region=REGION
        Region of the network edge security service to update. Overrides the
        default compute/region property value for this command invocation.

     --security-policy=SECURITY_POLICY
        The security policy that will be set for this network edge security
        service. To remove the policy from this network edge security service
        set the policy to an empty string.

     --security-policy-region=SECURITY_POLICY_REGION
        Region of the security policy to operate on. Overrides the default
        compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-edge-security-services update

        $ gcloud beta compute network-edge-security-services update
```

### gcloud beta compute network-edge-security-services create

```text
NAME
    gcloud beta compute network-edge-security-services create - create a
        Compute Engine network edge security service

SYNOPSIS
    gcloud beta compute network-edge-security-services create NAME
        [--description=DESCRIPTION] [--region=REGION]
        [--security-policy=SECURITY_POLICY]
        [--security-policy-region=SECURITY_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-edge-security-services delete

```text
NAME
    gcloud beta compute network-edge-security-services delete - delete network
        edge security services

SYNOPSIS
    gcloud beta compute network-edge-security-services delete NAME
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-edge-security-services describe

```text
NAME
    gcloud beta compute network-edge-security-services describe - describe a
        Compute Engine network edge security service

SYNOPSIS
    gcloud beta compute network-edge-security-services describe NAME
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-edge-security-services list

```text
NAME
    gcloud beta compute network-edge-security-services list - list Google
        Compute Engine network edge security services

SYNOPSIS
    gcloud beta compute network-edge-security-services list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-edge-security-services update

```text
NAME
    gcloud beta compute network-edge-security-services update - update a
        network edge security service

SYNOPSIS
    gcloud beta compute network-edge-security-services update NAME
        [--description=DESCRIPTION] [--region=REGION]
        [--security-policy=SECURITY_POLICY]
        [--security-policy-region=SECURITY_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-edge-security-services create

```text
NAME
    gcloud alpha compute network-edge-security-services create - create a
        Compute Engine network edge security service

SYNOPSIS
    gcloud alpha compute network-edge-security-services create NAME
        [--description=DESCRIPTION] [--region=REGION]
        [--security-policy=SECURITY_POLICY]
        [--security-policy-region=SECURITY_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-edge-security-services delete

```text
NAME
    gcloud alpha compute network-edge-security-services delete - delete network
        edge security services

SYNOPSIS
    gcloud alpha compute network-edge-security-services delete NAME
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-edge-security-services describe

```text
NAME
    gcloud alpha compute network-edge-security-services describe - describe a
        Compute Engine network edge security service

SYNOPSIS
    gcloud alpha compute network-edge-security-services describe NAME
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-edge-security-services list

```text
NAME
    gcloud alpha compute network-edge-security-services list - list Google
        Compute Engine network edge security services

SYNOPSIS
    gcloud alpha compute network-edge-security-services list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-edge-security-services update

```text
NAME
    gcloud alpha compute network-edge-security-services update - update a
        network edge security service

SYNOPSIS
    gcloud alpha compute network-edge-security-services update NAME
        [--description=DESCRIPTION] [--region=REGION]
        [--security-policy=SECURITY_POLICY]
        [--security-policy-region=SECURITY_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-edge-security-services (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
