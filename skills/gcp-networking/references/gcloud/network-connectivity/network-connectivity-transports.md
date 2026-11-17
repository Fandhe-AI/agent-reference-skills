---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/transports
---

# gcloud network-connectivity transports

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity transports create

```text
NAME
    gcloud network-connectivity transports create - create a transport

SYNOPSIS
    gcloud network-connectivity transports create TRANSPORT
        (--activation-key=ACTIVATION_KEY | --bandwidth=BANDWIDTH
          --remote-account-id=REMOTE_ACCOUNT_ID
          --remote-profile=REMOTE_PROFILE)
        (--network=NETWORK | [--hub=HUB : --auto-accept --psc-routing-enabled])
        [--advertised-routes=[CIDR_RANGE,...]] [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--region=REGION] [--stack-type=STACK_TYPE; default="ipv4-only"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a transport with the given name to a remote provider.

EXAMPLES
    To create a transport that generates a key to aws-us-east-1.

        $ gcloud network-connectivity transports create my-cci-aws \
            --bandwidth 1G --profile aws-us-east-1 \
            --remote-account-id 12345 --network default \
            --advertised-routes '10.128.0.0/9'

    To accept a key:

        $ gcloud network-connectivity transports create my-cci-aws \
            --activation-key ABC1234 --network default

    To create a transport with an NCC hub:

        $ gcloud network-connectivity transports create my-cci-aws \
            --bandwidth 1G --profile aws-us-east-1 \
            --remote-account-id 12345 \
            --hub projects/12345/locations/us-central1/hubs/my-hub \
            --auto-accept

POSITIONAL ARGUMENTS
     Transport resource - Name of the Transport to be created. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument transport on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument transport on the command line with a fully
        specified name;
      * provide the argument --region on the command line.

     This must be specified.

       TRANSPORT
          ID of the transport or fully qualified identifier for the transport.

          To set the transport attribute:
          + provide the argument transport on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --activation-key=ACTIVATION_KEY
          Key from the remote provider to establish a connection over the
          Transport.

       Or at least one of these can be specified:

         These values must all be specified if Google is expected to generate
         the key.

         --bandwidth=BANDWIDTH
            Bandwidth of the transport to create. Must be a supported bandwidth
            on the remote profile. BANDWIDTH must be one of: 100g, 100m, 10g,
            1g, 200m, 20g, 2g, 300m, 400m, 500m, 50g, 50m, 5g.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --remote-account-id=REMOTE_ACCOUNT_ID
            Account ID in the remote provider to associate with the generated
            key.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         RemoteTransportProfile resource - Remote transport profile
         representing the provider and their location. This represents a Cloud
         resource. (NOTE) Some attributes are not given arguments in this group
         but can be set in other ways.

         To set the project attribute:
          - provide the argument --remote-profile on the command line with a
            fully specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         To set the region attribute:
          - provide the argument --remote-profile on the command line with a
            fully specified name;
          - provide the argument --region on the command line.

         This must be specified.

           --remote-profile=REMOTE_PROFILE
              ID of the remoteTransportProfile or fully qualified identifier
              for the remoteTransportProfile.

              To set the remote_transport_profile attribute:
              o provide the argument --remote-profile on the command line.

     Exactly one of these must be specified:

       Network resource - VPC that will be peered to the provider via the
       Transport. This represents a Cloud resource. (NOTE) Some attributes are
       not given arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --network on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       --network=NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network attribute:
          + provide the argument --network on the command line.

       Parameters for creating a transport with an NCC hub.

       Hub resource - Hub that the transport will be attached to. This
       represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --hub on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       This must be specified.

         --hub=HUB
            ID of the hub or fully qualified identifier for the hub.

            To set the hub attribute:
            - provide the argument --hub on the command line.

       --auto-accept
          Whether to auto-accept spoke proposals for this transport.

       --psc-routing-enabled
          Whether a VPC spoke is created for PSC routing over the transport.

OPTIONAL FLAGS
     --advertised-routes=[CIDR_RANGE,...]
        List of routes to advertise from the VPC network toward the provider.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the transport.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --region=REGION
        Google Cloud region for the transport. Applicable regions are those
        where Partner Interconnect is available. For a list of supported
        regions, see
        https://docs.cloud.google.com/network-connectivity/docs/interconnect/how-to/partner-cci-for-aws/paired-locations.

     --stack-type=STACK_TYPE; default="ipv4-only"
        IP version of the routes to be exchanged. STACK_TYPE must be one of:
        ipv4-ipv6, ipv4-only.

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
    This variant is also available:

        $ gcloud beta network-connectivity transports create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-connectivity transports create my-cci-aws \
    --bandwidth 1G \
    --remote-profile aws-us-east-1 \
    --remote-account-id 12345 \
    --network default \
    --advertised-routes '10.128.0.0/9' \
    --region=us-east4

gcloud network-connectivity transports create my-cci-aws \
    --activation-key ABC1234 \
    --network default \
    --region=us-east4

gcloud network-connectivity transports create my-cci-aws \
    --bandwidth 1G \
    --remote-profile aws-us-east-1 \
    --remote-account-id 12345 \
    --hub projects/12345/locations/global/hubs/my-hub \
    --auto-accept \
    --region=us-east4
```

### gcloud network-connectivity transports delete

```text
NAME
    gcloud network-connectivity transports delete - delete a transport

SYNOPSIS
    gcloud network-connectivity transports delete (TRANSPORT : --region=REGION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified transport.

EXAMPLES
    To delete a transport named mytransport in the us-east4 region, run:

        $ gcloud network-connectivity transports delete mytransport \
            --region=us-east4

POSITIONAL ARGUMENTS
     Transport resource - Name of the Transport to be deleted. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument transport on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRANSPORT
          ID of the transport or fully qualified identifier for the transport.

          To set the transport attribute:
          + provide the argument transport on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument transport on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

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
    This variant is also available:

        $ gcloud beta network-connectivity transports delete
```

### gcloud network-connectivity transports describe

```text
NAME
    gcloud network-connectivity transports describe - describe a transport

SYNOPSIS
    gcloud network-connectivity transports describe
        (TRANSPORT : --region=REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about a transport.

EXAMPLES
    To display details about a transport named mytransport in the us-central1
    region, run:

        $ gcloud network-connectivity transports describe mytransport \
            --region=us-central1

POSITIONAL ARGUMENTS
     Transport resource - Name of the Transport to be described. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument transport on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRANSPORT
          ID of the transport or fully qualified identifier for the transport.

          To set the transport attribute:
          + provide the argument transport on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument transport on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

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
    This variant is also available:

        $ gcloud beta network-connectivity transports describe
```

### gcloud network-connectivity transports list

```text
NAME
    gcloud network-connectivity transports list - list transports

SYNOPSIS
    gcloud network-connectivity transports list [--region=REGION; default="-"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display a list of all transports in the specified project.

EXAMPLES
    To list all transports in the us-east4 region, run:

        $ gcloud network-connectivity transports list --region=us-east4

    To list all transports in all regions, run:

        $ gcloud network-connectivity transports list

FLAGS
     --region=REGION; default="-"
        The region of the transports to list. Provide "-" to list all
        transports.

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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity transports list
```

### gcloud network-connectivity transports remote-profiles describe

```text
NAME
    gcloud network-connectivity transports remote-profiles describe - describe
        a remote transport profile

SYNOPSIS
    gcloud network-connectivity transports remote-profiles describe
        (REMOTE_TRANSPORT_PROFILE : --region=REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about a remote transport profile.

EXAMPLES
    To display details about a remote transport profile named myprofile in the
    us-central1 region, run:

        $ gcloud network-connectivity transports remote-profiles describe \
            myprofile --region=us-central1

POSITIONAL ARGUMENTS
     RemoteTransportProfile resource - Name of the remote transport profile to
     be described. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument remote_transport_profile on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REMOTE_TRANSPORT_PROFILE
          ID of the remoteTransportProfile or fully qualified identifier for
          the remoteTransportProfile.

          To set the remote_transport_profile attribute:
          + provide the argument remote_transport_profile on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument remote_transport_profile on the command line
            with a fully specified name;
          + provide the argument --region on the command line.

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
    This variant is also available:

        $ gcloud beta network-connectivity transports remote-profiles \
            describe
```

### gcloud network-connectivity transports remote-profiles list

```text
NAME
    gcloud network-connectivity transports remote-profiles list - list remote
        transport profiles

SYNOPSIS
    gcloud network-connectivity transports remote-profiles list
        [--region=REGION; default="-"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display a list of all remote transport profiles in the
    specified project.

EXAMPLES
    To list all remote transport profiles in the "us-east4" region, run:

        $ gcloud network-connectivity transports remote-profiles list \
        --region=us-east4

    To list all remote transport profiles in all regions, run:

        $ gcloud network-connectivity transports remote-profiles list

FLAGS
     --region=REGION; default="-"
        The region of the remote transport profiles to list. Use "-" to list
        all profiles.

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
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity transports remote-profiles list
```

### gcloud network-connectivity transports update

```text
NAME
    gcloud network-connectivity transports update - update a transport

SYNOPSIS
    gcloud network-connectivity transports update (TRANSPORT : --region=REGION)
        [--advertised-routes=[CIDR_RANGE,...]] [--async]
        [--bandwidth=BANDWIDTH] [--description=DESCRIPTION]
        [--stack-type=STACK_TYPE] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a transport with the given name to a remote provider.

EXAMPLES
    To update a transport named mytransport in the us-east4 region, run:

        $ gcloud network-connectivity transports update mytransport \
            --region=us-east4 --description="new description" \
            --advertised-routes="10.0.0.0/8,10.1.0.0/16" --bandwidth=1G

POSITIONAL ARGUMENTS
     Transport resource - Name of the Transport to be updated. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument transport on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRANSPORT
          ID of the transport or fully qualified identifier for the transport.

          To set the transport attribute:
          + provide the argument transport on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument transport on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --advertised-routes=[CIDR_RANGE,...]
        List of routes to advertise from the VPC network toward the provider.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --bandwidth=BANDWIDTH
        Bandwidth of the transport to create. Must be a supported bandwidth on
        the remote profile. BANDWIDTH must be one of: 100g, 100m, 10g, 1g,
        200m, 20g, 2g, 300m, 400m, 500m, 50g, 50m, 5g.

     --description=DESCRIPTION
        Description of the transport.

     --stack-type=STACK_TYPE
        IP version of the routes to be exchanged. STACK_TYPE must be one of:
        ipv4-ipv6, ipv4-only.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud network-connectivity transports update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-connectivity transports update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

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
    This variant is also available:

        $ gcloud beta network-connectivity transports update
```

### gcloud beta network-connectivity transports create

```text
NAME
    gcloud beta network-connectivity transports create - create a transport

SYNOPSIS
    gcloud beta network-connectivity transports create TRANSPORT
        (--activation-key=ACTIVATION_KEY | --bandwidth=BANDWIDTH
          --remote-account-id=REMOTE_ACCOUNT_ID
          --remote-profile=REMOTE_PROFILE)
        (--network=NETWORK
          | [--hub=HUB : --auto-accept --group=GROUP --psc-routing-enabled])
        [--advertised-routes=[CIDR_RANGE,...]] [--async]
        [--description=DESCRIPTION] [--no-enable-admin]
        [--labels=[KEY=VALUE,...]] [--region=REGION]
        [--stack-type=STACK_TYPE; default="ipv4-only"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity transports delete

```text
NAME
    gcloud beta network-connectivity transports delete - delete a transport

SYNOPSIS
    gcloud beta network-connectivity transports delete
        (TRANSPORT : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity transports describe

```text
NAME
    gcloud beta network-connectivity transports describe - describe a transport

SYNOPSIS
    gcloud beta network-connectivity transports describe
        (TRANSPORT : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity transports list

```text
NAME
    gcloud beta network-connectivity transports list - list transports

SYNOPSIS
    gcloud beta network-connectivity transports list
        [--region=REGION; default="-"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity transports remote-profiles describe

```text
NAME
    gcloud beta network-connectivity transports remote-profiles describe -
        describe a remote transport profile

SYNOPSIS
    gcloud beta network-connectivity transports remote-profiles describe
        (REMOTE_TRANSPORT_PROFILE : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity transports remote-profiles list

```text
NAME
    gcloud beta network-connectivity transports remote-profiles list - list
        remote transport profiles

SYNOPSIS
    gcloud beta network-connectivity transports remote-profiles list
        [--region=REGION; default="-"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity transports update

```text
NAME
    gcloud beta network-connectivity transports update - update a transport

SYNOPSIS
    gcloud beta network-connectivity transports update
        (TRANSPORT : --region=REGION) [--advertised-routes=[CIDR_RANGE,...]]
        [--async] [--bandwidth=BANDWIDTH] [--description=DESCRIPTION]
        [--stack-type=STACK_TYPE] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` examples do not pass `--region`; gcloud 593.0.0 fails with "Failed to find attribute [region]" (the region is set only by a fully specified name or `--region`, and no property sets it), so the runnable form adds `--region=us-east4`, the region of the `delete` example on this page (use the region of your transport).
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` examples pass `--profile aws-us-east-1`, but the SYNOPSIS flag for the remote transport profile is `--remote-profile` (gcloud 593.0.0: "unrecognized arguments: --profile (did you mean '--remote-profile'?) aws-us-east-1"); the runnable form uses `--remote-profile`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the hub example passes `--hub projects/12345/locations/us-central1/hubs/my-hub`; NCC hubs are global resources, and gcloud 593.0.0 rejects the regional path ("Error parsing [hub]. Invalid value: projects/12345/locations/us-central1/hubs/my-hub"), so the runnable form uses `projects/12345/locations/global/hubs/my-hub`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/transports (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
