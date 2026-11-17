---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/zone-vm-extension-policies
---

# gcloud compute zone-vm-extension-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute zone-vm-extension-policies create

```text
NAME
    gcloud compute zone-vm-extension-policies create - create a Compute Engine
        zone VM extension policy

SYNOPSIS
    gcloud compute zone-vm-extension-policies create NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--version=KEY=VALUE,[KEY=VALUE,...]] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine zone VM extension policy.

EXAMPLES
    To create a zone VM extension policy, run:

        $ gcloud compute zone-vm-extension-policies create \
            test-policy-name --description="test policy" \
            --extensions=extension1,extension2 \
            --version=extension1=version1,extension2=version2 \
            --config=extension1="config1",extension2="config2" \
            --inclusion-labels=env=prod \
            --inclusion-labels=env=preprod,workload=load-test \
            --priority=1000

        Available extensions:
          ops-agent
          google-cloud-sap-extension
          google-cloud-workload-extension

POSITIONAL ARGUMENTS
     NAME
        Name of the zone vm extension policy to create.

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

        If not specified, ALL VMs in the zone will be selected.

     --priority=PRIORITY; default=1000
        The priority of the policy. Lower the number, higher the priority. When
        two policies try to apply the same extension to a VM, the policy with
        higher priority takes precedence. If the priorities are the same, the
        policy with the more recent update timestamp takes precedence. If a
        policy is deleted, the extension remains installed on the VM if a
        lower-priority policy still applies.

        Range from 0 to 65535. Default is 1000.

     --version=KEY=VALUE,[KEY=VALUE,...]
        A comma separated key:value list where the key is the extension name
        and the value is the desired version for the given extension. The
        extension name must be one of the extensions specified in the
        --extensions flag. If no version is specified for an extension, the
        latest version will be used and will be upgraded automatically.

        E.g. --version=filestore=123ABC,ops-agent=456DEF

        Raises: ArgumentTypeError: If the extension name is not specified in
        the --extensions flag.

     --zone=ZONE
        Zone of the zone vm extension policy to create. If not specified and
        the compute/zone property isn't set, you might be prompted to select a
        zone (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute zone-vm-extension-policies create

        $ gcloud beta compute zone-vm-extension-policies create
```

### gcloud compute zone-vm-extension-policies delete

```text
NAME
    gcloud compute zone-vm-extension-policies delete - delete a Compute Engine
        zone VM extension policy

SYNOPSIS
    gcloud compute zone-vm-extension-policies delete NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Compute Engine zone VM extension policy.

EXAMPLES
    To delete a zone VM extension policy, run:

        $ gcloud compute zone-vm-extension-policies delete test-policy-name

POSITIONAL ARGUMENTS
     NAME
        Name of the zone vm extension policy to delete.

FLAGS
     --zone=ZONE
        Zone of the zone vm extension policy to delete. If not specified and
        the compute/zone property isn't set, you might be prompted to select a
        zone (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute zone-vm-extension-policies delete

        $ gcloud beta compute zone-vm-extension-policies delete
```

### gcloud compute zone-vm-extension-policies describe

```text
NAME
    gcloud compute zone-vm-extension-policies describe - describe a Compute
        Engine zone VM extension policy

SYNOPSIS
    gcloud compute zone-vm-extension-policies describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Compute Engine zone VM extension policy.

EXAMPLES
    To describe a zone VM extension policy, run:

        $ gcloud compute zone-vm-extension-policies describe test-policy-name

POSITIONAL ARGUMENTS
     NAME
        Name of the zone vm extension policy to describe.

FLAGS
     --zone=ZONE
        Zone of the zone vm extension policy to describe. If not specified and
        the compute/zone property isn't set, you might be prompted to select a
        zone (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute zone-vm-extension-policies describe

        $ gcloud beta compute zone-vm-extension-policies describe
```

### gcloud compute zone-vm-extension-policies list

```text
NAME
    gcloud compute zone-vm-extension-policies list - list Compute Engine zone
        VM extension policies

SYNOPSIS
    gcloud compute zone-vm-extension-policies list --zone=ZONE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Compute Engine zone VM extension policies.

EXAMPLES
    To list all zone VM extension policy, run:

        $ gcloud compute zone-vm-extension-policies list --zone=<zone>

REQUIRED FLAGS
     --zone=ZONE
        The zone to list the extension policies from.

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

        $ gcloud alpha compute zone-vm-extension-policies list

        $ gcloud beta compute zone-vm-extension-policies list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute zone-vm-extension-policies list \
    --zone=ZONE
```

### gcloud compute zone-vm-extension-policies update

```text
NAME
    gcloud compute zone-vm-extension-policies update - update a Compute Engine
        zone VM extension policy

SYNOPSIS
    gcloud compute zone-vm-extension-policies update NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--version=KEY=VALUE,[KEY=VALUE,...]] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Compute Engine zone VM extension policy.

EXAMPLES
    To update a zone VM extension policy, run:

        $ gcloud compute zone-vm-extension-policies update \
            test-policy-name --description="test policy" \
            --extensions=extension1,extension2 \
            --version=extension1=version1,extension2=version2 \
            --config=extension1="config1",extension2="config2" \
            --inclusion-labels=env=prod \
            --inclusion-labels=env=preprod,workload=load-test \
            --priority=1000

POSITIONAL ARGUMENTS
     NAME
        Name of the zone vm extension policy to update.

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

        If not specified, ALL VMs in the zone will be selected.

     --priority=PRIORITY; default=1000
        The priority of the policy. Lower the number, higher the priority. When
        two policies try to apply the same extension to a VM, the policy with
        higher priority takes precedence. If the priorities are the same, the
        policy with the more recent update timestamp takes precedence. If a
        policy is deleted, the extension remains installed on the VM if a
        lower-priority policy still applies.

        Range from 0 to 65535. Default is 1000.

     --version=KEY=VALUE,[KEY=VALUE,...]
        A comma separated key:value list where the key is the extension name
        and the value is the desired version for the given extension. The
        extension name must be one of the extensions specified in the
        --extensions flag. If no version is specified for an extension, the
        latest version will be used and will be upgraded automatically.

        E.g. --version=filestore=123ABC,ops-agent=456DEF

        Raises: ArgumentTypeError: If the extension name is not specified in
        the --extensions flag.

     --zone=ZONE
        Zone of the zone vm extension policy to update. If not specified and
        the compute/zone property isn't set, you might be prompted to select a
        zone (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute zone-vm-extension-policies update

        $ gcloud beta compute zone-vm-extension-policies update
```

### gcloud beta compute zone-vm-extension-policies create

```text
NAME
    gcloud beta compute zone-vm-extension-policies create - create a Compute
        Engine zone VM extension policy

SYNOPSIS
    gcloud beta compute zone-vm-extension-policies create NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--version=KEY=VALUE,[KEY=VALUE,...]] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute zone-vm-extension-policies delete

```text
NAME
    gcloud beta compute zone-vm-extension-policies delete - delete a Compute
        Engine zone VM extension policy

SYNOPSIS
    gcloud beta compute zone-vm-extension-policies delete NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute zone-vm-extension-policies describe

```text
NAME
    gcloud beta compute zone-vm-extension-policies describe - describe a
        Compute Engine zone VM extension policy

SYNOPSIS
    gcloud beta compute zone-vm-extension-policies describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute zone-vm-extension-policies list

```text
NAME
    gcloud beta compute zone-vm-extension-policies list - list Compute Engine
        zone VM extension policies

SYNOPSIS
    gcloud beta compute zone-vm-extension-policies list --zone=ZONE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute zone-vm-extension-policies update

```text
NAME
    gcloud beta compute zone-vm-extension-policies update - update a Compute
        Engine zone VM extension policy

SYNOPSIS
    gcloud beta compute zone-vm-extension-policies update NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--version=KEY=VALUE,[KEY=VALUE,...]] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute zone-vm-extension-policies create

```text
NAME
    gcloud alpha compute zone-vm-extension-policies create - create a Compute
        Engine zone VM extension policy

SYNOPSIS
    gcloud alpha compute zone-vm-extension-policies create NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--version=KEY=VALUE,[KEY=VALUE,...]] [--zone=ZONE]
        [--folder=FOLDER | --organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute zone-vm-extension-policies delete

```text
NAME
    gcloud alpha compute zone-vm-extension-policies delete - delete a Compute
        Engine zone VM extension policy

SYNOPSIS
    gcloud alpha compute zone-vm-extension-policies delete NAME [--zone=ZONE]
        [--folder=FOLDER | --organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute zone-vm-extension-policies describe

```text
NAME
    gcloud alpha compute zone-vm-extension-policies describe - describe a
        Compute Engine zone VM extension policy

SYNOPSIS
    gcloud alpha compute zone-vm-extension-policies describe NAME [--zone=ZONE]
        [--folder=FOLDER | --organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute zone-vm-extension-policies extensions describe

```text
NAME
    gcloud alpha compute zone-vm-extension-policies extensions describe -
        describe a vm extension for a given zone

SYNOPSIS
    gcloud alpha compute zone-vm-extension-policies extensions describe NAME
        [--zone=ZONE] [--folder=FOLDER | --organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute zone-vm-extension-policies extensions list

```text
NAME
    gcloud alpha compute zone-vm-extension-policies extensions list - list Vm
        Extensions in a zone

SYNOPSIS
    gcloud alpha compute zone-vm-extension-policies extensions list --zone=ZONE
        [--folder=FOLDER | --organization=ORGANIZATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute zone-vm-extension-policies list

```text
NAME
    gcloud alpha compute zone-vm-extension-policies list - list Compute Engine
        zone VM extension policies

SYNOPSIS
    gcloud alpha compute zone-vm-extension-policies list --zone=ZONE
        [--folder=FOLDER | --organization=ORGANIZATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute zone-vm-extension-policies update

```text
NAME
    gcloud alpha compute zone-vm-extension-policies update - update a Compute
        Engine zone VM extension policy

SYNOPSIS
    gcloud alpha compute zone-vm-extension-policies update NAME
        --extensions=EXTENSION_NAME,[...] [--config=KEY=VALUE,[KEY=VALUE,...]]
        [--config-from-file=KEY=FILE_PATH,[...]] [--description=DESCRIPTION]
        [--inclusion-labels=INCLUSION_LABELS]
        [--priority=PRIORITY; default=1000]
        [--version=KEY=VALUE,[KEY=VALUE,...]] [--zone=ZONE]
        [--folder=FOLDER | --organization=ORGANIZATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/zone-vm-extension-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
