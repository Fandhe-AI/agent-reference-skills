# OpenAI CLI

Generated `openai` command-line tool for calling the OpenAI API directly from the terminal (Responses, structured outputs, images, speech, transcription, Admin APIs).

## Signature / Usage

```bash
# Install
brew install openai/tools/openai
# or
go install 'github.com/openai/openai-cli/cmd/openai@latest'

# Authenticate
export OPENAI_API_KEY="sk-..."

# Basic request
openai responses create \
  --model "gpt-5.6" \
  --input "Write a one-sentence bedtime story about a unicorn." \
  --raw-output \
  --transform 'output.#(type=="message").content.0.text'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `OPENAI_API_KEY` | env var | Default API key used for standard API endpoints. |
| `OPENAI_ADMIN_KEY` | env var | Key used for Admin API endpoints (`admin:organization:*` commands); the CLI selects admin vs. default key based on the endpoint called. |
| `OPENAI_BASE_URL` | env var | Overrides the API host, e.g. to point at a compatible deployment. |
| `--format` | flag | Output shape: `auto`, `json`, `jsonl`, `pretty`, `raw`, `yaml`, or `explore`. |
| `--transform` | flag | GJSON path to extract/reshape response data before printing. |
| `--debug` | flag | Print request/response details to stderr (Authorization header is redacted). |

## Notes

- Legacy Python SDK installs also created an `openai` command; if the CLI behavior does not match this guide, an old shell hash may still resolve the legacy binary. Fresh installs are unaffected.
- Responses output can contain non-message items (e.g. reasoning) before the assistant message — select the message item by type (`output.#(type=="message").content.0.text`) rather than assuming `output[0]`.
- Multiline prompts, tool definitions, and nested request bodies are best passed as a YAML heredoc rather than flags, to avoid the flag parser misreading `:`/`{}` in prompt text as YAML structure.
- Image generation/edit commands do not have native `--output` file support yet; extract `data.0.b64_json` and decode it (`base64 --decode`) to write a file.
- Scope note: this page covers the API CLI only. Codex CLI is a separate tool covered by a different skill; the Agents SDK (`openai-agents` skill) is also out of scope here.

## Related

- [Python SDK](./python-sdk.md)
- [JavaScript SDK](./javascript-sdk.md)
