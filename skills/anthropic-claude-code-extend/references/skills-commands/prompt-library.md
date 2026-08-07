<!-- source: https://code.claude.com/docs/en/prompt-library / last verified: 2026-08-07 -->

# Prompt library

A library of copy-paste prompts for Claude Code, tagged by task and SDLC phase. Collected from Anthropic's Common workflows, Best practices, and "How Anthropic teams use Claude Code" guides. Prompts are starting points rather than scripts — open "Why this works" on the live page under any prompt to see the pattern behind it.

## Signature / Usage

```text
give me an overview of this codebase: architecture, key directories, and how the pieces connect
```

```text
write tests for {path}, run them, and fix any failures
```

## Options / Props

Categories (SDLC phase → tags), representative prompts per phase:

| Phase | Tag | Example prompt |
| --- | --- | --- |
| Discover | Onboard / Understand | "give me an overview of this codebase" · "where do we {behavior}?" |
| Design | Plan / Prototype | "plan how to refactor the {target} to {goal}. list the files you would change, but don't edit anything yet" |
| Build | Implement / Test / Refactor / Review / Steer | "write tests for {feature} first, then implement it until they pass" · "review my uncommitted changes and flag anything that looks risky" |
| Ship | Git / Release | "commit these changes with a message that summarizes what I did" · "write a GitHub Actions workflow that {steps} on every push to {branch}" |
| Operate | Debug / Incident / Data / Automate | "the {test} test is failing, find out why and fix it" · "create a /{name} skill for this project that {steps}" |

## Notes

- Six recurring patterns make these prompts work: describe the outcome not the steps; give Claude a way to check its own work (run/test/compare/verify); point at a reference file or pattern to match; state a measurable target; paste the artifact (error/log/screenshot) directly or `@`-mention a file; say how you want the answer formatted (pair with an output style for a lasting default).
- This page renders as an interactive filterable widget on the live site; the content above is the underlying prompt set, not a literal page transcript.
- This is a Claude Code CLI feature. For the Agent SDK equivalent, see anthropic-agent-sdk. For the Claude API (Messages API) Agent Skills / tool use, see anthropic-api-tools-mcp.

## Related

- [output-styles.md](./output-styles.md) — make a prompt's answer format the session default
- [skills.md](./skills.md) — turn a recurring prompt into a reusable `/command`
