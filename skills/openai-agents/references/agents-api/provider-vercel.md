# Vercel

Vercel Sandbox as a self-hosted sandbox provider for the Agents API (application-managed; a webhook-managed mode is covered in the Sandbox Lifecycle guide).

## Signature / Usage

Running locally, set `VERCEL_TOKEN`, `VERCEL_TEAM_ID`, and `VERCEL_PROJECT_ID` (deployed on Vercel, use Vercel OIDC instead); use `OPENAI_API_KEY` for application requests and set `OPENAI_EXECUTOR_API_KEY` to an environment key. The official provider page has no code; the executor command below is taken verbatim from the Self-hosted sandboxes guide (https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted, fetched 2026-11-14). Run it inside the sandbox with the environment key configured as `CODEX_API_KEY`:

```bash
codex exec-server \
  --remote "<session.environment.remote_url>" \
  --environment-id "<session.environment.id>"
```

## Notes

- Keep your application's `OPENAI_API_KEY` outside the sandbox; pass only the environment key as `CODEX_API_KEY`.
- Requires a Vercel project with Sandbox access. Authentication depends on where the application runs: locally `VERCEL_TOKEN`, `VERCEL_TEAM_ID`, `VERCEL_PROJECT_ID`; deployed on Vercel, Vercel OIDC.
- Flow: create a self-hosted session and save its environment ID; use the Vercel SDK or API to create an isolated sandbox with the configured working directory; install the Codex CLI; start the executor with the environment ID and environment key; send input and stream results; delete the session and stop the provider sandbox separately. For regular use put Codex in a Vercel snapshot so the sandbox connects sooner.
- This is the Vercel Sandbox integration for OpenAI Agents API executors, not general Vercel deployment (see the `vercel` skill).
- Source: https://developers.openai.com/api/docs/guides/agents-api/environments/providers/vercel (fetched 2026-11-14). Cookbook: `examples/agents_api/sandboxes/vercel/application_managed` and `webhook_managed`.

## Related

- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
- [Sandbox Lifecycle](./sandbox-lifecycle.md)
