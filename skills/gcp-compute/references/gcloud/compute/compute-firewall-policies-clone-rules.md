---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/clone-rules
---

# gcloud compute firewall-policies clone-rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute firewall-policies clone-rules

```text
NAME
    gcloud compute firewall-policies clone-rules - replace the rules of a
        Compute Engine organization firewall policy with rules from another
        policy

SYNOPSIS
    gcloud compute firewall-policies clone-rules FIREWALL_POLICY
        --source-firewall-policy=SOURCE_FIREWALL_POLICY
        [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute firewall-policies clone-rules is used to replace the rules
    of organization firewall policies. An organization firewall policy is a set
    of rules that controls access to various resources.

EXAMPLES
    To clone the rules of an organization firewall policy with ID ``123456789",
    from another organization firewall policy with ID ``987654321", run:

        $ gcloud compute firewall-policies clone-rules 123456789 \
            --source-firewall-policy=987654321

POSITIONAL ARGUMENTS
     FIREWALL_POLICY
        Short name or ID of the firewall policy to clone the rules to.

REQUIRED FLAGS
     --source-firewall-policy=SOURCE_FIREWALL_POLICY
        The URL of the source firewall policy to copy the rules from.

OPTIONAL FLAGS
     --organization=ORGANIZATION
        Organization in which the organization firewall policy to copy the
        rules to. Must be set if firewall-policy is short name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

IAM PERMISSIONS
    To clone rules to a firewall policy, the user must have the following
    permission: compute.firewallPolicies.cloneRules.

    To find predefined roles that contain those permissions, see the Compute
    Engine IAM roles (https://cloud.google.com/compute/docs/access/iam).

NOTES
    These variants are also available:

        $ gcloud alpha compute firewall-policies clone-rules

        $ gcloud beta compute firewall-policies clone-rules
```

### gcloud beta compute firewall-policies clone-rules

```text
NAME
    gcloud beta compute firewall-policies clone-rules - replace the rules of a
        Compute Engine organization firewall policy with rules from another
        policy

SYNOPSIS
    gcloud beta compute firewall-policies clone-rules FIREWALL_POLICY
        --source-firewall-policy=SOURCE_FIREWALL_POLICY
        [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies clone-rules

```text
NAME
    gcloud alpha compute firewall-policies clone-rules - replace the rules of a
        Compute Engine organization firewall policy with rules from another
        policy

SYNOPSIS
    gcloud alpha compute firewall-policies clone-rules FIREWALL_POLICY
        --source-firewall-policy=SOURCE_FIREWALL_POLICY
        [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/clone-rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
