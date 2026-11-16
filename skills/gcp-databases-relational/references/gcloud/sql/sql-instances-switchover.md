---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/switchover
---

# gcloud sql instances switchover

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances switchover

```text
NAME
    gcloud sql instances switchover - switches over a Cloud SQL instance to one
        of its replicas

SYNOPSIS
    gcloud sql instances switchover REPLICA [--async] [--db-timeout=DB_TIMEOUT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Switches over a Cloud SQL instance to one of its replicas.

EXAMPLES
    To switch over an instance to its replica called replica-instance:

        $ gcloud sql instances switchover replica-instance

POSITIONAL ARGUMENTS
     REPLICA
        Cloud SQL replica ID.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --db-timeout=DB_TIMEOUT
        (MySQL and PostgreSQL only) Cloud SQL instance operations timeout,
        which is the sum of all database operations. Default value is 10
        minutes and can be modified to a maximum value of 24h.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql instances switchover

        $ gcloud beta sql instances switchover
```

### gcloud beta sql instances switchover

```text
NAME
    gcloud beta sql instances switchover - switches over a Cloud SQL instance
        to one of its replicas

SYNOPSIS
    gcloud beta sql instances switchover REPLICA [--async]
        [--db-timeout=DB_TIMEOUT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql instances switchover

```text
NAME
    gcloud alpha sql instances switchover - switches over a Cloud SQL instance
        to one of its replicas

SYNOPSIS
    gcloud alpha sql instances switchover REPLICA [--async]
        [--db-timeout=DB_TIMEOUT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/switchover (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
