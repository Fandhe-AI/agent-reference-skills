---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/upgrade
---

# gcloud memcache instances upgrade

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memcache instances upgrade

```text
NAME
    gcloud memcache instances upgrade - upgrade memcache instance to a newer
        memcached version

SYNOPSIS
    gcloud memcache instances upgrade (INSTANCE : --region=REGION)
        --memcached-version=MEMCACHED_VERSION [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Upgrade memcahce instance to a newer memcached version.

EXAMPLES
    To upgrade memcache version of an instance with the name
    'my-memcache-instance' in region 'us-central-1' to MEMCACHE_1_6_15

        $ gcloud memcache instances upgrade my-memcache-instance \
            --region=us-central1 --memcached-version="1.6.15"

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Memorystore for
     Memcached instance you want to upgrade. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Memcached region of the instance. Overrides the
          default memcache/region property value for this command invocation.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property memcache/region.

REQUIRED FLAGS
     --memcached-version=MEMCACHED_VERSION
        Memcached engine version to which instance should be upgraded to.
        MEMCACHED_VERSION must be (only one value is supported):

         1.6.15
            Memcached engine version 1.6.15

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
    This command uses the memcache/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memcache instances upgrade

        $ gcloud beta memcache instances upgrade
```

### gcloud beta memcache instances upgrade

```text
NAME
    gcloud beta memcache instances upgrade - upgrade memcache instance to a
        newer memcached version

SYNOPSIS
    gcloud beta memcache instances upgrade (INSTANCE : --region=REGION)
        --memcached-version=MEMCACHED_VERSION [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memcache instances upgrade

```text
NAME
    gcloud alpha memcache instances upgrade - upgrade memcache instance to a
        newer memcached version

SYNOPSIS
    gcloud alpha memcache instances upgrade (INSTANCE : --region=REGION)
        --memcached-version=MEMCACHED_VERSION [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/upgrade (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
