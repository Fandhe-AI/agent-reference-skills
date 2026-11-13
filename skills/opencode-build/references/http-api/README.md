# http-api

| Name | Description | Path |
| --- | --- | --- |
| HTTP API Overview | OpenAPI 3.1.0 info block, 32 tags / 170 operations | [overview.md](./overview.md) |
| Agent | agent.list / agent.get | [agent.md](./agent.md) |
| Command | command.list | [command.md](./command.md) |
| Config | config.get, config.shells, experimental.config.update | [config.md](./config.md) |
| Credential | credential list / create / update / remove / activate | [credential.md](./credential.md) |
| Debug | debug.heapDump, debug.location list / evict | [debug.md](./debug.md) |
| Event | event.subscribe (SSE of native and plugin RPC events) | [event.md](./event.md) |
| Experimental API | media, schedule, artifacts, background jobs (unstable) | [experimental.md](./experimental.md) |
| Filesystem | fs.read / fs.list / fs.find, experimental.fs.write / watch | [filesystem.md](./filesystem.md) |
| Generate and Form | experimental.generate.*, form.list | [generate-form.md](./generate-form.md) |
| Integration | integration.list / get / connect (key, external, OAuth) | [integration.md](./integration.md) |
| Location, Project, Worktree | location.get / reload, project.list / update, worktree.* | [location-project-worktree.md](./location-project-worktree.md) |
| MCP | mcp.list, experimental.mcp.add / remove / connect, mcp.resource.catalog | [mcp.md](./mcp.md) |
| Migration | experimental.migration.v1.status | [migration.md](./migration.md) |
| Model | model.list, model.default | [model.md](./model.md) |
| Permission | permission.request / saved, session.permission.* | [permission.md](./permission.md) |
| Persistent PTY API (experimental) | experimental.persistentPty.* (session-bound terminals) | [persistent-pty.md](./persistent-pty.md) |
| Plugin | plugin.list / gui / check / update | [plugin.md](./plugin.md) |
| Provider | provider.list, provider.get | [provider.md](./provider.md) |
| PTY API | pty.list / create / get / update / remove, connect over WebSocket | [pty.md](./pty.md) |
| Reference, Skill, Usage | reference.list, skill.list, experimental.usage.limits | [reference-skill-usage.md](./reference-skill-usage.md) |
| RPC | rpc.call (plugin-registered RPC dispatch) | [rpc.md](./rpc.md) |
| Server | server.info, server.pair, server.connect | [server.md](./server.md) |
| Session API: forms | session.form list / create / get / cancel / reply | [session-forms.md](./session-forms.md) |
| Session API: inbox, instruction entries and revert | session.inbox.*, instruction entries, revert stage / clear | [session-inbox-revert.md](./session-inbox-revert.md) |
| Session API: messages and execution | session.prompt, command, shell, compact, context | [session-messages.md](./session-messages.md) |
| Session API: lifecycle | session list / create / get / remove / active, export / import | [session.md](./session.md) |
| Shell | shell.create / list / get / remove, shell.output | [shell.md](./shell.md) |
| VCS | vcs.init / get / base / status / branch.list / diff | [vcs.md](./vcs.md) |
| Voice | experimental.voice.models, experimental.voice.session | [voice.md](./voice.md) |
| Web Search | websearch.providers, websearch.query | [websearch.md](./websearch.md) |
