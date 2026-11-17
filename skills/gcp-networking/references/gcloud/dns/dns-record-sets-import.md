---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/import
---

# gcloud dns record-sets import

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dns record-sets import

```text
NAME
    gcloud dns record-sets import - import record-sets into your managed-zone

SYNOPSIS
    gcloud dns record-sets import RECORDS_FILE --zone=ZONE, -z ZONE
        [--delete-all-existing] [--location=LOCATION] [--replace-origin-ns]
        [--skip-soa-update] [--zone-file-format] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command imports record-sets contained within the specified record-sets
    file into your managed-zone. Note that NS records for the origin of the
    zone and the SOA NS field are not imported since name-servers are managed
    by Cloud DNS. By default, record-sets cannot be imported if there are any
    conflicts. A conflict exists if an existing record-set has the same name
    and type as a record-set that is being imported. In contrast, if the
    --delete-all-existing flag is used, the imported record-sets will replace
    all the records-sets currently in the managed-zone.

EXAMPLES
    To import record-sets from a yaml record-sets file, run:

        $ gcloud dns record-sets import YAML_RECORDS_FILE --zone=MANAGED_ZONE

    To import record-sets from a zone file, run:

        $ gcloud dns record-sets import ZONE_FILE --zone-file-format \
            --zone=MANAGED_ZONE

    To replace all the record-sets in your zone with records from a yaml file,
    run:

        $ gcloud dns record-sets import YAML_RECORDS_FILE \
            --delete-all-existing --zone=MANAGED_ZONE

POSITIONAL ARGUMENTS
     RECORDS_FILE
        File from which record-sets should be imported. For examples of
        YAML-formatted and BIND zone-formatted records files, refer to
        https://cloud.google.com/dns/records#importing_and_exporting_record_sets

REQUIRED FLAGS
     --zone=ZONE, -z ZONE
        Name of the managed zone whose record sets you want to manage.

OPTIONAL FLAGS
     --delete-all-existing
        Indicates that all existing record-sets should be deleted before
        importing the record-sets in the records-file.

     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

     --replace-origin-ns
        Indicates that NS records for the origin of a zone should be imported
        if defined

     --skip-soa-update
        Skip incrementing the serial number of the SOA record when making
        changes to the record-sets.

     --zone-file-format
        Indicates that the input records-file is in BIND zone format. If
        omitted, indicates that the records-file is in YAML format.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns record-sets import

        $ gcloud beta dns record-sets import
```

### gcloud beta dns record-sets import

```text
NAME
    gcloud beta dns record-sets import - import record-sets into your
        managed-zone

SYNOPSIS
    gcloud beta dns record-sets import RECORDS_FILE --zone=ZONE, -z ZONE
        [--delete-all-existing] [--location=LOCATION] [--replace-origin-ns]
        [--skip-soa-update] [--zone-file-format] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns record-sets import

```text
NAME
    gcloud alpha dns record-sets import - import record-sets into your
        managed-zone

SYNOPSIS
    gcloud alpha dns record-sets import RECORDS_FILE --zone=ZONE, -z ZONE
        [--delete-all-existing] [--location=LOCATION] [--replace-origin-ns]
        [--skip-soa-update] [--zone-file-format] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/import (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
