---
source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/private-connections
---

# gcloud database-migration private-connections

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud database-migration private-connections create

```text
NAME
    gcloud database-migration private-connections create - create a Database
        Migration private connection

SYNOPSIS
    gcloud database-migration private-connections create
        (PRIVATE_CONNECTION : --region=REGION) --display-name=DISPLAY_NAME
        (--network-attachment=NETWORK_ATTACHMENT | --reserved-public-ip
          | --reserved-public-ip-nat-ips-count=RESERVED_PUBLIC_IP_NAT_IPS_COUNT
          | --subnet=SUBNET --vpc=VPC) [--no-async]
        [--endpoint-mode=ENDPOINT_MODE] [--labels=[KEY=VALUE,...]]
        [--skip-validation] [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Database Migration private connection

EXAMPLES
    To create a private connection with VPC Peering called
    'my-private-connection', run:

        $ gcloud database-migration private-connections create \
          my-private-connection --region=us-central1 \
          --display-name=my-private-connection --vpc=vpc-example \
          --subnet=10.0.0.0/29

        To create a private connection with PSC Interface called 'my-privateConnection', run:

        $ gcloud database-migration private-connections create \
          my-private-connection --location=us-central1 \
          --display-name=my-private-connection \
          --network-attachment=network-attachment-example

        To use a private connection, all migrations and connection profiles that use this configuration must be in the same region.

POSITIONAL ARGUMENTS
     Private connection resource - The private connection to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument private_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PRIVATE_CONNECTION
          ID of the private_connection or fully qualified identifier for the
          private_connection.

          To set the private_connection attribute:
          + provide the argument private_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the private_connection.

          To set the region attribute:
          + provide the argument private_connection on the command line with
            a fully specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     --display-name=DISPLAY_NAME
        A user-friendly name for the private connection. The display name can
        include letters, numbers, spaces, and hyphens, and must start with a
        letter. The maximum length allowed is 60 characters.

     Exactly one of these must be specified:

       Arguments for Private Service Connect Interface configuration.

       --network-attachment=NETWORK_ATTACHMENT
          Full URI of the network attachment that datastream will connect
          to.For example, this would be of the
          form:network-attachment=projects/test-project/regions/us-central1/networkAttachments/my-na

       Arguments for Reserved Public IP configuration.

       At most one of these can be specified:

         --reserved-public-ip
            Creates the private connection using reserved public IP addresses.
            If this flag is provided without
            --reserved-public-ip-nat-ips-count, a default of 1 IP address is
            reserved.

         --reserved-public-ip-nat-ips-count=RESERVED_PUBLIC_IP_NAT_IPS_COUNT
            Number of static public IP addresses to reserve for the private
            connection. Specifying this flag automatically enables reserved
            public IPs, making the --reserved-public-ip flag optional.

       Arguments for VPC Peering configuration.

       --subnet=SUBNET
          A free subnet for peering. (CIDR of /29).

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       Vpc resource - Resource ID of the VPC network to peer with. This
       represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --vpc on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       This must be specified.

         --vpc=VPC
            ID of the vpc or fully qualified identifier for the vpc.

            To set the vpc attribute:
            - provide the argument --vpc on the command line.

OPTIONAL FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --skip-validation
        Creates the private connection without running prior verifications.

     --validate-only
        If set, the request will retrieve the project id to allow in the
        network attachment Datastream will connect to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud database-migration private-connections create my-private-connection \
    --region=us-central1 \
    --display-name=my-private-connection \
    --network-attachment=network-attachment-example
```

### gcloud database-migration private-connections delete

```text
NAME
    gcloud database-migration private-connections delete - delete a Database
        Migration private connection

SYNOPSIS
    gcloud database-migration private-connections delete
        (PRIVATE_CONNECTION : --region=REGION) [--no-async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Database Migration private connection

EXAMPLES
    To delete a private connection called 'my-private-connection', run:

        $ gcloud database-migration private-connections delete \
          my-private-connection --region=us-central1

POSITIONAL ARGUMENTS
     Private connection resource - The private connection to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument private_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PRIVATE_CONNECTION
          ID of the private_connection or fully qualified identifier for the
          private_connection.

          To set the private_connection attribute:
          + provide the argument private_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the private_connection.

          To set the region attribute:
          + provide the argument private_connection on the command line with
            a fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --no-async
        Waits for the operation in progress to complete before returning.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

### gcloud database-migration private-connections describe

```text
NAME
    gcloud database-migration private-connections describe - show details about
        a database migration private connection

SYNOPSIS
    gcloud database-migration private-connections describe
        (PRIVATE_CONNECTION : --region=REGION) [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a private connection.

EXAMPLES
    To show details about a private connection called 'my-private-connection',
    run:

        $ gcloud database-migration private-connections describe \
            my-private-connection --region=us-central1

POSITIONAL ARGUMENTS
     Private connection resource - The private connection you want to get the
     details of. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument private_connection on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PRIVATE_CONNECTION
          ID of the private_connection or fully qualified identifier for the
          private_connection.

          To set the private_connection attribute:
          + provide the argument private_connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the region.

          To set the region attribute:
          + provide the argument private_connection on the command line with
            a fully specified name;
          + provide the argument --region on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datamigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/database-migration/

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

### gcloud database-migration private-connections list

```text
NAME
    gcloud database-migration private-connections list - list private
        connections

SYNOPSIS
    gcloud database-migration private-connections list --region=REGION
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List private connections.

EXAMPLES
    To list all private connections in the current project and location
    'us-central1', run:

        $ gcloud database-migration private-connections list \
            --region=us-central1

REQUIRED FLAGS
     Region resource - The region you want to list the private connections for.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --region=REGION
          ID of the region or fully qualified identifier for the region.

          To set the region attribute:
          + provide the argument --region on the command line.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

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
    This command uses the datamigration/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/database-migration/

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example passes `--location=us-central1`, but the SYNOPSIS of this command takes the region with `--region` and has no `--location` flag (gcloud 593.0.0: "unrecognized arguments: --location=us-central1"); the runnable form uses `--region=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/private-connections (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
