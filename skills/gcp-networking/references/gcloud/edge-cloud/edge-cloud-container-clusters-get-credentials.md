---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/clusters/get-credentials
---

# gcloud edge-cloud container clusters get-credentials

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud container clusters get-credentials

```text
NAME
    gcloud edge-cloud container clusters get-credentials - get credentials of
        an edge-container cluster

SYNOPSIS
    gcloud edge-cloud container clusters get-credentials
        (CLUSTER : --location=LOCATION)
        [--auth-provider-cmd-path=AUTH_PROVIDER_CMD_PATH]
        [--offline-credential] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Fetch credentials for a running Edge Container cluster. This command
    updates a kubeconfig file with appropriate credentials and endpoint
    information to point kubectl at a specific Edge Container cluster. By
    default, credentials are written to HOME/.kube/config. You can provide an
    alternate path by setting the KUBECONFIG environment variable. If
    KUBECONFIG contains multiple paths, the first one is used. This command
    enables switching to a specific cluster, when working with multiple
    clusters. It can also be used to access a previously created cluster from a
    new workstation. The command will configure kubectl to automatically
    refresh its credentials using the same identity as the gcloud command-line
    tool. See https://cloud.google.com/kubernetes-engine/docs/kubectl for
    kubectl documentation.

EXAMPLES
    To get credentials of a cluster named my-cluster managed in location
    us-west1, run:        $ gcloud edge-cloud container clusters get-credentials my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Cluster resource - Edge Container cluster to get credentials. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the cluster.

          To set the location attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --auth-provider-cmd-path=AUTH_PROVIDER_CMD_PATH
        Path to the gcloud executable for the auth provider field in
        kubeconfig.

     --offline-credential
        Once specified, an offline credential will be generated for the
        cluster.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud container clusters get-credentials
```

### gcloud alpha edge-cloud container clusters get-credentials

```text
NAME
    gcloud alpha edge-cloud container clusters get-credentials - get
        credentials of an edge-container cluster

SYNOPSIS
    gcloud alpha edge-cloud container clusters get-credentials
        (CLUSTER : --location=LOCATION)
        [--auth-provider-cmd-path=AUTH_PROVIDER_CMD_PATH]
        [--offline-credential] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/clusters/get-credentials (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
