---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pam/entitlements
---

# gcloud pam entitlements

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pam entitlements create

```text
NAME
    gcloud pam entitlements create - create a new Privileged Access Manager
        entitlement

SYNOPSIS
    gcloud pam entitlements create
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        --entitlement-file=PATH_TO_FILE [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Privileged Access Manager (PAM) entitlement in a
    project/folder/organization location.

EXAMPLES
    The following command creates a new entitlement with a name of
    sample-entitlement, in a project named sample-project, in location global,
    and the entitlement configuration stored in a file named
    sample-entitlement.yaml:

        $ gcloud pam entitlements create sample-entitlement \
            --project=sample-project --location=global \
            --entitlement-file=sample-entitlement.yaml

    The following command creates a new entitlement with a name of
    sample-entitlement, in a folder with ID FOLDER_ID, in location global, and
    the entitlement configuration stored in a file named
    sample-entitlement.yaml:

        $ gcloud pam entitlements create sample-entitlement \
            --folder=FOLDER_ID --location=global \
            --entitlement-file=sample-entitlement.yaml

    The following command creates a new entitlement with a name of
    sample-entitlement, in an organization with ID ORGANIZATION_ID, in location
    global, and the entitlement configuration stored in a file named
    sample-entitlement.yaml:

        $ gcloud pam entitlements create sample-entitlement \
            --organization=ORGANIZATION_ID --location=global \
            --entitlement-file=sample-entitlement.yaml

POSITIONAL ARGUMENTS
     Entitlement resource - Name of the entitlement to create. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument entitlement on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements,
        privilegedaccessmanager.folders.locations.entitlements,
        privilegedaccessmanager.organizations.locations.entitlements].

     This must be specified.

       ENTITLEMENT
          ID of the entitlement or fully qualified identifier for the
          entitlement.

          To set the entitlement attribute:
          + provide the argument entitlement on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements].

REQUIRED FLAGS
     --entitlement-file=PATH_TO_FILE
        YAML file containing the configuration of the entitlement. Use a full
        or relative path to a local file containing the value of
        entitlement_file.

OPTIONAL FLAGS
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
    This command uses the privilegedaccessmanager/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/iam/docs/pam-overview

NOTES
    These variants are also available:

        $ gcloud alpha pam entitlements create

        $ gcloud beta pam entitlements create
```

### gcloud pam entitlements delete

```text
NAME
    gcloud pam entitlements delete - delete a Privileged Access Manager
        entitlement

SYNOPSIS
    gcloud pam entitlements delete
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Privileged Access Manager (PAM) entitlement along with all grants
    associated with it.

    This command can fail for the following reasons:
      o There are non-terminal grants under the entitlement.

EXAMPLES
    The following command deletes an entitlement with a name of
    sample-entitlement, in a project named sample-project, and in location
    global:

        $ gcloud pam entitlements delete sample-entitlement \
            --project=sample-project --location=global

    The following command deletes an entitlement with a name of
    sample-entitlement, in a folder with ID FOLDER_ID, and in location global:

        $ gcloud pam entitlements delete sample-entitlement \
            --folder=FOLDER_ID --location=global

    The following command deletes an entitlement with a name of
    sample-entitlement, in an organization with ID ORGANIZATION_ID, and in
    location global:

        $ gcloud pam entitlements delete sample-entitlement \
            --organization=ORGANIZATION_ID --location=global

POSITIONAL ARGUMENTS
     Entitlement resource - Name of the entitlement to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument entitlement on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements,
        privilegedaccessmanager.folders.locations.entitlements,
        privilegedaccessmanager.organizations.locations.entitlements].

     This must be specified.

       ENTITLEMENT
          ID of the entitlement or fully qualified identifier for the
          entitlement.

          To set the entitlement attribute:
          + provide the argument entitlement on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements].

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
    This command uses the privilegedaccessmanager/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/iam/docs/pam-overview

NOTES
    These variants are also available:

        $ gcloud alpha pam entitlements delete

        $ gcloud beta pam entitlements delete
```

### gcloud pam entitlements describe

```text
NAME
    gcloud pam entitlements describe - show details of a Privileged Access
        Manager entitlement

SYNOPSIS
    gcloud pam entitlements describe
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a Privileged Access Manager (PAM) entitlement.

EXAMPLES
    The following command describes an entitlement with a name of
    sample-entitlement, in a project named sample-project, and in location
    global:

        $ gcloud pam entitlements describe sample-entitlement \
            --project=sample-project --location=global

    The following command describes an entitlement with a name of
    sample-entitlement, in a folder with ID FOLDER_ID, and in location global:

        $ gcloud pam entitlements describe sample-entitlement \
            --folder=FOLDER_ID --location=global

    The following command describes an entitlement with a name of
    sample-entitlement, in an organization with ID ORGANIZATION_ID, and in
    location global:

        $ gcloud pam entitlements describe sample-entitlement \
            --organization=ORGANIZATION_ID --location=global

POSITIONAL ARGUMENTS
     Entitlement resource - Name of the entitlement to describe. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument entitlement on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements,
        privilegedaccessmanager.folders.locations.entitlements,
        privilegedaccessmanager.organizations.locations.entitlements].

     This must be specified.

       ENTITLEMENT
          ID of the entitlement or fully qualified identifier for the
          entitlement.

          To set the entitlement attribute:
          + provide the argument entitlement on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the privilegedaccessmanager/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/iam/docs/pam-overview

NOTES
    These variants are also available:

        $ gcloud alpha pam entitlements describe

        $ gcloud beta pam entitlements describe
```

### gcloud pam entitlements export

```text
NAME
    gcloud pam entitlements export - export a Privileged Access Manager
        entitlement into a local YAML file

SYNOPSIS
    gcloud pam entitlements export
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export a Privileged Access Manager (PAM) entitlement into a local YAML
    file.

EXAMPLES
    The following command exports an entitlement with a name of
    sample-entitlement, in a project named sample-project, and in location
    global to a local YAML file named sample-entitlement.yaml:

        $ gcloud pam entitlements export sample-entitlement \
            --project=sample-project --location=global \
            --destination=sample-entitlement.yaml

    The following command exports an entitlement with a name of
    sample-entitlement, in a folder with ID FOLDER_ID, and in location global
    to a local YAML file named sample-entitlement.yaml:

        $ gcloud pam entitlements export sample-entitlement \
            --folder=FOLDER_ID --location=global \
            --destination=sample-entitlement.yaml

    The following command exports an entitlement with a name of
    sample-entitlement, in an organization with ID ORGANIZATION_ID, and in
    location global to a local YAML file named sample-entitlement.yaml:

        $ gcloud pam entitlements export sample-entitlement \
            --organization=ORGANIZATION_ID --location=global \
            --destination=sample-entitlement.yaml

POSITIONAL ARGUMENTS
     Entitlement resource - Name of the entitlement to export. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument entitlement on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements,
        privilegedaccessmanager.folders.locations.entitlements,
        privilegedaccessmanager.organizations.locations.entitlements].

     This must be specified.

       ENTITLEMENT
          ID of the entitlement or fully qualified identifier for the
          entitlement.

          To set the entitlement attribute:
          + provide the argument entitlement on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements].

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported. The
        exported data will not contain any output-only fields. Alternatively,
        you may omit this flag to write to standard output. For a schema
        describing the export/import format, see
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the privilegedaccessmanager/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/iam/docs/pam-overview

NOTES
    These variants are also available:

        $ gcloud alpha pam entitlements export

        $ gcloud beta pam entitlements export
```

### gcloud pam entitlements list

```text
NAME
    gcloud pam entitlements list - list all Privileged Access Manager
        entitlements under a parent

SYNOPSIS
    gcloud pam entitlements list
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Privileged Access Manager (PAM) entitlements in a
    project/folder/organization location.

EXAMPLES
    The following command lists all entitlements in a project named
    sample-project and in location global:

        $ gcloud pam entitlements list --project=sample-project \
            --location=global

    The following command lists all entitlements in a folder with ID FOLDER_ID
    and in location global:

        $ gcloud pam entitlements list --folder=FOLDER_ID --location=global

    The following command lists all entitlements in an organization with ID
    ORGANIZATION_ID and in location global:

        $ gcloud pam entitlements list --organization=ORGANIZATION_ID \
            --location=global

REQUIRED FLAGS
     Location resource - Location of the entitlements. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [privilegedaccessmanager.projects.locations,
        privilegedaccessmanager.folders.locations,
        privilegedaccessmanager.organizations.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations].

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations].

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
    This command uses the privilegedaccessmanager/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/iam/docs/pam-overview

NOTES
    These variants are also available:

        $ gcloud alpha pam entitlements list

        $ gcloud beta pam entitlements list
```

### gcloud pam entitlements search

```text
NAME
    gcloud pam entitlements search - search and list all Privileged Access
        Manager entitlements in a parent for which you are a requester/approver

SYNOPSIS
    gcloud pam entitlements search --caller-access-type=CALLER_ACCESS_TYPE
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Search and list all Privileged Access Manager (PAM) entitlements in a
    project/folder/organization location for which you are a
    requester/approver.

EXAMPLES
    The following command searches for and lists all entitlements for which you
    are a requester, in a project named sample-project, and in location global:

        $ gcloud pam entitlements search --project=sample-project \
            --location=global --caller-access-type=grant-requester

    The following command searches for and lists all entitlements for which you
    are an approver, in a project named sample-project, and in location global:

        $ gcloud pam entitlements search --project=sample-project \
            --location=global --caller-access-type=grant-approver

    The following command searches for and lists all entitlements for which you
    are a requester, in a folder with ID FOLDER_ID, and in location global:

        $ gcloud pam entitlements search --folder=FOLDER_ID \
            --location=global --caller-access-type=grant-requester

    The following command searches for and lists all entitlements for which you
    are an approver, in a folder with ID FOLDER_ID, and in location global:

        $ gcloud pam entitlements search --folder=FOLDER_ID \
            --location=global --caller-access-type=grant-approver

    The following command searches for and lists all entitlements for which you
    are a requester, in an organization with ID ORGANIZATION_ID, and in
    location global:

        $ gcloud pam entitlements search --organization=ORGANIZATION_ID \
            --location=global --caller-access-type=grant-requester

    The following command searches for and lists all entitlements for which you
    are an approver, in an organization with ID ORGANIZATION_ID, and in
    location global:

        $ gcloud pam entitlements search --organization=ORGANIZATION_ID \
            --location=global --caller-access-type=grant-approver

REQUIRED FLAGS
     --caller-access-type=CALLER_ACCESS_TYPE
        Search for entitlements based on whether you are a requester or
        approver. CALLER_ACCESS_TYPE must be one of: grant-approver,
        grant-requester.

     Location resource - Location of the entitlements. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [privilegedaccessmanager.projects.locations,
        privilegedaccessmanager.folders.locations,
        privilegedaccessmanager.organizations.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations].

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations].

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
    This command uses the privilegedaccessmanager/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/iam/docs/pam-overview

NOTES
    These variants are also available:

        $ gcloud alpha pam entitlements search

        $ gcloud beta pam entitlements search
```

### gcloud pam entitlements update

```text
NAME
    gcloud pam entitlements update - update an existing Privileged Access
        Manager entitlement

SYNOPSIS
    gcloud pam entitlements update
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        --entitlement-file=PATH_TO_FILE [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing Privileged Access Manager (PAM) entitlement.

EXAMPLES
    The following command updates an entitlement with a name of
    sample-entitlement, in a project named sample-project, in location global,
    and the new entitlement configuration stored in a file named
    sample-entitlement.yaml:

        $ gcloud pam entitlements update sample-entitlement \
            --project=sample-project --location=global \
            --entitlement-file=sample-entitlement.yaml

    The following command updates an entitlement with a name of
    sample-entitlement, in a folder with ID FOLDER_ID, in location global, and
    the new entitlement configuration stored in a file named
    sample-entitlement.yaml:

        $ gcloud pam entitlements update sample-entitlement \
            --folder=FOLDER_ID --location=global \
            --entitlement-file=sample-entitlement.yaml

    The following command updates an entitlement with a name of
    sample-entitlement, in an organization with ID ORGANIZATION_ID, in location
    global, and the new entitlement configuration stored in a file named
    sample-entitlement.yaml:

        $ gcloud pam entitlements update sample-entitlement \
            --organization=ORGANIZATION_ID --location=global \
            --entitlement-file=sample-entitlement.yaml

POSITIONAL ARGUMENTS
     Entitlement resource - Name of the entitlement to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument entitlement on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements,
        privilegedaccessmanager.folders.locations.entitlements,
        privilegedaccessmanager.organizations.locations.entitlements].

     This must be specified.

       ENTITLEMENT
          ID of the entitlement or fully qualified identifier for the
          entitlement.

          To set the entitlement attribute:
          + provide the argument entitlement on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument entitlement on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements].

REQUIRED FLAGS
     --entitlement-file=PATH_TO_FILE
        YAML file containing the new configuration of the entitlement. Use a
        full or relative path to a local file containing the value of
        entitlement_file.

OPTIONAL FLAGS
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
    This command uses the privilegedaccessmanager/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/iam/docs/pam-overview

NOTES
    These variants are also available:

        $ gcloud alpha pam entitlements update

        $ gcloud beta pam entitlements update
```

### gcloud beta pam entitlements create

```text
NAME
    gcloud beta pam entitlements create - create a new Privileged Access
        Manager entitlement

SYNOPSIS
    gcloud beta pam entitlements create
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        --entitlement-file=PATH_TO_FILE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam entitlements delete

```text
NAME
    gcloud beta pam entitlements delete - delete a Privileged Access Manager
        entitlement

SYNOPSIS
    gcloud beta pam entitlements delete
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam entitlements describe

```text
NAME
    gcloud beta pam entitlements describe - show details of a Privileged Access
        Manager entitlement

SYNOPSIS
    gcloud beta pam entitlements describe
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam entitlements export

```text
NAME
    gcloud beta pam entitlements export - export a Privileged Access Manager
        entitlement into a local YAML file

SYNOPSIS
    gcloud beta pam entitlements export
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam entitlements list

```text
NAME
    gcloud beta pam entitlements list - list all Privileged Access Manager
        entitlements under a parent

SYNOPSIS
    gcloud beta pam entitlements list
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam entitlements search

```text
NAME
    gcloud beta pam entitlements search - search and list all Privileged Access
        Manager entitlements in a parent for which you are a requester/approver

SYNOPSIS
    gcloud beta pam entitlements search --caller-access-type=CALLER_ACCESS_TYPE
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam entitlements update

```text
NAME
    gcloud beta pam entitlements update - update an existing Privileged Access
        Manager entitlement

SYNOPSIS
    gcloud beta pam entitlements update
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        --entitlement-file=PATH_TO_FILE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam entitlements create

```text
NAME
    gcloud alpha pam entitlements create - create a new Privileged Access
        Manager entitlement

SYNOPSIS
    gcloud alpha pam entitlements create
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        --entitlement-file=PATH_TO_FILE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam entitlements delete

```text
NAME
    gcloud alpha pam entitlements delete - delete a Privileged Access Manager
        entitlement

SYNOPSIS
    gcloud alpha pam entitlements delete
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam entitlements describe

```text
NAME
    gcloud alpha pam entitlements describe - show details of a Privileged
        Access Manager entitlement

SYNOPSIS
    gcloud alpha pam entitlements describe
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam entitlements export

```text
NAME
    gcloud alpha pam entitlements export - export a Privileged Access Manager
        entitlement into a local YAML file

SYNOPSIS
    gcloud alpha pam entitlements export
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam entitlements list

```text
NAME
    gcloud alpha pam entitlements list - list all Privileged Access Manager
        entitlements under a parent

SYNOPSIS
    gcloud alpha pam entitlements list
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam entitlements search

```text
NAME
    gcloud alpha pam entitlements search - search and list all Privileged
        Access Manager entitlements in a parent for which you are a
        requester/approver

SYNOPSIS
    gcloud alpha pam entitlements search
        --caller-access-type=CALLER_ACCESS_TYPE
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam entitlements update

```text
NAME
    gcloud alpha pam entitlements update - update an existing Privileged Access
        Manager entitlement

SYNOPSIS
    gcloud alpha pam entitlements update
        (ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        --entitlement-file=PATH_TO_FILE [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pam/entitlements (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
