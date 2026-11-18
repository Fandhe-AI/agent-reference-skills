---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/pam/settings
---

# gcloud pam settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta pam settings describe

```text
NAME
    gcloud beta pam settings describe - show details of Privileged Access
        Manager settings on a resource

SYNOPSIS
    gcloud beta pam settings describe
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam settings describe-effective

```text
NAME
    gcloud beta pam settings describe-effective - show effective Privileged
        Access Manager settings on a resource

SYNOPSIS
    gcloud beta pam settings describe-effective
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam settings export

```text
NAME
    gcloud beta pam settings export - export Privileged Access Manager settings
        configured on a project, folder, or organization to a local YAML file

SYNOPSIS
    gcloud beta pam settings export
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta pam settings update

```text
NAME
    gcloud beta pam settings update - update Privileged Access Manager settings
        configured on a project, folder, or organization

SYNOPSIS
    gcloud beta pam settings update --settings-file=PATH_TO_FILE
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam settings describe

```text
NAME
    gcloud alpha pam settings describe - show details of Privileged Access
        Manager settings on a resource

SYNOPSIS
    gcloud alpha pam settings describe
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam settings describe-effective

```text
NAME
    gcloud alpha pam settings describe-effective - show effective Privileged
        Access Manager settings on a resource

SYNOPSIS
    gcloud alpha pam settings describe-effective
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam settings export

```text
NAME
    gcloud alpha pam settings export - export Privileged Access Manager
        settings configured on a project, folder, or organization to a local
        YAML file

SYNOPSIS
    gcloud alpha pam settings export
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha pam settings update

```text
NAME
    gcloud alpha pam settings update - update Privileged Access Manager
        settings configured on a project, folder, or organization

SYNOPSIS
    gcloud alpha pam settings update --settings-file=PATH_TO_FILE
        (--location=LOCATION : --folder=FOLDER --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/pam/settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
