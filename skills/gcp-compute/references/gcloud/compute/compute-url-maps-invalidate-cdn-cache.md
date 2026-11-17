---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/invalidate-cdn-cache
---

# gcloud compute url-maps invalidate-cdn-cache

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute url-maps invalidate-cdn-cache

```text
NAME
    gcloud compute url-maps invalidate-cdn-cache - invalidate specified objects
        for a URL map in Cloud CDN caches

SYNOPSIS
    gcloud compute url-maps invalidate-cdn-cache URLMAP [--async]
        [--content-type=CONTENT_TYPE] [--global] [--host=HOST]
        [--http-status=HTTP_STATUS] [--path=PATH] [--tags=TAGS]
        [--backend-bucket=BACKEND_BUCKET | --backend-service=BACKEND_SERVICE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute url-maps invalidate-cdn-cache requests that Cloud CDN stop
    using cached content for resources at a particular URL path or set of URL
    paths.

    gcloud compute url-maps invalidate-cdn-cache may succeed even if no content
    is cached for some or all URLs with the given path.

POSITIONAL ARGUMENTS
     URLMAP
        Name of the URL map to operate on.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --content-type=CONTENT_TYPE
        If set, this invalidation rule will only apply to responses with the
        given Content-Type header. Content-type parameters are not allowed in a
        rule, and they are ignored from the response when matching.

        For example, "text/html; charset=UTF-8" is not allowed in a rule. An
        invalidation rule with content-type: "text/html" will match responses
        with both "text/html" and "text/html; charset=UTF-8" Content-Type
        headers.

        Wildcards are not allowed.

     --global
        (Default) The URL map is global. Regional URL maps are not supported.

     --host=HOST
        If set, this invalidation will apply only to requests to the specified
        host. The leftmost label may be a wildcard. If present, the * must be
        the first character of the host, followed immediately by a . character.

        For example, *.example.com is valid, and it will match requests to
        www.example.com and api.example.com, but not to example.com or
        dev.api.example.com.

     --http-status=HTTP_STATUS
        If set, this invalidation will apply only to cached responses with the
        specified HTTP status code. Valid range is 200 to 599.

     --path=PATH
        A path specifying which objects to invalidate. PATH must start with
        ``/'' and the only place a ``*'' is allowed is at the end of the path.
        It will be matched against URL paths, which do not include scheme,
        host, or any text after the first ``?'' or ``#'' (and those characters
        are not allowed here). For example, for the URL
        https://example.com/whatever/x.html?a=b, the path is /whatever/x.html.

        If PATH ends with ``*'', the preceding string is a prefix, and all URLs
        whose paths begin with it will be invalidated. If PATH doesn't end with
        ``*'', then only URLs with exactly that path will be invalidated.

        Examples:
        * ``'', ``*'', anything that doesn't start with ``/'': error
        * ``/'': just the root URL
        * ``/*'': everything
        * ``/x/y'': ``/x/y'' only (and not ``/x/y/'')
        * ``/x/y/'': ``/x/y/'' only (and not ``/x/y'')
        * ``/x/y*'': ``/x/y'' and everything with the prefix (e.g. /x/yy,
          ``/x/y/z'')

     --tags=TAGS
        A single tag or a comma-delimited list of tags. When multiple tags are
        specified, the invalidation applies them using boolean OR logic.

        Example:
        * --tags=abcd,user123

     At most one of these can be specified:

       --backend-bucket=BACKEND_BUCKET
          If set, this invalidation will apply only to requests routed to the
          specified backend bucket. Either the id of a backend bucket in this
          project, or the full resource URI can be specified, e.g.,
          projects/PROJECT_NUMBER/global/backendBuckets/BACKEND_BUCKET.

       --backend-service=BACKEND_SERVICE
          If set, this invalidation will apply only to requests routed to the
          specified backend service. Either the id of a backend service in this
          project, or the full resource URI can be specified, e.g.,
          projects/PROJECT_NUMBER/global/backendServices/BACKEND_SERVICE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute url-maps invalidate-cdn-cache

        $ gcloud beta compute url-maps invalidate-cdn-cache
```

### gcloud beta compute url-maps invalidate-cdn-cache

```text
NAME
    gcloud beta compute url-maps invalidate-cdn-cache - invalidate specified
        objects for a URL map in Cloud CDN caches

SYNOPSIS
    gcloud beta compute url-maps invalidate-cdn-cache URLMAP [--async]
        [--content-type=CONTENT_TYPE] [--global] [--host=HOST]
        [--http-status=HTTP_STATUS] [--path=PATH] [--tags=TAGS]
        [--backend-bucket=BACKEND_BUCKET | --backend-service=BACKEND_SERVICE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute url-maps invalidate-cdn-cache

```text
NAME
    gcloud alpha compute url-maps invalidate-cdn-cache - invalidate specified
        objects for a URL map in Cloud CDN caches

SYNOPSIS
    gcloud alpha compute url-maps invalidate-cdn-cache URLMAP [--async]
        [--content-type=CONTENT_TYPE] [--global] [--host=HOST]
        [--http-status=HTTP_STATUS] [--path=PATH] [--tags=TAGS]
        [--backend-bucket=BACKEND_BUCKET | --backend-service=BACKEND_SERVICE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/url-maps/invalidate-cdn-cache (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
