---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/vpcsc-config
---

# gcloud artifacts vpcsc-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts vpcsc-config allow

```text
NAME
    gcloud artifacts vpcsc-config allow - allow Artifact Registry remote
        repositories inside a service perimeter to retrieve data from their
        upstream sources outside of the perimeter

SYNOPSIS
    gcloud artifacts vpcsc-config allow [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Allow Artifact Registry remote repositories inside a service perimeter to
    retrieve data from their upstream sources outside of the perimeter.

    This command can fail for the following reasons:
      o Lack of permission - "accesscontextmanager.policies.update".
      o The resource could be outside of the VPC SC perimeter.
      o Lack of permission - "artifactregistry.vpcscconfigs.update"

EXAMPLES
    The following command allows remote repositories in the project my-project
    and in the region us--west1 to retrieve data from upstream sources outside
    the perimeter:

        $ gcloud artifacts vpcsc-config allow --project=my-project \
           --location=us-west1

FLAGS
     Location resource - The Artifact Registry VPC SC config to update. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property artifacts/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property artifacts/location.

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

        $ gcloud alpha artifacts vpcsc-config allow

        $ gcloud beta artifacts vpcsc-config allow
```

### gcloud artifacts vpcsc-config deny

```text
NAME
    gcloud artifacts vpcsc-config deny - deny access to upstream sources
        outside the service perimeter for Artifact Registry remote repositories
        inside the perimeter

SYNOPSIS
    gcloud artifacts vpcsc-config deny [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deny access to upstream sources outside the service perimeter for Artifact
    Registry remote repositories inside the perimeter.

    This command can fail for the following reasons:
      o Lack of permission - "accesscontextmanager.policies.update".
      o The resource could be outside of the VPC SC perimeter.
      o Lack of permission - "artifactregistry.vpcscconfigs.update"

EXAMPLES
    The following command denies access to upstream sources outside the service
    perimeter for remote repositories in the project my-project and in the
    region us--west1:

        $ gcloud artifacts vpcsc-config deny --project=my-project \
           --location=us-west1

FLAGS
     Location resource - The Artifact Registry VPC SC config to update. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property artifacts/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property artifacts/location.

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

        $ gcloud alpha artifacts vpcsc-config deny

        $ gcloud beta artifacts vpcsc-config deny
```

### gcloud artifacts vpcsc-config describe

```text
NAME
    gcloud artifacts vpcsc-config describe - describe the current Artifact
        Registry configuration for VPC Service Controls

SYNOPSIS
    gcloud artifacts vpcsc-config describe [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the current Artifact Registry configuration for VPC Service
    Controls.

    This command can fail for the following reasons:
      o Lack of permission - "accesscontextmanager.policies.get".
      o The resource could be outside of the VPC SC perimeter.
      o Lack of permission - "artifactregistry.vpcscconfigs.get"

EXAMPLES
    The following command returns the current VPC Service Controls
    configuration for the project my-project and region us-west1:

        $ gcloud artifacts vpcsc-config describe --project=my-project \
           --location=us-west1

FLAGS
     Location resource - The Artifact Registry VPC SC configs to describe. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property artifacts/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property artifacts/location.

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

        $ gcloud alpha artifacts vpcsc-config describe

        $ gcloud beta artifacts vpcsc-config describe
```

### gcloud beta artifacts vpcsc-config allow

```text
NAME
    gcloud beta artifacts vpcsc-config allow - allow Artifact Registry remote
        repositories inside a service perimeter to retrieve data from their
        upstream sources outside of the perimeter

SYNOPSIS
    gcloud beta artifacts vpcsc-config allow [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts vpcsc-config deny

```text
NAME
    gcloud beta artifacts vpcsc-config deny - deny access to upstream sources
        outside the service perimeter for Artifact Registry remote repositories
        inside the perimeter

SYNOPSIS
    gcloud beta artifacts vpcsc-config deny [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts vpcsc-config describe

```text
NAME
    gcloud beta artifacts vpcsc-config describe - describe the current Artifact
        Registry configuration for VPC Service Controls

SYNOPSIS
    gcloud beta artifacts vpcsc-config describe [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts vpcsc-config allow

```text
NAME
    gcloud alpha artifacts vpcsc-config allow - allow Artifact Registry remote
        repositories inside a service perimeter to retrieve data from their
        upstream sources outside of the perimeter

SYNOPSIS
    gcloud alpha artifacts vpcsc-config allow [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts vpcsc-config deny

```text
NAME
    gcloud alpha artifacts vpcsc-config deny - deny access to upstream sources
        outside the service perimeter for Artifact Registry remote repositories
        inside the perimeter

SYNOPSIS
    gcloud alpha artifacts vpcsc-config deny [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts vpcsc-config describe

```text
NAME
    gcloud alpha artifacts vpcsc-config describe - describe the current
        Artifact Registry configuration for VPC Service Controls

SYNOPSIS
    gcloud alpha artifacts vpcsc-config describe [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/vpcsc-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
