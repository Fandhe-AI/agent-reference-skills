---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/validate
---

# gcloud compute url-maps validate

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute url-maps validate

```text
NAME
    gcloud compute url-maps validate - validate a URL map

SYNOPSIS
    gcloud compute url-maps validate
        [--load-balancing-scheme=LOAD_BALANCING_SCHEME] [--source=SOURCE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Runs static validation for the UrlMap. In particular, the tests of the
    provided UrlMap will be run. Calling this method does NOT create or update
    the UrlMap.

EXAMPLES
    A URL map can be validated by running:

        $ gcloud compute url-maps validate --source=<path-to-file>

FLAGS
     --load-balancing-scheme=LOAD_BALANCING_SCHEME
        Specifies the load balancer type this validation request is for. Use
        EXTERNAL_MANAGED for global external Application Load Balancer. Use
        EXTERNAL for classic Application Load Balancer.

        Other load balancer types are not supported. For more information,
        refer to Choosing a load balancer
        (https://cloud.google.com/load-balancing/docs/choosing-load-balancer/).

        If unspecified, the load balancing scheme will be inferred from the
        backend service resources this URL map references. If that can not be
        inferred (for example, this URL map only references backend buckets, or
        this URL map is for rewrites and redirects only and doesn't reference
        any backends), EXTERNAL will be used as the default type.

        If specified, the scheme must not conflict with the load balancing
        scheme of the backend service resources this URL map references.

        LOAD_BALANCING_SCHEME must be one of: EXTERNAL, EXTERNAL_MANAGED.

     --source=SOURCE
        Path to a YAML file containing configuration export data. The YAML file
        must not contain any output-only fields. Alternatively, you may omit
        this flag to read from standard input. For a schema describing the
        export/import format, see:
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/compute/v1/UrlMap.yaml.

     At most one of these can be specified:

       --global
          If set, the URL map is global.

       --region=REGION
          Region of the URL map to validate.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute url-maps validate

        $ gcloud beta compute url-maps validate
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute url-maps validate \
    --source=PATH_TO_FILE
```

### gcloud beta compute url-maps validate

```text
NAME
    gcloud beta compute url-maps validate - validate a URL map

SYNOPSIS
    gcloud beta compute url-maps validate
        [--load-balancing-scheme=LOAD_BALANCING_SCHEME] [--source=SOURCE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute url-maps validate

```text
NAME
    gcloud alpha compute url-maps validate - validate a URL map

SYNOPSIS
    gcloud alpha compute url-maps validate
        [--load-balancing-scheme=LOAD_BALANCING_SCHEME] [--source=SOURCE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/validate (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
