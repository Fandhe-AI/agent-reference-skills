---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/application-templates/components/connections
---

# gcloud design-center spaces application-templates components connections

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces application-templates components connections create

```text
NAME
    gcloud design-center spaces application-templates components connections
        create - create a connection

SYNOPSIS
    gcloud design-center spaces application-templates components connections
        create (CONNECTION : --component=COMPONENT)
        --destination-component-uri=DESTINATION_COMPONENT_URI
        [--application-template=APPLICATION_TEMPLATE]
        [--destination-component-parameters=[key=KEY],[value=VALUE]]
        [--location=LOCATION]
        [--source-component-parameters=[key=KEY],[value=VALUE]] [--space=SPACE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a connection between components in an application template.

EXAMPLES
    To create the connection my-connection in component my-component of
    application template my-app-template, space my-space, project my-project
    and location us-central1 with a destination component other-component, run:

        $ gcloud design-center spaces application-templates components \
            connections create my-connection --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1 \
            --destination-component-uri=other-component

    Or run:

        $ gcloud design-center spaces application-templates components \
            connections create my-connection --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1 \
            --destination-component-uri=projects/my-project/locations/\
        us-central1/spaces/my-space/applicationTemplates/my-app-template/\
        components/other-component

    Or run:

        $ gcloud design-center spaces application-templates components \
            connections create \
            projects/my-project/locations/us-central1/spaces/my-space/\
        applicationTemplates/my-app-template/components/my-component/\
        connections/my-connection \
            --destination-component-uri=projects/my-project/locations/\
        us-central1/spaces/my-space/applicationTemplates/my-app-template/\
        components/other-component

    To create the connection my-connection with a parameter key-value pair of
    type:connection-type in component my-component of application template
    my-app-template, space my-space, project my-project and location
    us-central1 with a destination component other-component, run the following
    shorthand example:

        $ gcloud design-center spaces application-templates components \
            connections create my-connection --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1 \
            --destination-component-uri=other-component \
            --parameters=key=type,value=connection-type

    Or run the following JSON example:

        $ gcloud design-center spaces application-templates components \
            connections create my-connection --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1 \
            --destination-component-uri=other-component \
            --parameters='[{"key": "type", "value": "connection-type"}]'

    Or create a YAML or JSON file with the parameters and run the following
    file example:

        $ gcloud design-center spaces application-templates components \
            connections create my-connection --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1 \
            --destination-component-uri=other-component \
            --parameters=my-parameters.yaml

POSITIONAL ARGUMENTS
     Connection resource - Identifier. The connection name. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     To set the space attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --space on the command line.

     To set the application-template attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --application-template on the command line.

     This must be specified.

       CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --component=COMPONENT
          The component id of the connection resource.

          To set the component attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --component on the command line.

REQUIRED FLAGS
     Component resource - The destination component URI used to generate the
     connection. Format is
     projects/$project/locations/$location/spaces/$space/applicationTemplates/$application_template/components/$component
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --destination-component-uri on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --destination-component-uri on the command line
        with a fully specified name;
      * provide the argument --location on the command line.

     To set the space attribute:
      * provide the argument --destination-component-uri on the command line
        with a fully specified name;
      * provide the argument --space on the command line.

     To set the application-template attribute:
      * provide the argument --destination-component-uri on the command line
        with a fully specified name;
      * provide the argument --application-template on the command line.

     This must be specified.

       --destination-component-uri=DESTINATION_COMPONENT_URI
          ID of the component or fully qualified identifier for the component.

          To set the component attribute:
          + provide the argument --destination-component-uri on the command
            line.

OPTIONAL FLAGS
     --application-template=APPLICATION_TEMPLATE
        For resources [connection, destination-component-uri], provides
        fallback value for resource application-template attribute. When the
        resource's full URI path is not provided, application-template will
        fallback to this flag value.

     --destination-component-parameters=[key=KEY],[value=VALUE]
        The parameters of the connection associated with the destination
        component.

         key
            The key of the parameter.

         value
            The value of the parameter.

        Shorthand Example:

            --destination-component-parameters=key=string,value={...} --destination-component-parameters=key=string,value={...}

        JSON Example:

            --destination-component-parameters='[{"key": "string", "value": {...}}]'

        File Example:

            --destination-component-parameters=path_to_file.(yaml|json)

     --location=LOCATION
        For resources [connection, destination-component-uri], provides
        fallback value for resource location attribute. When the resource's
        full URI path is not provided, location will fallback to this flag
        value.

     --source-component-parameters=[key=KEY],[value=VALUE]
        The parameters of the connection associated with the source component.

         key
            The key of the parameter.

         value
            The value of the parameter.

        Shorthand Example:

            --source-component-parameters=key=string,value={...} --source-component-parameters=key=string,value={...}

        JSON Example:

            --source-component-parameters='[{"key": "string", "value": {...}}]'

        File Example:

            --source-component-parameters=path_to_file.(yaml|json)

     --space=SPACE
        For resources [connection, destination-component-uri], provides
        fallback value for resource space attribute. When the resource's full
        URI path is not provided, space will fallback to this flag value.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the designcenter/v1 API. The full documentation for this
    API can be found at: http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces application-templates \
            components connections create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud design-center spaces application-templates components connections create my-connection \
    --component=my-component \
    --application-template=my-app-template \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --destination-component-uri=projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/components/other-component

gcloud design-center spaces application-templates components connections create projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/components/my-component/connections/my-connection \
    --destination-component-uri=projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/components/other-component

gcloud design-center spaces application-templates components connections create my-connection \
    --component=my-component \
    --application-template=my-app-template \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --destination-component-uri=other-component \
    --source-component-parameters=key=type,value=connection-type

gcloud design-center spaces application-templates components connections create my-connection \
    --component=my-component \
    --application-template=my-app-template \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --destination-component-uri=other-component \
    --source-component-parameters='[{"key": "type", "value": "connection-type"}]'

gcloud design-center spaces application-templates components connections create my-connection \
    --component=my-component \
    --application-template=my-app-template \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --destination-component-uri=other-component \
    --source-component-parameters=my-parameters.yaml
```

### gcloud design-center spaces application-templates components connections delete

```text
NAME
    gcloud design-center spaces application-templates components connections
        delete - delete a connection

SYNOPSIS
    gcloud design-center spaces application-templates components connections
        delete
        (CONNECTION : --application-template=APPLICATION_TEMPLATE
          --component=COMPONENT --location=LOCATION --space=SPACE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a connection between components in an application template.

EXAMPLES
    To delete the connection my-connection in component my-component of
    application template my-app-template, space my-space, project my-project
    and location us-central1, run:

        $ gcloud design-center spaces application-templates components \
            connections delete my-connection --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1

    Or run:

        $ gcloud design-center spaces application-templates components \
            connections delete \
            projects/my-project/locations/us-central1/spaces/my-space/\
        applicationTemplates/my-app-template/components/my-component/\
        connections/my-connection

POSITIONAL ARGUMENTS
     Connection resource - The connection name. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --application-template=APPLICATION_TEMPLATE
          The applicationTemplate id of the connection resource.

          To set the application-template attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --application-template on the command line.

       --component=COMPONENT
          The component id of the connection resource.

          To set the component attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --component on the command line.

       --location=LOCATION
          The location id of the connection resource.

          To set the location attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The space id of the connection resource.

          To set the space attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the designcenter/v1 API. The full documentation for this
    API can be found at: http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces application-templates \
            components connections delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces application-templates components connections delete projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/components/my-component/connections/my-connection
```

### gcloud design-center spaces application-templates components connections describe

```text
NAME
    gcloud design-center spaces application-templates components connections
        describe - describe a connection

SYNOPSIS
    gcloud design-center spaces application-templates components connections
        describe
        (CONNECTION : --application-template=APPLICATION_TEMPLATE
          --component=COMPONENT --location=LOCATION --space=SPACE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a connection between components in an application template.

EXAMPLES
    To describe the connection my-connection in component my-component of
    application template my-app-template, space my-space, project my-project
    and location us-central1, run:

        $ gcloud design-center spaces application-templates components \
            connections describe my-connection --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1

    Or run:

        $ gcloud design-center spaces application-templates components \
            connections describe \
            projects/my-project/locations/us-central1/spaces/my-space/\
        applicationTemplates/my-app-template/components/my-component/\
        connections/my-connection

POSITIONAL ARGUMENTS
     Connection resource - Name of the resource The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --application-template=APPLICATION_TEMPLATE
          The applicationTemplate id of the connection resource.

          To set the application-template attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --application-template on the command line.

       --component=COMPONENT
          The component id of the connection resource.

          To set the component attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --component on the command line.

       --location=LOCATION
          The location id of the connection resource.

          To set the location attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The space id of the connection resource.

          To set the space attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the designcenter/v1 API. The full documentation for this
    API can be found at: http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces application-templates \
            components connections describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces application-templates components connections describe projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/components/my-component/connections/my-connection
```

### gcloud design-center spaces application-templates components connections list

```text
NAME
    gcloud design-center spaces application-templates components connections
        list - list connections

SYNOPSIS
    gcloud design-center spaces application-templates components connections
        list
        (--component=COMPONENT : --application-template=APPLICATION_TEMPLATE
          --location=LOCATION --space=SPACE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List connections in a component of an application template.

EXAMPLES
    To list all connections in component my-component of application template
    my-app-template, space my-space, project my-project and location
    us-central1, run:

        $ gcloud design-center spaces application-templates components \
            connections list --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1

    Or run:

        $ gcloud design-center spaces application-templates components \
            connections list \
            --component=projects/my-project/locations/us-central1/spaces/\
        my-space/applicationTemplates/my-app-template/components/\
        my-component

REQUIRED FLAGS
     Component resource - The parent resource from which to request a list of
     connections. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --component on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --component=COMPONENT
          ID of the component or fully qualified identifier for the component.

          To set the component attribute:
          + provide the argument --component on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --application-template=APPLICATION_TEMPLATE
          The applicationTemplate id of the component resource.

          To set the application-template attribute:
          + provide the argument --component on the command line with a fully
            specified name;
          + provide the argument --application-template on the command line.

       --location=LOCATION
          The location id of the component resource.

          To set the location attribute:
          + provide the argument --component on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The space id of the component resource.

          To set the space attribute:
          + provide the argument --component on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

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
    This command uses the designcenter/v1 API. The full documentation for this
    API can be found at: http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces application-templates \
            components connections list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces application-templates components connections list \
    --component=projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/components/my-component
```

### gcloud design-center spaces application-templates components connections update

```text
NAME
    gcloud design-center spaces application-templates components connections
        update - update a connection

SYNOPSIS
    gcloud design-center spaces application-templates components connections
        update (CONNECTION : --component=COMPONENT)
        [--application-template=APPLICATION_TEMPLATE]
        [--destination-component-uri=DESTINATION_COMPONENT_URI]
        [--location=LOCATION] [--space=SPACE]
        [--destination-component-parameters=[key=KEY],[value=VALUE]
          | --add-destination-component-parameters=[key=KEY],[value=VALUE]
          --clear-destination-component-parameters
          | --remove-destination-component-parameters=[key=KEY],[value=VALUE]]
        [--source-component-parameters=[key=KEY],[value=VALUE]
          | --add-source-component-parameters=[key=KEY],[value=VALUE]
          --clear-source-component-parameters
          | --remove-source-component-parameters=[key=KEY],[value=VALUE]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a connection between components in an application template.

EXAMPLES
    To update the destination component URI to
    projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/components/other-new-component
    in the connection my-connection in component my-component of application
    template my-app-template, space my-space, project my-project and location
    us-central1, run:

        $ gcloud design-center spaces application-templates components \
            connections update my-connection --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1 \
            --destination-component-uri=other-new-component

    Or run:

        $ gcloud design-center spaces application-templates components \
            connections update my-connection --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1 \
            --destination-component-uri=projects/my-project/locations/\
        us-central1/spaces/my-space/applicationTemplates/my-app-template/\
        components/other-new-component

    Or run:

        $ gcloud design-center spaces application-templates components \
            connections update \
            projects/my-project/locations/us-central1/spaces/my-space/\
        applicationTemplates/my-app-template/components/my-component/\
        connections/my-connection \
            --destination-component-uri=projects/my-project/locations/\
        us-central1/spaces/my-space/applicationTemplates/my-app-template/\
        components/other-new-component

    To add a new parameter key-value pair of new_parameter_key:new-parameter to
    the connection my-connection in component my-component of application
    template my-app-template, space my-space, project my-project and location
    us-central1, run the following shorthand example:

        $ gcloud design-center spaces application-templates components \
            connections update my-connection \
            --application-template=my-app-template \
            --component=my-component --space=my-space --project=my-project \
            --location=us-central1 \
            --add-parameters=key=project_id,value=new-project \
            --add-parameters=key=new_parameter_key,value=new-parameter

    Or run the following JSON example:

        $ gcloud design-center spaces application-templates components \
            connections update my-connection \
            --application-template=my-app-template \
            --component=my-component --space=my-space --project=my-project \
            --location=us-central1 \
            --add-parameters='[{"key": "project_id", "value":
         "new-project"}, {"key": "new_parameter_key", "value":
         "new-parameter"}]'

    Or create a YAML or JSON file with the parameters and run the following
    file example:

        $ gcloud design-center spaces application-templates components \
            connections update my-connection \
            --application-template=my-app-template \
            --component=my-component --space=my-space --project=my-project \
            --location=us-central1 --add-parameters=my-parameters.yaml

    To clear all parameters from the connection my-connection in component
    my-component of application template my-app-template, space my-space,
    project my-project and location us-central1, run:

        $ gcloud design-center spaces application-templates components \
            connections update my-connection --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1 --clear-parameters

    To remove an existing parameter key-value pair of type:connection-type from
    the connection my-connection in component my-component of application
    template my-app-template, space my-space, project my-project and location
    us-central1, run:

        $ gcloud design-center spaces application-templates components \
            connections update my-connection --component=my-component \
            --application-template=my-app-template --space=my-space \
            --project=my-project --location=us-central1 \
            --remove-parameters=key=type,value=connection-type

POSITIONAL ARGUMENTS
     Connection resource - Identifier. The connection name. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     To set the space attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --space on the command line.

     To set the application-template attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --application-template on the command line.

     This must be specified.

       CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --component=COMPONENT
          The component id of the connection resource.

          To set the component attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --component on the command line.

FLAGS
     --application-template=APPLICATION_TEMPLATE
        For resources [connection, destination-component-uri], provides
        fallback value for resource application-template attribute. When the
        resource's full URI path is not provided, application-template will
        fallback to this flag value.

     Component resource - The destination component URI used to generate the
     connection. Format is
     projects/$project/locations/$location/spaces/$space/applicationTemplates/$application_template/components/$component
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --destination-component-uri on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --destination-component-uri on the command line
        with a fully specified name;
      * provide the argument --location on the command line.

     To set the space attribute:
      * provide the argument --destination-component-uri on the command line
        with a fully specified name;
      * provide the argument --space on the command line.

     To set the application-template attribute:
      * provide the argument --destination-component-uri on the command line
        with a fully specified name;
      * provide the argument --application-template on the command line.

     --destination-component-uri=DESTINATION_COMPONENT_URI
        ID of the component or fully qualified identifier for the component.

        To set the component attribute:
        * provide the argument --destination-component-uri on the command
          line.

     --location=LOCATION
        For resources [connection, destination-component-uri], provides
        fallback value for resource location attribute. When the resource's
        full URI path is not provided, location will fallback to this flag
        value.

     --space=SPACE
        For resources [connection, destination-component-uri], provides
        fallback value for resource space attribute. When the resource's full
        URI path is not provided, space will fallback to this flag value.

     Update destination_component_parameters.

     At most one of these can be specified:

       --destination-component-parameters=[key=KEY],[value=VALUE]
          Set destination_component_parameters to new value. The parameters of
          the connection associated with the destination component.

           key
              The key of the parameter.

           value
              The value of the parameter.

          Shorthand Example:

              --destination-component-parameters=key=string,value={...} --destination-component-parameters=key=string,value={...}

          JSON Example:

              --destination-component-parameters='[{"key": "string", "value": {...}}]'

          File Example:

              --destination-component-parameters=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-destination-component-parameters=[key=KEY],[value=VALUE]
            Add new value to destination_component_parameters list. The
            parameters of the connection associated with the destination
            component.

             key
                The key of the parameter.

             value
                The value of the parameter.

            Shorthand Example:

                --add-destination-component-parameters=key=string,value={...} --add-destination-component-parameters=key=string,value={...}

            JSON Example:

                --add-destination-component-parameters='[{"key": "string", "value": {...}}]'

            File Example:

                --add-destination-component-parameters=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-destination-component-parameters
              Clear destination_component_parameters value and set to empty
              list.

           --remove-destination-component-parameters=[key=KEY],[value=VALUE]
              Remove existing value from destination_component_parameters list.
              The parameters of the connection associated with the destination
              component.

               key
                  The key of the parameter.

               value
                  The value of the parameter.

              Shorthand Example:

                  --remove-destination-component-parameters=key=string,value={...} --remove-destination-component-parameters=key=string,value={...}

              JSON Example:

                  --remove-destination-component-parameters='[{"key": "string", "value": {...}}]'

              File Example:

                  --remove-destination-component-parameters=path_to_file.(yaml|json)

     Update source_component_parameters.

     At most one of these can be specified:

       --source-component-parameters=[key=KEY],[value=VALUE]
          Set source_component_parameters to new value. The parameters of the
          connection associated with the source component.

           key
              The key of the parameter.

           value
              The value of the parameter.

          Shorthand Example:

              --source-component-parameters=key=string,value={...} --source-component-parameters=key=string,value={...}

          JSON Example:

              --source-component-parameters='[{"key": "string", "value": {...}}]'

          File Example:

              --source-component-parameters=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-source-component-parameters=[key=KEY],[value=VALUE]
            Add new value to source_component_parameters list. The parameters
            of the connection associated with the source component.

             key
                The key of the parameter.

             value
                The value of the parameter.

            Shorthand Example:

                --add-source-component-parameters=key=string,value={...} --add-source-component-parameters=key=string,value={...}

            JSON Example:

                --add-source-component-parameters='[{"key": "string", "value": {...}}]'

            File Example:

                --add-source-component-parameters=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-source-component-parameters
              Clear source_component_parameters value and set to empty list.

           --remove-source-component-parameters=[key=KEY],[value=VALUE]
              Remove existing value from source_component_parameters list. The
              parameters of the connection associated with the source
              component.

               key
                  The key of the parameter.

               value
                  The value of the parameter.

              Shorthand Example:

                  --remove-source-component-parameters=key=string,value={...} --remove-source-component-parameters=key=string,value={...}

              JSON Example:

                  --remove-source-component-parameters='[{"key": "string", "value": {...}}]'

              File Example:

                  --remove-source-component-parameters=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the designcenter/v1 API. The full documentation for this
    API can be found at: http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces application-templates \
            components connections update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud design-center spaces application-templates components connections update my-connection \
    --component=my-component \
    --application-template=my-app-template \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --destination-component-uri=projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/components/other-new-component

gcloud design-center spaces application-templates components connections update projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/components/my-component/connections/my-connection \
    --destination-component-uri=projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/components/other-new-component

gcloud design-center spaces application-templates components connections update my-connection \
    --application-template=my-app-template \
    --component=my-component \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --add-source-component-parameters=key=project_id,value=new-project \
    --add-source-component-parameters=key=new_parameter_key,value=new-parameter

gcloud design-center spaces application-templates components connections update my-connection \
    --application-template=my-app-template \
    --component=my-component \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --add-source-component-parameters='[{"key": "project_id", "value": "new-project"}, {"key": "new_parameter_key", "value": "new-parameter"}]'

gcloud design-center spaces application-templates components connections update my-connection \
    --application-template=my-app-template \
    --component=my-component \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --add-source-component-parameters=my-parameters.yaml

gcloud design-center spaces application-templates components connections update my-connection \
    --component=my-component \
    --application-template=my-app-template \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --clear-source-component-parameters

gcloud design-center spaces application-templates components connections update my-connection \
    --component=my-component \
    --application-template=my-app-template \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --remove-source-component-parameters=key=type,value=connection-type
```

### gcloud alpha design-center spaces application-templates components connections create

```text
NAME
    gcloud alpha design-center spaces application-templates components
        connections create - create a connection

SYNOPSIS
    gcloud alpha design-center spaces application-templates components
        connections create (CONNECTION : --component=COMPONENT)
        --destination-component-uri=DESTINATION_COMPONENT_URI
        [--application-template=APPLICATION_TEMPLATE]
        [--destination-component-parameters=[key=KEY],[value=VALUE]]
        [--location=LOCATION]
        [--source-component-parameters=[key=KEY],[value=VALUE]] [--space=SPACE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha design-center spaces application-templates components connections delete

```text
NAME
    gcloud alpha design-center spaces application-templates components
        connections delete - delete a connection

SYNOPSIS
    gcloud alpha design-center spaces application-templates components
        connections delete
        (CONNECTION : --application-template=APPLICATION_TEMPLATE
          --component=COMPONENT --location=LOCATION --space=SPACE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha design-center spaces application-templates components connections describe

```text
NAME
    gcloud alpha design-center spaces application-templates components
        connections describe - describe a connection

SYNOPSIS
    gcloud alpha design-center spaces application-templates components
        connections describe
        (CONNECTION : --application-template=APPLICATION_TEMPLATE
          --component=COMPONENT --location=LOCATION --space=SPACE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha design-center spaces application-templates components connections list

```text
NAME
    gcloud alpha design-center spaces application-templates components
        connections list - list connections

SYNOPSIS
    gcloud alpha design-center spaces application-templates components
        connections list
        (--component=COMPONENT : --application-template=APPLICATION_TEMPLATE
          --location=LOCATION --space=SPACE) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha design-center spaces application-templates components connections update

```text
NAME
    gcloud alpha design-center spaces application-templates components
        connections update - update a connection

SYNOPSIS
    gcloud alpha design-center spaces application-templates components
        connections update (CONNECTION : --component=COMPONENT)
        [--application-template=APPLICATION_TEMPLATE]
        [--destination-component-uri=DESTINATION_COMPONENT_URI]
        [--location=LOCATION] [--space=SPACE]
        [--destination-component-parameters=[key=KEY],[value=VALUE]
          | --add-destination-component-parameters=[key=KEY],[value=VALUE]
          --clear-destination-component-parameters
          | --remove-destination-component-parameters=[key=KEY],[value=VALUE]]
        [--source-component-parameters=[key=KEY],[value=VALUE]
          | --add-source-component-parameters=[key=KEY],[value=VALUE]
          --clear-source-component-parameters
          | --remove-source-component-parameters=[key=KEY],[value=VALUE]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `connections create` and `connections update` examples use `--parameters`, `--add-parameters`, `--clear-parameters` and `--remove-parameters`, which these commands do not have (gcloud 593.0.0: "unrecognized arguments: --parameters=..."; for `update` it suggests `--add-source-component-parameters`); the SYNOPSIS has `--source-component-parameters` and `--destination-component-parameters` with `--add-` / `--clear-` / `--remove-` forms. The help does not say which side the examples mean; the runnable form uses the `source-component` flags, and the `destination-component` flags are the alternative (see FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/application-templates/components/connections (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
