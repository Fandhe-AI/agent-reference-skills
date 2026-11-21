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

The client-based examples on the deploy and manage pages (`client = agentplatform.Client(...)`, `client.runtimes.*`) use a different package: the standalone `google-cloud-agentplatform` package (module `agentplatform`), into which version 2.0.1 of the Agent Platform SDK moved the `agent_engines` module as `runtimes`, `sessions`, `sandboxes` and `memory_banks` (Agent Runtime overview, "Migration to the client-based SDK"). The command above installs `google-cloud-aiplatform` (module `vertexai`), whose 2.10.0 wheel also contains the `agentplatform` package (each `agentplatform/` file of the google-cloud-agentplatform 2.10.0 wheel is in its RECORD with the same sha256). Installed in one environment, the two distributions share those files, and uninstalling either one deletes them for the other (checked with pip 25.0.1 and both 2.10.0 wheels). Install the package that matches the examples: `google-cloud-aiplatform` for the `vertexai.*` examples, and, as the source says for the client-based examples, `google-cloud-agentplatform[agent-engines]` for the `agentplatform.*` examples (2.10.0 on PyPI as of 2026-11-18; its extras include `agent-engines`, `adk`, `a2a`, `langchain`, `ag2` and `llama-index`). The `agent-engines` extra adds the packages that deploying an agent object and the runtime tooling use (`cloudpickle`, `google-cloud-storage`, `opentelemetry-sdk` and the OpenTelemetry exporters, per the 2.10.0 package metadata), and when the `runtimes` module cannot be imported, `client.runtimes` raises "The 'runtimes' module requires 'additional packages'. Please install them using pip install google-cloud-aiplatform[agent_engines]" (`agentplatform/_genai/client.py`). If you need both packages, use a separate virtual environment for each. Add the framework extra you use, for example `google-cloud-agentplatform[adk,agent-engines]`.

To use Agent2Agent (A2A) on Agent Platform, also install the a2a-sdk package:

Adapted (not in the official docs): the brackets are a shell glob pattern (zsh stops with "no matches found" by default), so the requirement is quoted.

```bash
pip install "google-adk[a2a]"
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

Adapted (not in the official docs): added `http_options=dict(api_version="v1beta1")`, as the agent identity page does, because creating an agent identity below needs `v1beta1`. In google-genai 3.6.1 (`google/genai/_api_client.py`, which `vertexai.Client` uses), a client with a project and location defaults to `v1beta1` unless `GOOGLE_GENAI_API_VERSION` sets another version, and an explicit `http_options` is applied after that default (`patch_http_options`); `vertexai.Client` takes `http_options` in google-cloud-aiplatform 2.10.0 (`vertexai/_genai/client.py`).

```python
import vertexai
from vertexai import agent_engines # For the prebuilt templates

client = vertexai.Client(  # For service interactions via client.agent_engines
    project="PROJECT_ID",
    location="LOCATION",
    http_options=dict(api_version="v1beta1"),
)
```

### Create an agent identity before deploying code

Adapted (not in the official docs): added `from vertexai import types`, because the source uses `types.IdentityType` without importing `types` (the quickstart imports it this way, and `vertexai.types.IdentityType.AGENT_IDENTITY` exists in google-cloud-aiplatform 2.10.0).

```python
from vertexai import types

remote_app = client.agent_engines.create(
      config={
          "identity_type": types.IdentityType.AGENT_IDENTITY,
      },
)
```

Then grant the agent identity additional roles and add agent code later by updating this resource: `client.agent_engines.update(name=remote_app.api_resource.name, agent=..., config={"staging_bucket": "gs://BUCKET_NAME"})` (google-cloud-aiplatform 2.10.0 `AgentEngines.update` takes `name`, `agent` and `config`). The resource above was created without a staging bucket, and an update that passes an agent object needs one: `update` documents "ValueError: If `config.staging_bucket` was not set when `agent_engine` is specified.", so create the bucket first as in [Create a staging bucket](#create-a-staging-bucket). The source writes `agent_engine.update(...)`, where `agent_engine` is not defined on the page.

### Manually generate the default service agent

```bash
gcloud beta services identity create --service=aiplatform.googleapis.com --project=PROJECT-ID-OR-PROJECT-NUMBER
```

### Create a staging bucket

Adapted (not in the official docs): added `--project=PROJECT_ID` (a gcloud-wide flag), so the bucket is created in the project that the SDK client uses.

```bash
gcloud storage buckets create gs://BUCKET_NAME --project=PROJECT_ID --default-storage-class STORAGE_CLASS --location LOCATION
```

The source asks for `roles/storage.admin` on the project (Notes), which includes `storage.buckets.create` for creating this bucket. A principal that only deploys into an existing bucket needs a role on that bucket, not on the project: the SDK reads the bucket metadata (`storage.buckets.get`), creates the bucket only if it is not found, and writes `agent_engine.pkl`, `requirements.txt` and `dependencies.tar.gz` under `gs://BUCKET_NAME/agent_engine/` by default, overwriting the objects of an earlier deployment (`storage.objects.create` and `storage.objects.delete`). `roles/storage.legacyBucketWriter` contains these three permissions and can be granted on a bucket (`PRINCIPAL` is `user:EMAIL`, `group:EMAIL` or `serviceAccount:EMAIL`). It lets the principal overwrite or delete any object in the bucket, not only the staging objects, so grant it only on a staging bucket dedicated to one trust boundary (deployers who may change each other's agents). If several deployments share that bucket, give each its own `gcs_dir_name` in `config` (default `agent_engine`), so they do not overwrite each other's staged files.

Adapted (not in the official docs): a bucket-level grant for a principal that deploys into an existing staging bucket, in place of `roles/storage.admin` on the project.

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
  --member=PRINCIPAL \
  --role=roles/storage.legacyBucketWriter
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
  - `roles/storage.admin`: On the project, to create the staging bucket (the source names Storage Admin); deploying into an existing bucket needs only a role on that bucket (see Create a staging bucket).
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
- `roles/storage.admin` grants full control of Cloud Storage buckets and objects in the project. The source says: "Make sure the principal that is authenticated to use Gemini Enterprise Agent Platform (either yourself or a service account) has `Storage Admin` access to this bucket. This is needed because Agent Platform SDK for Python writes your code to this bucket." and "Ask your administrator to grant you the Storage Admin (`roles/storage.admin`) IAM role on your project."
- Adapted from the official docs: the bucket-level `roles/storage.legacyBucketWriter` grant is not in the source. The staging operations are from google-cloud-aiplatform 2.10.0 `vertexai/_genai/_agent_engines_utils.py` (`_get_gcs_bucket` calls `storage_client.get_bucket` and `create_bucket` only on `NotFound`; `_upload_agent_engine`, `_upload_requirements` and `_upload_extra_packages` write under `gcs_dir_name`, default `_DEFAULT_GCS_DIR_NAME = "agent_engine"`); google-cloud-agentplatform 2.10.0 `_runtimes_utils.py` is the same. The role's permissions (`storage.buckets.get`, `storage.objects.create`, `storage.objects.delete`, and others) and its description ("create, overwrite, and delete objects"; lowest-level resource: Bucket) are from https://docs.cloud.google.com/iam/docs/roles-permissions/storage; `roles/storage.objectCreator` "Does not give permission to view, delete, or overwrite objects", so it does not cover a second deployment. The command form is from `gcloud storage buckets add-iam-policy-binding --help` (gcloud 593.0.0).
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
- Adapted from the official docs: the source writes `pip install google-adk[a2a]` unquoted.
- Adapted from the official docs: the setup client was `vertexai.Client(project="PROJECT_ID", location="LOCATION")` without `http_options`.

## Related

- [runtime.md](./runtime.md)
- [quickstart-adk.md](./quickstart-adk.md)
- [create-an-adk-agent.md](./create-an-adk-agent.md)
