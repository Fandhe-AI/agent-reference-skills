# Hono for Coding Agents

Hono is a good fit for coding agents. The API is small and built on Web Standards, so an agent already knows most of it. This page lists what we provide so that agents work well with Hono.

## Signature / Usage

### Getting started

Create a project, then run your agent in it.

```sh
npm create hono@next my-app
```

The templates come with what an agent needs: an `AGENTS.md` that tells the agent how to check the app, and [Hono CLI](https://hono.dev/docs/agents/cli) as a dev dependency. Nothing else to set up.

### Documentation for agents

Every page on this site is available as Markdown. Fetch it with the `Accept: text/markdown` header:

```sh
curl -H 'Accept: text/markdown' https://hono.dev/docs/api/routing
```

To find the right page, start from [`/llms.txt`](https://hono.dev/llms.txt). It lists every page with a one-line description. [`/llms-full.txt`](https://hono.dev/llms-full.txt) has the whole documentation in one file, and [`/llms-small.txt`](https://hono.dev/llms-small.txt) is a shorter version.

### Hono Skills

[Hono Skills](https://github.com/honojs/skills) are [Agent Skills](https://agentskills.io) for Hono. The `hono` skill gives an agent an inline API reference and the way to test requests with Hono CLI. The `hono-jsx` skill covers UI with `hono/jsx`.

Install them with [skills.sh](https://skills.sh) or [GitHub CLI](https://cli.github.com). Both put the skills where your agent reads them.

```sh
# skills.sh
npx skills add honojs/skills

# GitHub CLI
gh skill install honojs/skills hono
gh skill install honojs/skills hono-jsx
```

### Hono CLI

[Hono CLI](https://hono.dev/docs/agents/cli) loads your app directly, so an agent can inspect and test it without starting a server. Every command prints JSON.

```sh
hono routes          # all routes, without reading the source
hono request /users  # one request, through app.request()
hono batch -         # many requests with expectations, until "failed": 0
hono snapshot        # the current behavior, as batch lines
hono diff            # what changed vs the last commit
```

`hono --help` starts with a note for the agent, and `hono <command> --help` has examples. No other setup.

### AGENTS.md

Agents follow the way your project says to run and check things. One line in `AGENTS.md` is enough to make them use Hono CLI instead of a dev server. The agent learns the rest from `hono --help`. The create-hono templates already have it.

```md
## Hono CLI

Run `npx hono --help` first, and use the CLI instead of a dev server.
```

Or say it to the agent directly. The same line works as a prompt.

### How well do agents use Hono?

We measure it. See [Agent DX](https://agent-dx.hono.dev) for the results.

## Notes

- The `Accept: text/markdown` header, `/llms.txt`, `/llms-full.txt` and `/llms-small.txt` are served by hono.dev. They are documentation delivery formats, not part of the Hono runtime API.
- Hono Skills (`honojs/skills`) are Agent Skills in the Agent Skills (SKILL.md) format for coding agents; they are separate from this skill.
- `npm create hono@next` selects the v5 release candidate templates; use `npm create hono@latest` for the stable v4 line (see create-hono.md).
- Source: https://hono.dev/docs/agents/ (honojs/website@20aab4e0, retrieved 2026-11-14)

## Related

- [Hono CLI](./cli.md)
- [create-hono](../guides/create-hono.md)
