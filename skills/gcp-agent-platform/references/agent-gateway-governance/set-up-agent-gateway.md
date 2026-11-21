---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway
---

# Set up an Agent Gateway

Create an Agent Gateway resource to manage ingress (Client-to-Agent) or egress (Agent-to-Anywhere) traffic for agents on Agent Runtime and Gemini Enterprise: enable APIs, plan deployment, register destinations, attach an authorization policy, then create the gateway with the console, gcloud or Terraform.

## Signature / Usage

### Enable the minimum required APIs

```bash
gcloud services enable \
    compute.googleapis.com \
    networksecurity.googleapis.com \
    networkservices.googleapis.com \
    iam.googleapis.com \
    iap.googleapis.com \
    agentregistry.googleapis.com \
    --project=PROJECT_ID
```

### Egress (Agent-to-Anywhere) gateway with gcloud

Save the configuration as `my-agent-gateway-egress.yaml`. `AGENT_REGISTRY_PATH` is `//agentregistry.googleapis.com/projects/PROJECT_ID/locations/LOCATION` (regional registry in the same project and region as the gateway).

```yaml
name: AGENT_GATEWAY_NAME
protocols:
  - MCP
googleManaged:
  governedAccessPath: AGENT_TO_ANYWHERE
registries:
  - AGENT_REGISTRY_PATH
```

Adapted (not in the official docs): added `--project=PROJECT_ID`, so the command operates on the same project as the `projects/PROJECT_ID/...` resource names in the YAML files on this page instead of the gcloud default project.

```bash
gcloud network-services agent-gateways import AGENT_GATEWAY_NAME \
 --source="my-agent-gateway-egress.yaml" \
 --location=LOCATION \
 --project=PROJECT_ID
```

### Attach an IAP authorization policy (egress)

Without an attached `AuthzPolicy`, an Agent-to-Anywhere gateway adopts a default-deny policy and blocks all outbound traffic. Authorization extension that points to IAP. Enforcement is the default when `iamEnforcementMode` is absent, as in this example; add `iamEnforcementMode: "DRY_RUN"` under `metadata` only in a staging environment or during a migration (in dry-run mode IAP does not enforce IAM policies and requests it would deny are not blocked; `failOpen: false` only controls what happens when the call to the extension fails or times out).

```bash
cat >iap-request-authz-extension.yaml <<EOF
name: AUTHORIZATION_EXTENSION_NAME
service: iap.googleapis.com
failOpen: false
timeout: 1s
metadata:
  iapPolicyVersion: "V2"
EOF
```

Adapted (not in the official docs): added `--project=PROJECT_ID`, so the command operates on the same project as the `projects/PROJECT_ID/...` resource names in the YAML files on this page instead of the gcloud default project.

```bash
gcloud beta service-extensions authz-extensions import AUTHORIZATION_EXTENSION_NAME \
  --source=iap-request-authz-extension.yaml \
  --location=LOCATION \
  --project=PROJECT_ID
```

```bash
cat >iap-request-authz-policy.yaml <<EOF
name: AUTHORIZATION_POLICY_NAME
target:
  resources:
    - "projects/PROJECT_ID/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME"
policyProfile: REQUEST_AUTHZ
action: CUSTOM
customProvider:
  authzExtension:
    resources:
      - "projects/PROJECT_ID/locations/LOCATION/authzExtensions/AUTHORIZATION_EXTENSION_NAME"
EOF
```

Adapted (not in the official docs): added `--project=PROJECT_ID`, so the command operates on the same project as the `projects/PROJECT_ID/...` resource names in the YAML files on this page instead of the gcloud default project.

```bash
gcloud network-security authz-policies import AUTHORIZATION_POLICY_NAME \
  --source=iap-request-authz-policy.yaml \
  --location=LOCATION \
  --project=PROJECT_ID
```

### Egress gateway with Terraform

This example creates only the gateway resource. Before the gateway can send any outbound traffic, attach an IAP authorization extension and an `AuthzPolicy` to it as in "Attach an IAP authorization policy (egress)" above: without an attached `AuthzPolicy`, an Agent-to-Anywhere gateway adopts a default-deny policy and blocks all outbound traffic.

```terraform
resource "google_network_services_agent_gateway" "egress_gateway" {
  project   = "PROJECT_ID"
  location  = "LOCATION"
  name      = "AGENT_GATEWAY_NAME"
  protocols = ["MCP"]

  google_managed {
    governed_access_path = "AGENT_TO_ANYWHERE"
  }

  registries = [
    "//agentregistry.googleapis.com/projects/PROJECT_ID/locations/LOCATION",
  ]
}
```

### Ingress (Client-to-Agent) gateway with gcloud

Save as `my-agent-gateway-ingress.yaml`. The registry is not used for ingress.

```yaml
name: AGENT_GATEWAY_NAME
protocols:
  - MCP
googleManaged:
  governedAccessPath: CLIENT_TO_AGENT
```

Adapted (not in the official docs): added `--project=PROJECT_ID`, so the command operates on the same project as the `projects/PROJECT_ID/...` resource names in the YAML files on this page instead of the gcloud default project.

```bash
gcloud network-services agent-gateways import AGENT_GATEWAY_NAME \
 --source="my-agent-gateway-ingress.yaml" \
 --location=LOCATION \
 --project=PROJECT_ID
```

## Notes

- Required APIs:
  - `compute.googleapis.com`: Core networking, subnets, routing, Private Service Connect (PSC) network attachments
  - `networksecurity.googleapis.com`: Authorization policies (`authzPolicies`) for gateway traffic
  - `networkservices.googleapis.com`: `agentGateways`, `agentConnectivityTemplates`, `authzExtensions`
  - `iam.googleapis.com`: Service accounts and IAM Unified Access Policies (UAPs) for agent identities
  - `iap.googleapis.com`: Authenticates and verifies agent, endpoint and server traffic
  - `agentregistry.googleapis.com`: Registers and manages agents, MCP servers and tool endpoints
- Optional APIs by feature:
  - `dns.googleapis.com`: VPC connectivity with Cloud DNS peering for private domain resolution
  - `certificatemanager.googleapis.com`: Custom TLS trust anchors (`TrustConfig`) for private backends with private CAs or self-signed certificates
  - `modelarmor.googleapis.com`: Model Armor guardrails
  - `logging.googleapis.com`: Gateway access logs, security audit logs, dry-run policy evaluation events
  - `monitoring.googleapis.com`: Gateway health, latency, throughput, error rates, alerts
  - `observability.googleapis.com`: Unified observability and dashboards for agent and gateway activity
  - `telemetry.googleapis.com`: Runtime telemetry and performance metrics
  - `cloudtrace.googleapis.com`: Distributed tracing
  - `aiplatform.googleapis.com`: Projects that host Agent Runtime agents or use Semantic governance policies
  - `discoveryengine.googleapis.com`: Projects that host Gemini Enterprise apps and agents
  - `agentidentity.googleapis.com`: Managing outbound credentials with Agent Identity auth manager or viewing Agent Identity auth providers in the console
- Required permissions:
  - Agent Registry: `agentregistry.agents.list`, `agentregistry.endpoints.list`, `agentregistry.mcpServers.list`
  - Network attachments and regions: `compute.networkAttachments.create`, `compute.networkAttachments.delete`, `compute.networkAttachments.get`, `compute.networkAttachments.list`, `compute.networkAttachments.update`, `compute.regionOperations.get`, `compute.regions.list`
  - Model Armor: `modelarmor.templates.list`
  - Authorization policies: `networksecurity.authzPolicies.create`, `networksecurity.authzPolicies.delete`, `networksecurity.authzPolicies.get`, `networksecurity.authzPolicies.list`, `networksecurity.operations.get`
  - Connectivity templates: `networkservices.agentConnectivityTemplates.create`, `networkservices.agentConnectivityTemplates.delete`, `networkservices.agentConnectivityTemplates.get`, `networkservices.agentConnectivityTemplates.list`, `networkservices.agentConnectivityTemplates.update`
  - Agent gateways: `networkservices.agentGateways.create`, `networkservices.agentGateways.delete`, `networkservices.agentGateways.get`, `networkservices.agentGateways.list`, `networkservices.agentGateways.update`, `networkservices.agentGateways.use`
  - Authorization extensions: `networkservices.authzExtensions.create`, `networkservices.authzExtensions.delete`, `networkservices.authzExtensions.get`, `networkservices.authzExtensions.list`, `networkservices.authzExtensions.update`, `networkservices.authzExtensions.use`, `networkservices.operations.get`
  - Certificate Manager trust configs: `certificatemanager.trustconfigs.create`, `certificatemanager.trustconfigs.get`, `certificatemanager.trustconfigs.list`, `certificatemanager.trustconfigs.use`
- Runtime support and constraints:
  - Agent Runtime (Agent-to-Anywhere (egress) and Client-to-Agent (ingress)): Egress: agents can be in the same or a different project than the gateway. Ingress: agents must be in the same project. In either mode agents must be in the same region as the gateway.
  - Gemini Enterprise (Agent-to-Anywhere (egress) only): Each gateway governs only interactions within the project and region it is deployed in. Registry region: `us-central1` for `global` and `us` apps, `europe-west1` for `eu` apps.
- Egress options:
  - Internet egress: Routes agent traffic to publicly accessible endpoints and APIs over the internet (instructions on this page).
  - VPC network egress: Routes agent traffic privately into a VPC network using Private Service Connect network attachments: `ALL_TRAFFIC` or `PRIVATE_RANGES_ONLY`. Uses a separate "Set up VPC connectivity for Agent Gateway" guide.
- Workforce Identity Federation is in Preview and has limited support for Agent Platform and Agent Gateway; if console or gcloud loading, creation or import errors occur, use a standard Google Account managed through Cloud Identity or Google Workspace.
- Every Agent-to-Anywhere gateway requires an attached `AuthzPolicy`; without one it is default-deny and blocks all outbound traffic. Client-to-Agent gateways are not default-deny: attaching a `CONTENT_AUTHZ` policy (Model Armor, semantic governance) is optional and inbound requests pass through if none is attached.
- Agent access to a destination requires an IAM access policy granting `iap.resources.egressViaIAP` to the agent identity (see the IAM Unified Access Policies page). Unregistered destinations need a policy for unregistered endpoints; destinations in a different project than the gateway must be registered in the gateway project's Agent Registry and are valid only for Agent Runtime in egress mode.
- Turn off enforcement of the managed organization policy constraint `constraints/iam.managed.disableAccessPolicyBindings` ("Disable binding access policy to resource"); it is enabled by default for new organizations and prevents binding a UAP to a resource.
- Dry-run is a validation step before enforcing, not the production setting. The source recommends it for validation ("To validate your configuration without blocking traffic, we recommend that you deploy IAP in dry-run mode initially", and the same for Semantic governance policies); it describes dry-run as a mode where "the gateway permits all traffic through and only generates audit logs" and calls **Enforce policies** "recommended for production environments". Cross-project governance is supported only for Agent Runtime with egress gateways, not Gemini Enterprise. Gemini Enterprise apps in `global`, `us` or `eu` map to regional gateways (Agent Gateway region must correspond to the app's location).
- VPC Service Controls are supported only for gateways created after September 8, 2026 that use the agent connectivity template for VPC connectivity; VPC egress is required to enable VPC Service Controls perimeter enforcement.
- The Model Armor path requires granting the Agent Gateway service account permissions on the templates (especially when templates are in another project); see "Delegate authorization for Agent Gateway".
- The source Terraform example also includes the IAP `google_network_services_authz_extension` and `google_network_security_authz_policy` resources, and a separate ingress gateway Terraform example; these and the Console steps are omitted here. The source also shows a dry-run variant of the IAP extension YAML (the same fields plus `iamEnforcementMode: "DRY_RUN"`); the enforcing variant is the one shown here.
- `failOpen`: the `AuthzExtension.failOpen` field "Determines how the proxy behaves if the call to the extension fails or times out" (Network Services API `networkservices.v1` Discovery document); it does not turn dry-run decisions into blocks.
- Creating, importing and attaching policies changes live traffic enforcement; try them in a disposable project first.
- Corrected from the official docs: the four `import` commands ended with `--location=LOCATION` and no `--project`, so they ran against the gcloud default project while the YAML names `projects/PROJECT_ID/...`; `--project` is a gcloud-wide flag of each command (gcloud 593.0.0 help, GCLOUD WIDE FLAGS).
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [agent-gateway-overview.md](./agent-gateway-overview.md)
- [manage-agent-gateways.md](./manage-agent-gateways.md)
- [iam-overview-uap.md](./iam-overview-uap.md)
- [govern.md](./govern.md)
