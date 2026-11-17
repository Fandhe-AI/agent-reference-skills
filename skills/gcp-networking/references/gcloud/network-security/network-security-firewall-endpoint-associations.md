---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoint-associations
---

# gcloud network-security firewall-endpoint-associations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security firewall-endpoint-associations create

```text
NAME
    gcloud network-security firewall-endpoint-associations create - create a
        Firewall Plus endpoint association

SYNOPSIS
    gcloud network-security firewall-endpoint-associations create
        [ASSOCIATION_ID] --network=NETWORK
        (--endpoint=ENDPOINT
          : --endpoint-zone=ENDPOINT_ZONE --organization=ORGANIZATION)
        (--location=LOCATION | --zone=ZONE) [--async]
        [--labels=[KEY=VALUE,...]] [--max-wait=MAX_WAIT; default="60m"]
        [--tls-inspection-policy=TLS_INSPECTION_POLICY
          : --tls-inspection-policy-project=TLS_INSPECTION_POLICY_PROJECT
          --tls-inspection-policy-region=TLS_INSPECTION_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Associate the specified network with the firewall endpoint. Successful
    creation of a firewall endpoint association results in an association in
    READY state. Check the progress of association creation by using gcloud
    network-security firewall-endpoint-associations list.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To associate a network with a firewall endpoint, run:

        $ gcloud network-security firewall-endpoint-associations create \
          --network=projects/my-project/networks/global/myNetwork \
          --endpoint=organizations/1234/locations/us-central1-a/\
        firewallEndpoints/my-endpoint --zone=us-central1-a \
            --project=my-project

POSITIONAL ARGUMENTS
     [ASSOCIATION_ID]
        Name to give the association. If not specified, an auto-generated UUID
        will be used.

REQUIRED FLAGS
     Network resource - Firewall Plus. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument --network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --network=NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network-name attribute:
          + provide the argument --network on the command line.

     Firewall endpoint resource - Firewall Plus. The arguments in this group
     can be used to specify the attributes of this resource. This resource can
     be one of the following types: [firewall endpoint].

     This must be specified.

       --endpoint=ENDPOINT
          ID of the firewall endpoint or fully qualified identifier for the
          firewall endpoint.

          To set the endpoint-name attribute:
          + provide the argument --endpoint on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --endpoint-zone=ENDPOINT_ZONE
          Zone of the firewall endpoint.

          To set the endpoint-zone attribute:
          + provide the argument --endpoint on the command line with a fully
            specified name;
          + provide the argument --endpoint-zone on the command line;
          + provide the argument --zone on the command line;
          + provide the argument --location on the command line;
          + provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the command
            line with a fully specified name.

       --organization=ORGANIZATION
          Organization ID to which the changes should apply.

          To set the organization attribute:
          + provide the argument --endpoint on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

     Exactly one of these must be specified:

       --location=LOCATION
          Location of the firewall endpoint association

       --zone=ZONE
          Zone of the firewall endpoint association

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --max-wait=MAX_WAIT; default="60m"
        Time to synchronously wait for the operation to complete, after which
        the operation continues asynchronously. Ignored if --no-async isn't
        specified. See $ gcloud topic datetimes for information on time
        formats.

     TLS Inspection Policy resource - Path to TLS Inspection Policy
     configuration to use for intercepting TLS-encrypted traffic in this
     network. The arguments in this group can be used to specify the attributes
     of this resource.

     --tls-inspection-policy=TLS_INSPECTION_POLICY
        ID of the TLS Inspection Policy or fully qualified identifier for the
        TLS Inspection Policy.

        To set the tls_inspection_policy attribute:
        * provide the argument --tls-inspection-policy on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --tls-inspection-policy-project=TLS_INSPECTION_POLICY_PROJECT
        Project of the TLS Inspection Policy.

        To set the tls-inspection-policy-project attribute:
        * provide the argument --tls-inspection-policy on the command line
          with a fully specified name;
        * provide the argument --tls-inspection-policy-project on the command
          line;
        * provide the argument --project on the command line;
        * provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the command
          line with a fully specified name.

     --tls-inspection-policy-region=TLS_INSPECTION_POLICY_REGION
        Region of the TLS Inspection Policy. NOTE: TLS Inspection Policy needs
        to be in the same region as Firewall Plus endpoint resource.

        To set the tls-inspection-policy-region attribute:
        * provide the argument --tls-inspection-policy on the command line
          with a fully specified name;
        * provide the argument --tls-inspection-policy-region on the command
          line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security firewall-endpoint-associations create

        $ gcloud beta network-security firewall-endpoint-associations create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud network-security firewall-endpoint-associations create \
    --network=projects/my-project/global/networks/myNetwork \
    --endpoint=organizations/1234/locations/us-central1-a/firewallEndpoints/my-endpoint \
    --zone=us-central1-a \
    --project=my-project
```

### gcloud network-security firewall-endpoint-associations delete

```text
NAME
    gcloud network-security firewall-endpoint-associations delete - delete a
        Firewall Plus endpoint association

SYNOPSIS
    gcloud network-security firewall-endpoint-associations delete
        (FIREWALL_ENDPOINT_ASSOCIATION : --zone=ZONE) [--async]
        [--location=LOCATION] [--max-wait=MAX_WAIT; default="60m"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Unassociate the specified network from a firewall endpoint. Check the
    progress of association deletion by using gcloud network-security
    firewall-endpoint-associations list.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To unassociate a network from a firewall, run:

        $ gcloud network-security firewall-endpoint-associations delete \
            my-assoc --zone=us-central1-a --project=my-project OR
        $ gcloud network-security firewall-endpoint-associations delete \
            projects/my-project/locations/us-central1-a/\
        firewallEndpointAssociations/my-association

POSITIONAL ARGUMENTS
     Firewall endpoint association resource - Firewall Plus. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FIREWALL_ENDPOINT_ASSOCIATION
          ID of the firewall endpoint association or fully qualified identifier
          for the firewall endpoint association.

          To set the association-name attribute:
          + provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          Zone of the firewall endpoint association.

          To set the zone attribute:
          + provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the command
            line with a fully specified name;
          + provide the argument --zone on the command line;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --location=LOCATION
        Location of the firewall endpoint association

     --max-wait=MAX_WAIT; default="60m"
        Time to synchronously wait for the operation to complete, after which
        the operation continues asynchronously. Ignored if --no-async isn't
        specified. See $ gcloud topic datetimes for information on time
        formats.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security firewall-endpoint-associations delete

        $ gcloud beta network-security firewall-endpoint-associations delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud network-security firewall-endpoint-associations delete my-assoc \
    --zone=us-central1-a \
    --project=my-project

gcloud network-security firewall-endpoint-associations delete projects/my-project/locations/us-central1-a/firewallEndpointAssociations/my-association
```

### gcloud network-security firewall-endpoint-associations describe

```text
NAME
    gcloud network-security firewall-endpoint-associations describe - describe
        a Firewall Plus endpoint association

SYNOPSIS
    gcloud network-security firewall-endpoint-associations describe
        (FIREWALL_ENDPOINT_ASSOCIATION : --zone=ZONE) [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a firewall endpoint association.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To get a description of a firewall endpoint association called
    my-association, run:

        $ gcloud network-security firewall-endpoint-associations describe \
            my-association --zone=us-central1-a --project=my-project OR
        $ gcloud network-security firewall-endpoint-associations describe \
            projects/my-project/locations/us-central1-a/\
        firewallEndpointAssociations/my-association

POSITIONAL ARGUMENTS
     Firewall endpoint association resource - Firewall Plus. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FIREWALL_ENDPOINT_ASSOCIATION
          ID of the firewall endpoint association or fully qualified identifier
          for the firewall endpoint association.

          To set the association-name attribute:
          + provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          Zone of the firewall endpoint association.

          To set the zone attribute:
          + provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the command
            line with a fully specified name;
          + provide the argument --zone on the command line;
          + provide the argument --location on the command line.

FLAGS
     --location=LOCATION
        Location of the firewall endpoint association

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security firewall-endpoint-associations \
            describe

        $ gcloud beta network-security firewall-endpoint-associations \
            describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud network-security firewall-endpoint-associations describe my-association \
    --zone=us-central1-a \
    --project=my-project

gcloud network-security firewall-endpoint-associations describe projects/my-project/locations/us-central1-a/firewallEndpointAssociations/my-association
```

### gcloud network-security firewall-endpoint-associations list

```text
NAME
    gcloud network-security firewall-endpoint-associations list - list Firewall
        Plus endpoint associations

SYNOPSIS
    gcloud network-security firewall-endpoint-associations list
        [--location=LOCATION | --zone=ZONE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List firewall endpoint associations.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To list firewall endpoint associations, run:

        $ gcloud network-security firewall-endpoint-associations list \
            --zone=us-central1-a --project=my-project

    To list firewall endpoint associations in all zones, run:

        $ gcloud network-security firewall-endpoint-associations list \
            --project=my-project

    The project is automatically read from the core/project property if it is
    defined.

FLAGS
     At most one of these can be specified:

       --location=LOCATION
          Location of the firewall endpoint association

       --zone=ZONE
          Zone of the firewall endpoint association

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

        $ gcloud alpha network-security firewall-endpoint-associations list

        $ gcloud beta network-security firewall-endpoint-associations list
```

### gcloud network-security firewall-endpoint-associations update

```text
NAME
    gcloud network-security firewall-endpoint-associations update - update a
        Firewall Plus endpoint association

SYNOPSIS
    gcloud network-security firewall-endpoint-associations update
        (FIREWALL_ENDPOINT_ASSOCIATION : --zone=ZONE) [--async]
        [--location=LOCATION] [--max-wait=MAX_WAIT; default="60m"]
        [--disabled | --update-labels=[KEY=VALUE,...] --clear-labels
          | --remove-labels=[KEY,...] --no-tls-inspection-policy
          | [--tls-inspection-policy=TLS_INSPECTION_POLICY
          : --tls-inspection-policy-project=TLS_INSPECTION_POLICY_PROJECT
          --tls-inspection-policy-region=TLS_INSPECTION_POLICY_REGION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a firewall endpoint association. Check the progress of association
    update by using gcloud network-security firewall-endpoint-associations
    describe.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To update labels k1 and k2, run:

        $ gcloud network-security firewall-endpoint-associations update \
            my-assoc --zone=us-central1-a --project=my-proj \
            --update-labels=k1=v1,k2=v2

    To remove labels k3 and k4, run:

        $ gcloud network-security firewall-endpoint-associations update \
            my-assoc --zone=us-central1-a --project=my-proj \
            --remove-labels=k3,k4

    To clear all labels from the firewall endpoint association, run:

        $ gcloud network-security firewall-endpoint-associations update \
            my-assoc --zone=us-central1-a --project=my-proj --clear-labels

POSITIONAL ARGUMENTS
     Firewall endpoint association resource - Firewall Plus. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FIREWALL_ENDPOINT_ASSOCIATION
          ID of the firewall endpoint association or fully qualified identifier
          for the firewall endpoint association.

          To set the association-name attribute:
          + provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          Zone of the firewall endpoint association.

          To set the zone attribute:
          + provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the command
            line with a fully specified name;
          + provide the argument --zone on the command line;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --location=LOCATION
        Location of the firewall endpoint association

     --max-wait=MAX_WAIT; default="60m"
        Time to synchronously wait for the operation to complete, after which
        the operation continues asynchronously. Ignored if --no-async isn't
        specified. See $ gcloud topic datetimes for information on time
        formats.

     At most one of these can be specified:

       --disabled
          Disable a firewall endpoint association. To enable a disabled
          association, use:

              $ gcloud network-security firewall-endpoint-associations update \
                   MY-ASSOCIATION --no-disabled

       Or at least one of these can be specified:

         --update-labels=[KEY=VALUE,...]
            List of label KEY=VALUE pairs to update. If a label exists, its
            value is modified. Otherwise, a new label is created.

            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers. Values
            must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

         At most one of these can be specified:

           --clear-labels
              Remove all labels. If --update-labels is also specified then
              --clear-labels is applied first.

              For example, to remove all labels:

                  $ gcloud network-security firewall-endpoint-associations update \
                    --clear-labels

              To remove all existing labels and create two new labels, foo and
              baz:

                  $ gcloud network-security firewall-endpoint-associations update \
                    --clear-labels --update-labels foo=bar,baz=qux

           --remove-labels=[KEY,...]
              List of label keys to remove. If a label does not exist it is
              silently ignored. If --update-labels is also specified then
              --update-labels is applied first.

         At most one of these can be specified:

           --no-tls-inspection-policy
              Remove TLS inspection policy from this association.

           Or at least one of these can be specified:

             TLS Inspection Policy resource - Path to TLS Inspection Policy
             configuration to use for intercepting TLS-encrypted traffic in
             this network. The arguments in this group can be used to specify
             the attributes of this resource.

             --tls-inspection-policy=TLS_INSPECTION_POLICY
                ID of the TLS Inspection Policy or fully qualified identifier
                for the TLS Inspection Policy.

                To set the tls_inspection_policy attribute:
                * provide the argument --tls-inspection-policy on the command
                  line.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --tls-inspection-policy-project=TLS_INSPECTION_POLICY_PROJECT
                Project of the TLS Inspection Policy.

                To set the tls-inspection-policy-project attribute:
                * provide the argument --tls-inspection-policy on the command
                  line with a fully specified name;
                * provide the argument --tls-inspection-policy-project on the
                  command line;
                * provide the argument --project on the command line;
                * provide the argument FIREWALL_ENDPOINT_ASSOCIATION on the
                  command line with a fully specified name.

             --tls-inspection-policy-region=TLS_INSPECTION_POLICY_REGION
                Region of the TLS Inspection Policy. NOTE: TLS Inspection
                Policy needs to be in the same region as Firewall Plus endpoint
                resource.

                To set the tls-inspection-policy-region attribute:
                * provide the argument --tls-inspection-policy on the command
                  line with a fully specified name;
                * provide the argument --tls-inspection-policy-region on the
                  command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security firewall-endpoint-associations update

        $ gcloud beta network-security firewall-endpoint-associations update
```

### gcloud beta network-security firewall-endpoint-associations create

```text
NAME
    gcloud beta network-security firewall-endpoint-associations create - create
        a Firewall Plus endpoint association

SYNOPSIS
    gcloud beta network-security firewall-endpoint-associations create
        [ASSOCIATION_ID] --network=NETWORK
        (--endpoint=ENDPOINT : --endpoint-project=ENDPOINT_PROJECT
          --endpoint-zone=ENDPOINT_ZONE --organization=ORGANIZATION)
        (--location=LOCATION | --zone=ZONE) [--async]
        [--labels=[KEY=VALUE,...]] [--max-wait=MAX_WAIT; default="60m"]
        [--tls-inspection-policy=TLS_INSPECTION_POLICY
          : --tls-inspection-policy-project=TLS_INSPECTION_POLICY_PROJECT
          --tls-inspection-policy-region=TLS_INSPECTION_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security firewall-endpoint-associations delete

```text
NAME
    gcloud beta network-security firewall-endpoint-associations delete - delete
        a Firewall Plus endpoint association

SYNOPSIS
    gcloud beta network-security firewall-endpoint-associations delete
        (FIREWALL_ENDPOINT_ASSOCIATION : --zone=ZONE) [--async]
        [--location=LOCATION] [--max-wait=MAX_WAIT; default="60m"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security firewall-endpoint-associations describe

```text
NAME
    gcloud beta network-security firewall-endpoint-associations describe -
        describe a Firewall Plus endpoint association

SYNOPSIS
    gcloud beta network-security firewall-endpoint-associations describe
        (FIREWALL_ENDPOINT_ASSOCIATION : --zone=ZONE) [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security firewall-endpoint-associations list

```text
NAME
    gcloud beta network-security firewall-endpoint-associations list - list
        Firewall Plus endpoint associations

SYNOPSIS
    gcloud beta network-security firewall-endpoint-associations list
        [--location=LOCATION | --zone=ZONE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security firewall-endpoint-associations update

```text
NAME
    gcloud beta network-security firewall-endpoint-associations update - update
        a Firewall Plus endpoint association

SYNOPSIS
    gcloud beta network-security firewall-endpoint-associations update
        (FIREWALL_ENDPOINT_ASSOCIATION : --zone=ZONE) [--async]
        [--location=LOCATION] [--max-wait=MAX_WAIT; default="60m"]
        [--disabled | --update-labels=[KEY=VALUE,...] --clear-labels
          | --remove-labels=[KEY,...] --no-tls-inspection-policy
          | [--tls-inspection-policy=TLS_INSPECTION_POLICY
          : --tls-inspection-policy-project=TLS_INSPECTION_POLICY_PROJECT
          --tls-inspection-policy-region=TLS_INSPECTION_POLICY_REGION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security firewall-endpoint-associations create

```text
NAME
    gcloud alpha network-security firewall-endpoint-associations create -
        create a Firewall Plus endpoint association

SYNOPSIS
    gcloud alpha network-security firewall-endpoint-associations create
        [ASSOCIATION_ID] --network=NETWORK
        (--endpoint=ENDPOINT : --endpoint-project=ENDPOINT_PROJECT
          --endpoint-zone=ENDPOINT_ZONE --organization=ORGANIZATION)
        (--location=LOCATION | --zone=ZONE) [--async]
        [--labels=[KEY=VALUE,...]] [--max-wait=MAX_WAIT; default="60m"]
        [--tls-inspection-policy=TLS_INSPECTION_POLICY
          : --tls-inspection-policy-project=TLS_INSPECTION_POLICY_PROJECT
          --tls-inspection-policy-region=TLS_INSPECTION_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security firewall-endpoint-associations delete

```text
NAME
    gcloud alpha network-security firewall-endpoint-associations delete -
        delete a Firewall Plus endpoint association

SYNOPSIS
    gcloud alpha network-security firewall-endpoint-associations delete
        (FIREWALL_ENDPOINT_ASSOCIATION : --zone=ZONE) [--async]
        [--location=LOCATION] [--max-wait=MAX_WAIT; default="60m"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security firewall-endpoint-associations describe

```text
NAME
    gcloud alpha network-security firewall-endpoint-associations describe -
        describe a Firewall Plus endpoint association

SYNOPSIS
    gcloud alpha network-security firewall-endpoint-associations describe
        (FIREWALL_ENDPOINT_ASSOCIATION : --zone=ZONE) [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security firewall-endpoint-associations list

```text
NAME
    gcloud alpha network-security firewall-endpoint-associations list - list
        Firewall Plus endpoint associations

SYNOPSIS
    gcloud alpha network-security firewall-endpoint-associations list
        [--location=LOCATION | --zone=ZONE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security firewall-endpoint-associations update

```text
NAME
    gcloud alpha network-security firewall-endpoint-associations update -
        update a Firewall Plus endpoint association

SYNOPSIS
    gcloud alpha network-security firewall-endpoint-associations update
        (FIREWALL_ENDPOINT_ASSOCIATION : --zone=ZONE) [--async]
        [--location=LOCATION] [--max-wait=MAX_WAIT; default="60m"]
        [--disabled | --update-labels=[KEY=VALUE,...] --clear-labels
          | --remove-labels=[KEY,...] --no-tls-inspection-policy
          | [--tls-inspection-policy=TLS_INSPECTION_POLICY
          : --tls-inspection-policy-project=TLS_INSPECTION_POLICY_PROJECT
          --tls-inspection-policy-region=TLS_INSPECTION_POLICY_REGION]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` example writes the network as `projects/my-project/networks/global/myNetwork`; `--network` is a `compute.networks` resource, whose path is `projects/{project}/global/networks/{network}` (gcloud 593.0.0 `association_flags.py` and the compute v1 resource registry), so the runnable form uses `projects/my-project/global/networks/myNetwork`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the first `delete` and `describe` examples end with `OR`, which introduces the fully specified form that follows; gcloud 593.0.0 rejects it as an argument ("unrecognized arguments: OR"), so the runnable form drops it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoint-associations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
