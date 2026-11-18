---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compliance-manager/framework-deployments
---

# gcloud compliance-manager framework-deployments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compliance-manager framework-deployments create

```text
NAME
    gcloud compliance-manager framework-deployments create - create a framework
        deployment

SYNOPSIS
    gcloud compliance-manager framework-deployments create FRAMEWORK_DEPLOYMENT
        --cloud-control-metadata=[cloudControlDetails=CLOUDCONTROLDETAILS],
          [enforcementMode=ENFORCEMENTMODE]
        (--framework=FRAMEWORK
          : --framework-major-revision-id=FRAMEWORK_MAJOR_REVISION_ID)
        (--target-resource-config-existing=TARGET_RESOURCE_CONFIG_EXISTING
          | --target-resource-creation-config-folder-display-name=TARGET_RESOURCE_CREATION_CONFIG_FOLDER_DISPLAY_NAME --target-resource-creation-config-folder-parent=TARGET_RESOURCE_CREATION_CONFIG_FOLDER_PARENT | --target-resource-creation-config-project-billing-account-id=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_BILLING_ACCOUNT_ID --target-resource-creation-config-project-display-name=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_DISPLAY_NAME --target-resource-creation-config-project-parent=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_PARENT)
        [--async] [--description=DESCRIPTION] [--etag=ETAG]
        [--location=LOCATION] [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a framework deployment for a given project or organization and
    location.

EXAMPLES
    To create a framework deployment my-framework-deployment-id in organization
    my-organization-id and location global, targeting folders/my-folder-id and
    using framework my-framework-name, run:

        $ gcloud compliance-manager framework-deployments create \
            my-framework-deployment-id --organization=my-organization-id \
            --location=global \
            --target-resource-config-existing=folders/my-folder-id \
            --framework='organizations/my-organization-id/locations/global/f\
        rameworks/my-framework-name' --framework-major-revision-id='1' \
            --cloud-control-metadata='[{"cloudControlDetails": {"name":
         "organizations/my-organization-id/locations/global/cloudControls/my\
        -control-1", "majorRevisionId": "1", "parameters": []},
         "enforcementMode": "DETECTIVE"}]'

    To create a framework deployment my-framework-deployment-id in project
    my-project-number and location global, targeting projects/my-project-number
    and using framework my-framework-name, run:

        $ gcloud compliance-manager framework-deployments create \
            my-framework-deployment-id --project=my-project-number \
            --location=global \
            --target-resource-config-existing=projects/my-project-number \
            --framework='projects/my-project-number/locations/global/framewo\
        rks/my-framework-name' --framework-major-revision-id='1' \
            --cloud-control-metadata='[{"cloudControlDetails": {"name":
         "projects/my-project-number/locations/global/cloudControls/my-contr\
        ol-1", "majorRevisionId": "1", "parameters": []},
         "enforcementMode": "DETECTIVE"}]'

POSITIONAL ARGUMENTS
     FrameworkDeployment resource - Identifier. The name of the framework
     deployment, in the format
     organizations/{organization}/locations/{location}/frameworkDeployments/{framework_deployment}
     or
     projects/{project}/locations/{location}/frameworkDeployments/{framework_deployment}.
     The only supported location is global. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the organization attribute:
      * provide the argument framework_deployment on the command line with a
        fully specified name;
      * provide the argument --organization on the command line.

     To set the project attribute:
      * provide the argument framework_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument framework_deployment on the command line with a
        fully specified name;
      * provide the argument --location on the command line. This resource
        can be one of the following types:
        [cloudsecuritycompliance.organizations.locations.frameworkDeployments,
        cloudsecuritycompliance.projects.locations.frameworkDeployments].

     This must be specified.

       FRAMEWORK_DEPLOYMENT
          ID of the frameworkDeployment or fully qualified identifier for the
          frameworkDeployment.

          To set the framework_deployment attribute:
          + provide the argument framework_deployment on the command line.

REQUIRED FLAGS
     --cloud-control-metadata=[cloudControlDetails=CLOUDCONTROLDETAILS],[enforcementMode=ENFORCEMENTMODE]
        Required, The deployment mode and parameters for each of the cloud
        controls in the framework. Every cloud control in the framework
        includes metadata.

         cloudControlDetails
            The cloud control name and parameters.

             majorRevisionId
                The major version of the cloud control.

             name
                The name of the cloud control, in one of the following formats:
                organizations/{organization}/locations/{location}/cloudControls/{cloud_control}
                or
                projects/{project}/locations/{location}/cloudControls/{cloud_control}.

                The only supported location is global.

             parameters
                Parameters are key-value pairs that let you provide your custom
                location requirements, environment requirements, or other
                settings that are relevant to the cloud control. An example
                parameter is {"name": "location","value": "us-west-1"}.

                 name
                    The name or key of the parameter.

         enforcementMode
            The enforcement mode of the cloud control.

        Shorthand Example:

            --cloud-control-metadata=cloudControlDetails={majorRevisionId=int,name=string,parameters=[{name=string}]},enforcementMode=string --cloud-control-metadata=cloudControlDetails={majorRevisionId=int,name=string,parameters=[{name=string}]},enforcementMode=string

        JSON Example:

            --cloud-control-metadata='[{"cloudControlDetails": {"majorRevisionId": int, "name": "string", "parameters": [{"name": "string"}]}, "enforcementMode": "string"}]'

        File Example:

            --cloud-control-metadata=path_to_file.(yaml|json)

     The reference of a framework, in one of the following formats:
      * organizations/{organization}/locations/{location}/frameworks/{framework}
      * projects/{project}/locations/{location}/frameworks/{framework}.

     The only supported location is global.

     This must be specified.

       Framework resource - The major version of the framework. If not
       specified, the version corresponds to the latest version of the
       framework. This represents a Cloud resource. (NOTE) Some attributes are
       not given arguments in this group but can be set in other ways.

       To set the organization attribute:
        + provide the argument --framework on the command line with a fully
          specified name;
        + provide the argument --organization on the command line.

       To set the project attribute:
        + provide the argument --framework on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --framework on the command line with a fully
          specified name;
        + provide the argument --location on the command line. This resource
          can be one of the following types:
          [cloudsecuritycompliance.organizations.locations.frameworks,
          cloudsecuritycompliance.projects.locations.frameworks].

       This must be specified.

         --framework=FRAMEWORK
            ID of the framework or fully qualified identifier for the
            framework.

            To set the framework attribute:
            - provide the argument --framework on the command line.

       Arguments for the major revision id.

       --framework-major-revision-id=FRAMEWORK_MAJOR_REVISION_ID
          The major version of the framework. If not specified, the version
          corresponds to the latest version of the framework.

     The name of the target resource or the configuration that's required to
     create a new target resource.

     This must be specified.

       Arguments for the resource config.

       At most one of these can be specified:

         --target-resource-config-existing=TARGET_RESOURCE_CONFIG_EXISTING
            The resource hierarchy node, in one of the following formats:

            - organizations/{organizationID}
            - folders/{folderID}
            - projects/{projectID}

         Or at least one of these can be specified:

           The configuration that's required to create a target resource.

           Arguments for the resource creation config.

           At most one of these can be specified:

             The configuration that's required to create a folder to be used as
             the target resource for a deployment.

             --target-resource-creation-config-folder-display-name=TARGET_RESOURCE_CREATION_CONFIG_FOLDER_DISPLAY_NAME
                The display name of the folder.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --target-resource-creation-config-folder-parent=TARGET_RESOURCE_CREATION_CONFIG_FOLDER_PARENT
                The parent of the folder, in the format
                organizations/{organizationID} or folders/{folderID}.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             The configuration that's required to create a project to be used
             as the target resource of a deployment.

             --target-resource-creation-config-project-billing-account-id=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_BILLING_ACCOUNT_ID
                The billing account ID for the project.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --target-resource-creation-config-project-display-name=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_DISPLAY_NAME
                The display name of the project.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --target-resource-creation-config-project-parent=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_PARENT
                The parent of the project, in the format
                organizations/{organizationID} or folders/{folderID}.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A user-provided description of the framework deployment.

     --etag=ETAG
        To prevent concurrent updates from overwriting each other, always
        provide the etag when you update a framework deployment. You can also
        provide the etag when you delete a framework deployment, to help ensure
        that you're deleting the intended version of the framework deployment.

     --location=LOCATION
        For resources [framework, framework_deployment], provides fallback
        value for resource location attribute. When the resource's full URI
        path is not provided, location will fallback to this flag value.

     --organization=ORGANIZATION
        For resources [framework, framework_deployment], provides fallback
        value for resource organization attribute. When the resource's full URI
        path is not provided, organization will fallback to this flag value.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compliance-manager framework-deployments create my-framework-deployment-id \
    --organization=my-organization-id \
    --location=global \
    --target-resource-config-existing=folders/my-folder-id \
    --framework='organizations/my-organization-id/locations/global/frameworks/my-framework-name' \
    --framework-major-revision-id='1' \
    --cloud-control-metadata='[{"cloudControlDetails": {"name": "organizations/my-organization-id/locations/global/cloudControls/my-control-1", "majorRevisionId": "1", "parameters": []}, "enforcementMode": "DETECTIVE"}]'

gcloud compliance-manager framework-deployments create my-framework-deployment-id \
    --project=my-project-number \
    --location=global \
    --target-resource-config-existing=projects/my-project-number \
    --framework='projects/my-project-number/locations/global/frameworks/my-framework-name' \
    --framework-major-revision-id='1' \
    --cloud-control-metadata='[{"cloudControlDetails": {"name": "projects/my-project-number/locations/global/cloudControls/my-control-1", "majorRevisionId": "1", "parameters": []}, "enforcementMode": "DETECTIVE"}]'
```

### gcloud compliance-manager framework-deployments delete

```text
NAME
    gcloud compliance-manager framework-deployments delete - delete a framework
        deployment

SYNOPSIS
    gcloud compliance-manager framework-deployments delete
        (FRAMEWORK_DEPLOYMENT
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a specific framework deployment.

EXAMPLES
    To delete the framework deployment my-framework-deployment-id in
    organization my-organization-id and location global, run:

        $ gcloud compliance-manager framework-deployments delete \
            my-framework-deployment-id --organization=my-organization-id \
            --location=global

    To delete the framework deployment my-framework-deployment-id in project
    my-project-number and location global, run:

        $ gcloud compliance-manager framework-deployments delete \
            my-framework-deployment-id --project=my-project-number \
            --location=global

POSITIONAL ARGUMENTS
     FrameworkDeployment resource - The name of the framework deployment that
     you want to delete, in the format
     organizations/{organization}/locations/{location}/frameworkDeployments/{framework_deployment}
     or
     projects/{project}/locations/{location}/frameworkDeployments/{framework_deployment}.
     The only supported location is global. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument framework_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [cloudsecuritycompliance.organizations.locations.frameworkDeployments,
        cloudsecuritycompliance.projects.locations.frameworkDeployments].

     This must be specified.

       FRAMEWORK_DEPLOYMENT
          ID of the frameworkDeployment or fully qualified identifier for the
          frameworkDeployment.

          To set the framework_deployment attribute:
          + provide the argument framework_deployment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the frameworkDeployment resource.

          To set the location attribute:
          + provide the argument framework_deployment on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the frameworkDeployment resource.

          To set the organization attribute:
          + provide the argument framework_deployment on the command line
            with a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations.frameworkDeployments].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        An opaque identifier for the current version of the resource.

        If you provide this value, then it must match the existing value. If
        the values don't match, then the request fails with an
        [ABORTED][google.rpc.Code.ABORTED] error.

        If you omit this value, then the resource is deleted regardless of its
        current etag value.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

### gcloud compliance-manager framework-deployments describe

```text
NAME
    gcloud compliance-manager framework-deployments describe - get a framework
        deployment

SYNOPSIS
    gcloud compliance-manager framework-deployments describe
        (FRAMEWORK_DEPLOYMENT
          : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the details for a specific framework deployment.

EXAMPLES
    To get the framework deployment my-framework-deployment-id in organization
    my-organization-id and location global, run:

        $ gcloud compliance-manager framework-deployments describe \
            my-framework-deployment-id --organization=my-organization-id \
            --location=global

    To get the framework deployment my-framework-deployment-id in project
    my-project-number and location global, run:

        $ gcloud compliance-manager framework-deployments describe \
            my-framework-deployment-id --project=my-project-number \
            --location=global

POSITIONAL ARGUMENTS
     FrameworkDeployment resource - The name of the framework deployment, in
     the format
     organizations/{organization}/locations/{location}/frameworkDeployments/{framework_deployment}
     or
     projects/{project}/locations/{location}/frameworkDeployments/{framework_deployment}.
     The only supported location is global. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument framework_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [cloudsecuritycompliance.organizations.locations.frameworkDeployments,
        cloudsecuritycompliance.projects.locations.frameworkDeployments].

     This must be specified.

       FRAMEWORK_DEPLOYMENT
          ID of the frameworkDeployment or fully qualified identifier for the
          frameworkDeployment.

          To set the framework_deployment attribute:
          + provide the argument framework_deployment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the frameworkDeployment resource.

          To set the location attribute:
          + provide the argument framework_deployment on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the frameworkDeployment resource.

          To set the organization attribute:
          + provide the argument framework_deployment on the command line
            with a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations.frameworkDeployments].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

### gcloud compliance-manager framework-deployments list

```text
NAME
    gcloud compliance-manager framework-deployments list - list framework
        deployments

SYNOPSIS
    gcloud compliance-manager framework-deployments list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all framework deployments for a given project or organization and
    location.

EXAMPLES
    To list all framework deployments in organization my-organization-id and
    location global, run:

        $ gcloud compliance-manager framework-deployments list \
            --organization=my-organization-id --location=global

    To list all framework deployments in project my-project-number and location
    global, run:

        $ gcloud compliance-manager framework-deployments list \
            --project=my-project-number --location=global

REQUIRED FLAGS
     Location resource - The parent resource of the framework deployment, in
     the format organizations/{organization}/locations/{location} or
     projects/{project}/locations/{location}. The only supported location is
     global. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [cloudsecuritycompliance.organizations.locations,
        cloudsecuritycompliance.projects.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          The organization id of the location resource.

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations].

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
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

### gcloud compliance-manager framework-deployments update

```text
NAME
    gcloud compliance-manager framework-deployments update - update a framework
        deployment

SYNOPSIS
    gcloud compliance-manager framework-deployments update FRAMEWORK_DEPLOYMENT
        [--async] [--description=DESCRIPTION] [--etag=ETAG]
        [--location=LOCATION] [--organization=ORGANIZATION]
        [--clear-framework --framework=FRAMEWORK
          --framework-major-revision-id=FRAMEWORK_MAJOR_REVISION_ID]
        [--clear-target-resource-config
          --target-resource-config-existing=TARGET_RESOURCE_CONFIG_EXISTING
          | --target-resource-creation-config-folder-display-name=TARGET_RESOURCE_CREATION_CONFIG_FOLDER_DISPLAY_NAME --target-resource-creation-config-folder-parent=TARGET_RESOURCE_CREATION_CONFIG_FOLDER_PARENT | --target-resource-creation-config-project-billing-account-id=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_BILLING_ACCOUNT_ID --target-resource-creation-config-project-display-name=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_DISPLAY_NAME --target-resource-creation-config-project-parent=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_PARENT]
        [--cloud-control-metadata=[cloudControlDetails=CLOUDCONTROLDETAILS],
          [enforcementMode=ENFORCEMENTMODE]
          | --add-cloud-control-metadata=[cloudControlDetails=CLOUDCONTROLDETAILS],
          [enforcementMode=ENFORCEMENTMODE] --clear-cloud-control-metadata
          | --remove-cloud-control-metadata=[cloudControlDetails=CLOUDCONTROLDETAILS],
          [enforcementMode=ENFORCEMENTMODE]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a framework deployment for a given project or organization and
    location.

EXAMPLES
    To update a framework deployment my-framework-deployment-id in organization
    my-organization-id and location global, run:

        $ gcloud compliance-manager framework-deployments update \
            my-framework-deployment-id --organization=my-organization-id \
            --location=global \
            --cloud-control-metadata='[{"cloudControlDetails": {"name":
         "organizations/my-organization-id/locations/global/cloudControls/my\
        -control-1", "majorRevisionId": "1", "parameters": []},
         "enforcementMode": "DETECTIVE"}]'

    To update a framework deployment my-framework-deployment-id in project
    my-project-number and location global, run:

        $ gcloud compliance-manager framework-deployments update \
            my-framework-deployment-id --project=my-project-number \
            --location=global \
            --cloud-control-metadata='[{"cloudControlDetails": {"name":
         "projects/my-project-number/locations/global/cloudControls/my-contr\
        ol-1", "majorRevisionId": "1", "parameters": []},
         "enforcementMode": "DETECTIVE"}]'

POSITIONAL ARGUMENTS
     FrameworkDeployment resource - Identifier. The name of the framework
     deployment, in the format
     organizations/{organization}/locations/{location}/frameworkDeployments/{framework_deployment}
     or
     projects/{project}/locations/{location}/frameworkDeployments/{framework_deployment}.
     The only supported location is global. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the organization attribute:
      * provide the argument framework_deployment on the command line with a
        fully specified name;
      * provide the argument --organization on the command line.

     To set the project attribute:
      * provide the argument framework_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument framework_deployment on the command line with a
        fully specified name;
      * provide the argument --location on the command line. This resource
        can be one of the following types:
        [cloudsecuritycompliance.organizations.locations.frameworkDeployments,
        cloudsecuritycompliance.projects.locations.frameworkDeployments].

     This must be specified.

       FRAMEWORK_DEPLOYMENT
          ID of the frameworkDeployment or fully qualified identifier for the
          frameworkDeployment.

          To set the framework_deployment attribute:
          + provide the argument framework_deployment on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A user-provided description of the framework deployment.

     --etag=ETAG
        To prevent concurrent updates from overwriting each other, always
        provide the etag when you update a framework deployment. You can also
        provide the etag when you delete a framework deployment, to help ensure
        that you're deleting the intended version of the framework deployment.

     --location=LOCATION
        For resources [framework, framework_deployment], provides fallback
        value for resource location attribute. When the resource's full URI
        path is not provided, location will fallback to this flag value.

     --organization=ORGANIZATION
        For resources [framework, framework_deployment], provides fallback
        value for resource organization attribute. When the resource's full URI
        path is not provided, organization will fallback to this flag value.

     The reference of a framework, in one of the following formats:
      * organizations/{organization}/locations/{location}/frameworks/{framework}
      * projects/{project}/locations/{location}/frameworks/{framework}.

     The only supported location is global.

     --clear-framework
        Set frameworkDeployment.framework back to default value.

     Framework resource - The name of the framework. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the organization attribute:
      * provide the argument --framework on the command line with a fully
        specified name;
      * provide the argument --organization on the command line.

     To set the project attribute:
      * provide the argument --framework on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --framework on the command line with a fully
        specified name;
      * provide the argument --location on the command line. This resource
        can be one of the following types:
        [cloudsecuritycompliance.organizations.locations.frameworks,
        cloudsecuritycompliance.projects.locations.frameworks].

     --framework=FRAMEWORK
        ID of the framework or fully qualified identifier for the framework.

        To set the framework attribute:
        * provide the argument --framework on the command line.

     Arguments for the major revision id.

     --framework-major-revision-id=FRAMEWORK_MAJOR_REVISION_ID
        The major version of the framework. If not specified, the version
        corresponds to the latest version of the framework.

     The name of the target resource or the configuration that's required to
     create a new target resource.

     --clear-target-resource-config
        Set frameworkDeployment.targetResourceConfig back to default value.

     Arguments for the resource config.

     At most one of these can be specified:

       --target-resource-config-existing=TARGET_RESOURCE_CONFIG_EXISTING
          The resource hierarchy node, in one of the following formats:

          + organizations/{organizationID}
          + folders/{folderID}
          + projects/{projectID}

       Or at least one of these can be specified:

         The configuration that's required to create a target resource.

         Arguments for the resource creation config.

         At most one of these can be specified:

           The configuration that's required to create a folder to be used as
           the target resource for a deployment.

           --target-resource-creation-config-folder-display-name=TARGET_RESOURCE_CREATION_CONFIG_FOLDER_DISPLAY_NAME
              The display name of the folder.

           --target-resource-creation-config-folder-parent=TARGET_RESOURCE_CREATION_CONFIG_FOLDER_PARENT
              The parent of the folder, in the format
              organizations/{organizationID} or folders/{folderID}.

           The configuration that's required to create a project to be used as
           the target resource of a deployment.

           --target-resource-creation-config-project-billing-account-id=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_BILLING_ACCOUNT_ID
              The billing account ID for the project.

           --target-resource-creation-config-project-display-name=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_DISPLAY_NAME
              The display name of the project.

           --target-resource-creation-config-project-parent=TARGET_RESOURCE_CREATION_CONFIG_PROJECT_PARENT
              The parent of the project, in the format
              organizations/{organizationID} or folders/{folderID}.

     Update cloud_control_metadata.

     At most one of these can be specified:

       --cloud-control-metadata=[cloudControlDetails=CLOUDCONTROLDETAILS],[enforcementMode=ENFORCEMENTMODE]
          Set cloud_control_metadata to new value. The deployment mode and
          parameters for each of the cloud controls in the framework. Every
          cloud control in the framework includes metadata.

           cloudControlDetails
              The cloud control name and parameters.

               majorRevisionId
                  The major version of the cloud control.

               name
                  The name of the cloud control, in one of the following
                  formats:
                  organizations/{organization}/locations/{location}/cloudControls/{cloud_control}
                  or
                  projects/{project}/locations/{location}/cloudControls/{cloud_control}.

                  The only supported location is global.

               parameters
                  Parameters are key-value pairs that let you provide your
                  custom location requirements, environment requirements, or
                  other settings that are relevant to the cloud control. An
                  example parameter is {"name": "location","value":
                  "us-west-1"}.

                   name
                      The name or key of the parameter.

           enforcementMode
              The enforcement mode of the cloud control.

          Shorthand Example:

              --cloud-control-metadata=cloudControlDetails={majorRevisionId=int,name=string,parameters=[{name=string}]},enforcementMode=string --cloud-control-metadata=cloudControlDetails={majorRevisionId=int,name=string,parameters=[{name=string}]},enforcementMode=string

          JSON Example:

              --cloud-control-metadata='[{"cloudControlDetails": {"majorRevisionId": int, "name": "string", "parameters": [{"name": "string"}]}, "enforcementMode": "string"}]'

          File Example:

              --cloud-control-metadata=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-cloud-control-metadata=[cloudControlDetails=CLOUDCONTROLDETAILS],[enforcementMode=ENFORCEMENTMODE]
            Add new value to cloud_control_metadata list. The deployment mode
            and parameters for each of the cloud controls in the framework.
            Every cloud control in the framework includes metadata.

             cloudControlDetails
                The cloud control name and parameters.

                 majorRevisionId
                    The major version of the cloud control.

                 name
                    The name of the cloud control, in one of the following
                    formats:
                    organizations/{organization}/locations/{location}/cloudControls/{cloud_control}
                    or
                    projects/{project}/locations/{location}/cloudControls/{cloud_control}.

                    The only supported location is global.

                 parameters
                    Parameters are key-value pairs that let you provide your
                    custom location requirements, environment requirements, or
                    other settings that are relevant to the cloud control. An
                    example parameter is {"name": "location","value":
                    "us-west-1"}.

                     name
                        The name or key of the parameter.

             enforcementMode
                The enforcement mode of the cloud control.

            Shorthand Example:

                --add-cloud-control-metadata=cloudControlDetails={majorRevisionId=int,name=string,parameters=[{name=string}]},enforcementMode=string --add-cloud-control-metadata=cloudControlDetails={majorRevisionId=int,name=string,parameters=[{name=string}]},enforcementMode=string

            JSON Example:

                --add-cloud-control-metadata='[{"cloudControlDetails": {"majorRevisionId": int, "name": "string", "parameters": [{"name": "string"}]}, "enforcementMode": "string"}]'

            File Example:

                --add-cloud-control-metadata=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-cloud-control-metadata
              Clear cloud_control_metadata value and set to empty list.

           --remove-cloud-control-metadata=[cloudControlDetails=CLOUDCONTROLDETAILS],[enforcementMode=ENFORCEMENTMODE]
              Remove existing value from cloud_control_metadata list. The
              deployment mode and parameters for each of the cloud controls in
              the framework. Every cloud control in the framework includes
              metadata.

               cloudControlDetails
                  The cloud control name and parameters.

                   majorRevisionId
                      The major version of the cloud control.

                   name
                      The name of the cloud control, in one of the following
                      formats:
                      organizations/{organization}/locations/{location}/cloudControls/{cloud_control}
                      or
                      projects/{project}/locations/{location}/cloudControls/{cloud_control}.

                      The only supported location is global.

                   parameters
                      Parameters are key-value pairs that let you provide your
                      custom location requirements, environment requirements,
                      or other settings that are relevant to the cloud control.
                      An example parameter is {"name": "location","value":
                      "us-west-1"}.

                       name
                          The name or key of the parameter.

               enforcementMode
                  The enforcement mode of the cloud control.

              Shorthand Example:

                  --remove-cloud-control-metadata=cloudControlDetails={majorRevisionId=int,name=string,parameters=[{name=string}]},enforcementMode=string --remove-cloud-control-metadata=cloudControlDetails={majorRevisionId=int,name=string,parameters=[{name=string}]},enforcementMode=string

              JSON Example:

                  --remove-cloud-control-metadata='[{"cloudControlDetails": {"majorRevisionId": int, "name": "string", "parameters": [{"name": "string"}]}, "enforcementMode": "string"}]'

              File Example:

                  --remove-cloud-control-metadata=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compliance-manager framework-deployments update my-framework-deployment-id \
    --organization=my-organization-id \
    --location=global \
    --cloud-control-metadata='[{"cloudControlDetails": {"name": "organizations/my-organization-id/locations/global/cloudControls/my-control-1", "majorRevisionId": "1", "parameters": []}, "enforcementMode": "DETECTIVE"}]'

gcloud compliance-manager framework-deployments update my-framework-deployment-id \
    --project=my-project-number \
    --location=global \
    --cloud-control-metadata='[{"cloudControlDetails": {"name": "projects/my-project-number/locations/global/cloudControls/my-control-1", "majorRevisionId": "1", "parameters": []}, "enforcementMode": "DETECTIVE"}]'
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compliance-manager/framework-deployments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
