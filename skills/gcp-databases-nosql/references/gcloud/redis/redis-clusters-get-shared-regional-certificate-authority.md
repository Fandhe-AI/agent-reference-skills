---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/get-shared-regional-certificate-authority
---

# gcloud redis clusters get-shared-regional-certificate-authority

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis clusters get-shared-regional-certificate-authority

```text
NAME
    gcloud redis clusters get-shared-regional-certificate-authority - get the
        shared regional certificate authority certificates for Memorystore for
        Redis Cluster

SYNOPSIS
    gcloud redis clusters get-shared-regional-certificate-authority
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the shared regional certificate authority certificates for Memorystore
    for Redis Cluster.

    This command can fail for the following reasons:
      o The active account doesn't have permission to access the given
        region.

EXAMPLES
    To get the shared regional certificate authority in the default region,
    run:

        $ gcloud redis clusters get-shared-regional-certificate-authority

FLAGS
     Region resource - Arguments and flags that specify the region. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * set the property redis/region with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        ID of the region or fully qualified identifier for the region.

        To set the region attribute:
        * provide the argument --region on the command line;
        * set the property redis/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters \
            get-shared-regional-certificate-authority

        $ gcloud beta redis clusters \
            get-shared-regional-certificate-authority
```

### gcloud beta redis clusters get-shared-regional-certificate-authority

```text
NAME
    gcloud beta redis clusters get-shared-regional-certificate-authority - get
        the shared regional certificate authority certificates for Memorystore
        for Redis Cluster

SYNOPSIS
    gcloud beta redis clusters get-shared-regional-certificate-authority
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters get-shared-regional-certificate-authority

```text
NAME
    gcloud alpha redis clusters get-shared-regional-certificate-authority - get
        the shared regional certificate authority certificates for Memorystore
        for Redis Cluster

SYNOPSIS
    gcloud alpha redis clusters get-shared-regional-certificate-authority
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/get-shared-regional-certificate-authority (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
