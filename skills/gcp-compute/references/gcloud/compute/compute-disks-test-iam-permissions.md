---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/test-iam-permissions
---

# gcloud compute disks test-iam-permissions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute disks test-iam-permissions

```text
NAME
    gcloud compute disks test-iam-permissions - test IAM permissions for a
        Compute Engine disk

SYNOPSIS
    gcloud compute disks test-iam-permissions (DISK : --zone=ZONE)
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Test whether a caller has the provided permissions on a given disk. This
    command returns a list of the permissions from the provided list that the
    caller possesses.

EXAMPLES
    To test whether the caller has the 'compute.disks.getIamPolicy' permission
    on a disk, run:

        $ gcloud compute disks test-iam-permissions my-disk \
            --permissions=compute.disks.getIamPolicy

POSITIONAL ARGUMENTS
     Disk resource - The disk to test permissions for. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument disk on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DISK
          ID of the disk or fully qualified identifier for the disk.

          To set the disk attribute:
          + provide the argument disk on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument disk on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

REQUIRED FLAGS
     --permissions=[PERMISSIONS,...]
        Permissions to be tested.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute disks test-iam-permissions

        $ gcloud beta compute disks test-iam-permissions
```

### gcloud beta compute disks test-iam-permissions

```text
NAME
    gcloud beta compute disks test-iam-permissions - test IAM permissions for a
        Compute Engine disk

SYNOPSIS
    gcloud beta compute disks test-iam-permissions (DISK : --zone=ZONE)
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute disks test-iam-permissions

```text
NAME
    gcloud alpha compute disks test-iam-permissions - test IAM permissions for
        a Compute Engine disk

SYNOPSIS
    gcloud alpha compute disks test-iam-permissions (DISK : --zone=ZONE)
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/test-iam-permissions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
