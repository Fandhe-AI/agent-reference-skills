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

```python
import vertexai

client = vertexai.Client(
    project="PROJECT_ID",               # Your project ID.
    location="LOCATION",                # Your cloud region.
)
```

### Develop the agent

Adapted (not in the official docs): added `timeout=10` to `requests.get` and `response.raise_for_status()` before `response.json()`, so a hung or failing exchange-rate service fails the tool call instead of blocking it or passing an error body to the model as rate data. Also, `currency_date` is checked to be `latest` or a `YYYY-MM-DD` date (`datetime.datetime.strptime(currency_date, "%Y-%m-%d")` raises `ValueError` otherwise) before it is put in the URL path, so a model-supplied value cannot point the request at another path or query.
```python
def get_exchange_rate(
    currency_from: str = "USD",
    currency_to: str = "EUR",
    currency_date: str = "latest",
):
    """Retrieves the exchange rate between two currencies on a specified date."""
    import datetime
    import requests

    if currency_date != "latest":
        datetime.datetime.strptime(currency_date, "%Y-%m-%d")

    response = requests.get(
        f"https://api.frankfurter.app/{currency_date}",
        params={"from": currency_from, "to": currency_to},
        timeout=10,
    )
    response.raise_for_status()
    return response.json()
```

```python
from google.adk.agents import Agent
from vertexai import agent_engines

agent = Agent(
    model="gemini-3.5-flash",
    name='currency_exchange_agent',
    tools=[get_exchange_rate],
)

app = agent_engines.AdkApp(agent=agent)
```

Test locally (in-memory sessions):

```python
async for event in app.async_stream_query(
    user_id="USER_ID",
    message="What is the exchange rate from US dollars to SEK today?",
):
    print(event)
```

### Deploy

```python
from vertexai import types

remote_agent = client.agent_engines.create(
    agent=app,
    config={
        "requirements": ["google-cloud-aiplatform[agent_engines,adk]"],
        "staging_bucket": "STAGING_BUCKET",
        "identity_type": types.IdentityType.AGENT_IDENTITY,
    }
)
```

### Use the deployed agent

```python
async for event in remote_agent.async_stream_query(
    user_id="USER_ID",
    message="What is the exchange rate from US dollars to SEK today?",
):
    print(event)
```

### Clean up

This deletes the Agent Runtime instance created by the quickstart. It passes `force=True`, which also deletes the child resources (sessions and memories) of the instance; this cannot be undone.

```python
remote_agent.delete(force=True)
```

## Notes

- `PROJECT_ID`: Google Cloud project ID under which you develop and deploy agents.
- `LOCATION`: One of the supported regions for Agent Runtime.
- `USER_ID`: User-defined ID with a character limit of 128.
- `STAGING_BUCKET`: Cloud Storage bucket prefixed by `gs://`.
- Required roles:
  - `roles/aiplatform.user`: Agent Platform User.
  - `roles/storage.admin`: Storage Admin.
  - `roles/serviceusage.serviceUsageAdmin`: Only if you lack `serviceusage.services.enable` to enable APIs.
- Top-level `async for` (as the source writes it) runs in a notebook such as Colab, which the source covers for authentication; in a plain Python script, put them inside an `async def` function and run it with `asyncio.run(...)`.
- Deploying an ADK agent automatically generates a managed session resource; it is deleted together with the agent in the clean-up step.
- `delete(force=True)` is destructive and irreversible; try the quickstart in a disposable project first.
- `roles/storage.admin` grants full control of Cloud Storage buckets and objects in the project.
- Adapted from the official docs: the source writes `pip install --upgrade --quiet google-cloud-aiplatform[agent_engines,adk]>=1.112` unquoted.
- The source also links alternative quickstarts: the ADK quickstart (runs entirely locally) and the Agent Starter Pack (production-ready agent templates).
- The source also shows Colab and Cloud Shell authentication (Cloud Shell needs no action).
- Corrected from the official docs: `get_exchange_rate` called `requests.get(f"https://api.frankfurter.app/{currency_date}", params={"from": currency_from, "to": currency_to})` with no timeout and returned `response.json()` without checking the HTTP status.
- Corrected from the official docs: `get_exchange_rate` put `currency_date` into the URL path (`f"https://api.frankfurter.app/{currency_date}"`) without checking it.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/quickstart-adk (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup.md](./setup.md)
- [create-an-adk-agent.md](./create-an-adk-agent.md)
- [runtime.md](./runtime.md)
