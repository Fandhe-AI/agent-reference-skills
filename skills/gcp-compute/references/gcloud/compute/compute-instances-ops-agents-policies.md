---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/ops-agents/policies
---

# gcloud compute instances ops-agents policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances ops-agents policies create

```text
NAME
    gcloud compute instances ops-agents policies create - create a Google Cloud
        Observability agents policy for the Ops Agent

SYNOPSIS
    gcloud compute instances ops-agents policies create POLICY_ID --file=FILE
        --zone=ZONE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances ops-agents policies create creates a policy that
    facilitates agent management across Compute Engine instances based on user
    specified instance filters. This policy installs, specifies versioning, and
    removes Ops Agents.

    The command returns the content of the created policy or an error
    indicating why the creation fails. The created policy takes effect
    asynchronously. It can take 10-15 minutes for the VMs to enforce the newly
    created policy.

EXAMPLES
    To create a Google Cloud Observability agents policy, run:        $ gcloud compute instances ops-agents policies create agent-policy \
            --project=PROJECT --zone=ZONE --file=config.yaml

POSITIONAL ARGUMENTS
     POLICY_ID
        ID of the policy.

        This ID must contain only lowercase letters, numbers, and hyphens, end
        with a number or a letter, be between 1-63 characters, and be unique
        within the project.

REQUIRED FLAGS
     --file=FILE
        YAML file with agents policy to create. For information about the
        agents policy format, see
        https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/agent-policies#config-files.

     --zone=ZONE
        Zone in which to create the agents policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instances ops-agents policies create

        $ gcloud beta compute instances ops-agents policies create
```

### gcloud compute instances ops-agents policies delete

```text
NAME
    gcloud compute instances ops-agents policies delete - delete a Google Cloud
        Observability agents policy for the Ops Agent

SYNOPSIS
    gcloud compute instances ops-agents policies delete POLICY_ID --zone=ZONE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances ops-agents policies delete deletes a policy that
    facilitates agent management across Compute Engine instances based on user
    specified instance filters.

    The command returns a response indicating whether the deletion succeeded.
    After a policy is deleted, it takes 10-15 minutes to be wiped from the
    applicable instances. Deleting a policy does not delete any existing agents
    managed by that policy, but the agents become unmanaged by any policies. To
    remove the agents from the instances, first update the policy to set the
    agent packageState to removed, wait for the policy to take effect, then
    delete the policy.

    The command returns the content of the deleted policy. For instance:

        agentsRule:
          packageState: installed
          version: latest
        instanceFilter:
          inclusionLabels:
          - labels:
              env: prod

    If no policies are found, or the policy is not an agents policy, then the
    command returns a NOT_FOUND error.

EXAMPLES
    To delete an agents policy named ops-agents-test-policy in the current
    project, run:

        $ gcloud compute instances ops-agents policies delete \
            ops-agents-test-policy --zone=ZONE

POSITIONAL ARGUMENTS
     POLICY_ID
        ID of the policy.

        This ID must contain only lowercase letters, numbers, and hyphens, end
        with a number or a letter, be between 1-63 characters, and be unique
        within the project.

REQUIRED FLAGS
     --zone=ZONE
        Zone of the agents policy you want to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instances ops-agents policies delete

        $ gcloud beta compute instances ops-agents policies delete
```

### gcloud compute instances ops-agents policies describe

```text
NAME
    gcloud compute instances ops-agents policies describe - describe a Google
        Cloud Observability agents policy for the Ops Agent

SYNOPSIS
    gcloud compute instances ops-agents policies describe POLICY_ID --zone=ZONE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances ops-agents policies describe describes a policy
    that facilitates agent management across Compute Engine instances based on
    user specified instance filters. This policy installs, specifies
    versioning, and removes Ops Agents.

    The command returns the content of one policy. For instance:

        agentsRule:
          packageState: installed
          version: latest
        instanceFilter:
          inclusionLabels:
          - labels:
              env: prod

    If no policies are found, then the command returns a NOT_FOUND error.

EXAMPLES
    To describe an agents policy named ops-agents-test-policy in the current
    project, run:

        $ gcloud compute instances ops-agents policies describe \
            ops-agents-test-policy --zone=ZONE

POSITIONAL ARGUMENTS
     POLICY_ID
        ID of the policy.

        This ID must contain only lowercase letters, numbers, and hyphens, end
        with a number or a letter, be between 1-63 characters, and be unique
        within the project.

REQUIRED FLAGS
     --zone=ZONE
        Zone of the agents policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instances ops-agents policies describe

        $ gcloud beta compute instances ops-agents policies describe
```

### gcloud compute instances ops-agents policies list

```text
NAME
    gcloud compute instances ops-agents policies list - list a Google Cloud
        Observability agents policy for the Ops Agent

SYNOPSIS
    gcloud compute instances ops-agents policies list --zone=ZONE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances ops-agents policies list lists policies that
    facilitate agent management across Compute Engine instances based on user
    specified instance filters. These policies install, specify versioning, and
    remove agents.

    The command returns a list of policies, including the POLICY_ID,
    ROLLOUT_STATE, and UPDATE_TIME for each policy. If no policies are found,
    then the command returns an empty list. If policies were found but they
    don't match as agents policies, then those policies won't be shown in the
    list.

EXAMPLES
    To list agents policies in the current project, run:

        $ gcloud compute instances ops-agents policies list --zone=ZONE

REQUIRED FLAGS
     --zone=ZONE
        Zone for which you want to list agent policies.

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

        $ gcloud alpha compute instances ops-agents policies list

        $ gcloud beta compute instances ops-agents policies list
```

### gcloud compute instances ops-agents policies update

```text
NAME
    gcloud compute instances ops-agents policies update - update a Google Cloud
        Observability agents policy for the Ops Agent

SYNOPSIS
    gcloud compute instances ops-agents policies update POLICY_ID --file=FILE
        --zone=ZONE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances ops-agents policies update modifies a policy that
    facilitates agent management across Compute Engine instances based on user
    specified instance filters. This policy installs, specifies versioning, and
    removes Ops Agents.

    The command returns the content of the modified policy or an error
    indicating why the modification fails. The modified policy takes effect
    asynchronously. It can take 10-15 minutes for the VMs to enforce the newly
    modified policy.

EXAMPLES
    To update a Google Cloud Observability agents policy, run:        $ gcloud compute instances ops-agents policies update agent-policy \
            --project=PROJECT --zone=ZONE --file=config.yaml

POSITIONAL ARGUMENTS
     POLICY_ID
        ID of the policy.

        This ID must contain only lowercase letters, numbers, and hyphens, end
        with a number or a letter, be between 1-63 characters, and be unique
        within the project.

REQUIRED FLAGS
     --file=FILE
        YAML file with a subset of agents policy fields you wish to update. For
        information about the agents policy format, see
        https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/agent-policies#config-files.

     --zone=ZONE
        Zone where the agents policy is located.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instances ops-agents policies update

        $ gcloud beta compute instances ops-agents policies update
```

### gcloud beta compute instances ops-agents policies create

```text
NAME
    gcloud beta compute instances ops-agents policies create - create a Google
        Cloud's operations suite agents (Ops Agents) policy

SYNOPSIS
    gcloud beta compute instances ops-agents policies create POLICY_ID
        --agent-rules=type=TYPE,version=VERSION,package-state=PACKAGE-STATE,
          enable-autoupgrade=ENABLE-AUTOUPGRADE;[...]
        --os-types=short-name=SHORT-NAME,version=VERSION;[...]
        [--description=DESCRIPTION]
        [--group-labels=[LABEL_NAME=LABEL_VALUE,
          LABEL_NAME=LABEL_VALUE,...;...]]
        [--instances=[zones/ZONE_NAME/instances/INSTANCE_NAME,...]]
        [--zones=[ZONE_NAME,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instances ops-agents policies delete

```text
NAME
    gcloud beta compute instances ops-agents policies delete - delete a Google
        Cloud's operations suite agents (Ops Agents) policy

SYNOPSIS
    gcloud beta compute instances ops-agents policies delete POLICY_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instances ops-agents policies describe

```text
NAME
    gcloud beta compute instances ops-agents policies describe - describe a
        Google Cloud's operations suite agents (Ops Agents) policy

SYNOPSIS
    gcloud beta compute instances ops-agents policies describe POLICY_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instances ops-agents policies list

```text
NAME
    gcloud beta compute instances ops-agents policies list - list Google
        Cloud's operations suite agents (Ops Agents) policies

SYNOPSIS
    gcloud beta compute instances ops-agents policies list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instances ops-agents policies update

```text
NAME
    gcloud beta compute instances ops-agents policies update - update a Google
        Cloud operations suite agent (Ops Agent) policy

SYNOPSIS
    gcloud beta compute instances ops-agents policies update POLICY_ID
        [--agent-rules=type=TYPE,version=VERSION,package-state=PACKAGE-STATE,
          enable-autoupgrade=ENABLE-AUTOUPGRADE;[...]]
        [--description=DESCRIPTION] [--etag=ETAG]
        [--os-types=short-name=SHORT-NAME,version=VERSION;[...]]
        [--clear-group-labels
          | --group-labels=[LABEL_NAME=LABEL_VALUE,
          LABEL_NAME=LABEL_VALUE,...;...]]
        [--clear-instances
          | --instances=[zones/ZONE_NAME/instances/INSTANCE_NAME,...]]
        [--clear-zones | --zones=[ZONE_NAME,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances ops-agents policies create

```text
NAME
    gcloud alpha compute instances ops-agents policies create - create a Google
        Cloud's operations suite agents (Ops Agents) policy

SYNOPSIS
    gcloud alpha compute instances ops-agents policies create POLICY_ID
        --agent-rules=type=TYPE,version=VERSION,package-state=PACKAGE-STATE,
          enable-autoupgrade=ENABLE-AUTOUPGRADE;[...]
        --os-types=short-name=SHORT-NAME,version=VERSION;[...]
        [--description=DESCRIPTION]
        [--group-labels=[LABEL_NAME=LABEL_VALUE,
          LABEL_NAME=LABEL_VALUE,...;...]]
        [--instances=[zones/ZONE_NAME/instances/INSTANCE_NAME,...]]
        [--zones=[ZONE_NAME,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances ops-agents policies delete

```text
NAME
    gcloud alpha compute instances ops-agents policies delete - delete a Google
        Cloud's operations suite agents (Ops Agents) policy

SYNOPSIS
    gcloud alpha compute instances ops-agents policies delete POLICY_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances ops-agents policies describe

```text
NAME
    gcloud alpha compute instances ops-agents policies describe - describe a
        Google Cloud's operations suite agents (Ops Agents) policy

SYNOPSIS
    gcloud alpha compute instances ops-agents policies describe POLICY_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances ops-agents policies list

```text
NAME
    gcloud alpha compute instances ops-agents policies list - list Google
        Cloud's operations suite agents (Ops Agents) policies

SYNOPSIS
    gcloud alpha compute instances ops-agents policies list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances ops-agents policies update

```text
NAME
    gcloud alpha compute instances ops-agents policies update - update a Google
        Cloud operations suite agent (Ops Agent) policy

SYNOPSIS
    gcloud alpha compute instances ops-agents policies update POLICY_ID
        [--agent-rules=type=TYPE,version=VERSION,package-state=PACKAGE-STATE,
          enable-autoupgrade=ENABLE-AUTOUPGRADE;[...]]
        [--description=DESCRIPTION] [--etag=ETAG]
        [--os-types=short-name=SHORT-NAME,version=VERSION;[...]]
        [--clear-group-labels
          | --group-labels=[LABEL_NAME=LABEL_VALUE,
          LABEL_NAME=LABEL_VALUE,...;...]]
        [--clear-instances
          | --instances=[zones/ZONE_NAME/instances/INSTANCE_NAME,...]]
        [--clear-zones | --zones=[ZONE_NAME,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/ops-agents/policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
