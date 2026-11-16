---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/reset-ssl-config
---

# gcloud sql instances reset-ssl-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances reset-ssl-config

```text
NAME
    gcloud sql instances reset-ssl-config - reset SSL materials according to
        the reset SSL mode

SYNOPSIS
    gcloud sql instances reset-ssl-config INSTANCE [--async] [--mode=MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Reset SSL materials according to the reset SSL mode.

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --mode=MODE
        Selectively refresh the SSL materials. MODE must be one of:

         ALL
            Refresh all TLS configs. This is the default behaviour.
         SYNC_FROM_PRIMARY
            Refreshes the replication-related TLS configuration settings
            provided by the primary instance. Not applicable to on-premises
            replication instances.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql instances reset-ssl-config

        $ gcloud beta sql instances reset-ssl-config
```

### gcloud beta sql instances reset-ssl-config

```text
NAME
    gcloud beta sql instances reset-ssl-config - reset SSL materials according
        to the reset SSL mode

SYNOPSIS
    gcloud beta sql instances reset-ssl-config INSTANCE [--async] [--mode=MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql instances reset-ssl-config

```text
NAME
    gcloud alpha sql instances reset-ssl-config - reset SSL materials according
        to the reset SSL mode

SYNOPSIS
    gcloud alpha sql instances reset-ssl-config INSTANCE [--async]
        [--mode=MODE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/reset-ssl-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
