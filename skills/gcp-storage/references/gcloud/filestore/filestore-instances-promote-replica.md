---
source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/promote-replica
---

# gcloud filestore instances promote-replica

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud filestore instances promote-replica

```text
NAME
    gcloud filestore instances promote-replica - promote a Filestore standby
        replication instance

SYNOPSIS
    gcloud filestore instances promote-replica (INSTANCE : --zone=ZONE)
        [--async] [--location=LOCATION] [--peer-instance=PEER_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Promote a Filestore standby replication instance to a regular instance.
    This command can be called directly on the standby instance or on the
    active instance with the standby peer instance parameter. When used on the
    standby instance promotes the standby instance to a regular instance even
    if the active instance is unavailable. When used on the active instance
    detaches the standby instance from the active instance even if the standby
    instance is unavailable.

    This command can fail for the following reasons:
      o The target instance does not exist.
      o The instance is not a standby replication member.
      o The instance is an active instance and the peer instance parameter is
        missing or invalid.

EXAMPLES
    To promote a standby instance with the name my-replica-instance located in
    us-central1, run:

        $ gcloud filestore instances promote-replica my-replica-instance \
            --zone=us-central1

    To promote a standby instance with the name my-replica-instance located in
    us-central1, attached to the active peer instance my-active-instance
    located in us-west1, run:

        $ gcloud filestore instances promote-replica my-active-instance \
            --zone=us-west1 \
            --peer-instance=projects/my-project/locations/us-central1/\
        instances/my-replica-instance

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Filestore
     instance to promote. The arguments in this group can be used to specify
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

       --zone=ZONE
          The zone of the Filestore instance.

          To set the zone attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + provide the argument --location on the command line;
          + set the property filestore/zone.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --location=LOCATION
        Location of the Filestore instance to promote.

     --peer-instance=PEER_INSTANCE
        The name of the standby peer instance to promote.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the file/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/filestore/

NOTES
    This variant is also available:

        $ gcloud beta filestore instances promote-replica
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud filestore instances promote-replica my-active-instance \
    --zone=us-west1 \
    --peer-instance=projects/my-project/locations/us-central1/instances/my-replica-instance
```

### gcloud beta filestore instances promote-replica

```text
NAME
    gcloud beta filestore instances promote-replica - promote a Filestore
        standby replication instance

SYNOPSIS
    gcloud beta filestore instances promote-replica (INSTANCE : --zone=ZONE)
        [--async] [--location=LOCATION] [--peer-instance=PEER_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/promote-replica (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
