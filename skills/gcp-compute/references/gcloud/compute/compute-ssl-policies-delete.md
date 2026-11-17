---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/ssl-policies/delete
---

# gcloud compute ssl-policies delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute ssl-policies delete

```text
NAME
    gcloud compute ssl-policies delete - delete Compute Engine SSL policies

SYNOPSIS
    gcloud compute ssl-policies delete SSL_POLICY [SSL_POLICY ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute ssl-policies delete is used to delete one or more Compute
    Engine SSL policies. SSL policies can only be deleted when no other
    resources (e.g., Target HTTPS proxies, Target SSL proxies) refer to them.

    An SSL policy specifies the server-side support for SSL features. An SSL
    policy can be attached to a TargetHttpsProxy or a TargetSslProxy. This
    affects connections between clients and the load balancer. SSL policies do
    not affect the connection between the load balancers and the backends. SSL
    policies are used by Application Load Balancers and proxy Network Load
    Balancers.

POSITIONAL ARGUMENTS
     SSL_POLICY [SSL_POLICY ...]
        Names of the SSL policies to delete.

FLAGS
     At most one of these can be specified:

       --global
          If set, the SSL policies are global.

       --region=REGION
          Region of the SSL policies to delete. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute ssl-policies delete

        $ gcloud beta compute ssl-policies delete
```

### gcloud beta compute ssl-policies delete

```text
NAME
    gcloud beta compute ssl-policies delete - delete Compute Engine SSL
        policies

SYNOPSIS
    gcloud beta compute ssl-policies delete SSL_POLICY [SSL_POLICY ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute ssl-policies delete

```text
NAME
    gcloud alpha compute ssl-policies delete - delete Compute Engine SSL
        policies

SYNOPSIS
    gcloud alpha compute ssl-policies delete SSL_POLICY [SSL_POLICY ...]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/ssl-policies/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
