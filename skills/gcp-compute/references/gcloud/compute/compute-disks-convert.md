---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/convert
---

# gcloud compute disks convert

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute disks convert

```text
NAME
    gcloud compute disks convert - convert a Compute Engine Persistent Disk
        volume to a Hyperdisk volume

SYNOPSIS
    gcloud compute disks convert DISK_NAME --target-disk-type=TARGET_DISK_TYPE
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Convert Compute Engine Persistent Disk volumes to Hyperdisk volumes.

    gcloud compute disks convert converts a Compute Engine Persistent Disk
    volume to a Hyperdisk volume. For a comprehensive guide, refer to:
    https://cloud.google.com/sdk/gcloud/reference/compute/disks/convert.

    This command performs a series of steps to convert the disk:

      o Creates a temporary snapshot of the original disk.
      o Creates a temporary disk of the target disk type from the snapshot.
      o Deletes the original disk.
      o Recreates the original disk with the target disk type using the
        temporary disk.
      o Deletes the temporary disk and the temporary snapshot.

    If the command fails or is interrupted during the conversion process, it
    will attempt to clean up any temporary resources it had created. If the
    command fails before the original disk is deleted (step 3), the original
    disk is not converted and remains unchanged. You can safely rerun the
    command. If the automatic cleanup fails, the command outputs instructions
    on how to manually clean up any temporary snapshot or disk. If the command
    fails after the original disk is deleted but before the original disk
    succeeds in recreation (step 4), the command outputs manual instructions on
    how to recreate the original disk from the temporary disk or snapshot. In
    this state, do not simply rerun the command; follow the provided manual
    steps.

    To monitor the progress of the underlying operations or check the status,
    you can use the gcloud compute operations list command.

EXAMPLES
    The following command converts a Persistent Disk volume to a Hyperdisk
    Balanced volume:

        $ gcloud compute disks convert my-disk-1 --zone=ZONE \
        --target-disk-type=hyperdisk-balanced

POSITIONAL ARGUMENTS
     DISK_NAME
        Name of the disk to operate on.

REQUIRED FLAGS
     --target-disk-type=TARGET_DISK_TYPE
        Specifies the type of Hyperdisk to convert to, for example, to convert
        a Hyperdisk Balanced volume, specify hyperdisk-balanced. To get a list
        of available disk types, run gcloud compute disk-types list.

OPTIONAL FLAGS
     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the disk. The 'Compute Engine Service Agent' service
     account must hold permission 'Cloud KMS CryptoKey Encrypter/Decrypter'.
     The arguments in this group can be used to specify the attributes of this
     resource.

     --kms-key=KMS_KEY
        ID of the key or fully qualified identifier for the key.

        To set the kms-key attribute:
        * provide the argument --kms-key on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --kms-keyring=KMS_KEYRING
        The KMS keyring of the key.

        To set the kms-keyring attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-keyring on the command line.

     --kms-location=KMS_LOCATION
        The Google Cloud location for the key.

        To set the kms-location attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-location on the command line;
        * provide the argument --region on the command line.

     --kms-project=KMS_PROJECT
        The Google Cloud project for the key.

        To set the kms-project attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-project on the command line;
        * set the property core/project.

     At most one of these can be specified:

       --region=REGION
          Region of the disk to operate on. If not specified, you might be
          prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

       --zone=ZONE
          Zone of the disk to operate on. If not specified and the compute/zone
          property isn't set, you might be prompted to select a zone
          (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/zone property:

              $ gcloud config set compute/zone ZONE

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          To unset the property, run:

              $ gcloud config unset compute/zone

          Alternatively, the zone can be stored in the environment variable
          CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute disks convert

        $ gcloud beta compute disks convert
```

### gcloud beta compute disks convert

```text
NAME
    gcloud beta compute disks convert - convert a Compute Engine Persistent
        Disk volume to a Hyperdisk volume

SYNOPSIS
    gcloud beta compute disks convert DISK_NAME
        --target-disk-type=TARGET_DISK_TYPE
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute disks convert

```text
NAME
    gcloud alpha compute disks convert - convert a Compute Engine Persistent
        Disk volume to a Hyperdisk volume

SYNOPSIS
    gcloud alpha compute disks convert DISK_NAME
        --target-disk-type=TARGET_DISK_TYPE
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/disks/convert (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
