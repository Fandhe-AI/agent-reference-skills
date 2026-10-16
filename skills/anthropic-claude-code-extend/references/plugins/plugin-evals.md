<!-- source: https://code.claude.com/docs/en/plugin-evals.md / last verified: 2026-10-17 -->

# Test plugins with evals

`claude plugin eval` runs a plugin against a suite of cases (a prompt plus graders), scores the results, compares against a no-plugin baseline, and can gate CI. Requires Claude Code v2.1.269 or later and git 2.31 or later (if git is installed).

## Signature / Usage

```bash
claude plugin eval init                     # interactive authoring interview
claude plugin eval init --bare first-case   # blank template, runs nothing
claude plugin eval .                        # run every case under evals/
claude plugin eval . --case <case-name> --runs 1 --ablation none
```

```markdown
---
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill]
---

Write me a commit message for this change: I renamed getUser to fetchUser and updated the three call sites.
```

```markdown
---
type: tool_used
tool: Skill
input_match: '"skill"\s*:\s*"(?:[\w-]+:)?your-skill-name"'
---
```

```text
my-plugin/
└── evals/
    ├── first-case/
    │   ├── prompt.md          # frontmatter: case fields; body: the prompt
    │   ├── graders/*.md       # one grader per file
    │   └── case.yaml          # optional: context.* fields
    ├── mocks/                 # optional suite-wide MCP mocks
    └── results/               # written by each run; add to .gitignore
```

```bash
claude plugin eval . \
  --trust-plugin \
  --json results.json \
  --threshold 0.8 \
  --model claude-sonnet-5 \
  --judge-model claude-haiku-4-5 \
  --no-publish \
  --max-cost-usd 20
```

## Options / Props

| prompt.md frontmatter | Default | Purpose |
| --- | --- | --- |
| `schema_version` | `"1.1"` | Case format version |
| `name` | directory name | Case name |
| `description`, `expected_outcome` | | For humans; unused at run time |
| `tags` | `[]` | Labels for `--tag` filtering |
| `plugins` | nearest enclosing plugin | Plugin directories under test (e.g. `["../.."]`) |
| `runs` | `3` | Runs per arm, 1 to 50 |
| `model` | child default | Model for the agent under test; `--model` overrides |
| `max_turns` | `10` | Turn cap, up to 200 |
| `timeout_seconds` | `300` | Per-run wall-clock cap, up to 3600 |
| `allowed_tools` | `[]` | Tools the case wants; read-only tools granted when listed |
| `append_system_prompt` | | Appended to the child system prompt |
| `env` | `{}` | Extra variables; keys must match `EVAL_[A-Z0-9_]*` |

| case.yaml-only field | Purpose |
| --- | --- |
| `context.scaffold_script` | Bash script run in the empty workspace (only with `--scaffold`, 120 s limit) |
| `context.history_file` | `.jsonl` transcript to resume; prompt becomes next user turn |
| `context.add_dirs` | Read-only fixture directories |
| `execution.prompt` | Prompt when no `prompt.md`; `model`, `max_turns`, `timeout_seconds`, `allowed_tools`, `append_system_prompt`, `env` go under `execution:` |
| `graders` | List of graders (`name` plus frontmatter keys; rubric in `criteria`) |

| Grader key | Default | Purpose |
| --- | --- | --- |
| `type` | required | Grader type |
| `weight` | `1` | Relative weight |
| `arm` | unset | `with-only` or `both` |

| Grader type | Options | Passes when |
| --- | --- | --- |
| `regex` | `pattern`, `flags`, `match`, `target` | JS regex found in target; `match: not_contains` or `"count:N"`; use `flags: i` (no `(?i)`) |
| `tool_used` | `tool`, `input_match`, `min`, `max` | Matching call count within `min` (default 1) and `max`; never called = `min: 0`, `max: 0` |
| `tool_order` | `before`, `after` | First `before` call precedes first `after` call |
| `file_exists` | `path`, `exists` | A file created during the run matches the glob (or none with `exists: false`) |
| `llm` | `criteria`, `focus` | Judge votes PASS in at least two of three votes |
| `baseline` | `baseline_file`, `criteria` | Judge finds run at least as good as reference transcript |

| `target` / `focus` value | Sees |
| --- | --- |
| `last_message` (default) | Final response text |
| `trace` | Session as JSON per line (judge sees first 12 and last 12); quotes JSON-escaped |
| `files` | Paths Claude created (not contents) |
| `{ source: file, path: <path> }` | Contents of one workspace file after the run |
| `mock_calls` | Calls to mocked MCP tools with inputs and answers |

| Command option | Default | Effect |
| --- | --- | --- |
| `--runs <n>` | case `runs`, else 3 | Runs per case per arm |
| `-j, --concurrency <n>` | `1` | 1 to 8 concurrent agent runs |
| `--model` / `--judge-model` | case model, else `ANTHROPIC_MODEL`, else default / background-task model | Agent under test / judge |
| `--ablation none\|with-without` | per case | Whether to run the no-plugin baseline |
| `--threshold <0..1>` | `1.0` | Case passes when with-arm score is at least this |
| `--max-cost-usd` | none | List-price ceiling; exit 2 with partial results |
| `--allow-tools` | none | Grant tools beyond read-only set |
| `--scaffold`, `--trust-plugin` | off | Run scaffold scripts; skip trust prompt |
| `--mocks record\|off`, `--allow-real-servers` | `record` | MCP mocking |
| `--json [path]`, `--output-dir`, `--no-publish`, `--publish-report`, `--keep-temp` | | Output controls |

| Exit code | Meaning |
| --- | --- |
| 0 | Suite passed |
| 1 | Below-threshold case, load error, no cases, run could not start, API-error run, untrusted directory, invalid option, or unwritable `--json` |
| 2 | Partial run (cost ceiling hit or credential rejected) |
| 130 / 143 | Interrupted / terminated |

| Mock file key | Default | Purpose |
| --- | --- | --- |
| `type` | `fixed` | `fixed` returns body; `agent` has the judge model act as the server |
| `expect` | unset | Guard on input (type name, `/regex/`, literal, or list of literals); violation aborts the run with score 0 |
| `error` | `false` | `fixed` only; return body as a tool error |
| `abort_when` | unset | `agent` only |

## Notes

- Scoring: a run's score is the fraction of passed graders (weighted); a case's score is the mean across runs. Each case runs three times by default with the plugin (with-arm) and again without (without-arm); `Δ` = with minus without. Cost is roughly cases x runs agent runs per arm plus three short judge calls per `llm` / `baseline` grader per run.
- Runs one arm only: `--ablation none`; `context.history_file` cases with a path target; no plugin found for the case when target is a path. In two-arm runs, `tool_used: Skill`, `mock_calls` graders on plugin-declared mocked servers, and `arm: with-only` graders are reported with `scored: false`; `arm: both` forces scoring in both arms; if every grader would be excluded they are scored normally.
- `regex`, `tool_used`, `tool_order`, `file_exists` are free; `llm` and `baseline` call a judge model. There are no custom-code graders. Prefer `regex` over file contents for long output; pair one result grader with one process grader (`tool_used` / `tool_order`).
- Targets: `.` or plugin root, a single `prompt.md` / `case.yaml`, an installed plugin (`name` or `name@marketplace`), or `name@skills-dir`. Put the target before `--tag`, `--allow-tools`, `--json`. Use `--eval-dir` (relative plain directory names) or `"experimental": { "evals": "quality/evals" }` in `plugin.json` for another eval directory.
- Runs never prompt for permission: tools needing a grant (`Bash`, `Write`, `Edit`, `WebFetch`, `WebSearch`) are removed unless granted via `--allow-tools`; progress shows `not granted`. Granting Bash runs commands under the OS sandbox (WSL2 on Windows; `bubblewrap` and `socat` on Linux); network only for `WebFetch(domain:...)` grants. Plugin MCP tools are named `mcp__plugin_<plugin>_<server>__<tool>` and need both real-server start and a grant.
- Mocks: `evals/mocks/<server>/<tool>.md` (suite) or a case's `mocks/`; body is the tool result with `{{input.<field>}}` and `{{file:fixtures/...}}`; `_server.md` and `_tools.json` optional. Agent-mock answers are budgeted at four times `max_turns` per run (`mock call budget exceeded` aborts with score 0); recordings saved under `mock-recordings/` with `ADOPT.txt` can be copied to `mocks/.replay/`. `expect` regex dialect: literals, `.`, escapes, classes, quantifiers on single items, optional `^` / `$`, flags `i` and `s` only.
- Isolation: each run has a temporary home, working directory, and configuration with only the plugin loaded; user settings, `CLAUDE.md`, other plugins, MCP servers, memory are absent; managed policy still applies; Artifact tool off; eval directory hidden from the agent; only an allowlist and `EVAL_*` variables reach the run.
- First run against a path asks `Trust this plugin directory?` (inside a git repo this trusts the repository); non-terminal or `--json` runs are refused (exit 1) unless `--trust-plugin`. Plugin hooks and real MCP servers run outside the sandbox, so treat scores as advisory outside an isolated environment.
- Results: `results/<timestamp>/` with `aggregate-result.json` (`schemaVersion: 1`; fields include `partial`, `partialReason`, `aggregates.overallScore`, `casesPassed`, `casesTotal`, `meanDelta`, `cases[].arms.with[].error` / `aborted` / `skippedPaidGraders`, `costUsd`) and a self-contained `report.html`. Publishing as a private artifact needs a claude.ai subscription; sessions started from Claude Code keep the report local unless `--publish-report`.
- Runs that end on an API error (rate / usage limit) score 0 without grading and make the command exit non-zero (before v2.1.299 such runs were graded on what they produced). In CI, `eval init` needs `--bare <name>`.
- Baseline-arm errors like `Agent type '<plugin>:<agent>' not found` are expected; use `--ablation none` to skip them. `git` older than 2.31 stops the run (check added in v2.1.283).
- skill-creator's `evals/evals.json` format is separate; neither tool reads the other's case files.

## Related

- [Measure plugin cost and usage](./measure-plugin.md)
- [Publish and distribute a plugin](./publish-plugin.md)
- [Plugin commands reference](./plugin-cli-reference.md)
