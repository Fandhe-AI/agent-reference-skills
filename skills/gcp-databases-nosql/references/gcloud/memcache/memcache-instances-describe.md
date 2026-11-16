---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/describe
---

# gcloud memcache instances describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memcache instances describe

```text
NAME
    gcloud memcache instances describe - display metadata for a Memorystore
        Memcached instance

SYNOPSIS
    gcloud memcache instances describe (INSTANCE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays all metadata associated with a Memcached instance given a valid
    instance name.

    This command can fail for the following reasons:
      o The instance specified does not exist.
      o The active account does not have permission to access the given
        instance.

EXAMPLES
    To display the metadata for an instance named my-memcache-instance in
    region us-central1, run:

        $ gcloud memcache instances describe my-memcache-instance \
            --region=us-central1

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Memcached
     instance to describe. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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

        $ gcloud alpha memcache instances describe

        $ gcloud beta memcache instances describe
```

### gcloud beta memcache instances describe

```text
NAME
    gcloud beta memcache instances describe - display metadata for a
        Memorystore Memcached instance

SYNOPSIS
    gcloud beta memcache instances describe (INSTANCE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memcache instances describe

```text
NAME
    gcloud alpha memcache instances describe - display metadata for a
        Memorystore Memcached instance

SYNOPSIS
    gcloud alpha memcache instances describe (INSTANCE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
