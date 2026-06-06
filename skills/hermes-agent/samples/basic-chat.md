# Basic Chat

Install Hermes Agent and start an interactive session with a configured LLM provider.

```bash
# Install
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# Select provider and model interactively
hermes model

# Start a chat session
hermes

# Resume the most recent session
hermes -c

# Resume a named session
hermes -r "my-project"
```

## Notes

- Windows requires WSL2 before running the installer.
- Provider and model can be changed at any time with `/model` inside a session.
- Use `Alt+Enter` or `Ctrl+J` for multi-line input (e.g. pasting code blocks).
- `hermes doctor` runs diagnostics if the session fails to start.
