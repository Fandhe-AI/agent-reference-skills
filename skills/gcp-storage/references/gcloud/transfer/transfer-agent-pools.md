---
source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/agent-pools
---

# gcloud transfer agent-pools

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud transfer agent-pools create

```text
NAME
    gcloud transfer agent-pools create - create a Transfer Service agent pool

SYNOPSIS
    gcloud transfer agent-pools create NAME [--no-async]
        [--bandwidth-limit=BANDWIDTH_LIMIT] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an agent pool -- a group of agents used to connect to a source or
    destination filesystem.

EXAMPLES
    To create an agent pool with name 'my-pool', display name 'daily backups',
    and no bandwidth limit, run:

        $ gcloud transfer agent-pools create my-pool \
          --display-name='daily backups'

    To create an agent pool with name 'my-pool', display name 'daily backups',
    and a bandwidth limit of 50 MB/s, run:

        $ gcloud transfer agent-pools create my-pool \
          --display-name="daily backups" --bandwidth-limit=50

POSITIONAL ARGUMENTS
     NAME
        A unique, permanent identifier for this pool.

FLAGS
     --no-async
        Block other tasks in your terminal until the pool has been created. If
        not included, pool creation will run asynchronously.

     --bandwidth-limit=BANDWIDTH_LIMIT
        Set how much of your bandwidth to make available to this pool's agents.
        A bandwidth limit applies to all agents in a pool and can help prevent
        the pool's transfer workload from disrupting other operations that
        share your bandwidth. For example, enter '50' to set a bandwidth limit
        of 50 MB/s. By leaving this flag unspecified, this flag unspecified,
        this pool's agents will use all bandwidth available to them.

     --display-name=DISPLAY_NAME
        A modifiable name to help you identify this pool. You can include
        details that might not fit in the pool's unique full resource name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer agent-pools create
```

### gcloud transfer agent-pools delete

```text
NAME
    gcloud transfer agent-pools delete - delete a Transfer Service agent pool

SYNOPSIS
    gcloud transfer agent-pools delete NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an agent pool. Note that before you can delete a pool, all the
    pool's agents must be stopped, its associated jobs must be disabled, and
    there must be no associated in-progress transfer operations.

EXAMPLES
    To delete agent pool 'foo', run:

        $ gcloud transfer agent-pools delete foo

    To check if there are active operations associated with a pool before
    deleting it, scroll through the results of:

        $ gcloud transfer operations list --format=yaml \
            --operation-statuses=in_progress

POSITIONAL ARGUMENTS
     NAME
        The name of the job you want to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer agent-pools delete
```

### gcloud transfer agent-pools describe

```text
NAME
    gcloud transfer agent-pools describe - get details about a specific agent
        pool

SYNOPSIS
    gcloud transfer agent-pools describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details about a specific agent pool.

EXAMPLES
    To monitor an agent pool, run:

        $ gcloud transfer agent-pools describe NAME

POSITIONAL ARGUMENTS
     NAME
        The name of the agent pool you want to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer agent-pools describe
```

### gcloud transfer agent-pools list

```text
NAME
    gcloud transfer agent-pools list - list Transfer Service transfer agent
        pools

SYNOPSIS
    gcloud transfer agent-pools list [--limit=LIMIT] [--names=[NAMES,...]]
        [--page-size=PAGE_SIZE; default=256] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Transfer Service transfer pools in a given project to show their
    configurations.

EXAMPLES
    To list all agent pools in your current project, run:

        $ gcloud transfer agent-pools list

    To list agent pools named "foo" and "bar" in your project, run:

        $ gcloud transfer agent-pools list --names=foo,bar

    To list all information about jobs 'foo' and 'bar' formatted as JSON, run:

        $ gcloud transfer agent-pools list --names=foo,bar --format=json

FLAGS
     --limit=LIMIT
        Return the first items from the API up to this limit.

     --names=[NAMES,...]
        The names of the agent pools you want to list. Separate multiple names
        with commas (e.g., --name=foo,bar). If not specified, all agent pools
        in your current project will be listed.

     --page-size=PAGE_SIZE; default=256
        Retrieve batches of this many items from the API.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer agent-pools list
```

### gcloud transfer agent-pools update

```text
NAME
    gcloud transfer agent-pools update - update a Transfer Service agent pool

SYNOPSIS
    gcloud transfer agent-pools update NAME [--bandwidth-limit=BANDWIDTH_LIMIT]
        [--clear-bandwidth-limit] [--clear-display-name]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an agent pool.

EXAMPLES
    To remove the bandwidth limit for agent pool 'foo', run:

        $ gcloud transfer agent-pools update foo --clear-bandwidth-limit

    To remove the display name for agent pool 'foo', run:

        $ gcloud transfer agent-pools update foo --clear-display-name

    To update the bandwidth limit for agent pool 'foo' to 100 MB/s, run:

        $ gcloud transfer agent-pools update foo --bandwidth-limit=100

    To update the display name for agent pool 'foo' to 'example name', run:

        $ gcloud transfer agent-pools update foo \
          --display-name="example name"

POSITIONAL ARGUMENTS
     NAME
        A unique, permanent identifier for this pool.

FLAGS
     --bandwidth-limit=BANDWIDTH_LIMIT
        Set how much of your bandwidth to make available to this pool's agents.
        A bandwidth limit applies to all agents in a pool and can help prevent
        the pool's transfer workload from disrupting other operations that
        share your bandwidth. For example, enter '50' to set a bandwidth limit
        of 50 MB/s. By leaving this flag unspecified, this flag unspecified,
        this pool's agents will use all bandwidth available to them.

     --clear-bandwidth-limit
        Remove the agent pool's bandwidth limit, which enables the pool's
        agents to use all bandwidth available to them.

     --clear-display-name
        Remove the display name from the agent pool.

     --display-name=DISPLAY_NAME
        A modifiable name to help you identify this pool. You can include
        details that might not fit in the pool's unique full resource name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer agent-pools update
```

### gcloud alpha transfer agent-pools create

```text
NAME
    gcloud alpha transfer agent-pools create - create a Transfer Service agent
        pool

SYNOPSIS
    gcloud alpha transfer agent-pools create NAME [--no-async]
        [--bandwidth-limit=BANDWIDTH_LIMIT] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer agent-pools delete

```text
NAME
    gcloud alpha transfer agent-pools delete - delete a Transfer Service agent
        pool

SYNOPSIS
    gcloud alpha transfer agent-pools delete NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer agent-pools describe

```text
NAME
    gcloud alpha transfer agent-pools describe - get details about a specific
        agent pool

SYNOPSIS
    gcloud alpha transfer agent-pools describe NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer agent-pools list

```text
NAME
    gcloud alpha transfer agent-pools list - list Transfer Service transfer
        agent pools

SYNOPSIS
    gcloud alpha transfer agent-pools list [--limit=LIMIT]
        [--names=[NAMES,...]] [--page-size=PAGE_SIZE; default=256]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer agent-pools update

```text
NAME
    gcloud alpha transfer agent-pools update - update a Transfer Service agent
        pool

SYNOPSIS
    gcloud alpha transfer agent-pools update NAME
        [--bandwidth-limit=BANDWIDTH_LIMIT] [--clear-bandwidth-limit]
        [--clear-display-name] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the `--names` description of `list` says "Separate multiple names with commas (e.g., --name=foo,bar)", but there is no `--name` flag (gcloud 593.0.0: "unrecognized arguments: --name=foo,bar (did you mean '--names'?)"); use `--names=foo,bar`, as in the EXAMPLES.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/agent-pools (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
