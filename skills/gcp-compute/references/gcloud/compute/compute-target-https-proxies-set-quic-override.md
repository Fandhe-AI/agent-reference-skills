---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-https-proxies/set-quic-override
---

# gcloud compute target-https-proxies set-quic-override

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute target-https-proxies set-quic-override

```text
NAME
    gcloud compute target-https-proxies set-quic-override - set the QUIC
        override policy for a Compute Engine target HTTPS proxy

SYNOPSIS
    gcloud compute target-https-proxies set-quic-override TARGET_HTTPS_PROXY
        --quic-override=QUIC_OVERRIDE [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the QUIC override policy for the given target HTTPS proxy.

EXAMPLES
    To set the QUIC override policy to ENABLE for my-target-https-proxy, run:

        $ gcloud compute target-https-proxies set-quic-override \
            my-target-https-proxy --quic-override=ENABLE

POSITIONAL ARGUMENTS
     Target HTTPS proxy resource - The target HTTPS proxy to set the QUIC
     override for. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument target_https_proxy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TARGET_HTTPS_PROXY
          ID of the target HTTPS proxy or fully qualified identifier for the
          target HTTPS proxy.

          To set the target_https_proxy attribute:
          + provide the argument target_https_proxy on the command line.

REQUIRED FLAGS
     --quic-override=QUIC_OVERRIDE
        QUIC policy for the TargetHttpsProxy resource. QUIC_OVERRIDE must be
        one of:

         disable
            The load balancer will not attempt to negotiate QUIC with clients.
         enable
            The load balancer will attempt to negotiate QUIC with clients.
         none
            No overrides to the default QUIC policy.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute target-https-proxies set-quic-override

        $ gcloud beta compute target-https-proxies set-quic-override
```

### gcloud beta compute target-https-proxies set-quic-override

```text
NAME
    gcloud beta compute target-https-proxies set-quic-override - set the QUIC
        override policy for a Compute Engine target HTTPS proxy

SYNOPSIS
    gcloud beta compute target-https-proxies set-quic-override
        TARGET_HTTPS_PROXY --quic-override=QUIC_OVERRIDE [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-https-proxies set-quic-override

```text
NAME
    gcloud alpha compute target-https-proxies set-quic-override - set the QUIC
        override policy for a Compute Engine target HTTPS proxy

SYNOPSIS
    gcloud alpha compute target-https-proxies set-quic-override
        TARGET_HTTPS_PROXY --quic-override=QUIC_OVERRIDE [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-https-proxies/set-quic-override (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
