---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/tables/set-iam-policy
---

# gcloud bigtable tables set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable tables set-iam-policy

```text
NAME
    gcloud bigtable tables set-iam-policy - set an IAM policy on a Cloud
        Bigtable table

SYNOPSIS
    gcloud bigtable tables set-iam-policy (TABLE : --instance=INSTANCE)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set an IAM policy on a Cloud Bigtable table.

EXAMPLES
    To set the IAM policy from file my-policy on the table my-table in instance
    my-instance, run:

        $ gcloud bigtable tables set-iam-policy my-table \
            --instance=`my-instance` my-policy

    See https://cloud.google.com/iam/docs/managing-policies for more
    information.

POSITIONAL ARGUMENTS
     Table resource - Cloud Bigtable table to set the IAM policy on. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

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

        $ gcloud alpha bigtable tables set-iam-policy

        $ gcloud beta bigtable tables set-iam-policy
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud bigtable tables set-iam-policy my-table \
    --instance='my-instance' my-policy
```

### gcloud beta bigtable tables set-iam-policy

```text
NAME
    gcloud beta bigtable tables set-iam-policy - set an IAM policy on a Cloud
        Bigtable table

SYNOPSIS
    gcloud beta bigtable tables set-iam-policy (TABLE : --instance=INSTANCE)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable tables set-iam-policy

```text
NAME
    gcloud alpha bigtable tables set-iam-policy - set an IAM policy on a Cloud
        Bigtable table

SYNOPSIS
    gcloud alpha bigtable tables set-iam-policy (TABLE : --instance=INSTANCE)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example wraps flag values in backticks (for example `` --instance=`my-instance` ``), which the shell runs as command substitutions; the runnable form passes the values in single quotes.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/tables/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
