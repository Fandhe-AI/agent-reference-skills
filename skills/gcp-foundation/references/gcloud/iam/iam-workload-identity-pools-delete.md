---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/delete
---

# gcloud iam workload-identity-pools delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workload-identity-pools delete

```text
NAME
    gcloud iam workload-identity-pools delete - delete a workload identity pool

SYNOPSIS
    gcloud iam workload-identity-pools delete
        (WORKLOAD_IDENTITY_POOL : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a workload identity pool.

EXAMPLES
    The following command deletes the workload identity pool with the ID
    my-workload-identity-pool:

        $ gcloud iam workload-identity-pools delete \
            my-workload-identity-pool --location="global"

POSITIONAL ARGUMENTS
     Workload identity pool resource - The workload identity pool to delete.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam workload-identity-pools delete

        $ gcloud beta iam workload-identity-pools delete
```

### gcloud beta iam workload-identity-pools delete

```text
NAME
    gcloud beta iam workload-identity-pools delete - delete a workload identity
        pool

SYNOPSIS
    gcloud beta iam workload-identity-pools delete
        (WORKLOAD_IDENTITY_POOL : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam workload-identity-pools delete

```text
NAME
    gcloud alpha iam workload-identity-pools delete - delete a workload
        identity pool

SYNOPSIS
    gcloud alpha iam workload-identity-pools delete
        (WORKLOAD_IDENTITY_POOL : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
