---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/update
---

# gcloud spanner databases update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner databases update

```text
NAME
    gcloud spanner databases update - update a Cloud Spanner database

SYNOPSIS
    gcloud spanner databases update (DATABASE : --instance=INSTANCE) [--async]
        [--clear-kms-keys | --[no-]enable-drop-protection
          | --kms-keys=KMS_KEY,[KMS_KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud Spanner database.

EXAMPLES
    To enable database deletion protection on a Cloud Spanner database
    'my-database', run:

        $ gcloud spanner databases update my-database \
            --enable-drop-protection

    To disable database deletion protection on a Cloud Spanner database
    'my-database', run:

        $ gcloud spanner databases update my-database \
            --no-enable-drop-protection

    To update KMS key references for a Cloud Spanner database 'my-database',
    run:

        $ gcloud spanner databases update my-database --kms-keys="KEY1,KEY2"

    To remove all KMS key references and revert a Cloud Spanner database
    'my-database' to Google-managed encryption, run:

        $ gcloud spanner databases update my-database --clear-kms-keys

POSITIONAL ARGUMENTS
     Database resource - The Cloud Spanner database to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument database on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATABASE
          ID of the database or fully qualified identifier for the database.

          To set the database attribute:
          + provide the argument database on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          The Cloud Spanner instance for the database.

          To set the instance attribute:
          + provide the argument database on the command line with a fully
            specified name;
          + provide the argument --instance on the command line;
          + set the property spanner/instance.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     At most one of these can be specified:

       --clear-kms-keys
          Removes all KMS key references and reverts the database to
          Google-managed encryption.

       --[no-]enable-drop-protection
          Enable database deletion protection on this database. Use
          --enable-drop-protection to enable and --no-enable-drop-protection to
          disable.

       --kms-keys=KMS_KEY,[KMS_KEY,...]
          Update KMS key references for this database. Users should always
          provide the full set of required KMS key references.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    When updating encryption with --kms-keys or --clear-kms-keys, the update
    operation completes after the new encryption configuration is recorded.
    Existing data is then re-encrypted in the background, which can take
    several hours. Do not disable or destroy the previous KMS key(s) until
    re-encryption finishes.

    Backups are not re-encrypted. Each backup keeps using the KMS key it was
    created with; keep that key until those backups are deleted or expire, or
    they can't be restored.

    To wait until background re-encryption finishes, run:

        $ gcloud alpha spanner databases wait-for-reencryption DATABASE \
            --instance=INSTANCE (--kms-keys="KEY1,KEY2" | --clear-kms-keys)

    Or check progress manually with:

        $ gcloud spanner databases describe DATABASE --instance=INSTANCE \
            --format="value(encryptionConfig,encryptionInfo)"

    and wait until encryptionInfo lists only the target encryption key(s) (or
    only GOOGLE_DEFAULT_ENCRYPTION for --clear-kms-keys). When transitioning
    from Google-managed encryption to CMEK, both checks report completion after
    the new key(s) are in use, which may be before all existing data has been
    re-encrypted.

    These variants are also available:

        $ gcloud alpha spanner databases update

        $ gcloud beta spanner databases update
```

### gcloud beta spanner databases update

```text
NAME
    gcloud beta spanner databases update - update a Cloud Spanner database

SYNOPSIS
    gcloud beta spanner databases update (DATABASE : --instance=INSTANCE)
        [--async]
        [--clear-kms-keys | --[no-]enable-drop-protection
          | --kms-keys=KMS_KEY,[KMS_KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner databases update

```text
NAME
    gcloud alpha spanner databases update - update a Cloud Spanner database

SYNOPSIS
    gcloud alpha spanner databases update (DATABASE : --instance=INSTANCE)
        [--async]
        [--clear-kms-keys | --[no-]enable-drop-protection
          | --kms-keys=KMS_KEY,[KMS_KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/databases/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
