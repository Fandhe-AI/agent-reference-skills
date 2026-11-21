---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents
---

# Manage Deployed Agents on Agent Runtime

List, get, update and delete deployed agents (the `reasoningEngines` resource) with the Console, the Agent Platform SDK or the REST API. The page also covers telemetry configuration, dashboard metrics and emergency-stop mechanisms for a misbehaving agent.

## Signature / Usage

### List deployed agents

```python
import agentplatform

client = agentplatform.Client(  # For service interactions via client.runtimes
    project="PROJECT_ID",
    location="LOCATION",
)

for agent in client.runtimes.list():
    print(agent)
```

Filter by `display_name`:

```python
for agent in client.runtimes.list(
    config={
        "filter": 'display_name="DISPLAY_NAME"',
    },
):
    print(agent)
```

REST (`reasoningEngines.list`):

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines"
```

### Get a deployed agent

```python
import agentplatform

client = agentplatform.Client(  # For service interactions via client.runtimes
    project="PROJECT_ID",
    location="LOCATION",
)

remote_agent = client.runtimes.get(
    name="projects/PROJECT_ID_OR_NUMBER/locations/LOCATION/reasoningEngines/RESOURCE_ID"
)
```

REST (`reasoningEngines.get`):

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID"
```

### Update a deployed agent

Update one or more fields (at least one). Updating versioned fields creates a new revision. Takes a few seconds to a few minutes.

With `agent=UPDATED_AGENT`, the SDK packages the new agent object again, so `config` needs a staging bucket as for deploying an agent object. For a metadata-only update (for example `display_name` or `description`), omit `agent`: the existing instance is then used (google-cloud-agentplatform 2.10.0 `Runtimes.update` docstring: "If it is not specified, the existing instance will be used."), and `requirements` and `extra_packages` must be left out too ("requirements must be None if agent is None.", "extra_packages must be None if agent is None.").

Adapted (not in the official docs): added `"staging_bucket": STAGING_BUCKET,` (a `gs://BUCKET_NAME` URI) to `config`, because an update that passes `agent` requires it.

```python
import agentplatform

client = agentplatform.Client(  # For service interactions via client.runtimes
    project="PROJECT_ID",
    location="LOCATION",
)

client.runtimes.update(
    name=RESOURCE_NAME,                    # Required.
    agent=UPDATED_AGENT,                   # Optional.
    config={                                                # Optional.
        "staging_bucket": STAGING_BUCKET,
        "requirements": REQUIREMENTS,      # Optional.
        "display_name": "DISPLAY_NAME",    # Optional.
        "description": "DESCRIPTION",      # Optional.
        "extra_packages": EXTRA_PACKAGES,  # Optional.
    },
)
```

REST (`reasoningEngines.patch`) request body, saved as `request.json`:

```json
{
"displayName": "DISPLAY_NAME",
"description": "DESCRIPTION"
}
```

Adapted (not in the official docs): the query parameter is `updateMask=displayName,description` (the name and the JSON field paths of the Discovery document `aiplatform.v1` `reasoningEngines.patch`) instead of the source's `update_mask="display_name,description"` with nested quotes.

```bash
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID?updateMask=displayName,description"
```

### Delete a deployed agent

Without `force`, the delete request fails with `FAILED_PRECONDITION` while the agent still has child resources such as sessions and memory, which protects them. Passing `force=True` (`remote_agent.delete(force=True)` or `client.runtimes.delete(name=RESOURCE_NAME, force=True)`, as the source writes it) also deletes those child resources; this cannot be undone, so use it only for an agent whose sessions and memories you intend to delete.

Adapted (not in the official docs): the argument `force=True, # Optional, if the agent has resources (e.g. sessions, memory)` is removed, so the example does not delete sessions and memories by default.

```python
remote_agent.delete()
```

Adapted (not in the official docs): the line `force=True, # Optional, if the agent has resources (e.g. sessions, memory)` is removed from `client.runtimes.delete`, for the same reason.

```python
import agentplatform

client = agentplatform.Client(  # For service interactions via client.runtimes
    project="PROJECT_ID",
    location="LOCATION",
)

client.runtimes.delete(
    name=RESOURCE_NAME,
)
```

```bash
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID"
```

## Options / Props

### Emergency stop mechanisms and propagation times

| Mechanism | Effect on active traffic and sessions | Typical propagation time |
|---|---|---|
| **Delete the deployed agent** ([`runtimes.delete` or `reasoningEngines.delete`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents#delete)) | Terminates all runtime container instances, stops active invocations and streaming sessions (`streamQuery`), and permanently invalidates the agent's SPIFFE identity (`principal://...`). | Immediate as soon as the deletion operation completes (typically seconds to a few minutes). |
| **Reroute revision traffic or archive revisions** ([`trafficSplitManual` or `agent_gateway_config`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic#configure-traffic)) | Shifts 100% of traffic sent to the root agent endpoint to a known-good active revision, or archives existing revisions when updating `spec.deployment_spec.agent_gateway_config` (this changes the agent's Agent Gateway binding and irreversibly archives every existing revision, including a known-good one you may want to roll back to; to stop direct calls to one revision, delete that revision instead, see Notes). Direct requests to a specific active revision resource path continue until that revision is archived or deleted. | Seconds to a few minutes for the update operation to complete. |
| **Apply a deny rule in Unified Access Policies (UAPs) (UAPs) at Agent Gateway** ([enforcement mode: `iamEnforcementMode` removed](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/configure-iam-policies-uap)) | Blocks outbound tool calls, Model Context Protocol (MCP) requests, and agent-to-agent calls routed through Agent Gateway while keeping the runtime container alive for inspection. Evaluated on new authorization checks; doesn't forcibly terminate open streaming connections unless re-authorized. | Eventually consistent: typically takes effect within 2 minutes, but can take 7 minutes or longer to propagate globally. Group or `principalSet` membership updates can take several minutes to hours to synchronize. |
| **Apply an IAM deny policy, revoke IAM roles, or bind a Principal Access Boundary (Principal Access Boundary) policy** | Blocks the agent identity or attached service account from calling Google Cloud APIs and resources. Evaluated on each API request; doesn't terminate the runtime container itself. | Eventually consistent: typically takes effect within 2 minutes, and up to 7 minutes or longer (see [Access change propagation](https://docs.cloud.google.com/iam/docs/access-change-propagation)). |

## Notes

- Scope of the Principal Access Boundary part of the last table row (the row is the source's, kept as written): the effects differ. Revoking IAM roles or attaching an IAM deny policy removes or blocks the agent's permissions. A Principal Access Boundary policy only restricts which resources a principal is eligible to access (IAM policy types: https://docs.cloud.google.com/iam/docs/policy-types); the agent identity overview says it "limits the resources that an agent can access, regardless of other permissions that the agent has" and that agents subject to it "are only eligible to access the resources specified in those policies". It does not revoke access to resources that stay inside the boundary; those calls are still decided by allow and deny policies. For an emergency stop of Google Cloud API access, revoke the IAM roles or attach an IAM deny policy; use a Principal Access Boundary policy only to cut off resources outside the boundary, and confirm the block in Cloud Logging as in step (3).
- Dashboard tabs (Console):
  - Overview: Agent latency, request count, error rate.
  - Models: Model calls, model error rate, model token usage.
  - Tools: Tool calls, tool error rate, tool latency.
  - Usage: Token usage by input and output, container CPU and memory allocation.
  - Logs: Agent logs, if Cloud Logging is enabled for the agent.
- Emergency stop steps: (1) halt runtime execution (delete the agent with `client.runtimes.delete(name="RESOURCE_NAME", force=True)`, the console, or `reasoningEngines.delete`), or keep the agent and stop traffic to a faulty revision. These are separate operations:
  - Reroute traffic: update the agent with `trafficSplitManual` to route 100% of root-endpoint traffic to a known-good revision. This changes only traffic sent to the root agent endpoint; direct requests to a specific active revision resource path continue.
  - Stop direct calls to a specific revision: delete that revision (`client.runtimes.revisions.delete(name=".../reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID")` with `api_version` `v1beta1`, or the REST method the source calls `reasoningEngineRuntimeRevisions.delete`: `DELETE https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID/runtimeRevisions/REVISION_ID`, present only in the `aiplatform.v1beta1` Discovery document). Only revisions that are not configured to receive traffic can be deleted, so reroute traffic first. Deleted revisions cannot be restored. The manage-revisions page (sections "Manual deletion" and "Agent Gateway and revisions") documents no separate operation that archives one chosen revision.
  - Updating `spec.deployment_spec.agent_gateway_config` is a change of the agent's Agent Gateway binding, not a revision-archive operation. As a side effect, attaching, changing or detaching the binding creates a new revision and irreversibly archives every revision that existed before the change; it is rejected with `FAILED_PRECONDITION` while any manual traffic split is set. The emergency-stop table above and the source's "Traffic rollback without deleting the agent" step present it as a way to archive pre-existing revisions; use it for that only if changing the gateway association is intended.
- Emergency stop steps, continued: (2) revoke downstream access with a `DENY` rule for the agent's `principal://` or `principalSet://` identifier in the UAP bound to the gateway (check that the IAP authorization extension is in enforcement mode: `iamEnforcementMode` removed from its metadata, not `"DRY_RUN"`), or revoke IAM roles / attach an IAM deny policy or Principal Access Boundary policy; (3) policy changes take 2 to 7 minutes (longer for `principalSet` updates), so pair policy revocation with runtime deletion or traffic rerouting, then confirm in Cloud Logging by querying `is_agentic=true` and `networkservices.googleapis.com/gateway_requests` denials.
- Deleting an agent invalidates its agent identity; any UAP that grants permissions to that principal keeps the defunct principal in its rules and the policy binding stays active. Update the UAP to remove the principal, and delete the binding if no active principals remain.
- Corrected from the official docs: both Python delete examples passed `force=True, # Optional, if the agent has resources (e.g. sessions, memory)`, which deletes the agent's sessions and memories along with it; the examples omit it and the forced variant is described in the sentence before them.
- Irreversible: deleting a deployed agent terminates its instances and invalidates its identity. `force=True` deletes child resources (for example sessions and memory); without it the request fails with `FAILED_PRECONDITION` when child resources exist (Discovery document `aiplatform.v1`, `reasoningEngines.delete` query parameter `force`; the source's `curl -X DELETE` example has no `force` parameter). Try deletes in a disposable project first.
- Telemetry (Console): after enabling traces during development, use the **Telemetry configuration** column to toggle OpenTelemetry traces and logs, logging of prompt inputs and response outputs, container scaling / resources / concurrency (recommended `2 * CPU + 1`, default `9`), and Memory Bank Generation / Retrieval / Retention settings (editing requires `aiplatform.reasoningEngines.update`). If telemetry collection is disabled, redeploy and update the Vertex AI SDK to `>= 1.126.1` to see the Observability options.
- `updateMask` (`update_mask` in the source) is a comma-separated list of fields to update. Successful list / get / patch / delete calls return a 2xx status.
- Corrected from the official docs: the PATCH URL was `"https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID?update_mask="display_name,description""`; the shell joins the adjacent quoted and unquoted parts into `...?update_mask=display_name,description`. The Discovery document (`aiplatform.v1`, `reasoningEngines.patch`) names the query parameter `updateMask` (a `google-fieldmask`), so the example uses `updateMask=displayName,description`.
- Corrected from the official docs: the update example passed `agent=UPDATED_AGENT` with a `config` that had no `staging_bucket`. In google-cloud-agentplatform 2.10.0 (`agentplatform/_genai/runtimes.py`), `update` documents "ValueError: If `config.staging_bucket` was not set when `runtime` is specified.", and with an agent object `_set_package_spec` calls `_validate_staging_bucket_or_raise`, which raises "Please provide a `staging_bucket` in `client.runtimes.create(...)`." (`_runtimes_utils.py`). `STAGING_BUCKET` is a variable holding a `gs://BUCKET_NAME` URI.
- The Python `update` / `delete` templates use `RESOURCE_NAME`, `UPDATED_AGENT`, `REQUIREMENTS` and `EXTRA_PACKAGES` as variables for your own values (for example `RESOURCE_NAME = "projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID"`).
- The source also shows Console steps and PowerShell variants.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the emergency-stop table and step (2) give `iamEnforcementMode: "ENFORCE"`; the IAM policy guide (iam-overview-uap.md) says to enforce by removing `iamEnforcementMode` from the authorization extension metadata (the console writes `iamEnforcementMode: "ENFORCED"` when creating a gateway). `"ENFORCE"` is the value the governance guide gives for `sgpEnforcementMode`. The table cell about `agent_gateway_config` adds the archive side effect described in the Notes below.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-an-agent.md](./deploy-an-agent.md)
- [use-an-agent.md](./use-an-agent.md)
- [runtime-contract.md](./runtime-contract.md)
