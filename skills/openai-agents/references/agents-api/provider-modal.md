# Modal

Modal sandboxes as a self-hosted sandbox provider for the Agents API (application-managed).

## Signature / Usage

Use `OPENAI_API_KEY` for application requests and set `OPENAI_EXECUTOR_API_KEY` to an environment key. The official provider page has no code; the executor command below is taken verbatim from the Self-hosted sandboxes guide (https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted, fetched 2026-11-14). Run it inside the sandbox with the environment key configured as `CODEX_API_KEY`:

```bash
codex exec-server \
  --remote "<session.environment.remote_url>" \
  --environment-id "<session.environment.id>"
```

## Notes

- Keep your application's `OPENAI_API_KEY` outside the sandbox; pass only the environment key as `CODEX_API_KEY`.
- Prerequisites: an OpenAI project API key, a Modal token ID and secret, and the Codex CLI package.
- Flow: create a self-hosted session and save its environment ID; use the Modal SDK or API to create an isolated sandbox with the configured working directory; install the Codex CLI in the sandbox; start its executor with the environment ID and environment key; send input and stream results; when finished delete the session and stop the provider sandbox separately.
- A webhook-managed mode is covered in the Sandbox Lifecycle guide; Cookbook examples exist for both modes (`examples/agents_api/sandboxes/modal/application_managed` and `webhook_managed`).
- This is the Modal sandbox integration of the OpenAI Agents API, not a Modal-hosted agent framework.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/modal (fetched 2026-11-14).

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
