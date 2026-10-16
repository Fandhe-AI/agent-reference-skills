<!-- source: https://code.claude.com/docs/en/communications-kit.md / last verified: 2026-10-16 -->

# Communications kit

Launch announcements, drip-campaign messages, and FAQ responses for rolling Claude Code out to your engineering organization. Aimed at administrators and engineering leads; all copy is draft material to rewrite in your organization's voice.

## Signature / Usage

Standard org-wide announcement (Email variant):

```text
Subject: Claude Code is live for [Engineering / your team]

Team,

As of today you have access to Claude Code, an AI coding agent that runs in
your terminal, reads your actual codebase, and works through real tasks end
to end: debugging, refactors, tests, PRs. It is not autocomplete and it is
not a chat window. It edits files and runs your commands.

Get running in two minutes:

    curl -fsSL https://claude.ai/install.sh -o install.sh
    less install.sh   # review before running
    bash install.sh
    cd <your-repo>
    claude

Then run /init once. Claude reads your project and writes a CLAUDE.md with
your build commands and conventions, so you stop re-explaining the basics.

Where your code goes: Claude Code runs in your terminal and talks directly
to Anthropic's API. On our Team or Enterprise plan, Anthropic does not use
your code or prompts to train its models.
Details: https://code.claude.com/docs/en/data-usage
         https://code.claude.com/docs/en/security

Where to go with questions: #claude-code. [Owner name] is watching it
this week.
```

## Options / Props

Pre-send checklist ("Before you send"):

| Item | Why it matters |
| --- | --- |
| `#claude-code` channel created and linked in the message | Gives questions one place to land |
| Install command tested on at least one machine in your environment | Catches proxy or firewall issues before everyone hits them at once |
| Security and data-handling link ready (Data usage or internal equivalent) | "Where does my code go?" will be the first reply |
| One concrete first task chosen, a real bug or file in your codebase | Generic examples don't convert; "fix the flaky test in `auth_test.go`" does |
| A named owner for the channel for the first 48 hours | Unanswered launch-day questions kill momentum |
| A C-suite sponsor lined up to send or co-sign the announcement | Exec-sent launches consistently see higher first-week adoption than admin-sent ones |

Announcement variants provided on the page:

| Variant | Use |
| --- | --- |
| Announcement (Email / Slack or Teams) | Standard org-wide rollout: what it is, two-minute install, one concrete task, data handling |
| Executive sponsor variant | Sent under a CTO / CIO / SVP Engineering name; stripped to one ask: install and run it on one real task |
| Pilot group variant | Phased rollout; asks pilots to post feedback in `#claude-code-pilot`; suggests Shift+Tab until "plan" on the first multi-file change |
| Champion recruitment DM | After launch, DM the two or three most active people in `#claude-code` |

Tips and tricks campaign (drip one or two a week; each is hook, payoff, "try it now" prompt, docs link; no required order):

| Section | Tips |
| --- | --- |
| Get started | Choosing the right model; Quick wins to try first |
| Project memory | `/init` and CLAUDE.md; @-references |
| Control and safety | Permission modes (Shift+Tab); Checkpointing and `/rewind` |
| Connect your tools | MCP connectors (`.mcp.json`) |
| Automate your workflows | Skills (`.claude/skills/<name>/SKILL.md`); Hooks (Stop hook notification) |
| Day-to-day development | Screenshots and images; Git workflows |
| Share and scale | Plugins (`/plugin`) |
| Security and admin | Security architecture; Best practices (4 habits) |

Model tip table (as written on the page):

| Model | Best for |
| --- | --- |
| Fable | The hardest, longest-running tasks. Opt-in only: select it with `/model fable`. Cybersecurity or biology content triggers automatic model fallback to Opus |
| Opus | Large-scale refactors, complex debugging, architecture decisions, high-stakes changes. On Opus 5.5 and Opus 5, cybersecurity or biology content triggers automatic model fallback or a refusal |
| Sonnet | Everyday feature work, bug fixes, tests, documentation, code review. Recommended default. On Sonnet 5.5, cybersecurity or biology content triggers automatic model fallback or a refusal |
| Haiku | Quick questions, formatting, mechanical edits, rapid iteration |

FAQ responses (one-liners):

| Question | Response |
| --- | --- |
| "Does it work in VS Code?" | Yes. There is a VS Code extension and a JetBrains plugin with the same features, embedded in your editor |
| "Do I have to configure anything first?" | No. Install, then run `claude` in any repo. Run `/init` once and you're set |
| "Where does my code go?" | The CLI runs in your terminal and sends context to Anthropic's API for inference. On a Team or Enterprise plan, your code and prompts are not used to train models |
| "Can it see my whole repo?" | It reads what you give it access to. File reads inside your working directory don't prompt |
| "How is this different from Copilot?" | Copilot autocompletes lines. Claude Code is an agent that reads files, runs commands, and makes multi-file edits |
| "What should I try first?" | A bug you've been putting off because it's tedious |

Prompt templates (replace bracketed pieces with files from your repo):

| Task | Prompt |
| --- | --- |
| Fix a bug | "the tests in [file] are failing, figure out why and fix it" |
| Understand code | "walk me through how [module] works, then tell me where the entry point is" |
| Safe refactor | "refactor [module] to [goal], use plan mode so I can review first" |
| Write tests | "write tests for [file] that cover the edge cases around [scenario]" |
| Review before commit | "look at my working diff and tell me what looks risky" |
| Open a PR | "fix [issue], write a conventional commit, and open a PR with a summary" |
| Make a skill | "make me a /ship skill that runs tests and lint before commit" |
| Debug a stack trace | "here's the stack trace, find the root cause, don't just paper over it" |

## Notes

- Treat everything on the page as draft copy: rewrite in your organization's voice, swap example tasks for real bugs and modules from your codebase, and replace `[bracketed placeholders]` before sending.
- Permission modes tip describes Shift+Tab cycling: Manual (the `default` setting value), acceptEdits, and plan.
- Model names and fallback behavior are transcribed as written on the page (retrieved 2026-10-16); the page itself advises verifying version-specific details against the documentation home page before distributing internally.
- The official announcement email installs in one line by piping `curl -fsSL https://claude.ai/install.sh` straight into `bash`; this page's sample replaces that line with a download, inspect, then run sequence (`curl -fsSL https://claude.ai/install.sh -o install.sh`, review it, then `bash install.sh`). Before distributing, test it in your environment, or use your internal distribution channel. See the install page of the anthropic-claude-code skill.
- This page targets administrators and engineering leads; the individual-engineer counterpart is the champion-kit page.

## Related

- [champion-kit](./champion-kit.md)
- [data-usage](../permissions-security/data-usage.md)
- [permissions](../permissions-security/permissions.md)
