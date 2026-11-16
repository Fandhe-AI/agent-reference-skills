---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/delete-signed-url-key
---

# gcloud compute backend-buckets delete-signed-url-key

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute backend-buckets delete-signed-url-key

```text
NAME
    gcloud compute backend-buckets delete-signed-url-key - delete Cloud CDN
        Signed URL key from a backend bucket

SYNOPSIS
    gcloud compute backend-buckets delete-signed-url-key BACKEND_BUCKET_NAME
        --key-name=KEY_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-buckets delete-signed-url-key deletes an existing
    Cloud CDN Signed URL key from a backend bucket.

    Cloud CDN Signed URLs give you a way to serve responses from the globally
    distributed CDN cache, even if the request needs to be authorized.

    Signed URLs are a mechanism to temporarily give a client access to a
    private resource without requiring additional authorization. To achieve
    this, the full request URL that should be allowed is hashed and
    cryptographically signed. By using the signed URL you give it, that one
    request will be considered authorized to receive the requested content.

    Generally, a signed URL can be used by anyone who has it. However, it is
    usually only intended to be used by the client that was directly given the
    URL. To mitigate this, they expire at a time chosen by the issuer. To
    minimize the risk of a signed URL being shared, it is recommended that the
    signed URL be set to expire as soon as possible.

    A 128-bit secret key is used for signing the URLs.

POSITIONAL ARGUMENTS
     BACKEND_BUCKET_NAME
        Name of the backend bucket to delete CDN signed URL key from.

REQUIRED FLAGS
     --key-name=KEY_NAME
        Name of the Cloud CDN Signed URL key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-buckets delete-signed-url-key

        $ gcloud beta compute backend-buckets delete-signed-url-key
```

### gcloud beta compute backend-buckets delete-signed-url-key

```text
NAME
    gcloud beta compute backend-buckets delete-signed-url-key - delete Cloud
        CDN Signed URL key from a backend bucket

SYNOPSIS
    gcloud beta compute backend-buckets delete-signed-url-key
        BACKEND_BUCKET_NAME --key-name=KEY_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute backend-buckets delete-signed-url-key

```text
NAME
    gcloud alpha compute backend-buckets delete-signed-url-key - delete Cloud
        CDN Signed URL key from a backend bucket

SYNOPSIS
    gcloud alpha compute backend-buckets delete-signed-url-key
        BACKEND_BUCKET_NAME --key-name=KEY_NAME [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/delete-signed-url-key (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
