---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pam/grants
---

# gcloud pam grants

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pam grants approve

```text
NAME
    gcloud pam grants approve - approve a Privileged Access Manager grant

SYNOPSIS
    gcloud pam grants approve
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Approve a Privileged Access Manager (PAM) grant with a reason.

EXAMPLES
    The following command approves a grant with the full name GRANT_NAME and a
    reason of approval reason:

        $ gcloud pam grants approve GRANT_NAME --reason="approval reason"

POSITIONAL ARGUMENTS
     Grant resource - Name of the grant to approve. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument grant on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements.grants,
        privilegedaccessmanager.folders.locations.entitlements.grants,
        privilegedaccessmanager.organizations.locations.entitlements.grants].

     This must be specified.

       GRANT
          ID of the grant or fully qualified identifier for the grant.

          To set the grant attribute:
          + provide the argument grant on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --entitlement=ENTITLEMENT
          The entitlement id

          To set the entitlement attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --entitlement on the command line.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements.grants].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements.grants].

FLAGS
     --reason=REASON
        Reason for approving the grant.

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

        $ gcloud alpha pam grants approve

        $ gcloud beta pam grants approve
```

### gcloud pam grants create

```text
NAME
    gcloud pam grants create - create a new Privileged Access Manager grant

SYNOPSIS
    gcloud pam grants create --requested-duration=REQUESTED_DURATION
        (--entitlement=ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--additional-email-recipients=[ADDITIONAL_EMAIL_RECIPIENTS,...]]
        [--justification=JUSTIFICATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Privileged Access Manager (PAM) grant under an entitlement.

EXAMPLES
    The following command creates a new grant against the entitlement with the
    full name ENTITLEMENT_NAME, a requested duration of 1 hour 30 minutes, a
    justification of some justification and two additional email recipients
    abc@example.com and xyz@example.com:

        $ gcloud pam grants create --entitlement=ENTITLEMENT_NAME \
            --requested-duration=5400s \
            --justification="some justification" \
            --additional-email-recipients=abc@example.com,xyz@example.com

REQUIRED FLAGS
     --requested-duration=REQUESTED_DURATION
        Duration of the grant being created.

     Entitlement resource - Entitlement the grant is to be created against. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --entitlement on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements,
        privilegedaccessmanager.folders.locations.entitlements,
        privilegedaccessmanager.organizations.locations.entitlements].

     This must be specified.

       --entitlement=ENTITLEMENT
          ID of the entitlement or fully qualified identifier for the
          entitlement.

          To set the entitlement attribute:
          + provide the argument --entitlement on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument --entitlement on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument --entitlement on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument --entitlement on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements].

OPTIONAL FLAGS
     --additional-email-recipients=[ADDITIONAL_EMAIL_RECIPIENTS,...]
        Additional email addresses that are notified for all actions performed
        on the grant.

     --justification=JUSTIFICATION
        Justification for the grant.

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

        $ gcloud alpha pam grants create

        $ gcloud beta pam grants create
```

### gcloud pam grants deny

```text
NAME
    gcloud pam grants deny - deny a Privileged Access Manager grant

SYNOPSIS
    gcloud pam grants deny
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deny a Privileged Access Manager (PAM) grant with a reason.

EXAMPLES
    The following command denies a grant with the full name GRANT_NAME and a
    reason of denial reason:

        $ gcloud pam grants deny GRANT_NAME --reason="denial reason"

POSITIONAL ARGUMENTS
     Grant resource - Name of the grant to deny. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument grant on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements.grants,
        privilegedaccessmanager.folders.locations.entitlements.grants,
        privilegedaccessmanager.organizations.locations.entitlements.grants].

     This must be specified.

       GRANT
          ID of the grant or fully qualified identifier for the grant.

          To set the grant attribute:
          + provide the argument grant on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --entitlement=ENTITLEMENT
          The entitlement id

          To set the entitlement attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --entitlement on the command line.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements.grants].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements.grants].

FLAGS
     --reason=REASON
        Reason for denying the grant.

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

        $ gcloud alpha pam grants deny

        $ gcloud beta pam grants deny
```

### gcloud pam grants describe

```text
NAME
    gcloud pam grants describe - show details of a Privileged Access Manager
        grant

SYNOPSIS
    gcloud pam grants describe
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a Privileged Access Manager (PAM) grant.

EXAMPLES
    The following command describes a grant with the full name GRANT_NAME:

        $ gcloud pam grants describe GRANT_NAME

POSITIONAL ARGUMENTS
     Grant resource - Name of the grant to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument grant on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements.grants,
        privilegedaccessmanager.folders.locations.entitlements.grants,
        privilegedaccessmanager.organizations.locations.entitlements.grants].

     This must be specified.

       GRANT
          ID of the grant or fully qualified identifier for the grant.

          To set the grant attribute:
          + provide the argument grant on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --entitlement=ENTITLEMENT
          The entitlement id

          To set the entitlement attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --entitlement on the command line.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements.grants].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements.grants].

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

        $ gcloud alpha pam grants describe

        $ gcloud beta pam grants describe
```

### gcloud pam grants list

```text
NAME
    gcloud pam grants list - list all Privileged Access Manager grants
        associated with an entitlement

SYNOPSIS
    gcloud pam grants list
        (--entitlement=ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Privileged Access Manager (PAM) grants associated with an
    entitlement.

EXAMPLES
    The following command lists all grants associated with an entitlement with
    the full name ENTITLEMENT_NAME:

        $ gcloud pam grants list --entitlement=ENTITLEMENT_NAME

REQUIRED FLAGS
     Entitlement resource - Entitlement the grants are associated with. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --entitlement on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements,
        privilegedaccessmanager.folders.locations.entitlements,
        privilegedaccessmanager.organizations.locations.entitlements].

     This must be specified.

       --entitlement=ENTITLEMENT
          ID of the entitlement or fully qualified identifier for the
          entitlement.

          To set the entitlement attribute:
          + provide the argument --entitlement on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument --entitlement on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument --entitlement on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument --entitlement on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements].

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

        $ gcloud alpha pam grants list

        $ gcloud beta pam grants list
```

### gcloud pam grants revoke

```text
NAME
    gcloud pam grants revoke - revoke a Privileged Access Manager grant

SYNOPSIS
    gcloud pam grants revoke
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [--reason=REASON] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Revoke a Privileged Access Manager (PAM) grant with a reason.

EXAMPLES
    The following command revokes a grant with the full name GRANT_NAME and a
    reason of revoke reason:

        $ gcloud pam grants revoke GRANT_NAME --reason="revoke reason"

POSITIONAL ARGUMENTS
     Grant resource - Name of the grant to revoke. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument grant on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements.grants,
        privilegedaccessmanager.folders.locations.entitlements.grants,
        privilegedaccessmanager.organizations.locations.entitlements.grants].

     This must be specified.

       GRANT
          ID of the grant or fully qualified identifier for the grant.

          To set the grant attribute:
          + provide the argument grant on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --entitlement=ENTITLEMENT
          The entitlement id

          To set the entitlement attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --entitlement on the command line.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements.grants].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument grant on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements.grants].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --reason=REASON
        Reason for revoking the grant.

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

        $ gcloud alpha pam grants revoke

        $ gcloud beta pam grants revoke
```

### gcloud pam grants search

```text
NAME
    gcloud pam grants search - search for and list all Privileged Access
        Manager grants you have created, have approved, or can approve

SYNOPSIS
    gcloud pam grants search --caller-relationship=CALLER_RELATIONSHIP
        (--entitlement=ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Search for and list all Privileged Access Manager (PAM) grants you have
    created, have approved, or can approve.

EXAMPLES
    The following command searches for and lists all grants you have created
    which are associated with an entitlement with the full name
    ENTITLEMENT_NAME:

        $ gcloud pam grants search --entitlement=ENTITLEMENT_NAME \
            --caller-relationship=had-created

    The following command searches for and lists all grants you have approved
    or denied which are associated with an entitlement with the full name
    ENTITLEMENT_NAME:

        $ gcloud pam grants search --entitlement=ENTITLEMENT_NAME \
            --caller-relationship=had-approved

    The following command searches for and lists all grants you can approve
    which are associated with an entitlement with the full name
    ENTITLEMENT_NAME:

        $ gcloud pam grants search --entitlement=ENTITLEMENT_NAME \
            --caller-relationship=can-approve

REQUIRED FLAGS
     --caller-relationship=CALLER_RELATIONSHIP
        Whether to return grants you have created, have approved, or can
        approve. CALLER_RELATIONSHIP must be one of: can-approve, had-approved,
        had-created.

     Entitlement resource - Entitlement the grants are associated with. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --entitlement on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [privilegedaccessmanager.projects.locations.entitlements,
        privilegedaccessmanager.folders.locations.entitlements,
        privilegedaccessmanager.organizations.locations.entitlements].

     This must be specified.

       --entitlement=ENTITLEMENT
          ID of the entitlement or fully qualified identifier for the
          entitlement.

          To set the entitlement attribute:
          + provide the argument --entitlement on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --folder=FOLDER
          The name of the folder

          To set the folder attribute:
          + provide the argument --entitlement on the command line with a
            fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.folders.locations.entitlements].

       --location=LOCATION
          The resource location

          To set the location attribute:
          + provide the argument --entitlement on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The name of the organization

          To set the organization attribute:
          + provide the argument --entitlement on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [privilegedaccessmanager.organizations.locations.entitlements].

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

        $ gcloud alpha pam grants search

        $ gcloud beta pam grants search
```

### gcloud beta pam grants approve

```text
NAME
    gcloud beta pam grants approve - approve a Privileged Access Manager grant

SYNOPSIS
    gcloud beta pam grants approve
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam grants create

```text
NAME
    gcloud beta pam grants create - create a new Privileged Access Manager
        grant

SYNOPSIS
    gcloud beta pam grants create --requested-duration=REQUESTED_DURATION
        (--entitlement=ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--additional-email-recipients=[ADDITIONAL_EMAIL_RECIPIENTS,...]]
        [--justification=JUSTIFICATION]
        [--scheduled-activation-time=SCHEDULED_ACTIVATION_TIME]
        [--requested-access-from-file=[REQUESTED_ACCESS_FROM_FILE,...]
          | --requested-resources=[REQUESTED_RESOURCES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam grants deny

```text
NAME
    gcloud beta pam grants deny - deny a Privileged Access Manager grant

SYNOPSIS
    gcloud beta pam grants deny
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam grants describe

```text
NAME
    gcloud beta pam grants describe - show details of a Privileged Access
        Manager grant

SYNOPSIS
    gcloud beta pam grants describe
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam grants list

```text
NAME
    gcloud beta pam grants list - list all Privileged Access Manager grants
        associated with an entitlement

SYNOPSIS
    gcloud beta pam grants list
        (--entitlement=ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam grants revoke

```text
NAME
    gcloud beta pam grants revoke - revoke a Privileged Access Manager grant

SYNOPSIS
    gcloud beta pam grants revoke
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam grants search

```text
NAME
    gcloud beta pam grants search - search for and list all Privileged Access
        Manager grants you have created, have approved, or can approve

SYNOPSIS
    gcloud beta pam grants search --caller-relationship=CALLER_RELATIONSHIP
        (--entitlement=ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam grants withdraw

```text
NAME
    gcloud beta pam grants withdraw - withdraw a Privileged Access Manager
        grant

SYNOPSIS
    gcloud beta pam grants withdraw
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam grants approve

```text
NAME
    gcloud alpha pam grants approve - approve a Privileged Access Manager grant

SYNOPSIS
    gcloud alpha pam grants approve
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam grants create

```text
NAME
    gcloud alpha pam grants create - create a new Privileged Access Manager
        grant

SYNOPSIS
    gcloud alpha pam grants create --requested-duration=REQUESTED_DURATION
        (--entitlement=ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--additional-email-recipients=[ADDITIONAL_EMAIL_RECIPIENTS,...]]
        [--justification=JUSTIFICATION]
        [--scheduled-activation-time=SCHEDULED_ACTIVATION_TIME]
        [--requested-access-from-file=[REQUESTED_ACCESS_FROM_FILE,...]
          | --requested-resources=[REQUESTED_RESOURCES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam grants deny

```text
NAME
    gcloud alpha pam grants deny - deny a Privileged Access Manager grant

SYNOPSIS
    gcloud alpha pam grants deny
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam grants describe

```text
NAME
    gcloud alpha pam grants describe - show details of a Privileged Access
        Manager grant

SYNOPSIS
    gcloud alpha pam grants describe
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam grants list

```text
NAME
    gcloud alpha pam grants list - list all Privileged Access Manager grants
        associated with an entitlement

SYNOPSIS
    gcloud alpha pam grants list
        (--entitlement=ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam grants revoke

```text
NAME
    gcloud alpha pam grants revoke - revoke a Privileged Access Manager grant

SYNOPSIS
    gcloud alpha pam grants revoke
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--async] [--reason=REASON] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam grants search

```text
NAME
    gcloud alpha pam grants search - search for and list all Privileged Access
        Manager grants you have created, have approved, or can approve

SYNOPSIS
    gcloud alpha pam grants search --caller-relationship=CALLER_RELATIONSHIP
        (--entitlement=ENTITLEMENT
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam grants withdraw

```text
NAME
    gcloud alpha pam grants withdraw - withdraw a Privileged Access Manager
        grant

SYNOPSIS
    gcloud alpha pam grants withdraw
        (GRANT : --entitlement=ENTITLEMENT
          --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pam/grants (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
