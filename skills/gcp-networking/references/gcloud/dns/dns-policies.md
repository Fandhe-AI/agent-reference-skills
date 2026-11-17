---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/policies
---

# gcloud dns policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dns policies create

```text
NAME
    gcloud dns policies create - creates a new Cloud DNS policy

SYNOPSIS
    gcloud dns policies create POLICY --description=DESCRIPTION
        --networks=[NETWORKS,...]
        [--alternative-name-servers=[NAME_SERVERS,...]]
        [--enable-dns64-all-queries] [--enable-inbound-forwarding]
        [--enable-logging]
        [--private-alternative-name-servers=[NAME_SERVERS,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a new Cloud DNS policy.

EXAMPLES
    To create a new policy with minimal arguments, run:

        $ gcloud dns policies create mypolicy \
            --description='My new policy test policy 5' --networks=''

    To create a new policy with all optional arguments, run:

        $ gcloud dns policies create mypolicy \
            --description='My new policy test policy 5' \
            --networks=network1,network2 \
            --alternative-name-servers=192.168.1.1,192.168.1.2 \
            --enable-inbound-forwarding --enable-logging \
            --enable-dns64-all-queries

POSITIONAL ARGUMENTS
     Policy resource - The policy to create. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument policy on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       POLICY
          ID of the policy or fully qualified identifier for the policy.

          To set the policy attribute:
          + provide the argument policy on the command line.

REQUIRED FLAGS
     --description=DESCRIPTION
        A description of the policy.

     --networks=[NETWORKS,...]
        The comma separated list of network names to associate with the policy.

OPTIONAL FLAGS
     --alternative-name-servers=[NAME_SERVERS,...]
        List of alternative name servers to forward to. Non-RFC1918 addresses
        will forward to the target through the Internet.RFC1918 addresses will
        forward through the VPC.

     --enable-dns64-all-queries
        Specifies whether to allow networks bound to this policy to use DNS64
        for IPv6-only VM instances.

     --enable-inbound-forwarding
        Specifies whether to allow networks bound to this policy to receive DNS
        queries sent by VMs or applications over VPN connections. Defaults to
        False.

     --enable-logging
        Specifies whether to enable query logging. Defaults to False.

     --private-alternative-name-servers=[NAME_SERVERS,...]
        List of alternative name servers to forward to. All addresses specified
        for this parameter will be reached through the VPC.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns policies create

        $ gcloud beta dns policies create
```

### gcloud dns policies delete

```text
NAME
    gcloud dns policies delete - deletes a Cloud DNS policy

SYNOPSIS
    gcloud dns policies delete POLICY [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a Cloud DNS policy.

EXAMPLES
    To delete a policy, run:

        $ gcloud dns policies delete mypolicy

POSITIONAL ARGUMENTS
     Policy resource - The name of the policy you want to delete. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       POLICY
          ID of the policy or fully qualified identifier for the policy.

          To set the policy attribute:
          + provide the argument policy on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dns/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/dns/docs

NOTES
    These variants are also available:

        $ gcloud alpha dns policies delete

        $ gcloud beta dns policies delete
```

### gcloud dns policies describe

```text
NAME
    gcloud dns policies describe - describes a Cloud DNS policy

SYNOPSIS
    gcloud dns policies describe POLICY [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes details of a Cloud DNS policy.

EXAMPLES
    To describe a policy, run:

        $ gcloud dns policies describe mypolicy

POSITIONAL ARGUMENTS
     Policy resource - The name of the policy you want to describe. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       POLICY
          ID of the policy or fully qualified identifier for the policy.

          To set the policy attribute:
          + provide the argument policy on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dns/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/dns/docs

NOTES
    These variants are also available:

        $ gcloud alpha dns policies describe

        $ gcloud beta dns policies describe
```

### gcloud dns policies list

```text
NAME
    gcloud dns policies list - view the list of all your Cloud DNS policies

SYNOPSIS
    gcloud dns policies list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays the list of all Cloud DNS policies in a given project.

EXAMPLES
    To see the list of all policies, run:

        $ gcloud dns policies list

    To see the list of first 10 policies, run:

        $ gcloud dns policies list --limit=10

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

API REFERENCE
    This command uses the dns/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/dns/docs

NOTES
    These variants are also available:

        $ gcloud alpha dns policies list

        $ gcloud beta dns policies list
```

### gcloud dns policies update

```text
NAME
    gcloud dns policies update - update an existing Cloud DNS policy

SYNOPSIS
    gcloud dns policies update POLICY
        [--alternative-name-servers=[NAME_SERVERS,...]]
        [--description=DESCRIPTION] [--[no-]enable-dns64-all-queries]
        [--enable-inbound-forwarding] [--enable-logging]
        [--networks=[NETWORKS,...]]
        [--private-alternative-name-servers=[NAME_SERVERS,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing Cloud DNS policy.

EXAMPLES
    To change the description of a policy, run:

        $ gcloud dns policies update mypolicy --description="Hello, world!"

POSITIONAL ARGUMENTS
     Policy resource - The policy to update. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument policy on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       POLICY
          ID of the policy or fully qualified identifier for the policy.

          To set the policy attribute:
          + provide the argument policy on the command line.

FLAGS
     --alternative-name-servers=[NAME_SERVERS,...]
        List of alternative name servers to forward to. Non-RFC1918 addresses
        will forward to the target through the Internet.RFC1918 addresses will
        forward through the VPC.

     --description=DESCRIPTION
        A description of the policy.

     --[no-]enable-dns64-all-queries
        Specifies whether to allow networks bound to this policy to use DNS64
        for IPv6-only VM instances. Use --enable-dns64-all-queries to enable
        and --no-enable-dns64-all-queries to disable.

     --enable-inbound-forwarding
        Specifies whether to allow networks bound to this policy to receive DNS
        queries sent by VMs or applications over VPN connections. Defaults to
        False.

     --enable-logging
        Specifies whether to enable query logging. Defaults to False.

     --networks=[NETWORKS,...]
        The comma separated list of network names to associate with the policy.

     --private-alternative-name-servers=[NAME_SERVERS,...]
        List of alternative name servers to forward to. All addresses specified
        for this parameter will be reached through the VPC.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns policies update

        $ gcloud beta dns policies update
```

### gcloud beta dns policies create

```text
NAME
    gcloud beta dns policies create - creates a new Cloud DNS policy

SYNOPSIS
    gcloud beta dns policies create POLICY --description=DESCRIPTION
        --networks=[NETWORKS,...]
        [--alternative-name-servers=[NAME_SERVERS,...]]
        [--enable-dns64-all-queries] [--enable-inbound-forwarding]
        [--enable-logging] [--outbound-endpoints=[OUTBOUND_ENDPOINTS,...]]
        [--private-alternative-name-servers=[NAME_SERVERS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns policies delete

```text
NAME
    gcloud beta dns policies delete - deletes a Cloud DNS policy

SYNOPSIS
    gcloud beta dns policies delete POLICY [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns policies describe

```text
NAME
    gcloud beta dns policies describe - describes a Cloud DNS policy

SYNOPSIS
    gcloud beta dns policies describe POLICY [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns policies list

```text
NAME
    gcloud beta dns policies list - view the list of all your Cloud DNS
        policies

SYNOPSIS
    gcloud beta dns policies list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns policies update

```text
NAME
    gcloud beta dns policies update - update an existing Cloud DNS policy

SYNOPSIS
    gcloud beta dns policies update POLICY
        [--alternative-name-servers=[NAME_SERVERS,...]]
        [--description=DESCRIPTION] [--[no-]enable-dns64-all-queries]
        [--enable-inbound-forwarding] [--enable-logging]
        [--networks=[NETWORKS,...]]
        [--outbound-endpoints=[OUTBOUND_ENDPOINTS,...]]
        [--private-alternative-name-servers=[NAME_SERVERS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns policies config export

```text
NAME
    gcloud alpha dns policies config export - export the configuration for a
        Dns policy

SYNOPSIS
    gcloud alpha dns policies config export ([POLICY]] --all)
        [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns policies create

```text
NAME
    gcloud alpha dns policies create - creates a new Cloud DNS policy

SYNOPSIS
    gcloud alpha dns policies create POLICY --description=DESCRIPTION
        --networks=[NETWORKS,...]
        [--alternative-name-servers=[NAME_SERVERS,...]]
        [--enable-dns64-all-queries] [--enable-inbound-forwarding]
        [--enable-logging] [--outbound-endpoints=[OUTBOUND_ENDPOINTS,...]]
        [--private-alternative-name-servers=[NAME_SERVERS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns policies delete

```text
NAME
    gcloud alpha dns policies delete - deletes a Cloud DNS policy

SYNOPSIS
    gcloud alpha dns policies delete POLICY [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns policies describe

```text
NAME
    gcloud alpha dns policies describe - describes a Cloud DNS policy

SYNOPSIS
    gcloud alpha dns policies describe POLICY [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns policies list

```text
NAME
    gcloud alpha dns policies list - view the list of all your Cloud DNS
        policies

SYNOPSIS
    gcloud alpha dns policies list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns policies update

```text
NAME
    gcloud alpha dns policies update - update an existing Cloud DNS policy

SYNOPSIS
    gcloud alpha dns policies update POLICY
        [--alternative-name-servers=[NAME_SERVERS,...]]
        [--description=DESCRIPTION] [--[no-]enable-dns64-all-queries]
        [--enable-inbound-forwarding] [--enable-logging]
        [--networks=[NETWORKS,...]]
        [--outbound-endpoints=[OUTBOUND_ENDPOINTS,...]]
        [--private-alternative-name-servers=[NAME_SERVERS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
