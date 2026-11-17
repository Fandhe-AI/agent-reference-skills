---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/policy-orchestrators
---

# gcloud compute os-config policy-orchestrators

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute os-config policy-orchestrators create

```text
NAME
    gcloud compute os-config policy-orchestrators create - create a policy
        orchestrator

SYNOPSIS
    gcloud compute os-config policy-orchestrators create
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        --policy-type=POLICY_TYPE [--action=ACTION; default="upsert"] [--async]
        [--description=DESCRIPTION] [--include-folders=INCLUDE_FOLDERS]
        [--include-locations=INCLUDE_LOCATIONS]
        [--include-projects=INCLUDE_PROJECTS] [--policy-file=POLICY_FILE]
        [--policy-id=POLICY_ID] [--state=STATE; default="ACTIVE"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a policy orchestrator.

EXAMPLES
    To create a policy orchestrator my-orchestrator in folder 123456 for OS
    policy assignment with config file /path/to/file/config.yaml, run:

        $ gcloud compute os-config policy-orchestrators create \
            my-orchestrator --folder=123456 \
            --policy-type os_policy_assignment_v1 \
            --policy-file=/path/to/file/config.yaml

    To create a policy orchestrator my-orchestrator in folder 123456 that
    deletes OS Policy assignments with id my-policy, run:

        $ gcloud compute os-config policy-orchestrators create \
            my-orchestrator --folder=123456 \
            --policy-type os_policy_assignment_v1 --action delete \
            --policy-id my-policy

POSITIONAL ARGUMENTS
     Policy orchestrator resource - Policy orchestrator to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument policy_orchestrator on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [policy_orchestrator_project,
        policy_orchestrator_folder, policy_orchestrator_organization].

     This must be specified.

       POLICY_ORCHESTRATOR
          ID of the policy_orchestrator or fully qualified identifier for the
          policy_orchestrator.

          To set the policy_orchestrator attribute:
          + provide the argument policy_orchestrator on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder of the policy_orchestrator.

          To set the folder attribute:
          + provide the argument policy_orchestrator on the command line with
            a fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type [policy_orchestrator_folder].

       --organization=ORGANIZATION
          Organization of the policy_orchestrator.

          To set the organization attribute:
          + provide the argument policy_orchestrator on the command line with
            a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type [policy_orchestrator_organization].

REQUIRED FLAGS
     --policy-type=POLICY_TYPE
        Policy type to use. POLICY_TYPE must be (only one value is supported):

         os_policy_assignment_v1
            OS policy assignment v1.

OPTIONAL FLAGS
     --action=ACTION; default="upsert"
        Action to be taken on policy. ACTION must be one of:

         delete
            Delete a policy with a given name. policy-id must be specified.
         upsert
            Create or update a policy. policy-file must be specified.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the policy orchestrator.

     --include-folders=INCLUDE_FOLDERS
        Applies policy to selected folders. Comma-separated list of folder
        numbers. Can beused together with --include-projects.

     --include-locations=INCLUDE_LOCATIONS
        Applies policy to selected locations, e.g. us-central1-a.

     --include-projects=INCLUDE_PROJECTS
        Applies policy to selected projects. Comma-separated list of project
        numbers. Can be used together with --include-folders.

     --policy-file=POLICY_FILE
        Absolute path to the OS policy assignment file on your local client.
        File must be in either JSON or YAML format. This file defines the OS
        policies that you want to apply to your VMs, the target VMs that you
        want to apply the policies to, and the rollout rate at which to apply
        the OS policies on a zonal level. For more information about this
        resource and sample OS policy assignment files, see
        https://cloud.google.com/compute/docs/os-configuration-management/working-with-os-policies#os-policy-assignment.

     --policy-id=POLICY_ID
        Policy id. Must be specified for DELETE action.

     --state=STATE; default="ACTIVE"
        State of the policy orchestrator. STATE must be one of:

         active
            Creates a policy orchestrator in ACTIVE state.
         stopped
            Creates a policy orchestrator in STOPPED state.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the osconfig/v2 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

NOTES
    These variants are also available:

        $ gcloud alpha compute os-config policy-orchestrators create

        $ gcloud beta compute os-config policy-orchestrators create
```

### gcloud compute os-config policy-orchestrators delete

```text
NAME
    gcloud compute os-config policy-orchestrators delete - delete a policy
        orchestrator

SYNOPSIS
    gcloud compute os-config policy-orchestrators delete
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a policy orchestrator and cancel ongoing rollouts (best-effort).

EXAMPLES
    To delete a policy orchestrator my-orchestrator in the folder 123456:

        $ gcloud compute os-config policy-orchestrators delete \
            my-orchestrator --folder=123456

POSITIONAL ARGUMENTS
     Policy orchestrator resource - policy orchestrator to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument policy_orchestrator on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [policy_orchestrator_project,
        policy_orchestrator_folder, policy_orchestrator_organization].

     This must be specified.

       POLICY_ORCHESTRATOR
          ID of the policy_orchestrator or fully qualified identifier for the
          policy_orchestrator.

          To set the policy_orchestrator attribute:
          + provide the argument policy_orchestrator on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder of the policy_orchestrator.

          To set the folder attribute:
          + provide the argument policy_orchestrator on the command line with
            a fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type [policy_orchestrator_folder].

       --organization=ORGANIZATION
          Organization of the policy_orchestrator.

          To set the organization attribute:
          + provide the argument policy_orchestrator on the command line with
            a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type [policy_orchestrator_organization].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the osconfig/v2 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

NOTES
    These variants are also available:

        $ gcloud alpha compute os-config policy-orchestrators delete

        $ gcloud beta compute os-config policy-orchestrators delete
```

### gcloud compute os-config policy-orchestrators describe

```text
NAME
    gcloud compute os-config policy-orchestrators describe - describe a policy
        orchestrator

SYNOPSIS
    gcloud compute os-config policy-orchestrators describe
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the details of a policy orchestrator.

EXAMPLES
    To describe a policy orchestrator my-orchestrator:

        $ gcloud compute os-config policy-orchestrators describe \
            my-orchestrator

POSITIONAL ARGUMENTS
     Policy orchestrator resource - The policy orchestrator to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument policy_orchestrator on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [policy_orchestrator_project,
        policy_orchestrator_folder, policy_orchestrator_organization].

     This must be specified.

       POLICY_ORCHESTRATOR
          ID of the policy_orchestrator or fully qualified identifier for the
          policy_orchestrator.

          To set the policy_orchestrator attribute:
          + provide the argument policy_orchestrator on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder of the policy_orchestrator.

          To set the folder attribute:
          + provide the argument policy_orchestrator on the command line with
            a fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type [policy_orchestrator_folder].

       --organization=ORGANIZATION
          Organization of the policy_orchestrator.

          To set the organization attribute:
          + provide the argument policy_orchestrator on the command line with
            a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type [policy_orchestrator_organization].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the osconfig/v2 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

NOTES
    These variants are also available:

        $ gcloud alpha compute os-config policy-orchestrators describe

        $ gcloud beta compute os-config policy-orchestrators describe
```

### gcloud compute os-config policy-orchestrators list

```text
NAME
    gcloud compute os-config policy-orchestrators list - list policy
        orchestrators

SYNOPSIS
    gcloud compute os-config policy-orchestrators list
        [--folder=FOLDER --organization=ORGANIZATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List policy orchestrators.

EXAMPLES
    To list the policy orchestrators in folder 123456, run:

        $ gcloud compute os-config policy-orchestrators list --folder 123456

FLAGS
     Project folder organization resource - Project, folder or organization to
     list policy orchestrators from. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [project_a, folder_a, organization_a].

     --folder=FOLDER
        ID of the project_folder_organization or fully qualified identifier for
        the project_folder_organization.

        To set the folder attribute:
        * provide the argument --folder on the command line. Must be
          specified for resource of type [folder_a].

     --organization=ORGANIZATION
        ID of the project_folder_organization or fully qualified identifier for
        the project_folder_organization.

        To set the organization attribute:
        * provide the argument --organization on the command line. Must be
          specified for resource of type [organization_a].

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
    This command uses the osconfig/v2 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

NOTES
    These variants are also available:

        $ gcloud alpha compute os-config policy-orchestrators list

        $ gcloud beta compute os-config policy-orchestrators list
```

### gcloud compute os-config policy-orchestrators update

```text
NAME
    gcloud compute os-config policy-orchestrators update - update a policy
        orchestrator

SYNOPSIS
    gcloud compute os-config policy-orchestrators update
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        [--action=ACTION] [--async] [--description=DESCRIPTION]
        [--policy-file=POLICY_FILE] [--policy-id=POLICY_ID] [--state=STATE]
        [--clear-folders | --include-folders=INCLUDE_FOLDERS]
        [--clear-locations | --include-locations=INCLUDE_LOCATIONS]
        [--clear-projects | --include-projects=INCLUDE_PROJECTS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a policy orchestrator.

EXAMPLES
    To update an policy orchestrator my-orchestrator in folder 123456 with
    config file /path/to/file/config.yaml, run:

        $ gcloud compute os-config policy-orchestrators update \
            my-orchestrator --folder=123456 \
            --policy-file=/path/to/file/config.yaml

    To update an policy orchestrator my-orchestrator in folder 123456 with
    state STOPPED, run:

        $ gcloud compute os-config policy-orchestrators update \
            my-orchestrator --folder=123456 --state=stopped

POSITIONAL ARGUMENTS
     Policy orchestrator resource - Policy orchestrator to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument policy_orchestrator on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [policy_orchestrator_project,
        policy_orchestrator_folder, policy_orchestrator_organization].

     This must be specified.

       POLICY_ORCHESTRATOR
          ID of the policy_orchestrator or fully qualified identifier for the
          policy_orchestrator.

          To set the policy_orchestrator attribute:
          + provide the argument policy_orchestrator on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --folder=FOLDER
          Folder of the policy_orchestrator.

          To set the folder attribute:
          + provide the argument policy_orchestrator on the command line with
            a fully specified name;
          + provide the argument --folder on the command line. Must be
            specified for resource of type [policy_orchestrator_folder].

       --organization=ORGANIZATION
          Organization of the policy_orchestrator.

          To set the organization attribute:
          + provide the argument policy_orchestrator on the command line with
            a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type [policy_orchestrator_organization].

FLAGS
     --action=ACTION
        Action to be taken on policy. ACTION must be one of:

         delete
            Delete a policy with a given name. policy-id must be specified.
         upsert
            Create or update a policy. policy-file must be specified.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the policy orchestrator.

     --policy-file=POLICY_FILE
        Absolute path to the OS policy assignment file on your local client.
        File must be in either JSON or YAML format. This file defines the OS
        policies that you want to apply to your VMs, the target VMs that you
        want to apply the policies to, and the rollout rate at which to apply
        the OS policies on a zonal level. For more information about this
        resource and sample OS policy assignment files, see
        https://cloud.google.com/compute/docs/os-configuration-management/working-with-os-policies#os-policy-assignment.

     --policy-id=POLICY_ID
        Policy id. Must be specified for DELETE action.

     --state=STATE
        State of the policy orchestrator. STATE must be one of:

         active
            Updates the policy orchestrator to ACTIVE state.
         stopped
            Updates the policy orchestrator to STOPPED state.

     Folders to include in the policy orchestrator. Comma-separated list of
     folder numbers. If --include-folders is set, --clear-folders must not be
     set.

     At most one of these can be specified:

       --clear-folders
          Clears included folders from policy orchestrator selectors.

       --include-folders=INCLUDE_FOLDERS
          Applies policy to selected folders only.

     Locations to include in the policy orchestrator, e.g. us-central1-a. If
     include-locations is set, clear-locations must not be set.

     At most one of these can be specified:

       --clear-locations
          Clears included locations from policy orchestrator selectors.

       --include-locations=INCLUDE_LOCATIONS
          Applies policy to selected locations only.

     Projects to include in the policy orchestrator. Comma separated list of
     project numbers. If include-projects is set, clear-projects must not be
     set.

     At most one of these can be specified:

       --clear-projects
          Clears included projects from policy orchestrator selectors.

       --include-projects=INCLUDE_PROJECTS
          Applies policy to selected projects only.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the osconfig/v2 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

NOTES
    These variants are also available:

        $ gcloud alpha compute os-config policy-orchestrators update

        $ gcloud beta compute os-config policy-orchestrators update
```

### gcloud beta compute os-config policy-orchestrators create

```text
NAME
    gcloud beta compute os-config policy-orchestrators create - create a policy
        orchestrator

SYNOPSIS
    gcloud beta compute os-config policy-orchestrators create
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        --policy-type=POLICY_TYPE [--action=ACTION; default="upsert"] [--async]
        [--description=DESCRIPTION] [--include-folders=INCLUDE_FOLDERS]
        [--include-locations=INCLUDE_LOCATIONS]
        [--include-projects=INCLUDE_PROJECTS] [--policy-file=POLICY_FILE]
        [--policy-id=POLICY_ID] [--state=STATE; default="ACTIVE"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config policy-orchestrators delete

```text
NAME
    gcloud beta compute os-config policy-orchestrators delete - delete a policy
        orchestrator

SYNOPSIS
    gcloud beta compute os-config policy-orchestrators delete
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config policy-orchestrators describe

```text
NAME
    gcloud beta compute os-config policy-orchestrators describe - describe a
        policy orchestrator

SYNOPSIS
    gcloud beta compute os-config policy-orchestrators describe
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config policy-orchestrators list

```text
NAME
    gcloud beta compute os-config policy-orchestrators list - list policy
        orchestrators

SYNOPSIS
    gcloud beta compute os-config policy-orchestrators list
        [--folder=FOLDER --organization=ORGANIZATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config policy-orchestrators update

```text
NAME
    gcloud beta compute os-config policy-orchestrators update - update a policy
        orchestrator

SYNOPSIS
    gcloud beta compute os-config policy-orchestrators update
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        [--action=ACTION] [--async] [--description=DESCRIPTION]
        [--policy-file=POLICY_FILE] [--policy-id=POLICY_ID] [--state=STATE]
        [--clear-folders | --include-folders=INCLUDE_FOLDERS]
        [--clear-locations | --include-locations=INCLUDE_LOCATIONS]
        [--clear-projects | --include-projects=INCLUDE_PROJECTS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config policy-orchestrators create

```text
NAME
    gcloud alpha compute os-config policy-orchestrators create - create a
        policy orchestrator

SYNOPSIS
    gcloud alpha compute os-config policy-orchestrators create
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        --policy-type=POLICY_TYPE [--action=ACTION; default="upsert"] [--async]
        [--description=DESCRIPTION] [--include-folders=INCLUDE_FOLDERS]
        [--include-locations=INCLUDE_LOCATIONS]
        [--include-projects=INCLUDE_PROJECTS] [--policy-file=POLICY_FILE]
        [--policy-id=POLICY_ID] [--state=STATE; default="ACTIVE"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config policy-orchestrators delete

```text
NAME
    gcloud alpha compute os-config policy-orchestrators delete - delete a
        policy orchestrator

SYNOPSIS
    gcloud alpha compute os-config policy-orchestrators delete
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config policy-orchestrators describe

```text
NAME
    gcloud alpha compute os-config policy-orchestrators describe - describe a
        policy orchestrator

SYNOPSIS
    gcloud alpha compute os-config policy-orchestrators describe
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config policy-orchestrators list

```text
NAME
    gcloud alpha compute os-config policy-orchestrators list - list policy
        orchestrators

SYNOPSIS
    gcloud alpha compute os-config policy-orchestrators list
        [--folder=FOLDER --organization=ORGANIZATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config policy-orchestrators update

```text
NAME
    gcloud alpha compute os-config policy-orchestrators update - update a
        policy orchestrator

SYNOPSIS
    gcloud alpha compute os-config policy-orchestrators update
        (POLICY_ORCHESTRATOR : --folder=FOLDER --organization=ORGANIZATION)
        [--action=ACTION] [--async] [--description=DESCRIPTION]
        [--policy-file=POLICY_FILE] [--policy-id=POLICY_ID] [--state=STATE]
        [--clear-folders | --include-folders=INCLUDE_FOLDERS]
        [--clear-locations | --include-locations=INCLUDE_LOCATIONS]
        [--clear-projects | --include-projects=INCLUDE_PROJECTS]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/policy-orchestrators (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
