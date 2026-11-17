---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/set-iam-policy
---

# gcloud compute interconnects groups set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects groups set-iam-policy

```text
NAME
    gcloud compute interconnects groups set-iam-policy - set the IAM policy for
        a Compute Engine interconnect group

SYNOPSIS
    gcloud compute interconnects groups set-iam-policy INTERCONNECT_GROUP
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given interconnect group as defined in a JSON
    or YAML file.

EXAMPLES
    To set the IAM policy for the interconnect group my-interconnect-group
    using a policy defined in the JSON file policy.json, run:

        $ gcloud compute interconnects groups set-iam-policy \
            my-interconnect-group policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Interconnect group resource - The interconnect group to set the IAM policy
     for. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument interconnect_group on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCONNECT_GROUP
          ID of the interconnect_group or fully qualified identifier for the
          interconnect_group.

          To set the interconnect_group attribute:
          + provide the argument interconnect_group on the command line.

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

        $ gcloud alpha compute interconnects groups set-iam-policy

        $ gcloud beta compute interconnects groups set-iam-policy
```

### gcloud beta compute interconnects groups set-iam-policy

```text
NAME
    gcloud beta compute interconnects groups set-iam-policy - set the IAM
        policy for a Compute Engine interconnect group

SYNOPSIS
    gcloud beta compute interconnects groups set-iam-policy INTERCONNECT_GROUP
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects groups set-iam-policy

```text
NAME
    gcloud alpha compute interconnects groups set-iam-policy - set the IAM
        policy for a Compute Engine interconnect group

SYNOPSIS
    gcloud alpha compute interconnects groups set-iam-policy INTERCONNECT_GROUP
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
