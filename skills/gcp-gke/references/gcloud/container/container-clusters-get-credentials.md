---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/get-credentials
---

# gcloud container clusters get-credentials

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container clusters get-credentials

```text
NAME
    gcloud container clusters get-credentials - fetch credentials for a running
        cluster

SYNOPSIS
    gcloud container clusters get-credentials NAME [--dns-endpoint]
        [--internal-ip]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud container clusters get-credentials updates a kubeconfig file with
    appropriate credentials and endpoint information to point kubectl at a
    specific cluster in Google Kubernetes Engine.

    It takes a project and a zone as parameters, passed through by set defaults
    or flags. By default, credentials are written to HOME/.kube/config. You can
    provide an alternate path by setting the KUBECONFIG environment variable.
    If KUBECONFIG contains multiple paths, the first one is used.

    This command enables switching to a specific cluster, when working with
    multiple clusters. It can also be used to access a previously created
    cluster from a new workstation.

    By default, gcloud container clusters get-credentials will configure
    kubectl to automatically refresh its credentials using the same identity as
    gcloud. If you are running kubectl as part of an application, it is
    recommended to use application default credentials
    (https://cloud.google.com/docs/authentication/production). To configure a
    kubeconfig file to use application default credentials, set the
    container/use_application_default_credentials Cloud SDK property
    (https://cloud.google.com/sdk/docs/properties) to true before running
    gcloud container clusters get-credentials

    See
    https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl
    for kubectl usage with Google Kubernetes Engine and
    https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands for
    available kubectl commands.

EXAMPLES
    To switch to working on your cluster 'sample-cluster', run:

        $ gcloud container clusters get-credentials sample-cluster \
            --location=us-central1-f

POSITIONAL ARGUMENTS
     NAME
        Name of the cluster to get credentials for. Overrides the default
        container/cluster property value for this command invocation.

FLAGS
     --dns-endpoint
        Whether to use the DNS-based endpoint for the cluster address.

     --internal-ip
        Whether to use the internal IP address of the cluster endpoint.

     At most one of these can be specified:

       --location=LOCATION
          Compute zone or region (e.g. us-central1-a or us-central1) for the
          cluster. Overrides the default compute/region or compute/zone value
          for this command invocation. Prefer using this flag over the --region
          or --zone flags.

       --region=REGION
          Compute region (e.g. us-central1) for a regional cluster. Overrides
          the default compute/region property value for this command
          invocation.

       --zone=ZONE, -z ZONE
          Compute zone (e.g. us-central1-a) for a zonal cluster. Overrides the
          default compute/zone property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container clusters get-credentials

        $ gcloud beta container clusters get-credentials
```

### gcloud beta container clusters get-credentials

```text
NAME
    gcloud beta container clusters get-credentials - fetch credentials for a
        running cluster

SYNOPSIS
    gcloud beta container clusters get-credentials NAME [--dns-endpoint]
        [--internal-ip]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container clusters get-credentials

```text
NAME
    gcloud alpha container clusters get-credentials - fetch credentials for a
        running cluster

SYNOPSIS
    gcloud alpha container clusters get-credentials NAME [--dns-endpoint]
        [--internal-ip]
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/get-credentials (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
