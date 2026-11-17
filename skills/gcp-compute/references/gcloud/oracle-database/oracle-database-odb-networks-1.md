---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/odb-networks
---

# gcloud oracle-database odb-networks (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database odb-networks create

```text
NAME
    gcloud oracle-database odb-networks create - create a new OdbNetwork

SYNOPSIS
    gcloud oracle-database odb-networks create
        (ODB_NETWORK : --location=LOCATION) --network=NETWORK [--async]
        [--gcp-oracle-zone=GCP_ORACLE_ZONE] [--labels=[LABELS,...]]
        [--psc-interface-config-network-attachment=PSC_INTERFACE_CONFIG_NETWORK_ATTACHMENT]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new OdbNetwork.

EXAMPLES
    To create OdbNetwork with id my-odbnetwork with network
    projects/my-project/locations/global/networks/default in the location
    us-east4. run:

        $ gcloud oracle-database odb-networks create my-odbnetwork \
            --location=us-east4 \
            --network=projects/my-project/locations/global/networks/default

    To create an OdbNetwork with id my-odbnetwork with network
    projects/my-project/locations/global/networks/default and network
    attachment
    projects/my-project/regions/us-east4/networkAttachments/my-network-attachment
    in the location us-east4, run:

        $ gcloud oracle-database odb-networks create my-odbnetwork \
            --location=us-east4 \
            --network=projects/my-project/locations/global/networks/\
        default \
            --psc-interface-config-network-attachment=projects/my-project/\
        regions/us-east4/networkAttachments/my-network-attachment

POSITIONAL ARGUMENTS
     OdbNetwork resource - Identifier. The name of the OdbNetwork resource in
     the following format:
     projects/{project}/locations/{region}/odbNetworks/{odb_network} The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument odb_network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ODB_NETWORK
          ID of the odbNetwork or fully qualified identifier for the
          odbNetwork.

          To set the odb_network attribute:
          + provide the argument odb_network on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the odbNetwork resource.

          To set the location attribute:
          + provide the argument odb_network on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Network resource - The name of the VPC network in the following format:
     projects/{project}/global/networks/{network} This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --network=NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network attribute:
          + provide the argument --network on the command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --gcp-oracle-zone=GCP_ORACLE_ZONE
        The GCP Oracle zone where OdbNetwork is hosted. Example: us-east4-b-r2.
        If not specified, the system will pick a zone based on availability.

     --labels=[LABELS,...]
        Labels or tags associated with the resource.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     Configuration to enable the service (Oracledatabase@Google Cloud) to
     establish connectivity to the database.

     This should be specified if you intend to associate this OdbNetwork with a
     DatabaseConnection resource to ExecuteSQL on the database, or to create a
     ServiceIntegration with the Database.

     Please don't specify it otherwise to avoid complicating the network setup.

     Configuration for a Private Service Connect (PSC) interface used by
     Oracledatabase@Google Cloud to establish private connectivity to the
     database.

     --psc-interface-config-network-attachment=PSC_INTERFACE_CONFIG_NETWORK_ATTACHMENT
        The resource name of the Network Attachment that Oracledatabase@Google
        Cloud will use to establish private connectivity to the database via a
        Private Service Connect Interface (PSC-I). Format:
        projects/{project}/regions/{region}/networkAttachments/{network_attachment}

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud oracle-database odb-networks create my-odbnetwork \
    --location=us-east4 \
    --network=projects/my-project/global/networks/default

gcloud oracle-database odb-networks create my-odbnetwork \
    --location=us-east4 \
    --network=projects/my-project/global/networks/default \
    --psc-interface-config-network-attachment=projects/my-project/regions/us-east4/networkAttachments/my-network-attachment
```

### gcloud oracle-database odb-networks delete

```text
NAME
    gcloud oracle-database odb-networks delete - delete an OdbNetwork

SYNOPSIS
    gcloud oracle-database odb-networks delete
        (ODB_NETWORK : --location=LOCATION) [--async] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an OdbNetwork.

EXAMPLES
    To delete an OdbNetwork with id my-odbnetwork in the location us-east4,
    run:

        $ gcloud oracle-database odb-networks delete my-odbnetwork \
            --location=us-east4

POSITIONAL ARGUMENTS
     OdbNetwork resource - The name of the resource in the following format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument odb_network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ODB_NETWORK
          ID of the odbNetwork or fully qualified identifier for the
          odbNetwork.

          To set the odb_network attribute:
          + provide the argument odb_network on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the odbNetwork resource.

          To set the location attribute:
          + provide the argument odb_network on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database odb-networks describe

```text
NAME
    gcloud oracle-database odb-networks describe - get details of an OdbNetwork

SYNOPSIS
    gcloud oracle-database odb-networks describe
        (ODB_NETWORK : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of an OdbNetwork.

EXAMPLES
    To get an OdbNetwork with id my-odbnetwork in the location us-east4, run:

        $ gcloud oracle-database odb-networks describe my-odbnetwork \
            --location=us-east4

POSITIONAL ARGUMENTS
     OdbNetwork resource - The name of the OdbNetwork in the following format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument odb_network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ODB_NETWORK
          ID of the odbNetwork or fully qualified identifier for the
          odbNetwork.

          To set the odb_network attribute:
          + provide the argument odb_network on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the odbNetwork resource.

          To set the location attribute:
          + provide the argument odb_network on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database odb-networks list

```text
NAME
    gcloud oracle-database odb-networks list - list all OdbNetworks

SYNOPSIS
    gcloud oracle-database odb-networks list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all OdbNetworks.

EXAMPLES
    To list all OdbNetworks in the location us-east4, run:

        $ gcloud oracle-database odb-networks list --location=us-east4

REQUIRED FLAGS
     Location resource - The parent value for the ODB Network in the following
     format: projects/{project}/locations/{location}. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database odb-networks odb-dns-zones create

```text
NAME
    gcloud oracle-database odb-networks odb-dns-zones create - create a new
        OdbDnsZone

SYNOPSIS
    gcloud oracle-database odb-networks odb-dns-zones create
        (ODB_DNS_ZONE : --location=LOCATION --odb-network=ODB_NETWORK)
        --domain=DOMAIN [--async] [--labels=[LABELS,...]]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new OdbDnsZone.

EXAMPLES
    To create OdbDnsZone with id my-odb-dns-zone with domain abc.example.com.
    in the location us-east4 for a given OdbNetwork with id my-odbnetwork, run:

        $ gcloud oracle-database odb-networks odb-dns-zones create \
            my-odb-dns-zone --odb-network=my-odbnetwork \
            --domain=abc.example.com. --location=us-east4

POSITIONAL ARGUMENTS
     OdbDnsZone resource - Identifier. The name of the OdbDnsZone resource in
     the following format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbDnsZones/{odb_dns_zone}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument odb_dns_zone on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ODB_DNS_ZONE
          ID of the odbDnsZone or fully qualified identifier for the
          odbDnsZone.

          To set the odb_dns_zone attribute:
          + provide the argument odb_dns_zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the odbDnsZone resource.

          To set the location attribute:
          + provide the argument odb_dns_zone on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --odb-network=ODB_NETWORK
          The odbNetwork id of the odbDnsZone resource.

          To set the odb-network attribute:
          + provide the argument odb_dns_zone on the command line with a
            fully specified name;
          + provide the argument --odb-network on the command line.

REQUIRED FLAGS
     --domain=DOMAIN
        The DNS suffix for the zone. Ex: abc.example.com.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --labels=[LABELS,...]
        Labels or tags associated with the resource.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database odb-networks odb-dns-zones delete

```text
NAME
    gcloud oracle-database odb-networks odb-dns-zones delete - delete an
        OdbDnsZone

SYNOPSIS
    gcloud oracle-database odb-networks odb-dns-zones delete
        (ODB_DNS_ZONE : --location=LOCATION --odb-network=ODB_NETWORK)
        [--async] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an OdbDnsZone.

EXAMPLES
    To delete an OdbDnsZone with id my-odb-dns-zone in the location us-east4
    for a given OdbNetwork with id my-odbnetwork, run:

        $ gcloud oracle-database odb-networks odb-dns-zones delete \
            my-odb-dns-zone --odb-network=my-odbnetwork --location=us-east4

POSITIONAL ARGUMENTS
     OdbDnsZone resource - The name of the resource in the following format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbDnsZones/{odb_dns_zone}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument odb_dns_zone on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ODB_DNS_ZONE
          ID of the odbDnsZone or fully qualified identifier for the
          odbDnsZone.

          To set the odb_dns_zone attribute:
          + provide the argument odb_dns_zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the odbDnsZone resource.

          To set the location attribute:
          + provide the argument odb_dns_zone on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --odb-network=ODB_NETWORK
          The odbNetwork id of the odbDnsZone resource.

          To set the odb-network attribute:
          + provide the argument odb_dns_zone on the command line with a
            fully specified name;
          + provide the argument --odb-network on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database odb-networks odb-dns-zones describe

```text
NAME
    gcloud oracle-database odb-networks odb-dns-zones describe - get details of
        an OdbDnsZone

SYNOPSIS
    gcloud oracle-database odb-networks odb-dns-zones describe
        (ODB_DNS_ZONE : --location=LOCATION --odb-network=ODB_NETWORK)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of an OdbDnsZone.

EXAMPLES
    To get an OdbDnsZone with id my-odb-dns-zone in the location us-east4 for a
    given OdbNetwork with id my-odbnetwork, run:

        $ gcloud oracle-database odb-networks odb-dns-zones describe \
            my-odb-dns-zone --odb-network=my-odbnetwork --location=us-east4

POSITIONAL ARGUMENTS
     OdbDnsZone resource - The name of the OdbDnsZone in the following format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbDnsZones/{odb_dns_zone}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument odb_dns_zone on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ODB_DNS_ZONE
          ID of the odbDnsZone or fully qualified identifier for the
          odbDnsZone.

          To set the odb_dns_zone attribute:
          + provide the argument odb_dns_zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the odbDnsZone resource.

          To set the location attribute:
          + provide the argument odb_dns_zone on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --odb-network=ODB_NETWORK
          The odbNetwork id of the odbDnsZone resource.

          To set the odb-network attribute:
          + provide the argument odb_dns_zone on the command line with a
            fully specified name;
          + provide the argument --odb-network on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database odb-networks odb-dns-zones list

```text
NAME
    gcloud oracle-database odb-networks odb-dns-zones list - list all
        OdbDnsZones

SYNOPSIS
    gcloud oracle-database odb-networks odb-dns-zones list
        (--odb-network=ODB_NETWORK : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all OdbDnsZones.

EXAMPLES
    To list all OdbDnsZones in the location us-east4 for a given OdbNetwork
    with id my-odbnetwork, run:

        $ gcloud oracle-database odb-networks odb-dns-zones list \
            --odb-network=my-odbnetwork --location=us-east4

REQUIRED FLAGS
     OdbNetwork resource - The parent value for the OdbDnsZone in the following
     format: projects/{project}/locations/{location}/odbNetworks/{odb_network}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --odb-network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --odb-network=ODB_NETWORK
          ID of the odbNetwork or fully qualified identifier for the
          odbNetwork.

          To set the odb-network attribute:
          + provide the argument --odb-network on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the odbNetwork resource.

          To set the location attribute:
          + provide the argument --odb-network on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database odb-networks odb-subnets create

```text
NAME
    gcloud oracle-database odb-networks odb-subnets create - create a new
        OdbSubnet

SYNOPSIS
    gcloud oracle-database odb-networks odb-subnets create
        (ODB_SUBNET : --location=LOCATION --odb-network=ODB_NETWORK)
        --cidr-range=CIDR_RANGE --purpose=PURPOSE [--async]
        [--labels=[LABELS,...]] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new OdbSubnet.

EXAMPLES
    To create OdbSubnet with id my-odbsubnet with cidr-range 10.0.10.0/24 and
    the purpose of subnet is for client connections CLIENT_SUBNET in the
    location us-east4 for a given OdbNetwork with id my-odbnetwork. run:

        $ gcloud oracle-database odb-networks odb-subnets create \
            my-odbsubnet --odb-network=my-odbnetwork \
            --cidr-range=10.0.10.0/24 --purpose=CLIENT_SUBNET \
            --location=us-east4

POSITIONAL ARGUMENTS
     OdbSubnet resource - Identifier. The name of the OdbSubnet resource in the
     following format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument odb_subnet on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ODB_SUBNET
          ID of the odbSubnet or fully qualified identifier for the odbSubnet.

          To set the odb_subnet attribute:
          + provide the argument odb_subnet on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the odbSubnet resource.

          To set the location attribute:
          + provide the argument odb_subnet on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --odb-network=ODB_NETWORK
          The odbNetwork id of the odbSubnet resource.

          To set the odb-network attribute:
          + provide the argument odb_subnet on the command line with a fully
            specified name;
          + provide the argument --odb-network on the command line.

REQUIRED FLAGS
     --cidr-range=CIDR_RANGE
        The CIDR range of the subnet.

     --purpose=PURPOSE
        Purpose of the subnet. PURPOSE must be one of:

         backup-subnet
            Subnet to be used for backup.
         client-subnet
            Subnet to be used for client connections.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --labels=[LABELS,...]
        Labels or tags associated with the resource.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database odb-networks odb-subnets delete

```text
NAME
    gcloud oracle-database odb-networks odb-subnets delete - delete an
        OdbSubnet

SYNOPSIS
    gcloud oracle-database odb-networks odb-subnets delete
        (ODB_SUBNET : --location=LOCATION --odb-network=ODB_NETWORK) [--async]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an OdbSubnet.

EXAMPLES
    To delete an OdbSubnet with id my-odbsubnet in the location us-east4 for a
    given OdbNetwork with id my-odbnetwork, run:

        $ gcloud oracle-database odb-networks odb-subnets delete \
            my-odbsubnet --odb-network=my-odbnetwork --location=us-east4

POSITIONAL ARGUMENTS
     OdbSubnet resource - The name of the resource in the following format:
     projects/{project}/locations/{region}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument odb_subnet on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ODB_SUBNET
          ID of the odbSubnet or fully qualified identifier for the odbSubnet.

          To set the odb_subnet attribute:
          + provide the argument odb_subnet on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the odbSubnet resource.

          To set the location attribute:
          + provide the argument odb_subnet on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --odb-network=ODB_NETWORK
          The odbNetwork id of the odbSubnet resource.

          To set the odb-network attribute:
          + provide the argument odb_subnet on the command line with a fully
            specified name;
          + provide the argument --odb-network on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database odb-networks odb-subnets describe

```text
NAME
    gcloud oracle-database odb-networks odb-subnets describe - get details of
        an OdbSubnet

SYNOPSIS
    gcloud oracle-database odb-networks odb-subnets describe
        (ODB_SUBNET : --location=LOCATION --odb-network=ODB_NETWORK)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of an OdbSubnet.

EXAMPLES
    To get an OdbSubnet with id my-odbsubnet in the location us-east4 for a
    given OdbNetwork with id my-odbnetwork, run:

        $ gcloud oracle-database odb-networks odb-subnets describe \
            my-odbsubnet --odb-network=my-odbnetwork --location=us-east4

POSITIONAL ARGUMENTS
     OdbSubnet resource - The name of the OdbSubnet in the following format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument odb_subnet on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ODB_SUBNET
          ID of the odbSubnet or fully qualified identifier for the odbSubnet.

          To set the odb_subnet attribute:
          + provide the argument odb_subnet on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the odbSubnet resource.

          To set the location attribute:
          + provide the argument odb_subnet on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --odb-network=ODB_NETWORK
          The odbNetwork id of the odbSubnet resource.

          To set the odb-network attribute:
          + provide the argument odb_subnet on the command line with a fully
            specified name;
          + provide the argument --odb-network on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database odb-networks odb-subnets list

```text
NAME
    gcloud oracle-database odb-networks odb-subnets list - list all OdbSubnets

SYNOPSIS
    gcloud oracle-database odb-networks odb-subnets list
        (--odb-network=ODB_NETWORK : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all OdbSubnets.

EXAMPLES
    To list all OdbSubnets in the location us-east4 for a given OdbNetwork with
    id my-odbnetwork, run:

        $ gcloud oracle-database odb-networks odb-subnets list \
            --odb-network=my-odbnetwork --location=us-east4

REQUIRED FLAGS
     OdbNetwork resource - The parent value for the OdbSubnet in the following
     format: projects/{project}/locations/{location}/odbNetworks/{odb_network}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --odb-network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --odb-network=ODB_NETWORK
          ID of the odbNetwork or fully qualified identifier for the
          odbNetwork.

          To set the odb-network attribute:
          + provide the argument --odb-network on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the odbNetwork resource.

          To set the location attribute:
          + provide the argument --odb-network on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database odb-networks odb-subnets update

```text
NAME
    gcloud oracle-database odb-networks odb-subnets update - update labels of
        an OdbSubnet

SYNOPSIS
    gcloud oracle-database odb-networks odb-subnets update
        (ODB_SUBNET : --location=LOCATION --odb-network=ODB_NETWORK) [--async]
        [--request-id=REQUEST_ID]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update labels of an OdbSubnet. Only labels can be updated on this resource;
    use --update-labels, --remove-labels or --clear-labels to manage them.

EXAMPLES
    To add or update labels on an OdbSubnet with id my-odbsubnet in the
    location us-east4, run:

        $ gcloud oracle-database odb-networks odb-subnets update \
            my-odbsubnet --odb-network=my-odbnetwork --location=us-east4 \
            --update-labels=env=prod,team=oasis

    To remove the label team from the OdbSubnet, run:

        $ gcloud oracle-database odb-networks odb-subnets update \
            my-odbsubnet --odb-network=my-odbnetwork --location=us-east4 \
            --remove-labels=team

    To clear all labels from the OdbSubnet, run:

        $ gcloud oracle-database odb-networks odb-subnets update \
            my-odbsubnet --odb-network=my-odbnetwork --location=us-east4 \
            --clear-labels

POSITIONAL ARGUMENTS
     OdbSubnet resource - Identifier. The name of the OdbSubnet resource in the
     following format:
     projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument odb_subnet on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ODB_SUBNET
          ID of the odbSubnet or fully qualified identifier for the odbSubnet.

          To set the odb_subnet attribute:
          + provide the argument odb_subnet on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the odbSubnet resource.

          To set the location attribute:
          + provide the argument odb_subnet on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --odb-network=ODB_NETWORK
          The odbNetwork id of the odbSubnet resource.

          To set the odb-network attribute:
          + provide the argument odb_subnet on the command line with a fully
            specified name;
          + provide the argument --odb-network on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Labels or tags associated with the resource.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. Labels or tags
            associated with the resource.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives the VPC network as `projects/my-project/locations/global/networks/default`, but the `--network` resource format in the same help is `projects/{project}/global/networks/{network}`; the runnable form uses `projects/my-project/global/networks/default`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/odb-networks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
