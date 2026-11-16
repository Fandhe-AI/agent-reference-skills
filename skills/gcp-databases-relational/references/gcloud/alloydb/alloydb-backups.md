---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/backups
---

# gcloud alloydb backups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alloydb backups create

```text
NAME
    gcloud alloydb backups create - creates a new AlloyDB backup within a given
        project

SYNOPSIS
    gcloud alloydb backups create BACKUP --cluster=CLUSTER --region=REGION
        [--async] [--tags=[KEY=VALUE,...]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new AlloyDB backup within a given project.

EXAMPLES
    To create a new backup, run:

        $ gcloud alloydb backups create my-backup --cluster=my-cluster \
            --region=us-central1

    To create a new cross-region backup, run:

        $ gcloud alloydb backups create \
            projects/my-project/locations/us-west1/backups/my-backup \
            --cluster=my-cluster --region=us-central1

POSITIONAL ARGUMENTS
     BACKUP
        The AlloyDB backup to create. This must either be the backup ID
        (myBackup) or the full backup path
        (projects/myProject/locations/us-central1/backups/myBackup). In the
        first case, the project and location are assumed to be the same as the
        cluster being backed up. The second form can be used to create
        cross-region and cross-project backups.

REQUIRED FLAGS
     --cluster=CLUSTER
        AlloyDB cluster ID

     --region=REGION
        The region of the cluster to backup.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be expressed as
        <tag-key-namespaced-name>=<tag-value-short-name>.

        Example: 123/environment=production,123/costCenter=marketing

     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the backup. The 'AlloyDB Service Agent' service account
     must hold permission 'Cloud KMS CryptoKey Encrypter/Decrypter'. The
     arguments in this group can be used to specify the attributes of this
     resource.

     --kms-key=KMS_KEY
        ID of the key or fully qualified identifier for the key.

        To set the kms-key attribute:
        * provide the argument --kms-key on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --kms-keyring=KMS_KEYRING
        The KMS keyring of the key.

        To set the kms-keyring attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-keyring on the command line.

     --kms-location=KMS_LOCATION
        The Google Cloud location for the key.

        To set the kms-location attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-location on the command line.

     --kms-project=KMS_PROJECT
        The Google Cloud project for the key.

        To set the kms-project attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-project on the command line;
        * set the property core/project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb backups create

        $ gcloud beta alloydb backups create
```

### gcloud alloydb backups delete

```text
NAME
    gcloud alloydb backups delete - deletes an AlloyDB backup within a given
        project

SYNOPSIS
    gcloud alloydb backups delete BACKUP --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes an AlloyDB backup within a given project.

EXAMPLES
    To delete a backup, run:

        $ gcloud alloydb backups delete my-backup --region=us-central1

POSITIONAL ARGUMENTS
     BACKUP
        AlloyDB backup ID

REQUIRED FLAGS
     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

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

NOTES
    These variants are also available:

        $ gcloud alpha alloydb backups delete

        $ gcloud beta alloydb backups delete
```

### gcloud alloydb backups describe

```text
NAME
    gcloud alloydb backups describe - describes an AlloyDB backup in a given
        project and region

SYNOPSIS
    gcloud alloydb backups describe BACKUP --region=REGION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes an AlloyDB backup in a given project and region.

EXAMPLES
    To describe a backup, run:

        $ gcloud alloydb backups describe my-backup --region=us-central1

POSITIONAL ARGUMENTS
     BACKUP
        AlloyDB backup ID

REQUIRED FLAGS
     --region=REGION
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb backups describe

        $ gcloud beta alloydb backups describe
```

### gcloud alloydb backups list

```text
NAME
    gcloud alloydb backups list - lists AlloyDB backups in a given project

SYNOPSIS
    gcloud alloydb backups list [--region=REGION; default="-"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists AlloyDB backups in a given project in the alphabetical order of the
    backup name.

EXAMPLES
    To list backups, run:

        $ gcloud alloydb backups list --region=us-central1

    Use the --format flag to customize the fields that are outputted. For
    example, to list backups with their names and sizes, run:

        $ gcloud alloydb backups list --region=us-central1 \
            --format="table(name, size_bytes)"

FLAGS
     --region=REGION; default="-"
        Regional location (e.g. asia-east1, us-east1). See the full list of
        regions at https://cloud.google.com/sql/docs/instance-locations.
        Default: list clusters in all regions.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha alloydb backups list

        $ gcloud beta alloydb backups list
```

### gcloud beta alloydb backups create

```text
NAME
    gcloud beta alloydb backups create - create a new AlloyDB backup within a
        given project

SYNOPSIS
    gcloud beta alloydb backups create BACKUP --cluster=CLUSTER --region=REGION
        [--async] [--tags=[KEY=VALUE,...]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb backups delete

```text
NAME
    gcloud beta alloydb backups delete - deletes an AlloyDB backup within a
        given project

SYNOPSIS
    gcloud beta alloydb backups delete BACKUP --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb backups describe

```text
NAME
    gcloud beta alloydb backups describe - describes an AlloyDB backup in a
        given project and region

SYNOPSIS
    gcloud beta alloydb backups describe BACKUP --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta alloydb backups list

```text
NAME
    gcloud beta alloydb backups list - lists AlloyDB backups in a given project

SYNOPSIS
    gcloud beta alloydb backups list [--region=REGION; default="-"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb backups create

```text
NAME
    gcloud alpha alloydb backups create - create a new AlloyDB backup within a
        given project

SYNOPSIS
    gcloud alpha alloydb backups create BACKUP --cluster=CLUSTER
        --region=REGION [--async] [--tags=[KEY=VALUE,...]]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb backups delete

```text
NAME
    gcloud alpha alloydb backups delete - deletes an AlloyDB backup within a
        given project

SYNOPSIS
    gcloud alpha alloydb backups delete BACKUP --region=REGION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb backups describe

```text
NAME
    gcloud alpha alloydb backups describe - describes an AlloyDB backup in a
        given project and region

SYNOPSIS
    gcloud alpha alloydb backups describe BACKUP --region=REGION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb backups list

```text
NAME
    gcloud alpha alloydb backups list - lists AlloyDB backups in a given
        project

SYNOPSIS
    gcloud alpha alloydb backups list [--region=REGION; default="-"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/backups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
