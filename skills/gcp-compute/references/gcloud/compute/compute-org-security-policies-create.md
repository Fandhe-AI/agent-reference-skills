---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/create
---

# gcloud compute org-security-policies create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute org-security-policies create

```text
NAME
    gcloud compute org-security-policies create - create a Compute Engine
        organization security policy

SYNOPSIS
    gcloud compute org-security-policies create
        (--folder=FOLDER | --organization=ORGANIZATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--file-format=FILE_FORMAT] [--short-name=SHORT_NAME]
        [--file-name=FILE_NAME | --type=SECURITY_POLICY_TYPE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies create is used to create organization
    security policies. An organization security policy is a set of rules that
    controls access to various resources.

EXAMPLES
    To create an organization security policy under folder with ID 123456789,
    run:

        $ gcloud compute org-security-policies create \
            --short-name=my-policy --folder=123456789

    To create an organization security under organization with ID 12345 from an
    input file, run:

        $ gcloud compute org-security-policies create \
            --file-name=my-file-name --organization=12345

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER
          Folder in which the organization security policy is to be created.

       --organization=ORGANIZATION
          Organization in which the organization security policy is to be
          created.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the organization security policy.

     --display-name=DISPLAY_NAME
        A textual name of the security policy.

     --file-format=FILE_FORMAT
        The format of the file to create the organization security policy
        config from. Specify either yaml or json. Defaults to yaml if not
        specified. Will be ignored if --file-name is not specified. FILE_FORMAT
        must be one of: json, yaml.

     --short-name=SHORT_NAME
        A textual name of the security policy.

     Creation options.

     At most one of these can be specified:

       --file-name=FILE_NAME
          The name of the JSON or YAML file to create a organization security
          policy config from.

       --type=SECURITY_POLICY_TYPE
          The type indicates the intended use of the organization security
          policy. SECURITY_POLICY_TYPE must be one of: CLOUD_ARMOR, FIREWALL.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies create

        $ gcloud beta compute org-security-policies create
```

### gcloud beta compute org-security-policies create

```text
NAME
    gcloud beta compute org-security-policies create - create a Compute Engine
        organization security policy

SYNOPSIS
    gcloud beta compute org-security-policies create
        (--folder=FOLDER | --organization=ORGANIZATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--file-format=FILE_FORMAT] [--short-name=SHORT_NAME]
        [--file-name=FILE_NAME | --type=SECURITY_POLICY_TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies create

```text
NAME
    gcloud alpha compute org-security-policies create - create a Compute Engine
        organization security policy

SYNOPSIS
    gcloud alpha compute org-security-policies create
        (--folder=FOLDER | --organization=ORGANIZATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--file-format=FILE_FORMAT] [--short-name=SHORT_NAME]
        [--file-name=FILE_NAME | --type=SECURITY_POLICY_TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
