# Skills Hub

The Skills Hub is the catalog and management interface for Hermes Agent skills — reusable procedure files that extend the agent's capabilities for specialized tasks.

## Overview

| Attribute | Value |
|-----------|-------|
| Total skills | 641 |
| Built-in skills | 75 |
| Optional skills | 45 |
| LobeHub registry | 505 |
| Anthropic registry | 16 |

## How Skills Work

Skills store procedures — step-by-step instructions for how to do things (as opposed to Memory, which stores facts). Users discover, search, and install skills from multiple registries to customize their agent for specific workflows without starting from scratch.

Manage skills via:

```sh
hermes skills config      # enable / disable installed skills
hermes skills install     # install a skill from a registry
```

## Categories

| Category | Skill Count |
|----------|-------------|
| Other | 348 |
| Software Dev | 69 |
| Creative | 53 |
| MLOps | 42 |
| Research | 36 |
| Translation | 24 |
| Productivity | 12 |
| Gaming | 11 |
| Social Media | 7 |
| Health | 7 |
| AI Agents | 6 |
| GitHub | 6 |
| Media | 6 |
| Security | 6 |
| Apple | 4 |

## Registry Sources

- **Built-in** (75): Core skills shipped with Hermes Agent covering GitHub management, ML/AI operations, creative tools, and productivity integrations.
- **Optional** (45): Additional official skills not enabled by default.
- **LobeHub** (505): Third-party community registry.
- **Anthropic** (16): Skills provided by Anthropic.

## Notes

- Telegram deployments are limited to 100 commands per bot; disable unused skills via `hermes skills config` to stay within this limit.
- Skills are stored per-profile and are fully isolated between profiles.

## Related

- [FAQ & Troubleshooting](./faq.md)
