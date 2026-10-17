# Trajectory Format

Hermes Agent saves conversation trajectories in ShareGPT-compatible JSONL for training data, debugging artifacts and RL datasets. Source: `agent/trajectory.py`, `agent/session_persistence.py` (`_save_trajectory`), `batch_runner.py`.

## Signature / Usage

CLI/interactive entry (one JSON object per line):

```json
{
  "conversations": [ ... ],
  "timestamp": "2026-03-30T14:22:31.456789",
  "model": "anthropic/claude-sonnet-4.6",
  "completed": true
}
```

Batch runner entry:

```json
{
  "prompt_index": 42,
  "conversations": [ ... ],
  "metadata": { "prompt_source": "gsm8k", "difficulty": "hard" },
  "completed": true,
  "partial": false,
  "api_calls": 7,
  "toolsets_used": ["code_tools", "file_tools"],
  "tool_stats": {
    "terminal": {"count": 3, "success": 3, "failure": 0}
  },
  "tool_error_counts": {
    "terminal": 0
  }
}
```

Loading:

```python
import json

def load_trajectories(path: str):
    """Load trajectory entries from a JSONL file."""
    entries = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                entries.append(json.loads(line))
    return entries

successful = [e for e in load_trajectories("trajectory_samples.jsonl")
              if e.get("completed")]
training_data = [e["conversations"] for e in successful]
```

```python
from datasets import load_dataset

ds = load_dataset("json", data_files="trajectory_samples.jsonl")
```

Enable saving (a `run_agent.py` / library-level switch; the `hermes` CLI exposes no config key or flag):

```bash
python run_agent.py --save_trajectories --query='your question here'
```

Or `AIAgent(..., save_trajectories=True)` / `initialize_agent(..., save_trajectories=True)`.

## Options / Props

| File | When |
|------|------|
| `trajectory_samples.jsonl` | Conversations that completed (`completed=True`), written to the current working directory |
| `failed_trajectories.jsonl` | Conversations that failed or were interrupted (`completed=False`) |

The batch runner writes a custom file per batch (e.g. `batch_001_output.jsonl`); `save_trajectory()` accepts a `filename` parameter.

ShareGPT role mapping:

| API Role | ShareGPT `from` |
|----------|-----------------|
| system | `"system"` |
| user | `"human"` |
| assistant | `"gpt"` |
| tool | `"tool"` |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/trajectory-format (pinned to v0.22.2)
- Reasoning is normalized into `<think>` tags: native `msg["reasoning"]` is wrapped as `<think>\n{reasoning}\n</think>\n`; `<REASONING_SCRATCHPAD>` is converted via `convert_scratchpad_to_think()`; every `gpt` turn gets a `<think>` block (empty `<think>\n</think>\n` if none).
- Tool calls become XML-wrapped JSON (`<tool_call>\n{"name": "terminal", "arguments": {...}}\n</tool_call>`); arguments are parsed back to objects (`{}` plus a warning on parse failure); multiple calls yield multiple blocks in one `gpt` message.
- Tool results after an assistant message are grouped into one `tool` turn of `<tool_response>` blocks (`{"tool_call_id", "name", "content"}`); JSON-looking content is parsed; results are matched to the parent `tool_calls` by position.
- The system message is generated at save time from the Hermes function-calling template (`<tools>` block with `name`, `description`, `parameters`, `required: null`).
- `tool_stats` and `tool_error_counts` include ALL tools from `model_tools.TOOL_TO_TOOLSET_MAP` with zero defaults so entries share a schema for HuggingFace dataset loading.
- The batch runner always saves trajectories and discards samples with zero reasoning across all turns.

## Related

- [Agent Loop](./agent-loop.md)
- [Session Storage](./session-storage.md)
