---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/list-cdn-cache-invalidations
---

# gcloud compute url-maps list-cdn-cache-invalidations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute url-maps list-cdn-cache-invalidations

```text
NAME
    gcloud compute url-maps list-cdn-cache-invalidations - list Cloud CDN cache
        invalidations for a URL map

SYNOPSIS
    gcloud compute url-maps list-cdn-cache-invalidations URL_MAP [--global]
        [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud CDN cache invalidations for a URL map. A cache invalidation
    instructs Cloud CDN to stop using cached content. You can list
    invalidations to check which have completed.

POSITIONAL ARGUMENTS
     URL_MAP
        Name of the URL map to describe.

FLAGS
     --global
        (Default) The URL map is global. Regional URL maps are not supported.

     --limit=LIMIT
        The maximum number of invalidations to list. This has an upper limit of
        1000. For more results, use Cloud Logging.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute url-maps list-cdn-cache-invalidations

        $ gcloud beta compute url-maps list-cdn-cache-invalidations
```

### gcloud beta compute url-maps list-cdn-cache-invalidations

```text
NAME
    gcloud beta compute url-maps list-cdn-cache-invalidations - list Cloud CDN
        cache invalidations for a URL map

SYNOPSIS
    gcloud beta compute url-maps list-cdn-cache-invalidations URL_MAP
        [--global] [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute url-maps list-cdn-cache-invalidations

```text
NAME
    gcloud alpha compute url-maps list-cdn-cache-invalidations - list Cloud CDN
        cache invalidations for a URL map

SYNOPSIS
    gcloud alpha compute url-maps list-cdn-cache-invalidations URL_MAP
        [--global] [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/list-cdn-cache-invalidations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
