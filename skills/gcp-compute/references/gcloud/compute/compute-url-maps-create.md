---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/create
---

# gcloud compute url-maps create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute url-maps create

```text
NAME
    gcloud compute url-maps create - create a URL map

SYNOPSIS
    gcloud compute url-maps create URL_MAP
        (--default-backend-bucket=DEFAULT_BACKEND_BUCKET
          | --default-service=DEFAULT_SERVICE) [--description=DESCRIPTION]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute url-maps create is used to create URL maps which map HTTP
    and HTTPS request URLs to backend services and backend buckets. Mappings
    are done using a longest-match strategy.

    There are two components to a mapping: a host rule and a path matcher. A
    host rule maps one or more hosts to a path matcher. A path matcher maps
    request paths to backend services or backend buckets. For example, a host
    rule can map the hosts *.google.com and google.com to a path matcher called
    www. The www path matcher in turn can map the path /search/* to the search
    backend service, the path /static/* to the static backend bucket and
    everything else to a default backend service or default backend bucket.

    Host rules and patch matchers can be added to the URL map after the map is
    created by using gcloud compute url-maps edit or by using gcloud compute
    url-maps add-path-matcher and gcloud compute url-maps add-host-rule.

EXAMPLES
    To create a global URL map with a default service, run:

        $ gcloud compute url-maps create URL_MAP_NAME \
            --default-service=BACKEND_SERVICE_NAME

    To create a regional URL map with a default service, run:

        $ gcloud compute url-maps create URL_MAP_NAME \
            --default-service=BACKEND_SERVICE_NAME --region=REGION_NAME

    To create a global URL map with a default backend bucket, run:

        $ gcloud compute url-maps create URL_MAP_NAME \
            --default-backend-bucket=BACKEND_BUCKET_NAME

POSITIONAL ARGUMENTS
     URL_MAP
        Name of the URL map to create.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --default-backend-bucket=DEFAULT_BACKEND_BUCKET
          A backend bucket that will be used for requests for which this URL
          map has no mappings. Exactly one of --default-service or
          --default-backend-bucket is required.

       --default-service=DEFAULT_SERVICE
          A backend service that will be used for requests for which this URL
          map has no mappings. Exactly one of --default-service or
          --default-backend-bucket is required.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the URL map.

     At most one of these can be specified:

       --global
          If set, the URL map is global.

       --region=REGION
          Region of the URL map to create. If not specified, you might be
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

        $ gcloud alpha compute url-maps create

        $ gcloud beta compute url-maps create
```

### gcloud beta compute url-maps create

```text
NAME
    gcloud beta compute url-maps create - create a URL map

SYNOPSIS
    gcloud beta compute url-maps create URL_MAP
        (--default-backend-bucket=DEFAULT_BACKEND_BUCKET
          | --default-service=DEFAULT_SERVICE) [--description=DESCRIPTION]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute url-maps create

```text
NAME
    gcloud alpha compute url-maps create - create a URL map

SYNOPSIS
    gcloud alpha compute url-maps create URL_MAP
        (--default-backend-bucket=DEFAULT_BACKEND_BUCKET
          | --default-service=DEFAULT_SERVICE) [--description=DESCRIPTION]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
