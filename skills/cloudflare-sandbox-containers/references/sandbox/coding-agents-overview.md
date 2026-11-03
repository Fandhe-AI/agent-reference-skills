---
source: https://developers.cloudflare.com/sandbox/coding-agents/, https://developers.cloudflare.com/sandbox/coding-agents/devin/, https://developers.cloudflare.com/sandbox/coding-agents/cursor/, https://developers.cloudflare.com/sandbox/coding-agents/claude-managed-agents/, https://developers.cloudflare.com/sandbox/coding-agents/openai-agents-api/
---

# Coding agents in a sandbox

Run coding agents in a Linux sandbox (a Container started by a Durable Object) that belongs to one task or session. Two models: the agent runs inside your sandbox and your Worker holds the credentials (Claude Code, Codex, OpenCode, Pi), or a vendor runs the agent loop in its own service and sends commands and file edits to sandboxes in your Cloudflare account (Devin, Cursor Cloud Agents, Claude Managed Agents, OpenAI Agents API).

## Signature / Usage

Agent runs in your sandbox (build the runner first, then switch agents): see the build-a-coding-agent-runner, claude-code, codex, opencode and pi pages. The agent calls its model over HTTP through AI Gateway (cloudflare-ai skill, ai-gateway); your Worker adds the API token to each request so the sandbox never receives it.

Vendor-hosted loops, deploy commands from the official guides (all run on your machine; the agent's commands then run in per-session sandbox containers in your account, never on your host).

Devin Outpost (`npm create cloudflare@latest -- cloudflare-devin-outpost --template=cloudflare/sandbox-sdk/templates/devin`, then in the project directory):

```sh
npx wrangler login
npx wrangler secret put DEVIN_API_TOKEN
npm run deploy
curl https://<YOUR_WORKER>.workers.dev/
```

Cursor Cloud Agents (self-hosted machines):

```sh
git clone https://github.com/anysphere/cloudflare-workers.git
cd cloudflare-workers
npm install
npx wrangler login
npx wrangler r2 bucket create cursor-pool-worker-snapshots
npx wrangler secret put CURSOR_API_KEY
npx wrangler deploy
```

OpenAI Agents API (create the agent, then deploy the template; end the session):

```bash
curl "https://api.openai.com/v1/agents" \
	--request POST \
	--header "OpenAI-Beta: agents=v1" \
	--header "Authorization: Bearer $OPENAI_API_KEY" \
	--json '{
		"name": "sandbox-demo",
		"model": "gpt-5.6-sol"
	}'
```

```bash
curl "https://api.openai.com/v1/agents/sessions/$SESSION_ID" \
	--request DELETE \
	--header "OpenAI-Beta: agents=v1" \
	--header "Authorization: Bearer $OPENAI_API_KEY"
```

## Notes

- Devin Outpost: needs a Devin Enterprise organization (outpost ID in `DEVIN_OUTPOST_ID`, service-user token with the **Run outpost workers** permission as the `DEVIN_API_TOKEN` secret; never put it in `wrangler.jsonc`), Workers Paid with Containers, Node.js 24 and Docker for manual deploys. A cron runs the Worker each minute and it polls Devin every 10 seconds (or `DEVIN_RECONCILE_INTERVAL_MS`); statuses: `pending`/`running` start the sandbox (from its snapshot if any), `suspended` waits for the Devin CLI to exit then snapshots and stops, `terminated` stops and forgets the snapshot. Snapshots are saved only after the CLI exits; the Worker API cannot delete snapshots. Security: inside the container Devin runs as root, can reach the Internet, and holds the Devin API token, which session code can read; deploy a separate outpost per group of users that must not share access.
- Cursor Cloud Agents: needs Cursor Enterprise with self-hosted machines, a team service-account key with agent scope (personal keys do not work), R2, Node.js 20+, and Docker. Create a team pool with `agent worker --pool <name> start` and record the name in `vars.CURSOR_POOL`; set `containers[].max_instances` to the concurrent sessions needed. A cron every five minutes lists waiting sessions; the container stops after five minutes without work (`WORKER_IDLE_RELEASE_TIMEOUT_SECONDS`) or eight hours (`MAX_RUN_LIFETIME_SECONDS`). Optional R2 repository snapshots need `SNAPSHOT_AUTH_TOKEN` and `vars.WORKER_PUBLIC_URL`. A new image rollout stops running containers. Private repositories use `GIT_USERNAME` / `GIT_TOKEN` secrets (`x-access-token` for GitHub); the container receives `CURSOR_API_KEY`, `GIT_USERNAME`, `GIT_TOKEN`, and `SNAPSHOT_AUTH_TOKEN`, all readable by session code: grant `GIT_TOKEN` only the repositories the agents use. Monitor with `npx wrangler tail`, `npx wrangler containers list`, `npx wrangler containers instances <APPLICATION_ID>`.
- Claude Managed Agents: Anthropic sends webhooks to a Worker the open-source (alpha) template https://github.com/cloudflare/claude-managed-agents deploys; each session gets a Linux sandbox on Containers (built with Sandbox SDK 0.x; see https://developers.cloudflare.com/sandbox/sdk/migrate/) or a Dynamic Worker (https://developers.cloudflare.com/dynamic-workers/), with egress policies, snapshots while a session sleeps, per-session email, Browser Run, and a dashboard. Needs Workers Paid. The hosted agent product itself is covered by the anthropic-managed-agents skill.
- OpenAI Agents API: signed webhooks (`agent.session.created`, `action_required`, `in_progress`, `idle`, `failed`) to `/webhook` start a Durable Object container per session running `codex exec-server`, which connects out to OpenAI with a restricted executor key (`api.model.read`, `api.agents.environments.connect`); the worker key needs `api.agents.read`. Idle sessions are snapshotted and keep `/workspace` files while the session lasts. Secrets: `OPENAI_API_KEY`, `OPENAI_EXECUTOR_API_KEY`, `OPENAI_AGENT_ID`, `OPENAI_WEBHOOK_SECRET`, `EXECUTOR_CLIENT_SECRET`. The executor key is exposed as `CODEX_API_KEY` to every process in the container and the container has Internet access; restrict with outbound handling in the `containers` category of this skill. Deleting an OpenAI session sends no webhook; stop a container with `DELETE $WORKER_URL/executors/$SESSION_ID` using the shared secret. Agents API / Codex themselves are covered by the openai-agents and openai-codex skills.
- Claude Code and Codex agents run in the sandbox (the agents are the anthropic-claude-code and openai-codex skills); Cursor and Devin have no skill in this repository; the OpenCode and Pi harnesses of the Agents SDK are in the cloudflare-agents skill (harnesses). To give an agent in a Durable Object a container to run commands in, see the Sandbox tool in the cloudflare-agents skill (tools: sandbox).

## Related

- [Build a coding agent runner](./build-a-coding-agent-runner.md)
- [Run Claude Code in a sandbox](./claude-code.md)
- [Run Codex in a sandbox](./codex.md)
- [Run OpenCode in a sandbox](./opencode.md)
- [Run Pi in a sandbox](./pi.md)
- [Sandbox security](./sandbox-security.md)
