---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/single-tenant-hsm/create
---

# gcloud kms single-tenant-hsm create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms single-tenant-hsm create

```text
NAME
    gcloud kms single-tenant-hsm create - create a single tenant HSM instance

SYNOPSIS
    gcloud kms single-tenant-hsm create --location=LOCATION
        --total-approver-count=TOTAL_APPROVER_COUNT [--key-portability-enabled]
        [--single-tenant-hsm-instance-id=SINGLE_TENANT_HSM_INSTANCE_ID]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    The following command creates a single tenant HSM instance within the
    location us-central1 with a total approver count of 3:

        $ gcloud kms single-tenant-hsm create --location=us-central1 \
            --total-approver-count=3

    The following command creates a single tenant HSM instance within the
    location us-central1 with a total approver count of 3, and the single
    tenant HSM instance ID my_stchi:

        $ gcloud kms single-tenant-hsm create --location=us-central1 \
            --total-approver-count=3 \
            --single-tenant-hsm-instance-id=my_stchi

REQUIRED FLAGS
     Location resource - The KMS location resource. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

     --total-approver-count=TOTAL_APPROVER_COUNT
        The total number of approvers. This is the N value used for M of N
        quorum auth. Must be greater than or equal to 3 and less than or equal
        to 16.

OPTIONAL FLAGS
     --key-portability-enabled
        If set, the single tenant HSM instance will be able to perform key
        portability operations.

     --single-tenant-hsm-instance-id=SINGLE_TENANT_HSM_INSTANCE_ID
        Specify an ID for the single tenant HSM instance. It must be unique
        within a location and match the regular expression [a-zA-Z0-9-]{1,63}.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms single-tenant-hsm create

        $ gcloud beta kms single-tenant-hsm create
```

### gcloud beta kms single-tenant-hsm create

```text
NAME
    gcloud beta kms single-tenant-hsm create - create a single tenant HSM
        instance

SYNOPSIS
    gcloud beta kms single-tenant-hsm create --location=LOCATION
        --total-approver-count=TOTAL_APPROVER_COUNT [--key-portability-enabled]
        [--single-tenant-hsm-instance-id=SINGLE_TENANT_HSM_INSTANCE_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms single-tenant-hsm create

```text
NAME
    gcloud alpha kms single-tenant-hsm create - create a single tenant HSM
        instance

SYNOPSIS
    gcloud alpha kms single-tenant-hsm create --location=LOCATION
        --total-approver-count=TOTAL_APPROVER_COUNT [--key-portability-enabled]
        [--single-tenant-hsm-instance-id=SINGLE_TENANT_HSM_INSTANCE_ID]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the second `create` example passes `--single-tenant-hsm-instance-id=my_stchi`, but the `--single-tenant-hsm-instance-id` description on this page says the ID must "match the regular expression [a-zA-Z0-9-]{1,63}", which does not allow `_`. Adapted (not in the official docs): `gcloud kms single-tenant-hsm create --location=us-central1 --total-approver-count=3 --single-tenant-hsm-instance-id=my-stchi`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/single-tenant-hsm/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
