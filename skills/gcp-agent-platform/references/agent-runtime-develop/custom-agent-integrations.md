---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent
---

# Custom agent: tracing, environment variables, Secret Manager and credentials

Optional integrations for a custom agent class on Agent Runtime: send traces to Cloud Trace with OpenTelemetry instrumentation in `set_up`, read environment variables, fetch secrets from Secret Manager, and handle ADC, OAuth and external identity provider credentials.

## Signature / Usage

### Send traces to Cloud Trace (OpenInference)

Adapted (not in the official docs): added `"openinference-instrumentation>=0.1.82"`, so an environment that already has openinference-instrumentation 0.1.17 (the minimum that openinference-instrumentation-langchain 0.1.34 accepts) is upgraded to a version in which `hide_inputs=True` also masks the `llm.prompts` attribute. Also added `opentelemetry-exporter-gcp-trace`, the distribution that provides `opentelemetry.exporter.cloud_trace` imported in `set_up` below (see Notes). Put the same packages in the deployment `requirements` so that `set_up` can import them in Agent Runtime.

```bash
pip install openinference-instrumentation-langchain==0.1.34 "openinference-instrumentation>=0.1.82" opentelemetry-exporter-gcp-trace
```

The class below also imports `langchain_google_vertexai` and `langgraph.prebuilt`: install `langchain-google-vertexai` and `langgraph` as well (PyPI distribution names; see Notes). List the same packages in the deployment `requirements` (see deploy-an-agent-configuration.md in the agent-runtime-deploy-manage category) so that `set_up` can import them in Agent Runtime.

The exporter writes spans to the project `self.project` as the principal that `google.auth.default()` returns when the agent runs (the identity the agent is deployed with: agent identity, the default service agent or a custom service account; see setup.md). That principal needs Cloud Trace Agent (`roles/cloudtrace.agent`) on `self.project` (not in the official docs); otherwise authentication succeeds but the span export fails. The example (as the source writes it) also sets `self.project` as the quota project with `credentials.with_quota_project(self.project)`, so the principal also needs `serviceusage.services.use` there (Service Usage Consumer, `roles/serviceusage.serviceUsageConsumer`), unless it created that project.

`hide_inputs` and `hide_outputs` mask only those attributes (not in the official docs). Other span attributes can still carry sensitive values: openinference-instrumentation-langchain 0.1.34 also writes the LangChain run metadata as JSON to `metadata` and its `session_id`, `conversation_id` or `thread_id` value to `session.id`, records exceptions on the span, and `llm.invocation_parameters` is kept unless `hide_llm_invocation_parameters` is set. If the agent handles sensitive data, export only attributes you allowlist, for example with a span exporter or processor that drops every other attribute before `CloudTraceSpanExporter`.

Adapted (not in the official docs): added `from openinference.instrumentation import TraceConfig` and passed `config=TraceConfig(hide_inputs=True, hide_outputs=True)` to `LangChainInstrumentor().instrument()`, so the OpenInference input and output span attributes (such as `input.value`, `output.value`, `llm.input_messages`, `llm.output_messages`, `llm.prompts`; full list in Notes) are redacted or dropped before the spans reach Cloud Trace.

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
        from openinference.instrumentation import TraceConfig
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
        LangChainInstrumentor().instrument(
            config=TraceConfig(hide_inputs=True, hide_outputs=True)
        )
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

OpenLLMetry alternative package. It records prompts and completions in spans by default; disable that content tracing as well by setting the environment variable `TRACELOOP_TRACE_CONTENT` to `false` for the deployed agent:

```bash
pip install opentelemetry-instrumentation-langchain==0.38.10
```

### Secret Manager

```bash
pip install google-cloud-secret-manager
```

The class below also imports `langchain_anthropic` and `langgraph.prebuilt`: install `langchain-anthropic` and `langgraph` as well. List the same packages in the deployment `requirements` (see deploy-an-agent-configuration.md in the agent-runtime-deploy-manage category) so that `set_up` can import them in Agent Runtime.

Adapted (not in the official docs): removed `self.secret_id = secret_id` because `secret_id` is not a parameter of `__init__` (it raises `NameError`) and the secret name is written out in `set_up`. Moved the key from `model_kwargs={"api_key": ...}` to the `api_key=` constructor argument, because langchain-anthropic 1.7.12 reads the client key from the `anthropic_api_key` field (alias `api_key`) and sends `model_kwargs` as request parameters.

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
            api_key=secret_version.payload.data.decode(),  # <- new
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

The class below imports `langchain_openai` and `langgraph.prebuilt`: install `langchain-openai` and `langgraph` (`google.auth` comes with the Agent Platform SDK). List the same packages in the deployment `requirements` (see deploy-an-agent-configuration.md in the agent-runtime-deploy-manage category) so that `set_up` can import them in Agent Runtime.

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

## Notes

- Credential types:
  - Application default credentials (ADC) (Service accounts): `google.auth.default(scopes=[...])`; the token lives for 1 hour by default and must be refreshed.
  - OAuth (User accounts): `google.oauth2.credentials.Credentials` from an access token, or `google_auth_oauthlib.flow` for the OAuth 2.0 Authorization Grant Flow (example omitted, see below); `TOKEN_URI`, `CLIENT_ID`, `CLIENT_SECRET` come from the OAuth client credential.
  - Identity providers (External accounts (workload identity federation)): Identity Platform, Firebase Authentication or any OIDC provider.
- Roles:
  - `roles/secretmanager.secretAccessor`: The source says to grant it to "the agent's service account" (through the Google Cloud console). `SecretManagerServiceClient()` uses the runtime's ADC, so grant it, on each secret the agent reads, to the principal the agent actually runs as (not in the official docs): its agent identity (`principal://agents.global.org-ORGANIZATION_ID.system.id.goog/resources/aiplatform/projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/AGENT_ENGINE_ID`), the default service agent (`service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com`) or the custom service account.
  - `roles/cloudtrace.agent` (Cloud Trace Agent; not in the official docs for this page): Grant to the principal the agent runs as, on the project the exporter writes to (`self.project`), for the Cloud Trace example. The IAM roles-permissions page for `cloudtrace` (https://docs.cloud.google.com/iam/docs/roles-permissions/cloudtrace) describes it as "For service accounts. Provides ability to write traces by sending the data to Stackdriver Trace" and lists the permissions `cloudtrace.traces.patch` and `telemetry.traces.write`.
- Tracing: import and initialize OpenTelemetry instrumentation in `.set_up`. The OpenLLMetry variant installs `opentelemetry-instrumentation-langchain==0.38.10` and replaces the instrumentor lines with `from opentelemetry.instrumentation.langchain import LangchainInstrumentor` and `LangchainInstrumentor().instrument()`; the rest of the class is unchanged. `TraceConfig` belongs to OpenInference and does not apply to it: in opentelemetry-instrumentation-langchain 0.38.10, `should_send_prompts()` (`opentelemetry/instrumentation/langchain/utils.py`) reads `os.getenv("TRACELOOP_TRACE_CONTENT") or "true"`, and the package README says "To disable logging, set the `TRACELOOP_TRACE_CONTENT` environment variable to `false`." Source mentions OpenTelemetry Google Cloud Integration combined with OpenInference or OpenLLMetry.
- Environment variables: make them available through `os.environ` during development and define them at deployment time (see the deploy guide, "Define environment variables").
- Secret Manager: the source's template carries `self.secret_id = secret_id`, which is undefined; replaced in the Adapted block above.
- The source's `google_auth_oauthlib.flow` (`InstalledAppFlow.from_client_config`) example is omitted: as written it reads `flow.credentials` without a token exchange (google-auth-oauthlib 1.5.0, `google_auth_oauthlib/flow.py`: ":meth:`fetch_token` must be called before accessing this") and does not verify the `state` returned to the callback. Follow the OAuth 2.0 web server flow at https://developers.google.com/identity/protocols/oauth2/web-server (verify `state` before exchanging the code), and keep the client config in Secret Manager as the source shows.
- The OAuth block uses uppercase placeholders (`ACCESS_TOKEN`, `REFRESH_TOKEN`, `CLIENT_SECRET`); never hardcode real tokens or client secrets, keep them in Secret Manager.
- Adapted from the official docs: the OpenInference template called `LangChainInstrumentor().instrument()` with no trace configuration, so span attributes carry the conversation and tool payloads to Cloud Trace. `TraceConfig` and its fields `hide_inputs` ("Hides input value & messages") and `hide_outputs` ("Hides output value & messages") are defined in `openinference/instrumentation/config.py` of openinference-instrumentation 0.1.17 (the minimum that openinference-instrumentation-langchain 0.1.34 requires, `openinference-instrumentation>=0.1.17`) and 0.1.82 (latest, which also hides input images and documents); openinference-instrumentation-langchain 0.1.34 and 0.1.89 read `kwargs.get("config")` in `LangChainInstrumentor._instrument` and pass it to `OITracer`. Without code changes, the same fields read the environment variables `OPENINFERENCE_HIDE_INPUTS` and `OPENINFERENCE_HIDE_OUTPUTS`. In 0.1.17, `hide_inputs` does not mask the `llm.prompts` attribute; 0.1.82 does (`(self.hide_inputs or self.hide_prompts) and SpanAttributes.LLM_PROMPTS in key`), so use openinference-instrumentation 0.1.82 or later. Prompts and tool payloads can contain credentials or personal data; restrict who can read Cloud Trace in the project.
- Corrected from the official docs: the ADC template had `model: str = "meta/llama3-405b-instruct-maas",` before non-default parameters and `import google.auth` without `import google.auth.transport.requests`; the Secret Manager template had `self.secret_id = secret_id # <- new`; the OAuth access-token snippet used `google.oauth2.credentials` without an import; the Secret Manager template passed `model_kwargs={"api_key": secret_version.payload.data.decode()},  # <- new`, and in langchain-anthropic 1.7.12 (`langchain_anthropic/chat_models.py`) the client key is `anthropic_api_key: SecretStr = Field(default=SecretStr(""), alias="api_key")` while `model_kwargs` is merged into the request payload (`**self.model_kwargs`).
- Attributes that `TraceConfig(hide_inputs=True, hide_outputs=True)` masks in openinference-instrumentation 0.1.82 (`TraceConfig.mask` in `openinference/instrumentation/config.py`, applied in `_spans.py` when an attribute is set; attribute names from openinference-semantic-conventions 0.1.46): replaced with `__REDACTED__`: `input.value`, `output.value`, `llm.prompts`, `llm.choices`, retrieval document contents, the reranker query; dropped: every `llm.input_messages.*` and `llm.output_messages.*` attribute, `input.mime_type`, `output.mime_type`, `llm.tools`, `input.documents`, `output.documents`, reranker input / output documents, input and output images. The field docstrings are "Hides input value, input images, input documents & messages" and "Hides output value, output images, output documents & messages". Not masked by these two fields: `metadata` (openinference-instrumentation-langchain 0.1.34 `_tracer.py` yields `METADATA, safe_json_dumps(metadata)`), `session.id`, `llm.invocation_parameters` (only with `hide_llm_invocation_parameters`), span names and exception events (`span.record_exception`).
- Corrected from the official docs: the install command was `pip install openinference-instrumentation-langchain==0.1.34` only; its dependency `openinference-instrumentation>=0.1.17` (METADATA `Requires-Dist`, no upper bound) allows 0.1.17, in which `hide_inputs` does not mask `llm.prompts` (see the TraceConfig note above).
- Corrected from the official docs: the same install command did not install the Cloud Trace exporter that `set_up` imports (`from opentelemetry.exporter.cloud_trace import CloudTraceSpanExporter`). The PyPI distribution `opentelemetry-exporter-gcp-trace` (1.15.0 checked 2026-11-21) contains `opentelemetry/exporter/cloud_trace/__init__.py` with `class CloudTraceSpanExporter` and requires `google-cloud-trace~=1.1` (module `google.cloud.trace_v2`, also imported in `set_up`), `opentelemetry-api~=1.30` and `opentelemetry-sdk~=1.30` (modules `opentelemetry.trace` and `opentelemetry.sdk.trace`). Neither the `agent_engines` extra of google-cloud-aiplatform 2.10.0 nor the `agent-engines` extra of google-cloud-agentplatform 2.10.0 lists it. The remaining imports of the template are `google.auth` (google-auth, a dependency of both SDKs), `vertexai` (google-cloud-aiplatform), `langgraph.prebuilt` (`langgraph`, pulled in by the `langchain` extra of google-cloud-aiplatform 2.10.0) and `langchain_google_vertexai`, whose package `langchain-google-vertexai` is in none of those extras (the deploy guide lists it among the packages to pin); install it too.
- Packages for the framework imports (wheels checked on PyPI 2026-11-21): `langchain_google_vertexai` is in `langchain-google-vertexai` (3.3.0; its `__init__.py` exports `ChatVertexAI` and marks it `# Deprecated` in `__all__`), `langchain_anthropic` in `langchain-anthropic` (1.7.12), `langchain_openai` in `langchain-openai` (1.8.5), and `langgraph.prebuilt` in `langgraph-prebuilt`, which `langgraph` 1.2.24 requires (`langgraph-prebuilt<1.2.0,>=1.1.3`). `google.cloud.secretmanager` is in `google-cloud-secret-manager` (2.32.0) and `google.cloud.trace_v2` in `google-cloud-trace` (1.21.0). Of these, only `langgraph` is pulled in by an SDK extra (the `langchain` extra of google-cloud-aiplatform 2.10.0); the official page installs none of the framework packages.
- Quota project permission: a principal needs `serviceusage.services.use` (in `roles/serviceusage.serviceUsageConsumer`) on a quota project it did not create (Google Cloud authentication docs, https://docs.cloud.google.com/docs/authentication/client-libraries; role contents from https://docs.cloud.google.com/iam/docs/roles-permissions/serviceusage).
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-a-custom-agent.md](./create-a-custom-agent.md)
- [setup.md](./setup.md)
