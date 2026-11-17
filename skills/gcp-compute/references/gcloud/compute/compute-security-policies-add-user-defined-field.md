---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/add-user-defined-field
---

# gcloud compute security-policies add-user-defined-field

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute security-policies add-user-defined-field

```text
NAME
    gcloud compute security-policies add-user-defined-field - add a user
        defined field to a Compute Engine security policy

SYNOPSIS
    gcloud compute security-policies add-user-defined-field NAME --base=BASE
        --offset=OFFSET --size=SIZE
        --user-defined-field-name=USER_DEFINED_FIELD_NAME [--mask=MASK]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute security-policies add-user-defined-field is used to add user
    defined fields to security policies.

EXAMPLES
    To add a user defined field run this:

        $ gcloud compute security-policies add-user-defined-field \
            SECURITY_POLICY --user-defined-field-name=my-field --base=ipv6 \
            --offset=10 --size=3

POSITIONAL ARGUMENTS
     NAME
        Name of the security policy to update.

REQUIRED FLAGS
     --base=BASE
        The base relative to which offset is measured. BASE must be one of:
        ipv4, ipv6, tcp, udp.

     --offset=OFFSET
        Offset of the first byte of the field (in network byte order) relative
        to base.

     --size=SIZE
        Size of the field in bytes. Valid values: 1-4.

     --user-defined-field-name=USER_DEFINED_FIELD_NAME
        The name for the user defined field.

OPTIONAL FLAGS
     --mask=MASK
        If specified, apply this mask (bitwise AND) to the field to ignore bits
        before matching. Encoded as a hexadecimal number (starting with "0x").

     --region=REGION
        Region of the security policy to update. Overrides the default
        compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute security-policies add-user-defined-field

        $ gcloud beta compute security-policies add-user-defined-field
```

### gcloud beta compute security-policies add-user-defined-field

```text
NAME
    gcloud beta compute security-policies add-user-defined-field - add a user
        defined field to a Compute Engine security policy

SYNOPSIS
    gcloud beta compute security-policies add-user-defined-field NAME
        --base=BASE --offset=OFFSET --size=SIZE
        --user-defined-field-name=USER_DEFINED_FIELD_NAME [--mask=MASK]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute security-policies add-user-defined-field

```text
NAME
    gcloud alpha compute security-policies add-user-defined-field - add a user
        defined field to a Compute Engine security policy

SYNOPSIS
    gcloud alpha compute security-policies add-user-defined-field NAME
        --base=BASE --offset=OFFSET --size=SIZE
        --user-defined-field-name=USER_DEFINED_FIELD_NAME [--mask=MASK]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/add-user-defined-field (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
