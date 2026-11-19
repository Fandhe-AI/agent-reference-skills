---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/aspect-types
---

# gcloud dataplex aspect-types

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex aspect-types add-iam-policy-binding

```text
NAME
    gcloud dataplex aspect-types add-iam-policy-binding - add IAM policy
        binding to a Dataplex Aspect Type

SYNOPSIS
    gcloud dataplex aspect-types add-iam-policy-binding
        (ASPECT_TYPE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add IAM policy binding to a Dataplex Aspect Type.

EXAMPLES
    To add an IAM policy binding for the role of roles/dataplex.viewer for the
    user test-user@gmail.com to Aspect Type test-aspect-type in project
    test-project and in location us-central1, run:

        $ gcloud dataplex aspect-types add-iam-policy-binding \
            test-aspect-type --project=test-project --location=us-central1 \
            --role=roles/dataplex.viewer --member=user:foo@gmail.com

    See https://cloud.google.com/dataplex/docs/iam-roles for details of policy
    role and member types.

POSITIONAL ARGUMENTS
     Aspect type resource - Arguments and flags that define the Dataplex aspect
     type you want to add IAM policy binding to. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument aspect_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ASPECT_TYPE
          ID of the aspect type or fully qualified identifier for the aspect
          type.

          To set the aspect_type attribute:
          + provide the argument aspect_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument aspect_type on the command line with a fully
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

        $ gcloud alpha dataplex aspect-types add-iam-policy-binding
```

### gcloud dataplex aspect-types create

```text
NAME
    gcloud dataplex aspect-types create - create a Dataplex Aspect Type

SYNOPSIS
    gcloud dataplex aspect-types create (ASPECT_TYPE : --location=LOCATION)
        --metadata-template-file-name=METADATA_TEMPLATE_FILE_NAME
        [--data-classification=DATA_CLASSIFICATION] [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--labels=[KEY=VALUE,...]]
        [--async | --validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Aspect Type is a template for creating Aspects.

EXAMPLES
    To create Aspect Type test-aspect-type in project test-dataplex at location
    us-central1, with description test description, displayName test display
    name and metadataTemplateFileName file.json, run:

        $ gcloud dataplex aspect-types create test-aspect-type \
            --location=us-central1 --project=test-project \
            --description='test description' \
            --display-name='test display name' \
            --metadata-template-file-name='file.json'

POSITIONAL ARGUMENTS
     Aspect type resource - Arguments and flags that define the Dataplex aspect
     type you want to create. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument aspect_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ASPECT_TYPE
          ID of the aspect type or fully qualified identifier for the aspect
          type.

          To set the aspect_type attribute:
          + provide the argument aspect_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument aspect_type on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

REQUIRED FLAGS
     --metadata-template-file-name=METADATA_TEMPLATE_FILE_NAME
        The name of the JSON or YAML file to define Metadata Template.

OPTIONAL FLAGS
     --data-classification=DATA_CLASSIFICATION
        Data classification of the Aspect Type. DATA_CLASSIFICATION must be
        (only one value is supported): METADATA_AND_DATA.

     --description=DESCRIPTION
        Description of the Aspect Type.

     --display-name=DISPLAY_NAME
        Display name of the Aspect Type.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

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

        $ gcloud alpha dataplex aspect-types create
```

### gcloud dataplex aspect-types delete

```text
NAME
    gcloud dataplex aspect-types delete - delete a Dataplex Aspect Type

SYNOPSIS
    gcloud dataplex aspect-types delete (ASPECT_TYPE : --location=LOCATION)
        [--async] [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Dataplex Aspect Type.

EXAMPLES
    To delete Aspect Type test-aspect-type in project test-project and in
    location us-central1, run:

        $ gcloud dataplex aspect-types delete test-aspect-type \
          --location=us-central1 --project=test-project

POSITIONAL ARGUMENTS
     Aspect type resource - Arguments and flags that define the Dataplex Aspect
     Type you want to delete. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument aspect_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ASPECT_TYPE
          ID of the aspect type or fully qualified identifier for the aspect
          type.

          To set the aspect_type attribute:
          + provide the argument aspect_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument aspect_type on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        etag for the Aspect Type you want to delete.

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

        $ gcloud alpha dataplex aspect-types delete
```

### gcloud dataplex aspect-types describe

```text
NAME
    gcloud dataplex aspect-types describe - describe a Dataplex Aspect Type

SYNOPSIS
    gcloud dataplex aspect-types describe (ASPECT_TYPE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays all details of an Aspect Type given a valid Aspect Type ID.

EXAMPLES
    To describe a Dataplex Aspect Type test-aspect-type in location us-central1
    and in project test-project, run:

        $ gcloud dataplex aspect-types describe test-aspect-type \
           --location=us-central1 --project=test-project

POSITIONAL ARGUMENTS
     Aspect type resource - Arguments and flags that define the Dataplex Aspect
     Type you want to retrieve. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument aspect_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ASPECT_TYPE
          ID of the aspect type or fully qualified identifier for the aspect
          type.

          To set the aspect_type attribute:
          + provide the argument aspect_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument aspect_type on the command line with a fully
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

        $ gcloud alpha dataplex aspect-types describe
```

### gcloud dataplex aspect-types get-iam-policy

```text
NAME
    gcloud dataplex aspect-types get-iam-policy - retrieve a Dataplex Aspect
        Type IAM policy

SYNOPSIS
    gcloud dataplex aspect-types get-iam-policy
        (ASPECT_TYPE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays the IAM policy associated with a Dataplex Aspect Type resource. If
    formatted as JSON, the output can be edited and used as a policy file for
    set-iam-policy. The output includes an "etag" field identifying the version
    emitted and allowing detection of concurrent policy updates.

EXAMPLES
    To get the IAM policy of a Dataplex Aspect Type test-aspect-type in project
    test-project under location us-central1, run:

        $ gcloud dataplex aspect-types get-iam-policy test-aspect-type \
            --project=test-project --location=us-central1

POSITIONAL ARGUMENTS
     Aspect type resource - Arguments and flags that define the Dataplex Aspect
     Type IAM policy you want to retrieve. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument aspect_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ASPECT_TYPE
          ID of the aspect type or fully qualified identifier for the aspect
          type.

          To set the aspect_type attribute:
          + provide the argument aspect_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument aspect_type on the command line with a fully
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

        $ gcloud alpha dataplex aspect-types get-iam-policy
```

### gcloud dataplex aspect-types list

```text
NAME
    gcloud dataplex aspect-types list - list Dataplex Aspect Types

SYNOPSIS
    gcloud dataplex aspect-types list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Dataplex Aspect Types based on project and location.

    gcloud dataplex aspect-types list --project={project_id}
    --location={location}

EXAMPLES
    To list Aspect Types in project test-dataplex at location us-central1

        $ gcloud dataplex aspect-types list --location=us-central1 \
          --project=test-dataplex

FLAGS
     Location resource - Location to list Aspect Types in. This represents a
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

        $ gcloud alpha dataplex aspect-types list
```

### gcloud dataplex aspect-types remove-iam-policy-binding

```text
NAME
    gcloud dataplex aspect-types remove-iam-policy-binding - remove IAM policy
        binding from a Dataplex Aspect Type

SYNOPSIS
    gcloud dataplex aspect-types remove-iam-policy-binding
        (ASPECT_TYPE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove IAM policy binding from a Dataplex Aspect Type.

EXAMPLES
    To remove an IAM policy binding for the role roles/dataplex.viewer for the
    user testuser@gmail.com from an aspect type test-aspect-type in project
    test-project and in location us-central1, run:

        $ gcloud dataplex aspect-types remove-iam-policy-binding \
            test-aspect-type --project=test-project --location=us-central1 \
            --role=roles/dataplex.viewer --member=user:testuser@gmail.com

    See https://cloud.google.com/dataplex/docs/iam-roles for details of policy
    role and member types.

POSITIONAL ARGUMENTS
     Aspect type resource - Arguments and flags that define the Dataplex aspect
     type you want to remove IAM policy binding from The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument aspect_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ASPECT_TYPE
          ID of the aspect type or fully qualified identifier for the aspect
          type.

          To set the aspect_type attribute:
          + provide the argument aspect_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument aspect_type on the command line with a fully
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

        $ gcloud alpha dataplex aspect-types remove-iam-policy-binding
```

### gcloud dataplex aspect-types set-iam-policy

```text
NAME
    gcloud dataplex aspect-types set-iam-policy - set an IAM policy binding for
        a Dataplex Aspect Type as defined in a JSON or YAML file

SYNOPSIS
    gcloud dataplex aspect-types set-iam-policy
        (ASPECT_TYPE : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    policy.json and set it for the Dataplex Aspect Type test-aspect-type in
    project test-project and in location us-central1:

        $ gcloud dataplex aspect-types set-iam-policy test-aspect-type \
            --project=test-project --location=us-central1 policy.json

        where policy.json is the relative path to the JSON file.

POSITIONAL ARGUMENTS
     Aspect type resource - Arguments and flags that define the Dataplex aspect
     type you want to set IAM policy to. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument aspect_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ASPECT_TYPE
          ID of the aspect type or fully qualified identifier for the aspect
          type.

          To set the aspect_type attribute:
          + provide the argument aspect_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument aspect_type on the command line with a fully
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

        $ gcloud alpha dataplex aspect-types set-iam-policy
```

### gcloud dataplex aspect-types update

```text
NAME
    gcloud dataplex aspect-types update - update a Dataplex Aspect Type

SYNOPSIS
    gcloud dataplex aspect-types update (ASPECT_TYPE : --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--labels=[KEY=VALUE,...]]
        [--metadata-template-file-name=METADATA_TEMPLATE_FILE_NAME]
        [--async | --validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Dataplex Aspect Type.

EXAMPLES
    To update Aspect Type test-aspect-type in project test-project at location
    us-central1, with description updated description and display name updated
    display name, run:

        $ gcloud dataplex aspect-types update test-aspect-type \
            --location=us-central1 --project=test-project \
            --description='updated description' \
            --display-name='updated display name'

POSITIONAL ARGUMENTS
     Aspect type resource - Arguments and flags that define the Dataplex aspect
     type you want to update. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument aspect_type on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ASPECT_TYPE
          ID of the aspect type or fully qualified identifier for the aspect
          type.

          To set the aspect_type attribute:
          + provide the argument aspect_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument aspect_type on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --description=DESCRIPTION
        Description of the Aspect Type.

     --display-name=DISPLAY_NAME
        Display name of the Aspect Type.

     --etag=ETAG
        etag value for particular Aspect Type.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --metadata-template-file-name=METADATA_TEMPLATE_FILE_NAME
        The name of the JSON or YAML file to define Metadata Template.

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

        $ gcloud alpha dataplex aspect-types update
```

### gcloud alpha dataplex aspect-types add-iam-policy-binding

```text
NAME
    gcloud alpha dataplex aspect-types add-iam-policy-binding - add IAM policy
        binding to a Dataplex Aspect Type

SYNOPSIS
    gcloud alpha dataplex aspect-types add-iam-policy-binding
        (ASPECT_TYPE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex aspect-types create

```text
NAME
    gcloud alpha dataplex aspect-types create - create a Dataplex Aspect Type

SYNOPSIS
    gcloud alpha dataplex aspect-types create
        (ASPECT_TYPE : --location=LOCATION)
        --metadata-template-file-name=METADATA_TEMPLATE_FILE_NAME
        [--data-classification=DATA_CLASSIFICATION] [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--labels=[KEY=VALUE,...]]
        [--async | --validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex aspect-types delete

```text
NAME
    gcloud alpha dataplex aspect-types delete - delete a Dataplex Aspect Type

SYNOPSIS
    gcloud alpha dataplex aspect-types delete
        (ASPECT_TYPE : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex aspect-types describe

```text
NAME
    gcloud alpha dataplex aspect-types describe - describe a Dataplex Aspect
        Type

SYNOPSIS
    gcloud alpha dataplex aspect-types describe
        (ASPECT_TYPE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex aspect-types get-iam-policy

```text
NAME
    gcloud alpha dataplex aspect-types get-iam-policy - retrieve a Dataplex
        Aspect Type IAM policy

SYNOPSIS
    gcloud alpha dataplex aspect-types get-iam-policy
        (ASPECT_TYPE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex aspect-types list

```text
NAME
    gcloud alpha dataplex aspect-types list - list Dataplex Aspect Types

SYNOPSIS
    gcloud alpha dataplex aspect-types list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex aspect-types remove-iam-policy-binding

```text
NAME
    gcloud alpha dataplex aspect-types remove-iam-policy-binding - remove IAM
        policy binding from a Dataplex Aspect Type

SYNOPSIS
    gcloud alpha dataplex aspect-types remove-iam-policy-binding
        (ASPECT_TYPE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex aspect-types set-iam-policy

```text
NAME
    gcloud alpha dataplex aspect-types set-iam-policy - set an IAM policy
        binding for a Dataplex Aspect Type as defined in a JSON or YAML file

SYNOPSIS
    gcloud alpha dataplex aspect-types set-iam-policy
        (ASPECT_TYPE : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex aspect-types update

```text
NAME
    gcloud alpha dataplex aspect-types update - update a Dataplex Aspect Type

SYNOPSIS
    gcloud alpha dataplex aspect-types update
        (ASPECT_TYPE : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--etag=ETAG] [--labels=[KEY=VALUE,...]]
        [--metadata-template-file-name=METADATA_TEMPLATE_FILE_NAME]
        [--async | --validate-only] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/aspect-types (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
