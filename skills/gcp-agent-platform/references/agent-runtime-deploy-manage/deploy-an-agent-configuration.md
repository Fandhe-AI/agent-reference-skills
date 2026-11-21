---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent
---

# Agent Runtime Deployment Configuration

Optional `config` fields for `client.runtimes.create` / `client.runtimes.update` when deploying to Agent Runtime: package requirements, extra packages, environment variables and secrets, resource controls (Preview), keep-alive probe (Preview), build options, framework, identity, Private Service Connect interface and CMEK.

## Signature / Usage

### Package requirements

Pin versions for reproducible builds (track `google-cloud-aiplatform`, `cloudpickle`, `langchain`, `langchain-core`, `langchain-google-vertexai`, `pydantic`) and keep dependencies minimal. For deployments from source files use a `requirements.txt` in the package (`requirements_file`) instead of `requirements`.

```python
requirements = [
    "google-cloud-aiplatform[agent_engines,adk]",
    # any other dependencies
]
```

```python
requirements = [
    # See https://pypi.org/project/google-cloud-aiplatform for the latest version.
    "google-cloud-aiplatform[agent_engines,adk]==1.112.0",
]
```

### Extra packages (agent-object deployments only)

```python
extra_packages = ["agents"] # directory that includes agents/agent.py
```

### Environment variables and secrets

```python
env_vars = {
  "VARIABLE_1": "VALUE_1",
  "VARIABLE_2": "VALUE_2",
}
# These environment variables will become available in Agent Platform
# through `os.environ`, e.g.
#
#   import os
#   os.environ["VARIABLE_1"] # will have the value "VALUE_1"
#
# and
#
#   os.environ["VARIABLE_2"] # will have the value "VALUE_2"
#
```

Reference a Secret Manager secret (same project as the agent only):

```text
env_vars = {
  # ... (other environment variables and their values)
  "CLOUD_SQL_CREDENTIALS_SECRET": {"secret": SECRET_ID, "version": SECRET_VERSION_ID},
}
```

In your agent code (a fragment from inside a function, so it is shown as `text`; it uses `os` and `json`):

```text
secret = os.environ.get("CLOUD_SQL_CREDENTIALS_SECRET")
if secret:
  # Secrets are stored as strings, so use json.loads to parse JSON
  # payloads.
  return json.loads(secret)
```

### Resource controls (Preview)

```text
remote_agent = client.runtimes.create(
    agent=local_agent,
    config={
        "min_instances": 1,
        "max_instances": 10,
        "resource_limits": {"cpu": "4", "memory": "8Gi"},
        "container_concurrency": 9,
        # ... other configs
    }
)
```

### Keep-alive probe (Preview)

Custom container or Dockerfile deployment. The example is the Dockerfile form; for a prebuilt container image, replace `"source_packages"` and `"image_spec"` with `"container_spec": {"image_uri": "CONTAINER_IMAGE_URI"}` (as in [deploy-an-agent-containers.md](./deploy-an-agent-containers.md)) and keep `"keep_alive_probe"`. The comment in the example says `"image_uri"`, but in google-cloud-aiplatform 2.10.0 `image_uri` is a field of `container_spec` (`ReasoningEngineSpecContainerSpec`), not of `config`:

```text
remote_agent = client.runtimes.create(
    config={
        "source_packages": ["agent.py", "main.py", "requirements.txt", "Dockerfile"],
        "image_spec": {},  # or set "image_uri" when deploying a prebuilt container image
        "keep_alive_probe": {
            "http_get": {
                "path": "/is_busy",
                "port": 8080,
            },
            "max_seconds": 3600,
        },
        # ... other configs
    }
)
```

Managed ADK agent (`AdkApp`, `agent_framework="google-adk"`):

```text
remote_agent = client.runtimes.create(
    agent=local_agent,
    config={
        "requirements": ["google-cloud-aiplatform[agent_engines,adk]"],
        "keep_alive_probe": {},
        # ... other configs
    }
)
```

### Build options

Place scripts in an `installation_scripts` directory (run with root permissions while building the image):

```text
.
├── ...
└── installation_scripts/
    └── install.sh
```

```text
extra_packages = [..., "installation_scripts/install.sh"]
build_options = {"installation_scripts": ["installation_scripts/install.sh"]}
```

### Agent framework, display name, description, labels

```python
agent_framework = "google-adk"
```

```python
display_name = "Currency Exchange Rate Agent (Staging)"
```

```python
labels = {"author": "username", "version": "latest"}
```

### Agent identity and custom service account

```text
identity_type=AGENT_IDENTITY
```

Specify only the service account email, not the full resource URI:

```text
# Create a new instance
client.runtimes.create(
    agent=local_agent,
    config={
        "service_account": "my-custom-service-account@my-project.iam.gserviceaccount.com",
        # ...
    },
)

# Update an existing instance
resource_name = "projects/{project_id}/locations/{location}/reasoningEngines/{reasoning_engine_id}"
client.runtimes.update(
    name=resource_name,
    agent=local_agent,
    config={
        "service_account": "my-new-custom-service-account@my-project.iam.gserviceaccount.com",
        # ...
    },
)
```

### Private Service Connect interface

In this and the other `client.runtimes.create` / `client.runtimes.update` examples on this page, `client` is an `agentplatform.Client` (created as in [manage-deployed-agents.md](./manage-deployed-agents.md)) and `local_agent` is the agent object you built (see Create an agent, https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent); the official page does not define either.

```python
remote_agent = client.runtimes.create(
    agent=local_agent,
    config={
        "psc_interface_config": {
            "network_attachment": "NETWORK_ATTACHMENT",
            "dns_peering_configs": [
                {
                    "domain": "DOMAIN_SUFFIX",
                    "target_project": "TARGET_PROJECT",
                    "target_network": "TARGET_NETWORK",
                },
            ],
        },
    },
)
```

### Customer-managed encryption keys (CMEK)

Adapted (not in the official docs): the backticks around the placeholders inside the string are removed, because the key must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}` (Discovery document `aiplatform.v1`, `EncryptionSpec.kmsKeyName`).

```text
# The fully qualified key name
kms_key_name = "projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY_NAME"

remote_agent = client.runtimes.create(
    agent=local_agent,
    config={
        "encryption_spec": {"kms_key_name": kms_key_name},
        # ... other parameters
    },
)
```

## Notes

- Resource controls (Preview):
  - `min_instances` (`[0, 75]`, default `1`): Minimum number of application instances kept running. While in Preview you aren't billed for idle time even with a higher minimum (billing behavior subject to change).
  - `max_instances` (`[1, 1000]`, default `100`): Maximum instances for increased traffic. If VPC-SC or PSC-I is enabled the range is `[1, 100]` per Agent Platform resource.
  - `resource_limits` (default `{"cpu": "4", "memory": "4Gi"}`): Only `cpu` and `memory` keys. `cpu` supports `1`, `2`, `4`, `6`, `8`; `memory` supports `1Gi`, `2Gi`, ... `32Gi` (required CPU per memory value: Cloud Run "Configure memory limits").
  - `container_concurrency` (recommended `2 * cpu + 1`, default `9`): Concurrency per container and agent server.
- Keep-alive probe (Preview):
  - `keep_alive_probe.http_get.path` (required with `http_get`; always required for prebuilt container image deployments): Must start with `/` (for example `"/is_busy"`).
  - `keep_alive_probe.http_get.port` (`[1, 65535]`, default `8080`): Cannot use reserved ports `15000`, `15001`, `15006`, `15007`, `15020`, `15021`.
  - `keep_alive_probe.max_seconds` (`[900, 3600]`, default `900` when `http_get` is specified): Maximum time to keep an idle instance alive after the last request completes.
  - `keep_alive_probe: {}` (`max_seconds=3600`): Managed default probe; only `AdkApp` supports it.
- Other fields:
  - `agent_framework`: `google-adk`, `langchain`, `langgraph`, `ag2`, `llama-index`, `custom`. Auto-detected for agent-object deployments; defaults to `custom` for source files.
  - `gcs_dir_name`: Cloud Storage folder for staging artifacts (agent-object deployments only); existing artifacts in the folder are overwritten.
  - `extra_packages`: Local files, directories or wheels bundled with the agent (agent-object deployments only).
  - `env_vars`: Dictionary (supports Secret Manager) or list (no Secret Manager).
  - `service_account`: Custom service account email instead of agent identity / default identity.
  - `encryption_spec.kms_key_name`: CMEK key resource name.
  - `psc_interface_config`: `network_attachment`, `dns_peering_configs` (`domain`, `target_project`, `target_network`).
- Agent-framework requirement extras: ADK `google-cloud-aiplatform[agent_engines,adk]`; A2A (Preview) `google-cloud-aiplatform[agent_engines]` plus `google-adk[a2a]`; LangChain `[agent_engines,langchain]`; LangGraph `[agent_engines,langgraph]`; AG2 `[agent_engines,ag2]`; LlamaIndex Query Pipeline (Preview) `[agent_engines,llama_index]`. Specify the SDK version imported during development (such as `1.112.0`). The `langgraph` extra is not declared in the google-cloud-aiplatform 2.10.0 package metadata; there the `langchain` extra pulls in `langgraph<2.0.0,>=1.0.0`.
- Do not set these environment variables: `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_QUOTA_PROJECT`, `GOOGLE_CLOUD_LOCATION`, `PORT`, `K_SERVICE`, `K_REVISION`, `K_CONFIGURATION`, `GOOGLE_APPLICATION_CREDENTIALS`; avoid the prefix `GOOGLE_CLOUD_AGENT_ENGINE`.
- With agent identity, grant `secretmanager.versions.access` (in `roles/secretmanager.secretAccessor`) to the Agent Platform Service Agent `service-PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com`: the configured agent identity is used at runtime, but the service agent fetches secrets during deployment. Without agent identity, grant the agent `roles/secretmanager.secretAccessor`.
- Resource controls and keep-alive probe are Preview (Pre-GA Offerings Terms). Keep-alive allocates CPU continuously (CPU throttling disabled); you are billed for allocated CPU and memory until the instance scales down. Idle instances scale down after 15 minutes (`900` seconds) by default. On non-container deployments, custom `http_get` or `max_seconds` are rejected with `400 FAILED_PRECONDITION`. The default probe reports busy for up to 1 hour after each query, streaming query or bidirectional streaming request.
- Build-option scripts run as root. The source provides `install_npx.sh` (Node.js v20.x), `install_uvx.sh` and `install_gcloud_cli.sh`; they are omitted here because `install_uvx.sh` pipes `curl` into `sh` (download, inspect, then run instead).
- A2A and LlamaIndex requirement sets are Preview.
- Staging artifacts are overwritten per folder; use `gcs_dir_name` values such as `"dev"`, `"staging"`, `"prod"` or a UUID.
- The `identity_type=AGENT_IDENTITY` example provisions a unique identity tied to the Agent Platform agent resource ID, independent of the framework.
- Corrected from the official docs: the CMEK key name appears in the source as `` kms_key_name = "projects/`PROJECT_ID`/locations/`LOCATION`/keyRings/`KEY_RING`/cryptoKeys/`KEY_NAME`" ``; the backticks were removed.
- Console, Java, Go forms and the pip git-branch requirement example (placeholders wrapped in backticks) are omitted.
- Source inconsistency: the keep-alive example comments `# or set "image_uri" when deploying a prebuilt container image` next to `"image_spec": {}`; the container deployment guide and the SDK put `image_uri` inside `container_spec`.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-an-agent.md](./deploy-an-agent.md)
- [deploy-an-agent-containers.md](./deploy-an-agent-containers.md)
- [runtime-contract.md](./runtime-contract.md)
