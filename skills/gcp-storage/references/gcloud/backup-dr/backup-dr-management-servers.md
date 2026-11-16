---
source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/management-servers
---

# gcloud backup-dr management-servers

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud backup-dr management-servers create

```text
NAME
    gcloud backup-dr management-servers create - create a new management server
        in the project

SYNOPSIS
    gcloud backup-dr management-servers create
        (MANAGEMENT_SERVER : --location=LOCATION) [--async] [--network=NETWORK]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new management server in the project. A management server is
    required to access the management console. It can only be created in
    locations where Backup and DR is available. Resources in other locations
    can be backed up.

EXAMPLES
    To create a new management server sample-ms in project sample-project and
    location us-central1, run:

        $ gcloud backup-dr management-servers create sample-ms \
            --project=sample-project --location=us-central1

POSITIONAL ARGUMENTS
     Management Server resource - Name of the management server to be created.
     Once the management server is deployed, this name can't be changed. The
     name must be unique for a project and location. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument management_server on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MANAGEMENT_SERVER
          ID of the Management Server or fully qualified identifier for the
          Management Server.

          To set the name attribute:
          + provide the argument management_server on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Management Server.

          To set the location attribute:
          + provide the argument management_server on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --network=NETWORK
        (DEPRECATED) Name of an existing VPC network with private service
        access configured in the format -
        projects/<project>/global/networks/<network>. This VPC network allows
        the management console to communicate with all backup/recovery
        appliances and requires a minimum IP range of /23. This value cannot be
        changed after you deploy the management server. If you don't have
        private service access, configure one. [Learn more]
        (https://cloud.google.com/vpc/docs/configure-private-services-access)

        Flag --network is deprecated.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Creates a new management server

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr management-servers create

        $ gcloud beta backup-dr management-servers create
```

### gcloud backup-dr management-servers delete

```text
NAME
    gcloud backup-dr management-servers delete - delete the specified
        Management Server

SYNOPSIS
    gcloud backup-dr management-servers delete
        (MANAGEMENT_SERVER : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified Management Server.

EXAMPLES
    To delete a management server sample-ms in project sample-project and
    location us-central1 , run:

        $ gcloud backup-dr management-servers delete sample-ms \
            --project=sample-project --location=us-central1

POSITIONAL ARGUMENTS
     Management Server resource - Name of the management server to delete.
     Before you delete, take a look at the prerequisites here
     (https://cloud.google.com/backup-disaster-recovery/docs/configuration/decommission).
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument management_server on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MANAGEMENT_SERVER
          ID of the Management Server or fully qualified identifier for the
          Management Server.

          To set the name attribute:
          + provide the argument management_server on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Management Server.

          To set the location attribute:
          + provide the argument management_server on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

BRIEF
    Deletes a specific management server

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr management-servers delete

        $ gcloud beta backup-dr management-servers delete
```

### gcloud backup-dr management-servers describe

```text
NAME
    gcloud backup-dr management-servers describe - show details of the
        management server

SYNOPSIS
    gcloud backup-dr management-servers describe
        (MANAGEMENT_SERVER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show all configuration data associated with the specified management
    server.

EXAMPLES
    To view details for management server 'MANAGEMENT_SERVER', run:

        $ gcloud backup-dr management-servers describe MANAGEMENT_SERVER

POSITIONAL ARGUMENTS
     Management server resource - Name of the management server to describe.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument management_server on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MANAGEMENT_SERVER
          ID of the management_server or fully qualified identifier for the
          management_server.

          To set the management_server attribute:
          + provide the argument management_server on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID of the resource.

          To set the location attribute:
          + provide the argument management_server on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr management-servers describe

        $ gcloud beta backup-dr management-servers describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud backup-dr management-servers describe MANAGEMENT_SERVER \
    --location=us-central1
```

### gcloud backup-dr management-servers list

```text
NAME
    gcloud backup-dr management-servers list - list management servers in the
        project

SYNOPSIS
    gcloud backup-dr management-servers list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List management servers in the project. Currently, a project can have only
    one management server.

EXAMPLES
    To list management servers for all locations, run:

        $ gcloud backup-dr management-servers list

    To list management servers in a location my-location, run:

        $ gcloud backup-dr management-servers list --location=my-location

FLAGS
     Location resource - Location for which management servers should be
     listed. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * default is all locations with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * default is all locations .

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
    This command uses the backupdr/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/backup-disaster-recovery

NOTES
    These variants are also available:

        $ gcloud alpha backup-dr management-servers list

        $ gcloud beta backup-dr management-servers list
```

### gcloud beta backup-dr management-servers create

```text
NAME
    gcloud beta backup-dr management-servers create - create a new management
        server in the project

SYNOPSIS
    gcloud beta backup-dr management-servers create
        (MANAGEMENT_SERVER : --location=LOCATION) [--async] [--network=NETWORK]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr management-servers delete

```text
NAME
    gcloud beta backup-dr management-servers delete - delete the specified
        Management Server

SYNOPSIS
    gcloud beta backup-dr management-servers delete
        (MANAGEMENT_SERVER : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr management-servers describe

```text
NAME
    gcloud beta backup-dr management-servers describe - show details of the
        management server

SYNOPSIS
    gcloud beta backup-dr management-servers describe
        (MANAGEMENT_SERVER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta backup-dr management-servers list

```text
NAME
    gcloud beta backup-dr management-servers list - list management servers in
        the project

SYNOPSIS
    gcloud beta backup-dr management-servers list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr management-servers create

```text
NAME
    gcloud alpha backup-dr management-servers create - create a new management
        server in the project

SYNOPSIS
    gcloud alpha backup-dr management-servers create
        (MANAGEMENT_SERVER : --location=LOCATION) [--async] [--network=NETWORK]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr management-servers delete

```text
NAME
    gcloud alpha backup-dr management-servers delete - delete the specified
        Management Server

SYNOPSIS
    gcloud alpha backup-dr management-servers delete
        (MANAGEMENT_SERVER : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr management-servers describe

```text
NAME
    gcloud alpha backup-dr management-servers describe - show details of the
        management server

SYNOPSIS
    gcloud alpha backup-dr management-servers describe
        (MANAGEMENT_SERVER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha backup-dr management-servers list

```text
NAME
    gcloud alpha backup-dr management-servers list - list management servers in
        the project

SYNOPSIS
    gcloud alpha backup-dr management-servers list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud backup-dr management-servers create --network`: "Flag --network is deprecated.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example passes only `MANAGEMENT_SERVER`; the SYNOPSIS also requires `--location` for the resource (no property sets it), and gcloud 593.0.0 fails with "Error parsing [management_server]" without it, so the runnable form adds `--location=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/backup-dr/management-servers (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
