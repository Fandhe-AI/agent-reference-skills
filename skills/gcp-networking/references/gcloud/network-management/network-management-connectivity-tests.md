---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/connectivity-tests
---

# gcloud network-management connectivity-tests

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-management connectivity-tests create

```text
NAME
    gcloud network-management connectivity-tests create - create a new
        connectivity test

SYNOPSIS
    gcloud network-management connectivity-tests create CONNECTIVITY_TEST
        (--destination-cloud-sql-instance=DESTINATION_CLOUD_SQL_INSTANCE
          --destination-forwarding-rule=DESTINATION_FORWARDING_RULE
          --destination-gke-master-cluster=DESTINATION_GKE_MASTER_CLUSTER
          --destination-gke-pod=DESTINATION_GKE_POD
          --destination-instance=DESTINATION_INSTANCE
          --destination-ip-address=DESTINATION_IP_ADDRESS
          --destination-redis-cluster=DESTINATION_REDIS_CLUSTER
          --destination-redis-instance=DESTINATION_REDIS_INSTANCE)
        (--source-app-engine-version=SOURCE_APP_ENGINE_VERSION
          --source-cloud-function=SOURCE_CLOUD_FUNCTION
          --source-cloud-run-job=SOURCE_CLOUD_RUN_JOB
          --source-cloud-run-revision=SOURCE_CLOUD_RUN_REVISION
          --source-cloud-sql-instance=SOURCE_CLOUD_SQL_INSTANCE
          --source-datastream-private-connection=SOURCE_DATASTREAM_PRIVATE_CONNECTION --source-dms-private-connection=SOURCE_DMS_PRIVATE_CONNECTION --source-gke-master-cluster=SOURCE_GKE_MASTER_CLUSTER --source-gke-pod=SOURCE_GKE_POD --source-instance=SOURCE_INSTANCE --source-ip-address=SOURCE_IP_ADDRESS)
        [--async] [--bypass-firewall-checks] [--description=DESCRIPTION]
        [--destination-fqdn=DESTINATION_FQDN]
        [--destination-network=DESTINATION_NETWORK]
        [--destination-port=DESTINATION_PORT]
        [--destination-project=DESTINATION_PROJECT] [--labels=[KEY=VALUE,...]]
        [--other-projects=[OTHER_PROJECTS,...]] [--protocol=PROTOCOL]
        [--round-trip] [--source-network=SOURCE_NETWORK]
        [--source-network-type=SOURCE_NETWORK_TYPE; default="unspecified"]
        [--source-project=SOURCE_PROJECT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new connectivity test with the given name.

EXAMPLES
    The following command creates a connectivity test with the name my-test,
    and the test between a source VM and a destination IP address in a peering
    network.

        $ gcloud network-management connectivity-tests create my-test \
            --source-instance=projects/my-project/zones/us-west-1/\
        instances/my-instance --destination-ip-address=10.142.0.2 \
            --destination-network=projects/my-project/global/networks/\
        peering-network --round-trip

POSITIONAL ARGUMENTS
     Connectivity test resource - Name of the connectivity test you want to
     create. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connectivity_test on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTIVITY_TEST
          ID of the connectivity test or fully qualified identifier for the
          connectivity test.

          To set the connectivity_test attribute:
          + provide the argument connectivity_test on the command line.

REQUIRED FLAGS
     At least one of these must be specified:

       --destination-cloud-sql-instance=DESTINATION_CLOUD_SQL_INSTANCE
          A Cloud SQL instance URI as the destination endpoint.

       --destination-forwarding-rule=DESTINATION_FORWARDING_RULE
          A forwarding rule URI as the destination endpoint.

       --destination-gke-master-cluster=DESTINATION_GKE_MASTER_CLUSTER
          A cluster URI for Google Kubernetes Engine master as the destination
          endpoint.

       --destination-gke-pod=DESTINATION_GKE_POD
          A GKE Pod URI as the destination endpoint.

       --destination-instance=DESTINATION_INSTANCE
          A Compute Engine instance URI as the destination endpoint.

       --destination-ip-address=DESTINATION_IP_ADDRESS
          The IP address of the destination which can be an external or
          internal IP.

       --destination-redis-cluster=DESTINATION_REDIS_CLUSTER
          A Redis cluster URI as the destination endpoint.

       --destination-redis-instance=DESTINATION_REDIS_INSTANCE
          A Redis instance URI as the destination endpoint.

     At least one of these must be specified:

       --source-app-engine-version=SOURCE_APP_ENGINE_VERSION
          App Engine version URI as the source endpoint.

       --source-cloud-function=SOURCE_CLOUD_FUNCTION
          A Cloud function URI as the source endpoint.

       --source-cloud-run-job=SOURCE_CLOUD_RUN_JOB
          Cloud Run job URI as the source endpoint.

       --source-cloud-run-revision=SOURCE_CLOUD_RUN_REVISION
          Cloud Run revision URI as the source endpoint.

       --source-cloud-sql-instance=SOURCE_CLOUD_SQL_INSTANCE
          A Cloud SQL instance URI as the source endpoint.

       --source-datastream-private-connection=SOURCE_DATASTREAM_PRIVATE_CONNECTION
          Datastream private connection URI as the source endpoint.

       --source-dms-private-connection=SOURCE_DMS_PRIVATE_CONNECTION
          DMS private connection URI as the source endpoint.

       --source-gke-master-cluster=SOURCE_GKE_MASTER_CLUSTER
          A cluster URI for Google Kubernetes Engine master as the source
          endpoint.

       --source-gke-pod=SOURCE_GKE_POD
          A GKE Pod URI as the source endpoint.

       --source-instance=SOURCE_INSTANCE
          A Compute Engine instance URI as the source endpoint.

       --source-ip-address=SOURCE_IP_ADDRESS
          The IP address of the source which can be an external or internal IP.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --bypass-firewall-checks
        This boolean controls whether to skip firewall checking.

     --description=DESCRIPTION
        The description of the connectivity test.

     --destination-fqdn=DESTINATION_FQDN
        A hostname as the destination endpoint. Only applicable for Google
        Kubernetes Engine.

     --destination-network=DESTINATION_NETWORK
        A VPC network URI for the destination endpoint. Used only when the
        source is an external IP address endpoint, and the destination is an
        internal IP address endpoint.

     --destination-port=DESTINATION_PORT
        The IP protocol port of the destination. Only applicable when protocol
        is TCP or UDP.

     --destination-project=DESTINATION_PROJECT
        Project ID of the destination endpoint.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

     --other-projects=[OTHER_PROJECTS,...]
        IDs of other projects involved in the connectivity test, besides the
        source and destination project.

     --protocol=PROTOCOL
        Type of protocol for the test. When not provided, "TCP" is assumed.

     --round-trip
        This boolean controls whether return traces (from the destination to
        the source) will be additionally calculated if packet successfully
        reaches the destination from the source.

     --source-network=SOURCE_NETWORK
        A VPC network URI for the source endpoint. Used according to the
        source-network-type flag.

     --source-network-type=SOURCE_NETWORK_TYPE; default="unspecified"
        Type of the network where the source is located. SOURCE_NETWORK_TYPE
        must be one of:

         gcp-network
            A VPC network. Should be used for internal IP addresses in VPC
            networks. The source-network field should be set to the URI of this
            network. Only endpoints within this network will be considered.
         internet
            Internet. Should be used for internet-routable external IP
            addresses or IP addresses for global Google APIs and services.
         non-gcp-network
            A network outside of Google Cloud (for example, an on-premises
            network or another cloud provider network). Should be used for
            internal IP addresses outside of Google Cloud. The source-network
            field should be set to the URI of the VPC network containing a
            corresponding Cloud VPN tunnel, Cloud Interconnect VLAN attachment,
            or a router appliance instance. Only endpoints reachable from the
            provided VPC network via the routes to networks outside of Google
            Cloud will be considered.
         unspecified
            Unspecified. The test will analyze all possible IP address
            locations. This might take longer and produce inaccurate or
            ambiguous results, so prefer specifying an explicit network type.
            The source-project field should be set to the project where the
            Google Cloud endpoint is located, or where the endpoint outside of
            Google Cloud should be reachable from (via routes to networks
            outside of Google Cloud). The project might also be inferred from
            the Connectivity Test project or other projects referenced in the
            request.

     --source-project=SOURCE_PROJECT
        Project ID of the source endpoint.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta network-management connectivity-tests create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud network-management connectivity-tests create my-test \
    --source-instance=projects/my-project/zones/us-west1-a/instances/my-instance \
    --destination-ip-address=10.142.0.2 \
    --destination-network=projects/my-project/global/networks/peering-network \
    --round-trip
```

### gcloud network-management connectivity-tests delete

```text
NAME
    gcloud network-management connectivity-tests delete - delete a connectivity
        test

SYNOPSIS
    gcloud network-management connectivity-tests delete CONNECTIVITY_TEST
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified connectivity test.

EXAMPLES
    The following command deletes a connectivity test with the name my-test.

        $ gcloud network-management connectivity-tests delete my-test

POSITIONAL ARGUMENTS
     Connectivity test resource - Name of the connectivity test you want to
     delete. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connectivity_test on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTIVITY_TEST
          ID of the connectivity test or fully qualified identifier for the
          connectivity test.

          To set the connectivity_test attribute:
          + provide the argument connectivity_test on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta network-management connectivity-tests delete
```

### gcloud network-management connectivity-tests describe

```text
NAME
    gcloud network-management connectivity-tests describe - describe a
        connectivity test

SYNOPSIS
    gcloud network-management connectivity-tests describe CONNECTIVITY_TEST
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a connectivity test.

EXAMPLES
    The following command prints of a connectivity test with the name my-test.

        $ gcloud network-management connectivity-tests describe my-test

POSITIONAL ARGUMENTS
     Connectivity test resource - Name of the connectivity test you want to
     describe. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connectivity_test on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTIVITY_TEST
          ID of the connectivity test or fully qualified identifier for the
          connectivity test.

          To set the connectivity_test attribute:
          + provide the argument connectivity_test on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta network-management connectivity-tests describe
```

### gcloud network-management connectivity-tests list

```text
NAME
    gcloud network-management connectivity-tests list - list connectivity tests

SYNOPSIS
    gcloud network-management connectivity-tests list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all connectivity tests in the specified project.

    You can specify the maximum number of connectivity tests to list using the
    --limit flag.

EXAMPLES
    The following command lists a maximum of five connectivity tests:

        $ gcloud network-management connectivity-tests list --limit=5

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta network-management connectivity-tests list
```

### gcloud network-management connectivity-tests rerun

```text
NAME
    gcloud network-management connectivity-tests rerun - rerun a connectivity
        test

SYNOPSIS
    gcloud network-management connectivity-tests rerun CONNECTIVITY_TEST
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Rerun the specified connectivity test.

EXAMPLES
    The following command reruns a connectivity test with the name my-test.

        $ gcloud network-management connectivity-tests rerun my-test

POSITIONAL ARGUMENTS
     Connectivity test resource - Name of the connectivity test you want to
     rerun. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connectivity_test on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTIVITY_TEST
          ID of the connectivity test or fully qualified identifier for the
          connectivity test.

          To set the connectivity_test attribute:
          + provide the argument connectivity_test on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta network-management connectivity-tests rerun
```

### gcloud network-management connectivity-tests update

```text
NAME
    gcloud network-management connectivity-tests update - update an existing
        connectivity test

SYNOPSIS
    gcloud network-management connectivity-tests update CONNECTIVITY_TEST
        [--async] [--bypass-firewall-checks] [--description=DESCRIPTION]
        [--destination-fqdn=DESTINATION_FQDN]
        [--destination-network=DESTINATION_NETWORK]
        [--destination-port=DESTINATION_PORT]
        [--destination-project=DESTINATION_PROJECT] [--labels=[KEY=VALUE,...]]
        [--other-projects=[OTHER_PROJECTS,...]] [--protocol=PROTOCOL]
        [--round-trip] [--source-network=SOURCE_NETWORK]
        [--source-network-type=SOURCE_NETWORK_TYPE; default="unspecified"]
        [--source-project=SOURCE_PROJECT]
        [--clear-destination-cloud-sql-instance
          | --destination-cloud-sql-instance=DESTINATION_CLOUD_SQL_INSTANCE]
        [--clear-destination-forwarding-rule
          | --destination-forwarding-rule=DESTINATION_FORWARDING_RULE]
        [--clear-destination-gke-master-cluster
          | --destination-gke-master-cluster=DESTINATION_GKE_MASTER_CLUSTER]
        [--clear-destination-gke-pod
          | --destination-gke-pod=DESTINATION_GKE_POD]
        [--clear-destination-instance
          | --destination-instance=DESTINATION_INSTANCE]
        [--clear-destination-ip-address
          | --destination-ip-address=DESTINATION_IP_ADDRESS]
        [--clear-destination-redis-cluster
          | --destination-redis-cluster=DESTINATION_REDIS_CLUSTER]
        [--clear-destination-redis-instance
          | --destination-redis-instance=DESTINATION_REDIS_INSTANCE]
        [--clear-source-app-engine-version
          | --source-app-engine-version=SOURCE_APP_ENGINE_VERSION]
        [--clear-source-cloud-function
          | --source-cloud-function=SOURCE_CLOUD_FUNCTION]
        [--clear-source-cloud-run-job
          | --source-cloud-run-job=SOURCE_CLOUD_RUN_JOB]
        [--clear-source-cloud-run-revision
          | --source-cloud-run-revision=SOURCE_CLOUD_RUN_REVISION]
        [--clear-source-cloud-sql-instance
          | --source-cloud-sql-instance=SOURCE_CLOUD_SQL_INSTANCE]
        [--clear-source-datastream-private-connection
          | --source-datastream-private-connection=SOURCE_DATASTREAM_PRIVATE_CONNECTION]
        [--clear-source-dms-private-connection
          | --source-dms-private-connection=SOURCE_DMS_PRIVATE_CONNECTION]
        [--clear-source-gke-master-cluster
          | --source-gke-master-cluster=SOURCE_GKE_MASTER_CLUSTER]
        [--clear-source-gke-pod | --source-gke-pod=SOURCE_GKE_POD]
        [--clear-source-instance | --source-instance=SOURCE_INSTANCE]
        [--clear-source-ip-address | --source-ip-address=SOURCE_IP_ADDRESS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing connectivity test with the given name.

EXAMPLES
    The following command updates a connectivity test with the name my-test,
    modifying the description and destination IP address.

        $ gcloud network-management connectivity-tests update my-test \
            --description='update dst addr' \
            --destination-ip-address='10.142.0.3' --round-trip

POSITIONAL ARGUMENTS
     Connectivity test resource - Name of the connectivity test you want to
     update. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument connectivity_test on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTIVITY_TEST
          ID of the connectivity test or fully qualified identifier for the
          connectivity test.

          To set the connectivity_test attribute:
          + provide the argument connectivity_test on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --bypass-firewall-checks
        This boolean controls whether to skip firewall checking. Use
        --no-bypass-firewall-checks to disable.

     --description=DESCRIPTION
        The description of the connectivity test.

     --destination-fqdn=DESTINATION_FQDN
        A hostname as the destination endpoint. Only applicable for Google
        Kubernetes Engine.

     --destination-network=DESTINATION_NETWORK
        A VPC network URI for the destination endpoint. Used only when the
        source is an external IP address endpoint, and the destination is an
        internal IP address endpoint.

     --destination-port=DESTINATION_PORT
        The IP protocol port of the destination. Only applicable when protocol
        is TCP or UDP.

     --destination-project=DESTINATION_PROJECT
        Project ID of the destination endpoint.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

     --other-projects=[OTHER_PROJECTS,...]
        IDs of other projects involved in the connectivity test, besides the
        source and destination project.

     --protocol=PROTOCOL
        Type of protocol for the test. When not provided, "TCP" is assumed.

     --round-trip
        This boolean controls whether return traces (from the destination to
        the source) will be additionally calculated if packet successfully
        reaches the destination from the source. Use --no-round-trip to
        disable.

     --source-network=SOURCE_NETWORK
        A VPC network URI for the source endpoint. Used according to the
        source-network-type flag.

     --source-network-type=SOURCE_NETWORK_TYPE; default="unspecified"
        Type of the network where the source is located. SOURCE_NETWORK_TYPE
        must be one of:

         gcp-network
            A VPC network. Should be used for internal IP addresses in VPC
            networks. The source-network field should be set to the URI of this
            network. Only endpoints within this network will be considered.
         internet
            Internet. Should be used for internet-routable external IP
            addresses or IP addresses for global Google APIs and services.
         non-gcp-network
            A network outside of Google Cloud (for example, an on-premises
            network or another cloud provider network). Should be used for
            internal IP addresses outside of Google Cloud. The source-network
            field should be set to the URI of the VPC network containing a
            corresponding Cloud VPN tunnel, Cloud Interconnect VLAN attachment,
            or a router appliance instance. Only endpoints reachable from the
            provided VPC network via the routes to networks outside of Google
            Cloud will be considered.
         unspecified
            Unspecified. The test will analyze all possible IP address
            locations. This might take longer and produce inaccurate or
            ambiguous results, so prefer specifying an explicit network type.
            The source-project field should be set to the project where the
            Google Cloud endpoint is located, or where the endpoint outside of
            Google Cloud should be reachable from (via routes to networks
            outside of Google Cloud). The project might also be inferred from
            the Connectivity Test project or other projects referenced in the
            request.

     --source-project=SOURCE_PROJECT
        Project ID of the source endpoint.

     At most one of these can be specified:

       --clear-destination-cloud-sql-instance
          Clear existing destination Cloud SQL instance.

       --destination-cloud-sql-instance=DESTINATION_CLOUD_SQL_INSTANCE
          A Cloud SQL instance URI as the destination endpoint.

     At most one of these can be specified:

       --clear-destination-forwarding-rule
          Clear existing destination forwarding rule.

       --destination-forwarding-rule=DESTINATION_FORWARDING_RULE
          A forwarding rule URI as the destination endpoint.

     At most one of these can be specified:

       --clear-destination-gke-master-cluster
          Clear existing destination cluster for Google Kubernetes Engine
          master.

       --destination-gke-master-cluster=DESTINATION_GKE_MASTER_CLUSTER
          A cluster URI for Google Kubernetes Engine master as the destination
          endpoint.

     At most one of these can be specified:

       --clear-destination-gke-pod
          Clear existing destination GKE Pod.

       --destination-gke-pod=DESTINATION_GKE_POD
          A GKE Pod URI as the destination endpoint.

     At most one of these can be specified:

       --clear-destination-instance
          Clear existing destination instance.

       --destination-instance=DESTINATION_INSTANCE
          A Compute Engine instance URI as the destination endpoint.

     At most one of these can be specified:

       --clear-destination-ip-address
          Clear existing destination IP address.

       --destination-ip-address=DESTINATION_IP_ADDRESS
          The IP address of the destination which can be an external or
          internal IP.

     At most one of these can be specified:

       --clear-destination-redis-cluster
          Clear existing destination Redis Cluster.

       --destination-redis-cluster=DESTINATION_REDIS_CLUSTER
          A Redis cluster URI as the destination endpoint.

     At most one of these can be specified:

       --clear-destination-redis-instance
          Clear existing destination Redis Instance.

       --destination-redis-instance=DESTINATION_REDIS_INSTANCE
          A Redis instance URI as the destination endpoint.

     At most one of these can be specified:

       --clear-source-app-engine-version
          Clear existing source App Engine version.

       --source-app-engine-version=SOURCE_APP_ENGINE_VERSION
          App Engine version URI as the source endpoint.

     At most one of these can be specified:

       --clear-source-cloud-function
          Clear existing source Cloud function.

       --source-cloud-function=SOURCE_CLOUD_FUNCTION
          A Cloud function URI as the source endpoint.

     At most one of these can be specified:

       --clear-source-cloud-run-job
          Clear existing source Cloud Run job.

       --source-cloud-run-job=SOURCE_CLOUD_RUN_JOB
          Cloud Run job URI as the source endpoint.

     At most one of these can be specified:

       --clear-source-cloud-run-revision
          Clear existing source Cloud Run revision.

       --source-cloud-run-revision=SOURCE_CLOUD_RUN_REVISION
          Cloud Run revision URI as the source endpoint.

     At most one of these can be specified:

       --clear-source-cloud-sql-instance
          Clear existing source Cloud SQL instance.

       --source-cloud-sql-instance=SOURCE_CLOUD_SQL_INSTANCE
          A Cloud SQL instance URI as the source endpoint.

     At most one of these can be specified:

       --clear-source-datastream-private-connection
          Clear existing source Datastream private connection.

       --source-datastream-private-connection=SOURCE_DATASTREAM_PRIVATE_CONNECTION
          Datastream private connection URI as the source endpoint.

     At most one of these can be specified:

       --clear-source-dms-private-connection
          Clear existing source DMS private connection.

       --source-dms-private-connection=SOURCE_DMS_PRIVATE_CONNECTION
          DMS private connection URI as the source endpoint.

     At most one of these can be specified:

       --clear-source-gke-master-cluster
          Clear existing source cluster for Google Kubernetes Engine master.

       --source-gke-master-cluster=SOURCE_GKE_MASTER_CLUSTER
          A cluster URI for Google Kubernetes Engine master as the source
          endpoint.

     At most one of these can be specified:

       --clear-source-gke-pod
          Clear existing source GKE Pod.

       --source-gke-pod=SOURCE_GKE_POD
          A GKE Pod URI as the source endpoint.

     At most one of these can be specified:

       --clear-source-instance
          Clear existing source instance.

       --source-instance=SOURCE_INSTANCE
          A Compute Engine instance URI as the source endpoint.

     At most one of these can be specified:

       --clear-source-ip-address
          Clear existing source IP address.

       --source-ip-address=SOURCE_IP_ADDRESS
          The IP address of the source which can be an external or internal IP.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkmanagement/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta network-management connectivity-tests update
```

### gcloud beta network-management connectivity-tests create

```text
NAME
    gcloud beta network-management connectivity-tests create - create a new
        connectivity test

SYNOPSIS
    gcloud beta network-management connectivity-tests create CONNECTIVITY_TEST
        (--destination-cloud-sql-instance=DESTINATION_CLOUD_SQL_INSTANCE
          --destination-forwarding-rule=DESTINATION_FORWARDING_RULE
          --destination-gke-master-cluster=DESTINATION_GKE_MASTER_CLUSTER
          --destination-gke-pod=DESTINATION_GKE_POD
          --destination-instance=DESTINATION_INSTANCE
          --destination-ip-address=DESTINATION_IP_ADDRESS
          --destination-redis-cluster=DESTINATION_REDIS_CLUSTER
          --destination-redis-instance=DESTINATION_REDIS_INSTANCE)
        (--source-app-engine-version=SOURCE_APP_ENGINE_VERSION
          --source-cloud-function=SOURCE_CLOUD_FUNCTION
          --source-cloud-run-job=SOURCE_CLOUD_RUN_JOB
          --source-cloud-run-revision=SOURCE_CLOUD_RUN_REVISION
          --source-cloud-sql-instance=SOURCE_CLOUD_SQL_INSTANCE
          --source-datastream-private-connection=SOURCE_DATASTREAM_PRIVATE_CONNECTION --source-dms-private-connection=SOURCE_DMS_PRIVATE_CONNECTION --source-gke-master-cluster=SOURCE_GKE_MASTER_CLUSTER --source-gke-pod=SOURCE_GKE_POD --source-instance=SOURCE_INSTANCE --source-ip-address=SOURCE_IP_ADDRESS)
        [--async] [--bypass-firewall-checks] [--description=DESCRIPTION]
        [--destination-fqdn=DESTINATION_FQDN]
        [--destination-network=DESTINATION_NETWORK]
        [--destination-port=DESTINATION_PORT]
        [--destination-project=DESTINATION_PROJECT] [--labels=[KEY=VALUE,...]]
        [--other-projects=[OTHER_PROJECTS,...]] [--protocol=PROTOCOL]
        [--round-trip] [--source-network=SOURCE_NETWORK]
        [--source-network-type=SOURCE_NETWORK_TYPE; default="unspecified"]
        [--source-project=SOURCE_PROJECT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management connectivity-tests delete

```text
NAME
    gcloud beta network-management connectivity-tests delete - delete a
        connectivity test

SYNOPSIS
    gcloud beta network-management connectivity-tests delete CONNECTIVITY_TEST
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management connectivity-tests describe

```text
NAME
    gcloud beta network-management connectivity-tests describe - describe a
        connectivity test

SYNOPSIS
    gcloud beta network-management connectivity-tests describe
        CONNECTIVITY_TEST [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management connectivity-tests list

```text
NAME
    gcloud beta network-management connectivity-tests list - list connectivity
        tests

SYNOPSIS
    gcloud beta network-management connectivity-tests list
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management connectivity-tests rerun

```text
NAME
    gcloud beta network-management connectivity-tests rerun - rerun a
        connectivity test

SYNOPSIS
    gcloud beta network-management connectivity-tests rerun CONNECTIVITY_TEST
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-management connectivity-tests update

```text
NAME
    gcloud beta network-management connectivity-tests update - update an
        existing connectivity test

SYNOPSIS
    gcloud beta network-management connectivity-tests update CONNECTIVITY_TEST
        [--async] [--bypass-firewall-checks] [--description=DESCRIPTION]
        [--destination-fqdn=DESTINATION_FQDN]
        [--destination-network=DESTINATION_NETWORK]
        [--destination-port=DESTINATION_PORT]
        [--destination-project=DESTINATION_PROJECT] [--labels=[KEY=VALUE,...]]
        [--other-projects=[OTHER_PROJECTS,...]] [--protocol=PROTOCOL]
        [--round-trip] [--source-network=SOURCE_NETWORK]
        [--source-network-type=SOURCE_NETWORK_TYPE; default="unspecified"]
        [--source-project=SOURCE_PROJECT]
        [--clear-destination-cloud-sql-instance
          | --destination-cloud-sql-instance=DESTINATION_CLOUD_SQL_INSTANCE]
        [--clear-destination-forwarding-rule
          | --destination-forwarding-rule=DESTINATION_FORWARDING_RULE]
        [--clear-destination-gke-master-cluster
          | --destination-gke-master-cluster=DESTINATION_GKE_MASTER_CLUSTER]
        [--clear-destination-gke-pod
          | --destination-gke-pod=DESTINATION_GKE_POD]
        [--clear-destination-instance
          | --destination-instance=DESTINATION_INSTANCE]
        [--clear-destination-ip-address
          | --destination-ip-address=DESTINATION_IP_ADDRESS]
        [--clear-destination-redis-cluster
          | --destination-redis-cluster=DESTINATION_REDIS_CLUSTER]
        [--clear-destination-redis-instance
          | --destination-redis-instance=DESTINATION_REDIS_INSTANCE]
        [--clear-source-app-engine-version
          | --source-app-engine-version=SOURCE_APP_ENGINE_VERSION]
        [--clear-source-cloud-function
          | --source-cloud-function=SOURCE_CLOUD_FUNCTION]
        [--clear-source-cloud-run-job
          | --source-cloud-run-job=SOURCE_CLOUD_RUN_JOB]
        [--clear-source-cloud-run-revision
          | --source-cloud-run-revision=SOURCE_CLOUD_RUN_REVISION]
        [--clear-source-cloud-sql-instance
          | --source-cloud-sql-instance=SOURCE_CLOUD_SQL_INSTANCE]
        [--clear-source-datastream-private-connection
          | --source-datastream-private-connection=SOURCE_DATASTREAM_PRIVATE_CONNECTION]
        [--clear-source-dms-private-connection
          | --source-dms-private-connection=SOURCE_DMS_PRIVATE_CONNECTION]
        [--clear-source-gke-master-cluster
          | --source-gke-master-cluster=SOURCE_GKE_MASTER_CLUSTER]
        [--clear-source-gke-pod | --source-gke-pod=SOURCE_GKE_POD]
        [--clear-source-instance | --source-instance=SOURCE_INSTANCE]
        [--clear-source-ip-address | --source-ip-address=SOURCE_IP_ADDRESS]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` example writes the source instance as `projects/my-project/zones/us-west-1/instances/my-instance`; `us-west-1` is not a Compute Engine zone name (zones are named like `us-west1-a`), so the runnable form uses `us-west1-a` (use the zone of your instance).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-management/connectivity-tests (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
