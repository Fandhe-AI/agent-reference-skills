---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/repositories/describe
---

# gcloud artifacts repositories describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts repositories describe

```text
NAME
    gcloud artifacts repositories describe - describe an Artifact Registry
        repository

SYNOPSIS
    gcloud artifacts repositories describe (REPOSITORY : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Artifact Registry repository given the repository name.

EXAMPLES
    To describe a repository named my-repo under the current project in
    us-west1, run:

        $ gcloud artifacts repositories describe my-repo --location=us-west1

POSITIONAL ARGUMENTS
     Repository resource - The Artifact Registry repository to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/

NOTES
    These variants are also available:

        $ gcloud alpha artifacts repositories describe

        $ gcloud beta artifacts repositories describe
```

### gcloud beta artifacts repositories describe

```text
NAME
    gcloud beta artifacts repositories describe - describe an Artifact Registry
        repository

SYNOPSIS
    gcloud beta artifacts repositories describe
        (REPOSITORY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts repositories describe

```text
NAME
    gcloud alpha artifacts repositories describe - describe an Artifact
        Registry repository

SYNOPSIS
    gcloud alpha artifacts repositories describe
        (REPOSITORY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/repositories/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
