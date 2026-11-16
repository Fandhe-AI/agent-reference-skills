---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/bms/serial-console-ssh-keys
---

# gcloud bms serial-console-ssh-keys

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha bms serial-console-ssh-keys add

```text
NAME
    gcloud alpha bms serial-console-ssh-keys add - add a public SSH key to the
        project for accessing the interactive serial console in Bare Metal
        Solution

SYNOPSIS
    gcloud alpha bms serial-console-ssh-keys add SERIAL_CONSOLE_SSH_KEY
        (--key=KEY | --key-file=KEY_FILE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms serial-console-ssh-keys list

```text
NAME
    gcloud alpha bms serial-console-ssh-keys list - list the SSH keys added to
        the project for accessing the interactive serial console in Bare Metal
        Solution

SYNOPSIS
    gcloud alpha bms serial-console-ssh-keys list [--filter=EXPRESSION]
        [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms serial-console-ssh-keys remove

```text
NAME
    gcloud alpha bms serial-console-ssh-keys remove - remove an SSH key that is
        used to access the interactive serial console in Bare Metal Solution
        given its name

SYNOPSIS
    gcloud alpha bms serial-console-ssh-keys remove SERIAL_CONSOLE_SSH_KEY
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/bms/serial-console-ssh-keys (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
