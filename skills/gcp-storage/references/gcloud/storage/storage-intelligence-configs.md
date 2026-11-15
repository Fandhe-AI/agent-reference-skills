---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/intelligence-configs
---

# gcloud storage intelligence-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage intelligence-configs describe

```text
NAME
    gcloud storage intelligence-configs describe - describes storage
        intelligence configuration

SYNOPSIS
    gcloud storage intelligence-configs describe
        (--organization=ORGANIZATION | --project=PROJECT
          | --sub-folder=SUB_FOLDER) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe storage intelligence config for the organization, sub-folder or
    project.

EXAMPLES
    The following command describes storage intelligence config for the
    sub-folder with id 123456.

        $ gcloud storage intelligence-configs describe --sub-folder=123456

REQUIRED FLAGS
     Exactly one of these must be specified:

       --organization=ORGANIZATION
          Specifies organization id for the storage intelligence config.

       --project=PROJECT
          Specifies project for the storage intelligence config.

       --sub-folder=SUB_FOLDER
          Specifies sub-folder id for the storage intelligence config.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage intelligence-configs describe
```

### gcloud storage intelligence-configs disable

```text
NAME
    gcloud storage intelligence-configs disable - disables storage intelligence

SYNOPSIS
    gcloud storage intelligence-configs disable
        (--organization=ORGANIZATION | --project=PROJECT
          | --sub-folder=SUB_FOLDER) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disable storage intelligence for the organization, sub-folder or project.

EXAMPLES
    The following command disables storage intelligence for the project.

        $ gcloud storage intelligence-configs disable --project=my-project

REQUIRED FLAGS
     Exactly one of these must be specified:

       --organization=ORGANIZATION
          Specifies organization id for the storage intelligence config.

       --project=PROJECT
          Specifies project for the storage intelligence config.

       --sub-folder=SUB_FOLDER
          Specifies sub-folder id for the storage intelligence config.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage intelligence-configs disable
```

### gcloud storage intelligence-configs enable

```text
NAME
    gcloud storage intelligence-configs enable - enables storage intelligence

SYNOPSIS
    gcloud storage intelligence-configs enable
        (--organization=ORGANIZATION | --project=PROJECT
          | --sub-folder=SUB_FOLDER)
        [--trial-edition
          --exclude-bucket-id-regexes=[EXCLUDE_BUCKET_ID_REGEXES,...]
          | --include-bucket-id-regexes=[INCLUDE_BUCKET_ID_REGEXES,...]
          --exclude-locations=[EXCLUDE_LOCATIONS,...]
          | --include-locations=[INCLUDE_LOCATIONS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enable storage intelligence plan for the organization, sub-folder or
    project along with filters. The command sets STANDARD edition by default if
    no other edition flags like ``--trial-edition`` are specified.

EXAMPLES
    To remove buckets from the storage intelligence plan, Use the following
    command with --exclude-bucket-id-regexes flag. to specify list of bucket id
    regexes.,

        $ gcloud storage intelligence-configs enable --organization=my-org \
            --exclude-bucket-id-regexes="my-bucket-.*"

    To apply location based filters in the storage intelligence plan, Use
    --include-locations or --exclude-locations flags to specify allowed list of
    locations or excluded list of locations. The following command updates
    storage intelligence plan of sub-folder 123456 with the specified list of
    included locations.,

        $ gcloud storage intelligence-configs enable --sub-folder=123456 \
            --include-locations="us-east1","us-west1"

    The following command enables storage intelligence with Trial edition for
    the given project,

        $ gcloud storage intelligence-configs enable --project=my-project \
            --trial-edition

REQUIRED FLAGS
     Exactly one of these must be specified:

       --organization=ORGANIZATION
          Specifies organization id for the storage intelligence config.

       --project=PROJECT
          Specifies project for the storage intelligence config.

       --sub-folder=SUB_FOLDER
          Specifies sub-folder id for the storage intelligence config.

SETTINGS FLAGS
     --trial-edition
        Enables Storage Intelligence for TRIAL edition.

     At most one of these can be specified:

       --exclude-bucket-id-regexes=[EXCLUDE_BUCKET_ID_REGEXES,...]
          Sets filter for bucket id regexes to exclude. Accepts list of bucket
          id regexes in comma separated format. If the regex contains special
          characters that may have a specific meaning in the shell, escape them
          using backslashes(\). To clear bucket id regexes list, provide flag
          with an empty list. e.g --exclude-bucket-id-regexes="" or
          --exclude-bucket-id-regexes= .

       --include-bucket-id-regexes=[INCLUDE_BUCKET_ID_REGEXES,...]
          Sets filter for bucket id regexes to include. Accepts list of bucket
          id regexes in comma separated format. If the regex contains special
          characters that may have a specific meaning in the shell, escape them
          using backslashes(\). To clear bucket id regexes list, provide flag
          with empty list. e.g --include-bucket-id-regexes="" or
          --include-bucket-id-regexes= .

     At most one of these can be specified:

       --exclude-locations=[EXCLUDE_LOCATIONS,...]
          Comma separated list of locations
          (https://cloud.google.com/storage/docs/locations#available-locations)
          to exclude in storage intelligence filter. To clear excluded
          locations, provide flag with empty list. e.g --exclude-locations=""
          or --exclude-locations= .

       --include-locations=[INCLUDE_LOCATIONS,...]
          Comma separated list of locations
          (https://cloud.google.com/storage/docs/locations#available-locations)
          to include in storage intelligence filter. To clear included
          locations, provide flag with empty list. e.g --include-locations=""
          or --include-locations= .

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage intelligence-configs enable
```

### gcloud storage intelligence-configs update

```text
NAME
    gcloud storage intelligence-configs update - updates storage intelligence
        configuration

SYNOPSIS
    gcloud storage intelligence-configs update
        (--organization=ORGANIZATION | --project=PROJECT
          | --sub-folder=SUB_FOLDER)
        (--inherit-from-parent | --trial-edition
          --exclude-bucket-id-regexes=[EXCLUDE_BUCKET_ID_REGEXES,...]
          | --include-bucket-id-regexes=[INCLUDE_BUCKET_ID_REGEXES,...]
          --exclude-locations=[EXCLUDE_LOCATIONS,...]
          | --include-locations=[INCLUDE_LOCATIONS,...]) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update storage intelligence configuration for the organization, sub-folder
    or project. The command sets STANDARD edition by default if no other
    edition flags like ``--trial-edition`` or ``--inherit-from-parent`` are
    specified.

EXAMPLES
    To limit buckets in the storage intelligence configuration, Use the
    following command with --include-bucket-id-regexes flag. to specify list of
    bucket ids and bucket id regexes.,

        $ gcloud storage intelligence-configs update --organization=my-org \
            --include-bucket-id-regexes=my-bucket-.*

    To apply location based filters in the storage intelligence configuration,
    Use --include-locations or --exclude-locations flags to specify allowed
    list of locations or excluded list of locations. The following command
    updates storage intelligence configuration of sub-folder 123456 with the
    specified list of excluded locations.,

        $ gcloud storage intelligence-configs update --sub-folder=123456 \
            --exclude-locations=us-east1,us-west1

    The following command updates storage intelligence for the given project by
    inheriting existing storage intelligence configuration from the
    hierarchical parent resource.,

        $ gcloud storage intelligence-configs update --project=my-project \
            --inherit-from-parent

    To clear included locations from the project storage intelligence, Use the
    following command.,

        $ gcloud storage intelligence-configs update --project=my-project \
            --include-locations=

REQUIRED FLAGS
     Exactly one of these must be specified:

       --organization=ORGANIZATION
          Specifies organization id for the storage intelligence config.

       --project=PROJECT
          Specifies project for the storage intelligence config.

       --sub-folder=SUB_FOLDER
          Specifies sub-folder id for the storage intelligence config.

     Exactly one of these must be specified:

       --inherit-from-parent
          Specifies storage intelligence config to be inherited from parent.

       Or at least one of these can be specified:

         --trial-edition
            Enables Storage Intelligence for TRIAL edition.

         At most one of these can be specified:

           --exclude-bucket-id-regexes=[EXCLUDE_BUCKET_ID_REGEXES,...]
              Sets filter for bucket id regexes to exclude. Accepts list of
              bucket id regexes in comma separated format. If the regex
              contains special characters that may have a specific meaning in
              the shell, escape them using backslashes(\). To clear bucket id
              regexes list, provide flag with an empty list. e.g
              --exclude-bucket-id-regexes="" or --exclude-bucket-id-regexes= .

           --include-bucket-id-regexes=[INCLUDE_BUCKET_ID_REGEXES,...]
              Sets filter for bucket id regexes to include. Accepts list of
              bucket id regexes in comma separated format. If the regex
              contains special characters that may have a specific meaning in
              the shell, escape them using backslashes(\). To clear bucket id
              regexes list, provide flag with empty list. e.g
              --include-bucket-id-regexes="" or --include-bucket-id-regexes= .

         At most one of these can be specified:

           --exclude-locations=[EXCLUDE_LOCATIONS,...]
              Comma separated list of locations
              (https://cloud.google.com/storage/docs/locations#available-locations)
              to exclude in storage intelligence filter. To clear excluded
              locations, provide flag with empty list. e.g
              --exclude-locations="" or --exclude-locations= .

           --include-locations=[INCLUDE_LOCATIONS,...]
              Comma separated list of locations
              (https://cloud.google.com/storage/docs/locations#available-locations)
              to include in storage intelligence filter. To clear included
              locations, provide flag with empty list. e.g
              --include-locations="" or --include-locations= .

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage intelligence-configs update
```

### gcloud alpha storage intelligence-configs describe

```text
NAME
    gcloud alpha storage intelligence-configs describe - describes storage
        intelligence configuration

SYNOPSIS
    gcloud alpha storage intelligence-configs describe
        (--organization=ORGANIZATION | --project=PROJECT
          | --sub-folder=SUB_FOLDER) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage intelligence-configs disable

```text
NAME
    gcloud alpha storage intelligence-configs disable - disables storage
        intelligence

SYNOPSIS
    gcloud alpha storage intelligence-configs disable
        (--organization=ORGANIZATION | --project=PROJECT
          | --sub-folder=SUB_FOLDER) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage intelligence-configs enable

```text
NAME
    gcloud alpha storage intelligence-configs enable - enables storage
        intelligence

SYNOPSIS
    gcloud alpha storage intelligence-configs enable
        (--organization=ORGANIZATION | --project=PROJECT
          | --sub-folder=SUB_FOLDER)
        [--trial-edition
          --exclude-bucket-id-regexes=[EXCLUDE_BUCKET_ID_REGEXES,...]
          | --include-bucket-id-regexes=[INCLUDE_BUCKET_ID_REGEXES,...]
          --exclude-locations=[EXCLUDE_LOCATIONS,...]
          | --include-locations=[INCLUDE_LOCATIONS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage intelligence-configs update

```text
NAME
    gcloud alpha storage intelligence-configs update - updates storage
        intelligence configuration

SYNOPSIS
    gcloud alpha storage intelligence-configs update
        (--organization=ORGANIZATION | --project=PROJECT
          | --sub-folder=SUB_FOLDER)
        (--inherit-from-parent | --trial-edition
          --exclude-bucket-id-regexes=[EXCLUDE_BUCKET_ID_REGEXES,...]
          | --include-bucket-id-regexes=[INCLUDE_BUCKET_ID_REGEXES,...]
          --exclude-locations=[EXCLUDE_LOCATIONS,...]
          | --include-locations=[INCLUDE_LOCATIONS,...]) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/intelligence-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
