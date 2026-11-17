---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/export
---

# gcloud dns record-sets export

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dns record-sets export

```text
NAME
    gcloud dns record-sets export - export your record-sets into a file

SYNOPSIS
    gcloud dns record-sets export RECORDS_FILE --zone=ZONE, -z ZONE
        [--location=LOCATION] [--zone-file-format] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command exports the record-sets contained within the specified
    managed-zone into a file. The formats you can export to are YAML records
    format (default) and BIND zone file format.

EXAMPLES
    To export record-sets into a yaml file, run:

        $ gcloud dns record-sets export records.yaml --zone=examplezonename

    To export record-sets into a BIND zone formatted file instead, run:

        $ gcloud dns record-sets export pathto.zonefile \
            --zone=examplezonename --zone-file-format

    Similarly, to import record-sets into a BIND zone formatted zone file, run:

        $ gcloud dns record-sets import pathto.zonefile --zone-file-format \
            --zone=examplezonename

POSITIONAL ARGUMENTS
     RECORDS_FILE
        File to which record-sets should be exported.

REQUIRED FLAGS
     --zone=ZONE, -z ZONE
        Name of the managed zone whose record sets you want to manage.

OPTIONAL FLAGS
     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

     --zone-file-format
        Indicates that records-file should be in the zone file format. When
        using this flag, expect the record-set to be exported to a BIND zone
        formatted file. If you omit this flag, the record-set is exported into
        a YAML formatted records file. Note, this format flag determines the
        format of the output recorded in the records-file; it is different from
        the global --format flag which affects console output alone.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns record-sets export

        $ gcloud beta dns record-sets export
```

### gcloud beta dns record-sets export

```text
NAME
    gcloud beta dns record-sets export - export your record-sets into a file

SYNOPSIS
    gcloud beta dns record-sets export RECORDS_FILE --zone=ZONE, -z ZONE
        [--location=LOCATION] [--zone-file-format] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns record-sets export

```text
NAME
    gcloud alpha dns record-sets export - export your record-sets into a file

SYNOPSIS
    gcloud alpha dns record-sets export RECORDS_FILE --zone=ZONE, -z ZONE
        [--location=LOCATION] [--zone-file-format] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/export (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
