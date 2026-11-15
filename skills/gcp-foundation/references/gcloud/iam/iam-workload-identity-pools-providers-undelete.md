---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/providers/undelete
---

# gcloud iam workload-identity-pools providers undelete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workload-identity-pools providers undelete

```text
NAME
    gcloud iam workload-identity-pools providers undelete - undelete a workload
        identity pool provider

SYNOPSIS
    gcloud iam workload-identity-pools providers undelete
        (PROVIDER : --location=LOCATION
          --workload-identity-pool=WORKLOAD_IDENTITY_POOL)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Undelete a workload identity pool provider.

EXAMPLES
    The following command undeletes the workload identity pool provider with
    the ID my-workload-identity-pool-provider:

        $ gcloud iam workload-identity-pools providers undelete \
            my-workload-identity-pool-provider \
            --workload-identity-pool="my-workload-identity-pool" \
            --location="global"

POSITIONAL ARGUMENTS
     Workload identity pool provider resource - The workload identity pool
     provider to undelete. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument provider on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       PROVIDER
          ID of the workload identity pool provider or fully qualified
          identifier for the workload identity pool provider.

          To set the provider attribute:
          + provide the argument provider on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument provider on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --workload-identity-pool=WORKLOAD_IDENTITY_POOL
          The ID to use for the pool, which becomes the final component of the
          resource name. This value should be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the workload-identity-pool attribute:
          + provide the argument provider on the command line with a fully
            specified name;
          + provide the argument --workload-identity-pool on the command
            line.

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

        $ gcloud alpha iam workload-identity-pools providers undelete

        $ gcloud beta iam workload-identity-pools providers undelete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud iam workload-identity-pools providers undelete my-provider \
    --workload-identity-pool="my-workload-identity-pool" \
    --location="global"
```

### gcloud beta iam workload-identity-pools providers undelete

```text
NAME
    gcloud beta iam workload-identity-pools providers undelete - undelete a
        workload identity pool provider

SYNOPSIS
    gcloud beta iam workload-identity-pools providers undelete
        (PROVIDER : --location=LOCATION
          --workload-identity-pool=WORKLOAD_IDENTITY_POOL)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam workload-identity-pools providers undelete

```text
NAME
    gcloud alpha iam workload-identity-pools providers undelete - undelete a
        workload identity pool provider

SYNOPSIS
    gcloud alpha iam workload-identity-pools providers undelete
        (PROVIDER : --location=LOCATION
          --workload-identity-pool=WORKLOAD_IDENTITY_POOL)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the provider ID `my-workload-identity-pool-provider` (34 characters) exceeds the 4-32 character limit of a provider ID, so the runnable form uses `my-provider`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/providers/undelete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
