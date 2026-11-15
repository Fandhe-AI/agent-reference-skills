---
source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/import-data
---

# gcloud lustre instances import-data

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud lustre instances import-data

```text
NAME
    gcloud lustre instances import-data - imports data from Cloud Storage to a
        Managed Lustre instance

SYNOPSIS
    gcloud lustre instances import-data (INSTANCE : --location=LOCATION)
        --gcs-path-uri=GCS_PATH_URI [--async] [--lustre-path=LUSTRE_PATH]
        [--request-id=REQUEST_ID] [--service-account=SERVICE_ACCOUNT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Imports data from Cloud Storage to a Managed Lustre instance.

EXAMPLES
    To import data from Cloud Storage bucket gs://my-bucket/ to instance
    my-instance in location us-central1-a, run:

        $ gcloud lustre instances import-data my-instance \
            --location=us-central1-a --gcs-path-uri=gs://my-bucket/ \
            --lustre-path='/path/to/lustre/dir'

POSITIONAL ARGUMENTS
     Instance resource - The name of the Managed Lustre instance in the format
     projects/{project}/locations/{location}/instances/{instance}. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the instance resource.

          To set the location attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --gcs-path-uri=GCS_PATH_URI
        The URI to a Cloud Storage bucket, or a path within a bucket, using the
        format gs://<bucket_name>/<optional_path_inside_bucket>/. If a path
        inside the bucket is specified, it must end with a forward slash (/).

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --lustre-path=LUSTRE_PATH
        The root directory path to the Managed Lustre file system. Must start
        with /. Default is /. If you're importing data into Managed Lustre, any
        path other than the default must already exist on the file system.

     --request-id=REQUEST_ID
        UUID to identify requests.

     ServiceAccount resource - User-specified service account used to perform
     the transfer. If unspecified, the default Managed Lustre service agent
     will be used.

     Use one of the following formats:

      * {EMAIL_ADDRESS_OR_UNIQUE_ID}
      * projects/{PROJECT_ID}/serviceAccounts/{EMAIL_ADDRESS_OR_UNIQUE_ID}
      * projects/-/serviceAccounts/{EMAIL_ADDRESS_OR_UNIQUE_ID} This
        represents a Cloud resource. (NOTE) Some attributes are not given
        arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --service-account on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --service-account=SERVICE_ACCOUNT
        ID of the serviceAccount or fully qualified identifier for the
        serviceAccount.

        To set the service-account attribute:
        * provide the argument --service-account on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the lustre/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/managed-lustre/docs

NOTES
    This variant is also available:

        $ gcloud alpha lustre instances import-data
```

### gcloud alpha lustre instances import-data

```text
NAME
    gcloud alpha lustre instances import-data - imports data from Cloud Storage
        to a Managed Lustre instance

SYNOPSIS
    gcloud alpha lustre instances import-data (INSTANCE : --location=LOCATION)
        --gcs-path-uri=GCS_PATH_URI [--async] [--lustre-path=LUSTRE_PATH]
        [--request-id=REQUEST_ID] [--service-account=SERVICE_ACCOUNT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/import-data (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
