---
source: https://docs.cloud.google.com/sdk/gcloud/reference/audit-manager/operations
---

# gcloud audit-manager operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud audit-manager operations describe

```text
NAME
    gcloud audit-manager operations describe - describe Audit operation

SYNOPSIS
    gcloud audit-manager operations describe
        (OPERATION
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Obtain details about an audit operation.

EXAMPLES
    To describe an Audit operation in the us-central1 region, belonging to a
    project with ID 123, with operation ID operation-456, run:

        $ gcloud audit-manager operations describe operation-456 \
            --project=123 --location=us-central1

POSITIONAL ARGUMENTS
     Operation resource - The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [auditmanager.folders.locations.operationDetails,
        auditmanager.organizations.locations.operationDetails,
        auditmanager.projects.locations.operationDetails].

     This must be specified.

       OPERATION
          ID of the operation or fully qualified identifier for the operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          The folder for the operation.

          To set the folder attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type
            [auditmanager.folders.locations.operationDetails].

       --location=LOCATION
          The location for the operation.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization for the operation.

          To set the organization attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [auditmanager.organizations.locations.operationDetails].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha audit-manager operations describe
```

### gcloud alpha audit-manager operations describe

```text
NAME
    gcloud alpha audit-manager operations describe - describe Audit operation

SYNOPSIS
    gcloud alpha audit-manager operations describe
        (OPERATION
          : --folder=FOLDER --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/audit-manager/operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
