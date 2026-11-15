---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/relocate
---

# gcloud storage buckets relocate

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage buckets relocate

```text
NAME
    gcloud storage buckets relocate - relocates bucket between different
        locations

SYNOPSIS
    gcloud storage buckets relocate
        ([URL --location=LOCATION : --placement=[REGION,...]
          --destination-kms-key-name=DESTINATION_KMS_KEY_NAME
          --dry-run] [--operation=OPERATION --finalize : --ttl=TTL])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Relocates a bucket between different locations.

EXAMPLES
    To move a bucket (gs://my-bucket) to the us-central1 location, use the
    following command:

        $ gcloud storage buckets relocate gs://my-bucket \
          --location=us-central1

    To move a bucket to a custom dual-region, use the following command:

        $ gcloud storage buckets relocate gs://my-bucket --location=us \
          --placement=us-central1,us-east1

    To validate the operation without actually moving the bucket, use the
    following command:

        $ gcloud storage buckets relocate gs://my-bucket \
          --location=us-central1 --dry-run

    To schedule a write lock for the move, with ttl for reverting the write
    lock after 7h, if the relocation has not succeeded, use the following
    command:

        $ gcloud storage buckets relocate \
          --operation=projects/_/buckets/my-bucket/operations/C894F35J \
          --finalize --ttl=7h

POSITIONAL ARGUMENTS
     Exactly one of these must be specified:

       Arguments for initiating the bucket relocate operation.

       URL
          The URL of the bucket to relocate.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The final location (https://cloud.google.com/storage/docs/locations)
          where the bucket will be relocated to. If no location is provided,
          Cloud Storage will use the default location, which is us.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --placement=[REGION,...]
          A comma-separated list of regions that form the custom dual-region
          (https://cloud.google.com/storage/docs/locations#location-dr). Only
          regions within the same continent are or will ever be valid. Invalid
          location pairs (such as mixed-continent, or with unsupported regions)
          will return an error.

       --destination-kms-key-name=DESTINATION_KMS_KEY_NAME
          This is only required when relocating a bucket that uses
          Customer-Managed Encryption Keys (CMEK). The full resource name of
          the Cloud KMS key to use for encrypting objects in the destination
          bucket. This key will be set as the default bucket encryption key.
          The key must exist in the destination location. Format:
          projects/PROJECT/locations/LOCATION/keyRings/RING/cryptoKeys/KEY

       --dry-run
          Prints the operations that the relocate command would perform without
          actually performing relocation. This is helpful to identify any
          issues that need to be detected asynchronously.

       Arguments for advancing the relocation operation.

       --operation=OPERATION
          Specify the relocation operation name to advance the relocation
          operation.The relocation operation name must include the Cloud
          Storage bucket and operation ID.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --finalize
          Schedules the write lock to occur. Once activated, no further writes
          will be allowed to the associated bucket. This helps minimize
          disruption to bucket usage. For certain types of moves(between Multi
          Region and Custom Dual Regions), finalize is not required.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --ttl=TTL
          Time to live for the relocation operation. Defaults to 12h if not
          provided.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage buckets relocate
```

### gcloud alpha storage buckets relocate

```text
NAME
    gcloud alpha storage buckets relocate - relocates bucket between different
        locations

SYNOPSIS
    gcloud alpha storage buckets relocate
        ([URL --location=LOCATION : --placement=[REGION,...]
          --destination-kms-key-name=DESTINATION_KMS_KEY_NAME
          --dry-run] [--operation=OPERATION --finalize : --ttl=TTL])
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/relocate (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
