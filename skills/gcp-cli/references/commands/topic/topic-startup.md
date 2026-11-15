---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/startup
---

# gcloud topic startup

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic startup

```text
NAME
    gcloud topic startup - supplementary help for gcloud startup options

DESCRIPTION
    This page provides supplementary help for configuring the gcloud
    command-line tool's startup behavior, including Python interpreter
    selection and environment variables.

CONFIGURING THE PYTHON INTERPRETER
    The gcloud CLI requires a compatible Python version (3.10-3.15) to run. In
    most gcloud CLI installations, the gcloud installer manages the Python
    installation (version 3.14) for the user. Configuring the Python
    interpreter is only supported in specific scenarios described below.

  When to Use CLOUDSDK_PYTHON environment variable
    You can ONLY consider using the CLOUDSDK_PYTHON environment variable when
    you are on:

      o Linux: Installing from a versioned archives (*.tar.gz*) on 32-bit x86
        architectures where Python is NOT included as part of the installation,
        gcloud will search for a compatible Python on your system PATH (looking
        for python3 then python). You can set the CLOUDSDK_PYTHON environment
        variable to the full path of your preferred compatible Python
        interpreter if the default one found on PATH is not desired.
      o macOS: Available only for archived install and where the Python
        version matches the Python version managed by the gcloud CLI Tools
        install. Note that this is not available for Homebrew installations of
        gcloud CLI Tools.
      o Windows: gcloud installer includes the required Python interpreter by
        default. Only use CLOUDSDK_PYTHON if you need to use a different Python
        installation.

    Example Usages:

        # Use the python3 interpreter on your path
        $ export CLOUDSDK_PYTHON=python3

        # Use a python you have installed in a special location
        $ export CLOUDSDK_PYTHON=/usr/local/my-custom-python-install/python

  Other Components
    gsutil versions 5.0 and later support Python 3.10-3.14. To use a different
    interpreter for gsutil than for the other Python tools, set the
    CLOUDSDK_GSUTIL_PYTHON environment variable to the interpreter that you
    want.

    bq versions 2.0.99 and later support Python 3.10-3.15. To use a different
    interpreter for bq than for the other Python tools, set the
    CLOUDSDK_BQ_PYTHON environment variable to the interpreter that you want.

SETTING CONFIGURATIONS AND PROPERTIES
    Your active configuration can also be set via the environment variable
    CLOUDSDK_ACTIVE_CONFIG_NAME. This allows you to specify a certain
    configuration in a given terminal session without changing the global
    default configuration.

    In addition to being able to set them via gcloud config set, each gcloud
    property has a corresponding environment variable. They take the form:
    CLOUDSDK_SECTION_PROPERTY. For example, if you wanted to change your active
    project for just one terminal you could run:

        $ export CLOUDSDK_CORE_PROJECT=my-project

    For more information, see gcloud topic configurations.

NOTES
    These variants are also available:

        $ gcloud alpha topic startup

        $ gcloud beta topic startup
```

### gcloud beta topic startup

```text
NAME
    gcloud beta topic startup - supplementary help for gcloud startup options
```

### gcloud alpha topic startup

```text
NAME
    gcloud alpha topic startup - supplementary help for gcloud startup options
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/startup (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
