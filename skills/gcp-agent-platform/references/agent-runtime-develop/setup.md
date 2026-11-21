---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup
---

# Set up the environment for Agent Runtime

Before using Agent Runtime you need a Google Cloud project with billing enabled, the required permissions, an optional Cloud Storage staging bucket, and the Agent Platform SDK for Python. A reference Terraform example is the agent-starter-pack (https://github.com/GoogleCloudPlatform/agent-starter-pack).

## Signature / Usage

### Install the SDK

Adapted (not in the official docs): the requirement is quoted because an unquoted `>=1.112.0` is parsed by the shell as an output redirection to a file named `=1.112.0`.

```bash
pip install "google-cloud-aiplatform[agent_engines,adk,langchain,ag2,llama_index]>=1.112.0"
```

The client-based examples on the deploy and manage pages (`client = agentplatform.Client(...)`, `client.runtimes.*`) use a different package: the standalone `google-cloud-agentplatform` package (module `agentplatform`), into which version 2.0.1 of the Agent Platform SDK moved the `agent_engines` module as `runtimes`, `sessions`, `sandboxes` and `memory_banks` (Agent Runtime overview, "Migration to the client-based SDK"). The command above installs `google-cloud-aiplatform` (module `vertexai`) and does not provide `import agentplatform`, so install `google-cloud-agentplatform[agent-engines]` with pip as well before you run those examples (2.10.0 on PyPI as of 2026-11-18; its extras include `agent-engines`, `adk`, `a2a`, `langchain`, `ag2` and `llama-index`). The `agent-engines` extra adds the packages that deploying an agent object and the runtime tooling use (`cloudpickle`, `google-cloud-storage`, `opentelemetry-sdk` and the OpenTelemetry exporters, per the 2.10.0 package metadata), and when the `runtimes` module cannot be imported, `client.runtimes` raises "The 'runtimes' module requires 'additional packages'. Please install them using pip install google-cloud-aiplatform[agent_engines]" (`agentplatform/_genai/client.py`). Add the framework extra you use, for example `google-cloud-agentplatform[adk,agent-engines]`.

To use Agent2Agent (A2A) on Agent Platform, also install the a2a-sdk package:

```bash
pip install google-adk[a2a]
```

### Authenticate

Local shell:

```bash
gcloud auth application-default login
```

Colab:

```python
from google.colab import auth

auth.authenticate_user(project_id="PROJECT_ID")
```

Cloud Shell needs no action.

### Import and initialize the SDK

```python
import vertexai
from vertexai import agent_engines # For the prebuilt templates

client = vertexai.Client(  # For service interactions via client.agent_engines
    project="PROJECT_ID",
    location="LOCATION",
)
```

### Create an agent identity before deploying code

The agent identity page creates its client with `http_options=dict(api_version="v1beta1")` for this call. The `client` above has no `http_options`, but in google-genai 3.6.1 (`google/genai/_api_client.py`, which `vertexai.Client` uses), a client created with a project and location defaults to `api_version` `'v1beta1'` unless the environment variable `GOOGLE_GENAI_API_VERSION` sets another version. To make the version explicit, pass `http_options=dict(api_version="v1beta1")` to `vertexai.Client(...)` as well (`vertexai.Client` takes `http_options` in google-cloud-aiplatform 2.10.0).

Adapted (not in the official docs): added `from vertexai import types`, because the source uses `types.IdentityType` without importing `types` (the quickstart imports it this way, and `vertexai.types.IdentityType.AGENT_IDENTITY` exists in google-cloud-aiplatform 2.10.0).

```python
from vertexai import types

remote_app = client.agent_engines.create(
      config={
          "identity_type": types.IdentityType.AGENT_IDENTITY,
      },
)
```

Then grant the agent identity additional roles and add agent code later by updating this resource: `client.agent_engines.update(name=remote_app.api_resource.name, agent=..., config=...)` (google-cloud-aiplatform 2.10.0 `AgentEngines.update` takes `name`, `agent` and `config`). The source writes `agent_engine.update(...)`, where `agent_engine` is not defined on the page.

### Manually generate the default service agent

```bash
gcloud beta services identity create --service=aiplatform.googleapis.com --project=PROJECT-ID-OR-PROJECT-NUMBER
```

### Create a staging bucket

Adapted (not in the official docs): added `--project=PROJECT_ID` (a gcloud-wide flag), so the bucket is created in the project that the SDK client uses.

```bash
gcloud storage buckets create gs://BUCKET_NAME --project=PROJECT_ID --default-storage-class STORAGE_CLASS --location LOCATION
```

### Bring your own container: grant Artifact Registry Reader

Grant the role on the Artifact Registry repository that holds the container image (`REPOSITORY` in `LOCATION`), not on the whole project: a repository-level binding lets the service agent read images only from that repository, while a project-level binding lets it read every repository in the project.

Adapted (not in the official docs): the project-level `gcloud projects add-iam-policy-binding PROJECT_NUMBER` is replaced with `gcloud artifacts repositories add-iam-policy-binding REPOSITORY --location=LOCATION --project=PROJECT_ID`, so the role is limited to the repository that holds the image; the member and the role are the source's.

```bash
gcloud artifacts repositories add-iam-policy-binding REPOSITORY \
  --location=LOCATION \
  --project=PROJECT_ID \
  --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.reader"
```

For a repository in a different project, grant the role to the Agent Platform Service Agent on the repository in the repository project (`AR_REPO_PROJECT_ID`):

Adapted (not in the official docs): the project-level `gcloud projects add-iam-policy-binding AR_REPO_PROJECT_NUMBER` is replaced with `gcloud artifacts repositories add-iam-policy-binding REPOSITORY --location=LOCATION --project=AR_REPO_PROJECT_ID`, so the role is limited to that repository; the member and the role are the source's.

```bash
gcloud artifacts repositories add-iam-policy-binding REPOSITORY \
  --location=LOCATION \
  --project=AR_REPO_PROJECT_ID \
  --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.reader"
```

## Notes

- Roles:
  - `roles/serviceusage.serviceUsageAdmin`: Needed for the `serviceusage.services.enable` permission to enable APIs.
  - `roles/aiplatform.user` (Agent Platform User): Permissions to use Agent Runtime; also needed by a custom service account.
  - `roles/aiplatform.agentDefaultAccess`: Default for agent identity: basic project-wide logging and model calling permissions.
  - `roles/aiplatform.agentContextEditor`: Default for agent identity: limits an agent to its own sessions, memories and sandboxes.
  - `roles/aiplatform.reasoningEngineServiceAgent`: Default Service Agent role (AI Platform Reasoning Engine Service Agent).
  - `roles/iam.serviceAccountUser`: Grant yourself on a custom service account to deploy with it.
  - `roles/iam.serviceAccountTokenCreator`: Cross-project custom service account: grant to the Agent Platform Service Agent of the deployment project.
  - `roles/storage.admin`: Principal that deploys from an agent object needs access to the staging bucket (the source names Storage Admin).
  - `roles/artifactregistry.reader`: Default service agent reads container images (BYOC).
- Identity options:
  - Agent identity (Recommended): IAM agent identity tied to each individual agent. Some features accessible by these roles may be in Preview.
  - Default Service Agent: `service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com`, shared across agents, provisioned automatically during deployment.
  - Custom service account: Your own account for granular control; grant `roles/aiplatform.user` plus any roles your code needs; specify its email when deploying.
- SDK extras:
  - `agent_engines`: Packages required for deployment to Agent Runtime.
  - `adk`: Compatible ADK packages.
  - `langchain`: Compatible LangChain and LangGraph packages.
  - `ag2`: Compatible AG2 packages.
  - `llama_index`: Compatible LlamaIndex packages.
- Staging bucket by deployment form:
  - Deploy from source files: Not required; the SDK uploads files directly.
  - Deploy from agent object: Required; the SDK writes your code to the bucket.
- Cross-project custom service account: the organization policy `iam.disableCrossProjectServiceAccountUsage` must NOT be enforced in the project where the service account lives; in that project, grant the Service Account Token Creator role on the custom service account to the Agent Platform Service Agent `service-RESOURCE_PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com`, where `RESOURCE_PROJECT_NUMBER` is the project number of the project where you plan to deploy the agent (the source: "the Agent Platform Service Agent (...) of the project where you plan to deploy the agent"), not of the project that owns the service account; then grant the custom service account its roles in the deployment project.
- A bucket in the same project as the agents is strongly recommended; with a bucket in another project, manually grant the Agent Platform Service Agent (`service-PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com`) read permissions.
- `gcloud beta services identity create` may show only the Vertex AI Service Agent in its response, but the Reasoning Engine Service Agent is also created. Find the principal `service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com` in IAM with "Include Google-provided role grants" checked.
- `roles/storage.admin` grants full control of Cloud Storage buckets and objects in the project; the source asks for it for the deployer.
- BYOC through Agent Gateway: the custom image must trust the gateway's root CA (see Agent Gateway runtime deploy docs).
- Corrected from the official docs: the source's agent identity block starts at `remote_app = client.agent_engines.create(` and has no `from vertexai import types` line.
- `roles/aiplatform.agentDefaultAccess` and `roles/aiplatform.agentContextEditor` are written as the source gives them; they are not listed on the IAM roles-permissions page for `aiplatform` (https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform), so the exact IDs are not confirmed there.
- `from vertexai import agent_engines` imports the `vertexai.agent_engines` subpackage, which exists in google-cloud-aiplatform 2.10.0.
- Adapted from the official docs: the source writes `pip install google-cloud-aiplatform[agent_engines,adk,langchain,ag2,llama_index]>=1.112.0` unquoted.
- The source also shows Console steps for creating a bucket. Console click paths are omitted.
- Corrected from the official docs: the staging bucket example was `gcloud storage buckets create gs://BUCKET_NAME --default-storage-class STORAGE_CLASS --location LOCATION`, which uses the gcloud default project instead of the `PROJECT_ID` passed to the SDK client.
- `google-cloud-agentplatform` 2.10.0 (wheel METADATA): `Name: google-cloud-agentplatform`, `Provides-Extra` `agent-engines`, `a2a`, `adk`, `langchain`, `ag2`, `llama-index`, `evaluation`, `bigquery`, `live`, `all`; it does not depend on `google-cloud-aiplatform`.
- Corrected from the official docs: the two Artifact Registry Reader examples granted the role at project level (`gcloud projects add-iam-policy-binding PROJECT_NUMBER --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com" --role="roles/artifactregistry.reader"` and the same with `AR_REPO_PROJECT_NUMBER` and the `gcp-sa-aiplatform` service agent), which lets the service agent read every repository in the project. The examples use `gcloud artifacts repositories add-iam-policy-binding`, whose gcloud 593.0.0 help lists the positional `REPOSITORY`, `--location`, the required `--member` and `--role`, and `--project` under GCLOUD WIDE FLAGS.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [runtime.md](./runtime.md)
- [quickstart-adk.md](./quickstart-adk.md)
- [create-an-adk-agent.md](./create-an-adk-agent.md)
