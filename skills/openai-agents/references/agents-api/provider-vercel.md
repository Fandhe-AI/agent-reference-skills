# Vercel

Vercel Sandbox as a self-hosted sandbox provider for the Agents API (application-managed; a webhook-managed mode is covered in the Sandbox Lifecycle guide).

## Signature / Usage

Application / provisioning side (outside the sandbox). Locally set the Vercel Sandbox SDK credentials (deployed on Vercel use Vercel OIDC instead), plus the OpenAI keys:

```bash
export VERCEL_TOKEN=...
export VERCEL_TEAM_ID=...
export VERCEL_PROJECT_ID=...
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
- Requires a Vercel project with Sandbox access. Authentication depends on where the application runs: locally `VERCEL_TOKEN`, `VERCEL_TEAM_ID`, `VERCEL_PROJECT_ID`; deployed on Vercel, Vercel OIDC.
- Flow: create a self-hosted session and save its environment ID; use the Vercel SDK or API to create an isolated sandbox with the configured working directory; install the Codex CLI; start the executor with the environment ID and environment key; send input and stream results; delete the session and stop the provider sandbox separately. For regular use put Codex in a Vercel snapshot so the sandbox connects sooner.
- This is the Vercel Sandbox integration for OpenAI Agents API executors, not general Vercel deployment (see the `vercel` skill).
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/vercel (fetched 2026-10). Cookbook: `examples/agents_api/sandboxes/vercel`.

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
