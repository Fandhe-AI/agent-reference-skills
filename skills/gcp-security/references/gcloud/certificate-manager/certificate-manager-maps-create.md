---
source: https://docs.cloud.google.com/sdk/gcloud/reference/certificate-manager/maps/create
---

# gcloud certificate-manager maps create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud certificate-manager maps create

```text
NAME
    gcloud certificate-manager maps create - create a certificate map

SYNOPSIS
    gcloud certificate-manager maps create (MAP : --location=LOCATION)
        [--description=DESCRIPTION] [--async] [--labels=[KEY=VALUE,...]]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a certificate map.

EXAMPLES
    To create a certificate map with name simple-map, run:

        $ gcloud certificate-manager maps create simple-map

POSITIONAL ARGUMENTS
     Certificate map resource - The certificate map to create. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument map on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MAP
          ID of the certificate map or fully qualified identifier for the
          certificate map.

          To set the map attribute:
          + provide the argument map on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the certificate map.

          To set the location attribute:
          + provide the argument map on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + default value of location is [global].

COMMONLY USED FLAGS
     --description=DESCRIPTION
        Text description of a certificate map.

OTHER FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --tags=[KEY=VALUE,...]
        List of tags KEY=VALUE pairs to bind. Each item must be expressed as
        <tag-key-namespaced-name>=<tag-value-short-name>.

        Example: 123/environment=production,123/costCenter=marketing

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha certificate-manager maps create

        $ gcloud beta certificate-manager maps create
```

### gcloud beta certificate-manager maps create

```text
NAME
    gcloud beta certificate-manager maps create - create a certificate map

SYNOPSIS
    gcloud beta certificate-manager maps create (MAP : --location=LOCATION)
        [--description=DESCRIPTION] [--async] [--labels=[KEY=VALUE,...]]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha certificate-manager maps create

```text
NAME
    gcloud alpha certificate-manager maps create - create a certificate map

SYNOPSIS
    gcloud alpha certificate-manager maps create (MAP : --location=LOCATION)
        [--description=DESCRIPTION] [--async] [--labels=[KEY=VALUE,...]]
        [--tags=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/certificate-manager/maps/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
