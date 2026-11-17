---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/set-iam-policy
---

# gcloud compute instances set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances set-iam-policy

```text
NAME
    gcloud compute instances set-iam-policy - set IAM policy for a Compute
        Engine instance

SYNOPSIS
    gcloud compute instances set-iam-policy (INSTANCE : --zone=ZONE)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set IAM policy for a Compute Engine instance.

EXAMPLES
    The following command reads an IAM policy defined in a JSON file
    policy.json and sets it for the instance 'my-instance' and zone 'ZONE':

        $ gcloud compute instances set-iam-policy my-instance --zone=ZONE \
            policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Instance resource - The instance to set the IAM policy of. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

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
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute instances set-iam-policy

        $ gcloud beta compute instances set-iam-policy
```

### gcloud beta compute instances set-iam-policy

```text
NAME
    gcloud beta compute instances set-iam-policy - set IAM policy for a Compute
        Engine instance

SYNOPSIS
    gcloud beta compute instances set-iam-policy (INSTANCE : --zone=ZONE)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances set-iam-policy

```text
NAME
    gcloud alpha compute instances set-iam-policy - set IAM policy for a
        Compute Engine instance

SYNOPSIS
    gcloud alpha compute instances set-iam-policy (INSTANCE : --zone=ZONE)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
