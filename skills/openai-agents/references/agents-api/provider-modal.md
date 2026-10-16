# Modal

Modal sandboxes as a self-hosted sandbox provider for the Agents API (application-managed).

## Signature / Usage

Application / provisioning side (outside the sandbox):

```bash
export OPENAI_API_KEY=...
export OPENAI_EXECUTOR_API_KEY=...   # environment key
```

Inside the sandbox (executor process only):

```bash
CODEX_API_KEY="<environment key (value of OPENAI_EXECUTOR_API_KEY)>" codex exec-server \
  --remote "<session.environment.remote_url>" \
  --environment-id "<session.environment.id>"
```

## Notes

- Keep your application's `OPENAI_API_KEY` outside the sandbox; pass only the environment key as `CODEX_API_KEY`.
- Prerequisites: an OpenAI project API key, a Modal token ID and secret, and the Codex CLI package.
- Flow: create a self-hosted session and save its environment ID; use the Modal SDK or API to create an isolated sandbox with the configured working directory; install the Codex CLI in the sandbox; start its executor with the environment ID and environment key; send input and stream results; when finished delete the session and stop the provider sandbox separately.
- A webhook-managed mode is covered in the Sandbox Lifecycle guide; Cookbook examples exist for both modes (`examples/agents_api/sandboxes/modal`).
- This is the Modal sandbox integration of the OpenAI Agents API, not a Modal-hosted agent framework.
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/modal (fetched 2026-10).

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
