---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/create
---

# gcloud compute security-policies create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute security-policies create

```text
NAME
    gcloud compute security-policies create - create a Compute Engine security
        policy

SYNOPSIS
    gcloud compute security-policies create NAME [--description=DESCRIPTION]
        [--file-format=FILE_FORMAT]
        [--file-name=FILE_NAME | --type=SECURITY_POLICY_TYPE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute security-policies create is used to create security
    policies. A security policy policy is a set of rules that controls access
    to various resources.

EXAMPLES
    To create a security policy with a given type and description, run:

        $ gcloud compute security-policies create my-policy \
            --type=CLOUD_ARMOR_EDGE --description="policy description"

    To create a security from an input file, run:

        $ gcloud compute security-policies create my-policy \
            --file-name=my-file-name

POSITIONAL ARGUMENTS
     NAME
        Name of the security policy to create.

FLAGS
     --description=DESCRIPTION
        An optional, textual description for the security policy.

     --file-format=FILE_FORMAT
        The format of the file to create the security policy config from.
        Specify either yaml or json. Defaults to yaml if not specified. Will be
        ignored if --file-name is not specified. FILE_FORMAT must be one of:
        json, yaml.

     Creation options.

     At most one of these can be specified:

       --file-name=FILE_NAME
          The name of the JSON or YAML file to create a security policy config
          from.

       --type=SECURITY_POLICY_TYPE
          The type indicates the intended use of the security policy.
          SECURITY_POLICY_TYPE must be one of: CLOUD_ARMOR, CLOUD_ARMOR_EDGE,
          CLOUD_ARMOR_NETWORK.

     At most one of these can be specified:

       --global
          If set, the security policy is global.

       --region=REGION
          Region of the security policy to create. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute security-policies create

        $ gcloud beta compute security-policies create
```

### gcloud beta compute security-policies create

```text
NAME
    gcloud beta compute security-policies create - create a Compute Engine
        security policy

SYNOPSIS
    gcloud beta compute security-policies create NAME
        [--description=DESCRIPTION] [--file-format=FILE_FORMAT]
        [--file-name=FILE_NAME | --type=SECURITY_POLICY_TYPE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute security-policies create

```text
NAME
    gcloud alpha compute security-policies create - create a Compute Engine
        security policy

SYNOPSIS
    gcloud alpha compute security-policies create NAME
        [--description=DESCRIPTION] [--file-format=FILE_FORMAT]
        [--file-name=FILE_NAME | --type=SECURITY_POLICY_TYPE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
