# Skills Install

Browse, install, and invoke community or official skills to extend agent capabilities without writing code.

```bash
# Browse official skills
hermes skills browse --source official

# Search the community registry
hermes skills search kubernetes --source skills-sh

# Install a skill from a known repo
hermes skills install openai/skills/k8s

# List installed skills
hermes skills list

# Check for hub skill updates
hermes skills check

# Update all changed hub skills
hermes skills update
```

```yaml
# ~/.hermes/config.yaml — add external skill directories
skills:
  external_dirs:
    - ~/.agents/skills
    - /home/shared/team-skills
```

```bash
# Invoke an installed skill inside a session
/k8s

# Ask the agent which skills are available
/skills
```

## Notes

- Skills live in `~/.hermes/skills/` and are loaded progressively — only metadata is consumed until a skill is actually needed.
- The agent autonomously creates and updates skills after complex workflows (5+ tool calls) or user corrections via `skill_manage`.
- Local skills take precedence over external directory versions when names conflict.
- All hub skills are scanned for exfiltration, injection, and supply-chain threats before installation.
