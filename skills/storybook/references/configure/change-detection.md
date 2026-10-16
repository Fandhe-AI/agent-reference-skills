# Change detection

During development, Storybook monitors the git working tree and the builder's module graph to identify which stories relate to your changes. A Review button at the top of the sidebar filters the tree to new and modified stories.

## Signature / Usage

Enabled by default. To disable, set `features.changeDetection` to `false`:

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  features: {
    changeDetection: false,
  },
};

export default config;
```

Debug the dependency graph (writes a JSON snapshot at startup):

```bash
STORYBOOK_CHANGE_DETECTION_DEBUG=1                     # writes storybook-graph-debug.json in project root
STORYBOOK_CHANGE_DETECTION_DEBUG=/path/to/output.json  # writes to the given path
```

## Status indicators

| Icon | Status | Definition |
| --- | --- | --- |
| Sparkle | new | The story file is untracked or newly added in git. |
| Filled circle | modified | The story's own file, or a file it directly imports, was changed. |
| (no icon) | related | A file further up the story's dependency chain was changed (a transitive dependency). |

When multiple statuses apply to one story, the highest priority wins: new > modified > related.

## Notes

- Preview feature: the experience may change in future releases.
- Development-only: active in `storybook dev`, not available in static builds (`storybook build`).
- Requires a git repository (uses `git diff`) and a supported builder (Vite or webpack5). Other builders can gain support by implementing a change-detection adapter.
- Filters are off by default because the heuristics can produce false positives (e.g. a widely used utility marks many stories as related). The Review button toggles the new and modified filters together; the filter menu next to the search bar toggles individual statuses.
- Statuses are shown alongside test statuses in the sidebar.
- If icons never appear, check the dev server log for messages prefixed with `Change detection:`, the builder, git, and `features.changeDetection`.
- Monorepos: workspace sibling packages may not be tracked when built output is missing at dev time or a per-package `tsconfig.json` does not extend the root. Add `paths` to the root `tsconfig.json` pointing at the sources (used as a fallback when per-file resolution fails):

  ```json
  {
    "compilerOptions": {
      "paths": {
        "@myorg/*": ["./packages/@myorg/*/src"]
      }
    }
  }
  ```

- Barrel files: named imports are resolved through barrels to the real source file. Supported: `export { Button } from './Button'` and `export * from './Button'`. Not fully supported (falls back to tracking the barrel): `import { Button } from './Button'; export { Button }` and `export * as components from './components'`. Importing from the direct source path (e.g. `@myorg/ui/Button`) gives the most precise tracking.
- How it works: Storybook parses story files and their imports with oxc, resolves specifiers through the builder's resolve config, and a git diff provider finds changed files. Shortest import distance = modified, greater distance = related, untracked new files = new.
- Source: https://storybook.js.org/docs/configure/user-interface/change-detection (Storybook v10.6.2).

## Related

- [Features and behavior](./features-and-behavior.md)
- [Environment variables](./environment-variables.md)
