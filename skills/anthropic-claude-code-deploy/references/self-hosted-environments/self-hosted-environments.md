<!-- source: https://code.claude.com/docs/en/self-hosted-environments.md / last verified: 2026-08-07 -->

# Self-hosted environments

Runs Claude Code cloud sessions (web, `claude --cloud`, mobile/desktop apps, scheduled routines) on infrastructure your organization operates instead of Anthropic's, via runner processes you deploy. Public beta on Team/Enterprise plans, off by default.

## Signature / Usage

Three parts: **Environment** (named destination created in claude.ai admin settings, grouping runners), **Runner** (a process on your host that claims sessions from the environment's queue, clones the repo, spawns a Claude Code process), **Session** (one Claude Code task). A runner locks to the account of the first session it picks up.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Environment | concept | Named group of runners; sessions route to the environment, not an individual runner; appears as `pool` / `pool_id` (`ccpool_...`) in API fields and metrics |
| Environment secret | credential | Shared credential runners use to register; shown once at creation, labeled "environment key" in the admin UI |
| Runner | process | Long-lived process you deploy; registers, receives a runner token, polls for sessions |
| Session | task | Runs as a child Claude Code process the runner spawns |

## Notes

- Sessions execute inside your network; connections to Anthropic (`api.anthropic.com` for queue, event stream, model inference) are outbound-only — Anthropic never connects into your network.
- Availability: public beta, Team/Enterprise, requires Claude Code on the web enabled and an Owner/admin turning on **Allow self-hosted environments** on the Cloud environments admin page; unavailable with Zero Data Retention; inference can't be routed through Bedrock/Agent Platform/Foundry/LLM gateway.
- Supported surfaces: web, mobile/desktop apps, scheduled routines, terminal (`claude --cloud` or `--environment` dispatch). Claude Tag, Claude Security, and Code Review sessions don't route here yet.
- What stays on your infrastructure: repository checkouts, build artifacts, secrets, session-created files. The conversation itself (prompts/responses/tool results) goes to `api.anthropic.com` for inference and is stored by Anthropic for cross-surface resume.
- Distinct from Remote Control (drive your own always-on machine from other devices; available on Pro/Max too) — use that instead if you don't use cloud sessions at all.

## Related

- [Self-hosted environments quickstart](./self-hosted-environments-quickstart.md)
- [Deploy self-hosted environments to production](./self-hosted-environments-deploy.md)
- [Customize sessions in self-hosted environments](./self-hosted-environments-configuration.md)
- [Test self-hosted environments end to end](./self-hosted-environments-testing.md)
- [Self-hosted environments reference](./self-hosted-environments-reference.md)
- [Verify session identity in self-hosted environments](./self-hosted-environments-identity.md)
