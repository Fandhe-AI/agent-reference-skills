# samples

| Name | Description | Path |
| --- | --- | --- |
| Create Agent and Start Session | Create an agent, provision a cloud environment, start a session, and stream the agent's response for a task. | [create-agent-session.md](./create-agent-session.md) |
| Handle Custom Tool Calls and Permission Confirmation | React to `stop_reason: requires_action` on `session.status_idle` to run a custom tool or approve a pending tool call. | [custom-tool-and-permission-events.md](./custom-tool-and-permission-events.md) |
| Subscribe to the Session Event Stream | Open a session's SSE stream, send a message into it, and branch on event type to render text and detect completion. | [event-streaming.md](./event-streaming.md) |
| Coordinate Multiple Agents in One Session | Configure an agent with the `multiagent_20261001` type that delegates to subagents in the same session. | [multiagent.md](./multiagent.md) |
| Create and Manage a Scheduled Deployment | Deploy an agent to start sessions autonomously on a cron schedule and control its lifecycle. | [scheduled-deployment.md](./scheduled-deployment.md) |
| Run a Self-Hosted Sandbox Worker | Authenticate a worker to a `self_hosted` environment's work queue and start polling with the `ant` CLI. | [self-hosted-worker.md](./self-hosted-worker.md) |
| Set and Change a Session Budget | Cap a session's spend at creation, then raise or remove the cap after `budget_reached` so paused work resumes. | [session-budget.md](./session-budget.md) |
| Mount Files into a Session and Retrieve Artifacts | Upload a file, mount it in a session's sandbox, and list and download the files the session produced. | [session-files.md](./session-files.md) |
| Register a Vault Credential and Use It in a Session | Create a vault, register a static-bearer credential for an MCP server, and attach the vault to a session. | [vault-credentials.md](./vault-credentials.md) |
| Follow a Dynamic Workflow Run | Enable dynamic workflows on an agent and follow each run from `workflow_run.created` to `workflow_run.status_ended`. | [workflow-runs.md](./workflow-runs.md) |
