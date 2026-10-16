<!-- source: https://code.claude.com/docs/en/champion-kit.md / last verified: 2026-10-16 -->

# Champion kit

A playbook for engineers advocating Claude Code internally: what to share, how to answer questions, and how to grow adoption on your team. Aimed at individual engineers already using Claude Code, not administrators.

## Signature / Usage

Example posts (from "The format that works"; screenshot plus one or two sentences of context):

```text
Learned today that @-mentioning a directory works. I pointed it at
@src/components/ and asked which components were missing tests, and it
surfaced two I had forgotten about.
```

Answer with the prompt actually used:

```text
Colleague: How did you get it to find that race condition?

Champion: I asked, "The test in @tests/scheduler.test.ts is flaky, figure
out why," and it traced two unjoined promises in the scheduler. Try the
same phrasing on your test.
```

## Options / Props

The champion role (three reinforcing behaviors):

| Behavior | What it looks like in practice |
| --- | --- |
| Share what you discover | Post prompts, screenshots, and small wins in places your team already reads (engineering channel, standup thread, PR description) |
| Be the person people ask | Respond with the actual prompt you used so colleagues can apply it to their own task |
| Grow the circle | Establish lightweight recurring habits (a dedicated channel, a weekly thread) so momentum continues without you |

Expected time cost:

| Activity | Time per week |
| --- | --- |
| Posting wins and prompts | About 15 minutes |
| Answering questions in a shared channel | About 20 minutes |
| Hosting a weekly show-and-tell thread | About 5 minutes |
| Optional pairing or walkthroughs | 0 to 30 minutes |

Where to share:

| Location | Recommended format |
| --- | --- |
| `#claude-code` or general engineering channel | A screenshot with one or two sentences of context |
| Pull-request descriptions | A single line such as "Claude and I did this refactor; happy to walk through the approach." |
| Standups or weekly written updates | One sentence describing one concrete outcome |
| Team wiki or internal documentation | A short page, linked from the channel topic |

Likely questions:

| Question | Suggested response |
| --- | --- |
| "What should I try it on first?" | A real but contained task, ideally a bug or chore postponed because it is tedious |
| "How do I trust it with my code?" | Plan mode: `Shift+Tab` cycles into it; Claude researches and proposes changes without editing your source |
| "Is the setup worth the effort?" | Install takes roughly two minutes, runs in the terminal, no IDE extension needed; run `/init` once |
| "It produced an incorrect result." | Paste the error message or failing test back to Claude rather than rephrasing |
| "It does not understand our codebase conventions." | Run `/init` to generate `CLAUDE.md`, then add team conventions, test commands, directories to avoid |
| "Is this just autocomplete?" | Demo: explain an unfamiliar file, trace a bug across services, or draft a migration plan |
| "What about security and data handling?" | Refer to your administrator; do not improvise the answer |

Patterns that tend to work:

| Pattern | How to run it |
| --- | --- |
| A dedicated channel | Create `#claude-code`, pin the Quickstart link and one strong example, answer publicly |
| A weekly show-and-tell thread | Each Friday post "What did Claude help you with this week?" |
| Share a custom skill | Post a useful `.claude/skills/<name>/SKILL.md`, e.g. a `/ship` skill that runs tests and lint before committing |
| Generate a setup guide from your own usage | Run `/team-onboarding` in a project you have spent real time in; Claude scans recent sessions, commands, and MCP servers and produces a guide a new teammate can paste as a first message |
| Pair on a first task | One fifteen-minute pairing session per person getting started |
| Identify the next champion | Forward the page to the colleague who asks the most questions |

Thirty-day playbook:

| Week | Actions | Signal it is working |
| --- | --- | --- |
| 1: Seed the channel | Create the channel, pin the Quickstart, post two or three examples with prompts | A few reactions or replies; at least one question asked |
| 2: Start the rhythm | Start weekly show-and-tell, answer every question publicly, share one custom skill or `CLAUDE.md` snippet | Someone other than you posts an example |
| 3: Pair and consolidate | Offer two or three short pairing sessions; consolidate common Q&A into a pinned FAQ message | Repeat usage from the same colleagues |
| 4: Hand off | Identify a second champion; share a summary of what is working with your lead or administrator | Questions answered by people other than you |

Common concerns:

| Concern | Suggested response |
| --- | --- |
| "I am faster without it." | Try it on work normally avoided: legacy files, unfamiliar services, test scaffolding; time one tedious task both ways |
| "I do not trust AI to touch production code." | No change should land unread; use plan mode, then review the diff like any pull request |
| "It will make junior engineers weaker." | Have them ask Claude to explain a file and its call sites before asking it to change anything |
| "I tried it once and it hallucinated." | Usually a context problem: @-mention relevant files, run `/init`, supply actual error output |
| "We do not have time to learn another tool." | It is a terminal command, not a platform; if no value in the first session, set it aside |

Quick-reference sheet:

| Technique | How to apply it |
| --- | --- |
| Provide the right context | `@file` or `@directory/` references, or paste the error or log output |
| Review the plan before the edit | `Shift+Tab` to enter plan mode |
| Teach it your repository | Run `/init`, then add conventions, test commands, off-limits directories |
| Reuse a workflow | Save `SKILL.md` in `.claude/skills/<name>/` to create a `/name` skill |
| Stay informed during long tasks | Configure a Stop hook for a desktop notification |
| Recover from an incorrect result | Paste the failing test or stack trace back and ask it to address that failure |
| Keep edits surgical | Ask for a diff, or specify "only change X" |

## Notes

- The role should be a multiplier on existing work, not an additional support responsibility; the page frames the time costs above as fitting a normal working week.
- Security and data-handling questions should go to the administrator; champions should not improvise answers.
- Deeper onboarding is delegated to the Quickstart and Common workflows pages on the official site.
- The page advises verifying version-specific details against the documentation home page before distributing the material internally. Retrieved 2026-10-16.
- Administrator-side counterpart is the communications-kit page.

## Related

- [communications-kit](./communications-kit.md)
- [permissions](../permissions-security/permissions.md)
- [data-usage](../permissions-security/data-usage.md)
