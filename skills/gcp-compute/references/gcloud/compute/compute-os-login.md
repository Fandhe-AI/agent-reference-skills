---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-login
---

# gcloud compute os-login

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute os-login describe-profile

```text
NAME
    gcloud compute os-login describe-profile - describe the OS Login profile
        for the current user

SYNOPSIS
    gcloud compute os-login describe-profile [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute os-login describe-profile displays the OS Login profile for
    the currently authenticated user, including Posix accounts and SSH keys
    associated with the user.

EXAMPLES
    To show all of the information about your OS Login profile, including POSIX
    account information and stored SSH public keys, run:

        $ gcloud compute os-login describe-profile

    To show all of the information in a different format, such as JSON, use the
    --format flag:

        $ gcloud compute os-login describe-profile --format=json

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute os-login describe-profile

        $ gcloud beta compute os-login describe-profile
```

### gcloud compute os-login remove-profile

```text
NAME
    gcloud compute os-login remove-profile - remove the posix account
        information for the current user

SYNOPSIS
    gcloud compute os-login remove-profile [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute os-login remove-profile removes the posix account
    information for the current user where the account ID field is set to the
    current project ID. Posix account entries for G Suite users do not set the
    account ID field and can only be modified by a domain administrator.

EXAMPLES
    To remove all POSIX accounts associated with the current user and project,
    run:

        $ gcloud compute os-login remove-profile

    To remove all POSIX accounts associated with the current user in the
    project named example-project, run:

        $ gcloud compute os-login remove-profile --project=example-project

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute os-login remove-profile

        $ gcloud beta compute os-login remove-profile
```

### gcloud compute os-login ssh-keys add

```text
NAME
    gcloud compute os-login ssh-keys add - add an SSH public key to an OS Login
        profile

SYNOPSIS
    gcloud compute os-login ssh-keys add (--key=KEY | --key-file=KEY_FILE)
        [--ttl=TTL] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute os-login ssh-keys add accepts either a string containing an
    SSH public key or a filename for an SSH public key and adds that key to the
    user's OS Login profile.

EXAMPLES
    To add the key in /home/user/.ssh/id_rsa.pub to your OS Login profile, run:

        $ gcloud compute os-login ssh-keys add \
            --key-file=/home/user/.ssh/id_rsa.pub

    To add the same key, but with a one year expiration time, run:

        $ gcloud compute os-login ssh-keys add \
            --key-file=/home/user/.ssh/id_rsa.pub --ttl=1y

    To add a key not stored in a file, run:

        $ gcloud compute os-login ssh-keys add \
            --key='ssh-rsa AAAAB3NzaC1yc2EAAA...MTg+InRG47+/O4/uWEOy6gIQEF
         user@example.com'

REQUIRED FLAGS
     Exactly one of these must be specified:

       --key=KEY
          The SSH public key to add to the OS Login Profile.

       --key-file=KEY_FILE
          The path to a file containing an SSH public key to add to the OS
          Login Profile.

OPTIONAL FLAGS
     --ttl=TTL
        The amount of time before the SSH key expires. For example, specifying
        30m will set the expiration time on the SSH key for 30 minutes from the
        current time. A value of 0 will result in no expiration time. See $
        gcloud topic datetimes for information on duration formats.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute os-login ssh-keys add

        $ gcloud beta compute os-login ssh-keys add
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute os-login ssh-keys add \
    --key='ssh-rsa AAAAB3NzaC1yc2EAAA...MTg+InRG47+/O4/uWEOy6gIQEF user@example.com'
```

### gcloud compute os-login ssh-keys describe

```text
NAME
    gcloud compute os-login ssh-keys describe - describe an SSH Public Key from
        an OS Login Profile

SYNOPSIS
    gcloud compute os-login ssh-keys describe (--key=KEY | --key-file=KEY_FILE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute os-login ssh-keys describe accepts either a string
    containing an SSH Public Key or a filename for an SSH Public key and
    displays that key from the user's OS Login Profile. The key value used can
    either be the full SSH key or the OS Login fingerprint for that key.

EXAMPLES
    To show all of the information for the key stored in your OS Login profile
    that matches the key in /home/user/.ssh/id_rsa.pub, run:

        $ gcloud compute os-login ssh-keys describe \
            --key-file=/home/user/.ssh/id_rsa.pub

    To show all of the information about the key with a fingerprint of
    'e0d96d6fad35a61a0577f467940509b5aa08b6dea8d99456ec19a6e47126bc52', run:

        $ gcloud compute os-login ssh-keys describe \
            --key='e0d96d6fad35a61a0577f467940509b5aa08b6dea8d99456ec19a6e47\
        126bc52'

REQUIRED FLAGS
     Exactly one of these must be specified:

       --key=KEY
          The SSH public key to describe from the OS Login Profile. Key value
          can either be the SSH key or the OS Login fingerprint of the key.

       --key-file=KEY_FILE
          The path to a file containing an SSH public key to describe from the
          OS Login Profile. Key value can either be the SSH key or the OS Login
          fingerprint of the key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute os-login ssh-keys describe

        $ gcloud beta compute os-login ssh-keys describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute os-login ssh-keys describe \
    --key='e0d96d6fad35a61a0577f467940509b5aa08b6dea8d99456ec19a6e47126bc52'
```

### gcloud compute os-login ssh-keys list

```text
NAME
    gcloud compute os-login ssh-keys list - list SSH public keys from an OS
        Login profile

SYNOPSIS
    gcloud compute os-login ssh-keys list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute os-login ssh-keys list lists the SSH public keys in an OS
    Login profile. By default, the command only displays the fingerprints and
    experation time for the keys. Additional data can be displayed using the
    --format flag.

EXAMPLES
    To list the keys in your OS Login profile, run:

        $ gcloud compute os-login ssh-keys list

    To show all of the SSH public key information, in YAML format, run:

        $ gcloud compute os-login ssh-keys list --format=yaml

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute os-login ssh-keys list

        $ gcloud beta compute os-login ssh-keys list
```

### gcloud compute os-login ssh-keys remove

```text
NAME
    gcloud compute os-login ssh-keys remove - remove an SSH public key from an
        OS Login profile

SYNOPSIS
    gcloud compute os-login ssh-keys remove (--key=KEY | --key-file=KEY_FILE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute os-login ssh-keys remove accepts either a string containing
    an SSH public key or a filename for an SSH public key and removes that key
    from the user's OS Login profile. The key value used can either be the full
    SSH key or the OS Login fingerprint for that key.

EXAMPLES
    To remove the key that is stored in /home/user/.ssh/id_rsa.pub, run:

        $ gcloud compute os-login ssh-keys remove \
            --key-file=/home/user/.ssh/id_rsa.pub

    To remove the key with fingerprint
    'e0d96d6fad35a61a0577f467940509b5aa08b6dea8d99456ec19a6e47126bc52', run:

        $ gcloud compute os-login ssh-keys remove \
            --key='e0d96d6fad35a61a0577f467940509b5aa08b6dea8d99456ec19a6e47\
        126bc52'

    To remove the SSH public key
    'AAAAB3NzaC1yc2EAAAADAQABAAAB...ZrPg+DZJIwPab2wPlveLh+ut1Lxs5QTR/9QfEa7',
    run:

        $ gcloud compute os-login ssh-keys remove \
            --key='AAAAB3NzaC1yc2EAAAADAQABAAAB...ZrPg+DZJIwPab2wPlveLh+ut1L\
        xs5QTR/9QfEa7'

REQUIRED FLAGS
     Exactly one of these must be specified:

       --key=KEY
          The SSH public key to remove from the OS Login Profile. Key value can
          either be the SSH key or the OS Login fingerprint of the key.

       --key-file=KEY_FILE
          The path to a file containing an SSH public key to remove from the OS
          Login Profile. Key value can either be the SSH key or the OS Login
          fingerprint of the key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute os-login ssh-keys remove

        $ gcloud beta compute os-login ssh-keys remove
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute os-login ssh-keys remove \
    --key='e0d96d6fad35a61a0577f467940509b5aa08b6dea8d99456ec19a6e47126bc52'

gcloud compute os-login ssh-keys remove \
    --key='AAAAB3NzaC1yc2EAAAADAQABAAAB...ZrPg+DZJIwPab2wPlveLh+ut1Lxs5QTR/9QfEa7'
```

### gcloud compute os-login ssh-keys update

```text
NAME
    gcloud compute os-login ssh-keys update - update an SSH public key in an OS
        Login profile

SYNOPSIS
    gcloud compute os-login ssh-keys update --ttl=TTL
        (--key=KEY | --key-file=KEY_FILE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute os-login ssh-keys update accepts either a string containing
    an SSH public key or a filename for an SSH public key, and updates the key
    in the user's OS Login profile. Currently, only the expiration time, --ttl,
    can be updated.

EXAMPLES
    To update the SSH public key found in /home/user/.ssh/id_rsa.pub with an
    expiration time of one week from now, run:

        $ gcloud compute os-login ssh-keys update --ttl=7d \
            --key-file=/home/user/.ssh/id_rsa.pub

    To update the SSH public key with a fingerprint of
    'e0d96d6fad35a61a0577f467940509b5aa08b6dea8d99456ec19a6e47126bc52' and an
    expiration time of five years from now, run:

        $ gcloud compute os-login ssh-keys update --ttl=5y \
            --key='e0d96d6fad35a61a0577f467940509b5aa08b6dea8d99456ec19a6e47\
        126bc52'

REQUIRED FLAGS
     --ttl=TTL
        The amount of time before the SSH key expires. For example, specifying
        30m will set the expiration time on the SSH key for 30 minutes from the
        current time. A value of 0 will result in no expiration time. See $
        gcloud topic datetimes for information on duration formats.

     Exactly one of these must be specified:

       --key=KEY
          The SSH public key to update the OS Login Profile. Key value can
          either be the SSH key or the OS Login fingerprint of the key.

       --key-file=KEY_FILE
          The path to a file containing an SSH public key to update the OS
          Login Profile. Key value can either be the SSH key or the OS Login
          fingerprint of the key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute os-login ssh-keys update

        $ gcloud beta compute os-login ssh-keys update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute os-login ssh-keys update \
    --ttl=5y \
    --key='e0d96d6fad35a61a0577f467940509b5aa08b6dea8d99456ec19a6e47126bc52'
```

### gcloud beta compute os-login describe-profile

```text
NAME
    gcloud beta compute os-login describe-profile - describe the OS Login
        profile for the current user

SYNOPSIS
    gcloud beta compute os-login describe-profile [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-login remove-profile

```text
NAME
    gcloud beta compute os-login remove-profile - remove the posix account
        information for the current user

SYNOPSIS
    gcloud beta compute os-login remove-profile [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-login ssh-keys add

```text
NAME
    gcloud beta compute os-login ssh-keys add - add an SSH public key to an OS
        Login profile

SYNOPSIS
    gcloud beta compute os-login ssh-keys add (--key=KEY | --key-file=KEY_FILE)
        [--ttl=TTL] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-login ssh-keys describe

```text
NAME
    gcloud beta compute os-login ssh-keys describe - describe an SSH Public Key
        from an OS Login Profile

SYNOPSIS
    gcloud beta compute os-login ssh-keys describe
        (--key=KEY | --key-file=KEY_FILE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-login ssh-keys list

```text
NAME
    gcloud beta compute os-login ssh-keys list - list SSH public keys from an
        OS Login profile

SYNOPSIS
    gcloud beta compute os-login ssh-keys list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-login ssh-keys remove

```text
NAME
    gcloud beta compute os-login ssh-keys remove - remove an SSH public key
        from an OS Login profile

SYNOPSIS
    gcloud beta compute os-login ssh-keys remove
        (--key=KEY | --key-file=KEY_FILE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-login ssh-keys update

```text
NAME
    gcloud beta compute os-login ssh-keys update - update an SSH public key in
        an OS Login profile

SYNOPSIS
    gcloud beta compute os-login ssh-keys update --ttl=TTL
        (--key=KEY | --key-file=KEY_FILE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-login describe-profile

```text
NAME
    gcloud alpha compute os-login describe-profile - describe the OS Login
        profile for the current user

SYNOPSIS
    gcloud alpha compute os-login describe-profile [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-login remove-profile

```text
NAME
    gcloud alpha compute os-login remove-profile - remove the posix account
        information for the current user

SYNOPSIS
    gcloud alpha compute os-login remove-profile
        [--operating-system=OPERATING_SYSTEM; default="linux"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-login ssh-keys add

```text
NAME
    gcloud alpha compute os-login ssh-keys add - add an SSH public key to an OS
        Login profile

SYNOPSIS
    gcloud alpha compute os-login ssh-keys add
        (--key=KEY | --key-file=KEY_FILE) [--ttl=TTL] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-login ssh-keys describe

```text
NAME
    gcloud alpha compute os-login ssh-keys describe - describe an SSH Public
        Key from an OS Login Profile

SYNOPSIS
    gcloud alpha compute os-login ssh-keys describe
        (--key=KEY | --key-file=KEY_FILE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-login ssh-keys list

```text
NAME
    gcloud alpha compute os-login ssh-keys list - list SSH public keys from an
        OS Login profile

SYNOPSIS
    gcloud alpha compute os-login ssh-keys list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-login ssh-keys remove

```text
NAME
    gcloud alpha compute os-login ssh-keys remove - remove an SSH public key
        from an OS Login profile

SYNOPSIS
    gcloud alpha compute os-login ssh-keys remove
        (--key=KEY | --key-file=KEY_FILE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-login ssh-keys update

```text
NAME
    gcloud alpha compute os-login ssh-keys update - update an SSH public key in
        an OS Login profile

SYNOPSIS
    gcloud alpha compute os-login ssh-keys update --ttl=TTL
        (--key=KEY | --key-file=KEY_FILE) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-login (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
