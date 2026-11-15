---
source: https://docs.cloud.google.com/sdk/gcloud/reference/components/update
---

# gcloud components update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud components update

```text
NAME
    gcloud components update - update all of your installed components to the
        latest version

SYNOPSIS
    gcloud components update [--version=VERSION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Ensure that the latest version of all installed components is installed on
    the local workstation.

    The command lists all components it is about to update, and asks for
    confirmation before proceeding.

    By default, this command will update all components to their latest
    version. This can be configured by using the --version flag to choose a
    specific version to update to. This version may also be a version older
    than the one that is currently installed, thus allowing you to downgrade
    your Google Cloud CLI installation.

    You can see your current Google Cloud CLI version by running:

        $ gcloud version

    To see the latest version of the Google Cloud CLI, run:

        $ gcloud components list

    If you run this command without the --version flag and you already have the
    latest version installed, no update will be performed.

EXAMPLES
    To update all installed components to the latest version:

        $ gcloud components update

    To update all installed components to a fixed Google Cloud CLI version
    1.2.3:

        $ gcloud components update --version=1.2.3

FLAGS
     --version=VERSION
        An optional Google Cloud CLI version to update your components to. By
        default, components are updated to the latest available version. By
        selecting an older version you can downgrade your Google Cloud CLI
        installation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
