---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/policy-based-routes
---

# gcloud network-connectivity policy-based-routes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity policy-based-routes create

```text
NAME
    gcloud network-connectivity policy-based-routes create - create a new
        policy-based route

SYNOPSIS
    gcloud network-connectivity policy-based-routes create POLICY_BASED_ROUTE
        --network=NETWORK [--async] [--description=DESCRIPTION]
        [--destination-range=DESTINATION_RANGE] [--ip-protocol=IP_PROTOCOL]
        [--labels=[KEY=VALUE,...]] [--priority=PRIORITY]
        [--protocol-version=PROTOCOL_VERSION; default="IPV4"]
        [--source-range=SOURCE_RANGE]
        [--interconnect-attachment-region=INTERCONNECT_ATTACHMENT_REGION
          | --tags=[TAGS,...]]
        [--next-hop-ilb-ip=NEXT_HOP_ILB_IP
          | --next-hop-other-routes=NEXT_HOP_OTHER_ROUTES]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new policy-based route with the given name.

EXAMPLES
    To create a policy-based route with the name my-pbr to route all traffic in
    default network to an internal load balancer with IP 10.0.0.1, run:

        $ gcloud network-connectivity policy-based-routes create my-pbr \
            --network="projects/my-project/global/networks/default" \
            --next-hop-ilb-ip=10.0.0.1

POSITIONAL ARGUMENTS
     Policy based route resource - Name of the policy-based route to be
     created. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument policy_based_route on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       POLICY_BASED_ROUTE
          ID of the policy based route or fully qualified identifier for the
          policy based route.

          To set the policy_based_route attribute:
          + provide the argument policy_based_route on the command line.

REQUIRED FLAGS
     --network=NETWORK
        Fully-qualified URL of the network that this route applies to. E.g.
        projects/my-project/global/networks/my-network

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Optional description of this resource. Provide this field when you
        create the resource.

     --destination-range=DESTINATION_RANGE
        Destination IP range of outgoing packets that this policy-based route
        applies to.

     --ip-protocol=IP_PROTOCOL
        IP protocol that this policy-based route applies to. Valid values are
        TCP, UDP, and ALL. Default is ALL.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --priority=PRIORITY
        Priority of this policy-based route. Priority is used to break ties in
        cases where there are more than one matching policy-based routes found.
        In cases where multiple policy-based routes are matched, the one with
        the lowest-numbered priority value wins. The default value is 1000. The
        priority value must be from 1 to 65535, inclusive. Note the priority of
        policy-based route is always higher than other types of route (e.g.
        static routes/advanced routes)

     --protocol-version=PROTOCOL_VERSION; default="IPV4"
        Internet protocol versions that this policy-based route applies to. For
        this version, only IPV4 is supported. PROTOCOL_VERSION must be one of:
        ipv4, ipv6, protocol-version-unspecified.

     --source-range=SOURCE_RANGE
        Source IP range of outgoing packets that this policy-based route
        applies to.

     At most one of these can be specified:

       --interconnect-attachment-region=INTERCONNECT_ATTACHMENT_REGION
          Cloud region to install this policy-based route on interconnect
          attachment. Use all to install it on all interconnect attachments.
          Note if both --tags and --interconnect-attachment-region are not set,
          then the policy-based route will be installed in all network
          endpoints, including VMs, VPNs, and Interconnect attachements, in the
          network.

       --tags=[TAGS,...]
          List of VM instance tags that this route applies to. VM instances
          that have ANY of tags specified here installs this route. Note if
          both --tags and --interconnect-attachment-region are not set, then
          the policy-based route will be installed in all endpoints, including
          VMs, VPNs, and Interconnect attachements, in the network.

     At most one of these can be specified:

       --next-hop-ilb-ip=NEXT_HOP_ILB_IP
          IP of a global access enabled L4 ILB that should be the next hop to
          handle packets.

       --next-hop-other-routes=NEXT_HOP_OTHER_ROUTES
          Next hop should be other routes that handle packets. This effectively
          excludes matching packets being applied on other policy-based routes
          with a lower priority. NEXT_HOP_OTHER_ROUTES must be one of:
          default-routing, other-routes-unspecified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    These variants are also available:

        $ gcloud alpha network-connectivity policy-based-routes create

        $ gcloud beta network-connectivity policy-based-routes create
```

### gcloud network-connectivity policy-based-routes delete

```text
NAME
    gcloud network-connectivity policy-based-routes delete - delete a
        policy-based route

SYNOPSIS
    gcloud network-connectivity policy-based-routes delete POLICY_BASED_ROUTE
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified policy-based route.

EXAMPLES
    To delete a policy-based route named my-pbr, run:

        $ gcloud network-connectivity policy-based-routes delete my-pbr

POSITIONAL ARGUMENTS
     Policy based route resource - Name of the policy-based route to be
     deleted. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument policy_based_route on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       POLICY_BASED_ROUTE
          ID of the policy based route or fully qualified identifier for the
          policy based route.

          To set the policy_based_route attribute:
          + provide the argument policy_based_route on the command line.

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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    These variants are also available:

        $ gcloud alpha network-connectivity policy-based-routes delete

        $ gcloud beta network-connectivity policy-based-routes delete
```

### gcloud network-connectivity policy-based-routes describe

```text
NAME
    gcloud network-connectivity policy-based-routes describe - describe a
        policy-based route

SYNOPSIS
    gcloud network-connectivity policy-based-routes describe POLICY_BASED_ROUTE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about a policy-based route.

EXAMPLES
    To display details about a policy-based route named my-pbr, run:

        $ gcloud network-connectivity policy-based-routes describe my-pbr

POSITIONAL ARGUMENTS
     Policy based route resource - Name of the policy-based route to be
     described. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument policy_based_route on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       POLICY_BASED_ROUTE
          ID of the policy based route or fully qualified identifier for the
          policy based route.

          To set the policy_based_route attribute:
          + provide the argument policy_based_route on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    These variants are also available:

        $ gcloud alpha network-connectivity policy-based-routes describe

        $ gcloud beta network-connectivity policy-based-routes describe
```

### gcloud network-connectivity policy-based-routes list

```text
NAME
    gcloud network-connectivity policy-based-routes list - list policy-based
        routes

SYNOPSIS
    gcloud network-connectivity policy-based-routes list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display a list of all policy-based routes in the specified
    project.

EXAMPLES
    To display details about a policy-based route named my-pbr, run:

        $ gcloud network-connectivity policy-based-routes list my-pbr

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    These variants are also available:

        $ gcloud alpha network-connectivity policy-based-routes list

        $ gcloud beta network-connectivity policy-based-routes list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-connectivity policy-based-routes list
```

### gcloud beta network-connectivity policy-based-routes create

```text
NAME
    gcloud beta network-connectivity policy-based-routes create - create a new
        policy-based route

SYNOPSIS
    gcloud beta network-connectivity policy-based-routes create
        POLICY_BASED_ROUTE --network=NETWORK [--async]
        [--description=DESCRIPTION] [--destination-range=DESTINATION_RANGE]
        [--ip-protocol=IP_PROTOCOL] [--labels=[KEY=VALUE,...]]
        [--priority=PRIORITY]
        [--protocol-version=PROTOCOL_VERSION; default="IPV4"]
        [--source-range=SOURCE_RANGE]
        [--interconnect-attachment-region=INTERCONNECT_ATTACHMENT_REGION
          | --tags=[TAGS,...]]
        [--next-hop-ilb-ip=NEXT_HOP_ILB_IP
          | --next-hop-other-routes=NEXT_HOP_OTHER_ROUTES]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity policy-based-routes delete

```text
NAME
    gcloud beta network-connectivity policy-based-routes delete - delete a
        policy-based route

SYNOPSIS
    gcloud beta network-connectivity policy-based-routes delete
        POLICY_BASED_ROUTE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity policy-based-routes describe

```text
NAME
    gcloud beta network-connectivity policy-based-routes describe - describe a
        policy-based route

SYNOPSIS
    gcloud beta network-connectivity policy-based-routes describe
        POLICY_BASED_ROUTE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity policy-based-routes list

```text
NAME
    gcloud beta network-connectivity policy-based-routes list - list
        policy-based routes

SYNOPSIS
    gcloud beta network-connectivity policy-based-routes list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity policy-based-routes create

```text
NAME
    gcloud alpha network-connectivity policy-based-routes create - create a new
        policy-based route

SYNOPSIS
    gcloud alpha network-connectivity policy-based-routes create
        POLICY_BASED_ROUTE --network=NETWORK [--async]
        [--description=DESCRIPTION] [--destination-range=DESTINATION_RANGE]
        [--ip-protocol=IP_PROTOCOL] [--labels=[KEY=VALUE,...]]
        [--priority=PRIORITY]
        [--protocol-version=PROTOCOL_VERSION; default="IPV4"]
        [--source-range=SOURCE_RANGE]
        [--interconnect-attachment-region=INTERCONNECT_ATTACHMENT_REGION
          | --tags=[TAGS,...]]
        [--next-hop-ilb-ip=NEXT_HOP_ILB_IP
          | --next-hop-other-routes=NEXT_HOP_OTHER_ROUTES]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity policy-based-routes delete

```text
NAME
    gcloud alpha network-connectivity policy-based-routes delete - delete a
        policy-based route

SYNOPSIS
    gcloud alpha network-connectivity policy-based-routes delete
        POLICY_BASED_ROUTE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity policy-based-routes describe

```text
NAME
    gcloud alpha network-connectivity policy-based-routes describe - describe a
        policy-based route

SYNOPSIS
    gcloud alpha network-connectivity policy-based-routes describe
        POLICY_BASED_ROUTE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity policy-based-routes list

```text
NAME
    gcloud alpha network-connectivity policy-based-routes list - list
        policy-based routes

SYNOPSIS
    gcloud alpha network-connectivity policy-based-routes list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example repeats the description and argument of the `describe` example ("To display details about a policy-based route named my-pbr"), but the `list` SYNOPSIS takes no positional arguments (gcloud 593.0.0: "unrecognized arguments: my-pbr"); the runnable form drops `my-pbr` (to show one route, run `gcloud network-connectivity policy-based-routes describe my-pbr`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/policy-based-routes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
