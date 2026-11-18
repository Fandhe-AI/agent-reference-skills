---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/single-tenant-hsm/describe
---

# gcloud kms single-tenant-hsm describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms single-tenant-hsm describe

```text
NAME
    gcloud kms single-tenant-hsm describe - get metadata for a single tenant
        HSM instance

SYNOPSIS
    gcloud kms single-tenant-hsm describe
        (SINGLE_TENANT_HSM_INSTANCE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns metadata for the given single tenant HSM instance.

EXAMPLES
    The following command returns the metadata for the single tenant HSM
    instance with the name my_sthi in the location us-east1 using the fully
    specified name:

        $ gcloud kms single-tenant-hsm describe \
            projects/my-project/locations/us-east1/\
        singleTenantHsmInstances/mysthi

    The following command returns the metadata for the singletenanthsm instance
    with the name mysthi in the location us-east1 using the location and
    resource id:

        $ gcloud kms single-tenant-hsm describe mysthi --location=us-east1

POSITIONAL ARGUMENTS
     SingleTenantHsmInstance resource - The KMS single tenant HSM instance
     resource. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument single_tenant_hsm_instance on the command line
        with a fully specified name;
      * set the property core/project.

     This must be specified.

       SINGLE_TENANT_HSM_INSTANCE
          ID of the singleTenantHsmInstance or fully qualified identifier for
          the singleTenantHsmInstance.

          To set the single_tenant_hsm_instance attribute:
          + provide the argument single_tenant_hsm_instance on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the singleTenantHsmInstance.

          To set the location attribute:
          + provide the argument single_tenant_hsm_instance on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms single-tenant-hsm describe

        $ gcloud beta kms single-tenant-hsm describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud kms single-tenant-hsm describe projects/my-project/locations/us-east1/singleTenantHsmInstances/mysthi
```

### gcloud beta kms single-tenant-hsm describe

```text
NAME
    gcloud beta kms single-tenant-hsm describe - get metadata for a single
        tenant HSM instance

SYNOPSIS
    gcloud beta kms single-tenant-hsm describe
        (SINGLE_TENANT_HSM_INSTANCE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms single-tenant-hsm describe

```text
NAME
    gcloud alpha kms single-tenant-hsm describe - get metadata for a single
        tenant HSM instance

SYNOPSIS
    gcloud alpha kms single-tenant-hsm describe
        (SINGLE_TENANT_HSM_INSTANCE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/single-tenant-hsm/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
