---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entry-types
---

# gcloud dataplex entry-types

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex entry-types add-iam-policy-binding

```text
NAME
    gcloud dataplex entry-types add-iam-policy-binding - add IAM policy binding
        to a Dataplex Entry Type

SYNOPSIS
    gcloud dataplex entry-types add-iam-policy-binding
        (ENTRY_TYPE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add IAM policy binding to a Dataplex Entry Type.

EXAMPLES
    To add an IAM policy binding for the role of roles/dataplex.viewer for the
    user test-user@gmail.com to Entry Type test-entry-type in project
    test-project and in location us-central1, run:

        $ gcloud dataplex entry-types add-iam-policy-binding \
            test-entry-type --project=test-project --location=us-central1 \
            --role=roles/dataplex.viewer --member=user:foo@gmail.com

    See https://cloud.google.com/dataplex/docs/iam-roles for details of policy
    role and member types.

POSITIONAL ARGUMENTS
     Entry type resource - Arguments and flags that define the Dataplex entry
     type you want to add IAM policy binding to. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument entry_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_TYPE
          ID of the entry type or fully qualified identifier for the entry
          type.

          To set the entry_type attribute:
          + provide the argument entry_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry_type on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entry-types add-iam-policy-binding
```

### gcloud dataplex entry-types create

```text
NAME
    gcloud dataplex entry-types create - create a Dataplex Entry Type

SYNOPSIS
    gcloud dataplex entry-types create (ENTRY_TYPE : --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--platform=PLATFORM]
        [--required-aspects=[type=TYPE]] [--system=SYSTEM]
        [--type-aliases=[TYPE_ALIASES,...]] [--async | --validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Entry Type is a template for creating Entries.

EXAMPLES
    To create Entry Type test-entry-type in project test-dataplex at location
    us-central1, with description test description, displayName test display
    name and required aspect type
    projects/test-dataplex/locations/us-central1/aspectTypes/test-aspect-type,
    run:

        $ gcloud dataplex entry-types create test-entry-type \
            --location=us-central1 --project=test-project \
            --description='test description' \
            --display-name='test display name' \
            --required-aspects=type='projects/test-dataplex/locations/us-cen\
        tral1/aspectTypes/test-aspect-type'

POSITIONAL ARGUMENTS
     Entry type resource - Arguments and flags that define the Dataplex entry
     type you want to create. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_TYPE
          ID of the entry type or fully qualified identifier for the entry
          type.

          To set the entry_type attribute:
          + provide the argument entry_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry_type on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --description=DESCRIPTION
        Description of the Entry Type.

     --display-name=DISPLAY_NAME
        Display name of the Entry Type.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --platform=PLATFORM
        The platform that Entries of this type belongs to.

     --required-aspects=[type=TYPE]
        Required aspect type for the entry type.

     --system=SYSTEM
        The system that Entries of this type belongs to.

     --type-aliases=[TYPE_ALIASES,...]
        Indicates the class this Entry Type belongs to.

     At most one of these can be specified:

       --async
          Return immediately, without waiting for the operation in progress to
          complete.

       --validate-only
          Validate the create action, but don't actually perform it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entry-types create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud dataplex entry-types create test-entry-type \
    --location=us-central1 \
    --project=test-project \
    --description='test description' \
    --display-name='test display name' \
    --required-aspects=type='projects/test-dataplex/locations/us-central1/aspectTypes/test-aspect-type'
```

### gcloud dataplex entry-types delete

```text
NAME
    gcloud dataplex entry-types delete - delete a Dataplex Entry Type

SYNOPSIS
    gcloud dataplex entry-types delete (ENTRY_TYPE : --location=LOCATION)
        [--async] [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Dataplex Entry Type.

EXAMPLES
    To delete Entry Type test-entry-type in project test-project and in
    location us-central1, run:

        $ gcloud dataplex entry-types delete test-entry-type \
          --location=us-central1 --project=test-project

POSITIONAL ARGUMENTS
     Entry type resource - Arguments and flags that define the Dataplex Entry
     Type you want to delete. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_TYPE
          ID of the entry type or fully qualified identifier for the entry
          type.

          To set the entry_type attribute:
          + provide the argument entry_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry_type on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        etag for the Entry Type you want to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entry-types delete
```

### gcloud dataplex entry-types describe

```text
NAME
    gcloud dataplex entry-types describe - describe a Dataplex Entry Type

SYNOPSIS
    gcloud dataplex entry-types describe (ENTRY_TYPE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays all details of an Entry Type given a valid Entry Type ID.

EXAMPLES
    To describe a Dataplex Entry Type test-entry-type in location us-central1
    and in project test-project, run:

        $ gcloud dataplex entry-types describe test-entry-type \
           --location=us-central1 --project=test-project

POSITIONAL ARGUMENTS
     Entry type resource - Arguments and flags that define the Dataplex Entry
     Type you want to retrieve. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_TYPE
          ID of the entry type or fully qualified identifier for the entry
          type.

          To set the entry_type attribute:
          + provide the argument entry_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry_type on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entry-types describe
```

### gcloud dataplex entry-types get-iam-policy

```text
NAME
    gcloud dataplex entry-types get-iam-policy - retrieve a Dataplex Entry Type
        IAM policy

SYNOPSIS
    gcloud dataplex entry-types get-iam-policy
        (ENTRY_TYPE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays the IAM policy associated with a Dataplex Entry Type resource. If
    formatted as JSON, the output can be edited and used as a policy file for
    set-iam-policy. The output includes an "etag" field identifying the version
    emitted and allowing detection of concurrent policy updates.

EXAMPLES
    To get the IAM policy of a Dataplex Entry Type test-entry-type in project
    test-project under location us-central1, run:

        $ gcloud dataplex entry-types get-iam-policy test-entry-type \
            --project=test-project --location=us-central1

POSITIONAL ARGUMENTS
     Entry type resource - Arguments and flags that define the Dataplex Entry
     Type IAM policy you want to retrieve. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_TYPE
          ID of the entry type or fully qualified identifier for the entry
          type.

          To set the entry_type attribute:
          + provide the argument entry_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry_type on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entry-types get-iam-policy
```

### gcloud dataplex entry-types list

```text
NAME
    gcloud dataplex entry-types list - list Dataplex Entry Types

SYNOPSIS
    gcloud dataplex entry-types list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Dataplex Entry Types based on project and location.

    gcloud dataplex entry-types list --project={project_id}
    --location={location}

EXAMPLES
    To list Entry Types in project test-dataplex at location us-central1

        $ gcloud dataplex entry-types list --location=us-central1 \
          --project=test-dataplex

FLAGS
     Location resource - Location to list Entry Types in. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property dataplex/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property dataplex/location.

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
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entry-types list
```

### gcloud dataplex entry-types remove-iam-policy-binding

```text
NAME
    gcloud dataplex entry-types remove-iam-policy-binding - remove IAM policy
        binding from a Dataplex Entry Type

SYNOPSIS
    gcloud dataplex entry-types remove-iam-policy-binding
        (ENTRY_TYPE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove IAM policy binding from a Dataplex Entry Type.

EXAMPLES
    To remove an IAM policy binding for the role roles/dataplex.viewer for the
    user testuser@gmail.com from an entry type test-entry-type in project
    test-project and in location us-central1, run:

        $ gcloud dataplex entry-types remove-iam-policy-binding \
            test-entry-type --project=test-project --location=us-central1 \
            --role=roles/dataplex.viewer --member=user:testuser@gmail.com

    See https://cloud.google.com/dataplex/docs/iam-roles for details of policy
    role and member types.

POSITIONAL ARGUMENTS
     Entry type resource - Arguments and flags that define the Dataplex entry
     type you want to remove IAM policy binding from The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument entry_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_TYPE
          ID of the entry type or fully qualified identifier for the entry
          type.

          To set the entry_type attribute:
          + provide the argument entry_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry_type on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entry-types remove-iam-policy-binding
```

### gcloud dataplex entry-types set-iam-policy

```text
NAME
    gcloud dataplex entry-types set-iam-policy - set an IAM policy binding for
        a Dataplex Entry Type as defined in a JSON or YAML file

SYNOPSIS
    gcloud dataplex entry-types set-iam-policy
        (ENTRY_TYPE : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    policy.json and set it for the Dataplex Entry Type test-entry-type in
    project test-project and in location us-central1:

        $ gcloud dataplex entry-types set-iam-policy test-entry-type \
            --project=test-project --location=us-central1 policy.json

        where policy.json is the relative path to the JSON file.

POSITIONAL ARGUMENTS
     Entry type resource - Arguments and flags that define the Dataplex entry
     type you want to set IAM policy to. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_TYPE
          ID of the entry type or fully qualified identifier for the entry
          type.

          To set the entry_type attribute:
          + provide the argument entry_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry_type on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entry-types set-iam-policy
```

### gcloud dataplex entry-types update

```text
NAME
    gcloud dataplex entry-types update - update a Dataplex Entry Type

SYNOPSIS
    gcloud dataplex entry-types update (ENTRY_TYPE : --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--labels=[KEY=VALUE,...]] [--platform=PLATFORM]
        [--required-aspects=[type=TYPE]] [--system=SYSTEM]
        [--type-aliases=[TYPE_ALIASES,...]] [--async | --validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Dataplex Entry Type.

EXAMPLES
    To update Entry Type test-entry-type in project test-project at location
    us-central1, with description updated description and display name updated
    display name, run:

        $ gcloud dataplex entry-types update test-entry-type \
            --location=us-central1 --project=test-project \
            --description='updated description' \
            --display-name='updated display name'

POSITIONAL ARGUMENTS
     Entry type resource - Arguments and flags that define the Dataplex entry
     type you want to update. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument entry_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENTRY_TYPE
          ID of the entry type or fully qualified identifier for the entry
          type.

          To set the entry_type attribute:
          + provide the argument entry_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument entry_type on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --description=DESCRIPTION
        Description of the Entry Type.

     --display-name=DISPLAY_NAME
        Display name of the Entry Type.

     --etag=ETAG
        etag value for particular Entry Type.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --platform=PLATFORM
        The platform that Entries of this type belongs to.

     --required-aspects=[type=TYPE]
        Required aspect type for the entry type.

     --system=SYSTEM
        The system that Entries of this type belongs to.

     --type-aliases=[TYPE_ALIASES,...]
        Indicates the class this Entry Type belongs to.

     At most one of these can be specified:

       --async
          Return immediately, without waiting for the operation in progress to
          complete.

       --validate-only
          Validate the update action, but don't actually perform it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex entry-types update
```

### gcloud alpha dataplex entry-types add-iam-policy-binding

```text
NAME
    gcloud alpha dataplex entry-types add-iam-policy-binding - add IAM policy
        binding to a Dataplex Entry Type

SYNOPSIS
    gcloud alpha dataplex entry-types add-iam-policy-binding
        (ENTRY_TYPE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-types create

```text
NAME
    gcloud alpha dataplex entry-types create - create a Dataplex Entry Type

SYNOPSIS
    gcloud alpha dataplex entry-types create (ENTRY_TYPE : --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--platform=PLATFORM]
        [--required-aspects=[type=TYPE]] [--system=SYSTEM]
        [--type-aliases=[TYPE_ALIASES,...]] [--async | --validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-types delete

```text
NAME
    gcloud alpha dataplex entry-types delete - delete a Dataplex Entry Type

SYNOPSIS
    gcloud alpha dataplex entry-types delete (ENTRY_TYPE : --location=LOCATION)
        [--async] [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-types describe

```text
NAME
    gcloud alpha dataplex entry-types describe - describe a Dataplex Entry Type

SYNOPSIS
    gcloud alpha dataplex entry-types describe
        (ENTRY_TYPE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-types get-iam-policy

```text
NAME
    gcloud alpha dataplex entry-types get-iam-policy - retrieve a Dataplex
        Entry Type IAM policy

SYNOPSIS
    gcloud alpha dataplex entry-types get-iam-policy
        (ENTRY_TYPE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-types list

```text
NAME
    gcloud alpha dataplex entry-types list - list Dataplex Entry Types

SYNOPSIS
    gcloud alpha dataplex entry-types list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-types remove-iam-policy-binding

```text
NAME
    gcloud alpha dataplex entry-types remove-iam-policy-binding - remove IAM
        policy binding from a Dataplex Entry Type

SYNOPSIS
    gcloud alpha dataplex entry-types remove-iam-policy-binding
        (ENTRY_TYPE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-types set-iam-policy

```text
NAME
    gcloud alpha dataplex entry-types set-iam-policy - set an IAM policy
        binding for a Dataplex Entry Type as defined in a JSON or YAML file

SYNOPSIS
    gcloud alpha dataplex entry-types set-iam-policy
        (ENTRY_TYPE : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-types update

```text
NAME
    gcloud alpha dataplex entry-types update - update a Dataplex Entry Type

SYNOPSIS
    gcloud alpha dataplex entry-types update (ENTRY_TYPE : --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--labels=[KEY=VALUE,...]] [--platform=PLATFORM]
        [--required-aspects=[type=TYPE]] [--system=SYSTEM]
        [--type-aliases=[TYPE_ALIASES,...]] [--async | --validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/entry-types (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
