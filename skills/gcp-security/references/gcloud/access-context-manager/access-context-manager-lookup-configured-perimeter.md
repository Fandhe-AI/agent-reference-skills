---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/lookup-configured-perimeter
---

# gcloud access-context-manager lookup-configured-perimeter

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager lookup-configured-perimeter

```text
NAME
    gcloud access-context-manager lookup-configured-perimeter - look up the
        configured VPC Service Controls service perimeter for a resource

SYNOPSIS
    gcloud access-context-manager lookup-configured-perimeter
        --resource=RESOURCE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Looks up the configured VPC Service Controls service perimeter (both
    enforced and dry-run) that applies to the specified project or folder based
    on resource hierarchy ancestry.

EXAMPLES
    To look up the configured perimeter for a project with number 1234567890:

        $ gcloud access-context-manager lookup-configured-perimeter \
            --resource=projects/1234567890

    To look up the configured perimeter for a folder with number 9876543210:

        $ gcloud access-context-manager lookup-configured-perimeter \
            --resource=folders/9876543210

REQUIRED FLAGS
     --resource=RESOURCE
        The resource to look up effective service perimeters for. Format:
        projects/{project_number} or folders/{folder_number}.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager lookup-configured-perimeter

        $ gcloud beta access-context-manager lookup-configured-perimeter
```

### gcloud beta access-context-manager lookup-configured-perimeter

```text
NAME
    gcloud beta access-context-manager lookup-configured-perimeter - look up
        the configured VPC Service Controls service perimeter for a resource

SYNOPSIS
    gcloud beta access-context-manager lookup-configured-perimeter
        --resource=RESOURCE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager lookup-configured-perimeter

```text
NAME
    gcloud alpha access-context-manager lookup-configured-perimeter - look up
        the configured VPC Service Controls service perimeter for a resource

SYNOPSIS
    gcloud alpha access-context-manager lookup-configured-perimeter
        --resource=RESOURCE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/lookup-configured-perimeter (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
