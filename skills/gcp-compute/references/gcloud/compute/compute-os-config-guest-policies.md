---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/os-config/guest-policies
---

# gcloud compute os-config guest-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta compute os-config guest-policies create

```text
NAME
    gcloud beta compute os-config guest-policies create - create a guest policy
        for a project

SYNOPSIS
    gcloud beta compute os-config guest-policies create POLICY_ID --file=FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config guest-policies delete

```text
NAME
    gcloud beta compute os-config guest-policies delete - delete the specified
        guest policy

SYNOPSIS
    gcloud beta compute os-config guest-policies delete POLICY_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config guest-policies describe

```text
NAME
    gcloud beta compute os-config guest-policies describe - describe the
        specified guest policy

SYNOPSIS
    gcloud beta compute os-config guest-policies describe POLICY_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config guest-policies list

```text
NAME
    gcloud beta compute os-config guest-policies list - list guest policies in
        a project

SYNOPSIS
    gcloud beta compute os-config guest-policies list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config guest-policies lookup

```text
NAME
    gcloud beta compute os-config guest-policies lookup - display the guest
        policies that are applied to an instance

SYNOPSIS
    gcloud beta compute os-config guest-policies lookup INSTANCE_NAME
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute os-config guest-policies update

```text
NAME
    gcloud beta compute os-config guest-policies update - update the specified
        guest policy for a project

SYNOPSIS
    gcloud beta compute os-config guest-policies update POLICY_ID --file=FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/os-config/guest-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
