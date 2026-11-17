---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/delete
---

# gcloud compute org-security-policies delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute org-security-policies delete

```text
NAME
    gcloud compute org-security-policies delete - delete a Compute Engine
        organization security policy

SYNOPSIS
    gcloud compute org-security-policies delete SECURITY_POLICY
        [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies delete is used to delete organization
    security policies. An organization security policy is a set of rules that
    controls access to various resources.

EXAMPLES
    To delete an organization security policy with ID 123456789, run:

        $ gcloud compute org-security-policies delete 123456789

POSITIONAL ARGUMENTS
     SECURITY_POLICY
        Short name or ID of the security policy to delete.

FLAGS
     --organization=ORGANIZATION
        Organization in which the organization security policy is to be
        deleted. Must be set if SECURITY_POLICY is short name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies delete

        $ gcloud beta compute org-security-policies delete
```

### gcloud beta compute org-security-policies delete

```text
NAME
    gcloud beta compute org-security-policies delete - delete a Compute Engine
        organization security policy

SYNOPSIS
    gcloud beta compute org-security-policies delete SECURITY_POLICY
        [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies delete

```text
NAME
    gcloud alpha compute org-security-policies delete - delete a Compute Engine
        organization security policy

SYNOPSIS
    gcloud alpha compute org-security-policies delete SECURITY_POLICY
        [--organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
