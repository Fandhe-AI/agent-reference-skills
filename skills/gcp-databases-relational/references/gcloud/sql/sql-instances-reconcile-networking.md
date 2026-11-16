---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/reconcile-networking
---

# gcloud sql instances reconcile-networking

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql instances reconcile-networking

```text
NAME
    gcloud sql instances reconcile-networking - reconciles network
        infrastructure for a Cloud SQL instance

SYNOPSIS
    gcloud sql instances reconcile-networking INSTANCE [--async] [--force]
        [--networks=[NETWORK,...]] [--psc-dns] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Reconciles network infrastructure (e.g. Service Connection Maps, Automated
    DNS Records) for a Cloud SQL instance.

EXAMPLES
    To reconcile PSC DNS networking for a Cloud SQL instance:

        $ gcloud sql instances reconcile-networking instance-foo --psc-dns

    To reconcile PSC DNS networking for specific consumer VPC networks:

        $ gcloud sql instances reconcile-networking instance-foo --psc-dns \
          --networks=projects/p1/global/networks/n1,projects/p2/global/\
        networks/n2

    To force PSC DNS reconciliation:

        $ gcloud sql instances reconcile-networking instance-foo --psc-dns \
          --force

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud SQL instance ID.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        Forces service connection mapping disablement and enablement during PSC
        networking reconciliation. Bypasses safety checks and may cause
        transient connectivity disruption for connected VPCs while the
        networking settings are reapplied.

     --networks=[NETWORK,...]
        List of specific consumer VPC networks to reconcile, specified as full
        resource paths (e.g.
        projects/my-consumer-project/global/networks/prod-vpc). If omitted,
        reconciles all consumer networks associated with the instance.

     --psc-dns
        Reconciles the instance's Private Service Connect (PSC) DNS records. If
        the DNS zones or records associated with the PSC endpoints are missing
        or incorrect, they will be recreated or updated.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql instances reconcile-networking

        $ gcloud beta sql instances reconcile-networking
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud sql instances reconcile-networking instance-foo \
    --psc-dns \
    --networks=projects/p1/global/networks/n1,projects/p2/global/networks/n2
```

### gcloud beta sql instances reconcile-networking

```text
NAME
    gcloud beta sql instances reconcile-networking - reconciles network
        infrastructure for a Cloud SQL instance

SYNOPSIS
    gcloud beta sql instances reconcile-networking INSTANCE [--async] [--force]
        [--networks=[NETWORK,...]] [--psc-dns] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql instances reconcile-networking

```text
NAME
    gcloud alpha sql instances reconcile-networking - reconciles network
        infrastructure for a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql instances reconcile-networking INSTANCE [--async]
        [--force] [--networks=[NETWORK,...]] [--psc-dns] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/instances/reconcile-networking (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
