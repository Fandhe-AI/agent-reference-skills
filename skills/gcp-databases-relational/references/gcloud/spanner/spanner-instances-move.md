---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/instances/move
---

# gcloud spanner instances move

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner instances move

```text
NAME
    gcloud spanner instances move - move the Cloud Spanner instance to the
        specified instance configuration

SYNOPSIS
    gcloud spanner instances move INSTANCE --target-config=TARGET_CONFIG
        [--target-database-move-configs=[^:^database-id=DATABASE_ID:kms-key-names=KEY1,
          KEY2,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Move the Cloud Spanner instance to the specified instance configuration.

EXAMPLES
    To move the Cloud Spanner instance, which has two CMEK-enabled databases
    db1 and db2 and a database db3 with Google-managed encryption keys, to the
    target instance configuration nam3 (us-east4, us-east1, us-central1), run:        $ gcloud spanner instances move my-instance-id \
            --target-config=nam3 \
            --target-database-move-configs=^:^database-id=db1:kms-key-names=\
        projects/myproject/locations/us-east4/keyRings/mykeyring/\
        cryptoKeys/cmek-key,projects/myproject/locations/us-east1/keyRings/\
        mykeyring/cryptoKeys/cmek-key,projects/myproject/locations/\
        us-central1/keyRings/mykeyring/cryptoKeys/cmek-key \
            --target-database-move-configs=^:^database-id=db2:kms-key-names=\
        projects/myproject/locations/us-east4/keyRings/mykeyring/\
        cryptoKeys/cmek-key,projects/myproject/locations/us-east1/keyRings/\
        mykeyring/cryptoKeys/cmek-key,projects/myproject/locations/\
        us-central1/keyRings/mykeyring/cryptoKeys/cmek-key

POSITIONAL ARGUMENTS
     INSTANCE
        Cloud Spanner instance ID.

REQUIRED FLAGS
     --target-config=TARGET_CONFIG
        Target Instance configuration to move the instances.

OPTIONAL FLAGS
     --target-database-move-configs=[^:^database-id=DATABASE_ID:kms-key-names=KEY1,KEY2,...]
        Database level configurations for each database to be moved. Currently
        only used for CMEK-enabled databases to specificy the target database
        KMS keys. Sets target_database_move_configs value.

         database-id
            Required, sets database-id value.

         kms-key-names
            Sets kms-key-names value.

        Shorthand Example:

            --target-database-move-configs=database-id=string,kms-key-names=string --target-database-move-configs=database-id=string,kms-key-names=string

        JSON Example:

            --target-database-move-configs='[{"database-id": "string", "kms-key-names": "string"}]'

        File Example:

            --target-database-move-configs=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner instances move

        $ gcloud beta spanner instances move
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud spanner instances move my-instance-id \
    --target-config=nam3 \
    --target-database-move-configs=^:^database-id=db1:kms-key-names=projects/myproject/locations/us-east4/keyRings/mykeyring/cryptoKeys/cmek-key,projects/myproject/locations/us-east1/keyRings/mykeyring/cryptoKeys/cmek-key,projects/myproject/locations/us-central1/keyRings/mykeyring/cryptoKeys/cmek-key \
    --target-database-move-configs=^:^database-id=db2:kms-key-names=projects/myproject/locations/us-east4/keyRings/mykeyring/cryptoKeys/cmek-key,projects/myproject/locations/us-east1/keyRings/mykeyring/cryptoKeys/cmek-key,projects/myproject/locations/us-central1/keyRings/mykeyring/cryptoKeys/cmek-key
```

### gcloud beta spanner instances move

```text
NAME
    gcloud beta spanner instances move - move the Cloud Spanner instance to the
        specified instance configuration

SYNOPSIS
    gcloud beta spanner instances move INSTANCE --target-config=TARGET_CONFIG
        [--target-database-move-configs=[^:^database-id=DATABASE_ID:kms-key-names=KEY1,
          KEY2,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner instances move

```text
NAME
    gcloud alpha spanner instances move - move the Cloud Spanner instance to
        the specified instance configuration

SYNOPSIS
    gcloud alpha spanner instances move INSTANCE --target-config=TARGET_CONFIG
        [--target-database-move-configs=[^:^database-id=DATABASE_ID:kms-key-names=KEY1,
          KEY2,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example puts `$ gcloud` on the same line as `run:`, and the help wraps the `--target-database-move-configs` values with backslashes inside the KMS key names; the runnable form starts the command on its own line and joins the wrapped key names.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/instances/move (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
