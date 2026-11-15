---
source: https://docs.cloud.google.com/sdk/gcloud/reference/init
---

# gcloud init

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud init

```text
NAME
    gcloud init - initialize or reinitialize gcloud

SYNOPSIS
    gcloud init [--no-browser] [--console-only, --no-launch-browser]
        [--skip-diagnostics] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud init launches an interactive Getting Started workflow for the gcloud
    command-line tool. It performs the following setup steps:

      o Authorizes gcloud and other SDK tools to access Google Cloud using
        your user account credentials, or from an account of your choosing
        whose credentials are already available.
      o Sets up a new or existing configuration.
      o Sets properties in that configuration, including the current project
        and optionally, the default Google Compute Engine region and zone you'd
        like to use.

    gcloud init can be used for initial setup of gcloud and to create new or
    reinitialize gcloud configurations. More information about configurations
    can be found by running gcloud topic configurations.

    Properties set by gcloud init are local and persistent, and are not
    affected by remote changes to the project. For example, the default Compute
    Engine zone in your configuration remains stable, even if you or another
    user changes the project-level default zone in the Cloud Platform Console.

    To sync the configuration, re-run gcloud init.

EXAMPLES
    To launch an interactive Getting Started workflow, run:

        $ gcloud init

    To launch an interactive Getting Started workflow without diagnostics, run:

        $ gcloud init --skip-diagnostics

FLAGS
     --no-browser
        Prevent the command from launching a browser for authorization. Use
        this flag if you are on a machine that does not have a browser but you
        can install the gcloud CLI on another machine with a browser.

     --console-only, --no-launch-browser
        Prevent the command from launching a browser for authorization. Use
        this flag if you are on a machine that does not have a browser and you
        cannot install the gcloud CLI on another machine with a browser.

     --skip-diagnostics
        Do not run diagnostics.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha init

        $ gcloud beta init
```

### gcloud beta init

```text
NAME
    gcloud beta init - initialize or reinitialize gcloud

SYNOPSIS
    gcloud beta init [--no-browser] [--console-only, --no-launch-browser]
        [--skip-diagnostics] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha init

```text
NAME
    gcloud alpha init - initialize or reinitialize gcloud

SYNOPSIS
    gcloud alpha init [--no-browser] [--console-only, --no-launch-browser]
        [--skip-diagnostics] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/init (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
