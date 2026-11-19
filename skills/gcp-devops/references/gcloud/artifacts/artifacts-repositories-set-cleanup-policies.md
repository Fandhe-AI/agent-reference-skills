---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/repositories/set-cleanup-policies
---

# gcloud artifacts repositories set-cleanup-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts repositories set-cleanup-policies

```text
NAME
    gcloud artifacts repositories set-cleanup-policies - set or update cleanup
        policies for an Artifact Registry repository

SYNOPSIS
    gcloud artifacts repositories set-cleanup-policies
        (REPOSITORY : --location=LOCATION) (--dry-run --policy=POLICY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set or update cleanup policies for an Artifact Registry repository.

    This command can fail for the following reasons:
      o The given repository does not exist.
      o The active account does not have permission to update repositories.
      o A valid cleanup policy format was not provided.
      o The repository exceeds the maximum number of cleanup policies.

    See
    https://cloud.google.com/artifact-registry/docs/repositories/cleanup-policy
    for details of the cleanup policy file format and contents.

EXAMPLES
    To create a cleanup policy from a file with the name policy.json in the
    repository my-repo, run:

        $ gcloud artifacts repositories set-cleanup-policies my-repo \
            --policy=policy.json

POSITIONAL ARGUMENTS
     Repository resource - The parent Artifact Registry repository for the list
     of cleanup policies. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument repository on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REPOSITORY
          ID of the repository or fully qualified identifier for the
          repository.

          To set the repository attribute:
          + provide the argument repository on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the repository. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument repository on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

REQUIRED FLAGS
     At least one of these must be specified:

       --dry-run
          Disable deleting images according to cleanup policies.

       --policy=POLICY
          Path to a local JSON formatted file containing valid cleanup
          policies.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/repositories/set-cleanup-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
