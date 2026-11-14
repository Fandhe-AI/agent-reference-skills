---
source: https://developers.cloudflare.com/agents/getting-started/add-to-existing-project/, https://developers.cloudflare.com/agents/getting-started/quick-start/, https://developers.cloudflare.com/agents/harnesses/pi/, https://developers.cloudflare.com/agents/harnesses/opencode/, https://developers.cloudflare.com/agents/harnesses/think/getting-started/, https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/, https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/
---

# Install

Install commands for the Agents SDK (`agents`) and the harness and MCP packages.

## Signature / Usage

### Add the Agents SDK to an existing project

```sh
npm i agents
```

```sh
yarn add agents
```

```sh
pnpm add agents
```

```sh
bun add agents
```

Export the Durable Object class from the Worker's main module, then run `npx wrangler types` to update `Env`.

### Pi harness packages

```sh
npm i agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord @cloudflare/computer
```

The Pi packages are optional peer dependencies of `agents` (`~1.5.0`). Pi Durable is experimental, and each `agents` release supports one Pi minor version. Install the versions your package manager resolves for `agents`.

### OpenCode harness packages

```sh
npm i agents@latest @opencode/sdk@2 @opencode/plugin@2
```

### Think harness packages

```sh
npm i @cloudflare/think @cloudflare/computer @cloudflare/ai-chat agents ai zod @ai-sdk/provider
```

### Think harness manual setup

```sh
mkdir my-think-agent && cd my-think-agent
npm init -y
```

```sh
npm install @cloudflare/think @cloudflare/computer @cloudflare/ai-chat agents ai zod @ai-sdk/provider react react-dom
npm install -D wrangler @cloudflare/vite-plugin @cloudflare/workers-types @vitejs/plugin-react @tailwindcss/vite tailwindcss typescript vite
```

Prerequisites are Node.js 24+ and a Cloudflare account with Workers AI access.

### Think Telegram messenger packages

```sh
npm install @cloudflare/think agents ai @chat-adapter/telegram
```

### Think code mode package

```sh
npm install @cloudflare/codemode
```

### MCP server packages (MCP SDK v2)

```sh
npm i agents @modelcontextprotocol/server@2.3.1 zod
```

### MCP server packages (MCP SDK 1.x)

```sh
npm i agents @modelcontextprotocol/sdk@1.32.1 zod
```

### MCP client packages (MCP SDK v2)

```sh
npm i agents @modelcontextprotocol/client@2.3.1
```

### MCP OAuth provider library

```sh
npm i @cloudflare/workers-oauth-provider
```

### Install Cloudflare's official skills

```sh
npx skills add https://github.com/cloudflare/skills
```

`npx skills` is the skills.sh CLI.

## Notes

- `npx skills add https://github.com/cloudflare/skills` installs third-party instructions into your agent tooling; review them before enabling.
- Pin the `@modelcontextprotocol/*` versions as shown; use the exact version your installed `agents` release requires.

## Related

- For `wrangler` commands and flags in general, see the cloudflare-wrangler skill.
