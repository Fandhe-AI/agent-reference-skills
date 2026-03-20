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

## Managing Output

For large codebases, limit displayed issues:

```sh
knip --max-show-issues 5
```

Do not use the `ignore` option to suppress output. Instead, refer to Configuring Project Files for proper setup.
