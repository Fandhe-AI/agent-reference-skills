---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/import
---

# gcloud compute security-policies import

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute security-policies import

```text
NAME
    gcloud compute security-policies import - import security policy configs
        into your project

SYNOPSIS
    gcloud compute security-policies import NAME --file-name=FILE_NAME
        [--file-format=FILE_FORMAT] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute security-policies import imports a security policy to update
    an existing policy. To create a new policy from a file please use the
    create command instead.

EXAMPLES
    To import a security policy from a YAML file run this:

        $ gcloud compute security-policies import --file-name=myFile

POSITIONAL ARGUMENTS
     NAME
        Name of the security policy to import.

REQUIRED FLAGS
     --file-name=FILE_NAME
        The name of the JSON or YAML file to import the security policy config
        from.

OPTIONAL FLAGS
     --file-format=FILE_FORMAT
        The format of the file to import the security policy config from.
        Specify either yaml or json. Defaults to yaml if not specified.
        FILE_FORMAT must be one of: json, yaml.

     At most one of these can be specified:

       --global
          If set, the security policy is global.

       --region=REGION
          Region of the security policy to import. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute security-policies import

        $ gcloud beta compute security-policies import
```

### gcloud beta compute security-policies import

```text
NAME
    gcloud beta compute security-policies import - import security policy
        configs into your project

SYNOPSIS
    gcloud beta compute security-policies import NAME --file-name=FILE_NAME
        [--file-format=FILE_FORMAT] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute security-policies import

```text
NAME
    gcloud alpha compute security-policies import - import security policy
        configs into your project

SYNOPSIS
    gcloud alpha compute security-policies import NAME --file-name=FILE_NAME
        [--file-format=FILE_FORMAT] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/import (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
