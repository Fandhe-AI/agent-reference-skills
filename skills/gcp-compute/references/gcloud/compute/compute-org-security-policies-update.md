---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/update
---

# gcloud compute org-security-policies update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute org-security-policies update

```text
NAME
    gcloud compute org-security-policies update - update a Compute Engine
        organization security policy

SYNOPSIS
    gcloud compute org-security-policies update SECURITY_POLICY
        [--description=DESCRIPTION]
        [--json-custom-content-types=[CONTENT_TYPE,...]]
        [--json-parsing=JSON_PARSING] [--log-level=LOG_LEVEL]
        [--organization=ORGANIZATION]
        [--user-ip-request-headers=[USER_IP_REQUEST_HEADER,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies update is used to update organization
    security policies. An organization security policy is a set of rules that
    controls access to various resources.

EXAMPLES
    To update an organization security policy with ID 123456789 to change the
    description to New description, run:

        $ gcloud compute org-security-policies update 123456789 \
            --description='New description'

POSITIONAL ARGUMENTS
     SECURITY_POLICY
        Short name or ID of the security policy to update.

FLAGS
     --description=DESCRIPTION
        An optional, textual description for the organization security policy.

     --json-custom-content-types=[CONTENT_TYPE,...]
        A comma-separated list of custom Content-Type header values to apply
        JSON parsing for preconfigured WAF rules. Only applicable when JSON
        parsing is enabled, like --json-parsing=STANDARD. When configuring a
        Content-Type header value, only the type/subtype needs to be specified,
        and the parameters should be excluded.

     --json-parsing=JSON_PARSING
        The JSON parsing behavior for this rule. Must be one of the following
        values: [DISABLED, STANDARD, STANDARD_WITH_GRAPHQL]. JSON_PARSING must
        be one of: DISABLED, STANDARD, STANDARD_WITH_GRAPHQL.

     --log-level=LOG_LEVEL
        The level of detail to display for WAF logging. LOG_LEVEL must be one
        of: NORMAL, VERBOSE.

     --organization=ORGANIZATION
        Organization in which the organization security policy is to be
        updated. Must be set if SECURITY_POLICY is the short name.

     --user-ip-request-headers=[USER_IP_REQUEST_HEADER,...]
        A comma-separated list of request header names to use for resolving the
        caller's user IP address.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies update

        $ gcloud beta compute org-security-policies update
```

### gcloud beta compute org-security-policies update

```text
NAME
    gcloud beta compute org-security-policies update - update a Compute Engine
        organization security policy

SYNOPSIS
    gcloud beta compute org-security-policies update SECURITY_POLICY
        [--description=DESCRIPTION]
        [--json-custom-content-types=[CONTENT_TYPE,...]]
        [--json-parsing=JSON_PARSING] [--log-level=LOG_LEVEL]
        [--organization=ORGANIZATION]
        [--user-ip-request-headers=[USER_IP_REQUEST_HEADER,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies update

```text
NAME
    gcloud alpha compute org-security-policies update - update a Compute Engine
        organization security policy

SYNOPSIS
    gcloud alpha compute org-security-policies update SECURITY_POLICY
        [--description=DESCRIPTION]
        [--json-custom-content-types=[CONTENT_TYPE,...]]
        [--json-parsing=JSON_PARSING] [--log-level=LOG_LEVEL]
        [--organization=ORGANIZATION]
        [--user-ip-request-headers=[USER_IP_REQUEST_HEADER,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
