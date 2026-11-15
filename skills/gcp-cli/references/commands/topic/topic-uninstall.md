---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/uninstall
---

# gcloud topic uninstall

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic uninstall

```text
NAME
    gcloud topic uninstall - supplementary help for uninstalling Google Cloud
        CLI

DESCRIPTION
Uninstalling Google Cloud CLI

    Note: For installations completed using an OS package (such as apt-get,
    yum, etc.), uninstall Google Cloud CLI via the OS package manager.

    Note: For Windows installations, execute the uninstaller.exe found under
    your Google Cloud CLI directory.

    To completely remove Google Cloud CLI, follow these instructions:

      o Locate your installation directory by running:

        $ gcloud info --format="value(installation.sdk_root)"

      o Locate your user config directory (typically ~/.config/gcloud on
        MacOS and Linux) by running:

        $ gcloud info --format="value(config.paths.global_config_dir)"

      o Delete both these directories.

      o Additionally, remove lines sourcing completion.bash.inc and
        paths.bash.inc in your .bashrc or equivalent shell init file, if you
        added them during installation.

      o Review the contents of the .boto file in your home directory and
        remove the sections '[GoogleCompute]' and '[GSUtil]'. In addition,
        review the sections '[OAuth2]' and '[Credentials]' for settings that
        are no longer needed.

      o Some systems may have Cache directories such as ~/Library/Caches/ on
        Mac OS X. Find and delete these directories for your system:

        $ find ~/Library/Caches/ -type d -name "google-cloud-sdk" | xargs \
        rm -r

NOTES
    These variants are also available:

        $ gcloud alpha topic uninstall

        $ gcloud beta topic uninstall
```

### gcloud beta topic uninstall

```text
NAME
    gcloud beta topic uninstall - supplementary help for uninstalling Google
        Cloud CLI
```

### gcloud alpha topic uninstall

```text
NAME
    gcloud alpha topic uninstall - supplementary help for uninstalling Google
        Cloud CLI
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/uninstall (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
