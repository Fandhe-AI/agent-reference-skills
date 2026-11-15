---
source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/set-iam-policy
---

# gcloud functions set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud functions set-iam-policy

```text
NAME
    gcloud functions set-iam-policy - sets IAM policy for a Google Cloud
        Function

SYNOPSIS
    gcloud functions set-iam-policy (NAME : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets IAM policy for a Google Cloud Function.

EXAMPLES
    To set the iam policy for FUNCTION-1 to the policy defined in POLICY-FILE-1
    run:

        $ gcloud functions set-iam-policy FUNCTION-1 POLICY-FILE-1

POSITIONAL ARGUMENTS
     Function resource - The Cloud Function name to get IAM policy for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument NAME on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the function or fully qualified identifier for the function.

          To set the function attribute:
          + provide the argument NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the function. Overrides the default
          functions/region property value for this command invocation.

          To set the region attribute:
          + provide the argument NAME on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property functions/region.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha functions set-iam-policy

        $ gcloud beta functions set-iam-policy
```

### gcloud beta functions set-iam-policy

```text
NAME
    gcloud beta functions set-iam-policy - sets IAM policy for a Google Cloud
        Function

SYNOPSIS
    gcloud beta functions set-iam-policy (NAME : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha functions set-iam-policy

```text
NAME
    gcloud alpha functions set-iam-policy - sets IAM policy for a Google Cloud
        Function

SYNOPSIS
    gcloud alpha functions set-iam-policy (NAME : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
