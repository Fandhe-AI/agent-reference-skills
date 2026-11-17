---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/secure-access-connect
---

# gcloud network-security secure-access-connect

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security secure-access-connect attachments create

```text
NAME
    gcloud network-security secure-access-connect attachments create - create a
        SAC attachment

SYNOPSIS
    gcloud network-security secure-access-connect attachments create
        (SAC_ATTACHMENT : --location=LOCATION) --gateway=GATEWAY --realm=REALM
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new attachment linked to an existing SAC realm and NCC gateway.

EXAMPLES
    The following command creates a new attachment named my-attachment in the
    location us-central1.

        $ gcloud network-security secure-access-connect attachments create \
            my-attachment --location=us-central1 --realm=my-realm \
            --gateway=my-gateway

    The attachment adds security inspection from my-realm to traffic within
    my-gateway.

POSITIONAL ARGUMENTS
     SAC attachment resource - Attachment to be created. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument sac_attachment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SAC_ATTACHMENT
          ID of the SAC attachment or fully qualified identifier for the SAC
          attachment.

          To set the sac_attachment attribute:
          + provide the argument sac_attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument sac_attachment on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --gateway=GATEWAY
        NCC gateway whose traffic will be inspected by this attachment.

     --realm=REALM
        SAC realm to which this attachment belongs.

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
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud beta network-security secure-access-connect attachments \
            create
```

### gcloud network-security secure-access-connect attachments delete

```text
NAME
    gcloud network-security secure-access-connect attachments delete - delete a
        SAC attachment

SYNOPSIS
    gcloud network-security secure-access-connect attachments delete
        (SAC_ATTACHMENT : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified SAC attachment.

EXAMPLES
    To delete an attachment named my-attachment in the location us-central1,
    run:

        $ gcloud network-security secure-access-connect attachments delete \
            my-attachment --location=us-central1

POSITIONAL ARGUMENTS
     SAC attachment resource - Attachment to be deleted. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument sac_attachment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SAC_ATTACHMENT
          ID of the SAC attachment or fully qualified identifier for the SAC
          attachment.

          To set the sac_attachment attribute:
          + provide the argument sac_attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument sac_attachment on the command line with a
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
    This variant is also available:

        $ gcloud beta network-security secure-access-connect attachments \
            delete
```

### gcloud network-security secure-access-connect attachments describe

```text
NAME
    gcloud network-security secure-access-connect attachments describe -
        describe a SAC attachment

SYNOPSIS
    gcloud network-security secure-access-connect attachments describe
        (SAC_ATTACHMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details for the specified SAC attachment.

EXAMPLES
    To describe an attachment named my-attachment in the location us-central1,
    run:

        $ gcloud network-security secure-access-connect attachments \
            describe my-attachment --location=us-central1

POSITIONAL ARGUMENTS
     SAC attachment resource - Attachment to be described. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument sac_attachment on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SAC_ATTACHMENT
          ID of the SAC attachment or fully qualified identifier for the SAC
          attachment.

          To set the sac_attachment attribute:
          + provide the argument sac_attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument sac_attachment on the command line with a
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
    This variant is also available:

        $ gcloud beta network-security secure-access-connect attachments \
            describe
```

### gcloud network-security secure-access-connect attachments list

```text
NAME
    gcloud network-security secure-access-connect attachments list - list SAC
        attachments

SYNOPSIS
    gcloud network-security secure-access-connect attachments list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all SAC attachments within a given location.

EXAMPLES
    To list all attachments in the location us-central1, run:

        $ gcloud network-security secure-access-connect attachments list \
            --location=us-central1

REQUIRED FLAGS
     Location resource - Region of the attachments to display. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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
    This variant is also available:

        $ gcloud beta network-security secure-access-connect attachments list
```

### gcloud network-security secure-access-connect realms create

```text
NAME
    gcloud network-security secure-access-connect realms create - create a SAC
        realm

SYNOPSIS
    gcloud network-security secure-access-connect realms create
        (SAC_REALM : --location=LOCATION) --security-service=SECURITY_SERVICE
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new realm supported by the specified security service.

EXAMPLES
    To create a realm named my-realm using Prisma Access, run:

        $ gcloud network-security secure-access-connect realms create \
            my-realm --security-service=prisma-access

POSITIONAL ARGUMENTS
     SAC realm resource - Realm to be created. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument sac_realm on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SAC_REALM
          ID of the SAC realm or fully qualified identifier for the SAC realm.

          To set the sac_realm attribute:
          + provide the argument sac_realm on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument sac_realm on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + location is global by default.

REQUIRED FLAGS
     --security-service=SECURITY_SERVICE
        Security service supporting this realm. SECURITY_SERVICE must be (only
        one value is supported): prisma-access.

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
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud beta network-security secure-access-connect realms create
```

### gcloud network-security secure-access-connect realms delete

```text
NAME
    gcloud network-security secure-access-connect realms delete - delete a SAC
        realm

SYNOPSIS
    gcloud network-security secure-access-connect realms delete
        (SAC_REALM : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified SAC realm.

EXAMPLES
    To delete a realm named my-realm, run:

        $ gcloud network-security secure-access-connect realms delete \
            my-realm

POSITIONAL ARGUMENTS
     SAC realm resource - Realm to be deleted. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument sac_realm on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SAC_REALM
          ID of the SAC realm or fully qualified identifier for the SAC realm.

          To set the sac_realm attribute:
          + provide the argument sac_realm on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument sac_realm on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + location is global by default.

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
    This variant is also available:

        $ gcloud beta network-security secure-access-connect realms delete
```

### gcloud network-security secure-access-connect realms describe

```text
NAME
    gcloud network-security secure-access-connect realms describe - describe a
        SAC realm

SYNOPSIS
    gcloud network-security secure-access-connect realms describe
        (SAC_REALM : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details for the specified SAC realm.

EXAMPLES
    To describe a realm named my-realm, run:

        $ gcloud network-security secure-access-connect realms describe \
            my-realm

POSITIONAL ARGUMENTS
     SAC realm resource - Realm to be described. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument sac_realm on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SAC_REALM
          ID of the SAC realm or fully qualified identifier for the SAC realm.

          To set the sac_realm attribute:
          + provide the argument sac_realm on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument sac_realm on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + location is global by default.

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
    This variant is also available:

        $ gcloud beta network-security secure-access-connect realms describe
```

### gcloud network-security secure-access-connect realms list

```text
NAME
    gcloud network-security secure-access-connect realms list - list SAC realms

SYNOPSIS
    gcloud network-security secure-access-connect realms list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all SAC realms within a given project.

EXAMPLES
    To list all realms in the current project, run:

        $ gcloud network-security secure-access-connect realms list

FLAGS
     Location resource - Project of the realms to display. The location is
     global by default and should not be set. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * location is global by default with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * location is global by default.

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
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    This variant is also available:

        $ gcloud beta network-security secure-access-connect realms list
```

### gcloud beta network-security secure-access-connect attachments create

```text
NAME
    gcloud beta network-security secure-access-connect attachments create -
        create a SAC attachment

SYNOPSIS
    gcloud beta network-security secure-access-connect attachments create
        (SAC_ATTACHMENT : --location=LOCATION) --gateway=GATEWAY --realm=REALM
        [--async] [--country=COUNTRY]
        [--symantec-location-name=SYMANTEC_LOCATION_NAME]
        [--symantec-site=SYMANTEC_SITE] [--time-zone=TIME_ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security secure-access-connect attachments delete

```text
NAME
    gcloud beta network-security secure-access-connect attachments delete -
        delete a SAC attachment

SYNOPSIS
    gcloud beta network-security secure-access-connect attachments delete
        (SAC_ATTACHMENT : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security secure-access-connect attachments describe

```text
NAME
    gcloud beta network-security secure-access-connect attachments describe -
        describe a SAC attachment

SYNOPSIS
    gcloud beta network-security secure-access-connect attachments describe
        (SAC_ATTACHMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security secure-access-connect attachments list

```text
NAME
    gcloud beta network-security secure-access-connect attachments list - list
        SAC attachments

SYNOPSIS
    gcloud beta network-security secure-access-connect attachments list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security secure-access-connect realms create

```text
NAME
    gcloud beta network-security secure-access-connect realms create - create a
        SAC realm

SYNOPSIS
    gcloud beta network-security secure-access-connect realms create
        (SAC_REALM : --location=LOCATION) --security-service=SECURITY_SERVICE
        [--async] [--symantec-secret=SYMANTEC_SECRET] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security secure-access-connect realms delete

```text
NAME
    gcloud beta network-security secure-access-connect realms delete - delete a
        SAC realm

SYNOPSIS
    gcloud beta network-security secure-access-connect realms delete
        (SAC_REALM : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security secure-access-connect realms describe

```text
NAME
    gcloud beta network-security secure-access-connect realms describe -
        describe a SAC realm

SYNOPSIS
    gcloud beta network-security secure-access-connect realms describe
        (SAC_REALM : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security secure-access-connect realms list

```text
NAME
    gcloud beta network-security secure-access-connect realms list - list SAC
        realms

SYNOPSIS
    gcloud beta network-security secure-access-connect realms list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/secure-access-connect (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
