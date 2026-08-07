<!-- source: https://code.claude.com/docs/en/statusline.md / last verified: 2026-08-07 -->

# Custom Status Line

Configure a status line that runs a shell script and shows model, directory, and context usage at the bottom of the terminal.

```json ~/.claude/settings.json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 2
  }
}
```

```bash
#!/bin/bash
# ~/.claude/statusline.sh (chmod +x)
input=$(cat)
MODEL=$(echo "$input" | jq -r '.model.display_name')
DIR=$(echo "$input" | jq -r '.workspace.current_dir')
PCT=$(echo "$input" | jq -r '.context_window.used_percentage // 0' | cut -d. -f1)
echo "[$MODEL] ${DIR##*/} | ${PCT}% context"
```

## Notes

- Or generate one from natural language: `/statusline show model name and context percentage with a progress bar`.
- The script receives JSON session data on stdin (`model`, `workspace`, `cost`, `context_window`, etc.) and must print to stdout; it re-runs on new assistant messages, `/compact`, permission-mode changes, vim-mode toggles, and any `refreshInterval` tick.
- `context_window.used_percentage` is calculated from `input_tokens + cache_creation_input_tokens + cache_read_input_tokens` only.
- Disable with `/statusline delete` or by removing the `statusLine` key; `disableAllHooks: true` also disables it.
- Test locally with mock input: `echo '{"model":{"display_name":"Opus"},...}' | ./statusline.sh`.
- Example from the Claude Code docs (code.claude.com) `statusline` page.
