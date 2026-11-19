---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/tasks/set-iam-policy
---

# gcloud dataplex tasks set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex tasks set-iam-policy

```text
NAME
    gcloud dataplex tasks set-iam-policy - set the IAM policy to a Dataplex
        task as defined in a JSON or YAML file

SYNOPSIS
    gcloud dataplex tasks set-iam-policy
        (TASK : --lake=LAKE --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    policy.json and set it for the Dataplex task test-task within lake
    test-lake in location us-central1:

        $ gcloud dataplex tasks set-iam-policy --lake=test-lake \
            --location=us-central1 test-task policy.json

POSITIONAL ARGUMENTS
     Tasks resource - Arguments and flags that define the Dataplex task you
     want to set IAM policy to. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument task on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TASK
          ID of the tasks or fully qualified identifier for the tasks.

          To set the task attribute:
          + provide the argument task on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          The identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument task on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument task on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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

NOTES
    This variant is also available:

        $ gcloud alpha dataplex tasks set-iam-policy
```

### gcloud alpha dataplex tasks set-iam-policy

```text
NAME
    gcloud alpha dataplex tasks set-iam-policy - set the IAM policy to a
        Dataplex task as defined in a JSON or YAML file

SYNOPSIS
    gcloud alpha dataplex tasks set-iam-policy
        (TASK : --lake=LAKE --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/tasks/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
