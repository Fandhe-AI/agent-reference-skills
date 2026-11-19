---
source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/entry-groups
---

# gcloud data-catalog entry-groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud data-catalog entry-groups add-iam-policy-binding

```text
NAME
    gcloud data-catalog entry-groups add-iam-policy-binding - add an IAM policy
        binding to a Data Catalog entry group

SYNOPSIS
    gcloud data-catalog entry-groups add-iam-policy-binding
        (ENTRY_GROUP : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    entry-groups instead.

    Add an IAM policy binding to a Data Catalog entry group.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' with entry group 'group1' and location 'us-central1',
    run:

        $ gcloud data-catalog entry-groups add-iam-policy-binding group1 \
            --location='us-central1' --member='user:test-user@gmail.com' \
            --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Entry group resource - Entry group for which to add an IAM policy binding.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument entry_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_GROUP
          ID of the entry group or fully qualified identifier for the entry
          group.

          To set the entry_group attribute:
          + provide the argument entry_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the entry group.

          To set the location attribute:
          + provide the argument entry_group on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog entry-groups add-iam-policy-binding

        $ gcloud beta data-catalog entry-groups add-iam-policy-binding
```

### gcloud data-catalog entry-groups create

```text
NAME
    gcloud data-catalog entry-groups create - create a Data Catalog entry group

SYNOPSIS
    gcloud data-catalog entry-groups create (ENTRY_GROUP : --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    entry-groups instead.

    Create a Data Catalog entry group.

EXAMPLES
    To create an entry group for some data, run:

        $ gcloud data-catalog entry-groups create group1 \
            --location=us-central1 \
            --display-name="analytics data - jan 2011" \
            --description="Entries related to January 2011 analytics data."

POSITIONAL ARGUMENTS
     Entry group resource - Entry group to create. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument entry_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_GROUP
          ID of the entry group or fully qualified identifier for the entry
          group.

          To set the entry_group attribute:
          + provide the argument entry_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the entry group.

          To set the location attribute:
          + provide the argument entry_group on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --description=DESCRIPTION
        Description of the entry group.

     --display-name=DISPLAY_NAME
        Human-readable name of the entry group.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog entry-groups create

        $ gcloud beta data-catalog entry-groups create
```

### gcloud data-catalog entry-groups delete

```text
NAME
    gcloud data-catalog entry-groups delete - delete a Data Catalog entry group

SYNOPSIS
    gcloud data-catalog entry-groups delete (ENTRY_GROUP : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    entry-groups instead.

    Delete a Data Catalog entry group.

EXAMPLES
    To delete an entry group for some data, run:

        $ gcloud data-catalog entry-groups delete group1 \
            --location=us-central1

POSITIONAL ARGUMENTS
     Entry group resource - Entry group to delete. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument entry_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_GROUP
          ID of the entry group or fully qualified identifier for the entry
          group.

          To set the entry_group attribute:
          + provide the argument entry_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the entry group.

          To set the location attribute:
          + provide the argument entry_group on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog entry-groups delete

        $ gcloud beta data-catalog entry-groups delete
```

### gcloud data-catalog entry-groups describe

```text
NAME
    gcloud data-catalog entry-groups describe - describe a Data Catalog entry
        group

SYNOPSIS
    gcloud data-catalog entry-groups describe
        (ENTRY_GROUP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    entry-groups instead.

    Describe a Data Catalog entry group.

EXAMPLES
    To describe an entry group for some data, run:

        $ gcloud data-catalog entry-groups describe group1 \
            --location=us-central1

POSITIONAL ARGUMENTS
     Entry group resource - Entry group to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument entry_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_GROUP
          ID of the entry group or fully qualified identifier for the entry
          group.

          To set the entry_group attribute:
          + provide the argument entry_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the entry group.

          To set the location attribute:
          + provide the argument entry_group on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog entry-groups describe

        $ gcloud beta data-catalog entry-groups describe
```

### gcloud data-catalog entry-groups get-iam-policy

```text
NAME
    gcloud data-catalog entry-groups get-iam-policy - get the IAM policy for a
        Data Catalog entry group

SYNOPSIS
    gcloud data-catalog entry-groups get-iam-policy
        (ENTRY_GROUP : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    entry-groups instead.

    gcloud data-catalog entry-groups get-iam-policy displays the IAM policy
    associated with a Data Catalog entry group. If formatted as JSON, the
    output can be edited and used as a policy file for set-iam-policy. The
    output includes an "etag" field identifying the version emitted and
    allowing detection of concurrent policy updates; see $ gcloud data-catalog
    entry-groups set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for entry group 'group1' in 'us-central1', run:

        $ gcloud data-catalog entry-groups get-iam-policy \
            --location=us-central1 group1

POSITIONAL ARGUMENTS
     Entry group resource - Entry group for which to display the IAM policy.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument entry_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_GROUP
          ID of the entry group or fully qualified identifier for the entry
          group.

          To set the entry_group attribute:
          + provide the argument entry_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the entry group.

          To set the location attribute:
          + provide the argument entry_group on the command line with a fully
            specified name;
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog entry-groups get-iam-policy

        $ gcloud beta data-catalog entry-groups get-iam-policy
```

### gcloud data-catalog entry-groups list

```text
NAME
    gcloud data-catalog entry-groups list - list all entry groups in a Data
        Catalog location

SYNOPSIS
    gcloud data-catalog entry-groups list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    entry-groups instead.

    List all entries in a Data Catalog location.

EXAMPLES
    To list all entry groups in us-central1, run:

        $ gcloud data-catalog entry-groups list --location=us-central1

REQUIRED FLAGS
     Location resource - The location to list entry groups from. This
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
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog entry-groups list

        $ gcloud beta data-catalog entry-groups list
```

### gcloud data-catalog entry-groups remove-iam-policy-binding

```text
NAME
    gcloud data-catalog entry-groups remove-iam-policy-binding - remove an IAM
        policy binding from a Data Catalog entry group

SYNOPSIS
    gcloud data-catalog entry-groups remove-iam-policy-binding
        (ENTRY_GROUP : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    entry-groups instead.

    Remove an IAM policy binding from a Data Catalog entry group.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on entry group 'group1' with location 'us-central1',
    run:

        $ gcloud data-catalog entry-groups remove-iam-policy-binding \
            --location=us-central1 group1 \
            --member='user:test-user@gmail.com' --role='roles/editor'

    To remove an IAM policy binding for the role of 'roles/editor' from all
    authenticated users on entry group 'group1' with location 'us-central1',
    run:

        $ gcloud data-catalog entry-groups remove-iam-policy-binding \
            --location=us-central1 group1 --member='allAuthenticatedUsers' \
            --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Entry group resource - Entry group from which to remove the IAM policy
     binding. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_GROUP
          ID of the entry group or fully qualified identifier for the entry
          group.

          To set the entry_group attribute:
          + provide the argument entry_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the entry group.

          To set the location attribute:
          + provide the argument entry_group on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog entry-groups remove-iam-policy-binding

        $ gcloud beta data-catalog entry-groups remove-iam-policy-binding
```

### gcloud data-catalog entry-groups set-iam-policy

```text
NAME
    gcloud data-catalog entry-groups set-iam-policy - set the IAM policy for a
        Data Catalog entry group

SYNOPSIS
    gcloud data-catalog entry-groups set-iam-policy
        (ENTRY_GROUP : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    entry-groups instead.

    Set the IAM policy for the given Data Catalog entry group as defined in a
    JSON or YAML file.

EXAMPLES
    The following command will read am IAM policy defined in a JSON file
    'policy.json' and set it for the entry group 'group1' with location
    'us-central1':

        $ gcloud data-catalog entry-groups set-iam-policy group1 \
            --location=us-central1 policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Entry group resource - Entry group for which to set the IAM policy. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument entry_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_GROUP
          ID of the entry group or fully qualified identifier for the entry
          group.

          To set the entry_group attribute:
          + provide the argument entry_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the entry group.

          To set the location attribute:
          + provide the argument entry_group on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog entry-groups set-iam-policy

        $ gcloud beta data-catalog entry-groups set-iam-policy
```

### gcloud data-catalog entry-groups update

```text
NAME
    gcloud data-catalog entry-groups update - update a Data Catalog entry group

SYNOPSIS
    gcloud data-catalog entry-groups update (ENTRY_GROUP : --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    entry-groups instead.

    Update a Data Catalog entry group.

EXAMPLES
    To update the description of entry group 'group1' , run:

        $ gcloud data-catalog entry-groups update group1 \
            --location=us-central1 --description="new description"

POSITIONAL ARGUMENTS
     Entry group resource - Entry group to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument entry_group on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_GROUP
          ID of the entry group or fully qualified identifier for the entry
          group.

          To set the entry_group attribute:
          + provide the argument entry_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the entry group.

          To set the location attribute:
          + provide the argument entry_group on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --description=DESCRIPTION
        Description of the entry group.

     --display-name=DISPLAY_NAME
        Human-readable name of the entry group.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog entry-groups update

        $ gcloud beta data-catalog entry-groups update
```

### gcloud beta data-catalog entry-groups add-iam-policy-binding

```text
NAME
    gcloud beta data-catalog entry-groups add-iam-policy-binding - add an IAM
        policy binding to a Data Catalog entry group

SYNOPSIS
    gcloud beta data-catalog entry-groups add-iam-policy-binding
        (ENTRY_GROUP : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entry-groups create

```text
NAME
    gcloud beta data-catalog entry-groups create - create a Data Catalog entry
        group

SYNOPSIS
    gcloud beta data-catalog entry-groups create
        (ENTRY_GROUP : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entry-groups delete

```text
NAME
    gcloud beta data-catalog entry-groups delete - delete a Data Catalog entry
        group

SYNOPSIS
    gcloud beta data-catalog entry-groups delete
        (ENTRY_GROUP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entry-groups describe

```text
NAME
    gcloud beta data-catalog entry-groups describe - describe a Data Catalog
        entry group

SYNOPSIS
    gcloud beta data-catalog entry-groups describe
        (ENTRY_GROUP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entry-groups get-iam-policy

```text
NAME
    gcloud beta data-catalog entry-groups get-iam-policy - get the IAM policy
        for a Data Catalog entry group

SYNOPSIS
    gcloud beta data-catalog entry-groups get-iam-policy
        (ENTRY_GROUP : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entry-groups list

```text
NAME
    gcloud beta data-catalog entry-groups list - list all entry groups in a
        Data Catalog location

SYNOPSIS
    gcloud beta data-catalog entry-groups list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entry-groups remove-iam-policy-binding

```text
NAME
    gcloud beta data-catalog entry-groups remove-iam-policy-binding - remove an
        IAM policy binding from a Data Catalog entry group

SYNOPSIS
    gcloud beta data-catalog entry-groups remove-iam-policy-binding
        (ENTRY_GROUP : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entry-groups set-iam-policy

```text
NAME
    gcloud beta data-catalog entry-groups set-iam-policy - set the IAM policy
        for a Data Catalog entry group

SYNOPSIS
    gcloud beta data-catalog entry-groups set-iam-policy
        (ENTRY_GROUP : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog entry-groups update

```text
NAME
    gcloud beta data-catalog entry-groups update - update a Data Catalog entry
        group

SYNOPSIS
    gcloud beta data-catalog entry-groups update
        (ENTRY_GROUP : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entry-groups add-iam-policy-binding

```text
NAME
    gcloud alpha data-catalog entry-groups add-iam-policy-binding - add an IAM
        policy binding to a Data Catalog entry group

SYNOPSIS
    gcloud alpha data-catalog entry-groups add-iam-policy-binding
        (ENTRY_GROUP : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entry-groups create

```text
NAME
    gcloud alpha data-catalog entry-groups create - create a Data Catalog entry
        group

SYNOPSIS
    gcloud alpha data-catalog entry-groups create
        (ENTRY_GROUP : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entry-groups delete

```text
NAME
    gcloud alpha data-catalog entry-groups delete - delete a Data Catalog entry
        group

SYNOPSIS
    gcloud alpha data-catalog entry-groups delete
        (ENTRY_GROUP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entry-groups describe

```text
NAME
    gcloud alpha data-catalog entry-groups describe - describe a Data Catalog
        entry group

SYNOPSIS
    gcloud alpha data-catalog entry-groups describe
        (ENTRY_GROUP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entry-groups get-iam-policy

```text
NAME
    gcloud alpha data-catalog entry-groups get-iam-policy - get the IAM policy
        for a Data Catalog entry group

SYNOPSIS
    gcloud alpha data-catalog entry-groups get-iam-policy
        (ENTRY_GROUP : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entry-groups list

```text
NAME
    gcloud alpha data-catalog entry-groups list - list all entry groups in a
        Data Catalog location

SYNOPSIS
    gcloud alpha data-catalog entry-groups list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entry-groups remove-iam-policy-binding

```text
NAME
    gcloud alpha data-catalog entry-groups remove-iam-policy-binding - remove
        an IAM policy binding from a Data Catalog entry group

SYNOPSIS
    gcloud alpha data-catalog entry-groups remove-iam-policy-binding
        (ENTRY_GROUP : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entry-groups set-iam-policy

```text
NAME
    gcloud alpha data-catalog entry-groups set-iam-policy - set the IAM policy
        for a Data Catalog entry group

SYNOPSIS
    gcloud alpha data-catalog entry-groups set-iam-policy
        (ENTRY_GROUP : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog entry-groups update

```text
NAME
    gcloud alpha data-catalog entry-groups update - update a Data Catalog entry
        group

SYNOPSIS
    gcloud alpha data-catalog entry-groups update
        (ENTRY_GROUP : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud data-catalog entry-groups add-iam-policy-binding`: "This command is deprecated. Please use gcloud dataplex entry-groups instead."; `gcloud data-catalog entry-groups create`: "This command is deprecated. Please use gcloud dataplex entry-groups instead."; `gcloud data-catalog entry-groups delete`: "This command is deprecated. Please use gcloud dataplex entry-groups instead."; `gcloud data-catalog entry-groups describe`: "This command is deprecated. Please use gcloud dataplex entry-groups instead."; `gcloud data-catalog entry-groups get-iam-policy`: "This command is deprecated. Please use gcloud dataplex entry-groups instead."; `gcloud data-catalog entry-groups list`: "This command is deprecated. Please use gcloud dataplex entry-groups instead."; `gcloud data-catalog entry-groups remove-iam-policy-binding`: "This command is deprecated. Please use gcloud dataplex entry-groups instead."; `gcloud data-catalog entry-groups set-iam-policy`: "This command is deprecated. Please use gcloud dataplex entry-groups instead."; `gcloud data-catalog entry-groups update`: "This command is deprecated. Please use gcloud dataplex entry-groups instead.".
- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The commands on this page belong to the deprecated metadata search and cataloging features; they are still in the gcloud 593.0.0 help.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/entry-groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
