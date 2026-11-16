---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/aws/clusters
---

# gcloud container aws clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container aws clusters create

```text
NAME
    gcloud container aws clusters create - create an Anthos cluster on AWS

SYNOPSIS
    gcloud container aws clusters create (CLUSTER : --location=LOCATION)
        --aws-region=AWS_REGION --cluster-version=CLUSTER_VERSION
        --config-encryption-kms-key-arn=CONFIG_ENCRYPTION_KMS_KEY_ARN
        --database-encryption-kms-key-arn=DATABASE_ENCRYPTION_KMS_KEY_ARN
        --fleet-project=FLEET_PROJECT
        --iam-instance-profile=IAM_INSTANCE_PROFILE
        --pod-address-cidr-blocks=POD_ADDRESS_CIDR_BLOCKS --role-arn=ROLE_ARN
        --service-address-cidr-blocks=SERVICE_ADDRESS_CIDR_BLOCKS
        --subnet-ids=[SUBNET_ID,...] --vpc-id=VPC_ID
        [--admin-groups=[GROUP,...]] [--admin-users=USER,[USER,...]]
        [--annotations=ANNOTATION,[ANNOTATION,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--disable-per-node-pool-sg-rules]
        [--enable-managed-prometheus] [--instance-type=INSTANCE_TYPE]
        [--logging=COMPONENT,[COMPONENT,...]]
        [--main-volume-iops=MAIN_VOLUME_IOPS]
        [--main-volume-kms-key-arn=MAIN_VOLUME_KMS_KEY_ARN]
        [--main-volume-size=MAIN_VOLUME_SIZE]
        [--main-volume-throughput=MAIN_VOLUME_THROUGHPUT]
        [--main-volume-type=MAIN_VOLUME_TYPE]
        [--role-session-name=ROLE_SESSION_NAME]
        [--root-volume-iops=ROOT_VOLUME_IOPS]
        [--root-volume-kms-key-arn=ROOT_VOLUME_KMS_KEY_ARN]
        [--root-volume-size=ROOT_VOLUME_SIZE]
        [--root-volume-throughput=ROOT_VOLUME_THROUGHPUT]
        [--root-volume-type=ROOT_VOLUME_TYPE]
        [--security-group-ids=[SECURITY_GROUP_ID,...]]
        [--ssh-ec2-key-pair=SSH_EC2_KEY_PAIR] [--tags=TAG,[TAG,...]]
        [--validate-only]
        [--proxy-secret-arn=PROXY_SECRET_ARN
          --proxy-secret-version-id=PROXY_SECRET_VERSION_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Create an Anthos cluster on AWS.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To create a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container aws clusters create my-cluster \
            --location=us-west1 --aws-region=AWS_REGION \
            --cluster-version=CLUSTER_VERSION \
            --database-encryption-kms-key-arn=KMS_KEY_ARN \
            --iam-instance-profile=IAM_INSTANCE_PROFILE \
            --pod-address-cidr-blocks=POD_ADDRESS_CIDR_BLOCKS \
            --role-arn=ROLE_ARN \
            --service-address-cidr-blocks=SERVICE_ADDRESS_CIDR_BLOCKS \
            --subnet-ids=SUBNET_ID --vpc-id=VPC_ID

POSITIONAL ARGUMENTS
     Cluster resource - cluster to create. The arguments in this group can be
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
          + set the property container_aws/location.

REQUIRED FLAGS
     --aws-region=AWS_REGION
        AWS region to deploy the cluster.

     --cluster-version=CLUSTER_VERSION
        Kubernetes version to use for the cluster.

     --config-encryption-kms-key-arn=CONFIG_ENCRYPTION_KMS_KEY_ARN
        Amazon Resource Name (ARN) of the AWS KMS key to encrypt the user data.

     --database-encryption-kms-key-arn=DATABASE_ENCRYPTION_KMS_KEY_ARN
        Amazon Resource Name (ARN) of the AWS KMS key to encrypt the cluster
        secrets.

     --fleet-project=FLEET_PROJECT
        ID or number of the Fleet host project where the cluster is registered.

     --iam-instance-profile=IAM_INSTANCE_PROFILE
        Name or ARN of the IAM instance profile associated with the cluster.

     --pod-address-cidr-blocks=POD_ADDRESS_CIDR_BLOCKS
        IP address range for the pods in this cluster in CIDR notation (e.g.
        10.0.0.0/8).

     --role-arn=ROLE_ARN
        Amazon Resource Name (ARN) of the IAM role to assume when managing AWS
        resources.

     --service-address-cidr-blocks=SERVICE_ADDRESS_CIDR_BLOCKS
        IP address range for the services IPs in CIDR notation (e.g.
        10.0.0.0/8).

     --subnet-ids=[SUBNET_ID,...]
        Subnet ID of an existing VNET to use for the cluster control plane.

     --vpc-id=VPC_ID
        VPC associated with the cluster.

OPTIONAL FLAGS
     --admin-groups=[GROUP,...]
        Groups of users that can perform operations as a cluster administrator.

     --admin-users=USER,[USER,...]
        Users that can perform operations as a cluster administrator. If not
        specified, the value of property core/account is used.

     --annotations=ANNOTATION,[ANNOTATION,...]
        Annotations for the cluster.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
        Set Binary Authorization evaluation mode for this cluster.
        BINAUTHZ_EVALUATION_MODE must be one of: DISABLED,
        PROJECT_SINGLETON_POLICY_ENFORCE.

     --description=DESCRIPTION
        Description for the cluster.

     --disable-per-node-pool-sg-rules
        Disable the default per node pool subnet security group rules on the
        control plane security group. When disabled, at least one security
        group that allows node pools to send traffic to the control plane on
        ports TCP/443 and TCP/8132 must be provided.

     --enable-managed-prometheus
        Enables managed collection for Managed Service for Prometheus in the
        cluster.

        See
        https://cloud.google.com/stackdriver/docs/managed-prometheus/setup-managed#enable-mgdcoll-gke
        for more info.

        Managed Prometheus is enabled by default for cluster versions 1.27 or
        greater, use --no-enable-managed-prometheus to disable.

     --instance-type=INSTANCE_TYPE
        AWS EC2 instance type for the control plane's nodes.

     --logging=COMPONENT,[COMPONENT,...]
        Set the components that have logging enabled.

        Examples:

            $ gcloud container aws clusters create --logging=SYSTEM
            $ gcloud container aws clusters create --logging=SYSTEM,WORKLOAD

        COMPONENT must be one of: SYSTEM, WORKLOAD.

     --main-volume-iops=MAIN_VOLUME_IOPS
        Number of I/O operations per second (IOPS) to provision for the main
        volume.

     --main-volume-kms-key-arn=MAIN_VOLUME_KMS_KEY_ARN
        Amazon Resource Name (ARN) of the AWS KMS key to encrypt the main
        volume.

     --main-volume-size=MAIN_VOLUME_SIZE
        Size of the main volume. The value must be a whole number followed by a
        size unit of GB for gigabyte, or TB for terabyte. If no size unit is
        specified, GB is assumed.

     --main-volume-throughput=MAIN_VOLUME_THROUGHPUT
        Throughput to provision for the main volume, in MiB/s. Only valid if
        the volume type is GP3. If volume type is GP3 and throughput is not
        provided, it defaults to 125.

     --main-volume-type=MAIN_VOLUME_TYPE
        Type of the main volume. MAIN_VOLUME_TYPE must be one of: gp2, gp3.

     --role-session-name=ROLE_SESSION_NAME
        Identifier for the assumed role session.

     --root-volume-iops=ROOT_VOLUME_IOPS
        Number of I/O operations per second (IOPS) to provision for the root
        volume.

     --root-volume-kms-key-arn=ROOT_VOLUME_KMS_KEY_ARN
        Amazon Resource Name (ARN) of the AWS KMS key to encrypt the root
        volume.

     --root-volume-size=ROOT_VOLUME_SIZE
        Size of the root volume. The value must be a whole number followed by a
        size unit of GB for gigabyte, or TB for terabyte. If no size unit is
        specified, GB is assumed.

     --root-volume-throughput=ROOT_VOLUME_THROUGHPUT
        Throughput to provision for the root volume, in MiB/s. Only valid if
        the volume type is GP3. If volume type is GP3 and throughput is not
        provided, it defaults to 125.

     --root-volume-type=ROOT_VOLUME_TYPE
        Type of the root volume. ROOT_VOLUME_TYPE must be one of: gp2, gp3.

     --security-group-ids=[SECURITY_GROUP_ID,...]
        IDs of additional security groups to add to the control plane's nodes.

     --ssh-ec2-key-pair=SSH_EC2_KEY_PAIR
        Name of the EC2 key pair authorized to login to the control plane's
        nodes.

     --tags=TAG,[TAG,...]
        Applies the given tags (comma separated) on the cluster. Example:

            $ gcloud container aws clusters create EXAMPLE_CLUSTER \
                --tags=tag1=one,tag2=two

     --validate-only
        Validate the cluster to create, but don't actually perform it.

     Proxy config

     --proxy-secret-arn=PROXY_SECRET_ARN
        ARN of the AWS Secrets Manager secret that contains a proxy
        configuration.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --proxy-secret-version-id=PROXY_SECRET_VERSION_ID
        Version ID string of the AWS Secrets Manager secret that contains a
        proxy configuration.

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

        $ gcloud alpha container aws clusters create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud container aws clusters create my-cluster \
    --location=us-west1 \
    --aws-region=AWS_REGION \
    --cluster-version=CLUSTER_VERSION \
    --database-encryption-kms-key-arn=KMS_KEY_ARN \
    --iam-instance-profile=IAM_INSTANCE_PROFILE \
    --pod-address-cidr-blocks=POD_ADDRESS_CIDR_BLOCKS \
    --role-arn=ROLE_ARN \
    --service-address-cidr-blocks=SERVICE_ADDRESS_CIDR_BLOCKS \
    --subnet-ids=SUBNET_ID \
    --vpc-id=VPC_ID \
    --config-encryption-kms-key-arn=CONFIG_ENCRYPTION_KMS_KEY_ARN \
    --fleet-project=my-fleet-project
```

### gcloud container aws clusters delete

```text
NAME
    gcloud container aws clusters delete - delete an Anthos cluster on AWS

SYNOPSIS
    gcloud container aws clusters delete (CLUSTER : --location=LOCATION)
        [--allow-missing] [--async] [--ignore-errors] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Delete an Anthos cluster on AWS.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To delete a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container aws clusters delete my-cluster --location=us-west1

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
          + set the property container_aws/location.

FLAGS
     --allow-missing
        Allow idempotent deletion of cluster. The request will still succeed in
        case the cluster does not exist.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --ignore-errors
        Force delete an AWS cluster. Deletion of the AWS cluster will succeed
        even if errors occur during deleting in-cluster resources. Using this
        parameter may result in orphaned resources in the cluster.

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

        $ gcloud alpha container aws clusters delete
```

### gcloud container aws clusters describe

```text
NAME
    gcloud container aws clusters describe - describe an Anthos cluster on AWS

SYNOPSIS
    gcloud container aws clusters describe (CLUSTER : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Describe an Anthos cluster on AWS.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To describe a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container aws clusters describe my-cluster \
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
          + set the property container_aws/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container aws clusters describe
```

### gcloud container aws clusters get-credentials

```text
NAME
    gcloud container aws clusters get-credentials - get credentials of an
        Anthos cluster on AWS

SYNOPSIS
    gcloud container aws clusters get-credentials
        (CLUSTER : --location=LOCATION) [--private-endpoint]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement
    for more details.

    Fetch credentials for a running Anthos cluster on AWS.

    This command updates a kubeconfig file with appropriate credentials and
    endpoint information to point kubectl at a specific Anthos cluster on AWS.

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

        $ gcloud container aws clusters get-credentials my-cluster \
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
          + set the property container_aws/location.

FLAGS
     --private-endpoint
        If set, use private VPC for authentication.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container aws clusters get-credentials
```

### gcloud container aws clusters list

```text
NAME
    gcloud container aws clusters list - list Anthos clusters on AWS

SYNOPSIS
    gcloud container aws clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) List Anthos clusters on AWS.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To lists all clusters managed in location us-west1, run:

        $ gcloud container aws clusters list --location=us-west1

FLAGS
     Location resource - Google Cloud location to list. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_aws/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_aws/location.

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

        $ gcloud alpha container aws clusters list
```

### gcloud container aws clusters update

```text
NAME
    gcloud container aws clusters update - update an Anthos cluster on AWS

SYNOPSIS
    gcloud container aws clusters update (CLUSTER : --location=LOCATION)
        [--admin-groups=[GROUP,...]] [--admin-users=USER,[USER,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--cluster-version=CLUSTER_VERSION]
        [--config-encryption-kms-key-arn=CONFIG_ENCRYPTION_KMS_KEY_ARN]
        [--iam-instance-profile=IAM_INSTANCE_PROFILE]
        [--instance-type=INSTANCE_TYPE] [--logging=COMPONENT,[COMPONENT,...]]
        [--role-arn=ROLE_ARN] [--role-session-name=ROLE_SESSION_NAME]
        [--root-volume-iops=ROOT_VOLUME_IOPS]
        [--root-volume-kms-key-arn=ROOT_VOLUME_KMS_KEY_ARN]
        [--root-volume-size=ROOT_VOLUME_SIZE]
        [--root-volume-throughput=ROOT_VOLUME_THROUGHPUT]
        [--root-volume-type=ROOT_VOLUME_TYPE] [--validate-only]
        [--annotations=ANNOTATION,[ANNOTATION,...] | --clear-annotations]
        [--clear-description | --description=DESCRIPTION]
        [--clear-proxy-config | --proxy-secret-arn=PROXY_SECRET_ARN
          --proxy-secret-version-id=PROXY_SECRET_VERSION_ID]
        [--clear-security-group-ids
          | --security-group-ids=[SECURITY_GROUP_ID,...]]
        [--clear-ssh-ec2-key-pair | --ssh-ec2-key-pair=SSH_EC2_KEY_PAIR]
        [--clear-tags | --tags=TAG,[TAG,...]]
        [--disable-managed-prometheus | --enable-managed-prometheus]
        [--disable-per-node-pool-sg-rules | --enable-per-node-pool-sg-rules]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) Update an Anthos cluster on AWS.

    This command is deprecated. See
    https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement
    for more details.

EXAMPLES
    To update a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container aws clusters update my-cluster \
            --location=us-west1 --cluster-version=CLUSTER_VERSION

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
          + set the property container_aws/location.

FLAGS
     --admin-groups=[GROUP,...]
        Groups of users that can perform operations as a cluster administrator.

     --admin-users=USER,[USER,...]
        Users that can perform operations as a cluster administrator.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
        Set Binary Authorization evaluation mode for this cluster.
        BINAUTHZ_EVALUATION_MODE must be one of: DISABLED,
        PROJECT_SINGLETON_POLICY_ENFORCE.

     --cluster-version=CLUSTER_VERSION
        Kubernetes version to use for the cluster.

     --config-encryption-kms-key-arn=CONFIG_ENCRYPTION_KMS_KEY_ARN
        Amazon Resource Name (ARN) of the AWS KMS key to encrypt the user data.

     --iam-instance-profile=IAM_INSTANCE_PROFILE
        Name or ARN of the IAM instance profile associated with the cluster.

     --instance-type=INSTANCE_TYPE
        AWS EC2 instance type for the control plane's nodes.

     --logging=COMPONENT,[COMPONENT,...]
        Set the components that have logging enabled.

        Examples:

            $ gcloud container aws clusters update --logging=SYSTEM
            $ gcloud container aws clusters update --logging=SYSTEM,WORKLOAD

        COMPONENT must be one of: SYSTEM, WORKLOAD.

     --role-arn=ROLE_ARN
        Amazon Resource Name (ARN) of the IAM role to assume when managing AWS
        resources.

     --role-session-name=ROLE_SESSION_NAME
        Identifier for the assumed role session.

     --root-volume-iops=ROOT_VOLUME_IOPS
        Number of I/O operations per second (IOPS) to provision for the root
        volume.

     --root-volume-kms-key-arn=ROOT_VOLUME_KMS_KEY_ARN
        Amazon Resource Name (ARN) of the AWS KMS key to encrypt the root
        volume.

     --root-volume-size=ROOT_VOLUME_SIZE
        Size of the root volume. The value must be a whole number followed by a
        size unit of GB for gigabyte, or TB for terabyte. If no size unit is
        specified, GB is assumed.

     --root-volume-throughput=ROOT_VOLUME_THROUGHPUT
        Throughput to provision for the root volume, in MiB/s. Only valid if
        the volume type is GP3. If volume type is GP3 and throughput is not
        provided, it defaults to 125.

     --root-volume-type=ROOT_VOLUME_TYPE
        Type of the root volume. ROOT_VOLUME_TYPE must be one of: gp2, gp3.

     --validate-only
        Validate the update of the cluster, but don't actually perform it.

     Annotations

     At most one of these can be specified:

       --annotations=ANNOTATION,[ANNOTATION,...]
          Annotations for the cluster.

       --clear-annotations
          Clear the annotations for the cluster.

     Description

     At most one of these can be specified:

       --clear-description
          Clear the description for the cluster.

       --description=DESCRIPTION
          Description for the cluster.

     Proxy config

     At most one of these can be specified:

       --clear-proxy-config
          Clear the proxy configuration associated with the control plane.

       Or at least one of these can be specified:

         Update existing proxy config parameters

         --proxy-secret-arn=PROXY_SECRET_ARN
            ARN of the AWS Secrets Manager secret that contains a proxy
            configuration.

         --proxy-secret-version-id=PROXY_SECRET_VERSION_ID
            Version ID string of the AWS Secrets Manager secret that contains a
            proxy configuration.

     Security groups

     At most one of these can be specified:

       --clear-security-group-ids
          Clear any additional security groups associated with the control
          plane's nodes. This does not remove the default security groups.

       --security-group-ids=[SECURITY_GROUP_ID,...]
          IDs of additional security groups to add to the control plane's
          nodes.

     SSH config

     At most one of these can be specified:

       --clear-ssh-ec2-key-pair
          Clear the EC2 key pair authorized to login to the control plane's
          nodes.

       --ssh-ec2-key-pair=SSH_EC2_KEY_PAIR
          Name of the EC2 key pair authorized to login to the control plane's
          nodes.

     Tags

     At most one of these can be specified:

       --clear-tags
          Clear any tags associated with the control plane's nodes.

       --tags=TAG,[TAG,...]
          Applies the given tags (comma separated) on the control plane.
          Example:

              $ gcloud container aws clusters update EXAMPLE_CONTROL_PLANE \
                  --tags=tag1=one,tag2=two

     Monitoring Config

     At most one of these can be specified:

       --disable-managed-prometheus
          Disable managed collection for Managed Service for Prometheus.

       --enable-managed-prometheus
          Enable managed collection for Managed Service for Prometheus.

     Default per node pool security group rules

     At most one of these can be specified:

       --disable-per-node-pool-sg-rules
          Disable the default per node pool subnet security group rules on the
          control plane security group. When disabled, at least one security
          group that allows node pools to send traffic to the control plane on
          ports TCP/443 and TCP/8132 must be provided.

       --enable-per-node-pool-sg-rules
          Enable the default per node pool subnet security group rules on the
          control plane security group.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container aws clusters update
```

### gcloud alpha container aws clusters create

```text
NAME
    gcloud alpha container aws clusters create - create an Anthos cluster on
        AWS

SYNOPSIS
    gcloud alpha container aws clusters create (CLUSTER : --location=LOCATION)
        --aws-region=AWS_REGION --cluster-version=CLUSTER_VERSION
        --config-encryption-kms-key-arn=CONFIG_ENCRYPTION_KMS_KEY_ARN
        --database-encryption-kms-key-arn=DATABASE_ENCRYPTION_KMS_KEY_ARN
        --fleet-project=FLEET_PROJECT
        --iam-instance-profile=IAM_INSTANCE_PROFILE
        --pod-address-cidr-blocks=POD_ADDRESS_CIDR_BLOCKS --role-arn=ROLE_ARN
        --service-address-cidr-blocks=SERVICE_ADDRESS_CIDR_BLOCKS
        --subnet-ids=[SUBNET_ID,...] --vpc-id=VPC_ID
        [--admin-groups=[GROUP,...]] [--admin-users=USER,[USER,...]]
        [--annotations=ANNOTATION,[ANNOTATION,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--disable-per-node-pool-sg-rules]
        [--enable-managed-prometheus] [--instance-placement=INSTANCE_PLACEMENT]
        [--instance-type=INSTANCE_TYPE] [--logging=COMPONENT,[COMPONENT,...]]
        [--main-volume-iops=MAIN_VOLUME_IOPS]
        [--main-volume-kms-key-arn=MAIN_VOLUME_KMS_KEY_ARN]
        [--main-volume-size=MAIN_VOLUME_SIZE]
        [--main-volume-throughput=MAIN_VOLUME_THROUGHPUT]
        [--main-volume-type=MAIN_VOLUME_TYPE]
        [--role-session-name=ROLE_SESSION_NAME]
        [--root-volume-iops=ROOT_VOLUME_IOPS]
        [--root-volume-kms-key-arn=ROOT_VOLUME_KMS_KEY_ARN]
        [--root-volume-size=ROOT_VOLUME_SIZE]
        [--root-volume-throughput=ROOT_VOLUME_THROUGHPUT]
        [--root-volume-type=ROOT_VOLUME_TYPE]
        [--security-group-ids=[SECURITY_GROUP_ID,...]]
        [--ssh-ec2-key-pair=SSH_EC2_KEY_PAIR] [--tags=TAG,[TAG,...]]
        [--validate-only]
        [--proxy-secret-arn=PROXY_SECRET_ARN
          --proxy-secret-version-id=PROXY_SECRET_VERSION_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container aws clusters delete

```text
NAME
    gcloud alpha container aws clusters delete - delete an Anthos cluster on
        AWS

SYNOPSIS
    gcloud alpha container aws clusters delete (CLUSTER : --location=LOCATION)
        [--allow-missing] [--async] [--ignore-errors] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container aws clusters describe

```text
NAME
    gcloud alpha container aws clusters describe - describe an Anthos cluster
        on AWS

SYNOPSIS
    gcloud alpha container aws clusters describe
        (CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container aws clusters get-credentials

```text
NAME
    gcloud alpha container aws clusters get-credentials - get credentials of an
        Anthos cluster on AWS

SYNOPSIS
    gcloud alpha container aws clusters get-credentials
        (CLUSTER : --location=LOCATION) [--private-endpoint]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container aws clusters list

```text
NAME
    gcloud alpha container aws clusters list - list Anthos clusters on AWS

SYNOPSIS
    gcloud alpha container aws clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container aws clusters update

```text
NAME
    gcloud alpha container aws clusters update - update an Anthos cluster on
        AWS

SYNOPSIS
    gcloud alpha container aws clusters update (CLUSTER : --location=LOCATION)
        [--admin-groups=[GROUP,...]] [--admin-users=USER,[USER,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--cluster-version=CLUSTER_VERSION]
        [--config-encryption-kms-key-arn=CONFIG_ENCRYPTION_KMS_KEY_ARN]
        [--iam-instance-profile=IAM_INSTANCE_PROFILE]
        [--instance-type=INSTANCE_TYPE] [--logging=COMPONENT,[COMPONENT,...]]
        [--role-arn=ROLE_ARN] [--role-session-name=ROLE_SESSION_NAME]
        [--root-volume-iops=ROOT_VOLUME_IOPS]
        [--root-volume-kms-key-arn=ROOT_VOLUME_KMS_KEY_ARN]
        [--root-volume-size=ROOT_VOLUME_SIZE]
        [--root-volume-throughput=ROOT_VOLUME_THROUGHPUT]
        [--root-volume-type=ROOT_VOLUME_TYPE] [--validate-only]
        [--annotations=ANNOTATION,[ANNOTATION,...] | --clear-annotations]
        [--clear-description | --description=DESCRIPTION]
        [--clear-proxy-config | --proxy-secret-arn=PROXY_SECRET_ARN
          --proxy-secret-version-id=PROXY_SECRET_VERSION_ID]
        [--clear-security-group-ids
          | --security-group-ids=[SECURITY_GROUP_ID,...]]
        [--clear-ssh-ec2-key-pair | --ssh-ec2-key-pair=SSH_EC2_KEY_PAIR]
        [--clear-tags | --tags=TAG,[TAG,...]]
        [--disable-managed-prometheus | --enable-managed-prometheus]
        [--disable-per-node-pool-sg-rules | --enable-per-node-pool-sg-rules]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud container aws clusters create`: "Create an Anthos cluster on AWS. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement for more details."; `gcloud container aws clusters delete`: "Delete an Anthos cluster on AWS. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement for more details."; `gcloud container aws clusters describe`: "Describe an Anthos cluster on AWS. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement for more details."; `gcloud container aws clusters get-credentials`: "This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement for more details."; `gcloud container aws clusters list`: "List Anthos clusters on AWS. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement for more details."; `gcloud container aws clusters update`: "Update an Anthos cluster on AWS. This command is deprecated. See https://cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement for more details.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example omits `--config-encryption-kms-key-arn` and `--fleet-project`, which the SYNOPSIS requires (gcloud 593.0.0: "Must be specified"); the runnable form adds `--config-encryption-kms-key-arn=CONFIG_ENCRYPTION_KMS_KEY_ARN` and `--fleet-project=my-fleet-project` (gcloud validates the project ID, so the sample uses a lower-case project ID instead of an upper-case placeholder).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/aws/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
