---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/test-iam-permissions
---

# gcloud compute network-firewall-policies test-iam-permissions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-firewall-policies test-iam-permissions

```text
NAME
    gcloud compute network-firewall-policies test-iam-permissions - test IAM
        permissions for a Compute Engine network firewall policy

SYNOPSIS
    gcloud compute network-firewall-policies test-iam-permissions
        FIREWALL_POLICY --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified network firewall
    policy.

EXAMPLES
    To test if the caller has 'compute.firewallPolicies.get' permission on a
    network firewall policy my-policy, run:

        $ gcloud compute network-firewall-policies test-iam-permissions \
            my-policy --permissions=compute.firewallPolicies.get

POSITIONAL ARGUMENTS
     Firewall policy resource - The network firewall policy for which to test
     permissions. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument firewall_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       FIREWALL_POLICY
          ID of the firewall_policy or fully qualified identifier for the
          firewall_policy.

          To set the firewall_policy attribute:
          + provide the argument firewall_policy on the command line.

REQUIRED FLAGS
     --permissions=[PERMISSIONS,...]
        The permissions to test.

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

        $ gcloud alpha compute network-firewall-policies test-iam-permissions

        $ gcloud beta compute network-firewall-policies test-iam-permissions
```

### gcloud beta compute network-firewall-policies test-iam-permissions

```text
NAME
    gcloud beta compute network-firewall-policies test-iam-permissions - test
        IAM permissions for a Compute Engine network firewall policy

SYNOPSIS
    gcloud beta compute network-firewall-policies test-iam-permissions
        FIREWALL_POLICY --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies test-iam-permissions

```text
NAME
    gcloud alpha compute network-firewall-policies test-iam-permissions - test
        IAM permissions for a Compute Engine network firewall policy

SYNOPSIS
    gcloud alpha compute network-firewall-policies test-iam-permissions
        FIREWALL_POLICY --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/test-iam-permissions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
