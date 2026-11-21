---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent
---

# Deploy an Agent from a Dockerfile or Container Image

Deploy to Agent Runtime from a `Dockerfile` in your source files, or from a container image in Artifact Registry. Both work with any language, and the container must listen for HTTP requests on `0.0.0.0` on port `8080` and adhere to the runtime contract.

## Signature / Usage

### Dockerfile (Python example)

```docker
FROM python:3.13-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

# Start an ADK API server or custom FastAPI server on 0.0.0.0:8080:
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
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

### Deploy from Dockerfile: REST

Package the `Dockerfile` and source files at the root of a `.tar.gz` archive (maximum 8 MB), base64-encode it and `POST` to `reasoningEngines.create`. Pack every file the container needs at start-up; for the example file structure above that is `Dockerfile`, `agent.py`, `main.py` and `requirements.txt` (the same list as `source_packages` in the SDK example).

Adapted (not in the official docs): added `agent.py` to the `tar` file list, because the source's command packs only `Dockerfile main.py requirements.txt` while the SDK example for the same file structure ships `agent.py` next to `main.py`; a file left out of the archive is not in the image built from it.

```bash
# Package your Dockerfile and source files at the root of a tar.gz archive
# (replace main.py and requirements.txt with your project's source files):
tar -czf /tmp/source.tar.gz Dockerfile agent.py main.py requirements.txt

curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/reasoningEngines" \
  -d "{
    \"displayName\": \"Dockerfile agent\",
    \"spec\": {
      \"sourceCodeSpec\": {
        \"inlineSource\": {
          \"sourceArchive\": \"$(base64 < /tmp/source.tar.gz | tr -d '\n')\"
        },
        \"imageSpec\": {}
      }
    }
  }"
```

### Deploy from a container image: Agent Platform SDK

```python
remote_agent = client.runtimes.create(
    config={
        "container_spec": {
            "image_uri": "CONTAINER_IMAGE_URI",
        },
        # Optional: declare class_methods if your container implements /api/reasoning_engine or /api/stream_reasoning_engine
        # "class_methods": class_methods,
        # Other optional configs
        "display_name": "Container image agent",
    },
)
```

### Deploy from a container image: REST

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
- Container image deployment with the Agent Platform SDK requires `google-cloud-aiplatform` `>=1.144`; first build and push the image to Artifact Registry (see "Bring your own container" in the setup guide).
- If the container runs the ADK API server (such as `npx adk api_server` for TypeScript or `AdkWebServer` for Java), call its `/run` and `/run_sse` endpoints through the underlying API proxy (`/api/run` and `/api/run_sse`). The ADK Go `agentengine` launcher exposes `/api/reasoning_engine` and `/api/stream_reasoning_engine`.
- Dockerfile builds can also be deployed with Terraform (see the Agent Runtime Terraform page).
- The source also shows Go, TypeScript and Java Dockerfiles; they differ only in the build stage and `CMD` (all `EXPOSE 8080`, listening on `0.0.0.0`). Omitted here.
- Corrected from the official docs: the REST example packed `tar -czf /tmp/source.tar.gz Dockerfile main.py requirements.txt`, leaving out the `agent.py` of the example file structure; the archive must contain every file the container loads at start-up.
- Try deployments in a disposable project first; each deployment builds and runs a container.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-an-agent.md](./deploy-an-agent.md)
- [deploy-an-agent-configuration.md](./deploy-an-agent-configuration.md)
- [runtime-contract.md](./runtime-contract.md)
- [use-an-agent.md](./use-an-agent.md)
