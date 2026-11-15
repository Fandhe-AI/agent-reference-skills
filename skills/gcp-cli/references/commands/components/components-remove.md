---
source: https://docs.cloud.google.com/sdk/gcloud/reference/components/remove
---

# gcloud components remove

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud components remove

```text
NAME
    gcloud components remove - remove one or more installed components

SYNOPSIS
    gcloud components remove COMPONENT_ID [COMPONENT_ID ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Uninstall all listed components, as well as all components that directly or
    indirectly depend on them.

    The command lists all components it is about to remove, and asks for
    confirmation before proceeding.

EXAMPLES
    To remove COMPONENT-1, COMPONENT-2, and all components that directly or
    indirectly depend on COMPONENT-1 or COMPONENT-2, type the following:

        $ gcloud components remove COMPONENT-1 COMPONENT-2

POSITIONAL ARGUMENTS
     COMPONENT_ID [COMPONENT_ID ...]
        The IDs of the components to be removed.

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/components/remove (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
