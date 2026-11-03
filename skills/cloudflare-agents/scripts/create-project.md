---
source: https://developers.cloudflare.com/agents/getting-started/quick-start/, https://developers.cloudflare.com/agents/examples/chat-agent/, https://developers.cloudflare.com/agents/examples/voice-agent/, https://developers.cloudflare.com/agents/examples/slack-agent/, https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/, https://developers.cloudflare.com/agents/model-context-protocol/guides/connect-mcp-client/
---

# Create Project

Scaffold Agent and MCP projects with `npm create cloudflare@latest`.

## Signature / Usage

### Create an Agent project from a Hello World Worker (Quick start)

```sh
npm create cloudflare@latest -- my-agent --type=hello-world --lang=ts
cd my-agent
```

```sh
yarn create cloudflare my-agent --type=hello-world --lang=ts
```

```sh
pnpm create cloudflare@latest my-agent --type=hello-world --lang=ts
```

Prerequisites are a Cloudflare account and Node.js 22.19 or later. To add the Agents SDK and other packages afterwards, see `install.md`.

### Create a chat Agent project

```sh
npm create cloudflare@latest chat-agent
```

Select the "Hello World" Worker when prompted, then install the dependencies.

```sh
cd chat-agent
npm install agents @cloudflare/ai-chat ai @ai-sdk/provider zod
```

### Create a voice Agent project (agents-starter template)

```sh
npm create cloudflare@latest voice-agent -- --template cloudflare/agents-starter
cd voice-agent
npm install agents@latest
```

The starter is a Vite + React + Cloudflare Workers setup. Install `agents@latest` to get a version that includes `agents/voice`.

### Create a Slack Agent project

```sh
npm create cloudflare@latest -- my-slack-agent
```

```sh
yarn create cloudflare my-slack-agent
```

```sh
pnpm create cloudflare@latest my-slack-agent
```

### Create an authless remote MCP server

```sh
npm create cloudflare@latest -- remote-mcp-server-authless --template=cloudflare/ai/demos/remote-mcp-authless
cd remote-mcp-server-authless
```

```sh
yarn create cloudflare remote-mcp-server-authless --template=cloudflare/ai/demos/remote-mcp-authless
```

```sh
pnpm create cloudflare@latest remote-mcp-server-authless --template=cloudflare/ai/demos/remote-mcp-authless
```

During setup, answer `No` to the AGENTS.md prompt, `No` to git, and `No` to deploying (the guide tests the server locally before deploying).

### Create an MCP client Agent project (hello-world template)

```sh
npm create cloudflare@latest -- my-mcp-client --template=cloudflare/ai/demos/hello-world
cd my-mcp-client
```

```sh
yarn create cloudflare my-mcp-client --template=cloudflare/ai/demos/hello-world
```

```sh
pnpm create cloudflare@latest my-mcp-client --template=cloudflare/ai/demos/hello-world
```

## Notes

- Templates are fetched from GitHub (`cloudflare/ai`, `cloudflare/agents-starter`); review generated code before deploying. The authless MCP template accepts any client, so add OAuth before exposing tools with side effects.

## Related

- [install.md](./install.md) — adding SDK and harness packages
- [dev-test.md](./dev-test.md) — running locally and testing
- `create-cloudflare` (C3) flag details are outside this skill; see https://developers.cloudflare.com/workers/get-started/guide/
