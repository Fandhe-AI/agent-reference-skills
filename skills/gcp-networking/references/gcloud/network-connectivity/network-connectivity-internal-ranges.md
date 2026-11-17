---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/internal-ranges
---

# gcloud network-connectivity internal-ranges

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity internal-ranges create

```text
NAME
    gcloud network-connectivity internal-ranges create - create a new internal
        range

SYNOPSIS
    gcloud network-connectivity internal-ranges create
        (INTERNAL_RANGE : --region=REGION) --network=NETWORK
        (--ip-cidr-range=IP_CIDR_RANGE | [--prefix-length=PREFIX_LENGTH
          : --allocation-strategy=ALLOCATION_STRATEGY
          --exclude-cidr-ranges=[EXCLUDE_CIDR_RANGES,...]
          --first-available-ranges-lookup-size=FIRST_AVAILABLE_RANGES_LOOKUP_SIZE --target-cidr-range=[TARGET_CIDR_RANGE,
          ...]]) [--async] [--description=DESCRIPTION] [--immutable]
        [--labels=[KEY=VALUE,...]] [--overlaps=[OVERLAPS,...]]
        [--peering=PEERING; default="for-self"] [--purpose=PURPOSE]
        [--usage=USAGE; default="for-vpc"]
        [--migration-source=MIGRATION_SOURCE
          --migration-target=MIGRATION_TARGET] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new internal range with the given name.

EXAMPLES
    Create an internal range with name my-range and ip-cidr-range
    192.168.0.0/25 in network
    https://www.googleapis.com/compute/v1/projects/my-project/locations/global/networks/my-network:

        $ gcloud network-connectivity internal-ranges create my-range \
            --ip-cidr-range="192.168.0.0/25" \
            --network="https://www.googleapis.com/compute/v1/projects/my-pro\
        ject/locations/global/networks/my-network" --project=my-project

    Create an internal range with name my-range and auto-allocated /25 block
    (prefix-length 25) in network my-network:

        $ gcloud network-connectivity internal-ranges create my-range \
            --prefix-length=25 --network="my-network" --project=my-project

POSITIONAL ARGUMENTS
     Internal range resource - Name of the internal range to be created. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument internal_range on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERNAL_RANGE
          ID of the internal range or fully qualified identifier for the
          internal range.

          To set the internal_range attribute:
          + provide the argument internal_range on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location ID.

          To set the region attribute:
          + provide the argument internal_range on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + use default global location .

REQUIRED FLAGS
     --network=NETWORK
        The URL or resource ID of the network in which to reserve the internal
        range. Legacy network is not supported. This can only be specified for
        a global internal address.

        For example:
        * https://www.googleapis.com/compute/v1/projects/my-project/locations/global/networks/my-network
        * /projects/my-project/locations/global/networks/my-network
        * my-network

     Exactly one of these must be specified:

       --ip-cidr-range=IP_CIDR_RANGE
          IP range that this internal range defines.

       Or at least one of these can be specified:

         --prefix-length=PREFIX_LENGTH
            An alternative to ip-cidr-range. Can be set when trying to create a
            reservation that automatically finds a free range of the given
            size.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         Additional options for the internal range's address auto-allocation
         (allowed only when prefix-length is set):

         --allocation-strategy=ALLOCATION_STRATEGY
            Allocation strategy to be used when searching for a free range.
            ALLOCATION_STRATEGY must be one of:

             first-available
                Pick the first available address range. This strategy is
                deterministic and the result is easy to predict.

             first-smallest-fitting
                Pick the smallest but fitting available range. This
                deterministic strategy minimizes fragmentation of the address
                space.

             random
                Random strategy, the legacy algorithm, used for backwards
                compatibility. This allocation strategy remains efficient in
                the case of concurrent allocation requests in the same peered
                network space and doesn't require providing the level of
                concurrency in an explicit parameter, but it is prone to
                fragmenting available address space.

             random-first-n-available
                Pick an arbitrary range out of the first N available ones. The
                N will be set in the first_available_ranges_lookup_size flag.
                This strategy should be used when concurrent allocation
                requests are made in the same space of peered networks while
                the fragmentation of the addrress space is reduced.

         --exclude-cidr-ranges=[EXCLUDE_CIDR_RANGES,...]
            A list of CIDR ranges to exclude from the search for a free range.
            This can be used to exclude specific ranges that are already
            intended to have some other use.

         --first-available-ranges-lookup-size=FIRST_AVAILABLE_RANGES_LOOKUP_SIZE
            The number of ranges to be considered when using the
            RANDOM_FIRST_N_AVAILABLE allocation strategy. This is only allowed
            when allocation-strategy is set to RANDOM_FIRST_N_AVAILABLE.

         --target-cidr-range=[TARGET_CIDR_RANGE,...]
            Can be set to narrow down or pick a different address space while
            searching for a free range. If not set, defaults to the
            "10.0.0.0/8" address space. This can be used to search in other
            rfc-1918 address spaces like "172.16.0.0/12" and "192.168.0.0/16"
            or non-rfc-1918 address spaces used in the VPC.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the internal range to be created.

     --immutable
        Mark the internal range as immutable. Then only non-semantic fields
        like description and labels could be modified after creation.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

     --overlaps=[OVERLAPS,...]
        Overlap specifications for the range being created. OVERLAPS must be
        one of:

         overlap-existing-subnet-range
            Allows for creation of internal ranges that overlap with existing
            subnets.

         overlap-route-range
            Allows for creation or existence of routes that have a more
            specific destination than the created range.

     --peering=PEERING; default="for-self"
        The type of peering set for the internal range. PEERING must be one of:

         for-peer
            This behavior can be set when the internal range is being reserved
            for usage by the peers. This means that no resource within the VPC
            in which it is being created can use this to associate with a cloud
            resource, but one of the peers can. This represents "donating" a
            range for peers to use.

         for-self
            This beharior represents the case that the internal range is
            intended to be used in the VPC on which it is created and is
            accessible from its peers. This implies that peers or peer-of-peers
            cannot use this range.

         not-shared
            This behavior can be set when the internal range is being reserved
            for usage by the VPC on which it is created but not shared with the
            peers. In a sense it is local to the VPC. This can be used to
            create internal ranges for various purposes like
            HTTP_INTERNAL_LOAD_BALANCER or for interconnect routes that are not
            shared with peers. This also implies that peers cannot use this
            range in a way that is visible to this VPC, but can re-use this
            range as long as it is NOT_SHARED from the peer VPC too.

     --purpose=PURPOSE
        Purpose of the internal range. Defines the intended use of the range
        and any restrictions associated with it. If not specified, it defaults
        to vpc-subnet. PURPOSE must be one of:

         internal-address
            The internal range is used exclusively for allocating individual IP
            addresses (for example, for global PSC endpoints). Child ranges or
            subnetworks cannot be created from a range with this purpose.

         vpc-subnet
            The internal range is used for VPC subnetworks.

     --usage=USAGE; default="for-vpc"
        The type of usage set for the internal range. USAGE must be one of:

         external-to-vpc
            Ranges created with EXTERNAL_TO_VPC cannot be associated with cloud
            resources and are meant to block out address ranges for various use
            cases, like for example, usage on-prem, with dynamic route
            announcements via interconnect.

         for-migration
            Ranges created with FOR_MIGRATION are used as locks for migrating
            subnetworks between peered VPC networks.

         for-vpc
            A cloud resource can use the reserved CIDR block by associating it
            with the internal range resource if usage is set to FOR_VPC.

     Endpoints of a for-migration internal range. This is only applicable when
     --usage is set to for-migration. Both MIGRATION_SOURCE and
     MIGRATION_TARGET must either belong to the same VPC or their VPCs must be
     peered (they may then even belong to different projects). MIGRATION_SOURCE
     must belong to the VPC network specifed by the --network flag.
     MIGRATION_TARGET may name a subnetwork which does not exist yet; it must
     be a valid resource path, and parent resources (network and project) and
     their locations must exist.

     --migration-source=MIGRATION_SOURCE
        The migration source subnetwork (of a for-migration internal range)
        resource URI or resource ID.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --migration-target=MIGRATION_TARGET
        The migration target subnetwork (of a for-migration internal range)
        resource URI or resource ID.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

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

        $ gcloud alpha network-connectivity internal-ranges create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud network-connectivity internal-ranges create my-range \
    --ip-cidr-range="192.168.0.0/25" \
    --network=my-network \
    --project=my-project
```

### gcloud network-connectivity internal-ranges delete

```text
NAME
    gcloud network-connectivity internal-ranges delete - delete an internal
        range

SYNOPSIS
    gcloud network-connectivity internal-ranges delete
        (INTERNAL_RANGE : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified internal range.

EXAMPLES
    Delete an internal range named my-range:

        $ gcloud network-connectivity internal-ranges delete my-range

POSITIONAL ARGUMENTS
     Internal range resource - Name of the internal range to be deleted. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument internal_range on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERNAL_RANGE
          ID of the internal range or fully qualified identifier for the
          internal range.

          To set the internal_range attribute:
          + provide the argument internal_range on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location ID.

          To set the region attribute:
          + provide the argument internal_range on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + use default global location .

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

        $ gcloud alpha network-connectivity internal-ranges delete
```

### gcloud network-connectivity internal-ranges describe

```text
NAME
    gcloud network-connectivity internal-ranges describe - describe an internal
        range

SYNOPSIS
    gcloud network-connectivity internal-ranges describe
        (INTERNAL_RANGE : --region=REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about an internal range.

EXAMPLES
    Display details about an internal range named my-range:

        $ gcloud network-connectivity internal-ranges describe my-range

POSITIONAL ARGUMENTS
     Internal range resource - Name of the internal range to be described. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument internal_range on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERNAL_RANGE
          ID of the internal range or fully qualified identifier for the
          internal range.

          To set the internal_range attribute:
          + provide the argument internal_range on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location ID.

          To set the region attribute:
          + provide the argument internal_range on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + use default global location .

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

        $ gcloud alpha network-connectivity internal-ranges describe
```

### gcloud network-connectivity internal-ranges list

```text
NAME
    gcloud network-connectivity internal-ranges list - list internal ranges

SYNOPSIS
    gcloud network-connectivity internal-ranges list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display a list of all internal ranges in the specified
    project.

EXAMPLES
    List all internal ranges:

        $ gcloud network-connectivity internal-ranges list

FLAGS
     Region resource - Location of the internal ranges to display. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * use default global location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        ID of the region or fully qualified identifier for the region.

        To set the region attribute:
        * provide the argument --region on the command line;
        * use default global location .

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
    This variant is also available:

        $ gcloud alpha network-connectivity internal-ranges list
```

### gcloud network-connectivity internal-ranges update

```text
NAME
    gcloud network-connectivity internal-ranges update - update an internal
        range

SYNOPSIS
    gcloud network-connectivity internal-ranges update
        (INTERNAL_RANGE : --region=REGION) [--async]
        [--description=DESCRIPTION] [--clear-labels | --labels=[KEY=VALUE,...]]
        [--clear-overlaps | --overlaps=[OVERLAPS,...]]
        [--ip-cidr-range=IP_CIDR_RANGE | --prefix-length=PREFIX_LENGTH]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the details of an internal range.

EXAMPLES
    Update ip-cidr-range of an internal range named my-range:

        $ gcloud network-connectivity internal-ranges update my-range \
            --ip-cidr-range="192.168.0.0/24"

    Extend an internal range named my-range to an address block of /24:

        $ gcloud network-connectivity internal-ranges update my-range \
            --prefix-length=24

POSITIONAL ARGUMENTS
     Internal range resource - Name of the internal range to be created. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument internal_range on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERNAL_RANGE
          ID of the internal range or fully qualified identifier for the
          internal range.

          To set the internal_range attribute:
          + provide the argument internal_range on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location ID.

          To set the region attribute:
          + provide the argument internal_range on the command line with a
            fully specified name;
          + provide the argument --region on the command line;
          + use default global location .

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the Internal Range

     At most one of these can be specified:

       --clear-labels
          Clear existing labels for the range.

       --labels=[KEY=VALUE,...]
          List of label KEY=VALUE pairs for the range being updated.

     At most one of these can be specified:

       --clear-overlaps
          Clear existing overlap fields for the range.

       --overlaps=[OVERLAPS,...]
          Overlap specifications for the range being updated. OVERLAPS must be
          one of:

           overlap-existing-subnet-range
              Allows for creation of internal ranges that overlap with existing
              subnets.

           overlap-route-range
              Allows for creation or existence of routes that have a more
              specific destination than the created range.

     At most one of these can be specified:

       --ip-cidr-range=IP_CIDR_RANGE
          IP range that this internal range defines.

       --prefix-length=PREFIX_LENGTH
          An alternative to ip-cidr-range. Can be set when trying to create a
          reservation that automatically finds a free range of the given size.

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

        $ gcloud alpha network-connectivity internal-ranges update
```

### gcloud alpha network-connectivity internal-ranges create

```text
NAME
    gcloud alpha network-connectivity internal-ranges create - create a new
        internal range

SYNOPSIS
    gcloud alpha network-connectivity internal-ranges create
        (INTERNAL_RANGE : --region=REGION) --network=NETWORK
        (--ip-cidr-range=IP_CIDR_RANGE | [--prefix-length=PREFIX_LENGTH
          : --allocation-strategy=ALLOCATION_STRATEGY
          --exclude-cidr-ranges=[EXCLUDE_CIDR_RANGES,...]
          --first-available-ranges-lookup-size=FIRST_AVAILABLE_RANGES_LOOKUP_SIZE --target-cidr-range=[TARGET_CIDR_RANGE,
          ...]]) [--async] [--description=DESCRIPTION] [--immutable]
        [--labels=[KEY=VALUE,...]] [--overlaps=[OVERLAPS,...]]
        [--peering=PEERING; default="for-self"] [--purpose=PURPOSE]
        [--usage=USAGE; default="for-vpc"]
        [--migration-source=MIGRATION_SOURCE
          --migration-target=MIGRATION_TARGET] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity internal-ranges delete

```text
NAME
    gcloud alpha network-connectivity internal-ranges delete - delete an
        internal range

SYNOPSIS
    gcloud alpha network-connectivity internal-ranges delete
        (INTERNAL_RANGE : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity internal-ranges describe

```text
NAME
    gcloud alpha network-connectivity internal-ranges describe - describe an
        internal range

SYNOPSIS
    gcloud alpha network-connectivity internal-ranges describe
        (INTERNAL_RANGE : --region=REGION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity internal-ranges list

```text
NAME
    gcloud alpha network-connectivity internal-ranges list - list internal
        ranges

SYNOPSIS
    gcloud alpha network-connectivity internal-ranges list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity internal-ranges update

```text
NAME
    gcloud alpha network-connectivity internal-ranges update - update an
        internal range

SYNOPSIS
    gcloud alpha network-connectivity internal-ranges update
        (INTERNAL_RANGE : --region=REGION) [--async]
        [--description=DESCRIPTION] [--clear-labels | --labels=[KEY=VALUE,...]]
        [--clear-overlaps | --overlaps=[OVERLAPS,...]]
        [--ip-cidr-range=IP_CIDR_RANGE | --prefix-length=PREFIX_LENGTH]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` example (and the `--network` flag description, which matches the Discovery document) writes the network as `https://www.googleapis.com/compute/v1/projects/my-project/locations/global/networks/my-network`, but a Compute Engine network URL has no `locations/` segment (`https://www.googleapis.com/compute/v1/projects/PROJECT/global/networks/NETWORK`); the runnable form passes `my-network`, the network ID form the flag description also lists.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/internal-ranges (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
