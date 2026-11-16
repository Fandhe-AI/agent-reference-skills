---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/tables/describe
---

# gcloud bigtable tables describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable tables describe

```text
NAME
    gcloud bigtable tables describe - retrieve information about a table

SYNOPSIS
    gcloud bigtable tables describe (TABLE : --instance=INSTANCE)
        [--view=VIEW; default="schema"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve information about a table.

EXAMPLES
    To describe a table, run:

        $ gcloud bigtable tables describe TABLE_NAME --instance=INSTANCE_NAME

POSITIONAL ARGUMENTS
     Table resource - Cloud Bigtable table to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument table on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TABLE
          ID of the table or fully qualified identifier for the table.

          To set the table attribute:
          + provide the argument table on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Name of the Bigtable instance.

          To set the instance attribute:
          + provide the argument table on the command line with a fully
            specified name;
          + provide the argument --instance on the command line.

FLAGS
     --view=VIEW; default="schema"
        The view to be applied to the returned table's fields. VIEW must be one
        of:

         encryption
            Only populates name and fields related to the table's encryption
            status.
         full
            Populates all fields.
         name
            Only populates name.
         replication
            Only populates name and fields related to the table's replication.
         schema
            Only populates name and fields related to the table's schema.
         stats
            Only populates name and fields related to the table's statistics
            (e.g. TableStats and ColumnFamilyStats).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the bigtableadmin/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/bigtable/

NOTES
    These variants are also available:

        $ gcloud alpha bigtable tables describe

        $ gcloud beta bigtable tables describe
```

### gcloud beta bigtable tables describe

```text
NAME
    gcloud beta bigtable tables describe - retrieve information about a table

SYNOPSIS
    gcloud beta bigtable tables describe (TABLE : --instance=INSTANCE)
        [--view=VIEW; default="schema"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable tables describe

```text
NAME
    gcloud alpha bigtable tables describe - retrieve information about a table

SYNOPSIS
    gcloud alpha bigtable tables describe (TABLE : --instance=INSTANCE)
        [--view=VIEW; default="schema"] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/tables/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
