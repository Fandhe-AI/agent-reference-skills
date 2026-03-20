# Install

Set up Storybook in an existing project using the CLI, which auto-detects your framework and provides the optimal configuration.

## Overview

The `create storybook` CLI command inspects your project dependencies and scaffolds the best configuration automatically. After installation, an interactive onboarding wizard guides you through core concepts.

## Usage

```bash
# Latest version
npm create storybook@latest

# Specific version
npm create storybook@8.3

# Older versions (< 8.3)
npx storybook@8.2 init
```

## Options

| Flag | Description |
|------|-------------|
| `--type <framework>` | Explicitly set the framework type (e.g. `react`, `nextjs`, `vue3`) |
| `--features <list>` | Select feature set: `docs test a11y` or minimal |
| `--package-manager=<pm>` | Force a specific package manager (e.g. `pnpm`) |

Available `--type` values: `angular`, `ember`, `html`, `nextjs`, `nuxt`, `preact`, `qwik`, `react`, `react_native`, `react_native_web`, `svelte`, `sveltekit`, `vue3`, `web_components`.

## Notes

- Minimum Node.js 20+, npm 10+, pnpm 9+, Yarn 4+
- Requires framework-specific minimums: React 19+, Next.js 14+, Angular 18+, Vue 3+, Vite 5+, TypeScript 4.9+
- Supported browsers: Chrome 131+, Edge 134+, Firefox 136+, Safari 18.3+
- If auto-detection fails, use `--type` to specify the framework explicitly
- For Yarn PnP projects, additional files in `node_modules` are expected — add them to `.gitignore`
- For empty directories with Vite-based frameworks, install Vite manually before running the CLI

## Related

- [Setup](./setup.md)
- [Frameworks](./frameworks.md)
- [Browse Stories](./browse-stories.md)
