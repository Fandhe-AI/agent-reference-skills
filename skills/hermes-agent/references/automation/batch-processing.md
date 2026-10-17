# Batch Processing

Run the Hermes agent across hundreds or thousands of prompts in parallel to generate structured trajectories (ShareGPT-format, with tool usage statistics), mainly for training-data generation and evaluation. `batch_runner.py` processes a JSONL dataset; each prompt gets its own isolated environment.

## Signature / Usage

```bash
# Basic batch run
python batch_runner.py \
    --dataset_file=data/prompts.jsonl \
    --batch_size=10 \
    --run_name=my_first_run \
    --model=anthropic/claude-sonnet-4.6 \
    --num_workers=4

# Resume an interrupted run
python batch_runner.py \
    --dataset_file=data/prompts.jsonl \
    --batch_size=10 \
    --run_name=my_first_run \
    --resume

# List available toolset distributions
python batch_runner.py --list_distributions
```

Dataset: JSONL, each entry needs `prompt`; optional `image` / `docker_image` (container for Docker, Modal, Singularity backends) and `cwd`.

```jsonl
{"prompt": "Node.js Express server", "image": "node:20-alpine", "cwd": "/app"}
```

## Options / Props

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--dataset_file` | (required) | Path to JSONL dataset |
| `--batch_size` | (required) | Prompts per batch |
| `--run_name` | (required) | Run name (output dir and checkpointing) |
| `--distribution` | `"default"` | Toolset distribution to sample from |
| `--model` | `claude-sonnet-4.6` | Model to use |
| `--base_url` | `https://openrouter.ai/api/v1` | API base URL |
| `--api_key` | (env var) | API key |
| `--max_turns` | `10` | Max tool-calling iterations per prompt |
| `--num_workers` | `4` | Parallel worker processes |
| `--resume` | `false` | Resume from checkpoint |
| `--verbose` | `false` | Verbose logging |
| `--max_samples` | all | Only first N samples |
| `--providers_allowed` / `--providers_ignored` / `--providers_order` | | OpenRouter provider routing (comma-separated) |
| `--provider_sort` | | `price`, `throughput` or `latency` |
| `--reasoning_effort` | | `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`, `ultra` |
| `--reasoning_disabled` | | Disable reasoning/thinking tokens |
| `--ephemeral_system_prompt` | | Used during execution but NOT saved to trajectories |
| `--log_prefix_chars` | 100 | Characters in log previews |
| `--prefill_messages_file` | | JSON file of prefill messages for few-shot priming |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/batch-processing (pinned to v0.22.2)
- Toolset distributions assign a probability to each individual toolset; the sampler flips each independently and guarantees at least one is enabled.
- Output in `data/<run_name>/`: `trajectories.jsonl` (merged), `batch_N.jsonl`, `checkpoint.json`, `statistics.json`. Each trajectory line has `prompt_index`, `conversations` (`from`/`value`, ShareGPT-like), `metadata`, `completed`, `partial`, `api_calls`, `toolsets_used`, `tool_stats`, `tool_error_counts`; tool stats are normalized with zero defaults for HuggingFace dataset compatibility.
- Resume is content-based (matches completed prompts by text, not index); only successfully completed prompts are marked done, failed ones retry; all batch files are merged on completion.
- Quality filtering: samples with zero assistant turns containing reasoning (`<REASONING_SCRATCHPAD>` or native thinking tokens) are discarded; entries with hallucinated tool names are removed during the final merge.
- Docker images per prompt are verified accessible before each run.

## Related

- [Delegation](./delegation.md)
- [Code Execution](./code-execution.md)
