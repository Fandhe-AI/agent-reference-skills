---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/quickstart-adk
---

# Quickstart: develop and deploy an ADK agent on Agent Runtime

Create, deploy and test a currency exchange agent built with ADK on Agent Runtime: install the Agent Platform SDK for Python and ADK, develop the agent, deploy it as a `reasoningEngine` resource, test it, and clean up.

## Signature / Usage

### Install and initialize

Adapted (not in the official docs): the requirement is quoted because an unquoted `>=1.112` is parsed by the shell as an output redirection to a file named `=1.112`.

```bash
pip install --upgrade --quiet "google-cloud-aiplatform[agent_engines,adk]>=1.112"
```

```bash
gcloud auth application-default login
```

Adapted (not in the official docs): added `http_options=dict(api_version="v1beta1")`, which the deploy step's `types.IdentityType.AGENT_IDENTITY` needs (agent-identity.md in the agent-identity-registry category), so the version does not depend on `GOOGLE_GENAI_API_VERSION` (setup.md).

```python
import vertexai

client = vertexai.Client(
    project="PROJECT_ID",               # Your project ID.
    location="LOCATION",                # Your cloud region.
    http_options=dict(api_version="v1beta1"),
)
```

### Develop the agent

Adapted (not in the official docs): added `timeout=10` to `requests.get` and `response.raise_for_status()` before `response.json()`, so a hung or failing exchange-rate service fails the tool call instead of blocking it or passing an error body to the model as rate data. Also, `currency_date` is checked to be `latest` or a `YYYY-MM-DD` date (`datetime.datetime.strptime(currency_date, "%Y-%m-%d")` raises `ValueError` otherwise) and the parsed date, normalized with `.date().isoformat()` (for example `2023-1-5` becomes `2023-01-05`), is what goes in the URL path, so a model-supplied value cannot point the request at another path or query and the request always uses the `YYYY-MM-DD` form. `currency_from` and `currency_to` are normalized with `.strip().upper()` and must each be three ASCII letters (`len(code) == 3 and code.isascii() and code.isalpha()`, `ValueError` otherwise, as for an invalid date), so the request carries only a single 3-letter currency code in each parameter.
```python
def get_exchange_rate(
    currency_from: str = "USD",
    currency_to: str = "EUR",
    currency_date: str = "latest",
):
    """Retrieves the exchange rate between two currencies on a specified date."""
    import datetime
    import requests

    currency_from = currency_from.strip().upper()
    currency_to = currency_to.strip().upper()
    for code in (currency_from, currency_to):
        if not (len(code) == 3 and code.isascii() and code.isalpha()):
            raise ValueError(f"Invalid currency code: {code!r}")
    if currency_date != "latest":
        currency_date = datetime.datetime.strptime(
            currency_date, "%Y-%m-%d"
        ).date().isoformat()

    response = requests.get(
        f"https://api.frankfurter.app/{currency_date}",
        params={"from": currency_from, "to": currency_to},
        timeout=10,
    )
    response.raise_for_status()
    return response.json()
```

Before you run the next block, `unset GOOGLE_CLOUD_LOCATION` in the shell or set it to the same `LOCATION`: `set_up` keeps an existing value and the model calls use it (not in the official docs; Notes).

Adapted (not in the official docs): added `import vertexai` and `vertexai.init(project="PROJECT_ID", location="LOCATION")` before the `AdkApp` is created, because the local `AdkApp` does not use `client` and takes its project and location from the global configuration (Notes).

```python
import vertexai
from google.adk.agents import Agent
from vertexai import agent_engines

vertexai.init(project="PROJECT_ID", location="LOCATION")

agent = Agent(
    model="gemini-3.5-flash",
    name='currency_exchange_agent',
    tools=[get_exchange_rate],
)

app = agent_engines.AdkApp(agent=agent)
```

Before the local test (not in the official docs), enable the API with `gcloud services enable aiplatform.googleapis.com --project=PROJECT_ID`.

Test locally (in-memory sessions):

```python
async for event in app.async_stream_query(
    user_id="USER_ID",
    message="What is the exchange rate from US dollars to SEK today?",
):
    print(event)
```

### Deploy

Before you deploy, make sure the Agent Platform API (`aiplatform.googleapis.com`) is enabled in the project (see the local test step), which needs the `serviceusage.services.enable` permission (Notes), and create the Cloud Storage bucket `gs://BUCKET_NAME` that you pass as `staging_bucket` (steps in [Create a staging bucket](setup.md#create-a-staging-bucket)). The source's Before you begin section shows only the note on the enable permission, not a command; with gcloud, the command shown on other pages of the source is `gcloud services enable aiplatform.googleapis.com`; run it as `gcloud services enable aiplatform.googleapis.com --project=PROJECT_ID` (not in the official docs), so the API is enabled in the `PROJECT_ID` that the SDK client uses. These examples set only `staging_bucket`, so the SDK writes the deployment artifacts under its default `agent_engine/` prefix (`_DEFAULT_GCS_DIR_NAME` in google-cloud-aiplatform and google-cloud-agentplatform 2.10.0), where a later deployment to the same bucket overwrites them: use a bucket dedicated to this deployment, or add a unique `"gcs_dir_name"` to `config` for each deployment ([Create a staging bucket](setup.md#create-a-staging-bucket)).

Adapted (not in the official docs): `"STAGING_BUCKET"` is written as `"gs://BUCKET_NAME"` (the bucket from [Create a staging bucket](setup.md#create-a-staging-bucket)), because google-cloud-aiplatform 2.10.0 rejects a value without the prefix (Notes).

```python
from vertexai import types

remote_agent = client.agent_engines.create(
    agent=app,
    config={
        "requirements": ["google-cloud-aiplatform[agent_engines,adk]"],
        "staging_bucket": "gs://BUCKET_NAME",
        "identity_type": types.IdentityType.AGENT_IDENTITY,
    }
)
```

### Use the deployed agent

This example is for a single user (not in the official docs). In a shared service, set `user_id` on the server side from the authenticated principal, not from a value the client sends, and use an existing `session_id` only after confirming that the session's `user_id` matches it, and grant the runtime's query permission (such as `aiplatform.reasoningEngines.query`) and the `aiplatform.sessions.*` permissions only to the backend's service identity, not to end users, so that every call goes through this check (see use-an-agent.md in agent-runtime-deploy-manage).

```python
async for event in remote_agent.async_stream_query(
    user_id="USER_ID",
    message="What is the exchange rate from US dollars to SEK today?",
):
    print(event)
```

### Clean up

This deletes the Agent Runtime instance created by the quickstart. `force=True` also deletes its child resources (sessions and memories), such as the session the query above created; without it the call fails with `FAILED_PRECONDITION` while any remain (google-cloud-aiplatform 2.10.0, `vertexai/_genai/types/common.py`). This runtime was created by this quickstart, so `force=True` deletes only its own sessions and memories; do not use `force=True` on a runtime that others use. This cannot be undone.

```python
remote_agent.delete(force=True)
```

## Notes

- `PROJECT_ID`: Google Cloud project ID under which you develop and deploy agents.
- `LOCATION`: One of the supported regions for Agent Runtime.
- `USER_ID`: User-defined ID with a character limit of 128.
- `BUCKET_NAME`: the staging bucket name; `staging_bucket` takes it prefixed by `gs://`.
- Required roles:
  - `roles/aiplatform.user`: Agent Platform User.
  - `roles/storage.admin`: Storage Admin, on the project, to create the staging bucket. To deploy into an existing bucket, a role on that bucket with `storage.buckets.get`, `storage.objects.create` and `storage.objects.delete` (such as `roles/storage.legacyBucketWriter`) is enough; see [Create a staging bucket](setup.md#create-a-staging-bucket).
  - `roles/serviceusage.serviceUsageAdmin`: Only if you lack `serviceusage.services.enable` to enable APIs.
- Top-level `async for` (as the source writes it) runs in a notebook such as Colab, which the source covers for authentication; in a plain Python script, put them inside an `async def` function and run it with `asyncio.run(...)`.
- Deploying an ADK agent automatically generates a managed session resource; it is deleted together with the agent in the clean-up step.
- `delete(force=True)` is destructive and irreversible; try the quickstart in a disposable project first.
- `roles/storage.admin` grants full control of Cloud Storage buckets and objects in the project. The source says "ask your administrator to grant you the following IAM roles on your project" and lists Agent Platform User (`roles/aiplatform.user`) and Storage Admin (`roles/storage.admin`); the bucket-level alternative is not in the source (see setup.md for the SDK staging operations it is based on).
- Adapted from the official docs: the source writes `pip install --upgrade --quiet google-cloud-aiplatform[agent_engines,adk]>=1.112` unquoted.
- The source also links alternative quickstarts: the ADK quickstart (runs entirely locally) and the Agent Starter Pack (production-ready agent templates).
- The source also shows Colab and Cloud Shell authentication (Cloud Shell needs no action).
- Corrected from the official docs: `get_exchange_rate` called `requests.get(f"https://api.frankfurter.app/{currency_date}", params={"from": currency_from, "to": currency_to})` with no timeout and returned `response.json()` without checking the HTTP status.
- Corrected from the official docs: `get_exchange_rate` put `currency_date` into the URL path (`f"https://api.frankfurter.app/{currency_date}"`) without checking it.
- Corrected from the official docs: `get_exchange_rate` put the model-supplied `currency_date` in the URL as given; the example validates it with `strptime("%Y-%m-%d")`, which also accepts dates without zero padding such as `2023-1-5`, so it sends the normalized `date().isoformat()` value.
- Corrected from the official docs: the client was `vertexai.Client(project="PROJECT_ID", location="LOCATION")` without `http_options`; `vertexai.Client` takes `http_options` in google-cloud-aiplatform 2.10.0 (`vertexai/_genai/client.py`).
- Local `AdkApp` settings (google-cloud-aiplatform 2.10.0): `AdkApp.__init__` (`vertexai/agent_engines/templates/adk.py`) stores `initializer.global_config.project` and `.location`. Without `vertexai.init(project=..., location=...)`, `initializer.py` resolves the project from `GOOGLE_CLOUD_PROJECT` / `CLOUD_ML_PROJECT_ID` or `google.auth.default()` and the location from `GOOGLE_CLOUD_REGION` / `CLOUD_ML_REGION`, else `us-central1`; it does not read `GOOGLE_CLOUD_LOCATION`. `set_up` then sets `GOOGLE_CLOUD_PROJECT` to the stored project, sets `GOOGLE_CLOUD_LOCATION` to the stored location only if it is not set yet, and sets `GOOGLE_GENAI_USE_VERTEXAI` and `GOOGLE_GENAI_USE_ENTERPRISE` to `"1"`, so model calls go to Agent Platform. google-genai 3.6.1 reads those four variables (`_api_client.py`). `vertexai.init` is `google.cloud.aiplatform.init` (keyword arguments `project`, `location`).
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/quickstart-adk (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the `AdkApp` example started at `from google.adk.agents import Agent` and did not call `vertexai.init`.
- Adapted from the official docs: the source writes `"staging_bucket": "STAGING_BUCKET"` (defined as "Cloud Storage bucket prefixed by `gs://`"). In google-cloud-aiplatform 2.10.0, `client.agent_engines.create` calls `_validate_staging_bucket_or_raise` (`vertexai/_genai/_agent_engines_utils.py`), which raises `ValueError` unless the value starts with `gs://`.
- Corrected from the official docs: `get_exchange_rate` passed the model-supplied `currency_from` and `currency_to` to the request unchecked, although the create-an-adk-agent docstring describes each as "(3-letter currency code)"; the example normalizes them with `.strip().upper()` and raises `ValueError` unless each is three ASCII letters.

## Related

- [setup.md](./setup.md)
- [create-an-adk-agent.md](./create-an-adk-agent.md)
- [runtime.md](./runtime.md)
