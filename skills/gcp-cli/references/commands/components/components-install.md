---
source: https://docs.cloud.google.com/sdk/gcloud/reference/components/install
---

# gcloud components install

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud components install

```text
NAME
    gcloud components install - install one or more Google Cloud CLI components

SYNOPSIS
    gcloud components install COMPONENT-IDS [COMPONENT-IDS ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Ensure that each of the specified components (as well as any dependent
    components) is installed on the local workstation. Components are installed
    without performing any upgrades to your existing CLI installation. All
    components are installed at the current version of your CLI.

    Components that are available for installation can be viewed by running:

        $ gcloud components list

    Installing a given component will also install all components on which it
    depends. The command lists all components it is about to install, and asks
    for confirmation before proceeding.

    gcloud components install installs components from the version of the
    Google Cloud CLI you currently have installed. You can see your current
    version by running:

        $ gcloud version

    If you want to update your Google Cloud CLI installation to the latest
    available version, use:

        $ gcloud components update

EXAMPLES
    The following command installs COMPONENT-1, COMPONENT-2, and all components
    that they depend on:

        $ gcloud components install COMPONENT-1 COMPONENT-2

POSITIONAL ARGUMENTS
     COMPONENT-IDS [COMPONENT-IDS ...]
        The IDs of the components to be installed.

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/install (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
