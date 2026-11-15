---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app/instances
---

# gcloud app instances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app instances delete

```text
NAME
    gcloud app instances delete - delete a specified instance

SYNOPSIS
    gcloud app instances delete INSTANCE --service=SERVICE, -s SERVICE
        --version=VERSION, -v VERSION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a specified instance.

EXAMPLES
    To delete instance i1 of service s1 and version v1, run:

        $ gcloud app instances delete i1 --service=s1 --version=v1

POSITIONAL ARGUMENTS
     INSTANCE
        The instance ID.

REQUIRED FLAGS
     --service=SERVICE, -s SERVICE
        The service ID.

     --version=VERSION, -v VERSION
        The version ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app instances delete
```

### gcloud app instances describe

```text
NAME
    gcloud app instances describe - display all data about an existing instance

SYNOPSIS
    gcloud app instances describe INSTANCE --service=SERVICE, -s SERVICE
        --version=VERSION, -v VERSION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all data about an existing instance.

EXAMPLES
    To show all data about instance i1 for service s1 and version v1, run:

        $ gcloud app instances describe --service=s1 --version=v1 i1

POSITIONAL ARGUMENTS
     INSTANCE
        The instance ID.

REQUIRED FLAGS
     --service=SERVICE, -s SERVICE
        The service ID.

     --version=VERSION, -v VERSION
        The version ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app instances describe
```

### gcloud app instances disable-debug

```text
NAME
    gcloud app instances disable-debug - disable debug mode for an instance

SYNOPSIS
    gcloud app instances disable-debug [INSTANCE]
        [--service=SERVICE, -s SERVICE] [--version=VERSION, -v VERSION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    When not in debug mode, SSH will be disabled on the VMs. They will be
    included in the health checking pools.

    Note that any local changes to an instance will be lost if debug mode is
    disabled on the instance. New instance(s) may spawn depending on the app's
    scaling settings.

EXAMPLES
    To disable debug mode for a particular instance, run:

        $ gcloud app instances disable-debug --service=s1 --version=v1 i1

    To disable debug mode for an instance chosen interactively, run:

        $ gcloud app instances disable-debug

POSITIONAL ARGUMENTS
     [INSTANCE]
        The instance ID to disable debug mode on. If not specified, select
        instance interactively. Must uniquely specify (with other flags)
        exactly one instance

FLAGS
     --service=SERVICE, -s SERVICE
        If specified, only match instances belonging to the given service. This
        affects both interactive and non-interactive selection.

     --version=VERSION, -v VERSION
        If specified, only match instances belonging to the given version. This
        affects both interactive and non-interactive selection.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app instances disable-debug
```

### gcloud app instances enable-debug

```text
NAME
    gcloud app instances enable-debug - enable debug mode for an instance
        (only works on the flexible environment)

SYNOPSIS
    gcloud app instances enable-debug [INSTANCE]
        [--service=SERVICE, -s SERVICE] [--version=VERSION, -v VERSION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    When in debug mode, SSH will be enabled on the VMs, and you can use gcloud
    compute ssh to login to them. They will be removed from the health checking
    pools, but they still receive requests.

    Note that any local changes to an instance will be lost if debug mode is
    disabled on the instance. New instance(s) may spawn depending on the app's
    scaling settings.

    Additionally, debug mode doesn't work for applications using the App Engine
    standard environment.

EXAMPLES
    To enable debug mode for a particular instance, run:

        $ gcloud app instances enable-debug --service=s1 --version=v1 i1

    To enable debug mode for an instance chosen interactively, run:

        $ gcloud app instances enable-debug

POSITIONAL ARGUMENTS
     [INSTANCE]
        Instance ID to enable debug mode on. If not specified, select instance
        interactively. Must uniquely specify (with other flags) exactly one
        instance

FLAGS
     --service=SERVICE, -s SERVICE
        If specified, only match instances belonging to the given service. This
        affects both interactive and non-interactive selection.

     --version=VERSION, -v VERSION
        If specified, only match instances belonging to the given version. This
        affects both interactive and non-interactive selection.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app instances enable-debug
```

### gcloud app instances list

```text
NAME
    gcloud app instances list - list the instances affiliated with the current
        App Engine project

SYNOPSIS
    gcloud app instances list [--service=SERVICE, -s SERVICE]
        [--version=VERSION, -v VERSION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the instances affiliated with the current App Engine project.

EXAMPLES
    To list all App Engine instances, run:

        $ gcloud app instances list

    To list all App Engine instances for a given service, run:

        $ gcloud app instances list -s myservice

    To list all App Engine instances for a given version, run:

        $ gcloud app instances list -v v1

FLAGS
     --service=SERVICE, -s SERVICE
        If specified, only list instances belonging to the given service.

     --version=VERSION, -v VERSION
        If specified, only list instances belonging to the given version.

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
    This variant is also available:

        $ gcloud beta app instances list
```

### gcloud app instances scp

```text
NAME
    gcloud app instances scp - SCP from or to the VM of an App Engine Flexible
        instance

SYNOPSIS
    gcloud app instances scp [INSTANCE:]SRC [[INSTANCE:]SRC ...]
        [INSTANCE:]DEST [--compress] [--recurse] [--service=SERVICE]
        [--tunnel-through-iap] [--version=VERSION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud app instances scp lets you remotely copy files to or from an App
    Engine Flexible instance.

    gcloud app instances scp resolves the instance's IP address and
    pre-populates the VM with a public key managed by gcloud. If the gcloud
    managed key pair does not exist, it is generated the first time an SSH
    command is run, which may prompt you for a passphrase for the private key
    encryption.

    All SSH commands require the OpenSSH client suite to be installed on Linux
    and Mac OS X. On Windows, the Google Cloud CLI comes with a bundled PuTTY
    suite instead, so it has no external dependencies.

EXAMPLES
    To copy one file from a remote instance to the local machine, run:

        $ gcloud app instances scp --service=s1 --version=v1 \
          i1:remote_file local_file

    To copy several local files to a remote instance, run:

        $ gcloud app instances scp --service=s1 --version=v1 local_1 \
          local_1 i1:remote_dir

    To use recursive copy, run:

        $ gcloud app instances scp --service=s1 --version=v1 \
          --recurse local_dir i1:remote_dir

POSITIONAL ARGUMENTS
     [INSTANCE:]SRC [[INSTANCE:]SRC ...]
        Specifies the files to copy.

     [INSTANCE:]DEST
        Specifies a destination for the source files.

FLAGS
     --compress
        Enable compression.

     --recurse
        Upload directories recursively.

     --service=SERVICE
        The service ID.

     --tunnel-through-iap
        Tunnel the ssh connection through Identity-Aware Proxy for TCP
        forwarding.

        To learn more, see the IAP for TCP forwarding documentation
        (https://cloud.google.com/iap/docs/tcp-forwarding-overview).

     --version=VERSION
        The version ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app instances scp
```

### gcloud app instances ssh

```text
NAME
    gcloud app instances ssh - SSH into the VM of an App Engine Flexible
        instance

SYNOPSIS
    gcloud app instances ssh INSTANCE [--container=CONTAINER]
        [--service=SERVICE] [--tunnel-through-iap] [--version=VERSION]
        [GCLOUD_WIDE_FLAG ...] [-- COMMAND ...]

DESCRIPTION
    gcloud app instances ssh lets you remotely log in to your running App
    Engine Flexible instances under two conditions:
      o The instance is running.
      o The instance has an external IP address. To check from the Cloud
        Console, go to the Instances page and confirm that there is an IP
        address listed in the VM IP column. To check from your app.yaml, open
        your app.yaml and look at the network settings. The instance_ip_mode
        field must be either not listed or set to external.

    gcloud app instances ssh resolves the instance's IP address and
    pre-populates the VM with a public key managed by gcloud. If the gcloud
    managed key pair does not exist, it is generated the first time an SSH
    command is run, which may prompt you for a passphrase for the private key
    encryption.

    All SSH commands require the OpenSSH client suite to be installed on Linux
    and Mac OS X. On Windows, the Google Cloud CLI comes with a bundled PuTTY
    suite instead, so it has no external dependencies.

EXAMPLES
    To SSH into an App Engine Flexible instance, run:

        $ gcloud app instances ssh --service=s1 --version=v1 i1

    To SSH into the app container within an instance, run:

        $ gcloud app instances ssh --service=s1 --version=v1 i1 \
          --container=gaeapp

    To SSH into the app container and run a remote command, run:

        $ gcloud app instances ssh --service=s1 --version=v1 i1 \
          --container=gaeapp -- echo hello

POSITIONAL ARGUMENTS
     INSTANCE
        The instance ID.

     [-- COMMAND ...]
        Remote command to execute on the VM.

        The '--' argument must be specified between gcloud specific args on the
        left and COMMAND on the right.

FLAGS
     --container=CONTAINER
        Name of the container within the VM to connect to.

     --service=SERVICE
        The service ID.

     --tunnel-through-iap
        Tunnel the ssh connection through Identity-Aware Proxy for TCP
        forwarding.

        To learn more, see the IAP for TCP forwarding documentation
        (https://cloud.google.com/iap/docs/tcp-forwarding-overview).

     --version=VERSION
        The version ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app instances ssh
```

### gcloud beta app instances delete

```text
NAME
    gcloud beta app instances delete - delete a specified instance

SYNOPSIS
    gcloud beta app instances delete INSTANCE --service=SERVICE, -s SERVICE
        --version=VERSION, -v VERSION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app instances describe

```text
NAME
    gcloud beta app instances describe - display all data about an existing
        instance

SYNOPSIS
    gcloud beta app instances describe INSTANCE --service=SERVICE, -s SERVICE
        --version=VERSION, -v VERSION [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app instances disable-debug

```text
NAME
    gcloud beta app instances disable-debug - disable debug mode for an
        instance

SYNOPSIS
    gcloud beta app instances disable-debug [INSTANCE]
        [--service=SERVICE, -s SERVICE] [--version=VERSION, -v VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app instances enable-debug

```text
NAME
    gcloud beta app instances enable-debug - enable debug mode for an instance
        (only works on the flexible environment)

SYNOPSIS
    gcloud beta app instances enable-debug [INSTANCE]
        [--service=SERVICE, -s SERVICE] [--version=VERSION, -v VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app instances list

```text
NAME
    gcloud beta app instances list - list the instances affiliated with the
        current App Engine project

SYNOPSIS
    gcloud beta app instances list [--service=SERVICE, -s SERVICE]
        [--version=VERSION, -v VERSION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app instances scp

```text
NAME
    gcloud beta app instances scp - SCP from or to the VM of an App Engine
        Flexible environment instance

SYNOPSIS
    gcloud beta app instances scp [INSTANCE:]SRC [[INSTANCE:]SRC ...]
        [INSTANCE:]DEST [--compress] [--recurse] [--service=SERVICE]
        [--tunnel-through-iap] [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app instances ssh

```text
NAME
    gcloud beta app instances ssh - SSH into the VM of an App Engine Flexible
        instance

SYNOPSIS
    gcloud beta app instances ssh INSTANCE [--container=CONTAINER]
        [--service=SERVICE, -s SERVICE] [--tunnel-through-iap]
        [--version=VERSION, -v VERSION] [GCLOUD_WIDE_FLAG ...] [-- COMMAND ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/instances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
