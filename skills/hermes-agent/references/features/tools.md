# Tools & Toolsets

Hermes organizes its capabilities into eight tool categories and exposes them through named toolsets. Terminals can run locally, in containers, or on remote infrastructure.

## Tool Categories

| Category | Description | Key Tools |
|----------|-------------|-----------|
| Web | Search and page extraction | `web_search`, `web_extract` |
| Terminal & Files | Command execution and file operations | `terminal`, `process`, `read_file`, `patch` |
| Browser | Interactive browser automation | `browser_navigate`, `browser_snapshot`, `browser_vision` |
| Media | Multimodal generation and analysis | `vision_analyze`, `image_generate`, `text_to_speech` |
| Agent Orchestration | Planning and task delegation | `todo`, `clarify`, `execute_code`, `delegate_task` |
| Memory & Recall | Persistent storage and retrieval | `memory`, `session_search` |
| Automation & Delivery | Scheduled tasks and messaging | `cronjob`, `send_message` |
| Integrations | Home Assistant, MCP servers, RL training | — |

## Available Toolsets

Common preset names: `web`, `terminal`, `file`, `browser`, `vision`, `image_gen`, `moa`, `skills`, `tts`, `todo`, `memory`, `session_search`, `cronjob`, `code_execution`, `delegation`, `clarify`, `homeassistant`, `rl`

## Terminal Backends

| Backend | Purpose |
|---------|---------|
| Local | Default; runs on your machine |
| Docker | Isolated containers for security |
| SSH | Remote execution (prevents self-modification) |
| Singularity | HPC cluster computing |
| Modal | Serverless cloud execution |
| Daytona | Persistent remote dev environments |

## Background Process Management

Start a process with `background=true`. Manage running processes via the `process` tool:

| Action | Description |
|--------|-------------|
| list | List all background processes |
| poll | Check current status |
| wait | Block until completion |
| log | Retrieve output logs |
| kill | Terminate a process |
| write | Send input to stdin |

## Container Resources

Configure CPU cores, memory (MB), disk (MB), and filesystem persistence when using container backends.

## Security Features

- Read-only root filesystem
- Dropped Linux capabilities
- No privilege escalation
- PID limits enforced
- Full namespace isolation

## Sudo Support

Sudo prompts are handled interactively (password cached for the session) or via the `SUDO_PASSWORD` environment variable for unattended use.

## Related

- [Memory](./memory.md)
- [MCP](./mcp.md)
