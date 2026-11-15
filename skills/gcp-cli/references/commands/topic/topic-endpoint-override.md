---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/endpoint-override
---

# gcloud topic endpoint-override

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic endpoint-override

```text
NAME
    gcloud topic endpoint-override - gcloud endpoint override supplementary
        help

DESCRIPTION
    Use API endpoint overrides to override the API endpoints used by the gcloud
    CLI. Applications such as Private Google Access and Private Service Connect
    use API endpoint overrides.

Setting API endpoint overrides

    gcloud API endpoints are defined as gcloud CLI properties and can be
    overridden through gcloud CLI properties or environment variables. For
    example, to override the API endpoint for the gcloud storage command to use
    the private storage-vialink1.p.googleapis.com endpoint with either http://
    or https:// prefix, you can use one of the following commands:

        # Override using a property:
        $ gcloud config set api_endpoint_overrides/storage \
            https://storage-vialink1.p.googleapis.com/

        # Override using an environment variable
        $ \
            CLOUDSDK_API_ENDPOINT_OVERRIDES_STORAGE=https://\
        storage-vialink1.p.googleapis.com/
        gcloud storage objects list gs://my-bucket

Default API endpoints

    To get the default value for an API endpoint override, use gcloud config
    get to determine the correct format for your API endpoint override:

        $ gcloud config get api_endpoint_overrides/storage

Unsetting API endpoint overrides

    To unset an API endpoint override, use gcloud config unset:

        $ gcloud config unset api_endpoint_overrides/storage

Configured API endpoint overrides

    To see the APIs which have an endpoint override set, use gcloud config
    list:

        $ gcloud config list api_endpoint_overrides/

    To see all the set and unset API endpoint override properties, use the
    --all flag:

        $ gcloud config list api_endpoint_overrides/ --all

NOTES
    These variants are also available:

        $ gcloud alpha topic endpoint-override

        $ gcloud beta topic endpoint-override
```

### gcloud beta topic endpoint-override

```text
NAME
    gcloud beta topic endpoint-override - gcloud endpoint override
        supplementary help
```

### gcloud alpha topic endpoint-override

```text
NAME
    gcloud alpha topic endpoint-override - gcloud endpoint override
        supplementary help
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/endpoint-override (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
