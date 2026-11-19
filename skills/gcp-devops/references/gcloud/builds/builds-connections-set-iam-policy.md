---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/connections/set-iam-policy
---

# gcloud builds connections set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds connections set-iam-policy

```text
NAME
    gcloud builds connections set-iam-policy - set the IAM policy for a Cloud
        Build connection

SYNOPSIS
    gcloud builds connections set-iam-policy (CONNECTION : --region=REGION)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy for a Cloud Build connection as defined in a JSON or
    YAML file.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the Connection named 'my-conn':

        $ gcloud builds connections set-iam-policy my-conn policy.json \
            --region=us-central1

POSITIONAL ARGUMENTS
     Connection resource - Cloud Build Connection for which to set IAM policy.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Google Cloud region.

          To set the region attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

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
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds connections set-iam-policy

        $ gcloud beta builds connections set-iam-policy
```

### gcloud beta builds connections set-iam-policy

```text
NAME
    gcloud beta builds connections set-iam-policy - set the IAM policy for a
        Cloud Build connection

SYNOPSIS
    gcloud beta builds connections set-iam-policy
        (CONNECTION : --region=REGION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections set-iam-policy

```text
NAME
    gcloud alpha builds connections set-iam-policy - set the IAM policy for a
        Cloud Build connection

SYNOPSIS
    gcloud alpha builds connections set-iam-policy
        (CONNECTION : --region=REGION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/connections/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
