---
source: https://docs.cloud.google.com/sdk/gcloud/reference/identity/groups/delete
---

# gcloud identity groups delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud identity groups delete

```text
NAME
    gcloud identity groups delete - delete an existing group

SYNOPSIS
    gcloud identity groups delete EMAIL [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an existing group.

EXAMPLES
    To delete a group:

        $ gcloud identity groups delete eng-discuss@foo.com

POSITIONAL ARGUMENTS
     EMAIL
        The email address of the group being deleted.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudidentity/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/identity/

NOTES
    These variants are also available:

        $ gcloud alpha identity groups delete

        $ gcloud beta identity groups delete
```

### gcloud beta identity groups delete

```text
NAME
    gcloud beta identity groups delete - delete an existing group

SYNOPSIS
    gcloud beta identity groups delete EMAIL [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups delete

```text
NAME
    gcloud alpha identity groups delete - delete an existing group

SYNOPSIS
    gcloud alpha identity groups delete EMAIL [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/identity/groups/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
