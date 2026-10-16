<!-- source: https://code.claude.com/docs/en/plugin-evals.md / last verified: 2026-10-17 -->

# Plugin eval case

An eval case (`prompt.md` plus graders) for a plugin skill, scaffolded with `claude plugin eval init --bare` and run with `claude plugin eval`.

```bash
claude plugin eval init --bare first-case
```

```markdown evals/first-case/prompt.md
---
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill]
---

Write me a commit message for this change: I renamed getUser to fetchUser and updated the three call sites.
```

```markdown evals/first-case/graders/criteria.md
---
type: llm
---

PASS if <what a correct response contains>.
FAIL if <what a wrong or missing response looks like>.
```

```markdown evals/first-case/graders/skill-fired.md
---
type: tool_used
tool: Skill
input_match: '"skill"\s*:\s*"(?:[\w-]+:)?your-skill-name"'
---
```

Run every case from the plugin root, or iterate on one case with a single arm:

```bash
claude plugin eval .
claude plugin eval . --case <case-name> --runs 1 --ablation none
```

## Notes

- A directory under `evals/` is a case when it holds `prompt.md` or `case.yaml`; a case without at least one grader fails to load with an `invalid case.yaml` error.
- Replace `your-skill-name` with the skill's directory name under `skills/`, and the `criteria.md` placeholders with concrete PASS / FAIL conditions.
- Each case runs three times with the plugin and three times without it by default; a positive `Δ` in the summary means the plugin raised the score.
- Requires git 2.31 or later if git is installed; `claude plugin eval` loads and runs the plugin's code, so evaluate only plugins you trust.
