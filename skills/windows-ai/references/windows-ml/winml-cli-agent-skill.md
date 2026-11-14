# Use Windows ML CLI (winml-cli) with AI Agents

The `microsoft/winml-cli` repository ships three agent skills (`use-winml-cli`, `adding-model-support`, `auto-optimize`) so AI coding agents can build and run models, contribute missing model support, or investigate ONNX inference latency.

## Signature / Usage

### Choose a skill and load it

Make the complete selected directory under `skills/` of the repository available to an agent runtime that supports skills or custom instructions. For agents that only support custom instructions, attach the entry point as context:

```text
skills/use-winml-cli/SKILL.md
skills/adding-model-support/SKILL.md
skills/auto-optimize/SKILL.md
```

With the GitHub Copilot Coding Agent, reference the skill's `SKILL.md` in `.github/copilot-instructions.md`; the agent reads that file automatically when it works in the repository. Keep linked references and scripts available because some workflows use those files during execution, then describe your goal in natural language.

### use-winml-cli (model preparation)

The skill (also called a Copilot Skill) lets an agent drive the model-building pipeline: inspect models, generate configs, run builds, and interpret results. Location:

```text
winml-cli/
└── skills/
    └── use-winml-cli/
        └── SKILL.md          ← the skill definition
```

Example agent interaction:

```text
User: Can I run ConvNeXt on my Snapdragon X Elite NPU?

Agent (with skill):
1. Runs `winml sys --list-ep` → confirms QNNExecutionProvider is registered
2. Runs `winml inspect -m facebook/convnext-tiny-224` → checks model support
3. Runs `winml config -m facebook/convnext-tiny-224 --device npu --ep qnn --compile -o config.json`
4. Runs `winml build -c config.json -m facebook/convnext-tiny-224 -o output/`
5. Runs `winml perf -m output/model.onnx --device npu --ep qnn --monitor`
6. Runs an appropriate `winml eval` workflow and reports performance and quality separately
```

### adding-model-support (contribution workflow)

Contributes support for one unsupported or partially supported model to `microsoft/winml-cli`. The model ID is enough to start; a known failure, target device, or EP is useful but optional.

```text
Add winml support for <organization>/<model>.
```

```text
Add winml support for <organization>/<model>. Export currently fails, and I
need it validated on the execution providers available on this machine.
```

Use it when `winml inspect`, `config`, `build`, `perf`, or `eval` fails for the model, or the model needs a recipe, exporter, resolver, task mapping, dataset adapter, or evaluator. Do not use it to run, benchmark, or tune a supported model, optimize an existing recipe, add a new EP backend, or process multiple models in one contribution. Directory layout:

```text
adding-model-support/
├── SKILL.md                 # trigger and workflow dispatcher
├── agents/                  # role contracts
├── model_knowledge/         # evidence-scoped model-family findings
├── skill_meta/              # findings about the workflow itself
├── evals/                   # trigger and response evaluations
├── scripts/                 # bounded workflow utilities
└── tests/                   # skill contract tests
```

### auto-optimize (experimental latency optimization)

Reduces ONNX inference latency on a specified EP and device: profiles the baseline, tests graph optimizations, checks correctness before performance, and publishes a reproducible output bundle. Provide the model, target EP/device, optimization goal, working directory, and Windows ML CLI checkout (`WINML_CLI_REPO`).

```text
Use the auto-optimize skill to optimize ./models/fp32/model.onnx for QNN on the
NPU. Minimize median batch-1 latency while keeping mean output cosine similarity
>= 0.99 against the same FP32 model on CPU. Use sequence length 128 and fixed,
meaningful text inputs saved under ./optimization-run/inputs. Write all evidence
to ./optimization-run and use <path-to-winml-cli> as WINML_CLI_REPO.
```

Validate an existing candidate:

```text
Validate ./candidate.onnx against ./baseline.onnx using the inputs and
provider options in my existing run directory. Check correctness first;
do not start a new optimization search.
```

Directory layout:

```text
auto-optimize/
├── SKILL.md       # workflow and gates
├── roles/         # scouting, engineering, performance, and review contracts
├── references/    # resume, capability closure, complexity, and PR routing
├── knowledge/     # model-agnostic, evidence-backed optimization findings
├── scripts/       # planning, reports, publication, promotion, and case storage
├── tests/         # helper and skill contract tests
└── evals/         # live-agent behavioral evaluations
```

## Options / Props

### Which skill to use

| Goal | Skill |
|------|-------|
| Build, optimize, compile, benchmark, or troubleshoot a supported model (including CPU, GPU, NPU EPs) | `use-winml-cli` |
| Add or repair model support and prepare a validated contribution (one model per run, independent validation and review) | `adding-model-support` |
| Investigate latency or validate optimization candidates on an EP/device (experimental search; routine optimization stays in `use-winml-cli`) | `auto-optimize` |

### use-winml-cli: what the skill teaches the agent

| Capability | What the agent learns |
|------------|-----------------------|
| Pipeline shape | Stage order (`inspect → export → analyze → optimize → quantize → compile → perf`) and when to enter mid-pipeline |
| Flag discovery | Always run `winml <command> --help` before quoting a command; never fabricate flags |
| Output mapping | Which command's `-o` produces the artifact the user needs |
| Scope awareness | Check the current model catalog; distinguish supported single-model, composite, and recipe-specific GenAI workflows |
| Hardware detection | Use `winml sys --list-ep` to confirm what's available before targeting an EP |
| Two paths | Primitives (debugging, exploring) vs. config + build (production, CI) |

### Deliverables

| Skill | Output |
|-------|--------|
| `adding-model-support` | Focused model-support change, Pytest coverage, a checked-in recipe when required, per-target build/analysis/runtime/performance evidence, one bounded FP32 CPU functional smoke evaluation, a pushed branch and draft PR labeled `model-scale-by-skill`, an independent verdict (`APPROVE`, `REJECT`, or `BLOCKED`), and scoped findings in `model_knowledge` / `skill_meta` |
| `auto-optimize` | `champion.onnx` and companions, `winml_config.json`, `rebuild_config.json`, `report.json`, `report.html`, hash-bound `manifest.json`, `repro.ps1` (including `-ValidateOnly`), `repro-run.ps1`, `repro.lock.json`, `perf_input.npz`, `eval_inputs.npz`, `inputs_manifest.json`, and a standalone `promotion_handoff.json` created after bundle validation |

## Notes

- This is an Agent Skill for AI agents operating the Windows ML CLI (`winml`) from the `microsoft/winml-cli` repository, distinct from Claude Code Agent Skills (SKILL.md).
- Repository source directories under `skills/` are not automatically registered by every agent host; start a fresh session after changing installed skills and verify the agent read the intended file (record its resolved path and SHA-256 to distinguish stale copies from workflow failures).
- The agent needs a working CLI environment and the target hardware for runtime measurements; a cloud-hosted agent doesn't inherit your PC's NPU. Review proposed commands, artifact changes, and validation evidence; a loaded skill doesn't guarantee a successful deployment.
- `adding-model-support` is a contribution workflow, not a command for building an already supported model. If a required capability is unavailable, it stops early as `BLOCKED`. If the GitHub API cannot create the pull request, it provides the branch link and prepared body. A smoke evaluation proves bounded end-to-end operability, not representative model accuracy.
- `auto-optimize` doesn't guarantee a speedup or automatically merge changes. Replay requires PowerShell 7.3 or newer; draft PR creation needs GitHub access and the existing `model-opt-by-skill` label (not created automatically). The check-in reviewer returns `READY_FOR_CHECK_IN`, `CHANGES_REQUESTED`, `PERF_NOT_PROVEN`, or `BLOCKED`; readiness doesn't merge the PR. Recipe contributions are routed to `adding-model-support`.
- `auto-optimize` correctness comes before performance; screening uses alternating A/B and B/A runs, and statistical ties are labeled as ties, not speedups. On resume it starts at the first unverified gate; changes to model, inputs, options, or toolchain invalidate affected evidence. Failed replay blocks publication; artifacts depending on unmerged code are marked `requires-unmerged-pr`.
- `auto-optimize` records (`scripts/workflow.py`: `prepare`, `status`, `record`, `deliver`) are attestations, not authentication of reviewers or proof that hardware commands ran. Use a new directory for each delivery attempt.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/getting-started/agent-skill, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/getting-started/agent-skill/model-preparation-agent, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/getting-started/agent-skill/adding-model-support, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/getting-started/agent-skill/auto-optimize (retrieved 2026-11-14)

## Related

- [Windows ML CLI (winml-cli) Overview](./winml-cli.md)
- [winml-cli quickstart](./winml-cli-quickstart.md)
- [winml-cli contributing](./winml-cli-contributing.md)
