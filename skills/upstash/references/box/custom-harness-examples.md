# Custom Harness Examples (Aider / Amp / Copilot / CrewAI / Gemini / Goose / Pi / Pydantic AI)

Official runnable examples of `Agent.Custom` harnesses in the `upstash/box` repo, each translating a third-party agent into the `box-sse-v1` protocol.

## Signature / Usage

Common shape (from the Pi example; the harness source string is elided here):

```typescript
import { Agent, Box } from "@upstash/box";

const box = await Box.create({
  apiKey: process.env.UPSTASH_BOX_API_KEY!,
  baseUrl: process.env.UPSTASH_BOX_BASE_URL,
  runtime: "node",
  agent: {
    harness: Agent.Custom,
    model: "anthropic/claude-sonnet-5-5",
    customHarness: {
      command: "node",
      args: ["/workspace/home/custom-pi-agent.mjs"],
      protocol: "box-sse-v1",
    },
  },
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ?? "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? "",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
  },
});

try {
  await box.exec.command(
    `cd /workspace/home && npm install @earendil-works/pi-coding-agent@0.99.2 --silent`
  );
  await box.files.write({ path: "custom-pi-agent.mjs", content: agentSource });

  const run1 = await box.agent.run({
    prompt: "Create a file called hello.txt with the content 'Hello from Pi agent!'",
  });
  console.log(run1.result);
} finally {
  await box.delete();
}
```

## Options / Props

| Example | Runtime | Install in box | Auth env | Model format | Sessions |
|---|---|---|---|---|---|
| Pi (`custom-pi-agent.ts`) | node | `npm install @earendil-works/pi-coding-agent@0.99.2` | `ANTHROPIC_API_KEY` / `GEMINI_API_KEY` / `OPENAI_API_KEY` | `<provider>/<model-id>` | per-session agentDir under `.pi-sessions` |
| Gemini CLI (`custom-gemini-agent.ts`) | node | `npm install -g --prefix /home/boxuser/.local @google/gemini-cli` | `GEMINI_API_KEY` | model id; provider prefix stripped | `--resume` / `--session-id` |
| Copilot CLI (`custom-copilot-agent.ts`) | node | `npm install -g --prefix /home/boxuser/.local @github/copilot` | `COPILOT_PROVIDER_TYPE` / `COPILOT_PROVIDER_BASE_URL` / `COPILOT_PROVIDER_API_KEY`, or `COPILOT_GITHUB_TOKEN` (fine-grained, "Copilot Requests") | provider model id, or Copilot model id / `auto` | `--resume` / `--session-id` |
| Aider (`custom-aider-agent.ts`) | python | uv + `uv tool install aider-chat --python 3.12` | `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` | model id | per-session history files under `.aider-sessions` |
| Goose (`custom-goose-agent.ts`) | node | release tarball of `aaif-goose/goose` into `/home/boxuser/.local/bin` | `ANTHROPIC_API_KEY`, `GOOSE_PROVIDER` | provider prefix stripped | named sessions (`--name`, `--resume`) |
| Amp (`custom-amp-agent.ts`) | node | `npm install -g --prefix /home/boxuser/.local @sourcegraph/amp` | `AMP_API_KEY` (starts with `sgamp_`) | Amp mode: `low` / `medium` / `high` / `ultra` | sessions map to Amp threads |
| CrewAI (`custom_crewai_agent.py`) | python | `pip install 'crewai[anthropic]' 'crewai-tools[mcp]' upstash-box` | provider keys | `<provider>/<model-id>` (LiteLLM) | single-turn; one `text` event |
| Pydantic AI (`custom_pydantic_ai_agent.py`) | python | `pip install 'pydantic-ai-slim[anthropic,mcp]' upstash-box` | provider keys | `<provider>:<model-id>` | multi-turn via `--session`, history JSON under `.pydantic-ai-sessions` |

## Notes

- Original examples use `sudo -n npm install -g <pkg>` inside the box for Gemini CLI / Copilot CLI / Amp; the Install column rewrites it to a user-space install (`--prefix /home/boxuser/.local`, matching the Goose row)
- Harness inputs from the box: `-p` / `--model` / `--session` args plus env `PROMPT_FILES_PATH` (attached files), `JSON_SCHEMA`, `AGENT_OPTIONS`, and `/workspace/home/.box-internal/mcp-config.json` (configured MCP servers)
- The Python harnesses use `run_custom_harness` and `CustomHarnessDone` from `upstash-box`; CrewAI and Pydantic AI honor structured output (`response_schema`), files, options, and MCP
- Cost is reported as 0 for Amp, Gemini CLI, and Copilot CLI (no price in their output); Aider parses cost from its output; Goose and Pi report their own cost
- Aider ignores `JSON_SCHEMA` and MCP servers (warns on stderr); Amp, Copilot, Gemini ignore `JSON_SCHEMA` and `AGENT_OPTIONS`
- Source: https://upstash.com/docs/box/overall/custom-harness/aider, /amp, /copilot, /crewai, /gemini, /goose, /pi, /pydantic-ai (all under https://upstash.com/docs/box/overall/custom-harness/; fetched 2026-11-14; no version pin on the site). These eight pages resolve to the example source files in `packages/sdk/examples` (Python: `packages/python-sdk/examples`) of the `upstash/box` repo
- Version check: the table rows were re-checked on 2026-11-14 against the example sources in those fetched docs pages (install commands, auth env vars, model formats, session handling; Pi harness pins `@earendil-works/pi-coding-agent` 0.99.2). They were not checked against the `@upstash/box` 0.8.0 tag; the earlier pin (tag `@upstash/box@0.7.9`) no longer applies
- The Gemini, Copilot, and Amp examples run `sudo -n npm install -g <pkg>` for the CLI; the Gemini example also writes its MCP defaults with `sudo -n`
- The examples create the box with `apiKey: process.env.UPSTASH_BOX_API_KEY` and pass the model provider key through `env` (the harness's own process), not through the built-in agent `apiKey`

## Related

- [Custom Agent](./custom-agent.md)
- [Agent](./agent.md)
