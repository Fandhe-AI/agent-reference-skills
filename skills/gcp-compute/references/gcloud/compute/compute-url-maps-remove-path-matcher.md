---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/remove-path-matcher
---

# gcloud compute url-maps remove-path-matcher

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute url-maps remove-path-matcher

```text
NAME
    gcloud compute url-maps remove-path-matcher - remove a path matcher from a
        URL map

SYNOPSIS
    gcloud compute url-maps remove-path-matcher URL_MAP
        --path-matcher-name=PATH_MATCHER_NAME [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute url-maps remove-path-matcher is used to remove a path
    matcher from a URL map. When a path matcher is removed, all host rules that
    refer to the path matcher are also removed.

EXAMPLES
    To remove the path matcher named MY-MATCHER from the URL map named
    MY-URL-MAP, you can use this command:

        $ gcloud compute url-maps remove-path-matcher MY-URL-MAP \
            --path-matcher-name=MY-MATCHER

POSITIONAL ARGUMENTS
     URL_MAP
        Name of the URL map to operate on.

REQUIRED FLAGS
     --path-matcher-name=PATH_MATCHER_NAME
        The name of the path matcher to remove.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the URL map is global.

       --region=REGION
          Region of the URL map to operate on. If not specified, you might be
          prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute url-maps remove-path-matcher

        $ gcloud beta compute url-maps remove-path-matcher
```

### gcloud beta compute url-maps remove-path-matcher

```text
NAME
    gcloud beta compute url-maps remove-path-matcher - remove a path matcher
        from a URL map

SYNOPSIS
    gcloud beta compute url-maps remove-path-matcher URL_MAP
        --path-matcher-name=PATH_MATCHER_NAME [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute url-maps remove-path-matcher

```text
NAME
    gcloud alpha compute url-maps remove-path-matcher - remove a path matcher
        from a URL map

SYNOPSIS
    gcloud alpha compute url-maps remove-path-matcher URL_MAP
        --path-matcher-name=PATH_MATCHER_NAME [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/remove-path-matcher (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
