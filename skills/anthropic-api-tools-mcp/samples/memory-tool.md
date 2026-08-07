<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool / last verified: 2026-08-07 -->

# Memory Tool: Persistent Files Across Conversations

Give Claude a client-side `/memories` file store that survives across turns and context resets; your application implements the file operations Claude requests.

```json
{"type": "memory_20250818", "name": "memory"}
```

```python
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    tools=[{"type": "memory_20250818", "name": "memory"}],
    messages=[{"role": "user", "content": "Continue where we left off on the migration plan."}],
)

# Claude requests a memory command via a tool_use block, e.g.:
# {"command": "view", "path": "/memories", "view_range": [1, 10]}
tool_use_block = next(b for b in response.content if b.type == "tool_use")
command = tool_use_block.input["command"]  # "view" | "create" | "str_replace" | "insert" | "delete" | "rename"

# Your application executes the command against real storage scoped to
# a prefix under /memories, then returns a tool_result:
follow_up = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    tools=[{"type": "memory_20250818", "name": "memory"}],
    messages=[
        {"role": "user", "content": "Continue where we left off on the migration plan."},
        {"role": "assistant", "content": response.content},
        {
            "role": "user",
            "content": [
                {
                    "type": "tool_result",
                    "tool_use_id": tool_use_block.id,
                    "content": "Directory: /memories\n- progress.md (512 bytes)",
                }
            ],
        },
    ],
)
```

## Notes

- Client-side/schema-less tool (no `input_schema`); GA on all Claude 4+ models, no beta header required.
- The API auto-injects a memory protocol system-prompt instruction whenever this tool is present, telling Claude to `view` `/memories` before starting work — you don't send that instruction yourself.
- Commands: `view` (path, optional `view_range`), `create` (path, `file_text`), `str_replace` (path, `old_str`, optional `new_str`), `insert` (path, `insert_line`, `insert_text`), `delete` (path), `rename` (`old_path`, `new_path`). Your application must restrict every operation to the `/memories` prefix and reject path traversal (`../`, URL-encoded variants).
- On failure, return `is_error: true` with a message string in `content` (e.g. `"Error: The path {path} does not exist"`), the same pattern as the text editor tool.
