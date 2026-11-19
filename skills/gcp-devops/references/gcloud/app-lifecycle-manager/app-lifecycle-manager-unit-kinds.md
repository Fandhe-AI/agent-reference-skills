---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/unit-kinds
---

# gcloud app-lifecycle-manager unit-kinds

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app-lifecycle-manager unit-kinds create

```text
NAME
    gcloud app-lifecycle-manager unit-kinds create - create a unit kind

SYNOPSIS
    gcloud app-lifecycle-manager unit-kinds create UNIT_KIND --saas=SAAS
        [--default-release=DEFAULT_RELEASE]
        [--dependencies=[alias=ALIAS],[unitKind=UNITKIND]]
        [--input-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]]
        [--labels=[LABELS,...]] [--location=LOCATION]
        [--output-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]]
        [--app-params-group=APP_PARAMS_GROUP --scope-type=SCOPE_TYPE]
        [--application-template-component=APPLICATION_TEMPLATE_COMPONENT
          --application-template-component-revision=APPLICATION_TEMPLATE_COMPONENT_REVISION [--composite-ref-application-template=COMPOSITE_REF_APPLICATION_TEMPLATE : --composite-ref-revision=COMPOSITE_REF_REVISION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an App Lifecycle Manager unit kind.

    A unit kind defines a type of managed component (unit) within a SaaS
    offering. Units of the same unit kind are managed together; for example,
    they follow the same release model and are typically rolled out together.

EXAMPLES
    To create a unit kind named my-unit-kind for the SaaS offering my-saas in
    location us-central1, run:

        $ gcloud app-lifecycle-manager unit-kinds create my-unit-kind \
            --location=us-central1 --saas=my-saas

    To create a unit kind named my-unit-kind that has the label env=prod, run:

        $ gcloud app-lifecycle-manager unit-kinds create my-unit-kind \
            --location=us-central1 --saas=my-saas --labels=env=prod

    To create a unit kind named my-unit-kind that depends on the unit kind
    my-network-unit-kind under the alias net and maps the input variable vpc to
    the output variable vpc of that dependency, run:

        $ gcloud app-lifecycle-manager unit-kinds create my-unit-kind \
            --location=us-central1 --saas=my-saas \
            --dependencies=unitKind=my-network-unit-kind,alias=net \
            --input-variable-mappings="variable=vpc,from={dependency=net,out\
        putVariable=vpc}"

POSITIONAL ARGUMENTS
     UnitKind resource - Unit kind to create. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument unit_kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument unit_kind on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       UNIT_KIND
          ID of the unitKind or fully qualified identifier for the unitKind.

          To set the unit_kind attribute:
          + provide the argument unit_kind on the command line.

REQUIRED FLAGS
     Saas resource - SaaS offering that defines the product (managed service)
     that the service producer manages with App Lifecycle Manager. The SaaS
     offering cannot be changed after it is set. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --saas on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --saas on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --saas=SAAS
          ID of the saas or fully qualified identifier for the saas.

          To set the saas attribute:
          + provide the argument --saas on the command line.

OPTIONAL FLAGS
     Release resource - Release to use by default when creating new units of
     this unit kind. If not specified, each new unit must explicitly reference
     the release to use for its creation. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --default-release on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --default-release on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     --default-release=DEFAULT_RELEASE
        ID of the release or fully qualified identifier for the release.

        To set the release attribute:
        * provide the argument --default-release on the command line.

     --dependencies=[alias=ALIAS],[unitKind=UNITKIND]
        Other unit kinds that this unit kind depends on. Dependencies are
        automatically provisioned if not found. A maximum of 10 dependencies
        can be specified. Dependencies cannot be changed after the unit kind is
        created.

         alias
            Alias for the dependency, used for input variable mapping.

         unitKind
            Unit kind of the dependency.

        Shorthand Example:

            --dependencies=alias=string,unitKind=string --dependencies=alias=string,unitKind=string

        JSON Example:

            --dependencies='[{"alias": "string", "unitKind": "string"}]'

        File Example:

            --dependencies=path_to_file.(yaml|json)

     --input-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
        Input variables of this unit kind that are either retrieved from the
        output variables of a dependency or passed on to the input variables of
        a dependency. A maximum of 100 mappings can be specified.

         from
            Output variable of a dependency from which the variable gets its
            value.

             dependency
                Required, Alias of the dependency.

             outputVariable
                Required, Name of the output variable on the dependency.

         to
            Input variable of a dependency to which the value of the variable
            is passed on.

             dependency
                Required, Alias of the dependency that the variable passes its
                value to.

             ignoreForLookup
                If true, App Lifecycle Manager does not use the input variable
                as a lookup key when looking for an existing dependency unit.

             inputVariable
                Required, Name of the input variable on the dependency.

         variable
            Required, Name of the variable.

        Shorthand Example:

            --input-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string --input-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string

        JSON Example:

            --input-variable-mappings='[{"from": {"dependency": "string", "outputVariable": "string"}, "to": {"dependency": "string", "ignoreForLookup": boolean, "inputVariable": "string"}, "variable": "string"}]'

        File Example:

            --input-variable-mappings=path_to_file.(yaml|json)

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
        For resources [default-release, saas, unit_kind], provides fallback
        value for resource location attribute. When the resource's full URI
        path is not provided, location will fallback to this flag value.

     --output-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
        Output variables of this unit kind that are passed to the output
        variables of the unit. A maximum of 100 mappings can be specified.

         from
            Output variable of a dependency from which the variable gets its
            value.

             dependency
                Required, Alias of the dependency.

             outputVariable
                Required, Name of the output variable on the dependency.

         to
            Input variable of a dependency to which the value of the variable
            is passed on.

             dependency
                Required, Alias of the dependency that the variable passes its
                value to.

             ignoreForLookup
                If true, App Lifecycle Manager does not use the input variable
                as a lookup key when looking for an existing dependency unit.

             inputVariable
                Required, Name of the input variable on the dependency.

         variable
            Required, Name of the variable.

        Shorthand Example:

            --output-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string --output-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string

        JSON Example:

            --output-variable-mappings='[{"from": {"dependency": "string", "outputVariable": "string"}, "to": {"dependency": "string", "ignoreForLookup": boolean, "inputVariable": "string"}, "variable": "string"}]'

        File Example:

            --output-variable-mappings=path_to_file.(yaml|json)

     Parameters for creating an App Hub application.

     --app-params-group=APP_PARAMS_GROUP
        Grouping used to construct the name of the App Hub application.
        Multiple unit kinds can specify the same group to use the same
        application across their respective units. Corresponds to
        app_boundary_id in the Application Design Center composite application
        template. Defaults to the name of the unit kind.

     Scope of the application.

     --scope-type=SCOPE_TYPE
        Scope type of the application. Corresponds to scope in the Application
        Design Center composite application template. Defaults to
        type-regional. SCOPE_TYPE must be one of:

         type-global
            Global scope.
         type-regional
            Regional scope.

     Reference to a component and revision in an Application Design Center
     composite application template.

     --application-template-component=APPLICATION_TEMPLATE_COMPONENT
        Name of the component in the Application Design Center composite
        application template.

     --application-template-component-revision=APPLICATION_TEMPLATE_COMPONENT_REVISION
        Revision of the component. If the component does not have a revision,
        this defaults to the revision of the composite application template.

     Reference to the composite application template.

     --composite-ref-application-template=COMPOSITE_REF_APPLICATION_TEMPLATE
        Full resource name of the Application Design Center composite
        application template.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --composite-ref-revision=COMPOSITE_REF_REVISION
        Revision of the composite application template to use. Changes to the
        revision trigger manual resynchronization. If empty, the application
        template is ignored.

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

        $ gcloud beta app-lifecycle-manager unit-kinds create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud app-lifecycle-manager unit-kinds create my-unit-kind \
    --location=us-central1 \
    --saas=my-saas \
    --dependencies=unitKind=my-network-unit-kind,alias=net \
    --input-variable-mappings="variable=vpc,from={dependency=net,outputVariable=vpc}"
```

### gcloud app-lifecycle-manager unit-kinds delete

```text
NAME
    gcloud app-lifecycle-manager unit-kinds delete - delete a unit kind

SYNOPSIS
    gcloud app-lifecycle-manager unit-kinds delete
        (UNIT_KIND : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an App Lifecycle Manager unit kind.

    The command prompts for confirmation before the unit kind is deleted.

EXAMPLES
    To delete the unit kind named my-unit-kind in location us-central1, run:

        $ gcloud app-lifecycle-manager unit-kinds delete my-unit-kind \
            --location=us-central1

    To delete the unit kind named my-unit-kind in location us-central1 without
    a confirmation prompt, run:

        $ gcloud app-lifecycle-manager unit-kinds delete my-unit-kind \
            --location=us-central1 --quiet

POSITIONAL ARGUMENTS
     UnitKind resource - Unit kind to delete. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument unit_kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       UNIT_KIND
          ID of the unitKind or fully qualified identifier for the unitKind.

          To set the unit_kind attribute:
          + provide the argument unit_kind on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument unit_kind on the command line with a fully
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

        $ gcloud beta app-lifecycle-manager unit-kinds delete
```

### gcloud app-lifecycle-manager unit-kinds describe

```text
NAME
    gcloud app-lifecycle-manager unit-kinds describe - describe a unit kind

SYNOPSIS
    gcloud app-lifecycle-manager unit-kinds describe
        (UNIT_KIND : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display the details of an App Lifecycle Manager unit kind.

EXAMPLES
    To describe the unit kind named my-unit-kind in location us-central1, run:

        $ gcloud app-lifecycle-manager unit-kinds describe my-unit-kind \
            --location=us-central1

    To display only the SaaS offering and default release of the unit kind
    named my-unit-kind in location us-central1, run:

        $ gcloud app-lifecycle-manager unit-kinds describe my-unit-kind \
            --location=us-central1 --format="yaml(saas,defaultRelease)"

POSITIONAL ARGUMENTS
     UnitKind resource - Unit kind to describe. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument unit_kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       UNIT_KIND
          ID of the unitKind or fully qualified identifier for the unitKind.

          To set the unit_kind attribute:
          + provide the argument unit_kind on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument unit_kind on the command line with a fully
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

        $ gcloud beta app-lifecycle-manager unit-kinds describe
```

### gcloud app-lifecycle-manager unit-kinds list

```text
NAME
    gcloud app-lifecycle-manager unit-kinds list - list unit kinds

SYNOPSIS
    gcloud app-lifecycle-manager unit-kinds list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List App Lifecycle Manager unit kinds.

    If --location is not specified, unit kinds in all locations are listed.

EXAMPLES
    To list all unit kinds in location us-central1, run:

        $ gcloud app-lifecycle-manager unit-kinds list --location=us-central1

    To list only the names of unit kinds with the label env=prod in all
    locations, run:

        $ gcloud app-lifecycle-manager unit-kinds list \
            --filter="labels.env=prod" --format="value(name)"

FLAGS
     Location resource - Location of the unit kinds to list. This represents a
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

        $ gcloud beta app-lifecycle-manager unit-kinds list
```

### gcloud app-lifecycle-manager unit-kinds update

```text
NAME
    gcloud app-lifecycle-manager unit-kinds update - update a unit kind

SYNOPSIS
    gcloud app-lifecycle-manager unit-kinds update UNIT_KIND
        [--location=LOCATION] [--saas=SAAS]
        [--app-params-group=APP_PARAMS_GROUP
          --clear-app-params --scope-type=SCOPE_TYPE]
        [--application-template-component=APPLICATION_TEMPLATE_COMPONENT
          --application-template-component-revision=APPLICATION_TEMPLATE_COMPONENT_REVISION --clear-application-template-component --composite-ref-application-template=COMPOSITE_REF_APPLICATION_TEMPLATE --composite-ref-revision=COMPOSITE_REF_REVISION]
        [--clear-default-release | --default-release=DEFAULT_RELEASE]
        [--dependencies=[alias=ALIAS],[unitKind=UNITKIND]
          | --add-dependencies=[alias=ALIAS],[unitKind=UNITKIND]
          --clear-dependencies
          | --remove-dependencies=[alias=ALIAS],[unitKind=UNITKIND]]
        [--input-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
          | --add-input-variable-mappings=[from=FROM],
          [to=TO],[variable=VARIABLE] --clear-input-variable-mappings
          | --remove-input-variable-mappings=[from=FROM],
          [to=TO],[variable=VARIABLE]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--output-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
          | --add-output-variable-mappings=[from=FROM],
          [to=TO],[variable=VARIABLE] --clear-output-variable-mappings
          | --remove-output-variable-mappings=[from=FROM],
          [to=TO],[variable=VARIABLE]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an App Lifecycle Manager unit kind.

EXAMPLES
    To set the default release of the unit kind named my-unit-kind in location
    us-central1 to my-release, run:

        $ gcloud app-lifecycle-manager unit-kinds update my-unit-kind \
            --location=us-central1 --default-release=my-release

    To add or update the label env=prod on the unit kind named my-unit-kind and
    remove its default release, run:

        $ gcloud app-lifecycle-manager unit-kinds update my-unit-kind \
            --location=us-central1 --update-labels=env=prod \
            --clear-default-release

POSITIONAL ARGUMENTS
     UnitKind resource - Unit kind to update. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument unit_kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument unit_kind on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       UNIT_KIND
          ID of the unitKind or fully qualified identifier for the unitKind.

          To set the unit_kind attribute:
          + provide the argument unit_kind on the command line.

FLAGS
     --location=LOCATION
        For resources [default-release, saas, unit_kind], provides fallback
        value for resource location attribute. When the resource's full URI
        path is not provided, location will fallback to this flag value.

     Saas resource - SaaS offering that defines the product (managed service)
     that the service producer manages with App Lifecycle Manager. The SaaS
     offering cannot be changed after it is set. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --saas on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --saas on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     --saas=SAAS
        ID of the saas or fully qualified identifier for the saas.

        To set the saas attribute:
        * provide the argument --saas on the command line.

     Parameters for creating an App Hub application.

     --app-params-group=APP_PARAMS_GROUP
        Grouping used to construct the name of the App Hub application.
        Multiple unit kinds can specify the same group to use the same
        application across their respective units. Corresponds to
        app_boundary_id in the Application Design Center composite application
        template. Defaults to the name of the unit kind.

     --clear-app-params
        Set unitKind.appParams back to default value.

     Scope of the application.

     --scope-type=SCOPE_TYPE
        Scope type of the application. Corresponds to scope in the Application
        Design Center composite application template. Defaults to
        type-regional. SCOPE_TYPE must be one of:

         type-global
            Global scope.
         type-regional
            Regional scope.

     Reference to a component and revision in an Application Design Center
     composite application template.

     --application-template-component=APPLICATION_TEMPLATE_COMPONENT
        Name of the component in the Application Design Center composite
        application template.

     --application-template-component-revision=APPLICATION_TEMPLATE_COMPONENT_REVISION
        Revision of the component. If the component does not have a revision,
        this defaults to the revision of the composite application template.

     --clear-application-template-component
        Set unitKind.applicationTemplateComponent back to default value.

     Reference to the composite application template.

     --composite-ref-application-template=COMPOSITE_REF_APPLICATION_TEMPLATE
        Full resource name of the Application Design Center composite
        application template.

     --composite-ref-revision=COMPOSITE_REF_REVISION
        Revision of the composite application template to use. Changes to the
        revision trigger manual resynchronization. If empty, the application
        template is ignored.

     Update default_release.

     At most one of these can be specified:

       --clear-default-release
          Clear default_release value and set to null.

       Release resource - Set default_release to new value.

       Release to use by default when creating new units of this unit kind. If
       not specified, each new unit must explicitly reference the release to
       use for its creation. This represents a Cloud resource. (NOTE) Some
       attributes are not given arguments in this group but can be set in other
       ways.

       To set the project attribute:
        + provide the argument --default-release on the command line with a
          fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --default-release on the command line with a
          fully specified name;
        + provide the argument --location on the command line.

       --default-release=DEFAULT_RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument --default-release on the command line.

     Update dependencies.

     At most one of these can be specified:

       --dependencies=[alias=ALIAS],[unitKind=UNITKIND]
          Set dependencies to new value. Other unit kinds that this unit kind
          depends on. Dependencies are automatically provisioned if not found.
          A maximum of 10 dependencies can be specified. Dependencies cannot be
          changed after the unit kind is created.

           alias
              Alias for the dependency, used for input variable mapping.

           unitKind
              Unit kind of the dependency.

          Shorthand Example:

              --dependencies=alias=string,unitKind=string --dependencies=alias=string,unitKind=string

          JSON Example:

              --dependencies='[{"alias": "string", "unitKind": "string"}]'

          File Example:

              --dependencies=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-dependencies=[alias=ALIAS],[unitKind=UNITKIND]
            Add new value to dependencies list. Other unit kinds that this unit
            kind depends on. Dependencies are automatically provisioned if not
            found. A maximum of 10 dependencies can be specified. Dependencies
            cannot be changed after the unit kind is created.

             alias
                Alias for the dependency, used for input variable mapping.

             unitKind
                Unit kind of the dependency.

            Shorthand Example:

                --add-dependencies=alias=string,unitKind=string --add-dependencies=alias=string,unitKind=string

            JSON Example:

                --add-dependencies='[{"alias": "string", "unitKind": "string"}]'

            File Example:

                --add-dependencies=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-dependencies
              Clear dependencies value and set to empty list.

           --remove-dependencies=[alias=ALIAS],[unitKind=UNITKIND]
              Remove existing value from dependencies list. Other unit kinds
              that this unit kind depends on. Dependencies are automatically
              provisioned if not found. A maximum of 10 dependencies can be
              specified. Dependencies cannot be changed after the unit kind is
              created.

               alias
                  Alias for the dependency, used for input variable mapping.

               unitKind
                  Unit kind of the dependency.

              Shorthand Example:

                  --remove-dependencies=alias=string,unitKind=string --remove-dependencies=alias=string,unitKind=string

              JSON Example:

                  --remove-dependencies='[{"alias": "string", "unitKind": "string"}]'

              File Example:

                  --remove-dependencies=path_to_file.(yaml|json)

     Update input_variable_mappings.

     At most one of these can be specified:

       --input-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
          Set input_variable_mappings to new value. Input variables of this
          unit kind that are either retrieved from the output variables of a
          dependency or passed on to the input variables of a dependency. A
          maximum of 100 mappings can be specified.

           from
              Output variable of a dependency from which the variable gets its
              value.

               dependency
                  Required, Alias of the dependency.

               outputVariable
                  Required, Name of the output variable on the dependency.

           to
              Input variable of a dependency to which the value of the variable
              is passed on.

               dependency
                  Required, Alias of the dependency that the variable passes
                  its value to.

               ignoreForLookup
                  If true, App Lifecycle Manager does not use the input
                  variable as a lookup key when looking for an existing
                  dependency unit.

               inputVariable
                  Required, Name of the input variable on the dependency.

           variable
              Required, Name of the variable.

          Shorthand Example:

              --input-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string --input-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string

          JSON Example:

              --input-variable-mappings='[{"from": {"dependency": "string", "outputVariable": "string"}, "to": {"dependency": "string", "ignoreForLookup": boolean, "inputVariable": "string"}, "variable": "string"}]'

          File Example:

              --input-variable-mappings=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-input-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
            Add new value to input_variable_mappings list. Input variables of
            this unit kind that are either retrieved from the output variables
            of a dependency or passed on to the input variables of a
            dependency. A maximum of 100 mappings can be specified.

             from
                Output variable of a dependency from which the variable gets
                its value.

                 dependency
                    Required, Alias of the dependency.

                 outputVariable
                    Required, Name of the output variable on the dependency.

             to
                Input variable of a dependency to which the value of the
                variable is passed on.

                 dependency
                    Required, Alias of the dependency that the variable passes
                    its value to.

                 ignoreForLookup
                    If true, App Lifecycle Manager does not use the input
                    variable as a lookup key when looking for an existing
                    dependency unit.

                 inputVariable
                    Required, Name of the input variable on the dependency.

             variable
                Required, Name of the variable.

            Shorthand Example:

                --add-input-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string --add-input-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string

            JSON Example:

                --add-input-variable-mappings='[{"from": {"dependency": "string", "outputVariable": "string"}, "to": {"dependency": "string", "ignoreForLookup": boolean, "inputVariable": "string"}, "variable": "string"}]'

            File Example:

                --add-input-variable-mappings=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-input-variable-mappings
              Clear input_variable_mappings value and set to empty list.

           --remove-input-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
              Remove existing value from input_variable_mappings list. Input
              variables of this unit kind that are either retrieved from the
              output variables of a dependency or passed on to the input
              variables of a dependency. A maximum of 100 mappings can be
              specified.

               from
                  Output variable of a dependency from which the variable gets
                  its value.

                   dependency
                      Required, Alias of the dependency.

                   outputVariable
                      Required, Name of the output variable on the dependency.

               to
                  Input variable of a dependency to which the value of the
                  variable is passed on.

                   dependency
                      Required, Alias of the dependency that the variable
                      passes its value to.

                   ignoreForLookup
                      If true, App Lifecycle Manager does not use the input
                      variable as a lookup key when looking for an existing
                      dependency unit.

                   inputVariable
                      Required, Name of the input variable on the dependency.

               variable
                  Required, Name of the variable.

              Shorthand Example:

                  --remove-input-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string --remove-input-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string

              JSON Example:

                  --remove-input-variable-mappings='[{"from": {"dependency": "string", "outputVariable": "string"}, "to": {"dependency": "string", "ignoreForLookup": boolean, "inputVariable": "string"}, "variable": "string"}]'

              File Example:

                  --remove-input-variable-mappings=path_to_file.(yaml|json)

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

     Update output_variable_mappings.

     At most one of these can be specified:

       --output-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
          Set output_variable_mappings to new value. Output variables of this
          unit kind that are passed to the output variables of the unit. A
          maximum of 100 mappings can be specified.

           from
              Output variable of a dependency from which the variable gets its
              value.

               dependency
                  Required, Alias of the dependency.

               outputVariable
                  Required, Name of the output variable on the dependency.

           to
              Input variable of a dependency to which the value of the variable
              is passed on.

               dependency
                  Required, Alias of the dependency that the variable passes
                  its value to.

               ignoreForLookup
                  If true, App Lifecycle Manager does not use the input
                  variable as a lookup key when looking for an existing
                  dependency unit.

               inputVariable
                  Required, Name of the input variable on the dependency.

           variable
              Required, Name of the variable.

          Shorthand Example:

              --output-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string --output-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string

          JSON Example:

              --output-variable-mappings='[{"from": {"dependency": "string", "outputVariable": "string"}, "to": {"dependency": "string", "ignoreForLookup": boolean, "inputVariable": "string"}, "variable": "string"}]'

          File Example:

              --output-variable-mappings=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-output-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
            Add new value to output_variable_mappings list. Output variables of
            this unit kind that are passed to the output variables of the unit.
            A maximum of 100 mappings can be specified.

             from
                Output variable of a dependency from which the variable gets
                its value.

                 dependency
                    Required, Alias of the dependency.

                 outputVariable
                    Required, Name of the output variable on the dependency.

             to
                Input variable of a dependency to which the value of the
                variable is passed on.

                 dependency
                    Required, Alias of the dependency that the variable passes
                    its value to.

                 ignoreForLookup
                    If true, App Lifecycle Manager does not use the input
                    variable as a lookup key when looking for an existing
                    dependency unit.

                 inputVariable
                    Required, Name of the input variable on the dependency.

             variable
                Required, Name of the variable.

            Shorthand Example:

                --add-output-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string --add-output-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string

            JSON Example:

                --add-output-variable-mappings='[{"from": {"dependency": "string", "outputVariable": "string"}, "to": {"dependency": "string", "ignoreForLookup": boolean, "inputVariable": "string"}, "variable": "string"}]'

            File Example:

                --add-output-variable-mappings=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-output-variable-mappings
              Clear output_variable_mappings value and set to empty list.

           --remove-output-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
              Remove existing value from output_variable_mappings list. Output
              variables of this unit kind that are passed to the output
              variables of the unit. A maximum of 100 mappings can be
              specified.

               from
                  Output variable of a dependency from which the variable gets
                  its value.

                   dependency
                      Required, Alias of the dependency.

                   outputVariable
                      Required, Name of the output variable on the dependency.

               to
                  Input variable of a dependency to which the value of the
                  variable is passed on.

                   dependency
                      Required, Alias of the dependency that the variable
                      passes its value to.

                   ignoreForLookup
                      If true, App Lifecycle Manager does not use the input
                      variable as a lookup key when looking for an existing
                      dependency unit.

                   inputVariable
                      Required, Name of the input variable on the dependency.

               variable
                  Required, Name of the variable.

              Shorthand Example:

                  --remove-output-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string --remove-output-variable-mappings=from={dependency=string,outputVariable=string},to={dependency=string,ignoreForLookup=boolean,inputVariable=string},variable=string

              JSON Example:

                  --remove-output-variable-mappings='[{"from": {"dependency": "string", "outputVariable": "string"}, "to": {"dependency": "string", "ignoreForLookup": boolean, "inputVariable": "string"}, "variable": "string"}]'

              File Example:

                  --remove-output-variable-mappings=path_to_file.(yaml|json)

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

        $ gcloud beta app-lifecycle-manager unit-kinds update
```

### gcloud beta app-lifecycle-manager unit-kinds create

```text
NAME
    gcloud beta app-lifecycle-manager unit-kinds create - create a unit kind

SYNOPSIS
    gcloud beta app-lifecycle-manager unit-kinds create UNIT_KIND --saas=SAAS
        [--default-release=DEFAULT_RELEASE]
        [--dependencies=[alias=ALIAS],[unitKind=UNITKIND]]
        [--input-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]]
        [--labels=[LABELS,...]] [--location=LOCATION]
        [--output-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]]
        [--app-params-group=APP_PARAMS_GROUP --scope-type=SCOPE_TYPE]
        [--application-template-component=APPLICATION_TEMPLATE_COMPONENT
          --application-template-component-revision=APPLICATION_TEMPLATE_COMPONENT_REVISION [--composite-ref-application-template=COMPOSITE_REF_APPLICATION_TEMPLATE : --composite-ref-revision=COMPOSITE_REF_REVISION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager unit-kinds delete

```text
NAME
    gcloud beta app-lifecycle-manager unit-kinds delete - delete a unit kind

SYNOPSIS
    gcloud beta app-lifecycle-manager unit-kinds delete
        (UNIT_KIND : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager unit-kinds describe

```text
NAME
    gcloud beta app-lifecycle-manager unit-kinds describe - describe a unit
        kind

SYNOPSIS
    gcloud beta app-lifecycle-manager unit-kinds describe
        (UNIT_KIND : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager unit-kinds list

```text
NAME
    gcloud beta app-lifecycle-manager unit-kinds list - list unit kinds

SYNOPSIS
    gcloud beta app-lifecycle-manager unit-kinds list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager unit-kinds update

```text
NAME
    gcloud beta app-lifecycle-manager unit-kinds update - update a unit kind

SYNOPSIS
    gcloud beta app-lifecycle-manager unit-kinds update UNIT_KIND
        [--location=LOCATION] [--saas=SAAS]
        [--app-params-group=APP_PARAMS_GROUP
          --clear-app-params --scope-type=SCOPE_TYPE]
        [--application-template-component=APPLICATION_TEMPLATE_COMPONENT
          --application-template-component-revision=APPLICATION_TEMPLATE_COMPONENT_REVISION --clear-application-template-component --composite-ref-application-template=COMPOSITE_REF_APPLICATION_TEMPLATE --composite-ref-revision=COMPOSITE_REF_REVISION]
        [--clear-default-release | --default-release=DEFAULT_RELEASE]
        [--dependencies=[alias=ALIAS],[unitKind=UNITKIND]
          | --add-dependencies=[alias=ALIAS],[unitKind=UNITKIND]
          --clear-dependencies
          | --remove-dependencies=[alias=ALIAS],[unitKind=UNITKIND]]
        [--input-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
          | --add-input-variable-mappings=[from=FROM],
          [to=TO],[variable=VARIABLE] --clear-input-variable-mappings
          | --remove-input-variable-mappings=[from=FROM],
          [to=TO],[variable=VARIABLE]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--output-variable-mappings=[from=FROM],[to=TO],[variable=VARIABLE]
          | --add-output-variable-mappings=[from=FROM],
          [to=TO],[variable=VARIABLE] --clear-output-variable-mappings
          | --remove-output-variable-mappings=[from=FROM],
          [to=TO],[variable=VARIABLE]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/unit-kinds (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
