---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/ssh-keys
---

# gcloud bms ssh-keys

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bms ssh-keys add

```text
NAME
    gcloud bms ssh-keys add - add a public SSH key to the project in Bare Metal
        Solution

SYNOPSIS
    gcloud bms ssh-keys add SSH_KEY (--key=KEY | --key-file=KEY_FILE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add a public SSH key to the project in Bare Metal Solution.

EXAMPLES
    To add an SSH key called my-ssh-key in project my-project with a public key
    ABC6695

        $ gcloud bms ssh-keys add my-ssh-key --project=my-project \
            --key=ABC6695

    To add an SSH key called my-ssh-key in project my-project with a public key
    stored in /home/user/.ssh/id_rsa.pub

        $ gcloud bms ssh-keys add my-ssh-key --project=my-project \
            --key-file=/home/user/.ssh/id_rsa.pub

POSITIONAL ARGUMENTS
     SSH key resource - ssh_key. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument ssh_key on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument ssh_key on the command line with a fully
        specified name;
      * global is the only supported location.

     This must be specified.

       SSH_KEY
          ID of the SSH key or fully qualified identifier for the SSH key.

          To set the ssh_key attribute:
          + provide the argument ssh_key on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --key=KEY
          The SSH public key to add

       --key-file=KEY_FILE
          The path to a file containing an SSH public key to add

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms ssh-keys add
```

### gcloud bms ssh-keys list

```text
NAME
    gcloud bms ssh-keys list - list the SSH keys added to the project in Bare
        Metal Solution

SYNOPSIS
    gcloud bms ssh-keys list [--filter=EXPRESSION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the SSH keys added to the project in Bare Metal Solution.

EXAMPLES
    To list all SSH keys within the project, run:

        $ gcloud bms ssh-keys list

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms ssh-keys list
```

### gcloud bms ssh-keys remove

```text
NAME
    gcloud bms ssh-keys remove - remove an SSH key in Bare Metal Solution given
        its name

SYNOPSIS
    gcloud bms ssh-keys remove SSH_KEY [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an SSH key in Bare Metal Solution given its name.

EXAMPLES
    To remove an SSH key called my-ssh-key run:

        $ gcloud bms ssh-keys remove my-ssh-key

POSITIONAL ARGUMENTS
     SSH key resource - ssh_key. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument ssh_key on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the region attribute:
      * provide the argument ssh_key on the command line with a fully
        specified name;
      * global is the only supported location.

     This must be specified.

       SSH_KEY
          ID of the SSH key or fully qualified identifier for the SSH key.

          To set the ssh_key attribute:
          + provide the argument ssh_key on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms ssh-keys remove
```

### gcloud alpha bms ssh-keys add

```text
NAME
    gcloud alpha bms ssh-keys add - add a public SSH key to the project in Bare
        Metal Solution

SYNOPSIS
    gcloud alpha bms ssh-keys add SSH_KEY (--key=KEY | --key-file=KEY_FILE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms ssh-keys list

```text
NAME
    gcloud alpha bms ssh-keys list - list the SSH keys added to the project in
        Bare Metal Solution

SYNOPSIS
    gcloud alpha bms ssh-keys list [--filter=EXPRESSION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms ssh-keys remove

```text
NAME
    gcloud alpha bms ssh-keys remove - remove an SSH key in Bare Metal Solution
        given its name

SYNOPSIS
    gcloud alpha bms ssh-keys remove SSH_KEY [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/ssh-keys (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
