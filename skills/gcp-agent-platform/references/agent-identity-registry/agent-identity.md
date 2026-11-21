---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity
---

# Agent identity on Agent Runtime

Agent identity on Agent Runtime gives each deployed agent a secure, per-agent identity tied to the agent's lifecycle, enabling least-privilege access management through IAM allow and deny policies. Agent identity credentials are secured by default through a Google-managed Context-Aware Access (CAA) policy that enforces mTLS binding, so certificate-bound tokens can only be used from their intended runtime (for example a Cloud Run container), which makes stolen credentials un-replayable.

## Signature / Usage

### Create an Agent Runtime instance without deploying agent code

Requires the `v1beta1` API version. Add agent code later with `client.runtimes.update(...)`.

```python
import agentplatform
from agentplatform import types

client = agentplatform.Client(
  project=PROJECT_ID,
  location=LOCATION,
  http_options=dict(api_version="v1beta1")
)
remote_app = client.runtimes.create(
  config={
    "display_name": "identity-for-agent",
    "identity_type": types.IdentityType.AGENT_IDENTITY,
  },
)
```

### Create an Agent Runtime instance while deploying agent code

Define the agent in your framework:

```python
from google.adk.agents import Agent

agent = Agent(
    model="gemini-2.5-flash",
    name="minimal_agent",
    instruction="You are a helpful assistant.",
)
```

This example sets only `staging_bucket`, so the SDK writes the deployment artifacts under its default `agent_engine/` prefix (`_DEFAULT_GCS_DIR_NAME` in google-cloud-aiplatform and google-cloud-agentplatform 2.10.0), where a later deployment to the same bucket overwrites them: use a bucket dedicated to this deployment, or add a unique `"gcs_dir_name"` to `config` for each deployment (Create a staging bucket in setup.md, agent-runtime-develop category).

Adapted (not in the official docs): the staging bucket line was written as `f"gs://"BUCKET_NAME",` (a syntax error); it is now the string `"gs://BUCKET_NAME"`, where `BUCKET_NAME` is the name of your Cloud Storage bucket. The requirement `google-cloud-agentplatform[adk,runtimes]` is now `google-cloud-agentplatform[adk,agent_engines]`, because 2.10.0 has no `runtimes` extra and `client.runtimes` needs the `agent-engines` extra.

```python
import agentplatform
from agentplatform import types
from agentplatform.frameworks import AdkApp

# Initialize the Agent Platform client with v1beta1 API for agent identity support
client = agentplatform.Client(
  project=PROJECT_ID,
  location=LOCATION,
  http_options=dict(api_version="v1beta1")
)

# Use the proper wrapper class for your Agent Framework
app = AdkApp(agent=agent)

# Deploy the agent with Agent Identity
remote_app = client.runtimes.create(
  agent=app,
  config={
    "display_name": "running-agent-with-identity",
    "identity_type": types.IdentityType.AGENT_IDENTITY,
    "requirements": ["google-cloud-agentplatform[adk,agent_engines]"],
    "staging_bucket": "gs://BUCKET_NAME",
  },
)

print(f"Effective Identity: {remote_app.api_resource.spec.effective_identity}")
```

### Deploy with the Agents CLI

```bash
agents-cli deploy --agent-identity
```

### Principal identifier format

```text
# Agent identity Format
principal://TRUST_DOMAIN/NAMESPACE/AGENT_NAME

# Example agent identity
principal://agents.global.org-ORGANIZATION_ID.system.id.goog/resources/aiplatform/projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID
```

### Grant a role to the parent agent for A2A delegation

```bash
gcloud projects add-iam-policy-binding PROJECT_NUMBER \
    --member="principal://agents.global.org-ORGANIZATION_ID.system.id.goog/resources/aiplatform/projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/PARENT_AGENT_ENGINE_ID" \
    --role="roles/agentregistry.viewer"
```

### Grant a role to all agents in a project or an organization

If your project belongs to an organization:

```text
# Grant all agents in a project the following role
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
--member="principalSet://agents.global.org-ORGANIZATION_ID.system.id.goog/attribute.platformContainer/aiplatform/projects/PROJECT_NUMBER" \
--role="ROLE_NAME"
```

To grant a role to all Agent Runtime agents across an organization:

```text
# Grant all agents in an organization the following role
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
--member="principalSet://agents.global.org-ORGANIZATION_ID.system.id.goog/attribute.platform/aiplatform" \
--role="ROLE_NAME"
```

### Agent-to-agent (A2A) calls with a custom role and a deny policy

Create a custom role `agentInvoker` with only `aiplatform.reasoningEngines.query` and `aiplatform.reasoningEngines.get`. This command only defines the role; it grants nothing. To let Agent A call Agent B, then add a binding of `projects/PROJECT_ID/roles/agentInvoker` for Agent A's identity on Agent B's resource (`projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_B_ID`) with `reasoningEngines.getIamPolicy` and `reasoningEngines.setIamPolicy`, not at the project level (not in the official docs; Discovery `aiplatform.v1`). Call `getIamPolicy` (`POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/AGENT_B_ID:getIamPolicy?options.requestedPolicyVersion=3`) so that conditional role bindings come back with their conditions ("Requests for policies with any conditional role bindings must specify version 3"). Then send the full retrieved policy as `policy` to `setIamPolicy` (`POST .../reasoningEngines/AGENT_B_ID:setIamPolicy`) with the new binding added, every existing binding and its `condition` unchanged, `version` 3 and the `etag` from `getIamPolicy`; the `Policy.version` description says that with IAM Conditions "you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost."

```bash
gcloud iam roles create agentInvoker --project=PROJECT_ID \
  --permissions=aiplatform.reasoningEngines.query,aiplatform.reasoningEngines.get \
  --stage=GA
```

Prevent agent identities from performing management operations on other agents. The YAML below is the content of one deny rule, not a complete policy: in an IAM v2 deny policy, `deniedPrincipals` and `deniedPermissions` are fields of `rules[].denyRule` (Discovery `iam.v2`: `GoogleIamV2Policy.rules` is a list of `GoogleIamV2PolicyRule`, whose `denyRule` field is a `GoogleIamV2DenyRule` with `deniedPrincipals` and `deniedPermissions`), as the full deny policy JSON on the agent identity page also shows (`rules` → `denyRule` → `deniedPrincipals` / `deniedPermissions`). Put these two fields under `rules[].denyRule` in a policy file (JSON or YAML) and create the policy on an attachment point with `gcloud iam policies create POLICY_ID --attachment-point=ATTACHMENT_POINT --kind=denypolicies --policy-file=POLICY_FILE` (gcloud 593.0.0 help; its example attachment point is `cloudresourcemanager.googleapis.com/projects/123`). The attachment point is the full resource name of the resource the policy is attached to; for organizations and folders, use the numeric ID in the full resource name (Discovery `iam.v2`, `policies.createPolicy` `parent`).

```yaml
deniedPrincipals:
  - principalSet://agents.global.org-ORGANIZATION_ID.system.id.goog/*
deniedPermissions:
  - aiplatform.googleapis.com/reasoningEngines.create
  - aiplatform.googleapis.com/reasoningEngines.delete
  - aiplatform.googleapis.com/reasoningEngines.update
```

### Effective identity in the REST response

Adapted (not in the official docs): `projects/PROJECT_ID` in `effectiveIdentity` is written `projects/PROJECT_NUMBER`, the form of the `principal://` members on this page.

```text
{
  ...
  spec: {
    "effectiveIdentity": "agents.global.org-ORGANIZATION_ID.system.id.goog/resources/aiplatform/projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID"
  }
  ...
}
```

## Options / Props

### Placeholders in the principal identifier

| Name | Description |
|---|---|
| `TRUST_DOMAIN` | Provisioned when you enable the Agent Platform API. With an organization: `agents.global.org-ORGANIZATION_ID.system.id.goog`. Without an organization (project level): `agents.global.proj-PROJECT_NUMBER.system.id.goog`. |
| `NAMESPACE` | The agent's immutable resource path. |
| `AGENT_NAME` | The immutable `agent-reasoning-engine-id`. |

### Recommended roles for the agent identity

| Role | Purpose |
|---|---|
| `roles/serviceusage.serviceUsageConsumer` | Grant the agent permission to use the project's quota and the Agent Platform SDK. |
| `roles/browser` | Grant access to basic Google Cloud functionalities. |
| `roles/secretmanager.secretAccessor` | Grant the agent access to secrets in Secret Manager. If you reference secrets as environment variables, also grant it to the Agent Platform Service Agent (`service-PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com`) so it can retrieve the secret values during deployment. Grant it on each secret, not on the project (`gcloud secrets add-iam-policy-binding SECRET --member=PRINCIPAL --role=roles/secretmanager.secretAccessor`): to the agent's identity for secrets the agent reads at runtime, and to the service agent for secrets referenced as environment variables. |

### Roles for A2A delegation (grant to the parent agent's identity, not to your user account)

| Role | Scope | Purpose |
|---|---|---|
| `roles/agentregistry.viewer` (Agent Registry API Viewer) | Parent project or registry resource | Let the parent agent look up the subagent's endpoint at runtime. |
| `roles/aiplatform.user` (Agent Platform User) | The target subagent's reasoning engine resource | Let the parent agent send messages to the subagent. |
| `projects/PROJECT_ID/roles/agentInvoker` (custom role from the A2A steps above: `aiplatform.reasoningEngines.query` and `aiplatform.reasoningEngines.get` only) | The target agent's reasoning engine resource (Agent B) | Least-privilege alternative to `roles/aiplatform.user` for calling the subagent. |

## Notes

- Agent identity requires the `v1beta1` API version in the SDK examples above. If the identity flag isn't configured, the Agent Runtime instance continues to use service accounts (backward compatibility for Infrastructure-as-Code deployments).
- Defaults: the agent gets access to its own logging, metrics, model access, sessions, memories and sandboxes (Preview), and the roles `roles/aiplatform.agentContextEditor` and `roles/aiplatform.agentDefaultAccess` (core operation, including `aiplatform.endpoints.predict`, sessions and memory). Don't grant project-level `roles/aiplatform.expressUser` or `roles/aiplatform.user` to agent identities: that violates least privilege and lets agents modify or delete other agents in the project. `roles/aiplatform.agentContextEditor` and `roles/aiplatform.agentDefaultAccess` are copied from the source; they are not listed in the IAM roles reference used for this skill's generated `iam/` pages, and Agent Registry (`roles/agentregistry.*`) has no generated IAM page, so those IDs could not be cross-checked.
- Once IAM is set, the Agent Platform SDK's Application Default Credentials automatically use the agent identity. The identity is read-only and system attested; a SPIFFE-based x509 certificate is provisioned on the agent.
- Placeholders: `LOCATION` is a supported Runtime region; `RESOURCE_TYPE` is for example `projects` or `organizations`; `ROLE_NAME` is for example `roles/vision.user`. The two `gcloud RESOURCE_TYPE add-iam-policy-binding` templates are tagged `text` because `RESOURCE_TYPE` stands for the command group (`projects`, `organizations`, ...) and the commands do not run as written. The source also shows an orgless-project form (`principalSet://agents.global.proj-PROJECT_NUMBER.system.id.goog/attribute.platformContainer/aiplatform/projects/PROJECT_NUMBER`) and a single-agent `gcloud RESOURCE_TYPE add-iam-policy-binding` template, not reproduced here. Granting such permissions is possible at any time after the first usage of the agent identity feature within an organization or project, so it can be performed before the deployment of the agent.
- Project-wide `principalSet` grants (and especially the organization-wide `attribute.platform/aiplatform` one) give the role to every Agent Runtime agent in that scope. Grant common non-sensitive roles (service usage, logging, model inference) there and keep individual `principal://` bindings for sensitive data. The source's example project grants are `serviceusage.serviceUsageConsumer`, `browser`, `cloudapiregistry.viewer`, `logging.logWriter` and `monitoring.metricWriter`.
- The deny policy YAML denies all agent identities in the organization `reasoningEngines.create`, `.delete` and `.update`. It is the source's fragment as written: only the `denyRule` fields, without the enclosing `rules` list (see the sentence before it). Try deny policies in a disposable project first.
- CI/CD: pipelines that delete and re-create agents (blue-green, ephemeral environments, Terraform) get a new `reasoningEngines` resource ID and therefore a new principal, so earlier IAM grants are not inherited and runtime access can be lost silently. Capture `spec.effectiveIdentity` from the deployment response (or query the REST API) and apply IAM bindings post-deployment, and use project-scoped `principalSet` bindings for baseline permissions because they survive re-creation.
- Logs: with Cloud Logging enabled you can see which agents and users accessed a resource. When the agent acts for a user, logs show both identities; on its own authority only the agent's.
- Listing: the Agent Platform **Deployments** page shows an **Identity** column; with REST, the Agent Runtime get response carries `spec.effectiveIdentity`. For instances not using agent identity it holds the service agent or service account name.
- Opt-out of CAA: by default using a token outside its runtime fails with `Error Code: "401"` and `Error Details: "Context-Aware Access requirements are not met"`. For corner cases such as token sharing between agents, the source opts out by setting the environment variable `GOOGLE_API_PREVENT_AGENT_TOKEN_SHARING_FOR_GCP_SERVICES` in `config["env_vars"]` when you create the Agent Runtime instance. This is strongly discouraged and leaves the agent vulnerable to credential theft.
- The source's opt-out example (`"GOOGLE_API_PREVENT_AGENT_TOKEN_SHARING_FOR_GCP_SERVICES": False` inside `config={"env_vars": {...}}`) is left out: it passes the Python boolean `False`, and google-cloud-agentplatform 2.10.0 (`agentplatform/_genai/runtimes.py`, `_update_deployment_spec_with_env_vars_dict_or_raise`) raises `TypeError` for an `env_vars` value that is neither a `str` nor a secret reference `dict`. The string value the service expects is not stated in the official docs.
- Limitation: agent identities cannot be granted Legacy Bucket roles (`storage.legacyBucketReader`, `storage.legacyBucketWriter`, `storage.legacyBucketOwner`) on Cloud Storage buckets.
- A2A: for agent-to-agent calls do not grant project-wide permissions; bind the custom role `agentInvoker` to the target agent's resource. The source binds it with `gcloud beta ai reasoning-engines add-iam-policy-binding` and reads the identity with `gcloud ai reasoning-engines describe --format="value(spec.effectiveIdentity)"`; no `reasoning-engines` group exists in the gcloud 593.0.0 help (`ai`, `beta ai` or `alpha ai`), so both are omitted here (use the REST get response above). gcloud 593.0.0 has a beta group `gcloud beta ai agent runtimes` whose `describe` takes `RUNTIME` and `--region`; it has no `add-iam-policy-binding` command, and the official page does not use it.
- Omitted forms: the source also shows the Console list, the ADK deploy flow (`.agent_engine_config.json` containing `{ "identity_type": "AGENT_IDENTITY" }` before `adk deploy`), a Terraform `google_vertex_ai_reasoning_engine` example with `identity_type = "AGENT_IDENTITY"`, an IAM deny policy JSON and a Principal Access Boundary (PAB) policy with its binding command. The deny JSON and PAB examples were left out because they contain `//` comments, an `<org.id>` placeholder, a trailing comma and a broken line continuation; see https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies.
- Corrected from the official docs: the staging bucket value `f"gs://"BUCKET_NAME"` was changed to `"gs://BUCKET_NAME"`.
- The twin writes the "Vertex AI Agent Engine" ID as `AGENT_ENGINE_ID` (the resource ID of the Agent Runtime instance).
- SDK names checked against google-cloud-agentplatform 2.10.0 (module `agentplatform`): `agentplatform.Client(project=..., location=..., http_options=...)`, `client.runtimes.create(agent=..., config=...)` and `client.runtimes.update(...)`, `types.IdentityType.AGENT_IDENTITY` (enum value `AGENT_IDENTITY`; "The `service_account` field must not be set."), `agentplatform.frameworks.AdkApp`, the config fields `identity_type`, `requirements`, `staging_bucket` and `env_vars`, and `spec.effective_identity` on the returned resource all exist.
- Corrected from the official docs: the requirement `"google-cloud-agentplatform[adk,runtimes]"` names an extra that does not exist. The 2.10.0 package metadata declares the extras `a2a`, `adk`, `ag2`, `agent-engines`, `all`, `bigquery`, `evaluation`, `langchain`, `live` and `llama-index` (pip warns about an unknown extra and ignores it); `client.runtimes` raises "The 'runtimes' module requires 'additional packages'. Please install them using pip install google-cloud-aiplatform[agent_engines]" (`agentplatform/_genai/client.py`), and the `adk` extra itself requires `google-cloud-agentplatform[agent_engines]`, so the page uses `[adk,agent_engines]`.
- The Agent Identity API REST reference is in `gcp-foundation`.
- Source inconsistency: the A2A delegation role list names `roles/aiplatform.user` on the subagent's resource, while the same page's A2A steps say "do not grant project-wide permissions" and grant a custom role with only `aiplatform.reasoningEngines.query` and `aiplatform.reasoningEngines.get` on Agent B's resource. The source's row is kept and the `agentInvoker` row is added (not in the official docs); `roles/aiplatform.user` grants more than calling the agent needs.
- Corrected from the official docs: the `effectiveIdentity` example used `projects/PROJECT_ID`, while the same page builds agent principals as `principal://agents.global.org-ORGANIZATION_ID.system.id.goog/resources/aiplatform/projects/PROJECT_NUMBER/...` (the `add-iam-policy-binding` examples above).
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- `reasoningEngines.getIamPolicy` is `POST` in the Discovery documents (`aiplatform.v1`: `httpMethod: POST`, path `v1/{+resource}:getIamPolicy`; `aiplatform.v1beta1`: `httpMethod: POST`, path `v1beta1/{+resource}:getIamPolicy`; query parameter `options.requestedPolicyVersion` in both), as listed under `aiplatform.projects.locations.reasoningEngines.getIamPolicy` in this skill's generated REST page `rest/aiplatform/aiplatform-9.md` (rest category).

## Related

- [agent-identity-overview.md](./agent-identity-overview.md)
- [identity-delegation-architecture.md](./identity-delegation-architecture.md)
- [overview.md](./overview.md)
