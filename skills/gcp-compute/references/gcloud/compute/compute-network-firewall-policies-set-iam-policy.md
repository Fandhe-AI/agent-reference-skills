---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/set-iam-policy
---

# gcloud compute network-firewall-policies set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-firewall-policies set-iam-policy

```text
NAME
    gcloud compute network-firewall-policies set-iam-policy - set the IAM
        policy binding for a Compute Engine network firewall policy

SYNOPSIS
    gcloud compute network-firewall-policies set-iam-policy FIREWALL_POLICY
        POLICY_FILE [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given network firewall policy as defined in a
    JSON or YAML file.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the global network firewall policy my-policy:

        $ gcloud compute network-firewall-policies set-iam-policy \
            my-policy policy.json --global

    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the regional network firewall policy my-policy
    (in region REGION):

        $ gcloud compute network-firewall-policies set-iam-policy \
            my-policy policy.json --region=REGION

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     FIREWALL_POLICY
        name of the network firewall policy to set IAM policy.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

FLAGS
     At most one of these can be specified:

       --global
          If set, the firewall policy is global.

       --region=REGION
          Region of the firewall policy to get. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-firewall-policies set-iam-policy

        $ gcloud beta compute network-firewall-policies set-iam-policy
```

### gcloud beta compute network-firewall-policies set-iam-policy

```text
NAME
    gcloud beta compute network-firewall-policies set-iam-policy - set the IAM
        policy binding for a Compute Engine network firewall policy

SYNOPSIS
    gcloud beta compute network-firewall-policies set-iam-policy
        FIREWALL_POLICY POLICY_FILE [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies set-iam-policy

```text
NAME
    gcloud alpha compute network-firewall-policies set-iam-policy - set the IAM
        policy binding for a Compute Engine network firewall policy

SYNOPSIS
    gcloud alpha compute network-firewall-policies set-iam-policy
        FIREWALL_POLICY POLICY_FILE [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
