---
source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/google-domains-dns
---

# gcloud domains registrations google-domains-dns

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud domains registrations google-domains-dns export-dns-record-sets

```text
NAME
    gcloud domains registrations google-domains-dns export-dns-record-sets -
        export your registration's Google Domains DNS zone's record-sets into a
        file

SYNOPSIS
    gcloud domains registrations google-domains-dns export-dns-record-sets
        REGISTRATION --records-file=RECORDS_FILE [--zone-file-format]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export your registration's Google Domains DNS (deprecated) zone's
    record-sets into a file. The formats you can export to are YAML records
    format (default) and BIND zone file format.

EXAMPLES
    To export DNS record-sets of example.com into a YAML file, run:

        $ gcloud domains registrations google-domains-dns \
            export-dns-record-sets example.com --records-file=records.yaml

    To export DNS record-sets of example.com into a BIND zone formatted file,
    run:

        $ gcloud domains registrations google-domains-dns \
            export-dns-record-sets example.com \
            --records-file=records.zonefile --zone-file-format

POSITIONAL ARGUMENTS
     Registration resource - The domain registration to get the DNS records
     for. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * location is always global.

     This must be specified.

       REGISTRATION
          ID of the registration or fully qualified identifier for the
          registration.

          To set the registration attribute:
          + provide the argument registration on the command line.

REQUIRED FLAGS
     --records-file=RECORDS_FILE
        File to which record-sets should be exported.

OPTIONAL FLAGS
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

        $ gcloud alpha domains registrations google-domains-dns \
            export-dns-record-sets

        $ gcloud beta domains registrations google-domains-dns \
            export-dns-record-sets
```

### gcloud domains registrations google-domains-dns get-forwarding-config

```text
NAME
    gcloud domains registrations google-domains-dns get-forwarding-config - get
        forwarding configuration of a specific Cloud Domains registration

SYNOPSIS
    gcloud domains registrations google-domains-dns get-forwarding-config
        REGISTRATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get forwarding configuration (deprecated) of a specific registration.

EXAMPLES
    To get forwarding configuration of example.com, run:

        $ gcloud domains registrations google-domains-dns \
            get-forwarding-config example.com

POSITIONAL ARGUMENTS
     Registration resource - The domain registration to get the forwarding
     config for. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * location is always global.

     This must be specified.

       REGISTRATION
          ID of the registration or fully qualified identifier for the
          registration.

          To set the registration attribute:
          + provide the argument registration on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha domains registrations google-domains-dns \
            get-forwarding-config

        $ gcloud beta domains registrations google-domains-dns \
            get-forwarding-config
```

### gcloud beta domains registrations google-domains-dns export-dns-record-sets

```text
NAME
    gcloud beta domains registrations google-domains-dns export-dns-record-sets
        - export your registration's Google Domains DNS zone's record-sets into
        a file

SYNOPSIS
    gcloud beta domains registrations google-domains-dns export-dns-record-sets
        REGISTRATION --records-file=RECORDS_FILE [--zone-file-format]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta domains registrations google-domains-dns get-forwarding-config

```text
NAME
    gcloud beta domains registrations google-domains-dns get-forwarding-config
        - get forwarding configuration of a specific Cloud Domains registration

SYNOPSIS
    gcloud beta domains registrations google-domains-dns get-forwarding-config
        REGISTRATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations google-domains-dns export-dns-record-sets

```text
NAME
    gcloud alpha domains registrations google-domains-dns
        export-dns-record-sets - export your registration's Google Domains DNS
        zone's record-sets into a file

SYNOPSIS
    gcloud alpha domains registrations google-domains-dns
        export-dns-record-sets REGISTRATION --records-file=RECORDS_FILE
        [--zone-file-format] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations google-domains-dns get-forwarding-config

```text
NAME
    gcloud alpha domains registrations google-domains-dns get-forwarding-config
        - get forwarding configuration of a specific Cloud Domains registration

SYNOPSIS
    gcloud alpha domains registrations google-domains-dns get-forwarding-config
        REGISTRATION [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/google-domains-dns (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
