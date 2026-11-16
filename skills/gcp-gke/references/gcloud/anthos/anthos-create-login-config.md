---
source: https://docs.cloud.google.com/sdk/gcloud/reference/anthos/create-login-config
---

# gcloud anthos create-login-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud anthos create-login-config

```text
NAME
    gcloud anthos create-login-config - generates a login configuration file

SYNOPSIS
    gcloud anthos create-login-config --kubeconfig=KUBECONFIG
        [--merge-from=MERGE_FROM] [--output=OUTPUT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Generates the file containing configuration information developers will use
    to authenticate to an AWS Anthos cluster.

EXAMPLES
    To generate the default login config file (kubectl-anthos-config.yaml)
    using the kubeconfig file 'my-kube-config.yaml':

        $ gcloud anthos create-login-config \
            --kubeconfig 'my-kube-config.yaml'

    To generate a config named 'myconfg.yaml' the --kubeconfig file
    'my-kube-config.yaml':

        $ gcloud anthos create-login-config \
            --kubeconfig 'my-kube-config.yaml' --output 'myconfg.yaml'

REQUIRED FLAGS
     --kubeconfig=KUBECONFIG
        Specifies the input kubeconfig file to access user cluster for login
        configuration data.

OPTIONAL FLAGS
     --merge-from=MERGE_FROM
        Specifies the file path of an existing login configuration file to
        merge with.

     --output=OUTPUT
        Destination to write login configuration file. Defaults to
        "kubectl-anthos-config.yaml".

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha anthos create-login-config

        $ gcloud beta anthos create-login-config
```

### gcloud beta anthos create-login-config

```text
NAME
    gcloud beta anthos create-login-config - generates a login configuration
        file

SYNOPSIS
    gcloud beta anthos create-login-config --kubeconfig=KUBECONFIG
        [--merge-from=MERGE_FROM] [--output=OUTPUT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha anthos create-login-config

```text
NAME
    gcloud alpha anthos create-login-config - generates a login configuration
        file

SYNOPSIS
    gcloud alpha anthos create-login-config --kubeconfig=KUBECONFIG
        [--merge-from=MERGE_FROM] [--output=OUTPUT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/anthos/create-login-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
