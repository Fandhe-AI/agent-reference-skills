---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/start-migration
---

# gcloud memorystore instances start-migration

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memorystore instances start-migration

```text
NAME
    gcloud memorystore instances start-migration - start migration for a
        Memorystore instance

SYNOPSIS
    gcloud memorystore instances start-migration
        (INSTANCE : --location=LOCATION)
        --self-managed-source-ip-address=SELF_MANAGED_SOURCE_IP_ADDRESS
        --self-managed-source-network-attachment=SELF_MANAGED_SOURCE_NETWORK_ATTACHMENT
        --self-managed-source-port=SELF_MANAGED_SOURCE_PORT [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Start migration for a Memorystore instance.

EXAMPLES
    To start migration of a source instance running at IP address 10.0.0.1 and
    port 6379 to a Memorystore instance named my-instance in region
    us-central1, run:

        $ gcloud memorystore instances start-migration my-instance \
            --project=my-project --location=us-central1 \
            --self-managed-source-ip-address=10.0.0.1 \
            --self-managed-source-port=6379 \
            --self-managed-source-network-attachment=projects/my-project/\
        regions/us-central1/networkAttachments/my-network-attachment

POSITIONAL ARGUMENTS
     Instance resource - The resource name of the instance to start migration
     on. Format: projects/{project}/locations/{location}/instances/{instance}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

       --location=LOCATION
          The location id of the instance resource.

          To set the location attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --self-managed-source-ip-address=SELF_MANAGED_SOURCE_IP_ADDRESS
        The IP address of the source instance. This IP address should be a
        stable IP address that can be accessed by the Memorystore instance
        throughout the migration process.

     --self-managed-source-network-attachment=SELF_MANAGED_SOURCE_NETWORK_ATTACHMENT
        The resource name of the Private Service Connect Network Attachment
        used to establish connectivity to the source instance. This network
        attachment has the following requirements: 1. It must be in the same
        project as the Memorystore instance. 2. It must be in the same region
        as the Memorystore instance. 3. The subnet attached to the network
        attachment must be in the same VPC network as the source instance
        nodes.

        Format:
        projects/{project}/regions/{region}/networkAttachments/{network_attachment}

     --self-managed-source-port=SELF_MANAGED_SOURCE_PORT
        The port of the source instance. This port should be a stable port that
        can be accessed by the Memorystore instance throughout the migration
        process.

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
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances start-migration

        $ gcloud beta memorystore instances start-migration
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud memorystore instances start-migration my-instance \
    --project=my-project \
    --location=us-central1 \
    --self-managed-source-ip-address=10.0.0.1 \
    --self-managed-source-port=6379 \
    --self-managed-source-network-attachment=projects/my-project/regions/us-central1/networkAttachments/my-network-attachment
```

### gcloud beta memorystore instances start-migration

```text
NAME
    gcloud beta memorystore instances start-migration - start migration for a
        Memorystore instance

SYNOPSIS
    gcloud beta memorystore instances start-migration
        (INSTANCE : --location=LOCATION)
        --self-managed-source-ip-address=SELF_MANAGED_SOURCE_IP_ADDRESS
        --self-managed-source-network-attachment=SELF_MANAGED_SOURCE_NETWORK_ATTACHMENT
        --self-managed-source-port=SELF_MANAGED_SOURCE_PORT [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances start-migration

```text
NAME
    gcloud alpha memorystore instances start-migration - start migration for a
        Memorystore instance

SYNOPSIS
    gcloud alpha memorystore instances start-migration
        (INSTANCE : --location=LOCATION)
        --self-managed-source-ip-address=SELF_MANAGED_SOURCE_IP_ADDRESS
        --self-managed-source-network-attachment=SELF_MANAGED_SOURCE_NETWORK_ATTACHMENT
        --self-managed-source-port=SELF_MANAGED_SOURCE_PORT [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/start-migration (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
