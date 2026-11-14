# Getting Started

Source: https://knip.dev/overview/getting-started

## Requirements

Knip v6 requires Node.js v20.19.0 or Bun.

## Installation

### Automated Setup (Recommended)

```sh
npm init @knip/config
pnpm create @knip/config
bun create @knip/config
yarn create @knip/config
```

After setup, run Knip:

```sh
npm run knip
pnpm knip
bun knip
yarn knip
```

### Manual Installation

```sh
npm install -D knip typescript @types/node
```

Add to `package.json`:

```json
{
  "scripts": {
    "knip": "knip"
  }
}
```

`typescript` and `@types/node` are peer dependencies to increase compatibility.

### Without Installation

```sh
npx knip
pnpm dlx knip
bunx knip
```

## Coding Agents

Let your coding agent configure Knip using the Knip MCP Server (`@knip/mcp`). Paste this into your agent session:

```text
Install the Knip MCP Server (@knip/mcp) and use it to configure Knip in this project.
```

You may need to restart the session to pick up the new MCP server. The Knip Editor Extension has the same MCP Server built in.

## Managing Output

For large codebases, limit displayed issues:

```sh
knip --max-show-issues 5
```

Do not use the `ignore` option to suppress output. Instead, refer to Configuring Project Files for proper setup.

## Notes

- Knip does not provide a hosted playground link in the 6.45.1 getting-started page; the 6.41.0 "try without installation" sentence was removed upstream
- Source: https://knip.dev/overview/getting-started (knip@6.45.1 docs, retrieved 2026-11-14)
