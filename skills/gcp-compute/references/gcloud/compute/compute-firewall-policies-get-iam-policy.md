---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/get-iam-policy
---

# gcloud compute firewall-policies get-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute firewall-policies get-iam-policy

```text
NAME
    gcloud compute firewall-policies get-iam-policy - get the IAM policy for a
        Compute Engine organization firewall policy

SYNOPSIS
    gcloud compute firewall-policies get-iam-policy FIREWALL_POLICY
        [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the IAM policy associated with a Compute Engine organization firewall
    policy.

EXAMPLES
    To get the IAM policy for the organization firewall policy my-policy (under
    organization 123456789), run:

        $ gcloud compute firewall-policies get-iam-policy my-policy \
            --organization=123456789

    To get the IAM policy for the organization firewall policy with numeric ID
    987654321, run:

        $ gcloud compute firewall-policies get-iam-policy 987654321

POSITIONAL ARGUMENTS
     FIREWALL_POLICY
        Short name or ID of the firewall policy to get IAM policy.

FLAGS
     --organization=ORGANIZATION
        Organization ID in which the organization firewall policy is to be
        described. Must be set if FIREWALL_POLICY is short name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute firewall-policies get-iam-policy

        $ gcloud beta compute firewall-policies get-iam-policy
```

### gcloud beta compute firewall-policies get-iam-policy

```text
NAME
    gcloud beta compute firewall-policies get-iam-policy - get the IAM policy
        for a Compute Engine organization firewall policy

SYNOPSIS
    gcloud beta compute firewall-policies get-iam-policy FIREWALL_POLICY
        [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies get-iam-policy

```text
NAME
    gcloud alpha compute firewall-policies get-iam-policy - get the IAM policy
        for a Compute Engine organization firewall policy

SYNOPSIS
    gcloud alpha compute firewall-policies get-iam-policy FIREWALL_POLICY
        [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/get-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
