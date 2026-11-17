---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/delete
---

# gcloud dns record-sets delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dns record-sets delete

```text
NAME
    gcloud dns record-sets delete - delete a record-set in a managed-zone

SYNOPSIS
    gcloud dns record-sets delete DNS_NAME --type=TYPE --zone=ZONE, -z ZONE
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command deletes a record-set contained within the specified
    managed-zone.

EXAMPLES
    To delete a record-set with dnsName foo.bar.com. and record type A, rrdata
    run:

        $ gcloud dns record-sets delete foo.bar.com. --type=A --zone=my_zone

POSITIONAL ARGUMENTS
     DNS_NAME
        DNS or domain name of the record-set.

REQUIRED FLAGS
     --type=TYPE
        DNS record type of the record-set (e.g. A, AAAA, MX etc.).

     --zone=ZONE, -z ZONE
        Name of the managed zone whose record sets you want to manage.

OPTIONAL FLAGS
     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns record-sets delete

        $ gcloud beta dns record-sets delete
```

### gcloud beta dns record-sets delete

```text
NAME
    gcloud beta dns record-sets delete - delete a record-set in a managed-zone

SYNOPSIS
    gcloud beta dns record-sets delete DNS_NAME --type=TYPE --zone=ZONE, -z
        ZONE [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns record-sets delete

```text
NAME
    gcloud alpha dns record-sets delete - delete a record-set in a managed-zone

SYNOPSIS
    gcloud alpha dns record-sets delete DNS_NAME --type=TYPE --zone=ZONE, -z
        ZONE [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
