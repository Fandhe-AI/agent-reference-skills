---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/saas
---

# gcloud app-lifecycle-manager saas

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app-lifecycle-manager saas create

```text
NAME
    gcloud app-lifecycle-manager saas create - create a SaaS offering

SYNOPSIS
    gcloud app-lifecycle-manager saas create (SAAS : --location=LOCATION)
        --locations=[name=NAME] [--labels=[LABELS,...]]
        [--application-template=APPLICATION_TEMPLATE
          : --application-template-revision=APPLICATION_TEMPLATE_REVISION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an App Lifecycle Manager SaaS offering.

    A SaaS offering (also called an app offering) represents a SaaS product
    managed by the service producer. It defines the locations in which the
    product is available.

EXAMPLES
    To create a SaaS offering named my-saas in location us-central1 that is
    available in us-central1, run:

        $ gcloud app-lifecycle-manager saas create my-saas \
            --location=us-central1 --locations=name=us-central1

    To create a SaaS offering named my-saas that is available in us-central1
    and europe-west1 and has the label env=prod, run:

        $ gcloud app-lifecycle-manager saas create my-saas \
            --location=us-central1 --locations=name=us-central1 \
            --locations=name=europe-west1 --labels=env=prod

POSITIONAL ARGUMENTS
     Saas resource - SaaS offering to create. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument saas on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SAAS
          ID of the saas or fully qualified identifier for the saas.

          To set the saas attribute:
          + provide the argument saas on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument saas on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --locations=[name=NAME]
        Required, Locations in which the SaaS offering is available. Rollouts
        use this list to generate a rollout plan. Repeat the flag to specify
        multiple locations.

         name
            Name of the location.

        Shorthand Example:

            --locations=name=string --locations=name=string

        JSON Example:

            --locations='[{"name": "string"}]'

        File Example:

            --locations=path_to_file.(yaml|json)

OPTIONAL FLAGS
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

     Composite application template. Specify only in source regions; leave
     unspecified in replica regions. When specified, the template components
     are imported into their equivalent unit kind, release, and blueprint
     resources. Deleting the reference does not delete imported resources.

     --application-template=APPLICATION_TEMPLATE
        Full resource name of the Application Design Center composite
        application template to import.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --application-template-revision=APPLICATION_TEMPLATE_REVISION
        Revision of the application template to use. Changes to the revision
        trigger manual resynchronization. If empty, the application template is
        ignored.

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

        $ gcloud beta app-lifecycle-manager saas create
```

### gcloud app-lifecycle-manager saas delete

```text
NAME
    gcloud app-lifecycle-manager saas delete - delete a SaaS offering

SYNOPSIS
    gcloud app-lifecycle-manager saas delete (SAAS : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an App Lifecycle Manager SaaS offering.

    The command prompts for confirmation before the SaaS offering is deleted.

EXAMPLES
    To delete the SaaS offering named my-saas in location us-central1, run:

        $ gcloud app-lifecycle-manager saas delete my-saas \
            --location=us-central1

    To delete the SaaS offering named my-saas in location us-central1 without a
    confirmation prompt, run:

        $ gcloud app-lifecycle-manager saas delete my-saas \
            --location=us-central1 --quiet

POSITIONAL ARGUMENTS
     Saas resource - SaaS offering to delete. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument saas on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SAAS
          ID of the saas or fully qualified identifier for the saas.

          To set the saas attribute:
          + provide the argument saas on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument saas on the command line with a fully
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

        $ gcloud beta app-lifecycle-manager saas delete
```

### gcloud app-lifecycle-manager saas describe

```text
NAME
    gcloud app-lifecycle-manager saas describe - describe a SaaS offering

SYNOPSIS
    gcloud app-lifecycle-manager saas describe (SAAS : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display the details of an App Lifecycle Manager SaaS offering.

EXAMPLES
    To describe the SaaS offering named my-saas in location us-central1, run:

        $ gcloud app-lifecycle-manager saas describe my-saas \
            --location=us-central1

    To display only the name, labels, and last update time of the SaaS offering
    named my-saas in location us-central1, run:

        $ gcloud app-lifecycle-manager saas describe my-saas \
            --location=us-central1 --format="yaml(name,labels,updateTime)"

POSITIONAL ARGUMENTS
     Saas resource - SaaS offering to describe. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument saas on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SAAS
          ID of the saas or fully qualified identifier for the saas.

          To set the saas attribute:
          + provide the argument saas on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument saas on the command line with a fully
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

        $ gcloud beta app-lifecycle-manager saas describe
```

### gcloud app-lifecycle-manager saas list

```text
NAME
    gcloud app-lifecycle-manager saas list - list SaaS offerings

SYNOPSIS
    gcloud app-lifecycle-manager saas list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List App Lifecycle Manager SaaS offerings.

    If --location is not specified, SaaS offerings in all locations are listed.

EXAMPLES
    To list all SaaS offerings in location us-central1, run:

        $ gcloud app-lifecycle-manager saas list --location=us-central1

    To list only the names of SaaS offerings with the label env=prod in all
    locations, run:

        $ gcloud app-lifecycle-manager saas list \
            --filter="labels.env=prod" --format="value(name)"

FLAGS
     Location resource - Location of the SaaS offerings to list. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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

        $ gcloud beta app-lifecycle-manager saas list
```

### gcloud app-lifecycle-manager saas update

```text
NAME
    gcloud app-lifecycle-manager saas update - update a SaaS offering

SYNOPSIS
    gcloud app-lifecycle-manager saas update (SAAS : --location=LOCATION)
        [--application-template=APPLICATION_TEMPLATE
          --application-template-revision=APPLICATION_TEMPLATE_REVISION
          --clear-application-template]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--locations=[name=NAME]
          | --add-locations=[name=NAME] --clear-locations
          | --remove-locations=[name=NAME]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an App Lifecycle Manager SaaS offering.

EXAMPLES
    To add or update the label env=prod on the SaaS offering named my-saas in
    location us-central1, run:

        $ gcloud app-lifecycle-manager saas update my-saas \
            --location=us-central1 --update-labels=env=prod

    To make the SaaS offering named my-saas also available in europe-west1 and
    remove the label env, run:

        $ gcloud app-lifecycle-manager saas update my-saas \
            --location=us-central1 --add-locations=name=europe-west1 \
            --remove-labels=env

POSITIONAL ARGUMENTS
     Saas resource - SaaS offering to update. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument saas on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SAAS
          ID of the saas or fully qualified identifier for the saas.

          To set the saas attribute:
          + provide the argument saas on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument saas on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     Composite application template. Specify only in source regions; leave
     unspecified in replica regions. When specified, the template components
     are imported into their equivalent unit kind, release, and blueprint
     resources. Deleting the reference does not delete imported resources.

     --application-template=APPLICATION_TEMPLATE
        Full resource name of the Application Design Center composite
        application template to import.

     --application-template-revision=APPLICATION_TEMPLATE_REVISION
        Revision of the application template to use. Changes to the revision
        trigger manual resynchronization. If empty, the application template is
        ignored.

     --clear-application-template
        Set saas.applicationTemplate back to default value.

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

     Update locations.

     At most one of these can be specified:

       --locations=[name=NAME]
          Set locations to new value. Locations in which the SaaS offering is
          available. Rollouts use this list to generate a rollout plan. Repeat
          the flag to specify multiple locations.

           name
              Name of the location.

          Shorthand Example:

              --locations=name=string --locations=name=string

          JSON Example:

              --locations='[{"name": "string"}]'

          File Example:

              --locations=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-locations=[name=NAME]
            Add new value to locations list. Locations in which the SaaS
            offering is available. Rollouts use this list to generate a rollout
            plan. Repeat the flag to specify multiple locations.

             name
                Name of the location.

            Shorthand Example:

                --add-locations=name=string --add-locations=name=string

            JSON Example:

                --add-locations='[{"name": "string"}]'

            File Example:

                --add-locations=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-locations
              Clear locations value and set to empty list.

           --remove-locations=[name=NAME]
              Remove existing value from locations list. Locations in which the
              SaaS offering is available. Rollouts use this list to generate a
              rollout plan. Repeat the flag to specify multiple locations.

               name
                  Name of the location.

              Shorthand Example:

                  --remove-locations=name=string --remove-locations=name=string

              JSON Example:

                  --remove-locations='[{"name": "string"}]'

              File Example:

                  --remove-locations=path_to_file.(yaml|json)

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

        $ gcloud beta app-lifecycle-manager saas update
```

### gcloud beta app-lifecycle-manager saas create

```text
NAME
    gcloud beta app-lifecycle-manager saas create - create a SaaS offering

SYNOPSIS
    gcloud beta app-lifecycle-manager saas create (SAAS : --location=LOCATION)
        --locations=[name=NAME] [--labels=[LABELS,...]]
        [--application-template=APPLICATION_TEMPLATE
          : --application-template-revision=APPLICATION_TEMPLATE_REVISION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager saas delete

```text
NAME
    gcloud beta app-lifecycle-manager saas delete - delete a SaaS offering

SYNOPSIS
    gcloud beta app-lifecycle-manager saas delete (SAAS : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager saas describe

```text
NAME
    gcloud beta app-lifecycle-manager saas describe - describe a SaaS offering

SYNOPSIS
    gcloud beta app-lifecycle-manager saas describe
        (SAAS : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager saas list

```text
NAME
    gcloud beta app-lifecycle-manager saas list - list SaaS offerings

SYNOPSIS
    gcloud beta app-lifecycle-manager saas list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager saas update

```text
NAME
    gcloud beta app-lifecycle-manager saas update - update a SaaS offering

SYNOPSIS
    gcloud beta app-lifecycle-manager saas update (SAAS : --location=LOCATION)
        [--application-template=APPLICATION_TEMPLATE
          --application-template-revision=APPLICATION_TEMPLATE_REVISION
          --clear-application-template]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--locations=[name=NAME]
          | --add-locations=[name=NAME] --clear-locations
          | --remove-locations=[name=NAME]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/saas (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
