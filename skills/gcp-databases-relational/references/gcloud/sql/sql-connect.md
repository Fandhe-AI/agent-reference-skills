---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/connect
---

# gcloud sql connect

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql connect

```text
NAME
    gcloud sql connect - connects to a Cloud SQL instance

SYNOPSIS
    gcloud sql connect INSTANCE [--database=DATABASE, -d DATABASE]
        [--debug-logs] [--port=PORT; default=9470] [--run-connection-test]
        [--skip-ssl] [--auto-iam-authn | --user=USER, -u USER]
        [--auto-ip | --private-ip | --psc] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Connects to a Cloud SQL instance.

EXAMPLES
    To connect to a Cloud SQL instance, run:

        $ gcloud sql connect my-instance --user=root

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

FLAGS
     --database=DATABASE, -d DATABASE
        The PostgreSQL or SQL Server database to connect to.

     --debug-logs
        Enable verbose debug logs for Cloud SQL Proxy.

     --port=PORT; default=9470
        Port number that gcloud will use to connect to the Cloud SQL Proxy
        through localhost.

     --run-connection-test
        Run connection test for Cloud SQL Proxy.

     --skip-ssl
        Skip SSL certificate verification for MySQL instances.

     User selection settings for Cloud SQL Proxy connection.

     At most one of these can be specified:

       --auto-iam-authn
          Enables IAM database authentication for connections to MySQL and
          Postgres instances.

       --user=USER, -u USER
          Cloud SQL instance user to connect as.

     IP address selection settings for Cloud SQL Proxy connection.

     At most one of these can be specified:

       --auto-ip
          Connect to the Cloud SQL instance with auto IP detection.

       --private-ip
          Connect to the Cloud SQL instance using private IP.

       --psc
          Connect to the Cloud SQL instance using Private Service Connect.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql connect

        $ gcloud beta sql connect
```

### gcloud beta sql connect

```text
NAME
    gcloud beta sql connect - connects to a Cloud SQL instance

SYNOPSIS
    gcloud beta sql connect INSTANCE [--database=DATABASE, -d DATABASE]
        [--debug-logs] [--port=PORT; default=9470] [--run-connection-test]
        [--skip-ssl] [--auto-iam-authn | --user=USER, -u USER]
        [--auto-ip | --private-ip | --psc] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql connect

```text
NAME
    gcloud alpha sql connect - connects to a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql connect INSTANCE [--database=DATABASE, -d DATABASE]
        [--debug-logs] [--port=PORT; default=9470] [--run-connection-test]
        [--skip-ssl] [--auto-iam-authn | --user=USER, -u USER]
        [--auto-ip | --private-ip | --psc] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/connect (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
