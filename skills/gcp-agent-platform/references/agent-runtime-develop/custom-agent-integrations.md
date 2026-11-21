---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent
---

# Custom agent: tracing, environment variables, Secret Manager and credentials

Optional integrations for a custom agent class on Agent Runtime: send traces to Cloud Trace with OpenTelemetry instrumentation in `set_up`, read environment variables, fetch secrets from Secret Manager, and handle ADC, OAuth and external identity provider credentials.

## Signature / Usage

### Send traces to Cloud Trace (OpenInference)

```bash
pip install openinference-instrumentation-langchain==0.1.34
```

```python
from typing import Callable, Sequence

class CLASS_NAME:
    def __init__(
        self,
        model: str,
        tools: Sequence[Callable],
        project: str,
        location: str,
    ):
        self.model_name = model
        self.tools = tools
        self.project = project
        self.location = location

    def set_up(self):
        # The additional code required for tracing instrumentation.
        from opentelemetry import trace
        from opentelemetry.exporter.cloud_trace import CloudTraceSpanExporter
        from opentelemetry.sdk.trace import TracerProvider
        from opentelemetry.sdk.trace.export import SimpleSpanProcessor
        from openinference.instrumentation.langchain import LangChainInstrumentor
        import google.cloud.trace_v2 as cloud_trace_v2
        import google.auth

        credentials, _ = google.auth.default()

        trace.set_tracer_provider(TracerProvider())
        cloud_trace_exporter = CloudTraceSpanExporter(
            project_id=self.project,
            client=cloud_trace_v2.TraceServiceClient(
                credentials=credentials.with_quota_project(self.project),
            ),
        )
        trace.get_tracer_provider().add_span_processor(
            SimpleSpanProcessor(cloud_trace_exporter)
        )
        LangChainInstrumentor().instrument()
        # end of additional code required

        import vertexai
        from langchain_google_vertexai import ChatVertexAI
        from langgraph.prebuilt import create_react_agent

        vertexai.init(project=self.project, location=self.location)

        model = ChatVertexAI(model_name=self.model_name)
        self.graph = create_react_agent(model, tools=self.tools)

    def query(self, **kwargs):
        return self.graph.invoke(**kwargs)
```

OpenLLMetry alternative package:

```bash
pip install opentelemetry-instrumentation-langchain==0.38.10
```

### Secret Manager

```bash
pip install google-cloud-secret-manager
```

Adapted (not in the official docs): removed `self.secret_id = secret_id` because `secret_id` is not a parameter of `__init__` (it raises `NameError`) and the secret name is written out in `set_up`.

```python
from typing import Callable, Sequence

class CLASS_NAME:
    def __init__(
        self,
        model: str,
        tools: Sequence[Callable],
        project: str,
    ):
        self.model_name = model
        self.tools = tools
        self.project = project

    def set_up(self):
        from google.cloud import secretmanager
        from langchain_anthropic import ChatAnthropic
        from langgraph.prebuilt import create_react_agent

        # Get the API Key from Secret Manager here.
        self.secret_manager_client = secretmanager.SecretManagerServiceClient()
        secret_version = self.secret_manager_client.access_secret_version(request={
            "name": "projects/PROJECT_ID/secrets/SECRET_ID/versions/SECRET_VERSION",
        })
        # Use the API Key from Secret Manager here.
        model = ChatAnthropic(
            model_name=self.model_name,
            model_kwargs={"api_key": secret_version.payload.data.decode()},  # <- new
        )
        self.graph = create_react_agent(model, tools=self.tools)

    def query(self, **kwargs):
        return self.graph.invoke(**kwargs)
```

### Application default credentials

```python
import google.auth

credentials, project = google.auth.default(
    scopes=["https://www.googleapis.com/auth/cloud-platform"]
)
```

Adapted (not in the official docs): removed the default value `= "meta/llama3-405b-instruct-maas"` from `model`, because a parameter with a default cannot precede parameters without defaults (`SyntaxError`), and added `import google.auth.transport.requests`, because `import google.auth` alone does not load the `transport.requests` submodule that `creds.refresh(...)` uses; pass the model name when instantiating.

```python
from typing import Callable, Sequence

class CLASS_NAME:
    def __init__(
        self,
        model: str,
        tools: Sequence[Callable],
        location: str,
        project: str,
    ):
        self.model_name = model
        self.tools = tools
        self.project = project
        self.endpoint = f"https://{location}-aiplatform.googleapis.com"
        self.base_url = f'{self.endpoint}/v1beta1/projects/{project}/locations/{location}/endpoints/openapi'

    def query(self, **kwargs):
        import google.auth
        import google.auth.transport.requests
        from langchain_openai import ChatOpenAI
        from langgraph.prebuilt import create_react_agent

        # Note: the credential lives for 1 hour by default.
        # After expiration, it must be refreshed.
        creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
        creds.refresh(google.auth.transport.requests.Request())

        model = ChatOpenAI(
            model=self.model_name,
            base_url=self.base_url,
            api_key=creds.token,  # Use the token from the credentials here.
        )
        graph = create_react_agent(model, tools=self.tools)
        return graph.invoke(**kwargs)
```

### OAuth

Adapted (not in the official docs): added `import google.oauth2.credentials`, because the source uses `google.oauth2.credentials.Credentials` without importing it.

```python
import google.oauth2.credentials

credentials = google.oauth2.credentials.Credentials(
    token="ACCESS_TOKEN",
    refresh_token="REFRESH_TOKEN",  # Optional
    token_uri="TOKEN_URI",          # E.g. "https://oauth2.googleapis.com/token"
    client_id="CLIENT_ID",          # Optional
    client_secret="CLIENT_SECRET"   # Optional
)
```

Adapted (not in the official docs): `client.access_secret_version` changed to `secret_manager_client.access_secret_version`, because `client` is never defined (the client is assigned to `secret_manager_client`), and added `import google.oauth2.credentials`, because the module-level annotation `google.oauth2.credentials.Credentials` is evaluated and the source does not import it.

```python
from google.cloud import secretmanager
from google_auth_oauthlib.flow import InstalledAppFlow
import google.oauth2.credentials
import json

# Get the client config from Secret Manager here.
secret_manager_client = secretmanager.SecretManagerServiceClient()
secret_version = secret_manager_client.access_secret_version(request={
    "name": "projects/PROJECT_ID/secrets/SECRET_ID/versions/SECRET_VERSION",
})
client_config = json.loads(secret_version.payload.data.decode())

# Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
flow = InstalledAppFlow.from_client_config(
    client_config,
    scopes=['https://www.googleapis.com/auth/cloud-platform'],
    state="OAUTH_FLOW_STATE"  # from flow.authorization_url(...)
)

# You can get the credentials from the flow object.
credentials: google.oauth2.credentials.Credentials = flow.credentials

# After obtaining the credentials, you can then authorize API requests on behalf
# of the given user or service account. For example, to authorize API requests
# to vertexai services, you'll specify it in vertexai.init(credentials=)
import vertexai

vertexai.init(
    project="PROJECT_ID",
    location="LOCATION",
    credentials=credentials, # specify the credentials here
)
```

## Notes

- Credential types:
  - Application default credentials (ADC) (Service accounts): `google.auth.default(scopes=[...])`; the token lives for 1 hour by default and must be refreshed.
  - OAuth (User accounts): `google.oauth2.credentials.Credentials` from an access token, or `google_auth_oauthlib.flow` for the OAuth 2.0 Authorization Grant Flow; `TOKEN_URI`, `CLIENT_ID`, `CLIENT_SECRET` come from the OAuth client credential.
  - Identity providers (External accounts (workload identity federation)): Identity Platform, Firebase Authentication or any OIDC provider.
- Roles:
  - `roles/secretmanager.secretAccessor`: Grant to the agent's service account (through the Google Cloud console) to read secrets.
- Tracing: import and initialize OpenTelemetry instrumentation in `.set_up`. The OpenLLMetry variant installs `opentelemetry-instrumentation-langchain==0.38.10` and replaces the instrumentor lines with `from opentelemetry.instrumentation.langchain import LangchainInstrumentor` and `LangchainInstrumentor().instrument()`; the rest of the class is unchanged. Source mentions OpenTelemetry Google Cloud Integration combined with OpenInference or OpenLLMetry.
- Environment variables: make them available through `os.environ` during development and define them at deployment time (see the deploy guide, "Define environment variables").
- Secret Manager: the source's template carries `self.secret_id = secret_id`, which is undefined; replaced in the Adapted block above.
- The OAuth blocks use uppercase placeholders (`ACCESS_TOKEN`, `REFRESH_TOKEN`, `CLIENT_SECRET`); never hardcode real tokens or client secrets, keep them in Secret Manager as the flow example does.
- Corrected from the official docs: the ADC template had `model: str = "meta/llama3-405b-instruct-maas",` before non-default parameters and `import google.auth` without `import google.auth.transport.requests`; the Secret Manager template had `self.secret_id = secret_id # <- new`; the OAuth snippets used `google.oauth2.credentials` without an import, and the flow used `secret_version = client.access_secret_version(request={`.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-a-custom-agent.md](./create-a-custom-agent.md)
- [setup.md](./setup.md)
