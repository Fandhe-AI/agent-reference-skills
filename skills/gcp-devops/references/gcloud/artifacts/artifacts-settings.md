---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/settings
---

# gcloud artifacts settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts settings describe

```text
NAME
    gcloud artifacts settings describe - list all Artifact Registry project
        settings

SYNOPSIS
    gcloud artifacts settings describe [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Artifact Registry project settings.

EXAMPLES
    To list project settings for project my-project:

        $ gcloud artifacts settings describe --project=my-package

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/

NOTES
    These variants are also available:

        $ gcloud alpha artifacts settings describe

        $ gcloud beta artifacts settings describe
```

### gcloud artifacts settings disable-upgrade-redirection

```text
NAME
    gcloud artifacts settings disable-upgrade-redirection - disables
        redirection from Container Registry to Artifact Registry

SYNOPSIS
    gcloud artifacts settings disable-upgrade-redirection
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disables redirection from Container Registry to Artifact Registry.

EXAMPLES
    To disable redirection for project my-project:

        $ gcloud artifacts settings disable-upgrade-redirection \
           --project=my-project

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/

NOTES
    These variants are also available:

        $ gcloud alpha artifacts settings disable-upgrade-redirection

        $ gcloud beta artifacts settings disable-upgrade-redirection
```

### gcloud artifacts settings enable-upgrade-redirection

```text
NAME
    gcloud artifacts settings enable-upgrade-redirection - enables redirection
        from Container Registry to Artifact Registry

SYNOPSIS
    gcloud artifacts settings enable-upgrade-redirection [--dry-run]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enables redirection from Container Registry to Artifact Registry.

EXAMPLES
    To enable redirection for project my-project:

        $ gcloud artifacts settings enable-upgrade-redirection \
           --project=my-project

FLAGS
     --dry-run
        Validate the project setup, but do not enable redirection

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/

NOTES
    These variants are also available:

        $ gcloud alpha artifacts settings enable-upgrade-redirection

        $ gcloud beta artifacts settings enable-upgrade-redirection
```

### gcloud beta artifacts settings describe

```text
NAME
    gcloud beta artifacts settings describe - list all Artifact Registry
        project settings

SYNOPSIS
    gcloud beta artifacts settings describe [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts settings disable-upgrade-redirection

```text
NAME
    gcloud beta artifacts settings disable-upgrade-redirection - disables
        redirection from Container Registry to Artifact Registry

SYNOPSIS
    gcloud beta artifacts settings disable-upgrade-redirection
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts settings enable-upgrade-redirection

```text
NAME
    gcloud beta artifacts settings enable-upgrade-redirection - enables
        redirection from Container Registry to Artifact Registry

SYNOPSIS
    gcloud beta artifacts settings enable-upgrade-redirection [--dry-run]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts settings describe

```text
NAME
    gcloud alpha artifacts settings describe - list all Artifact Registry
        project settings

SYNOPSIS
    gcloud alpha artifacts settings describe [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts settings disable-upgrade-redirection

```text
NAME
    gcloud alpha artifacts settings disable-upgrade-redirection - disables
        redirection from Container Registry to Artifact Registry

SYNOPSIS
    gcloud alpha artifacts settings disable-upgrade-redirection
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts settings enable-upgrade-redirection

```text
NAME
    gcloud alpha artifacts settings enable-upgrade-redirection - enables
        redirection from Container Registry to Artifact Registry

SYNOPSIS
    gcloud alpha artifacts settings enable-upgrade-redirection [--dry-run]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
