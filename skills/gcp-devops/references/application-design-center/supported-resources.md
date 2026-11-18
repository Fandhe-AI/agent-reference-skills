---
source: https://docs.cloud.google.com/application-design-center/docs/supported-resources
---

# Supported resources

Components designed by Google are included by default in App Design Center and can be connected on the design canvas to build application templates. Your own components, based on your own Terraform modules, can be imported as well. The table lists every Google-designed component with its category, launch stage and configuration documentation.

## Signature / Usage

List the template revision URIs of the Google catalog components (see Notes for the source of this command).

```bash
gcloud design-center spaces shared-templates list \
--google-catalog \
--location=us-central1
```

## Options / Props

Configuration docs are `https://docs.cloud.google.com/application-design-center/docs/<page>` pages, or GitHub README modules where noted. "GA" means General Availability.

### Assets

| Product | Details | Launch stage | Configuration documentation |
|---|---|---|---|
| Authorization Extension | Service extensions for custom authorization logic. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-network-security-authz/tree/main/modules/authz-extension |
| Authorization Policy | Custom authorization policies for network services. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-network-security-authz/tree/main/modules/authz-policy |
| Authorization Policy Extension | Integrated authorization policy and extension. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-network-security-authz/tree/main/modules/policy-authz-extension |
| Compute Address | Reserve static internal or external IP address. | Preview | https://github.com/terraform-google-modules/terraform-google-address |
| Firebase AI Logic Prompt Template | Manage and deploy prompt templates centrally for Firebase AI Logic applications to maintain consistency. | GA | https://github.com/GoogleCloudPlatform/terraform-google-firebase/tree/main/modules/firebase_ai_logic_prompt_template |
| Firebase Multi-Platform App | Provisions a unified Firebase project along with registered application clients for Apple (iOS), Android, and web platforms. | GA | https://github.com/GoogleCloudPlatform/terraform-google-firebase/tree/main/modules/firebase_multi_platform_application |
| Routes | VPC network routes for traffic control. | Preview | https://github.com/terraform-google-modules/terraform-google-network/tree/main/modules/routes |
| Service Account | A special kind of account typically used by an application or compute workload rather than a person, identified by its unique email address. | GA | `configure-service-account` |
| Agent Registry Agent | Data resource for agent for discovery and governance of AI agents. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-agent-registry/tree/main/modules/agent-registry-agent |
| Agent Registry Binding | A binding for Agent Registry and IAM connector. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-agent-registry/tree/main/modules/agent-registry-binding |
| Agent Registry Endpoint | Data resource for endpoint for discovery and governance of AI agents. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-agent-registry/tree/main/modules/agent-registry-endpoint |
| Agent Registry MCP Server | Data resource for MCP server for discovery and governance of AI agents. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-agent-registry/tree/main/modules/agent-registry-mcp-server |
| CA Service | Managed private certificate authorities for workload identities. | GA | https://github.com/GoogleCloudPlatform/terraform-google-certificate-authority-service |
| Compute Engine (Instance Template) | An instance template describes a VM instance; create groups of identical instances from it. | GA | `configure-compute-engine-instance` |
| Firestore Security Rules | Deploy and manage security rules for access control and data validation for your database. | GA | https://github.com/GoogleCloudPlatform/terraform-google-firebase/tree/main/modules/firestore_rules |
| GKE Node Pool | A group of nodes within a cluster that have identical configuration and are updated at the same time. | GA | `configure-gke-node-pool` |
| IAM Connector | Managed identity and access connectors. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-iam-connectors-service |
| IAP Agent Registry Agent (IAM Binding) | Manages IAM policies for IAP-protected Agent Registry Agents. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-iap-policy/tree/main/modules/iap-agent-registry-agent-iam-binding |
| IAP Agent Registry Endpoint (IAM Binding) | Manages IAM policies for IAP-protected Agent Registry Endpoints. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-iap-policy/tree/main/modules/iap-agent-registry-endpoint-iam-binding |
| IAP Agent Registry MCP Server (IAM Binding) | Manages IAM policies for IAP-protected Agent Registry MCP Servers. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-iap-policy/tree/main/modules/iap-agent-registry-mcp-server-iam-binding |
| Model Armor Floor Setting | Base security policy for AI screening. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-vertex-ai/tree/main/modules/model-armor-floorsetting |
| Model Armor Template | Safety filters for AI prompts and responses. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-vertex-ai/tree/main/modules/model-armor-template |
| Secret Manager | Storage for API keys, passwords, certificates and other sensitive data. | GA | `configure-secret-manager` |
| VPC Network | Virtual network for Google Cloud resources. | Preview | https://github.com/terraform-google-modules/terraform-google-network |

### Services

| Product | Details | Launch stage | Configuration documentation |
|---|---|---|---|
| Cloud Workflows | Managed standalone workflows. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-cloud-workflows/tree/main/modules/simple_workflow |
| Firebase AI Logic | Execute large language models using Firebase Vertex AI, governed by Firebase App Check. | GA | https://github.com/GoogleCloudPlatform/terraform-google-firebase/tree/main/modules/firebase_ai_logic_core |
| Firebase App Check | Protects backend APIs from abuse such as billing fraud and phishing by attesting that traffic originates from your genuine app. | GA | https://github.com/GoogleCloudPlatform/terraform-google-firebase/tree/main/modules/firebase_app_check |
| Firebase Authentication | Backend services, SDKs and UI libraries to authenticate users. | GA | https://github.com/GoogleCloudPlatform/terraform-google-firebase/tree/main/modules/firebase_auth |
| Compute Firewall | VPC firewall rules for a project and a network. | Preview | https://github.com/terraform-google-modules/terraform-google-network/tree/main/modules/firewall-rules |
| Global Cloud Load Balancing (Backend) | Create a backend service for incoming traffic. | GA | `configure-load-balancing-global-backend` |
| Global Cloud Load Balancing (Frontend) | Configure the load balancer frontend IP address, port and protocol; configure an SSL certificate if using HTTPS. | GA | `configure-load-balancing-global-frontend` |
| Cloud KMS | Managed encryption keys. | Preview | https://github.com/terraform-google-modules/terraform-google-kms |
| Internal Load Balancer | Regional internal load balancer for TCP/UDP traffic. | Preview | https://github.com/terraform-google-modules/terraform-google-lb-internal |
| Private Service Connect Endpoint | Regional address and forwarding rule to target a producer service attachment. | GA | https://github.com/terraform-google-modules/terraform-google-network/tree/main/modules/private-service-connect-endpoints-for-published-services |
| Private Service Connect Producer | NAT subnets and a service attachment. | GA | https://github.com/terraform-google-modules/terraform-google-network/tree/main/modules/private-service-connect-producer |
| Regional Cloud Load Balancing (Backend) | Create a backend service for incoming traffic. | GA | `configure-load-balancing-regional-backend` |
| Regional Cloud Load Balancing (Frontend) | Configure the load balancer frontend IP address, port and protocol; configure an SSL certificate if using HTTPS. | GA | `configure-load-balancing-regional-frontend` |
| Agent Gateway | Central governance layer for AI agents. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-agent-gateway |
| Agent Registry Service | Registry for discovery and governance of AI agents. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-agent-registry/tree/main/modules/agent-registry-service |
| AlloyDB for PostgreSQL | Fully managed PostgreSQL-compatible database for demanding enterprise workloads. | GA | `configure-alloydb` |
| Artifact Registry | A universal package manager for all your build artifacts and dependencies. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-artifact-registry |
| BigQuery | Fully managed, petabyte-scale analytics data warehouse. | GA | `configure-bigquery` |
| Bigtable | NoSQL database for low-latency, high-throughput access to petabyte-scale data. | GA | `configure-bigtable` |
| Cloud Run functions | Standalone functions on Cloud Run. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-cloud-functions |
| Cloud Run | Fully managed serverless platform to deploy and run containerized applications and jobs; scales from zero. | GA | `configure-cloud-run` |
| Cloud Tasks | Regional service for managing distributed task execution. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-cloud-tasks |
| Managed Airflow | Managed workflow orchestration service. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-cloud-composer/tree/main/modules/google-composer-environment |
| Cloud DNS Managed Zone | Reliable, resilient, low-latency DNS serving. | Preview | https://github.com/terraform-google-modules/terraform-google-cloud-dns |
| Cloud DNS Response Policy | Response Policy for DNS. | Preview | https://github.com/terraform-google-modules/terraform-google-cloud-dns/tree/main/modules/dns_response_policy |
| Managed Service for Apache Spark Cluster | Provision Apache Hadoop clusters and connect to underlying analytic data stores (Dataproc). | Preview | https://github.com/GoogleCloudPlatform/terraform-google-dataproc |
| Document AI | Extract data from documents using generative AI. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-document-ai |
| Firestore | Serverless NoSQL document database with multi-region replication and high availability. | GA | `configure-firestore` |
| GKE Autopilot Cluster | Managed Kubernetes cluster that manages compute, networking and storage. | GA | `configure-gke-autopilot-cluster` |
| GKE Standard Cluster | A Kubernetes cluster for running containerized applications. | GA | `configure-gke-standard-cluster` |
| Memorystore for Redis | Scalable, available, secure Redis service. | GA | `configure-memorystore-for-redis` |
| Memorystore for Redis Cluster | Redis cluster for extreme performance with large datasets, horizontal scaling and replication. | GA | `configure-memorystore-for-redis-cluster` |
| Memorystore for Valkey | Managed Valkey; supports Cluster Mode Enabled and Cluster Mode Disabled instances. | GA | `configure-memorystore-for-valkey` |
| Cloud NAT | Managed, software-defined network address translation. | Preview | https://github.com/terraform-google-modules/terraform-google-cloud-nat |
| Pub/Sub | Create a topic and add subscriptions. | GA | `configure-pubsub` |
| Cloud Router | Distributed and managed offering for Border Gateway Protocol capabilities. | Preview | https://github.com/terraform-google-modules/terraform-google-cloud-router |
| Cloud Router Interface | Manages interfaces and Border Gateway Protocol peering for routers. | Preview | https://github.com/terraform-google-modules/terraform-google-cloud-router/tree/main/modules/interface |
| Spanner | Fully managed relational database service. | GA | `configure-spanner` |
| Cloud SQL (MySQL) | Fully managed MySQL database service. | GA | `configure-cloud-sql-mysql` |
| Cloud SQL (PostgreSQL) | Fully managed PostgreSQL database service. | GA | `configure-cloud-sql-postgresql` |
| Cloud Storage | Worldwide storage and retrieval of any amount of data at any time. | GA | `configure-cloud-storage` |
| Secure Web Proxy | Secure egress web traffic with granular policies. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-secure-web-proxy |
| Vertex AI | ML platform to train and deploy ML models and AI applications. | GA | `configure-vertex-ai` |

### Workloads

| Product | Details | Launch stage | Configuration documentation |
|---|---|---|---|
| Compute Instance | Create Compute Engine VMs. | Preview | https://github.com/terraform-google-modules/terraform-google-vm/tree/main/modules/compute_instance |
| Cloud Run Job | A containerized application that runs a specific non-HTTP task and exits; for scheduled batch processing and data transformations. | GA | `configure-cloud-run-job` |
| Compute Engine (Managed Instance Group) | Collections of VM instances with load balancing, autoscaling and autohealing. | GA | `configure-compute-engine-mig` |
| Cloud Scheduler | Regional service for running scheduled jobs. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-cloud-scheduler |
| Agent Platform Runtime | Platform to deploy, manage and scale AI agents. | Preview | https://github.com/GoogleCloudPlatform/terraform-google-vertex-ai/tree/main/modules/agent-engine |

## Notes

- Some long Details descriptions are shortened from the source; product names, categories, launch stages and documentation targets are complete (72 components: 24 Assets, 43 Services including Vertex AI, 5 Workloads).
- The Vertex AI row in the source has no category cell; it sits between the Services and Workloads rows and is listed under Services here.
- Source: https://docs.cloud.google.com/application-design-center/docs/supported-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/application-design-center/docs/design-application-templates (the `shared-templates list` command).

## Related

- [design-application-templates.md](./design-application-templates.md)
- [overview.md](./overview.md)
- [setup.md](./setup.md)
