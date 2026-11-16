---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/scopes/create
---

# gcloud container hub scopes create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub scopes create

```text
NAME
    gcloud container hub scopes create - create a new fleet scope

SYNOPSIS
    gcloud container hub scopes create SCOPE [--async]
        [--labels=[KEY=VALUE,...]] [--namespace-labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Fleet Scope resource.

EXAMPLES
    Create a new scope SCOPE_NAME in the active project's fleet:

        $ gcloud container hub scopes create SCOPE_NAME

POSITIONAL ARGUMENTS
     Scope resource - The fleet scope resourse to be created. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument scope on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument scope on the command line with a fully specified
        name;
      * global is the only supported location.

     This must be specified.

       SCOPE
          ID of the scope or fully qualified identifier for the scope.

          To set the scope attribute:
          + provide the argument scope on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --namespace-labels=[KEY=VALUE,...]
        List of scope-level label KEY=VALUE pairs to add.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the gkehub/v1 API. The full documentation for this API
    can be found at:
    https://cloud.google.com/anthos/multicluster-management/connect/registering-a-cluster

NOTES
    These variants are also available:

        $ gcloud alpha container hub scopes create

        $ gcloud beta container hub scopes create
```

### gcloud beta container hub scopes create

```text
NAME
    gcloud beta container hub scopes create - create a new fleet scope

SYNOPSIS
    gcloud beta container hub scopes create SCOPE [--async]
        [--labels=[KEY=VALUE,...]] [--namespace-labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub scopes create

```text
NAME
    gcloud alpha container hub scopes create - create a new fleet scope

SYNOPSIS
    gcloud alpha container hub scopes create SCOPE [--async]
        [--labels=[KEY=VALUE,...]] [--namespace-labels=[KEY=VALUE,...]]
        [--default-upgrade-soaking=DEFAULT_UPGRADE_SOAKING
          --upstream-scope=UPSTREAM_SCOPE
          --add-upgrade-soaking-override=ADD_UPGRADE_SOAKING_OVERRIDE
          --upgrade-selector=[name=NAME],[version=VERSION]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/scopes/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
