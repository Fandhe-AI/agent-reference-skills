---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/workload
---

# gcloud container workload

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container workload profiles manifests create

```text
NAME
    gcloud container workload profiles manifests create - generate optimized
        Kubernetes manifests for a given workload profile

SYNOPSIS
    gcloud container workload profiles manifests create
        --cluster-version=CLUSTER_VERSION --workload=WORKLOAD
        [--options=[KEY=VALUE,...]] [--output=OUTPUT; default="all"]
        [--output-path=OUTPUT_PATH] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Generate optimized Kubernetes manifests for a given workload profile.

REQUIRED FLAGS
     --cluster-version=CLUSTER_VERSION
        The GKE version to generate the manifest for.

     --workload=WORKLOAD
        The name of the optimization set to generate the manifest for. This
        specifies the workload, workload version, and workload characterization
        to optimize for (e.g., "redis-7-caching").

OPTIONAL FLAGS
     --options=[KEY=VALUE,...]
        Additional key-value pair options for generating the manifest. For
        example, to specify allowed machine types:
        --options=machineType=type1,type2

     --output=OUTPUT; default="all"
        The output to display. Default is all. OUTPUT must be one of: manifest,
        all.

     --output-path=OUTPUT_PATH
        The path to save the output to. If not specified, output to the
        terminal.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/workload (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
