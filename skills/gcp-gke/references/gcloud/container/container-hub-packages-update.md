---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/packages/update
---

# gcloud container hub packages update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub packages update

```text
NAME
    gcloud container hub packages update - update Package Rollouts Fleet
        Package

SYNOPSIS
    gcloud container hub packages update (FLEET_PACKAGE : --location=LOCATION)
        --source=SOURCE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update Package Rollouts Fleet Package.

EXAMPLES
    To update Fleet Package cert-manager-app, run:

        $ gcloud container hub packages update cert-manager-app \
             --source=my_source.yaml

POSITIONAL ARGUMENTS
     Fleet package resource - The Fleet Package to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument fleet_package on the command line with a fully
        specified name;
      * set the property core/project.

     This must be specified.

       FLEET_PACKAGE
          ID of the fleet-package or fully qualified identifier for the
          fleet-package.

          To set the fleet-package attribute:
          + provide the argument fleet_package on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud zone or region for the fleet-package.

          To set the location attribute:
          + provide the argument fleet_package on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property config_delivery/location.

REQUIRED FLAGS
     --source=SOURCE
        Source file containing Fleet Package configuration.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub packages update

        $ gcloud beta container hub packages update
```

### gcloud beta container hub packages update

```text
NAME
    gcloud beta container hub packages update - update Package Rollouts Fleet
        Package

SYNOPSIS
    gcloud beta container hub packages update
        (FLEET_PACKAGE : --location=LOCATION) --source=SOURCE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub packages update

```text
NAME
    gcloud alpha container hub packages update - update Package Rollouts Fleet
        Package

SYNOPSIS
    gcloud alpha container hub packages update
        (FLEET_PACKAGE : --location=LOCATION) --source=SOURCE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/packages/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
