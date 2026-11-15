---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta
---

# gcloud beta

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta

```text
NAME
    gcloud beta - beta versions of gcloud commands

SYNOPSIS
    gcloud beta GROUP | COMMAND [--account=ACCOUNT]
        [--billing-project=BILLING_PROJECT] [--configuration=CONFIGURATION]
        [--flags-file=YAML_FILE] [--flatten=[KEY,...]] [--format=FORMAT]
        [--help] [--project=PROJECT_ID] [--quiet, -q]
        [--verbosity=VERBOSITY; default="warning"] [--version, -v] [-h]
        [--access-token-file=ACCESS_TOKEN_FILE]
        [--impersonate-service-account=SERVICE_ACCOUNT_EMAILS] [--log-http]
        [--trace-token=TRACE_TOKEN] [--no-user-output-enabled]

DESCRIPTION
    (BETA) Beta versions of gcloud commands.

GLOBAL FLAGS
     --account=ACCOUNT
        Google Cloud user account to use for invocation. Overrides the default
        core/account property value for this command invocation.

     --billing-project=BILLING_PROJECT
        The Google Cloud project that will be charged quota for operations
        performed in gcloud. You can use this flag to specify the billing
        project when you need to operate on one project, but need quota against
        a different project. If both billing/quota_project and
        --billing-project are specified, --billing-project takes precedence.
        Run $ gcloud config set --help to see more information about
        billing/quota_project.

     --configuration=CONFIGURATION
        Named configuration to use for this command invocation. To set the
        equivalent of this flag for a terminal session, you can also use the
        CLOUDSDK_ACTIVE_CONFIG_NAME environment variable. For more information
        on how to use configurations, run: gcloud topic configurations.

     --flags-file=YAML_FILE
        A YAML or JSON file that specifies a --flag:value dictionary. Useful
        for specifying complex flag values with special characters that work
        with any command interpreter. Additionally, each --flags-file arg is
        replaced by its constituent flags. See $ gcloud topic flags-file for
        more information.

     --flatten=[KEY,...]
        Flatten output resource slices in KEY into separate records for each
        item in each slice. Multiple keys and slices may be specified. This
        also flattens keys for --format and --filter. For example,
        --flatten=abc.def flattens abc.def[].ghi references to abc.def.ghi. A
        resource record containing abc.def[] with N elements will expand to N
        records in the flattened output. This allows you to specify what
        resource-key the filter will operate on. This flag interacts with other
        flags that are applied in this order: --flatten, --sort-by, --filter,
        --limit.

     --format=FORMAT
        Sets the format for printing command output resources. The default is a
        command-specific human-friendly output format. If both core/format and
        --format are specified, --format takes precedence. --format and
        core/format both take precedence over core/default_format. The
        supported formats are limited to: config, csv, default, diff, disable,
        flattened, get, json, list, multi, none, object, table, text, value,
        yaml. For more details run $ gcloud topic formats. Run $ gcloud config
        set --help to see more information about core/format.

     --help
        Display detailed help.

     --project=PROJECT_ID
        The Google Cloud project ID to use for this invocation. If omitted,
        then the current project is assumed; the current project can be listed
        using gcloud config list --format='text(core.project)' and can be set
        using gcloud config set project PROJECTID.

        --project and its fallback core/project property play two roles in the
        invocation: they specify both the project of the resource to operate
        on, and the project for API enablement checks, quota, and billing. To
        specify a different project for quota and billing, use the
        --billing-project flag or the billing/quota_project property.

     --quiet, -q
        Disable all interactive prompts when running gcloud commands. If input
        is required, defaults will be used, or an error will be raised.

        Overrides the default core/disable_prompts property value for this
        command invocation. This is equivalent to setting the environment
        variable CLOUDSDK_CORE_DISABLE_PROMPTS to 1.

     --verbosity=VERBOSITY; default="warning"
        Sets the verbosity level for this command invocation. This overrides
        the default verbosity level and the configured core/verbosity property.
        VERBOSITY must be one of: debug, info, warning, error, critical, none.

     --version, -v
        Print version information and exit. This flag is only available at the
        global level.

     -h
        Print a summary help and exit.

OTHER FLAGS
     --access-token-file=ACCESS_TOKEN_FILE
        A file path to read the access token. This flag is used to authenticate
        gcloud with an access token. Any existing credentials for the active
        account will be ignored. The file should only contain an access token
        with no other information. Overrides the default auth/access_token_file
        property value for this command invocation.

     --impersonate-service-account=SERVICE_ACCOUNT_EMAILS
        All API requests for this gcloud invocation, instead of using the
        currently selected account, will be made as the given service account
        or target service account in an impersonation delegation chain. You can
        specify either a single service account as the impersonator, or a
        comma-separated list of service accounts to create an impersonation
        delegation chain. The impersonation is done without needing to create,
        download, or activate a key for the service account(s).

        In order to make API requests as a service account, your currently
        selected account must have an IAM role that includes the
        iam.serviceAccounts.getAccessToken permission for the service
        account(s).

        The roles/iam.serviceAccountTokenCreator role has the
        iam.serviceAccounts.getAccessToken permission. You can also create a
        custom role.

        You can specify a list of service accounts, separated with commas. This
        creates an impersonation delegation chain in which each service account
        delegates its permissions to the next service account in the chain.
        Each service account in the list must have the
        roles/iam.serviceAccountTokenCreator role on the next service account
        in the list. For example, when --impersonate-service-account=
        SERVICE_ACCOUNT_1,SERVICE_ACCOUNT_2, the active account must have the
        roles/iam.serviceAccountTokenCreator role on SERVICE_ACCOUNT_1, which
        must have the roles/iam.serviceAccountTokenCreator role on
        SERVICE_ACCOUNT_2. In this case, SERVICE_ACCOUNT_1 is the impersonated
        service account and SERVICE_ACCOUNT_2 is the delegate.

        Overrides the default auth/impersonate_service_account property value
        for this command invocation.

     --log-http
        Log all HTTP server requests and responses to stderr. Overrides the
        default core/log_http property value for this command invocation.

     --trace-token=TRACE_TOKEN
        Token used to route traces of service requests for investigation of
        issues. Overrides the default core/trace_token property value for this
        command invocation.

     --user-output-enabled
        Print user intended output to the console. Overrides the default
        core/user_output_enabled property value for this command invocation.
        Use --no-user-output-enabled to disable.

GROUPS
    GROUP is one of the following:

     access-approval
        (BETA) Manage Access Approval requests and settings.

     access-context-manager
        (BETA) Manage Access Context Manager resources.

     active-directory
        (BETA) Manage Managed Microsoft AD resources.

     agent-identity
        (BETA) Manage Agent Identity resources.

     ai
        (BETA) Manage entities in Vertex AI.

     ai-platform
        (BETA) Manage AI Platform jobs and models.

     alloydb
        (BETA) Create and manage AlloyDB databases.

     anthos
        (BETA) Anthos command Group.

     api-gateway
        (BETA) Manage Cloud API Gateway resources.

     api-registry
        (BETA) Manage Cloud API Registry Command Group.

     apigee
        (BETA) Manage Apigee resources.

     app
        (BETA) Manage your App Engine deployments.

     app-lifecycle-manager
        (BETA) Commands for App Lifecycle Manager.

     app-optimize
        (BETA) The App Optimize API lets developers and platform administrators
        monitor and analyze cost and resource utilization data and identify
        cost optimization opportunities for their applications.

     app-topology
        (BETA) Manage App Topology resources and query topology graphs.

     artifacts
        (BETA) Manage Artifact Registry resources.

     asset
        (BETA) Manage the Cloud Asset Inventory.

     assured
        (BETA) Read and manipulate Assured Workloads data controls.

     auth
        (BETA) Manage oauth2 credentials for the Google Cloud CLI.

     backup-dr
        (BETA) Manage Backup and DR resources.

     batch
        (BETA) Manage Batch resources.

     beyondcorp
        (BETA) Manage secure access to applications with integrated threat and
        data protection.

     biglake
        (BETA) Create and manage Google Cloud BigLake resources.

     bigtable
        (BETA) Manage your Cloud Bigtable storage.

     billing
        (BETA) Manage billing accounts and associate them with projects.

     bq
        (BETA) Manage Bq resources.

     builds
        (BETA) Create and manage builds for Google Cloud Build.

     certificate-manager
        (BETA) Manage SSL certificates for your Google Cloud projects.

     cloud-shell
        (BETA) Manage Google Cloud Shell.

     cluster-director
        (BETA) Manage Cluster Director resources.

     code
        (BETA) Create and manage a local development environment for Cloud Run.

     colab
        (BETA) Manage Colab Enterprise resources.

     composer
        (BETA) Create and manage Cloud Composer Environments.

     compute
        (BETA) Create and manipulate Compute Engine resources.

     config
        (BETA) View and edit Google Cloud CLI properties.

     container
        (BETA) Deploy and manage clusters of machines for running containers.

     data-catalog
        (BETA) Manage Data Catalog resources.

     data-fusion
        (BETA) Create and manage Cloud Data Fusion Instances.

     dataflow
        (BETA) Manage Google Cloud Dataflow resources.

     datalineage
        (BETA) Manage Google Cloud Data Lineage resources.

     datapipelines
        (BETA) Manage Data Pipelines resources.

     dataproc
        (BETA) Create and manage Google Cloud Dataproc clusters and jobs.

     datastore
        (BETA) Manage your Cloud Datastore resources.

     datastream
        (BETA) Manage Cloud Datastream resources.

     deploy
        (BETA) Create and manage Cloud Deploy resources.

     deployment-manager
        (BETA) Manage deployments of cloud resources.

     developer-connect
        (BETA) Manage Developer Connect resources.

     developer-knowledge
        (BETA) Manage Developer Knowledge resources and query knowledge base.

     device-run
        (BETA) Manage automation sessions and jobs on devices.

     dns
        (BETA) Manage your Cloud DNS managed-zones and record-sets.

     domains
        (BETA) Manage domains for your Google Cloud projects.

     emulators
        (BETA) Set up your local development environment using emulators.

     endpoints
        (BETA) Create, enable and manage API services.

     error-reporting
        (BETA) Manage Stackdriver Error Reporting.

     essential-contacts
        (BETA) Manage Essential Contacts.

     eventarc
        (BETA) Manage Eventarc resources.

     filestore
        (BETA) Create and manipulate Filestore resources.

     firebase
        (BETA) Work with Google Firebase.

     firebase-data-connect
        (BETA) Manage Firebase Data Connect resources.

     firestore
        (BETA) Manage your Cloud Firestore resources.

     functions
        (BETA) Manage Google Cloud Functions.

     gemini
        (BETA) Manage resources associated with Gemini Code Assist and Gemini
        Cloud Assist.

     healthcare
        (BETA) Manage Cloud Healthcare resources.

     iam
        (BETA) Manage IAM service accounts and keys.

     iap
        (BETA) Manage IAP policies.

     identity
        (BETA) Manage Cloud Identity Groups and Memberships resources.

     ids
        (BETA) Manage Cloud IDS.

     kms
        (BETA) Manage cryptographic keys in the cloud.

     logging
        (BETA) Manage Cloud Logging.

     managed-kafka
        (BETA) Administer Managed Service for Apache Kafka clusters, topics,
        and consumer groups.

     memcache
        (BETA) Manage Cloud Memorystore Memcached resources.

     memorystore
        (BETA) Manage Memorystore resources.

     metastore
        (BETA) Manage Dataproc Metastore resources.

     ml
        (BETA) Use Google Cloud machine learning capabilities.

     model-armor
        (BETA) Model Armor is a service offering LLM-agnostic security and AI
        safety measures to mitigate risks associated with the use of large
        language models (LLMs).

     monitoring
        (BETA) Manage Cloud Monitoring dashboards and notification channels.

     netapp
        (BETA) Create and manipulate Cloud NetApp Files resources.

     network-connectivity
        (BETA) Manage Network Connectivity resources.

     network-management
        (BETA) Manage Network Management resources.

     network-security
        (BETA) Manage Network Security resources.

     network-services
        (BETA) Manage Network Services resources.

     notebooks
        (BETA) (DEPRECATED) Notebooks Command Group.

     observability
        (BETA) Manage Observability resources.

     orchestration-pipelines
        (BETA) Manage Orchestration Pipelines resources.

     organizations
        (BETA) Create and manage Google Cloud Platform Organizations.

     pam
        (BETA) Manage Privileged Access Manager (PAM) entitlements and grants.

     parametermanager
        (BETA) Parameter Manager is a single source of truth for your
        parameters.

     policy-intelligence
        (BETA) A platform to help administrators better understand, use, and
        manage policies at scale.

     policy-troubleshoot
        (BETA) Troubleshoot Google Cloud Platform policies.

     projects
        (BETA) Create and manage project access policies.

     publicca
        (BETA) Manage accounts for Google Trust Services' Certificate
        Authority.

     pubsub
        (BETA) Manage Cloud Pub/Sub topics, subscriptions, and snapshots.

     quotas
        (BETA) Manage Cloud Quotas quota info, quota preferences and quota
        adjuster settings.

     recommender
        (BETA) Manage Cloud recommendations and recommendation rules.

     redis
        (BETA) Manage Cloud Memorystore Redis resources.

     resource-config
        (BETA) Commands for declarative management of Google Cloud Platform
        resources.

     resource-manager
        (BETA) Manage Cloud Resources.

     run
        (BETA) Manage your Cloud Run applications.

     runtime-config
        (BETA) Manage runtime configuration resources.

     scc
        (BETA) Manage Cloud SCC resources.

     scheduler
        (BETA) Manage Cloud Scheduler jobs and schedules.

     secrets
        (BETA) Manage secrets on Google Cloud.

     service-directory
        (BETA) Command groups for Service Directory.

     service-extensions
        (BETA) Manage Service Extensions resources.

     service-health
        (BETA) Request events that are relevant to your project or
        organization.

     services
        (BETA) List, enable and disable APIs and services.

     source
        (BETA) Cloud git repository commands.

     source-manager
        (BETA) Manage Secure Source Manager resources.

     spanner
        (BETA) Command groups for Cloud Spanner.

     sql
        (BETA) Create and manage Google Cloud SQL databases.

     support
        (BETA) Manage Support resources.

     tasks
        (BETA) Manage Cloud Tasks queues and tasks.

     terraform
        (BETA) Commands related to Terraform management of Google Cloud
        Platform resources.

     topic
        (BETA) gcloud supplementary help.

     vector-search
        (BETA) Manage Vector Search data objects.

     workbench
        (BETA) Workbench Command Group.

     workflows
        (BETA) Manage your Cloud Workflows resources.

     workload-identity
        (BETA) Manage Workload Identity.

     workspace-key-access
        (BETA) Manage Workspace Key Access (KACLS) endpoints and configs.

     workstations
        (BETA) Manage Cloud Workstations resources.

COMMANDS
    COMMAND is one of the following:

     help
        (BETA) Search gcloud help text.

     init
        (BETA) Initialize or reinitialize gcloud.

     interactive
        (BETA) Start the gcloud interactive shell.

     survey
        (BETA) Invoke a customer satisfaction survey for Google Cloud CLI.

NOTES
    This command is currently in beta and might change without notice.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
