---
source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/analyze-move
---

# gcloud asset analyze-move

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud asset analyze-move

```text
NAME
    gcloud asset analyze-move - analyzes resource move

SYNOPSIS
    gcloud asset analyze-move --project=PROJECT_ID
        (--destination-folder=FOLDER_ID
          | --destination-organization=ORGANIZATION_ID)
        [--blockers-only=BLOCKERS_ONLY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Analyze resource migration from its current resource hierarchy.

EXAMPLES
    To analyze the impacts of moving a project to a different organization,
    run:

        $ gcloud asset analyze-move --project=YOUR_PROJECT_ID \
          --destination-organization=ORGANIZATION_ID

    To analyze the impacts of moving a project to a different folder, run:

        $ gcloud asset analyze-move --project=YOUR_PROJECT_ID \
          --destination-folder=FOLDER_ID

    To analyze only the blockers of moving a project to a different folder,
    run:

        $ gcloud asset analyze-move --project=YOUR_PROJECT_ID \
          --destination-folder=FOLDER_ID --blockers-only=true

REQUIRED FLAGS
     --project=PROJECT_ID
        The project ID or number to perform the analysis.

     Exactly one of these must be specified:

       --destination-folder=FOLDER_ID
          The destination folder ID to perform the analysis.

       --destination-organization=ORGANIZATION_ID
          The destination organization ID to perform the analysis.

OPTIONAL FLAGS
     --blockers-only=BLOCKERS_ONLY
        Determines whether to perform analysis against blockers only. Leaving
        it empty means the full analysis will be performed including warnings
        and blockers for the specified resource move.

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/analyze-move (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
