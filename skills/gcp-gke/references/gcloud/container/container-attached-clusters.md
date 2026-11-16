---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/attached/clusters
---

# gcloud container attached clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container attached clusters delete

```text
NAME
    gcloud container attached clusters delete - delete a registered
        AttachedCluster resource

SYNOPSIS
    gcloud container attached clusters delete (CLUSTER : --location=LOCATION)
        [--allow-missing] [--async] [--ignore-errors] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a registered AttachedCluster resource.

EXAMPLES
    To delete an AttachedCluster resource named my-cluster managed in location
    us-west1, run:

        $ gcloud container attached clusters delete my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Cluster resource - cluster to delete. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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
          + provide the argument --location on the command line;
          + set the property container_attached/location.

FLAGS
     --allow-missing
        Allow idempotent deletion of cluster. The request will still succeed in
        case the cluster does not exist.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --ignore-errors
        Force delete an Attached cluster. Deletion of the Attached cluster will
        succeed even if errors occur during deleting in-cluster resources.
        Using this parameter may result in orphaned resources in the cluster.

     --validate-only
        Validate the cluster to delete, but don't actually perform it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container attached clusters delete
```

### gcloud container attached clusters describe

```text
NAME
    gcloud container attached clusters describe - describe an Attached cluster

SYNOPSIS
    gcloud container attached clusters describe (CLUSTER : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Attached cluster.

EXAMPLES
    To describe a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container attached clusters describe my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Cluster resource - cluster to describe. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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
          + provide the argument --location on the command line;
          + set the property container_attached/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container attached clusters describe
```

### gcloud container attached clusters generate-install-manifest

```text
NAME
    gcloud container attached clusters generate-install-manifest - generate
        Install Manifest for an Attached cluster

SYNOPSIS
    gcloud container attached clusters generate-install-manifest
        (CLUSTER : --location=LOCATION) --platform-version=PLATFORM_VERSION
        [--output-file=OUTPUT_FILE]
        [--proxy-secret-name=PROXY_SECRET_NAME
          --proxy-secret-namespace=PROXY_SECRET_NAMESPACE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Generate Install Manifest for an Attached cluster.

EXAMPLES
    To generate install manifest for cluster named my-cluster managed in
    location us-west1, run:

        $ gcloud container attached clusters generate-install-manifest \
            my-cluster --location=us-west1 \
            --platform-version=PLATFORM_VERSION

    To store the manifest in a file named manifest.yaml, run:

        $ gcloud container attached clusters generate-install-manifest \
            my-cluster --location=us-west1 \
            --platform-version=PLATFORM_VERSION --output-file=manifest.yaml

POSITIONAL ARGUMENTS
     Cluster resource - cluster to generate install manifest. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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
          + provide the argument --location on the command line;
          + set the property container_attached/location.

REQUIRED FLAGS
     --platform-version=PLATFORM_VERSION
        Platform version to use for the cluster.

        To retrieve a list of valid versions, run:

            $ gcloud alpha container attached get-server-config \
                --location=LOCATION

        Replace LOCATION with the target Google Cloud location for the cluster.

OPTIONAL FLAGS
     --output-file=OUTPUT_FILE
        Path to the output file to store manifest.

     Proxy config

     --proxy-secret-name=PROXY_SECRET_NAME
        Name of the Kubernetes secret that contains the HTTP/HTTPS proxy
        configuration.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --proxy-secret-namespace=PROXY_SECRET_NAMESPACE
        Namespace of the Kubernetes secret that contains the HTTP/HTTPS proxy
        configuration.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container attached clusters generate-install-manifest
```

### gcloud container attached clusters get-credentials

```text
NAME
    gcloud container attached clusters get-credentials - get credentials of an
        Attached cluster

SYNOPSIS
    gcloud container attached clusters get-credentials
        (CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Use gcloud container fleet
    memberships get-credentials instead.

    Fetch credentials for a running Attached cluster.

    This command updates a kubeconfig file with appropriate credentials and
    endpoint information to point kubectl at a specific Attached cluster.

    By default, credentials are written to HOME/.kube/config. You can provide
    an alternate path by setting the KUBECONFIG environment variable. If
    KUBECONFIG contains multiple paths, the first one is used.

    This command enables switching to a specific cluster, when working with
    multiple clusters. It can also be used to access a previously created
    cluster from a new workstation.

    By default, the command will configure kubectl to automatically refresh its
    credentials using the same identity as the gcloud command-line tool. If you
    are running kubectl as part of an application, it is recommended to use
    application default credentials
    (https://cloud.google.com/docs/authentication/production). To configure a
    kubeconfig file to use application default credentials, set the
    container/use_application_default_credentials Google Cloud CLI property
    (https://cloud.google.com/sdk/docs/properties) to true before running the
    command.

    See https://cloud.google.com/kubernetes-engine/docs/kubectl for kubectl
    documentation.

EXAMPLES
    To get credentials of a cluster named my-cluster managed in location
    us-west1, run:

        $ gcloud container attached clusters get-credentials my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Cluster resource - cluster to get credentials. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

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
          + provide the argument --location on the command line;
          + set the property container_attached/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container attached clusters get-credentials
```

### gcloud container attached clusters import

```text
NAME
    gcloud container attached clusters import - import fleet membership for an
        Attached cluster

SYNOPSIS
    gcloud container attached clusters import --distribution=DISTRIBUTION
        --platform-version=PLATFORM_VERSION
        (--context=CONTEXT : --kubeconfig=KUBECONFIG)
        (--fleet-membership=FLEET_MEMBERSHIP
          : --fleet-membership-location=FLEET_MEMBERSHIP_LOCATION;
          default="global") [--async] [--location=LOCATION] [--validate-only]
        [--proxy-secret-name=PROXY_SECRET_NAME
          --proxy-secret-namespace=PROXY_SECRET_NAMESPACE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import fleet membership for an Attached cluster.

EXAMPLES
    To import the fleet membership of an attached cluster in fleet
    FLEET_MEMBERSHIP managed in location us-west1, run:

        $ gcloud container attached clusters import --location=us-west1 \
            --platform-version=PLATFORM_VERSION \
            --fleet-membership=FLEET_MEMBERSHIP \
            --distribution=DISTRIBUTION --context=CLUSTER_CONTEXT \
            --kubeconfig=KUBECONFIG_PATH

REQUIRED FLAGS
     --distribution=DISTRIBUTION
        Set the base platform type of the cluster to attach.

        Examples:

            $ gcloud container attached clusters import --distribution=aks
            $ gcloud container attached clusters import --distribution=eks
            $ gcloud container attached clusters import --distribution=generic

     --platform-version=PLATFORM_VERSION
        Platform version to use for the cluster.

        To retrieve a list of valid versions, run:

            $ gcloud alpha container attached get-server-config \
                --location=LOCATION

        Replace LOCATION with the target Google Cloud location for the cluster.

     kubectl config

     This must be specified.

       --context=CONTEXT
          Context to use in the kubeconfig.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --kubeconfig=KUBECONFIG
          Path to the kubeconfig file.

          If not provided, the default at ~/.kube/config will be used.

     Fleet membership resource - Membership of the registered cluster.
     Membership can be the membership ID or the full resource name. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --fleet-membership on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --fleet-membership=FLEET_MEMBERSHIP
          ID of the fleet_membership or fully qualified identifier for the
          fleet_membership.

          To set the fleet_membership attribute:
          + provide the argument --fleet-membership on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --fleet-membership-location=FLEET_MEMBERSHIP_LOCATION; default="global"
          Google Cloud location for the fleet_membership.

          To set the location attribute:
          + provide the argument --fleet-membership on the command line with
            a fully specified name;
          + provide the argument --fleet-membership-location on the command
            line;
          + set the property container_attached/location.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Location resource - Google Cloud location to import attached cluster..
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_attached/location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_attached/location.

     --validate-only
        Validate the cluster to import, but don't actually perform it.

     Proxy config

     --proxy-secret-name=PROXY_SECRET_NAME
        Name of the Kubernetes secret that contains the HTTP/HTTPS proxy
        configuration.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --proxy-secret-namespace=PROXY_SECRET_NAMESPACE
        Namespace of the Kubernetes secret that contains the HTTP/HTTPS proxy
        configuration.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container attached clusters import
```

### gcloud container attached clusters list

```text
NAME
    gcloud container attached clusters list - list Attached clusters

SYNOPSIS
    gcloud container attached clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Attached clusters.

EXAMPLES
    To lists all clusters managed in location us-west1, run:

        $ gcloud container attached clusters list --location=us-west1

FLAGS
     Location resource - Google Cloud location to list. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_attached/location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_attached/location.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container attached clusters list
```

### gcloud container attached clusters register

```text
NAME
    gcloud container attached clusters register - register an Attached cluster

SYNOPSIS
    gcloud container attached clusters register (CLUSTER : --location=LOCATION)
        --distribution=DISTRIBUTION --fleet-project=FLEET_PROJECT
        --platform-version=PLATFORM_VERSION
        (--context=CONTEXT : --kubeconfig=KUBECONFIG)
        (--has-private-issuer | --issuer-url=ISSUER_URL)
        [--admin-groups=[GROUP,...]] [--admin-users=[USER,...]]
        [--annotations=ANNOTATION,[ANNOTATION,...]]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-managed-prometheus]
        [--logging=COMPONENT,[COMPONENT,...]]
        [--system-component-labels=[LABEL,...]]
        [--system-component-tolerations=[TOLERATION,...]]
        [--tags=TAG,[TAG,...]] [--validate-only]
        [--disable-cloud-monitoring | --enable-cloud-monitoring]
        [--proxy-secret-name=PROXY_SECRET_NAME
          --proxy-secret-namespace=PROXY_SECRET_NAMESPACE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Register an Attached cluster.

EXAMPLES
    Register a cluster to a fleet.

    To register a cluster with a private OIDC issuer, run:

        $ gcloud container attached clusters register my-cluster \
            --location=us-west1 --platform-version=PLATFORM_VERSION \
            --fleet-project=FLEET_PROJECT_NUM --distribution=DISTRIBUTION \
            --context=CLUSTER_CONTEXT --has-private-issuer

    To register a cluster with a public OIDC issuer, run:

        $ gcloud container attached clusters register my-cluster \
            --location=us-west1 --platform-version=PLATFORM_VERSION \
            --fleet-project=FLEET_PROJECT_NUM --distribution=DISTRIBUTION \
            --context=CLUSTER_CONTEXT --issuer-url=https://ISSUER_URL

    To specify a kubeconfig file, run:

        $ gcloud container attached clusters register my-cluster \
            --location=us-west1 --platform-version=PLATFORM_VERSION \
            --fleet-project=FLEET_PROJECT_NUM --distribution=DISTRIBUTION \
            --context=CLUSTER_CONTEXT --has-private-issuer \
            --kubeconfig=KUBECONFIG_PATH

    To register and set cluster admin users, run:

        $ gcloud container attached clusters register my-cluster \
            --location=us-west1 --platform-version=PLATFORM_VERSION \
            --fleet-project=FLEET_PROJECT_NUM --distribution=DISTRIBUTION \
            --context=CLUSTER_CONTEXT --issuer-url=https://ISSUER_URL \
            --admin-users=USER1,USER2

    To specify custom tolerations and labels for system component pods, run:

        $ gcloud container attached clusters register my-cluster \
            --location=us-west1 --platform-version=PLATFORM_VERSION \
            --fleet-project=FLEET_PROJECT_NUM --distribution=DISTRIBUTION \
            --context=CLUSTER_CONTEXT \
            --system-component-tolerations=TOLERATIONS \
            --system-component-labels=LABELS

    where TOLERATIONS have the format:        key=value:Effect:NoSchedule (examples: key1=value1:Equal:NoSchedule,key2:Exists:PreferNoSchedule, :Exists:NoExecute)
    and LABELS have the format:        key=value (examples: key1=value1,key2="")

POSITIONAL ARGUMENTS
     Cluster resource - cluster to register. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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
          + provide the argument --location on the command line;
          + set the property container_attached/location.

REQUIRED FLAGS
     --distribution=DISTRIBUTION
        Set the base platform type of the cluster to attach.

        Examples:

            $ gcloud container attached clusters register --distribution=aks
            $ gcloud container attached clusters register --distribution=eks
            $ gcloud container attached clusters register --distribution=generic

     --fleet-project=FLEET_PROJECT
        ID or number of the Fleet host project where the cluster is registered.

     --platform-version=PLATFORM_VERSION
        Platform version to use for the cluster.

        To retrieve a list of valid versions, run:

            $ gcloud alpha container attached get-server-config \
                --location=LOCATION

        Replace LOCATION with the target Google Cloud location for the cluster.

     kubectl config

     This must be specified.

       --context=CONTEXT
          Context to use in the kubeconfig.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --kubeconfig=KUBECONFIG
          Path to the kubeconfig file.

          If not provided, the default at ~/.kube/config will be used.

     OIDC config

     Exactly one of these must be specified:

       --has-private-issuer
          Indicates no publicly routable OIDC discovery endpoint exists for the
          Kubernetes service account token issuer.

          If this flag is set, gcloud will read the issuer URL and JWKs from
          the cluster's api server.

       --issuer-url=ISSUER_URL
          Issuer url of the cluster to attach.

OPTIONAL FLAGS
     --admin-groups=[GROUP,...]
        Groups of users that can perform operations as a cluster administrator.

     --admin-users=[USER,...]
        Users that can perform operations as a cluster administrator.

     --annotations=ANNOTATION,[ANNOTATION,...]
        Annotations for the cluster.

     --binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
        Set Binary Authorization evaluation mode for this cluster.
        BINAUTHZ_EVALUATION_MODE must be one of: DISABLED,
        PROJECT_SINGLETON_POLICY_ENFORCE.

     --description=DESCRIPTION
        Description for the cluster.

     --enable-managed-prometheus
        Enables managed collection for Managed Service for Prometheus in the
        cluster.

        See
        https://cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed#enable-mgdcoll-gke
        for more info.

        Managed Prometheus is enabled by default for cluster versions 1.27 or
        greater, use --no-enable-managed-prometheus to disable.

     --logging=COMPONENT,[COMPONENT,...]
        Set the components that have logging enabled.

        Examples:

            $ gcloud container attached clusters register --logging=SYSTEM
            $ gcloud container attached clusters register \
                --logging=SYSTEM,WORKLOAD
            $ gcloud container attached clusters register --logging=NONE

        COMPONENT must be one of: NONE, SYSTEM, WORKLOAD.

     --system-component-labels=[LABEL,...]
        Kubernetes labels to be applied to system component pods.

     --system-component-tolerations=[TOLERATION,...]
        Kubernetes tolerations to be applied to system component pods.

     --tags=TAG,[TAG,...]
        Tag keys/values directly bound to this resource.

        The short name of a tag key or value can have a maximum length of 256
        characters. The permitted character set for the short name includes
        UTF-8 encoded Unicode characters except single quotes, double quotes,
        backslashes, and forward slashes.

     --validate-only
        Validate the cluster to create, but don't actually perform it.

     Cloud Monitoring Config

     At most one of these can be specified:

       --disable-cloud-monitoring
          Disables managed collection for Cloud Monitoring in the cluster.

          Cloud Monitoring is enabled by default for all clusters. Beginning
          with cluster version 1.31, use --disable-cloud-monitoring to disable.

       --enable-cloud-monitoring
          Enables managed collection for Cloud Monitoring in the cluster.

          Cloud Monitoring is enabled by default for all clusters. Beginning
          with cluster version 1.31, use --disable-cloud-monitoring to disable.

     Proxy config

     --proxy-secret-name=PROXY_SECRET_NAME
        Name of the Kubernetes secret that contains the HTTP/HTTPS proxy
        configuration.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --proxy-secret-namespace=PROXY_SECRET_NAMESPACE
        Namespace of the Kubernetes secret that contains the HTTP/HTTPS proxy
        configuration.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container attached clusters register
```

### gcloud container attached clusters update

```text
NAME
    gcloud container attached clusters update - update an Attached cluster

SYNOPSIS
    gcloud container attached clusters update (CLUSTER : --location=LOCATION)
        [--annotations=ANNOTATION,[ANNOTATION,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--clear-description] [--description=DESCRIPTION]
        [--logging=COMPONENT,[COMPONENT,...]]
        [--platform-version=PLATFORM_VERSION] [--validate-only]
        [--admin-groups=[GROUP,...] | --clear-admin-groups]
        [--admin-users=[USER,...] | --clear-admin-users]
        [--disable-cloud-monitoring | --enable-cloud-monitoring]
        [--disable-managed-prometheus | --enable-managed-prometheus]
        [--proxy-secret-name=PROXY_SECRET_NAME
          --proxy-secret-namespace=PROXY_SECRET_NAMESPACE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Attached cluster.

EXAMPLES
    To update a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container attached clusters update my-cluster \
            --location=us-west1 --description=testcluster

POSITIONAL ARGUMENTS
     Cluster resource - cluster to update. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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
          + provide the argument --location on the command line;
          + set the property container_attached/location.

FLAGS
     --annotations=ANNOTATION,[ANNOTATION,...]
        Annotations for the cluster.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
        Set Binary Authorization evaluation mode for this cluster.
        BINAUTHZ_EVALUATION_MODE must be one of: DISABLED,
        PROJECT_SINGLETON_POLICY_ENFORCE.

     --clear-description
        Clear the description for the cluster.

     --description=DESCRIPTION
        Description for the cluster.

     --logging=COMPONENT,[COMPONENT,...]
        Set the components that have logging enabled.

        Examples:

            $ gcloud container attached clusters update --logging=SYSTEM
            $ gcloud container attached clusters update --logging=SYSTEM,WORKLOAD
            $ gcloud container attached clusters update --logging=NONE

        COMPONENT must be one of: NONE, SYSTEM, WORKLOAD.

     --platform-version=PLATFORM_VERSION
        Platform version to use for the cluster.

        To retrieve a list of valid versions, run:

            $ gcloud alpha container attached get-server-config \
                --location=LOCATION

        Replace LOCATION with the target Google Cloud location for the cluster.

     --validate-only
        Validate the update of the cluster, but don't actually perform it.

     Admin groups

     At most one of these can be specified:

       --admin-groups=[GROUP,...]
          Groups of users that can perform operations as a cluster
          administrator.

       --clear-admin-groups
          Clear the admin groups associated with the cluster

     Admin users

     At most one of these can be specified:

       --admin-users=[USER,...]
          Users that can perform operations as a cluster administrator.

       --clear-admin-users
          Clear the admin users associated with the cluster

     Cloud Monitoring Config

     At most one of these can be specified:

       --disable-cloud-monitoring
          Disable managed collection for Cloud Monitoring.

       --enable-cloud-monitoring
          Enable managed collection for Cloud Monitoring.

     Monitoring Config

     At most one of these can be specified:

       --disable-managed-prometheus
          Disable managed collection for Managed Service for Prometheus.

       --enable-managed-prometheus
          Enable managed collection for Managed Service for Prometheus.

     Proxy config

     --proxy-secret-name=PROXY_SECRET_NAME
        Name of the Kubernetes secret that contains the HTTP/HTTPS proxy
        configuration.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --proxy-secret-namespace=PROXY_SECRET_NAMESPACE
        Namespace of the Kubernetes secret that contains the HTTP/HTTPS proxy
        configuration.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container attached clusters update
```

### gcloud alpha container attached clusters delete

```text
NAME
    gcloud alpha container attached clusters delete - delete a registered
        AttachedCluster resource

SYNOPSIS
    gcloud alpha container attached clusters delete
        (CLUSTER : --location=LOCATION) [--allow-missing] [--async]
        [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container attached clusters describe

```text
NAME
    gcloud alpha container attached clusters describe - describe an Attached
        cluster

SYNOPSIS
    gcloud alpha container attached clusters describe
        (CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container attached clusters generate-install-manifest

```text
NAME
    gcloud alpha container attached clusters generate-install-manifest -
        generate Install Manifest for an Attached cluster

SYNOPSIS
    gcloud alpha container attached clusters generate-install-manifest
        (CLUSTER : --location=LOCATION) --platform-version=PLATFORM_VERSION
        [--output-file=OUTPUT_FILE]
        [--proxy-secret-name=PROXY_SECRET_NAME
          --proxy-secret-namespace=PROXY_SECRET_NAMESPACE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container attached clusters get-credentials

```text
NAME
    gcloud alpha container attached clusters get-credentials - get credentials
        of an Attached cluster

SYNOPSIS
    gcloud alpha container attached clusters get-credentials
        (CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container attached clusters import

```text
NAME
    gcloud alpha container attached clusters import - import fleet membership
        for an Attached cluster

SYNOPSIS
    gcloud alpha container attached clusters import --distribution=DISTRIBUTION
        --platform-version=PLATFORM_VERSION
        (--context=CONTEXT : --kubeconfig=KUBECONFIG)
        (--fleet-membership=FLEET_MEMBERSHIP
          : --fleet-membership-location=FLEET_MEMBERSHIP_LOCATION;
          default="global") [--async] [--location=LOCATION] [--validate-only]
        [--proxy-secret-name=PROXY_SECRET_NAME
          --proxy-secret-namespace=PROXY_SECRET_NAMESPACE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container attached clusters list

```text
NAME
    gcloud alpha container attached clusters list - list Attached clusters

SYNOPSIS
    gcloud alpha container attached clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container attached clusters register

```text
NAME
    gcloud alpha container attached clusters register - register an Attached
        cluster

SYNOPSIS
    gcloud alpha container attached clusters register
        (CLUSTER : --location=LOCATION) --distribution=DISTRIBUTION
        --fleet-project=FLEET_PROJECT --platform-version=PLATFORM_VERSION
        (--context=CONTEXT : --kubeconfig=KUBECONFIG)
        (--has-private-issuer | --issuer-url=ISSUER_URL)
        [--admin-groups=[GROUP,...]] [--admin-users=[USER,...]]
        [--annotations=ANNOTATION,[ANNOTATION,...]]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-managed-prometheus]
        [--logging=COMPONENT,[COMPONENT,...]]
        [--system-component-labels=[LABEL,...]]
        [--system-component-tolerations=[TOLERATION,...]]
        [--tags=TAG,[TAG,...]] [--validate-only]
        [--disable-cloud-monitoring | --enable-cloud-monitoring]
        [--proxy-secret-name=PROXY_SECRET_NAME
          --proxy-secret-namespace=PROXY_SECRET_NAMESPACE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container attached clusters update

```text
NAME
    gcloud alpha container attached clusters update - update an Attached
        cluster

SYNOPSIS
    gcloud alpha container attached clusters update
        (CLUSTER : --location=LOCATION)
        [--annotations=ANNOTATION,[ANNOTATION,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--clear-description] [--description=DESCRIPTION]
        [--logging=COMPONENT,[COMPONENT,...]]
        [--platform-version=PLATFORM_VERSION] [--validate-only]
        [--admin-groups=[GROUP,...] | --clear-admin-groups]
        [--admin-users=[USER,...] | --clear-admin-users]
        [--disable-cloud-monitoring | --enable-cloud-monitoring]
        [--disable-managed-prometheus | --enable-managed-prometheus]
        [--proxy-secret-name=PROXY_SECRET_NAME
          --proxy-secret-namespace=PROXY_SECRET_NAMESPACE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud container attached clusters get-credentials`: "This command is deprecated. Use gcloud container fleet memberships get-credentials instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/attached/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
