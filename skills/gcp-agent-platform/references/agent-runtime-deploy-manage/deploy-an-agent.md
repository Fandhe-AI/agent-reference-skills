---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent
---

# Deploy an Agent on Agent Runtime

Deploying an agent on Agent Runtime (formerly Vertex AI Agent Engine) makes it available remotely to handle requests. Methods: Developer Connect, public Git repository, source files, Dockerfile, container image, or the Agent Platform SDK (an in-memory `local_agent` object). This page covers the SDK-object, source-file and Git-based methods; the container-based methods are in `deploy-an-agent-containers.md` and the optional `config` fields in `deploy-an-agent-configuration.md`.

## Signature / Usage

### Deploy from an agent object (Agent Platform SDK)

This fence is a signature-like template that lists the `config` options: `client` is an `agentplatform.Client` from the `google-cloud-agentplatform` package (install it as described in `agent-runtime-develop/setup.md`, "Install the SDK" (https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup); `client = agentplatform.Client(project="PROJECT_ID", location="LOCATION")`, as in [manage-deployed-agents.md](./manage-deployed-agents.md); the official deploy page does not create it), `local_agent` is the agent object you built (see Create an agent, https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent), and each value (`staging_bucket`, `requirements`, `extra_packages`, `gcs_dir_name`, `display_name`, `description`, `labels`, `env_vars`, `build_options`, `identity_type`, `service_account`, `min_instances`, `max_instances`, `resource_limits`, `container_concurrency`, `encryption_spec`, `agent_framework`) is a same-named variable you assign; the official example lists them as names without assigning them (example values are in [deploy-an-agent-configuration.md](./deploy-an-agent-configuration.md)).

Adapted (not in the official docs): added `"staging_bucket": staging_bucket,` (a `gs://BUCKET_NAME` URI) to `config`; deploying from an agent object requires a staging bucket, because the SDK writes the pickled agent to it.

```python
remote_agent = client.runtimes.create(
    agent=local_agent,                                  # Optional.
    config={
        "staging_bucket": staging_bucket,
        "requirements": requirements,                   # Optional.
        "extra_packages": extra_packages,               # Optional.
        "gcs_dir_name": gcs_dir_name,                   # Optional.
        "display_name": display_name,                   # Optional.
        "description": description,                     # Optional.
        "labels": labels,                               # Optional.
        "env_vars": env_vars,                           # Optional.
        "build_options": build_options,                 # Optional.
        "identity_type": identity_type,                 # Optional.
        "service_account": service_account,             # Optional.
        "min_instances": min_instances,                 # Optional.
        "max_instances": max_instances,                 # Optional.
        "resource_limits": resource_limits,             # Optional.
        "container_concurrency": container_concurrency, # Optional
        "encryption_spec": encryption_spec,             # Optional.
        "agent_framework": agent_framework,             # Optional.
    },
)
```

### Deploy from source files (Python only)

This is the same kind of template: `client` is the `agentplatform.Client` described above, and `source_packages`, `entrypoint_module`, `entrypoint_object`, `class_methods`, `requirements_file` and the other `config` values are same-named variables you assign; the official example does not assign them (the fields are described in Notes, and a `class_methods` example follows).

```python
# Example file structure:
# /agent_directory
#     ├── agent.py
#     ├── requirements.txt

# Example agent_directory/agent.py:
# class MyAgent:
#     def ask(self, question: str) -> str:
#         return f"Answer to {question}"
# root_agent = MyAgent()

remote_agent = client.runtimes.create(
    config={
        "source_packages": source_packages,             # Required.
        "entrypoint_module": entrypoint_module,         # Required.
        "entrypoint_object": entrypoint_object,         # Required.
        "class_methods": class_methods,                 # Required.
        "requirements_file": requirements_file,         # Optional.
        "display_name": display_name,                   # Optional.
        "description": description,                     # Optional.
        "labels": labels,                               # Optional.
        "env_vars": env_vars,                           # Optional.
        "build_options": build_options,                 # Optional.
        "identity_type": identity_type,                 # Optional.
        "service_account": service_account,             # Optional.
        "min_instances": min_instances,                 # Optional.
        "max_instances": max_instances,                 # Optional.
        "resource_limits": resource_limits,             # Optional.
        "container_concurrency": container_concurrency, # Optional
        "encryption_spec": encryption_spec,             # Optional.
        "agent_framework": agent_framework,             # Optional.
    },
)
```

Adapted (not in the official docs): the method is named `ask` with a required string parameter `question`, to match `ask(self, question: str)` in the example `agent.py` above; the source's template uses `method_name`, `param1` and `param2`. The same `class_methods` list applies to the Developer Connect and public Git examples below when they point at that `agent.py` (`entrypoint_object` `root_agent`).

```python
class_methods = [
    {
        "name": "ask",
        "api_mode": "",  # Options: "", "async", "async_stream", "stream", "bidi_stream"
        "parameters": {
            "type": "object",
            "properties": {
                "question": {"type": "string"}
            },
            "required": ["question"]
        }
    }
]
```

### Deploy from Developer Connect (Python only)

The link resource name has the format `projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION_ID/gitRepositoryLinks/REPO_ID`; create it by following the Developer Connect "connect-repo" documentation.

Adapted (not in the official docs): added the line `"class_methods": class_methods,` marked `# Required.`, as in the public Git example below, because google-cloud-agentplatform 2.10.0 raises `ValueError` when `developer_connect_source` is given without `class_methods` (see Notes).

```text
remote_agent = client.runtimes.create(
    config={
        "developer_connect_source": {                   # Required.
            "git_repository_link": "projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION_ID/gitRepositoryLinks/REPO_ID",
            "revision": "main",
            "dir": "path/to/dir",
        },
        "entrypoint_module": "agent",                   # Required.
        "entrypoint_object": "root_agent",              # Required.
        "class_methods": class_methods,                 # Required.
        "requirements_file": "requirements.txt",        # Optional.
        # Other optional configs:
        # "env_vars": {...},
        # "service_account": "...",
    },
)
```

### Deploy from a public Git repository (Python only)

```text
remote_agent = client.runtimes.create(
    config={
        "git_source": {                                 # Required.
            "url": "https://github.com/OWNER/REPO.git", # Required.
            "revision": "main",                         # Required.
            "dir": "path/to/dir",                       # Optional.
        },
        "entrypoint_module": "agent",                   # Required.
        "entrypoint_object": "root_agent",              # Required.
        "class_methods": class_methods,                 # Required.
        "requirements_file": "requirements.txt",        # Optional.
        # Other optional configs:
        # "env_vars": {...},
        # "service_account": "...",
    },
)
```

### Get the resource name and supported operations

```python
remote_agent.api_resource.name
```

```python
remote_agent.operation_schemas()
```

## Notes

- Deployment methods:
  - Developer Connect (Python only): Recommended for projects in a Git repository linked through Developer Connect; supports version control, collaboration and CI/CD.
  - Public Git repository (Python only): HTTPS public repositories only; no Developer Connect link needed. Use Developer Connect for private repositories.
  - Source files (Python only): For CI/CD and Infrastructure as Code (for example Terraform); no Cloud Storage bucket required.
  - Dockerfile (Any language): You control the API server; the container must adhere to the runtime contract.
  - Container image (Any language): Image hosted in Artifact Registry; control over the build and lower deployment latency; must adhere to the runtime contract.
  - Agent Platform SDK (Python): In-memory `local_agent` objects, for example in Colab; works best for agents without complex, non-serializable components.
- Developer Connect parameters:
  - `developer_connect_source` (`dict`): Configuration for fetching source code.
  - `developer_connect_source.git_repository_link` (`str`): The Developer Connect Git repository link resource name.
  - `developer_connect_source.revision` (`str`): The revision to fetch (branch, tag, or commit SHA).
  - `developer_connect_source.dir` (`str`): The root directory of the agent code within the repository.
  - `entrypoint_module` (`str`): Python module containing the agent entrypoint, relative to `developer_connect_source.dir`.
  - `entrypoint_object` (`str`): Callable object in `entrypoint_module` that represents the agent application (for example, `root_agent`).
  - `class_methods` (`list[dict]`): Exposed methods (`name`, `api_mode`, optional `parameters`). Not listed in the source's Developer Connect parameters, but required by google-cloud-agentplatform 2.10.0 (see the Corrected note below).
  - `requirements_file` (`str`): Optional: path to a pip requirements file relative to the source root. Defaults to `requirements.txt`.
- Public Git repository parameters:
  - `git_source.url` (`str`): HTTPS URL of a public Git repository. Can't contain credentials, such as `user:password@`.
  - `git_source.revision` (`str`): A branch, a tag, or a full commit SHA. Abbreviated commit SHAs aren't supported.
  - `git_source.dir` (`str`): Optional: directory relative to the repository root where the build runs; only its contents are deployed. Defaults to the repository root. Can't start with `/` or contain `..` segments.
  - `entrypoint_module` (`str`): Python module containing the agent entrypoint, relative to `git_source.dir`.
  - `entrypoint_object` (`str`): Callable object in `entrypoint_module` (for example, `root_agent`).
  - `class_methods` (`list[dict]`): Exposed methods; each has a `name`, `api_mode` and optional `parameters`.
  - `requirements_file` (`str`): Optional: path relative to `git_source.dir` (or the repository root). Defaults to `requirements.txt`.
- Source file parameters:
  - `source_packages` (`list[str]`): Local file or directory paths to include. Total size of files and directories shouldn't exceed 8MB.
  - `entrypoint_module` (`str`): Fully qualified Python module name containing the agent entrypoint (for example, `agent_dir.agent`).
  - `entrypoint_object` (`str`): Callable object in `entrypoint_module` (for example, `root_agent`).
  - `class_methods` (`list[dict]`): Exposed methods; each has a `name`, `api_mode` (`""`, `"async"`, `"async_stream"`, `"stream"`, `"bidi_stream"`) and optional `parameters`.
  - `requirements_file` (`str`): Optional: path within `source_packages`. Defaults to `requirements.txt` at the root of the packaged source.
- Deployment takes a few minutes and its latency depends on the time to install the required packages. Agent-object deployment bundles `*.pkl` (pickled `local_agent`), `requirements.txt` and `dependencies.tar.gz`, uploads them to Cloud Storage, references them in `PackageSpec`, then Agent Runtime builds containers and starts HTTP servers. Source-file deployment creates a `tar.gz` of `source_packages`, encodes it and sends it directly to the API (no Cloud Storage). Git deployments clone / fetch the revision, install `requirements_file` dependencies and start the app using `entrypoint_module` and `entrypoint_object`.
- `remote_agent` is an `AgentRuntime` with `api_resource` (the `ReasoningEngine` resource), `api_client` (sync) and `async_api_client` (async). The resource name has the form `projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/RESOURCE_ID`.
- `remote_agent.operation_schemas()` lists the operations an agent supports; the set depends on the framework (ADK, Agent2Agent, LangChain, LangGraph, AG2, LlamaIndex, Custom).
- Prerequisites: set up the environment and create an agent first. Additional permissions are granted as described in "Set up the identity and permissions for your agent". Application Design Center templates "Simple Agent Platform" and "Agent Platform with governance" deploy the agent with security and governance layers.
- The SDK templates use variable names (`requirements`, `env_vars`, `class_methods`, ...) as placeholders for each value; define them before the call.
- The Developer Connect and public Git examples are tagged `text` because their comments contain `{...}` elisions.
- Agent Runtime was formerly named Vertex AI Agent Engine; the REST resource is still `reasoningEngines`.
- Distance line: this is Google's ADK / Agent Runtime, not Claude Code / the Claude Agent SDK or OpenAI Agents.
- Corrected from the official docs: the agent-object template's `config` had no `staging_bucket`; the setup page says a staging bucket is "Required" for "Deploy from agent object" ("the SDK writes your code to the bucket"), the Quickstart passes `"staging_bucket": "STAGING_BUCKET"`, and google-cloud-agentplatform 2.10.0 defines `staging_bucket` in the create config (`agentplatform/_genai/types/common.py`, "The GCS bucket to use for staging the artifacts needed").
- Corrected from the official docs: the Developer Connect example passed only `developer_connect_source`, `entrypoint_module`, `entrypoint_object` and `requirements_file`. In google-cloud-agentplatform 2.10.0, `_set_source_code_spec` (`agentplatform/_genai/runtimes.py`, called by `client.runtimes.create` for `source_packages`, `developer_connect_source` and `git_source`) raises `ValueError` with the message "`class_methods` must be specified if `source_packages`, `developer_connect_source`, `git_source`, or `agent_config_source` is specified without a Dockerfile or `image_spec`." when `class_methods` is `None`; the public Git and source-file examples of the same page already mark `class_methods` as Required.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the `class_methods` example declared `"name": "method_name"` with `param1` (string, required) and `param2` (integer). google-cloud-agentplatform 2.10.0 reads the method name from `name` and the mode from `api_mode` (`_METHOD_NAME_KEY_IN_SCHEMA`, `_MODE_KEY_IN_SCHEMA` in `agentplatform/_genai/_runtimes_utils.py`); `""` is `_STANDARD_API_MODE`.

## Related

- [deploy-an-agent-containers.md](./deploy-an-agent-containers.md)
- [deploy-an-agent-configuration.md](./deploy-an-agent-configuration.md)
- [manage-deployed-agents.md](./manage-deployed-agents.md)
- [use-an-agent.md](./use-an-agent.md)
- [runtime-contract.md](./runtime-contract.md)
