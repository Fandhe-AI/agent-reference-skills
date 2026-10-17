# Learning Path

Navigate Hermes Agent documentation by experience level or specific use case.

## Paths by Experience Level

| Level | Focus | Time |
|-------|-------|------|
| Beginner | Basic setup and conversations | ~1 hour |
| Intermediate | Messaging bots, advanced features | ~2–3 hours |
| Advanced | Custom tools, skills, RL training | ~4–6 hours |

## Use-Case Pathways

| Goal | Key Topics |
|------|-----------|
| CLI Coding Assistant | Interactive terminal, code execution, context file support |
| Telegram / Discord Bot | Messaging platform deployment, optional voice mode |
| Task Automation | Cron scheduling, batch jobs, chained agent actions |
| Custom Tools / Skills | Tool development, reusable skill packages |
| Team of specialist Bots | Named Bots with their own model, memory, skills, routines, and chats; group chats and `@mentions` (Desktop → Profiles → Bot Mode → Cron → Multi-connection Desktop) |
| Model Training | Reinforcement learning fine-tuning pipeline (Atropos) — Quickstart → Configuration → Atropos RL Environments (external) → Provider Routing → Architecture |
| Python Library Integration | Programmatic API usage — Installation → Quickstart → Python Library Guide → Architecture → Tools → Sessions |

## Key Features at a Glance

Directory of major capability areas (each has dedicated documentation):

| Feature | What It Does |
|---------|--------------|
| Tools | Built-in tools the agent can call (file I/O, search, shell, etc.) |
| Skills | Installable plugin packages that add new capabilities |
| Memory | Persistent memory across sessions |
| Bot Mode | Named specialist Bots with persistent chats, routines, group chats, and `@mentions` |
| Context Files | Feed files and directories into conversations |
| MCP | Connect to external tool servers via Model Context Protocol |
| Cron | Schedule recurring agent tasks |
| Delegation | Spawn sub-agents for parallel work |
| Code Execution | Run Python scripts that call Hermes tools programmatically |
| Browser | Web browsing and scraping |
| Hooks | Event-driven callbacks and middleware |
| Batch Processing | Process multiple inputs in bulk |
| Provider Routing | Route requests across multiple LLM providers |

## Recommended Progression

1. [Installation](./installation.md)
2. [Quickstart](./quickstart.md)
3. CLI usage
4. Customization (tools, skills, memory)
5. Advanced features (scheduling, delegation, MCP)
6. Development and contribution

## Notes

- Three navigation entry points are provided on the page: by experience level, by use-case goal, and a full feature overview table.
- The learning path page links directly to each feature's detailed documentation section.
- First-time provider setup: `hermes setup --portal` — one OAuth covers a model plus the four Tool Gateway tools (search / image / TTS / browser).
- For custom tools, start with plugins; the Adding Tools developer page is for built-in Hermes core development.
- Starting points by level: Beginner reads Installation, Quickstart, CLI Usage, Configuration; Intermediate reads Sessions, Messaging, Tools, Skills, Memory, Cron; Advanced reads Architecture, Adding Tools, Creating Skills, Contributing.

## Related

- [Installation](./installation.md)
- [Quickstart](./quickstart.md)
- [Bot Mode](../user-guide/bot-mode.md)
- [Slash Commands](../cli/slash-commands.md)
