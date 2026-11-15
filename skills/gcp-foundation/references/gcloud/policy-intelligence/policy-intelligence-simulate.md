---
source: https://docs.cloud.google.com/sdk/gcloud/reference/policy-intelligence/simulate
---

# gcloud policy-intelligence simulate

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud policy-intelligence simulate orgpolicy

```text
NAME
    gcloud policy-intelligence simulate orgpolicy - understand how changes to
        organization policies could affect your resources

SYNOPSIS
    gcloud policy-intelligence simulate orgpolicy
        --organization=ORGANIZATION_ID
        [--custom-constraints=[CUSTOM_CONSTRAINTS,...]]
        [--policies=[POLICIES,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Understand how changes to organization policies could affect your
    resources.

EXAMPLES
    To simulate changes to custom constraints defined in
    ./custom-constraint.json, run:

        $ gcloud policy-intelligence simulate orgpolicy \
            --organization=ORGANIZATION_ID \
            --custom-constraints=custom-constraint.json

    To simulate changes to organization policies defined in ./policy.json, run:

        $ gcloud policy-intelligence simulate orgpolicy \
            --organization=ORGANIZATION_ID --policies=policy.json

    To simulate changes to both custom constraints defined in
    ./custom-constraint.json and organization policies defined in
    ./policy.json, run:

        $ gcloud policy-intelligence simulate orgpolicy \
            --organization=ORGANIZATION_ID --policies=policy.json \
            --custom-constraints=custom-constraint.json

    See
    https://cloud.google.com/policy-intelligence/docs/test-organization-policies
    for more information about Policy Simulator for Organization Policy.

REQUIRED FLAGS
     --organization=ORGANIZATION_ID
        Organization ID.

OPTIONAL FLAGS
     --custom-constraints=[CUSTOM_CONSTRAINTS,...]
        Path to the JSON or YAML file that contains the custom constraints to
        simulate. Multiple custom constraints can be simulated by providing
        multiple, comma-separated paths. For example:
        --custom-constraints=constraint1.json,constraint2.json

     --policies=[POLICIES,...]
        Path to the JSON or YAML file that contains the organization policy to
        simulate. Multiple policies can be simulated by providing multiple,
        comma-separated paths. For example: --policies=p1.json,p2.json

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta policy-intelligence simulate orgpolicy
```

### gcloud beta policy-intelligence simulate orgpolicy

```text
NAME
    gcloud beta policy-intelligence simulate orgpolicy - understand how changes
        to organization policies could affect your resources

SYNOPSIS
    gcloud beta policy-intelligence simulate orgpolicy
        --organization=ORGANIZATION_ID
        [--custom-constraints=[CUSTOM_CONSTRAINTS,...]]
        [--policies=[POLICIES,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/policy-intelligence/simulate (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
