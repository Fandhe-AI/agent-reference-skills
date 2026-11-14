# Guide: Neon AI Gateway

Run Box's built-in agents (Claude Code, Codex, OpenCode) on Neon AI Gateway models with one Neon credential, drawing down Neon prepaid credits.

## Signature / Usage

Write the branch's gateway token and URL to `.env`:

```bash
neon env pull -s ai-gateway --file .env
```

```bash
UPSTASH_BOX_API_KEY=box_xxxxxxxxxxxxxxxxxxxxxxxx
NEON_AI_GATEWAY_TOKEN=nt_live_xxxxxxxxxxxxxxxx
NEON_AI_GATEWAY_BASE_URL=https://br-<name>-api.ai.<cell>.<region>.aws.neon.tech
```

After saving the credential in the Upstash Console (Box, Settings, Agent API Keys, Neon AI Gateway), create a box on a `neon/` model:

```typescript
import { Agent, Box, BoxApiKey, NeonModel } from "@upstash/box";

const box = await Box.create({
  runtime: "node",
  agent: {
    harness: Agent.ClaudeCode,
    model: NeonModel.Claude_Sonnet_5,
    apiKey: BoxApiKey.StoredKey,
  },
});

const run = await box.agent.run({
  prompt: "Create hello.txt that says hello from Neon AI Gateway",
});

console.log(run.result);
await box.delete();
```

```python
from upstash_box import Agent, Box, BoxApiKey, NeonModel

box = Box.create(
    runtime="node",
    agent={
        "harness": Agent.CLAUDE_CODE,
        "model": NeonModel.CLAUDE_SONNET_5,
        "api_key": BoxApiKey.STORED_KEY,
    },
)

run = box.agent.run(prompt="Create hello.txt that says hello from Neon AI Gateway")

print(run.result)
box.delete()
```

List the models the branch serves:

```bash
curl "$NEON_AI_GATEWAY_BASE_URL/v1/models" \
  -H "Authorization: Bearer $NEON_AI_GATEWAY_TOKEN"
```

## Options / Props

Each harness reaches Neon through a different API:

| Models | Harness |
|--------|---------|
| Claude (`neon/claude-*`) | Claude Code or OpenCode |
| GPT-5.4 and newer, GPT-5.5 Pro, GPT-5.3 Codex | Codex |
| GPT-5 Mini, GPT-5 Nano, Grok 4.6 | Codex or OpenCode |
| Gemini, gpt-oss, and other open-weight models | OpenCode |

## Notes

- Source: https://upstash.com/docs/box/guides/neon-ai-gateway (fetched 2026-11-14; no version pin on the site).
- Needs a Neon project in an AI Gateway region (`aws-us-east-2`, `aws-us-east-1`, `aws-eu-central-1`, or `aws-ap-southeast-1`) on a paid plan with prepaid credits
- A Neon credential is a token plus a branch URL, so Box only accepts it as a stored key: boxes on Neon models use `BoxApiKey.StoredKey`; passing the token as `apiKey` is rejected
- Box rejects a model the harness cannot run; `NeonModel` lists the catalog and any other model id the branch serves works as `neon/<id>`. Claude Code on Neon runs without the WebSearch tool
- Release notes: `NeonClaudeModel` (e.g. `NeonModel.Claude_Opus_5_5`) arrived in `@upstash/box` 0.7.10 (Source: https://github.com/upstash/box/releases, release notes checked 2026-11-14)
- Custom agent on Neon: call Neon directly from your own harness and let Attach Headers add the token (`attachHeaders: { [neonHost]: { Authorization: "Bearer <token>" } }`, with `NEON_AI_GATEWAY_BASE_URL` passed in `env`) so the token never enters the box; the model is then a plain Neon id without the `neon/` prefix. See the official page for the full `neon-agent.mjs` harness using `runCustomHarness`
- Browser AI actions also accept a Neon provider key (see Browser Overview)

## Related

- [Agent](./agent.md)
- [Custom Agent](./custom-agent.md)
- [Attach Headers](./attach-headers.md)
