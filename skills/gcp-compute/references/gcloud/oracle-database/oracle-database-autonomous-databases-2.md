---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/autonomous-databases
---

# gcloud oracle-database autonomous-databases (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database autonomous-databases switchover

```text
NAME
    gcloud oracle-database autonomous-databases switchover - switchovers an
        AutonomousDatabase to a new primary

SYNOPSIS
    gcloud oracle-database autonomous-databases switchover AUTONOMOUS_DATABASE
        [--async] [--location=LOCATION]
        [--peer-autonomous-database=PEER_AUTONOMOUS_DATABASE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Switchovers an AutonomousDatabase from a standby database to a new primary.

EXAMPLES
    To switchover an AutonomousDatabase with id my-instance in the location
    us-east4 with primary database name as
    'projects/project-id/locations/us-west3/autonomousDatabases/my-instance'
    run:

        $ gcloud oracle-database autonomous-databases switchover \
            my-instance --location=us-east4 \
            --peer-autonomous-database=projects/project-id/locations/\
        us-west3/autonomousDatabases/my-instance

    To switchover an AutonomousDatabase with id my-instance in the location
    us-east4 to a local standby database, run:

        $ gcloud oracle-database autonomous-databases switchover \
            my-instance --location=us-east4

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - The name of the Autonomous Database in the
     following format:
     projects/{project}/locations/{location}/autonomousDatabases/{autonomous_database}.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --location=LOCATION
        For resources [autonomous_database, peer-autonomous-database], provides
        fallback value for resource location attribute. When the resource's
        full URI path is not provided, location will fallback to this flag
        value.

     AutonomousDatabase resource - The peer database name to switch over to.
     Required for cross-region standby, and must be omitted for in-region Data
     Guard. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --peer-autonomous-database on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --peer-autonomous-database on the command line
        with a fully specified name;
      * provide the argument --location on the command line.

     --peer-autonomous-database=PEER_AUTONOMOUS_DATABASE
        ID of the autonomousDatabase or fully qualified identifier for the
        autonomousDatabase.

        To set the autonomous-database attribute:
        * provide the argument --peer-autonomous-database on the command
          line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud oracle-database autonomous-databases switchover my-instance \
    --location=us-east4 \
    --peer-autonomous-database=projects/project-id/locations/us-west3/autonomousDatabases/my-instance
```

### gcloud oracle-database autonomous-databases update

```text
NAME
    gcloud oracle-database autonomous-databases update - update an
        AutonomousDatabase

SYNOPSIS
    gcloud oracle-database autonomous-databases update AUTONOMOUS_DATABASE
        [--async] [--location=LOCATION] [--request-id=REQUEST_ID]
        [--clear-properties
          --properties-local-adg-auto-failover-max-data-loss-limit-duration=PROPERTIES_LOCAL_ADG_AUTO_FAILOVER_MAX_DATA_LOSS_LIMIT_DURATION --[no-]properties-local-data-guard-enabled --[no-]properties-refreshable-clone --encryption-key-provider=ENCRYPTION_KEY_PROVIDER --key-ring=KEY_RING --clear-encryption-key-kms | --encryption-key-kms=ENCRYPTION_KEY_KMS]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an AutonomousDatabase.

EXAMPLES
    To Update the encryption for a given AutonomousDatabase with id
    my-autonomous-database with custom KMS encryption key
    projects/project-id/locations/us-east4/keyRings/keyring/cryptoKeys/key,
    run:

        $ gcloud oracle-database autonomous-databases update \
            my-autonomous-database --location=us-east4 \
            --encryption-key-provider=GOOGLE_MANAGED \
            --encryption-key-kms=projects/project-id/locations/us-east4/\
        keyRings/keyring/cryptoKeys/key

    To enable Local Data Guard on an AutonomousDatabase with id my-instance in
    the location us-east4 and set the auto failover max data loss limit to 0,
    run:

        $ gcloud oracle-database autonomous-databases update my-instance \
            --location=us-east4 --properties-local-data-guard-enabled=true \
            --properties-local-adg-auto-failover-max-data-loss-limit-duratio\
        n=0

    To update Local Data Guard settings on an AutonomousDatabase with id
    my-instance in the location us-east4 and set the auto failover max data
    loss limit to 60 seconds, run:

        $ gcloud oracle-database autonomous-databases update my-instance \
            --location=us-east4 \
            --properties-local-adg-auto-failover-max-data-loss-limit-duratio\
        n=60

    To disable Local Data Guard on an AutonomousDatabase with id my-instance in
    the location us-east4, run:

        $ gcloud oracle-database autonomous-databases update my-instance \
            --location=us-east4 --properties-local-data-guard-enabled=false

POSITIONAL ARGUMENTS
     AutonomousDatabase resource - Identifier. The name of the Autonomous
     Database resource in the following format:
     projects/{project}/locations/{region}/autonomousDatabases/{autonomous_database}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument autonomous_database on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       AUTONOMOUS_DATABASE
          ID of the autonomousDatabase or fully qualified identifier for the
          autonomousDatabase.

          To set the autonomous_database attribute:
          + provide the argument autonomous_database on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --location=LOCATION
        For resources [autonomous_database, encryption-key-kms], provides
        fallback value for resource location attribute. When the resource's
        full URI path is not provided, location will fallback to this flag
        value.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     The properties of an Autonomous Database.

     --clear-properties
        Set autonomousDatabase.properties back to default value.

     Arguments for the local adg auto failover max data loss limit duration.

     --properties-local-adg-auto-failover-max-data-loss-limit-duration=PROPERTIES_LOCAL_ADG_AUTO_FAILOVER_MAX_DATA_LOSS_LIMIT_DURATION
        This field indicates the maximum data loss limit for an Autonomous
        Database, in seconds.

     Arguments for the local data guard enabled.

     --[no-]properties-local-data-guard-enabled
        Indicates whether the Autonomous Database has a local (in-region)
        standby database. Not applicable to cross-region Data Guard or
        dedicated Exadata infrastructure. Use
        --properties-local-data-guard-enabled to enable and
        --no-properties-local-data-guard-enabled to disable.

     Arguments for the refreshable clone.

     --[no-]properties-refreshable-clone
        Indicates if the Autonomous Database is a refreshable clone. This field
        is used in update flow to connect / disconnect a refreshable clone from
        its source database. Use --properties-refreshable-clone to enable and
        --no-properties-refreshable-clone to disable.

     The encryption key used to encrypt the Autonomous Database.

     --encryption-key-provider=ENCRYPTION_KEY_PROVIDER
        The provider of the encryption key. ENCRYPTION_KEY_PROVIDER must be one
        of:

         google-managed
            Google Managed KMS key, if selected, please provide the KMS key
            name.
         oracle-managed
            Oracle Managed.

     All arguments needed to update encryption_key_kms.

     --key-ring=KEY_RING
        The keyRing id of the cryptoKey resource.

        To set the key-ring attribute:
        * provide the argument --current on the command line with a fully
          specified name;
        * provide the argument --key-ring on the command line.

     Update encryption_key_kms.

     At most one of these can be specified:

       --clear-encryption-key-kms
          Clear encryption_key_kms value and set to null.

       CryptoKey resource - Set encryption_key_kms to new value.

       The KMS key used to encrypt the Autonomous Database. This field is
       required if the provider is GOOGLE_MANAGED. The name of the KMS key
       resource in the following format:
       projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}.
       This represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --encryption-key-kms on the command line with
          a fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --encryption-key-kms on the command line with
          a fully specified name;
        + provide the argument --location on the command line.

       To set the key-ring attribute:
        + provide the argument --encryption-key-kms on the command line with
          a fully specified name;
        + provide the argument --key-ring on the command line.

       --encryption-key-kms=ENCRYPTION_KEY_KMS
          ID of the cryptoKey or fully qualified identifier for the cryptoKey.

          To set the crypto-key attribute:
          + provide the argument --encryption-key-kms on the command line.

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. The labels or tags associated with the
          Autonomous Database.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. The labels or tags
            associated with the Autonomous Database.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud oracle-database autonomous-databases update my-autonomous-database \
    --location=us-east4 \
    --encryption-key-provider=google-managed \
    --encryption-key-kms=projects/project-id/locations/us-east4/keyRings/keyring/cryptoKeys/key

gcloud oracle-database autonomous-databases update my-instance \
    --location=us-east4 \
    --properties-local-data-guard-enabled \
    --properties-local-adg-auto-failover-max-data-loss-limit-duration=0

gcloud oracle-database autonomous-databases update my-instance \
    --location=us-east4 \
    --properties-local-adg-auto-failover-max-data-loss-limit-duration=60

gcloud oracle-database autonomous-databases update my-instance \
    --location=us-east4 \
    --no-properties-local-data-guard-enabled
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): `--[no-]properties-local-data-guard-enabled` is a boolean flag that takes no value (gcloud 593.0.0 rejects `--properties-local-data-guard-enabled=true`: "ignored explicit argument 'true'"); the runnable form uses `--properties-local-data-guard-enabled` to enable Local Data Guard.
- Corrected from the official docs (runnable form only; the help text above is verbatim): for the same reason, the disable example uses `--no-properties-local-data-guard-enabled` instead of `--properties-local-data-guard-enabled=false`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example passes the API enum name in uppercase (for example `LICENSE_INCLUDED`, `DW`, `GOOGLE_MANAGED`, `SMART_STORAGE`), while the flag description lists the choices in lowercase (`license-included`, `dw`, `google-managed`, `smart-storage`); the runnable form uses the documented lowercase choices (gcloud 593.0.0 also accepts the uppercase names).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/autonomous-databases (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
