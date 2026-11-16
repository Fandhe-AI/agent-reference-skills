---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/apply-parameters
---

# gcloud memcache instances apply-parameters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memcache instances apply-parameters

```text
NAME
    gcloud memcache instances apply-parameters - apply parameter update to
        nodes in a Memorystore Memcached instance

SYNOPSIS
    gcloud memcache instances apply-parameters (INSTANCE : --region=REGION)
        (--apply-all | --node-ids=[NODE_IDS,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Apply a parameter update to nodes in a Memcached instance from the current
    configuration parameters staged in the instance metadata.

    Applying a parameter update to a node causes a full cache flush on that
    node.

EXAMPLES
    To apply parameter update to nodes 'node-1' and 'node-2' of a Memcached
    instance named 'my-memcache-instance' in region 'us-central1', run:

        $ gcloud memcache instances apply-parameters my-memcache-instance \
            --node-ids=node-1,node-2 --region=us-central1

    To apply parameter update to all nodes of a Memcached instance named
    'my-memcache-instance' in region 'us-central1', run:

        $ gcloud memcache instances apply-parameters my-memcache-instance \
            --apply-all --region=us-central1

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Memcached
     instance on which to apply parameter update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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
     Exactly one of these must be specified:

       --apply-all
          Apply the parameter update onto all nodes.

       --node-ids=[NODE_IDS,...]
          Nodes on which to apply the parameter update.

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

        $ gcloud alpha memcache instances apply-parameters

        $ gcloud beta memcache instances apply-parameters
```

### gcloud beta memcache instances apply-parameters

```text
NAME
    gcloud beta memcache instances apply-parameters - apply parameter update to
        nodes in a Memorystore Memcached instance

SYNOPSIS
    gcloud beta memcache instances apply-parameters
        (INSTANCE : --region=REGION) (--apply-all | --node-ids=[NODE_IDS,...])
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memcache instances apply-parameters

```text
NAME
    gcloud alpha memcache instances apply-parameters - apply parameter update
        to nodes in a Memorystore Memcached instance

SYNOPSIS
    gcloud alpha memcache instances apply-parameters
        (INSTANCE : --region=REGION) (--apply-all | --node-ids=[NODE_IDS,...])
        [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/apply-parameters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
