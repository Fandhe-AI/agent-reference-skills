# create-next-app

CLI to scaffold a new Next.js application from the default template or a public GitHub example.

## Signature / Usage

```bash
npx create-next-app@latest [project-name] [options]
```

```bash
pnpm create next-app [project-name] [options]
yarn create next-app [project-name] [options]
bun create next-app [project-name] [options]
```

## Options / Props

| Option | Description |
|------|-------------|
| `-h`, `--help` | Show all available options. |
| `-v`, `--version` | Output the version number. |
| `--no-*` | Negate a default option, e.g. `--no-ts`. |
| `--ts`, `--typescript` | Initialize as a TypeScript project (default). |
| `--js`, `--javascript` | Initialize as a JavaScript project. |
| `--tailwind` | Initialize with Tailwind CSS config (default). |
| `--react-compiler` | Initialize with React Compiler enabled. |
| `--cache-components` | Initialize with Cache Components enabled (default for App Router). |
| `--eslint` | Initialize with ESLint config. |
| `--biome` | Initialize with Biome config. |
| `--no-linter` | Skip linter configuration. |
| `--app` | Initialize as an App Router project. |
| `--api` | Initialize a project with only route handlers. |
| `--src-dir` | Initialize inside a `src/` directory. |
| `--turbopack` | Force enable Turbopack in generated `package.json` (default). |
| `--webpack` | Force enable Webpack in generated `package.json`. |
| `--import-alias <alias>` | Import alias to use (default `"@/*"`). |
| `--empty` | Initialize an empty project. |
| `--use-npm` / `--use-pnpm` / `--use-yarn` / `--use-bun` | Force a specific package manager. |
| `-e`, `--example [name] [github-url]` | Bootstrap from an official example name or any public GitHub repo URL. |
| `--example-path <path>` | Path to the example within the repo, if not at the root. |
| `--reset-preferences` | Reset stored CLI preferences. |
| `--skip-install` | Skip installing packages. |
| `--disable-git` | Disable git initialization. |
| `--agents-md` | Include `AGENTS.md` to guide coding agents (default). `CLAUDE.md` is no longer generated. |
| `--agent-feedback` | Prepare anonymized Next.js feedback for your review. |
| `--no-agent-feedback` | Do not prepare anonymized Next.js feedback for your review. |
| `--yes` | Use previous preferences or defaults for all options. |

## Notes

- The first prompt offers "recommended Next.js defaults": TypeScript, ESLint, No React Compiler, Tailwind CSS, No `src/` directory, App Router, Cache Components, `AGENTS.md`, Agent feedback (alternatives: reuse previous settings, or customize).
- Customize prompts (when not fully specified via flags) cover: TypeScript, linter (ESLint / Biome / None), React Compiler, Tailwind CSS, `src/` directory, App Router, Cache Components, import alias, `AGENTS.md` inclusion, and whether agents may prepare anonymized feedback (disable anytime with `experimental.agentFeedback: false`).
- **ESLint**: traditional linter with Next.js-specific rules (`@next/eslint-plugin-next`). **Biome**: fast combined linter+formatter with built-in Next.js/React support. **None**: skip entirely (addable later).
- Example bootstrap: `npx create-next-app@latest --example [example-name] [project-name]` (official examples) or `--example "https://github.com/.../"` (any public repo).

## Related

- [next-cli.md](./next-cli.md)
