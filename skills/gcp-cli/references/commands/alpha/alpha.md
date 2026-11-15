---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha
---

# gcloud alpha

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha

```text
NAME
    gcloud alpha - alpha versions of gcloud commands

SYNOPSIS
    gcloud alpha GROUP | COMMAND [--account=ACCOUNT]
        [--billing-project=BILLING_PROJECT] [--configuration=CONFIGURATION]
        [--flags-file=YAML_FILE] [--flatten=[KEY,...]] [--format=FORMAT]
        [--help] [--project=PROJECT_ID] [--quiet, -q]
        [--verbosity=VERBOSITY; default="warning"] [--version, -v] [-h]
        [--access-token-file=ACCESS_TOKEN_FILE]
        [--impersonate-service-account=SERVICE_ACCOUNT_EMAILS] [--log-http]
        [--trace-token=TRACE_TOKEN] [--no-user-output-enabled]

DESCRIPTION
    (ALPHA) Alpha versions of gcloud commands.

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
        (ALPHA) Manage Access Approval requests and settings.

     access-context-manager
        (ALPHA) Manage Access Context Manager resources.

     active-directory
        (ALPHA) Manage Managed Microsoft AD resources.

     agent-identity
        (ALPHA) Manage Agent Identity resources.

     agent-registry
        (ALPHA) Manage Agent Registry resources.

     ai
        (ALPHA) Manage entities in Vertex AI.

     ai-platform
        (ALPHA) Manage AI Platform jobs and models.

     alloydb
        (ALPHA) Create and manage AlloyDB databases.

     anthos
        (ALPHA) Anthos command Group.

     api-gateway
        (ALPHA) Manage Cloud API Gateway resources.

     api-registry
        (ALPHA) Manage Cloud API Registry Command Group.

     apigee
        (ALPHA) Manage Apigee resources.

     apihub
        (ALPHA) Manage Apihub resources.

     app
        (ALPHA) Manage your App Engine deployments.

     app-topology
        (ALPHA) Manage App Topology resources and query topology graphs.

     apphub
        (ALPHA) Manage App Hub resources.

     artifacts
        (ALPHA) Manage Artifact Registry resources.

     asset
        (ALPHA) Manage the Cloud Asset Inventory.

     assured
        (ALPHA) Read and manipulate Assured Workloads data controls.

     audit-manager
        (ALPHA) Enroll resources, audit workloads and generate reports.

     auth
        (ALPHA) Manage oauth2 credentials for the Google Cloud CLI.

     backup-dr
        (ALPHA) Manage Backup and DR resources.

     batch
        (ALPHA) Manage Batch resources.

     beyondcorp
        (ALPHA) Manage secure access to applications with integrated threat and
        data protection.

     biglake
        (ALPHA) Create and manage Google Cloud BigLake resources.

     bigtable
        (ALPHA) Manage your Cloud Bigtable storage.

     billing
        (ALPHA) Manage billing accounts and associate them with projects.

     blockchain-node-engine
        (ALPHA) Create and manipulate Blockchain Node Engine resources.

     blockchain-validator
        (ALPHA) (DEPRECATED) Manage blockchain validator configurations.

     bms
        (ALPHA) Manage Bare Metal Solution resources.

     bq
        (ALPHA) Interact with and manage resources in Google BigQuery.

     builds
        (ALPHA) Create and manage builds for Google Cloud Build.

     certificate-manager
        (ALPHA) Manage SSL certificates for your Google Cloud projects.

     cloud-shell
        (ALPHA) Manage Google Cloud Shell.

     cloudlocationfinder
        (ALPHA) Manage Cloudlocationfinder resources.

     cluster-director
        (ALPHA) Manage Cluster Director resources.

     code
        (ALPHA) Create and manage a local development environment for Cloud
        Run.

     composer
        (ALPHA) Create and manage Cloud Composer Environments.

     compute
        (ALPHA) Create and manipulate Compute Engine resources.

     config
        (ALPHA) View and edit Google Cloud CLI properties.

     container
        (ALPHA) Deploy and manage clusters of machines for running containers.

     data-catalog
        (ALPHA) Manage Data Catalog resources.

     database-migration
        (ALPHA) Manage Database Migration Service resources.

     dataflow
        (ALPHA) Manage Google Cloud Dataflow resources.

     datalineage
        (ALPHA) Manage Google Cloud Data Lineage resources.

     dataplex
        (ALPHA) Manage Dataplex resources.

     dataproc
        (ALPHA) Create and manage Google Cloud Dataproc clusters and jobs.

     datastore
        (ALPHA) Manage your Cloud Datastore resources.

     deploy
        (ALPHA) Create and manage Cloud Deploy resources.

     deployment-manager
        (ALPHA) Manage deployments of cloud resources.

     design-center
        (ALPHA) Manage Application Design Center resources.

     developer-connect
        (ALPHA) Manage Developer Connect resources.

     developer-knowledge
        (ALPHA) Manage Developer Knowledge resources and query knowledge base.

     device-run
        (ALPHA) Manage automation sessions and jobs on devices.

     dialogflow
        (ALPHA) Interact with and manage Dialogflow agents, entities, and
        intents.

     dlp
        (ALPHA) Manage sensitive data with Cloud Data Loss Prevention.

     dns
        (ALPHA) Manage your Cloud DNS managed-zones and record-sets.

     domains
        (ALPHA) Manage domains for your Google Cloud projects.

     edge-cache
        (ALPHA) Manage Media CDN resources.

     edge-cloud
        (ALPHA) Manage edge-cloud resources.

     emulators
        (ALPHA) Set up your local development environment using emulators.

     endpoints
        (ALPHA) Create, enable and manage API services.

     essential-contacts
        (ALPHA) Manage Essential Contacts.

     fault-testing
        (ALPHA) Manage Fault Testing resources.

     filestore
        (ALPHA) Create and manipulate Filestore resources.

     firebase
        (ALPHA) Work with Google Firebase.

     firebase-data-connect
        (ALPHA) Manage Firebase Data Connect resources.

     firestore
        (ALPHA) Manage your Cloud Firestore resources.

     functions
        (ALPHA) Manage Google Cloud Functions.

     healthcare
        (ALPHA) Manage Cloud Healthcare resources.

     iam
        (ALPHA) Manage IAM service accounts and keys.

     iap
        (ALPHA) Manage IAP policies.

     identity
        (ALPHA) Manage Cloud Identity Groups and Memberships resources.

     ids
        (ALPHA) Manage Cloud IDS.

     infra-manager
        (ALPHA) Manage Infra Manager resources.

     kms
        (ALPHA) Manage cryptographic keys in the cloud.

     logging
        (ALPHA) Manage Cloud Logging.

     looker
        (ALPHA) Manage Looker resources.

     lustre
        (ALPHA) Manage Lustre resources.

     managed-kafka
        (ALPHA) Administer Managed Service for Apache Kafka clusters, topics,
        and consumer groups.

     media
        (ALPHA) Manage Cloud Media Services.

     memcache
        (ALPHA) Manage Cloud Memorystore Memcached resources.

     memorystore
        (ALPHA) Manage Memorystore resources.

     metastore
        (ALPHA) Manage Dataproc Metastore resources.

     migration
        (ALPHA) The root group for various Cloud Migration teams.

     ml
        (ALPHA) Use Google Cloud machine learning capabilities.

     mldiagnostics
        (ALPHA) Use Google Cloud ML Diagnostics capabilities.

     model-armor
        (ALPHA) Model Armor is a service offering LLM-agnostic security and AI
        safety measures to mitigate risks associated with the use of large
        language models (LLMs).

     monitoring
        (ALPHA) Manage Cloud Monitoring alerting policies, dashboards,
        notification channels, and uptime checks.

     mps
        (ALPHA) Manage Marketplace Solutions resources.

     netapp
        (ALPHA) Create and manipulate Cloud NetApp Files resources.

     network-connectivity
        (ALPHA) Manage Network Connectivity Center resources.

     network-management
        (ALPHA) Manage Network Management resources.

     network-security
        (ALPHA) Manage Network Security resources.

     network-services
        (ALPHA) Manage Network Services resources.

     notebooks
        (ALPHA) (DEPRECATED) Notebooks Command Group.

     number-registry
        (ALPHA) Manage Cloud Number Registry resources.

     observability
        (ALPHA) Manage Observability resources.

     onboarding
        (ALPHA) Manage user onboarding sessions on Google Cloud.

     organizations
        (ALPHA) Create and manage Google Cloud Platform Organizations.

     pam
        (ALPHA) Manage Privileged Access Manager (PAM) entitlements and grants.

     policy-troubleshoot
        (ALPHA) Troubleshoot Google Cloud Platform policies.

     projects
        (ALPHA) Create and manage project access policies.

     publicca
        (ALPHA) Manage accounts for Google Trust Services' Certificate
        Authority.

     pubsub
        (ALPHA) Manage Cloud Pub/Sub topics, subscriptions, and snapshots.

     quotas
        (ALPHA) Manage Cloud Quotas quota info and quota preferences.

     recaptcha
        (ALPHA) Manage reCAPTCHA Enterprise Keys.

     recommender
        (ALPHA) Manage Cloud recommendations and recommendation rules.

     redis
        (ALPHA) Manage Cloud Memorystore Redis resources.

     resource-config
        (ALPHA) Commands for declarative management of Google Cloud Platform
        resources.

     resource-manager
        (ALPHA) Manage Cloud Resources.

     run
        (ALPHA) Manage your Cloud Run applications.

     scc
        (ALPHA) Manage Cloud SCC resources.

     scheduler
        (ALPHA) Manage Cloud Scheduler jobs and schedules.

     secrets
        (ALPHA) Manage secrets on Google Cloud.

     service-directory
        (ALPHA) Command groups for Service Directory.

     service-extensions
        (ALPHA) Manage Service Extensions resources.

     service-health
        (ALPHA) Request events that are relevant to your project or
        organization.

     services
        (ALPHA) List, enable and disable APIs and services.

     software-delivery-trust
        (ALPHA) Manage Software Delivery Trust resources.

     source
        (ALPHA) Cloud git repository commands.

     source-manager
        (ALPHA) Manage Secure Source Manager resources.

     spanner
        (ALPHA) Command groups for Cloud Spanner.

     sql
        (ALPHA) Create and manage Google Cloud SQL databases.

     storage
        (ALPHA) Create and manage Cloud Storage buckets and objects.

     tasks
        (ALPHA) Manage Cloud Tasks queues and tasks.

     terraform
        (ALPHA) Commands related to Terraform management of Google Cloud
        Platform resources.

     topic
        (ALPHA) gcloud supplementary help.

     trace
        (ALPHA) Manage Stackdriver Trace.

     transfer
        (ALPHA) Manage Transfer Service jobs, operations, and agents.

     web-security-scanner
        (ALPHA) Manage Cloud Web Security Scanner resources.

     workload-identity
        (ALPHA) Manage Workload Identity.

     workload-manager
        (ALPHA) Manage Workload Manager resources.

     workstations
        (ALPHA) Manage Cloud Workstations resources.

     zone-management
        (ALPHA) Zone Management gcloud commands.

COMMANDS
    COMMAND is one of the following:

     help
        (ALPHA) Search gcloud help text.

     init
        (ALPHA) Initialize or reinitialize gcloud.

     interactive
        (ALPHA) Start the gcloud interactive shell.

     survey
        (ALPHA) Invoke a customer satisfaction survey for Google Cloud CLI.

NOTES
    This command is currently in alpha and might change without notice. If this
    command fails with API permission errors despite specifying the correct
    project, you might be trying to access an API with an invitation-only early
    access allowlist.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
