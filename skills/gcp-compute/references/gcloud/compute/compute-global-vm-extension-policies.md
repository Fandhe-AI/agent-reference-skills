---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/global-vm-extension-policies
---

# gcloud compute global-vm-extension-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute global-vm-extension-policies create

```text
NAME
    gcloud compute global-vm-extension-policies create - create a Compute
        Engine global VM extension policy

SYNOPSIS
    gcloud compute global-vm-extension-policies create NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--rollout-conflict-behavior=ROLLOUT_CONFLICT_BEHAVIOR]
        [--rollout-custom-plan=ROLLOUT_CUSTOM_PLAN]
        [--rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN]
        [--version=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine global VM extension policy.

EXAMPLES
    To create a global VM extension policy, run:

        $ gcloud compute global-vm-extension-policies create \
            test-policy-name --description="test policy" \
            --extensions=extension1,extension2 \
            --version=extension1=version1,extension2=version2 \
            --config=extension1="config1",extension2="config2" \
            --inclusion-labels=env=prod \
            --inclusion-labels=env=preprod,workload=load-test \
            --rollout-predefined-plan=slow_rollout --priority=1000

POSITIONAL ARGUMENTS
     NAME
        Name of the global vm extension policy to create.

REQUIRED FLAGS
     --extensions=EXTENSION_NAME,[...]
        One or more extensions to be added to the policy.

OPTIONAL FLAGS
     --config=KEY=VALUE,[KEY=VALUE,...]
        A comma separated key:value list where the key is the extension name
        and the value is the desired config for the given extension. The
        extension name must be one of the extensions specified in the
        --extensions flag.

        E.g. --config=filestore='filestore config',ops-agent='ops agent config'

        Raises: ArgumentTypeError: If the extension name is not specified in
        the --extensions flag.

     --config-from-file=KEY=FILE_PATH,[...]
        Same as --config except that the value for the entry will be read from
        a local file. The extension name must be one of the extensions
        specified in the --extensions flag.

        It is an error to specify the same extension in both --config and
        --config-from-file.

     --description=DESCRIPTION
        An optional text description for the extension policy.

     --inclusion-labels=INCLUSION_LABELS
        A list of inclusion labels to select the target VMs.

        The expected format for a single selector is "key1=value1,key2=value2".
        A VM is selected if it has ALL the inclusion labels.

        When the option is specified multiple times, it assumes a logical OR
        between the selectors.

        For example, if the inclusion labels are ["env=prod,workload=frontend",
        "workload=backend"], the following VMs will be selected:
        * VM1: env=prod, workload=frontend, something=else
        * VM2: env=prod, workload=backend But not:
        * VM3: env=prod

        If not specified, ALL VMs in the project/folder will be selected.

     --priority=PRIORITY; default=1000
        The priority of the policy. Lower the number, higher the priority. When
        two policies try to apply the same extension to a VM, the policy with
        higher priority takes precedence. If the priorities are the same, the
        policy with the more recent update timestamp takes precedence. If a
        policy is deleted, the extension remains installed on the VM if a
        lower-priority policy still applies.

        Range from 0 to 65535. Default is 1000.

     --rollout-conflict-behavior=ROLLOUT_CONFLICT_BEHAVIOR
        Specifies the behavior of a rollout if a conflict is detected between a
        zonal policy and a global policy. See gcloud compute
        zone-vm-extension-policies for more details on zonal policies.

        The possible values are:
        * "": The zonal policy value is used in case of a conflict. This is
          the default behavior.
        * overwrite: The global policy overwrites the zonal policy.

        If you set --rollout-conflict-behavior to overwrite and want to revert
        to the default behavior, use the update command and omit the
        --rollout-conflict-behavior flag.

     --rollout-custom-plan=ROLLOUT_CUSTOM_PLAN
        Provide the name of a custom rollout plan to be used for the rollout.

        One of either --rollout-predefined-plan or --rollout-custom-plan must
        be specified, but not both.

     --rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN
        Provide the name of a predefined rollout plan from [fast_rollout,
        slow_rollout] to be used for the rollout.

        One of either --rollout-predefined-plan or --rollout-custom-plan must
        be specified, but not both.

        ROLLOUT_PREDEFINED_PLAN must be one of: fast_rollout, slow_rollout.

     --version=KEY=VALUE,[KEY=VALUE,...]
        A comma separated key:value list where the key is the extension name
        and the value is the desired version for the given extension. The
        extension name must be one of the extensions specified in the
        --extensions flag. If no version is specified for an extension, the
        latest version will be used and will be upgraded automatically.

        E.g. --version=filestore=123ABC,ops-agent=456DEF

        Raises: ArgumentTypeError: If the extension name is not specified in
        the --extensions flag.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute global-vm-extension-policies create

        $ gcloud beta compute global-vm-extension-policies create
```

### gcloud compute global-vm-extension-policies delete

```text
NAME
    gcloud compute global-vm-extension-policies delete - delete a Compute
        Engine global VM extension policy

SYNOPSIS
    gcloud compute global-vm-extension-policies delete NAME
        [--rollout-custom-plan=ROLLOUT_CUSTOM_PLAN]
        [--rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN]
        [--rollout-retry-uuid=ROLLOUT_RETRY_UUID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Compute Engine global VM extension policy.

EXAMPLES
    To delete a global VM extension policy, run:

        $ gcloud compute global-vm-extension-policies delete test-policy-name

POSITIONAL ARGUMENTS
     NAME
        Name of the global vm extension policy to delete.

FLAGS
     --rollout-custom-plan=ROLLOUT_CUSTOM_PLAN
        Provide the name of a custom rollout plan to be used for the rollout.

        One of either --rollout-predefined-plan or --rollout-custom-plan must
        be specified, but not both.

     --rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN
        Provide the name of a predefined rollout plan from [fast_rollout,
        slow_rollout] to be used for the rollout.

        One of either --rollout-predefined-plan or --rollout-custom-plan must
        be specified, but not both.

        ROLLOUT_PREDEFINED_PLAN must be one of: fast_rollout, slow_rollout.

     --rollout-retry-uuid=ROLLOUT_RETRY_UUID
        The UUID of the rollout retry action. Only set it if this is a retry
        for an existing resource.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute global-vm-extension-policies delete

        $ gcloud beta compute global-vm-extension-policies delete
```

### gcloud compute global-vm-extension-policies describe

```text
NAME
    gcloud compute global-vm-extension-policies describe - describe a Compute
        Engine global VM extension policy

SYNOPSIS
    gcloud compute global-vm-extension-policies describe NAME
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Compute Engine global VM extension policy.

EXAMPLES
    To describe a global VM extension policy, run:

        $ gcloud compute global-vm-extension-policies describe \
            test-policy-name

POSITIONAL ARGUMENTS
     NAME
        Name of the global vm extension policy to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute global-vm-extension-policies describe

        $ gcloud beta compute global-vm-extension-policies describe
```

### gcloud compute global-vm-extension-policies list

```text
NAME
    gcloud compute global-vm-extension-policies list - list Compute Engine
        global VM extension policies

SYNOPSIS
    gcloud compute global-vm-extension-policies list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Compute Engine global VM extension policies.

EXAMPLES
    To list all global VM extension policy, run:

        $ gcloud compute global-vm-extension-policies list

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

NOTES
    These variants are also available:

        $ gcloud alpha compute global-vm-extension-policies list

        $ gcloud beta compute global-vm-extension-policies list
```

### gcloud compute global-vm-extension-policies update

```text
NAME
    gcloud compute global-vm-extension-policies update - update a Compute
        Engine global VM extension policy

SYNOPSIS
    gcloud compute global-vm-extension-policies update NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--rollout-conflict-behavior=ROLLOUT_CONFLICT_BEHAVIOR]
        [--rollout-custom-plan=ROLLOUT_CUSTOM_PLAN]
        [--rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN]
        [--rollout-retry-uuid=ROLLOUT_RETRY_UUID]
        [--version=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Compute Engine global VM extension policy.

EXAMPLES
    To update a global VM extension policy, run:

        $ gcloud compute global-vm-extension-policies update \
            test-policy-name --description="test policy" \
            --extensions=extension1,extension2 \
            --version=extension1=version1,extension2=version2 \
            --config=extension1="config1",extension2="config2" \
            --inclusion-labels=env=prod \
            --inclusion-labels=env=preprod,workload=load-test \
            --rollout-predefined-plan=slow_rollout --priority=1000

POSITIONAL ARGUMENTS
     NAME
        Name of the global vm extension policy to update.

REQUIRED FLAGS
     --extensions=EXTENSION_NAME,[...]
        One or more extensions to be added to the policy.

OPTIONAL FLAGS
     --config=KEY=VALUE,[KEY=VALUE,...]
        A comma separated key:value list where the key is the extension name
        and the value is the desired config for the given extension. The
        extension name must be one of the extensions specified in the
        --extensions flag.

        E.g. --config=filestore='filestore config',ops-agent='ops agent config'

        Raises: ArgumentTypeError: If the extension name is not specified in
        the --extensions flag.

     --config-from-file=KEY=FILE_PATH,[...]
        Same as --config except that the value for the entry will be read from
        a local file. The extension name must be one of the extensions
        specified in the --extensions flag.

        It is an error to specify the same extension in both --config and
        --config-from-file.

     --description=DESCRIPTION
        An optional text description for the extension policy.

     --inclusion-labels=INCLUSION_LABELS
        A list of inclusion labels to select the target VMs.

        The expected format for a single selector is "key1=value1,key2=value2".
        A VM is selected if it has ALL the inclusion labels.

        When the option is specified multiple times, it assumes a logical OR
        between the selectors.

        For example, if the inclusion labels are ["env=prod,workload=frontend",
        "workload=backend"], the following VMs will be selected:
        * VM1: env=prod, workload=frontend, something=else
        * VM2: env=prod, workload=backend But not:
        * VM3: env=prod

        If not specified, ALL VMs in the project/folder will be selected.

     --priority=PRIORITY; default=1000
        The priority of the policy. Lower the number, higher the priority. When
        two policies try to apply the same extension to a VM, the policy with
        higher priority takes precedence. If the priorities are the same, the
        policy with the more recent update timestamp takes precedence. If a
        policy is deleted, the extension remains installed on the VM if a
        lower-priority policy still applies.

        Range from 0 to 65535. Default is 1000.

     --rollout-conflict-behavior=ROLLOUT_CONFLICT_BEHAVIOR
        Specifies the behavior of a rollout if a conflict is detected between a
        zonal policy and a global policy. See gcloud compute
        zone-vm-extension-policies for more details on zonal policies.

        The possible values are:
        * "": The zonal policy value is used in case of a conflict. This is
          the default behavior.
        * overwrite: The global policy overwrites the zonal policy.

        If you set --rollout-conflict-behavior to overwrite and want to revert
        to the default behavior, use the update command and omit the
        --rollout-conflict-behavior flag.

     --rollout-custom-plan=ROLLOUT_CUSTOM_PLAN
        Provide the name of a custom rollout plan to be used for the rollout.

        One of either --rollout-predefined-plan or --rollout-custom-plan must
        be specified, but not both.

     --rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN
        Provide the name of a predefined rollout plan from [fast_rollout,
        slow_rollout] to be used for the rollout.

        One of either --rollout-predefined-plan or --rollout-custom-plan must
        be specified, but not both.

        ROLLOUT_PREDEFINED_PLAN must be one of: fast_rollout, slow_rollout.

     --rollout-retry-uuid=ROLLOUT_RETRY_UUID
        The UUID of the rollout retry action. Only set it if this is a retry
        for an existing resource.

     --version=KEY=VALUE,[KEY=VALUE,...]
        A comma separated key:value list where the key is the extension name
        and the value is the desired version for the given extension. The
        extension name must be one of the extensions specified in the
        --extensions flag. If no version is specified for an extension, the
        latest version will be used and will be upgraded automatically.

        E.g. --version=filestore=123ABC,ops-agent=456DEF

        Raises: ArgumentTypeError: If the extension name is not specified in
        the --extensions flag.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute global-vm-extension-policies update

        $ gcloud beta compute global-vm-extension-policies update
```

### gcloud beta compute global-vm-extension-policies create

```text
NAME
    gcloud beta compute global-vm-extension-policies create - create a Compute
        Engine global VM extension policy

SYNOPSIS
    gcloud beta compute global-vm-extension-policies create NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--rollout-conflict-behavior=ROLLOUT_CONFLICT_BEHAVIOR]
        [--rollout-custom-plan=ROLLOUT_CUSTOM_PLAN]
        [--rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN]
        [--version=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute global-vm-extension-policies delete

```text
NAME
    gcloud beta compute global-vm-extension-policies delete - delete a Compute
        Engine global VM extension policy

SYNOPSIS
    gcloud beta compute global-vm-extension-policies delete NAME
        [--rollout-custom-plan=ROLLOUT_CUSTOM_PLAN]
        [--rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN]
        [--rollout-retry-uuid=ROLLOUT_RETRY_UUID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute global-vm-extension-policies describe

```text
NAME
    gcloud beta compute global-vm-extension-policies describe - describe a
        Compute Engine global VM extension policy

SYNOPSIS
    gcloud beta compute global-vm-extension-policies describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute global-vm-extension-policies list

```text
NAME
    gcloud beta compute global-vm-extension-policies list - list Compute Engine
        global VM extension policies

SYNOPSIS
    gcloud beta compute global-vm-extension-policies list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute global-vm-extension-policies update

```text
NAME
    gcloud beta compute global-vm-extension-policies update - update a Compute
        Engine global VM extension policy

SYNOPSIS
    gcloud beta compute global-vm-extension-policies update NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--rollout-conflict-behavior=ROLLOUT_CONFLICT_BEHAVIOR]
        [--rollout-custom-plan=ROLLOUT_CUSTOM_PLAN]
        [--rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN]
        [--rollout-retry-uuid=ROLLOUT_RETRY_UUID]
        [--version=KEY=VALUE,[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute global-vm-extension-policies create

```text
NAME
    gcloud alpha compute global-vm-extension-policies create - create a Compute
        Engine global VM extension policy

SYNOPSIS
    gcloud alpha compute global-vm-extension-policies create NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--rollout-conflict-behavior=ROLLOUT_CONFLICT_BEHAVIOR]
        [--rollout-custom-plan=ROLLOUT_CUSTOM_PLAN]
        [--rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN]
        [--version=KEY=VALUE,[KEY=VALUE,...]]
        [--folder=FOLDER | --organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute global-vm-extension-policies delete

```text
NAME
    gcloud alpha compute global-vm-extension-policies delete - delete a Compute
        Engine global VM extension policy

SYNOPSIS
    gcloud alpha compute global-vm-extension-policies delete NAME
        [--rollout-custom-plan=ROLLOUT_CUSTOM_PLAN]
        [--rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN]
        [--rollout-retry-uuid=ROLLOUT_RETRY_UUID]
        [--folder=FOLDER | --organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute global-vm-extension-policies describe

```text
NAME
    gcloud alpha compute global-vm-extension-policies describe - describe a
        Compute Engine global VM extension policy

SYNOPSIS
    gcloud alpha compute global-vm-extension-policies describe NAME
        [--folder=FOLDER | --organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute global-vm-extension-policies extensions describe

```text
NAME
    gcloud alpha compute global-vm-extension-policies extensions describe -
        describe a vm extension at the global level

SYNOPSIS
    gcloud alpha compute global-vm-extension-policies extensions describe NAME
        [--folder=FOLDER | --organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute global-vm-extension-policies extensions list

```text
NAME
    gcloud alpha compute global-vm-extension-policies extensions list - list Vm
        Extensions globally

SYNOPSIS
    gcloud alpha compute global-vm-extension-policies extensions list
        [--folder=FOLDER | --organization=ORGANIZATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute global-vm-extension-policies list

```text
NAME
    gcloud alpha compute global-vm-extension-policies list - list Compute
        Engine global VM extension policies

SYNOPSIS
    gcloud alpha compute global-vm-extension-policies list
        [--folder=FOLDER | --organization=ORGANIZATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute global-vm-extension-policies update

```text
NAME
    gcloud alpha compute global-vm-extension-policies update - update a Compute
        Engine global VM extension policy

SYNOPSIS
    gcloud alpha compute global-vm-extension-policies update NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--rollout-conflict-behavior=ROLLOUT_CONFLICT_BEHAVIOR]
        [--rollout-custom-plan=ROLLOUT_CUSTOM_PLAN]
        [--rollout-predefined-plan=ROLLOUT_PREDEFINED_PLAN]
        [--rollout-retry-uuid=ROLLOUT_RETRY_UUID]
        [--version=KEY=VALUE,[KEY=VALUE,...]]
        [--folder=FOLDER | --organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/global-vm-extension-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
