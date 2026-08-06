# Prompting

General guidance for writing effective prompts across Chat, ChatGPT Work, and Codex, plus Codex-specific prompting workflows (explain a codebase, fix a bug, write a test, code review, delegate to cloud).

## Signature / Usage

```text
Bug: Clicking "Save" on the settings screen sometimes shows "Saved" but doesn't persist the change.

Repro:
1) Start the app: npm run dev
2) Go to /settings
3) Toggle "Enable alerts"
4) Click Save
5) Refresh the page: the toggle resets

Constraints:
- Do not change the API shape.
- Keep the fix minimal and add a regression test if feasible.

Start by reproducing the bug locally, then propose a patch and run checks.
```

## Options / Props

| Name | Description |
|------|-------------|
| Goal | What Codex should do. |
| Context | Information/sources that help (files via `@`/`/mention`, repro steps, constraints). |
| Output | Format, length, level of detail needed. |
| Boundaries | What must stay unchanged; what to avoid or confirm before acting. |

## Notes

- A useful Codex prompt names the target behavior, points to relevant code or reproduction steps, states constraints, and says how to verify the change.
- `/plan` (app composer) asks Codex to investigate and propose an approach before editing a multi-step task; `/goal` sets a persistent goal once Goal mode is available.
- The IDE extension automatically includes open files as context; in the CLI, mention paths explicitly or attach files with `/mention` and `@` path autocomplete.
- Codex runs local commands inside a sandbox limiting file/network access; crossing that boundary requires following the approval policy.
- Steering vs queuing a follow-up while Codex is working: **Steer** injects the message into the current run (CLI: `Enter`); **Queue** saves it for the next run (CLI: `Tab`).
- `/review` runs a local code review of the working tree (optionally with focus instructions, e.g. `/review Focus on edge cases and security issues`); `@codex review` triggers review from a GitHub PR comment.
- Documented Codex workflows: explain a codebase, fix a bug, write a test, prototype from a screenshot, iterate on UI with live updates, delegate a refactor to the cloud, do a local code review, review a GitHub pull request, update documentation — each pairs an IDE and/or CLI workflow with context notes and a verification step.

## Related

- [Custom Instructions with AGENTS.md](./agents-md.md)
- [Subagents](./subagents.md)
