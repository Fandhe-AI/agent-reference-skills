---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/autokey-config
---

# gcloud kms autokey-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms autokey-config describe

```text
NAME
    gcloud kms autokey-config describe - describe the AutokeyConfig of a folder
        or project

SYNOPSIS
    gcloud kms autokey-config describe (--folder=FOLDER | --project=PROJECT)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud kms autokey-config describe can be used to retrieve the
    AutokeyConfig of a folder or project.

EXAMPLES
    The following command retrieves the AutokeyConfig of a folder having
    folder-id 123:

        $ gcloud kms autokey-config describe --folder=123

    The following command retrieves the AutokeyConfig of a project having
    project-id my-project:

        $ gcloud kms autokey-config describe --project=my-project

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER
          The folder id in which the AutokeyConfig resource exists.

       --project=PROJECT
          The project id in which the AutokeyConfig resource exists.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms autokey-config describe

        $ gcloud beta kms autokey-config describe
```

### gcloud kms autokey-config show-effective-config

```text
NAME
    gcloud kms autokey-config show-effective-config - get the effective Cloud
        KMS AutokeyConfig for a given folder or project

SYNOPSIS
    gcloud kms autokey-config show-effective-config
        [--folder=FOLDER | --project=PROJECT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud kms autokey-config show-effective-config can be used to get the
    effective Cloud KMS AutokeyConfig for a given folder or project.

EXAMPLES
    The following command retrieves the effective Cloud KMS AutokeyConfig for a
    given folder 123:

        $ gcloud kms autokey-config show-effective-config --folder=123

    The following command retrieves the effective Cloud KMS AutokeyConfig for a
    given project my-project:

        $ gcloud kms autokey-config show-effective-config \
            --project=my-project

    If neither flag is provided, then the current project will be used.

FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          The folder id in which the AutokeyConfig resource exists.

       --project=PROJECT
          The project id in which the AutokeyConfig resource exists.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms autokey-config show-effective-config

        $ gcloud beta kms autokey-config show-effective-config
```

### gcloud kms autokey-config update

```text
NAME
    gcloud kms autokey-config update - update the AutokeyConfig for a folder or
        project

SYNOPSIS
    gcloud kms autokey-config update CONFIG_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud kms autokey-config update can be used to update the AutokeyConfig
    for a folder or project.

EXAMPLES
    The following command updates the AutokeyConfig for the folder or project
    mentioned in the config.yaml file:

        $ gcloud kms autokey-config update config.yaml

POSITIONAL ARGUMENTS
     CONFIG_FILE
        The file containing the AutokeyConfig resource.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms autokey-config update

        $ gcloud beta kms autokey-config update
```

### gcloud beta kms autokey-config describe

```text
NAME
    gcloud beta kms autokey-config describe - describe the AutokeyConfig of a
        folder or project

SYNOPSIS
    gcloud beta kms autokey-config describe
        (--folder=FOLDER | --project=PROJECT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms autokey-config show-effective-config

```text
NAME
    gcloud beta kms autokey-config show-effective-config - get the effective
        Cloud KMS AutokeyConfig for a given folder or project

SYNOPSIS
    gcloud beta kms autokey-config show-effective-config
        [--folder=FOLDER | --project=PROJECT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms autokey-config update

```text
NAME
    gcloud beta kms autokey-config update - update the AutokeyConfig for a
        folder or project

SYNOPSIS
    gcloud beta kms autokey-config update CONFIG_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms autokey-config describe

```text
NAME
    gcloud alpha kms autokey-config describe - describe the AutokeyConfig of a
        folder or project

SYNOPSIS
    gcloud alpha kms autokey-config describe
        (--folder=FOLDER | --project=PROJECT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms autokey-config show-effective-config

```text
NAME
    gcloud alpha kms autokey-config show-effective-config - get the effective
        Cloud KMS AutokeyConfig for a given folder or project

SYNOPSIS
    gcloud alpha kms autokey-config show-effective-config
        [--folder=FOLDER | --project=PROJECT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms autokey-config update

```text
NAME
    gcloud alpha kms autokey-config update - update the AutokeyConfig for a
        folder or project

SYNOPSIS
    gcloud alpha kms autokey-config update CONFIG_FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/autokey-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
