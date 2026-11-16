---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/get-certificate-authority
---

# gcloud memorystore instances get-certificate-authority

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memorystore instances get-certificate-authority

```text
NAME
    gcloud memorystore instances get-certificate-authority - get certificate
        authority details of a Memorystore instance

SYNOPSIS
    gcloud memorystore instances get-certificate-authority
        (INSTANCE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get certificate authority details of a Memorystore instance.

EXAMPLES
    To get the certificate authority for instance my-instance in project
    my-project and location us-central1, run:

        $ gcloud memorystore instances get-certificate-authority \
            my-instance --project=my-project --location=us-central1

POSITIONAL ARGUMENTS
     Instance resource - The name of the Memorystore instance. Format:
     projects/{project}/locations/{location}/instances/{instance} The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

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
          The location ID of the instance resource.

          To set the location attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances get-certificate-authority

        $ gcloud beta memorystore instances get-certificate-authority
```

### gcloud beta memorystore instances get-certificate-authority

```text
NAME
    gcloud beta memorystore instances get-certificate-authority - get
        certificate authority details of a Memorystore instance

SYNOPSIS
    gcloud beta memorystore instances get-certificate-authority
        (INSTANCE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances get-certificate-authority

```text
NAME
    gcloud alpha memorystore instances get-certificate-authority - get
        certificate authority details of a Memorystore instance

SYNOPSIS
    gcloud alpha memorystore instances get-certificate-authority
        (INSTANCE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/get-certificate-authority (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
