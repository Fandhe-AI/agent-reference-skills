---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/remove-attestation-rule
---

# gcloud iam workload-identity-pools remove-attestation-rule

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workload-identity-pools remove-attestation-rule

```text
NAME
    gcloud iam workload-identity-pools remove-attestation-rule - remove an
        attestation rule on a workload identity pool

SYNOPSIS
    gcloud iam workload-identity-pools remove-attestation-rule
        (WORKLOAD_IDENTITY_POOL : --location=LOCATION)
        --google-cloud-resource=GOOGLE_CLOUD_RESOURCE [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an attestation rule on a workload identity pool.

EXAMPLES
    The following command removes an attestation rule with a Google Cloud
    resource on a workload identity pool my-pool.

        $ gcloud iam workload-identity-pools remove-attestation-rule \
            my-pool --location="global" \
            --google-cloud-resource="//run.googleapis.com/projects/123/type/\
        Service/*"

POSITIONAL ARGUMENTS
     Workload identity pool resource - The workload identity pool to remove the
     attestation rule on. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument workload_identity_pool on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKLOAD_IDENTITY_POOL
          ID of the workload identity pool or fully qualified identifier for
          the workload identity pool.

          To set the workload_identity_pool attribute:
          + provide the argument workload_identity_pool on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument workload_identity_pool on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --google-cloud-resource=GOOGLE_CLOUD_RESOURCE
        A single workload operating on Google Cloud. This will be set in the
        attestation rule to be added.

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
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud iam workload-identity-pools remove-attestation-rule my-pool \
    --location="global" \
    --google-cloud-resource="//run.googleapis.com/projects/123/type/Service/*"
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/remove-attestation-rule (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
