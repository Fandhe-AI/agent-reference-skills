---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/services/set-iam-policy
---

# gcloud run services set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run services set-iam-policy

```text
NAME
    gcloud run services set-iam-policy - set the IAM policy for a service

SYNOPSIS
    gcloud run services set-iam-policy SERVICE POLICY_FILE [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command replaces the existing IAM policy for a service, given a
    service and a file encoded in JSON or YAML that contains the IAM policy. If
    the given policy file specifies an "etag" value, then the replacement will
    succeed only if the policy already in place matches that etag. (An etag
    obtain via get-iam-policy will prevent the replacement if the policy for
    the service has been subsequently updated.) A policy file that does not
    contain an etag value will replace any existing policy for the service.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for a service with identifier 'my-service'

        $ gcloud run services set-iam-policy --region=us-central1 \
            my-service policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Service resource - The service for which to set the IAM policy. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument service on the command line with a fully
        specified name;
      * provide the argument --region on the command line;
      * set the property run/region;
      * specify from a list of available regions in a prompt.

     This must be specified.

       SERVICE
          ID of the service or fully qualified identifier for the service.

          To set the service attribute:
          + provide the argument service on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

FLAGS
     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the run/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/run/

NOTES
    These variants are also available:

        $ gcloud alpha run services set-iam-policy

        $ gcloud beta run services set-iam-policy
```

### gcloud beta run services set-iam-policy

```text
NAME
    gcloud beta run services set-iam-policy - set the IAM policy for a service

SYNOPSIS
    gcloud beta run services set-iam-policy SERVICE POLICY_FILE
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run services set-iam-policy

```text
NAME
    gcloud alpha run services set-iam-policy - set the IAM policy for a service

SYNOPSIS
    gcloud alpha run services set-iam-policy SERVICE POLICY_FILE
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/services/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
