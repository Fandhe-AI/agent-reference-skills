# Foundry Local REST API

OpenAI-compatible REST API exposed by the Foundry Local service (CLI) or by an SDK-started web server. Under active development; the base URL/port is dynamic — read it from `foundry service status` or the SDK's `endpoint`/`urls` property rather than hardcoding it.

## Signature / Usage

```bash
curl -X POST http://localhost:<PORT>/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen2.5-0.5b-instruct-generic-cpu",
    "messages": [{"role": "user", "content": "Hello, how are you?"}],
    "stream": false
  }'
```

## Options / Props

| Endpoint | Description |
|---|---|
| `POST /v1/chat/completions` | OpenAI Chat Completions API compatible. Body: `model`, `messages`, `temperature`, `top_p`, `stream`, `max_tokens`/`max_completion_tokens`, `stop`, `tools`, plus Foundry-specific `ep` (execution provider override: `dml`/`cuda`/`qnn`/`cpu`/`webgpu`) and `ttl` (model idle time-to-live in seconds). |
| `POST /v1/audio/transcriptions` | OpenAI Audio Transcriptions API compatible (`multipart/form-data`). Fields: `file`, `model` (loaded Whisper model ID), `language`, `temperature`, `response_format`. |
| `GET /v1/models` (`GET /openai/models`) | Lists cached/registered models (array of model name strings). |
| `GET /openai/status` | Server status: `Endpoints`, `ModelDirPath`, `PipeName`. |
| `GET /foundry/list` | Lists available catalog models with full metadata (`name`, `alias`, `runtime.deviceType`, `runtime.executionProvider`, `fileSizeMb`, `license`, `promptTemplate`, ...). |
| `POST /openai/download` | Downloads a model (`WorkspaceInferenceModel` body: `Uri`, `Name`, `ProviderType`, ...). Streams `("file name", percentage)` progress; final body `{ "Success": bool, "ErrorMessage": string? }`. |
| `GET /openai/load/{name}` | Loads a model. Query: `unload` (bool, default `true`), `ttl` (seconds, overrides `unload`), `ep` (execution provider override). |
| `GET /openai/unload/{name}` | Unloads a model. Query: `force` (bool). |
| `GET /openai/unloadall` | Unloads all models. |
| `GET /openai/loadedmodels` | Lists currently loaded model names. |
| `GET /openai/getgpudevice` / `GET /openai/setgpudevice/{deviceId}` | Get/set the active GPU device ID. |
| `POST /v1/chat/completions/tokenizer/encode/count` | Counts tokens for a chat request without running inference. Body: `model`, `messages`. Response: `{ "tokenCount": number }`. |

## Notes

- `POST /v1/chat/completions` response mirrors the OpenAI schema: `id`, `object: "chat.completion"`, `created`, `model`, `choices[].message`, `choices[].finish_reason`, `usage`. Set `stream: true` to receive server-sent events ending in `data: [DONE]`.
- Never hardcode the port. Get it from `manager.endpoint` (JS) / `config.Web.Urls` (C#) / `manager.urls[0]` (Python) or `foundry service status`.
- This REST server is optional — for in-process usage without HTTP overhead, call the SDK's native chat/audio clients directly instead.
- Namespace: this is the Foundry Local local REST API, distinct from the cloud Azure AI Foundry REST API and from OpenAI's hosted API — only the request/response shapes are compatible.

## Related

- [Foundry Local SDK](./sdk.md)
- [Foundry Local CLI](./installation-and-cli.md)
