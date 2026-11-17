---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/address-groups
---

# gcloud network-security address-groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security address-groups add-items

```text
NAME
    gcloud network-security address-groups add-items - add items to an address
        group

SYNOPSIS
    gcloud network-security address-groups add-items
        (ADDRESS_GROUP : --location=LOCATION) [--async] [--items=[ITEMS,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add items to an existing address group.

EXAMPLES
    Add an item to an address group named my-address-group.

        $ gcloud network-security address-groups add-items \
            my-address-group --items=192.168.1.1

POSITIONAL ARGUMENTS
     Address group resource - Name of the address group to be updated. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument address_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADDRESS_GROUP
          ID of the address group or fully qualified identifier for the address
          group.

          To set the address_group attribute:
          + provide the argument address_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument address_group on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --items=[ITEMS,...]
        Items to be added to the address group.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security address-groups add-items

        $ gcloud beta network-security address-groups add-items
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security address-groups add-items my-address-group \
    --location=global \
    --items=192.168.1.1
```

### gcloud network-security address-groups clone-items

```text
NAME
    gcloud network-security address-groups clone-items - clone items from
        source address group

SYNOPSIS
    gcloud network-security address-groups clone-items
        (ADDRESS_GROUP : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Clone items from source address group.

EXAMPLES
    Clone items from source address group named other-address-group.

        $ gcloud network-security address-groups clone-items \
            my-address-group \
            --source=projects/other/locations/global/other-address-group

POSITIONAL ARGUMENTS
     Address group resource - Name of the address group to be updated. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument address_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADDRESS_GROUP
          ID of the address group or fully qualified identifier for the address
          group.

          To set the address_group attribute:
          + provide the argument address_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument address_group on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --source=SOURCE
        Source address group to be cloned from.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security address-groups clone-items

        $ gcloud beta network-security address-groups clone-items
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security address-groups clone-items my-address-group \
    --location=global \
    --source=projects/other/locations/global/addressGroups/other-address-group
```

### gcloud network-security address-groups create

```text
NAME
    gcloud network-security address-groups create - create an address group

SYNOPSIS
    gcloud network-security address-groups create
        (ADDRESS_GROUP : --location=LOCATION) --capacity=CAPACITY --type=TYPE
        [--async] [--description=DESCRIPTION] [--items=[ITEMS,...]]
        [--labels=[KEY=VALUE,...]] [--purpose=[PURPOSE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new address group with the given name.

EXAMPLES
    Create an address group with the name my-address-group, type IPV4, capacity
    100 and the description optional description.

        $ gcloud network-security address-groups create my-address-group \
            --type=IPV4 --capacity=100 --description="optional description"

POSITIONAL ARGUMENTS
     Address group resource - Name of the address group to be created. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument address_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADDRESS_GROUP
          ID of the address group or fully qualified identifier for the address
          group.

          To set the address_group attribute:
          + provide the argument address_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument address_group on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --capacity=CAPACITY
        Capacity of the address group.

     --type=TYPE
        Type of the address group. TYPE must be one of: ipv4, ipv6.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the address group.

     --items=[ITEMS,...]
        Items of the address group.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

     --purpose=[PURPOSE,...]
        List of Address Group purposes. PURPOSE must be one of: cloud-armor,
        default.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security address-groups create

        $ gcloud beta network-security address-groups create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security address-groups create my-address-group \
    --location=global \
    --type=IPV4 \
    --capacity=100 \
    --description="optional description"
```

### gcloud network-security address-groups delete

```text
NAME
    gcloud network-security address-groups delete - delete address group

SYNOPSIS
    gcloud network-security address-groups delete
        (ADDRESS_GROUP : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified address group.

EXAMPLES
    To delete an address group called 'my-address-group', run:

        $ gcloud network-security address-groups delete my-address-group \
            --location=global

POSITIONAL ARGUMENTS
     Address group resource - Name of the address group you want to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument address_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADDRESS_GROUP
          ID of the address group or fully qualified identifier for the address
          group.

          To set the address_group attribute:
          + provide the argument address_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument address_group on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security address-groups delete

        $ gcloud beta network-security address-groups delete
```

### gcloud network-security address-groups describe

```text
NAME
    gcloud network-security address-groups describe - describe an address group

SYNOPSIS
    gcloud network-security address-groups describe
        (ADDRESS_GROUP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of an address group.

EXAMPLES
    Show details about an address group named my-address-group.

        $ gcloud network-security address-groups describe my-address-group

POSITIONAL ARGUMENTS
     Address group resource - Name of the address group to be described. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument address_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADDRESS_GROUP
          ID of the address group or fully qualified identifier for the address
          group.

          To set the address_group attribute:
          + provide the argument address_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument address_group on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security address-groups describe

        $ gcloud beta network-security address-groups describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security address-groups describe my-address-group \
    --location=global
```

### gcloud network-security address-groups list

```text
NAME
    gcloud network-security address-groups list - list address groups

SYNOPSIS
    gcloud network-security address-groups list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all address groups in the specified location of the current project.

EXAMPLES
    To list address groups in the current project, run:

        $ gcloud network-security address-groups list --location=global

REQUIRED FLAGS
     Location resource - The project of the address groups to display. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security address-groups list

        $ gcloud beta network-security address-groups list
```

### gcloud network-security address-groups list-references

```text
NAME
    gcloud network-security address-groups list-references - lists References
        of an Address Group

SYNOPSIS
    gcloud network-security address-groups list-references
        (ADDRESS_GROUP : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists References of an Address Group.

EXAMPLES
    To list References of address group named my-address-group.

        $ gcloud network-security address-groups list-references \
            my-address-group

POSITIONAL ARGUMENTS
     Address group resource - address group group help. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument ADDRESS_GROUP on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADDRESS_GROUP
          ID of the address group or fully qualified identifier for the address
          group.

          To set the address_group attribute:
          + provide the argument ADDRESS_GROUP on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument ADDRESS_GROUP on the command line with a
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

NOTES
    These variants are also available:

        $ gcloud alpha network-security address-groups list-references

        $ gcloud beta network-security address-groups list-references
```

### gcloud network-security address-groups remove-items

```text
NAME
    gcloud network-security address-groups remove-items - remove items from an
        address group

SYNOPSIS
    gcloud network-security address-groups remove-items
        (ADDRESS_GROUP : --location=LOCATION) [--async] [--items=[ITEMS,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove items from an existing address group.

EXAMPLES
    Remove an item from an address group named my-address-group.

        $ gcloud network-security address-groups remove-items \
            my-address-group --items=192.168.1.1

POSITIONAL ARGUMENTS
     Address group resource - Name of the address group to be updated. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument address_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADDRESS_GROUP
          ID of the address group or fully qualified identifier for the address
          group.

          To set the address_group attribute:
          + provide the argument address_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument address_group on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --items=[ITEMS,...]
        Items to be removed from the address group.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security address-groups remove-items

        $ gcloud beta network-security address-groups remove-items
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security address-groups remove-items my-address-group \
    --location=global \
    --items=192.168.1.1
```

### gcloud network-security address-groups update

```text
NAME
    gcloud network-security address-groups update - update an address group

SYNOPSIS
    gcloud network-security address-groups update
        (ADDRESS_GROUP : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--items=[ITEMS,...]]
        [--purpose=[PURPOSE,...]] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the details of an address group.

EXAMPLES
    Update description of an address group named my-address-group.

        $ gcloud network-security address-groups update my-address-group \
            --description="New description"

POSITIONAL ARGUMENTS
     Address group resource - Name of the address group to be updated. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument address_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADDRESS_GROUP
          ID of the address group or fully qualified identifier for the address
          group.

          To set the address_group attribute:
          + provide the argument address_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument address_group on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        New description of the address group.

     --items=[ITEMS,...]
        Items of the address group.

     --purpose=[PURPOSE,...]
        List of Address Group purposes. PURPOSE must be one of: cloud-armor,
        default.

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

              $ gcloud network-security address-groups update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security address-groups update --clear-labels \
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
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security address-groups update

        $ gcloud beta network-security address-groups update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security address-groups update my-address-group \
    --location=global \
    --description="New description"
```

### gcloud beta network-security address-groups add-items

```text
NAME
    gcloud beta network-security address-groups add-items - add items to an
        address group

SYNOPSIS
    gcloud beta network-security address-groups add-items
        (ADDRESS_GROUP : --location=LOCATION) [--async] [--items=[ITEMS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security address-groups clone-items

```text
NAME
    gcloud beta network-security address-groups clone-items - clone items from
        source address group

SYNOPSIS
    gcloud beta network-security address-groups clone-items
        (ADDRESS_GROUP : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security address-groups create

```text
NAME
    gcloud beta network-security address-groups create - create an address
        group

SYNOPSIS
    gcloud beta network-security address-groups create
        (ADDRESS_GROUP : --location=LOCATION) --capacity=CAPACITY --type=TYPE
        [--async] [--description=DESCRIPTION] [--items=[ITEMS,...]]
        [--labels=[KEY=VALUE,...]] [--purpose=[PURPOSE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security address-groups delete

```text
NAME
    gcloud beta network-security address-groups delete - delete address group

SYNOPSIS
    gcloud beta network-security address-groups delete
        (ADDRESS_GROUP : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security address-groups describe

```text
NAME
    gcloud beta network-security address-groups describe - describe an address
        group

SYNOPSIS
    gcloud beta network-security address-groups describe
        (ADDRESS_GROUP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security address-groups list

```text
NAME
    gcloud beta network-security address-groups list - list address groups

SYNOPSIS
    gcloud beta network-security address-groups list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security address-groups list-references

```text
NAME
    gcloud beta network-security address-groups list-references - lists
        References of an Address Group

SYNOPSIS
    gcloud beta network-security address-groups list-references
        (ADDRESS_GROUP : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security address-groups remove-items

```text
NAME
    gcloud beta network-security address-groups remove-items - remove items
        from an address group

SYNOPSIS
    gcloud beta network-security address-groups remove-items
        (ADDRESS_GROUP : --location=LOCATION) [--async] [--items=[ITEMS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security address-groups update

```text
NAME
    gcloud beta network-security address-groups update - update an address
        group

SYNOPSIS
    gcloud beta network-security address-groups update
        (ADDRESS_GROUP : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--items=[ITEMS,...]]
        [--purpose=[PURPOSE,...]] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security address-groups add-items

```text
NAME
    gcloud alpha network-security address-groups add-items - add items to an
        address group

SYNOPSIS
    gcloud alpha network-security address-groups add-items
        (ADDRESS_GROUP : --location=LOCATION) [--async] [--items=[ITEMS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security address-groups clone-items

```text
NAME
    gcloud alpha network-security address-groups clone-items - clone items from
        source address group

SYNOPSIS
    gcloud alpha network-security address-groups clone-items
        (ADDRESS_GROUP : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security address-groups create

```text
NAME
    gcloud alpha network-security address-groups create - create an address
        group

SYNOPSIS
    gcloud alpha network-security address-groups create
        (ADDRESS_GROUP : --location=LOCATION) --capacity=CAPACITY --type=TYPE
        [--async] [--description=DESCRIPTION] [--items=[ITEMS,...]]
        [--labels=[KEY=VALUE,...]] [--purpose=[PURPOSE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security address-groups delete

```text
NAME
    gcloud alpha network-security address-groups delete - delete address group

SYNOPSIS
    gcloud alpha network-security address-groups delete
        (ADDRESS_GROUP : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security address-groups describe

```text
NAME
    gcloud alpha network-security address-groups describe - describe an address
        group

SYNOPSIS
    gcloud alpha network-security address-groups describe
        (ADDRESS_GROUP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security address-groups list

```text
NAME
    gcloud alpha network-security address-groups list - list address groups

SYNOPSIS
    gcloud alpha network-security address-groups list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security address-groups list-references

```text
NAME
    gcloud alpha network-security address-groups list-references - lists
        References of an Address Group

SYNOPSIS
    gcloud alpha network-security address-groups list-references
        (ADDRESS_GROUP : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security address-groups remove-items

```text
NAME
    gcloud alpha network-security address-groups remove-items - remove items
        from an address group

SYNOPSIS
    gcloud alpha network-security address-groups remove-items
        (ADDRESS_GROUP : --location=LOCATION) [--async] [--items=[ITEMS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security address-groups update

```text
NAME
    gcloud alpha network-security address-groups update - update an address
        group

SYNOPSIS
    gcloud alpha network-security address-groups update
        (ADDRESS_GROUP : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--items=[ITEMS,...]]
        [--purpose=[PURPOSE,...]] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `add-items`, `clone-items`, `create`, `describe`, `remove-items` and `update` example omits `--location`, which the SYNOPSIS requires for the resource (no property sets it); gcloud 593.0.0 fails with "Failed to find attribute [location]" without it, so the runnable form adds `--location=global`, the location of the `delete` and `list` examples on this page.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `clone-items` example passes `--source=projects/other/locations/global/other-address-group`, which lacks the `addressGroups` collection segment; an address group is identified as `<containerType>/<containerId>/locations/<location>/addressGroups/<address-group-name>` (https://docs.cloud.google.com/firewall/docs/address-groups-firewall-policies, retrieved 2026-11-17), so the runnable form uses `projects/other/locations/global/addressGroups/other-address-group`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/address-groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
