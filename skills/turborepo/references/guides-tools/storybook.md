# Storybook

## Usage

Start from a template:

```bash
pnpm dlx create-turbo@latest -e design-system
```

Cache configuration:

```json
{ "tasks": { "build": { "outputs": ["storybook-static/**"] } } }
```

Add `storybook-static` to `.gitignore`.

Co-located stories pattern, recommended for large design systems: place stories inside the source package.

1. Point the story paths to the source package in `.storybook/main.ts`.
2. Exclude story files from production build `inputs` to preserve caching.

Style integration: CSS must be imported manually in `.storybook/preview.ts`.
