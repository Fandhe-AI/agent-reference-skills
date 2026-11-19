---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/releases
---

# gcloud app-lifecycle-manager releases

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app-lifecycle-manager releases create

```text
NAME
    gcloud app-lifecycle-manager releases create - create a release

SYNOPSIS
    gcloud app-lifecycle-manager releases create RELEASE
        --blueprint-package=BLUEPRINT_PACKAGE --unit-kind=UNIT_KIND
        [--input-variable-defaults=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]] [--labels=[LABELS,...]]
        [--location=LOCATION]
        [--upgradeable-from-releases=[UPGRADEABLE_FROM_RELEASES,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an App Lifecycle Manager release.

    A release is a new version to be propagated and deployed to units. It
    includes a pointer to a blueprint, which is an Open Container Initiative
    (OCI) image stored in Artifact Registry or another OCI registry.

EXAMPLES
    To create a release named my-release for the unit kind my-unit-kind in
    location us-central1 from a blueprint in Artifact Registry, run:

        $ gcloud app-lifecycle-manager releases create my-release \
            --location=us-central1 --unit-kind=my-unit-kind \
            --blueprint-package=us-central1-docker.pkg.dev/my-project/\
        my-repo/my-blueprint:v2

    To create a release named my-release that units can upgrade to only from
    the release my-old-release, with a default value for the input variable
    instance_name and the label env=prod, run:

        $ gcloud app-lifecycle-manager releases create my-release \
            --location=us-central1 --unit-kind=my-unit-kind \
            --blueprint-package=us-central1-docker.pkg.dev/my-project/\
        my-repo/my-blueprint:v2 --upgradeable-from-releases=my-old-release \
            --input-variable-defaults=variable=instance_name,\
        value=my-instance,type=string --labels=env=prod

POSITIONAL ARGUMENTS
     Release resource - Release to create. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument release on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument release on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument release on the command line.

REQUIRED FLAGS
     Blueprint of the release. Blueprints are OCI images that contain all the
     artifacts needed to provision a unit. Metadata, such as the type of
     actuation engine (for example, Terraform) and the version, comes from the
     image manifest. If the hostname is omitted, the regional path to Artifact
     Registry (for example, us-east1-docker.pkg.dev) is assumed.

     This must be specified.

       --blueprint-package=BLUEPRINT_PACKAGE
          URI of the blueprint used by the unit. The blueprint package cannot
          be changed after the release is created.

     UnitKind resource - Unit kind that this release corresponds to. The unit
     kind is required and cannot be changed after the release is created. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --unit-kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --unit-kind on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --unit-kind=UNIT_KIND
          ID of the unitKind or fully qualified identifier for the unitKind.

          To set the unit-kind attribute:
          + provide the argument --unit-kind on the command line.

OPTIONAL FLAGS
     --input-variable-defaults=[type=TYPE],[value=VALUE],[variable=VARIABLE]
        Mapping of input variables to default values. A maximum of 100 input
        variables can be specified.

         type
            Name of a supported variable type. Supported types are string, int,
            bool, struct, and list.

         value
            String-encoded value for the variable. Values of type struct or
            list must be JSON-encoded strings.

         variable
            Required, Name of the variable from the actuation configuration.

        Shorthand Example:

            --input-variable-defaults=type=string,value=string,variable=string --input-variable-defaults=type=string,value=string,variable=string

        JSON Example:

            --input-variable-defaults='[{"type": "string", "value": "string", "variable": "string"}]'

        File Example:

            --input-variable-defaults=path_to_file.(yaml|json)

     --labels=[LABELS,...]
        Labels on the resource, which can be used for categorization, similar
        to Kubernetes resource labels.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     --location=LOCATION
        For resources [release, unit-kind], provides fallback value for
        resource location attribute. When the resource's full URI path is not
        provided, location will fallback to this flag value.

     --upgradeable-from-releases=[UPGRADEABLE_FROM_RELEASES,...]
        Releases from which a unit can be upgraded to this release. If empty,
        no constraints are applied. If provided, unit upgrade requests to this
        release check and enforce this constraint.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager releases create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud app-lifecycle-manager releases create my-release \
    --location=us-central1 \
    --unit-kind=my-unit-kind \
    --blueprint-package=us-central1-docker.pkg.dev/my-project/my-repo/my-blueprint:v2

gcloud app-lifecycle-manager releases create my-release \
    --location=us-central1 \
    --unit-kind=my-unit-kind \
    --blueprint-package=us-central1-docker.pkg.dev/my-project/my-repo/my-blueprint:v2 \
    --upgradeable-from-releases=my-old-release \
    --input-variable-defaults=variable=instance_name,value=my-instance,type=string \
    --labels=env=prod
```

### gcloud app-lifecycle-manager releases delete

```text
NAME
    gcloud app-lifecycle-manager releases delete - delete a release

SYNOPSIS
    gcloud app-lifecycle-manager releases delete
        (RELEASE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an App Lifecycle Manager release.

    The command prompts for confirmation before the release is deleted.

EXAMPLES
    To delete the release named my-release in location us-central1, run:

        $ gcloud app-lifecycle-manager releases delete my-release \
            --location=us-central1

    To delete the release named my-release in location us-central1 without a
    confirmation prompt, run:

        $ gcloud app-lifecycle-manager releases delete my-release \
            --location=us-central1 --quiet

POSITIONAL ARGUMENTS
     Release resource - Release to delete. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument release on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument release on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument release on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager releases delete
```

### gcloud app-lifecycle-manager releases describe

```text
NAME
    gcloud app-lifecycle-manager releases describe - describe a release

SYNOPSIS
    gcloud app-lifecycle-manager releases describe
        (RELEASE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display the details of an App Lifecycle Manager release.

EXAMPLES
    To describe the release named my-release in location us-central1, run:

        $ gcloud app-lifecycle-manager releases describe my-release \
            --location=us-central1

    To display only the unit kind and blueprint of the release named my-release
    in location us-central1, run:

        $ gcloud app-lifecycle-manager releases describe my-release \
            --location=us-central1 --format="yaml(unitKind,blueprint)"

POSITIONAL ARGUMENTS
     Release resource - Release to describe. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument release on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument release on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument release on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager releases describe
```

### gcloud app-lifecycle-manager releases list

```text
NAME
    gcloud app-lifecycle-manager releases list - list releases

SYNOPSIS
    gcloud app-lifecycle-manager releases list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List App Lifecycle Manager releases.

    If --location is not specified, releases in all locations are listed.

EXAMPLES
    To list all releases in location us-central1, run:

        $ gcloud app-lifecycle-manager releases list --location=us-central1

    To list only the names of releases with the label env=prod in all
    locations, run:

        $ gcloud app-lifecycle-manager releases list \
            --filter="labels.env=prod" --format="value(name)"

FLAGS
     Location resource - Location of the releases to list. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * if left empty, will use the wildcard '-' to list all locations with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * if left empty, will use the wildcard '-' to list all locations.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager releases list
```

### gcloud app-lifecycle-manager releases update

```text
NAME
    gcloud app-lifecycle-manager releases update - update a release

SYNOPSIS
    gcloud app-lifecycle-manager releases update
        (RELEASE : --location=LOCATION)
        [--input-variable-defaults=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]
          | --add-input-variable-defaults=[type=TYPE],
          [value=VALUE],[variable=VARIABLE] --clear-input-variable-defaults
          | --remove-input-variable-defaults=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--upgradeable-from-releases=[UPGRADEABLE_FROM_RELEASES,...]
          | --add-upgradeable-from-releases=[ADD_UPGRADEABLE_FROM_RELEASES,...]
          --clear-upgradeable-from-releases
          | --remove-upgradeable-from-releases=[REMOVE_UPGRADEABLE_FROM_RELEASES,
          ...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an App Lifecycle Manager release.

EXAMPLES
    To add or update the label env=prod on the release named my-release in
    location us-central1, run:

        $ gcloud app-lifecycle-manager releases update my-release \
            --location=us-central1 --update-labels=env=prod

    To add the release my-old-release to the releases from which units can be
    upgraded to the release named my-release, and to add a default value for
    the input variable instance_name, run:

        $ gcloud app-lifecycle-manager releases update my-release \
            --location=us-central1 \
            --add-upgradeable-from-releases=my-old-release \
            --add-input-variable-defaults=variable=instance_name,\
        value=my-instance,type=string

POSITIONAL ARGUMENTS
     Release resource - Release to update. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument release on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument release on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument release on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     Update input_variable_defaults.

     At most one of these can be specified:

       --input-variable-defaults=[type=TYPE],[value=VALUE],[variable=VARIABLE]
          Set input_variable_defaults to new value. Mapping of input variables
          to default values. A maximum of 100 input variables can be specified.

           type
              Name of a supported variable type. Supported types are string,
              int, bool, struct, and list.

           value
              String-encoded value for the variable. Values of type struct or
              list must be JSON-encoded strings.

           variable
              Name of the variable from the actuation configuration.

          Shorthand Example:

              --input-variable-defaults=type=string,value=string,variable=string --input-variable-defaults=type=string,value=string,variable=string

          JSON Example:

              --input-variable-defaults='[{"type": "string", "value": "string", "variable": "string"}]'

          File Example:

              --input-variable-defaults=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-input-variable-defaults=[type=TYPE],[value=VALUE],[variable=VARIABLE]
            Add new value to input_variable_defaults list. Mapping of input
            variables to default values. A maximum of 100 input variables can
            be specified.

             type
                Name of a supported variable type. Supported types are string,
                int, bool, struct, and list.

             value
                String-encoded value for the variable. Values of type struct or
                list must be JSON-encoded strings.

             variable
                Name of the variable from the actuation configuration.

            Shorthand Example:

                --add-input-variable-defaults=type=string,value=string,variable=string --add-input-variable-defaults=type=string,value=string,variable=string

            JSON Example:

                --add-input-variable-defaults='[{"type": "string", "value": "string", "variable": "string"}]'

            File Example:

                --add-input-variable-defaults=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-input-variable-defaults
              Clear input_variable_defaults value and set to empty list.

           --remove-input-variable-defaults=[type=TYPE],[value=VALUE],[variable=VARIABLE]
              Remove existing value from input_variable_defaults list. Mapping
              of input variables to default values. A maximum of 100 input
              variables can be specified.

               type
                  Name of a supported variable type. Supported types are
                  string, int, bool, struct, and list.

               value
                  String-encoded value for the variable. Values of type struct
                  or list must be JSON-encoded strings.

               variable
                  Name of the variable from the actuation configuration.

              Shorthand Example:

                  --remove-input-variable-defaults=type=string,value=string,variable=string --remove-input-variable-defaults=type=string,value=string,variable=string

              JSON Example:

                  --remove-input-variable-defaults='[{"type": "string", "value": "string", "variable": "string"}]'

              File Example:

                  --remove-input-variable-defaults=path_to_file.(yaml|json)

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Labels on the resource, which can be used
          for categorization, similar to Kubernetes resource labels.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. Labels on the resource,
            which can be used for categorization, similar to Kubernetes
            resource labels.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

     Update upgradeable_from_releases.

     At most one of these can be specified:

       --upgradeable-from-releases=[UPGRADEABLE_FROM_RELEASES,...]
          Set upgradeable_from_releases to new value.

       Or at least one of these can be specified:

         --add-upgradeable-from-releases=[ADD_UPGRADEABLE_FROM_RELEASES,...]
            Add new value to upgradeable_from_releases list.

         At most one of these can be specified:

           --clear-upgradeable-from-releases
              Clear upgradeable_from_releases value and set to empty list.

           --remove-upgradeable-from-releases=[REMOVE_UPGRADEABLE_FROM_RELEASES,...]
              Remove existing value from upgradeable_from_releases list.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager releases update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud app-lifecycle-manager releases update my-release \
    --location=us-central1 \
    --add-upgradeable-from-releases=my-old-release \
    --add-input-variable-defaults=variable=instance_name,value=my-instance,type=string
```

### gcloud beta app-lifecycle-manager releases create

```text
NAME
    gcloud beta app-lifecycle-manager releases create - create a release

SYNOPSIS
    gcloud beta app-lifecycle-manager releases create RELEASE
        --blueprint-package=BLUEPRINT_PACKAGE --unit-kind=UNIT_KIND
        [--input-variable-defaults=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]] [--labels=[LABELS,...]]
        [--location=LOCATION]
        [--upgradeable-from-releases=[UPGRADEABLE_FROM_RELEASES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager releases delete

```text
NAME
    gcloud beta app-lifecycle-manager releases delete - delete a release

SYNOPSIS
    gcloud beta app-lifecycle-manager releases delete
        (RELEASE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager releases describe

```text
NAME
    gcloud beta app-lifecycle-manager releases describe - describe a release

SYNOPSIS
    gcloud beta app-lifecycle-manager releases describe
        (RELEASE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager releases list

```text
NAME
    gcloud beta app-lifecycle-manager releases list - list releases

SYNOPSIS
    gcloud beta app-lifecycle-manager releases list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager releases update

```text
NAME
    gcloud beta app-lifecycle-manager releases update - update a release

SYNOPSIS
    gcloud beta app-lifecycle-manager releases update
        (RELEASE : --location=LOCATION)
        [--input-variable-defaults=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]
          | --add-input-variable-defaults=[type=TYPE],
          [value=VALUE],[variable=VARIABLE] --clear-input-variable-defaults
          | --remove-input-variable-defaults=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--upgradeable-from-releases=[UPGRADEABLE_FROM_RELEASES,...]
          | --add-upgradeable-from-releases=[ADD_UPGRADEABLE_FROM_RELEASES,...]
          --clear-upgradeable-from-releases
          | --remove-upgradeable-from-releases=[REMOVE_UPGRADEABLE_FROM_RELEASES,
          ...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/releases (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
