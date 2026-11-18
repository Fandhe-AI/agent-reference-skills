---
source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/lite-reservations
---

# gcloud pubsub lite-reservations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud pubsub lite-reservations create

```text
NAME
    gcloud pubsub lite-reservations create - create a Pub/Sub Lite reservation

SYNOPSIS
    gcloud pubsub lite-reservations create RESERVATION --location=LOCATION
        --throughput-capacity=THROUGHPUT_CAPACITY [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Pub/Sub Lite reservation.

EXAMPLES
    To create a Pub/Sub lite-reservation, run:

        $ gcloud pubsub lite-reservations create myreservation \
          --location=us-central1 --throughput-capacity=2

POSITIONAL ARGUMENTS
     RESERVATION
        Reservation ID.

REQUIRED FLAGS
     Location resource - Identifies the Cloud location this command will be
     executed on. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

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

     --throughput-capacity=THROUGHPUT_CAPACITY
        Reservation throughput capacity. Every unit of throughput capacity is
        equivalent to 1 MiB/s of published messages or 2 MiB/s of subscribed
        messages.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-reservations create

        $ gcloud beta pubsub lite-reservations create
```

### gcloud pubsub lite-reservations delete

```text
NAME
    gcloud pubsub lite-reservations delete - delete a Pub/Sub Lite reservation

SYNOPSIS
    gcloud pubsub lite-reservations delete (RESERVATION : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Pub/Sub Lite reservation.

EXAMPLES
    To delete a Pub/Sub Lite reservation, run:

        $ gcloud pubsub lite-reservations delete myreservation \
          --location=us-central1

POSITIONAL ARGUMENTS
     Reservation resource - Reservation to delete. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument reservation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESERVATION
          ID of the reservation or fully qualified identifier for the
          reservation.

          To set the reservation attribute:
          + provide the argument reservation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument reservation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-reservations delete

        $ gcloud beta pubsub lite-reservations delete
```

### gcloud pubsub lite-reservations describe

```text
NAME
    gcloud pubsub lite-reservations describe - describe a Pub/Sub Lite
        reservation

SYNOPSIS
    gcloud pubsub lite-reservations describe
        (RESERVATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Pub/Sub Lite reservation.

EXAMPLES
    To describe a Pub/Sub Lite reservation, run:

        $ gcloud pubsub lite-reservations describe myreservation \
          --location=us-central1

POSITIONAL ARGUMENTS
     Reservation resource - Reservation to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument reservation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESERVATION
          ID of the reservation or fully qualified identifier for the
          reservation.

          To set the reservation attribute:
          + provide the argument reservation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument reservation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-reservations describe

        $ gcloud beta pubsub lite-reservations describe
```

### gcloud pubsub lite-reservations list

```text
NAME
    gcloud pubsub lite-reservations list - list Pub/Sub Lite reservations

SYNOPSIS
    gcloud pubsub lite-reservations list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Pub/Sub Lite reservations.

EXAMPLES
    To list Pub/Sub Lite reservations, run:

        $ gcloud pubsub lite-reservations list --location=us-central1 \
          --limit=5

REQUIRED FLAGS
     Location resource - Location to list reservations for. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
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
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-reservations list

        $ gcloud beta pubsub lite-reservations list
```

### gcloud pubsub lite-reservations list-topics

```text
NAME
    gcloud pubsub lite-reservations list-topics - list Pub/Sub Lite topics for
        a given Lite reservation

SYNOPSIS
    gcloud pubsub lite-reservations list-topics
        (RESERVATION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Pub/Sub Lite topics for a given Lite reservation.

EXAMPLES
    To list Pub/Sub Lite topics for a given Lite reservation, run:

        $ gcloud pubsub lite-reservations list-topics myreservation \
          --location=us-central1

POSITIONAL ARGUMENTS
     Reservation resource - Reservation to list topics for. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument reservation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESERVATION
          ID of the reservation or fully qualified identifier for the
          reservation.

          To set the reservation attribute:
          + provide the argument reservation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument reservation on the command line with a fully
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
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-reservations list-topics

        $ gcloud beta pubsub lite-reservations list-topics
```

### gcloud pubsub lite-reservations update

```text
NAME
    gcloud pubsub lite-reservations update - update a Pub/Sub Lite reservation

SYNOPSIS
    gcloud pubsub lite-reservations update (RESERVATION : --location=LOCATION)
        --throughput-capacity=THROUGHPUT_CAPACITY [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Pub/Sub Lite reservation.

EXAMPLES
    To update a Pub/Sub Lite reservation, run:

        $ gcloud pubsub lite-reservations update myreservation \
          --location=us-central1 --throughput-capacity=2

POSITIONAL ARGUMENTS
     Reservation resource - Reservation to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument reservation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RESERVATION
          ID of the reservation or fully qualified identifier for the
          reservation.

          To set the reservation attribute:
          + provide the argument reservation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location of the Pub/Sub Lite resource.

          To set the location attribute:
          + provide the argument reservation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --throughput-capacity=THROUGHPUT_CAPACITY
        Reservation throughput capacity. Every unit of throughput capacity is
        equivalent to 1 MiB/s of published messages or 2 MiB/s of subscribed
        messages.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the pubsublite/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/pubsub/lite/docs

NOTES
    These variants are also available:

        $ gcloud alpha pubsub lite-reservations update

        $ gcloud beta pubsub lite-reservations update
```

### gcloud beta pubsub lite-reservations create

```text
NAME
    gcloud beta pubsub lite-reservations create - create a Pub/Sub Lite
        reservation

SYNOPSIS
    gcloud beta pubsub lite-reservations create RESERVATION --location=LOCATION
        --throughput-capacity=THROUGHPUT_CAPACITY [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-reservations delete

```text
NAME
    gcloud beta pubsub lite-reservations delete - delete a Pub/Sub Lite
        reservation

SYNOPSIS
    gcloud beta pubsub lite-reservations delete
        (RESERVATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-reservations describe

```text
NAME
    gcloud beta pubsub lite-reservations describe - describe a Pub/Sub Lite
        reservation

SYNOPSIS
    gcloud beta pubsub lite-reservations describe
        (RESERVATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-reservations list

```text
NAME
    gcloud beta pubsub lite-reservations list - list Pub/Sub Lite reservations

SYNOPSIS
    gcloud beta pubsub lite-reservations list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-reservations list-topics

```text
NAME
    gcloud beta pubsub lite-reservations list-topics - list Pub/Sub Lite topics
        for a given Lite reservation

SYNOPSIS
    gcloud beta pubsub lite-reservations list-topics
        (RESERVATION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pubsub lite-reservations update

```text
NAME
    gcloud beta pubsub lite-reservations update - update a Pub/Sub Lite
        reservation

SYNOPSIS
    gcloud beta pubsub lite-reservations update
        (RESERVATION : --location=LOCATION)
        --throughput-capacity=THROUGHPUT_CAPACITY [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-reservations create

```text
NAME
    gcloud alpha pubsub lite-reservations create - create a Pub/Sub Lite
        reservation

SYNOPSIS
    gcloud alpha pubsub lite-reservations create RESERVATION
        --location=LOCATION --throughput-capacity=THROUGHPUT_CAPACITY
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-reservations delete

```text
NAME
    gcloud alpha pubsub lite-reservations delete - delete a Pub/Sub Lite
        reservation

SYNOPSIS
    gcloud alpha pubsub lite-reservations delete
        (RESERVATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-reservations describe

```text
NAME
    gcloud alpha pubsub lite-reservations describe - describe a Pub/Sub Lite
        reservation

SYNOPSIS
    gcloud alpha pubsub lite-reservations describe
        (RESERVATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-reservations list

```text
NAME
    gcloud alpha pubsub lite-reservations list - list Pub/Sub Lite reservations

SYNOPSIS
    gcloud alpha pubsub lite-reservations list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-reservations list-topics

```text
NAME
    gcloud alpha pubsub lite-reservations list-topics - list Pub/Sub Lite
        topics for a given Lite reservation

SYNOPSIS
    gcloud alpha pubsub lite-reservations list-topics
        (RESERVATION : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pubsub lite-reservations update

```text
NAME
    gcloud alpha pubsub lite-reservations update - update a Pub/Sub Lite
        reservation

SYNOPSIS
    gcloud alpha pubsub lite-reservations update
        (RESERVATION : --location=LOCATION)
        --throughput-capacity=THROUGHPUT_CAPACITY [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated: the Pub/Sub Lite documentation says "Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down.", "Pub/Sub Lite is no longer available for new customers after September 24, 2024." and that projects that did not use Pub/Sub Lite between April 15, 2025 and July 15, 2025 cannot access it starting on July 15, 2025; it recommends migrating to Google Cloud Managed Service for Apache Kafka (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-managed-service-for-apache-kafka) or Pub/Sub (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-pubsub) (https://docs.cloud.google.com/pubsub/lite/docs, retrieved 2026-11-18). The `gcloud pubsub lite-*` commands are still in the gcloud 593.0.0 help.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/pubsub/lite-reservations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
