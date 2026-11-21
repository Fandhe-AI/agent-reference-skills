---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent
---

# Deploy an Agent from a Dockerfile or Container Image

Deploy to Agent Runtime from a `Dockerfile` in your source files, or from a container image in Artifact Registry. Both work with any language, and the container must listen for HTTP requests on `0.0.0.0` on port `8080` and adhere to the runtime contract.

## Signature / Usage

### Dockerfile (Python example)

Adapted (not in the official docs): `COPY . .` became `COPY agent.py main.py ./`, the runtime files of the example file structure below, so a local build does not copy other files in the build context (such as `.env` or local credentials) into the image.

```docker
FROM python:3.13-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY agent.py main.py ./

EXPOSE 8080

# Start an ADK API server or custom FastAPI server on 0.0.0.0:8080:
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

Narrowing `COPY` keeps other files out of the image, but `docker build` still sends the whole directory (the build context) to the builder, including `.env` files or local credentials. For a local or remote build, put a `.dockerignore` in the context root that excludes everything and then allows only the files the Dockerfile copies. In the `.dockerignore` syntax, a leading `!` makes an exception and the last matching line decides, and the `Dockerfile` and `.dockerignore` are sent to the builder even when they are excluded (Docker build context docs: https://docs.docker.com/build/concepts/context/).

Adapted (not in the official docs): a `.dockerignore` for the example file structure below, so only `Dockerfile`, `requirements.txt`, `agent.py` and `main.py` are sent in the build context.

```text
# .dockerignore
*
!Dockerfile
!requirements.txt
!agent.py
!main.py
```

### Deploy from Dockerfile: Agent Platform SDK

`client` is an `agentplatform.Client` (created as in [manage-deployed-agents.md](./manage-deployed-agents.md)); the official page does not define it here or in the container-image example below.

```python
# Example file structure:
# /current_directory
#     ├── agent.py
#     ├── main.py
#     ├── requirements.txt
#     ├── Dockerfile
#
# For other languages, pass your project's source files and Dockerfile in source_packages:
#   Go:         ["main.go", "go.mod", "go.sum", "Dockerfile"]
#   TypeScript: ["src", "package.json", "package-lock.json", "tsconfig.json", "Dockerfile"]
#   Java:       ["src", "pom.xml", "Dockerfile"]

remote_agent = client.runtimes.create(
    config={
        "source_packages": [
            "agent.py",
            "main.py",
            "requirements.txt",
            "Dockerfile",
        ],
        "image_spec": {},  # tells Agent Runtime to use the Dockerfile
        # Optional: declare class_methods if your container implements /api/reasoning_engine or /api/stream_reasoning_engine
        # "class_methods": class_methods,
        # Other optional configs
        "display_name": "Dockerfile agent",
    }
)
```

### Deploy from a container image: Agent Platform SDK

The two container image examples set a keep-alive probe, which the source's keep-alive section says is required for prebuilt container image deployments (Notes). They assume that the image serves `GET /is_busy` on port `8080` as the runtime contract describes: a `2xx` response while background work is running, and a non-`2xx` response (such as `412`) when idle. A probe that always answers `2xx` keeps the instance, and its billed CPU and memory, running for up to `max_seconds` after the last request.

Adapted (not in the official docs): added `"keep_alive_probe"` with the values of the keep-alive example in deploy-an-agent-configuration.md; in google-cloud-agentplatform 2.10.0, `container_spec` creates the runtime spec, and `keep_alive_probe` is sent as `spec.deployment_spec.keep_alive_probe`.

```python
remote_agent = client.runtimes.create(
    config={
        "container_spec": {
            "image_uri": "CONTAINER_IMAGE_URI",
        },
        "keep_alive_probe": {
            "http_get": {
                "path": "/is_busy",
                "port": 8080,
            },
            "max_seconds": 3600,
        },
        # Optional: declare class_methods if your container implements /api/reasoning_engine or /api/stream_reasoning_engine
        # "class_methods": class_methods,
        # Other optional configs
        "display_name": "Container image agent",
    },
)
```

### Deploy from a container image: REST

Adapted (not in the official docs): added `spec.deploymentSpec.keepAliveProbe` (`httpGet.path`, `httpGet.port`, `maxSeconds`, field names of the `aiplatform.v1` Discovery document) with the same values as the SDK example above.

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines" \
  -d '{
    "displayName": "Container image agent",
    "spec": {
      "containerSpec": {
        "imageUri": "CONTAINER_IMAGE_URI"
      },
      "deploymentSpec": {
        "keepAliveProbe": {
          "httpGet": {
            "path": "/is_busy",
            "port": 8080
          },
          "maxSeconds": 3600
        }
      }
    }
  }'
```

## Notes

- `source_packages` (Dockerfile (SDK)): Source files plus the `Dockerfile`.
- `image_spec` (Dockerfile (SDK)): `{}` tells Agent Runtime to use the Dockerfile. Replaces `entrypoint_module`, `entrypoint_object` and `requirements_file`.
- `container_spec.image_uri` (Container image (SDK)): URI of the image in Artifact Registry, such as `us-central1-docker.pkg.dev/my-project/my-repo/my-image:tag`.
- `spec.sourceCodeSpec.inlineSource.sourceArchive` (Dockerfile (REST)): Base64-encoded `.tar.gz` (maximum 8 MB) with the `Dockerfile` and sources at the archive root.
- `spec.sourceCodeSpec.imageSpec` (Dockerfile (REST)): `{}` to use the Dockerfile.
- `spec.containerSpec.imageUri` (Container image (REST)): Image URI in Artifact Registry.
- `class_methods` / `spec.classMethods` (Both): Optional; declare supported operations if the container implements `/api/reasoning_engine` or `/api/stream_reasoning_engine`, so that `query` and `streamQuery` work.
- The REST calls return a long-running `Operation` that resolves to the deployed `ReasoningEngine` resource once the container build and deployment complete; poll or wait for it before using the agent.
- Container image deployment with the Agent Platform SDK: the source says to "install a version of `google-cloud-aiplatform` satisfying `>=1.144`", which applies to the `vertexai` SDK. The SDK examples on this page use `agentplatform.Client` (`client.runtimes.create`), which comes from the separate `google-cloud-agentplatform` package; install that package for them (see setup.md, "Install the SDK"). The source states no minimum version of `google-cloud-agentplatform` for container images; first build and push the image to Artifact Registry (see "Bring your own container" in the setup guide).
- If the container runs the ADK API server (such as `npx adk api_server` for TypeScript or `AdkWebServer` for Java), call its `/run` and `/run_sse` endpoints through the underlying API proxy (`/api/run` and `/api/run_sse`). The ADK Go `agentengine` launcher exposes `/api/reasoning_engine` and `/api/stream_reasoning_engine`.
- Dockerfile builds can also be deployed with Terraform (see the Agent Runtime Terraform page).
- The source also shows Go, TypeScript and Java Dockerfiles; they differ only in the build stage and `CMD` (all `EXPOSE 8080`, listening on `0.0.0.0`). Omitted here.
- The source's REST example for a Dockerfile deployment (`tar -czf /tmp/source.tar.gz Dockerfile main.py requirements.txt` followed by a `curl` whose `-d` JSON embeds `$(base64 < /tmp/source.tar.gz | tr -d '\n')`) is omitted: the `curl` runs even when `tar` fails, the whole base64-encoded archive becomes one command-line argument (which can exceed the OS argument-length limit), and the file list leaves out the `agent.py` of the example file structure. The request is `POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines` with `displayName`, `spec.sourceCodeSpec.inlineSource.sourceArchive` and `spec.sourceCodeSpec.imageSpec` (`{}`) as described above; the archive holds the `Dockerfile` and every file the container needs at start-up at its root (for the example file structure: `Dockerfile`, `agent.py`, `main.py`, `requirements.txt`, the same list as `source_packages` in the SDK example). If you script it, stop when `tar` fails and send the JSON body from a file (`curl --data-binary @FILE`) instead of a command-line argument.
- Try deployments in a disposable project first; each deployment builds and runs a container.
- Keep-alive probe: the source's container image examples set no `keep_alive_probe`, while its keep-alive section says `http_get.path` is "Required when specifying `http_get` (and always required for prebuilt container image deployments)"; the official page does not reconcile the two (see the Source inconsistency note in [deploy-an-agent-configuration.md](./deploy-an-agent-configuration.md)). The examples here follow the keep-alive section.
- Adapted from the official docs: the container image examples were `client.runtimes.create(config={"container_spec": {"image_uri": "CONTAINER_IMAGE_URI"}, ...})` and a REST body with only `spec.containerSpec.imageUri`; they now add the probe. SDK: google-cloud-agentplatform 2.10.0 `agentplatform/_genai/runtimes.py` sets `runtime_spec = {}` for `container_spec`, so the check that rejects `keep_alive_probe` without code or a container spec does not apply, and `_generate_deployment_spec_or_raise` puts the probe in `deployment_spec["keep_alive_probe"]` (`KeepAliveProbe` fields `http_get` (`path`, `port`) and `max_seconds`). REST: Discovery `aiplatform.v1` `ReasoningEngineSpec.deploymentSpec` -> `ReasoningEngineSpecDeploymentSpec.keepAliveProbe` -> `KeepAliveProbe` (`httpGet`, `maxSeconds`, "Can be a maximum of 3600 seconds (1 hour)") -> `KeepAliveProbeHttpGet` (`path` "Required.", `port`).
- Adapted from the official docs: the `.dockerignore` above is not in the source; its syntax follows the Docker build context documentation (https://docs.docker.com/build/concepts/context/).
- Corrected from the official docs: the Dockerfile copied the whole build context with `COPY . .`. With the SDK `source_packages` deployment only the listed files are uploaded, but the same Dockerfile used in a local `docker build` would copy every file in the directory; list the files your server needs (or add a `.dockerignore`).
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-an-agent.md](./deploy-an-agent.md)
- [deploy-an-agent-configuration.md](./deploy-an-agent-configuration.md)
- [runtime-contract.md](./runtime-contract.md)
- [use-an-agent.md](./use-an-agent.md)
