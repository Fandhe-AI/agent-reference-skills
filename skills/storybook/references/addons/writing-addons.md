# Write an addon

Build a UI-based (toolbar) addon from the Addon Kit template, register it in the manager, style it via decorators and globals, then package and publish to npm.

## Signature / Usage

Registering a toolbar tool in the manager (`src/manager.ts`):

```ts
import { addons, types } from 'storybook/manager-api';
import { ADDON_ID, TOOL_ID } from './constants';
import { Tool } from './Tool';

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'My addon',
    match: ({ tabId, viewMode }) => !tabId && viewMode === 'story',
    render: Tool,
  });
});
```

The tool component (`src/Tool.tsx`):

```ts
export const Tool = memo(function MyAddonSelector() {
  const [globals, updateGlobals] = useGlobals();
  const api = useStorybookApi();

  const isActive = [true, 'true'].includes(globals[PARAM_KEY]);

  const toggleMyTool = useCallback(() => {
    updateGlobals({
      [PARAM_KEY]: !isActive,
    });
  }, [isActive]);

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: 'Toggle Addon [8]',
      defaultShortcut: ['8'],
      actionName: 'myaddon',
      showInMenu: false,
      action: toggleMyTool,
    });
  }, [toggleMyTool, api]);

  return (
    <Button
      padding="small"
      variant="ghost"
      key={TOOL_ID}
      active={isActive}
      ariaLabel="Enable my addon"
      onClick={toggleMyTool}
    >
      <LightningIcon />
    </Button>
  );
});
```

Imports used: `useGlobals`, `useStorybookApi` from `storybook/manager-api`; `Button` from `storybook/internal/components`; `LightningIcon` from `@storybook/icons`.

Run the addon in development (watch mode):

```shell
npm run start
```

## Options / Props

`package.json` module metadata:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "node": "./dist/index.js",
      "require": "./dist/index.js",
      "import": "./dist/index.mjs"
    },
    "./manager": "./dist/manager.mjs",
    "./preview": "./dist/preview.mjs",
    "./package.json": "./package.json"
  },
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist/**/*", "README.md", "*.js", "*.d.ts"],
  "devDependencies": {
    "@storybook/addon-docs": "^9.0.0",
    "storybook": "^9.0.0"
  },
  "bundler": {
    "exportEntries": ["src/index.ts"],
    "managerEntries": ["src/manager.ts"],
    "previewEntries": ["src/preview.ts"]
  }
}
```

Integration catalog metadata:

```json
{
  "name": "my-storybook-addon",
  "version": "1.0.0",
  "description": "My first storybook addon",
  "author": "Your Name",
  "storybook": {
    "displayName": "My Storybook Addon",
    "unsupportedFrameworks": ["react-native"],
    "icon": "https://yoursite.com/link-to-your-icon.png"
  },
  "keywords": ["storybook-addon", "appearance", "style", "css", "layout", "debug"]
}
```

`match` examples for conditional rendering (view mode and tab):

| Expression | Shown when |
|------------|-----------|
| `({ tabId }) => tabId === 'my-addon/tab'` | viewing the tab with ID `my-addon/tab` |
| `({ viewMode }) => viewMode === 'story'` | viewing a story in the canvas |
| `({ viewMode }) => viewMode === 'docs'` | viewing component documentation |
| `({ tabId, viewMode }) => !tabId && viewMode === 'story'` | story in canvas, not in a custom tab |

## Notes

- Two addon categories: UI-based (toolbar, panel, tab) and presets.
- UI addons must use the same React version as Storybook; for a different React version publish the addon as a standalone package (Addon Kit).
- Addon Kit uses TypeScript by default; run `eject-ts` to convert to JavaScript.
- Build system is `tsup` (esbuild). Presets run in Node; manager and preview runtimes provide certain packages globally, so addons need not bundle them. Default entries are `src/Tool.tsx`, `src/Panel.tsx`, `src/Tab.tsx`.
- Applying styles is a side-effect: use decorators and globals to inject and remove stylesheets, and scope CSS to the correct DOM node because docs mode renders multiple story previews on one page (see `src/withGlobals.ts` in the Addon Kit).
- To be crawled by the integration catalog the package needs a `dist` folder and a `package.json` with module and catalog metadata; the `storybook-addon` keyword makes it discoverable.
- Publishing: Addon Kit uses Auto for releases (`npx auto create-labels`, then `npm run release`), needs `GH_TOKEN` (GitHub PAT with `repo` and `workflow` scopes) and `NPM_TOKEN` (read and publish) in `.env`; the bundled GitHub Actions workflow publishes on merge to the default branch when `NPM_TOKEN` is set as a repository secret.
- The `package.json` snippets above reflect the v9-era doc text as shown in the v10.6.2 docs; for Storybook 10 (ESM-only builds, `exports` changes) see the migration guide.
- Source: https://storybook.js.org/docs/addons/writing-addons (Storybook v10.6.2).

## Related

- [Addon types](./addon-types.md)
- [Addon API](./addons-api.md)
- [Write a preset addon](./writing-presets.md)
- [Addon migration guide for Storybook 10.0](./addon-migration-guide.md)
- [Add to the integration catalog](./integration-catalog.md)
