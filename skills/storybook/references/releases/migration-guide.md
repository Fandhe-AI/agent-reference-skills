# Migration guide for Storybook 10

Guide for upgrading from Storybook 9.x to 10, followed by the 10.x minor-version migration notes (10.0 to 10.6) from the repository's `MIGRATION.md`. Storybook 10 is a breaking maintenance release focused on ESM-only package distribution, with a CSF Next preview (better type safety and autocompletion) and improved tags-based filtering.

## Signature / Usage

```bash
npx storybook@latest upgrade
```

Run it at the repository root. It finds all Storybook projects, checks that no breaking change applies (otherwise prints instructions), upgrades dependencies, and runs automigrations (check, explain, ask approval, apply). To add Storybook 10 to a new project, use `npm create storybook@latest`.

## Major breaking changes (9.x to 10)

- Main configuration (`.storybook/main.js|ts`) and other presets must be valid ESM
- Node 20.19+ or 22.12+ is now required

If a blocker applies, stay on Storybook 8.x/9.x. See the `MIGRATION.md` section "From version 9.x to 10.0.0" for the exhaustive list.

## Troubleshooting

1. Run `storybook doctor` (duplicate dependencies, incompatible addons, mismatched versions).
2. If using `dev`, try `build`; its errors are sometimes more legible.
3. Check the full migration notes in `MIGRATION.md`.
4. Search / file GitHub issues.
5. Remove non-`@storybook` addons to isolate incompatible community addons.
6. Bisect prereleases (for example `10.0.0-alpha.0` is nearly identical to `9.1.x`).

## Optional migrations

`test-runner` to `addon-vitest`: `addon-vitest` and the Storybook Test experience are designed to supersede the `test-runner`. Consider migrating if the project uses React, Vue, or Svelte and is built with Vite.

## 10.x minor migrations (from MIGRATION.md)

### From 10.5.x to 10.6.0

**Vue 3: `vue-docgen-api` is deprecated.** It is the docgen engine `@storybook/vue3-vite` uses; it will be removed in the next major version, leaving `vue-component-meta` as the only engine. `vue-docgen-api` is still the default and logs the deprecation. Recommended: server-side docgen (becomes the default in Storybook 11):

```ts
// .storybook/main.ts
features: { experimentalDocgenServer: true },
```

To stay on builder-side docgen, select the engine explicitly:

```ts
// .storybook/main.ts
framework: {
  name: '@storybook/vue3-vite',
  options: {
    docgen: 'vue-component-meta',
  },
},
```

If the main `tsconfig.json` only references other tsconfig files, point the engine at the one that resolves your components:

```ts
// .storybook/main.ts
framework: {
  name: '@storybook/vue3-vite',
  options: {
    docgen: { plugin: 'vue-component-meta', tsconfig: 'tsconfig.app.json' },
  },
},
```

`docgen: true` is an alias for `vue-docgen-api` and is deprecated with it; `docgen: false` is unaffected. The two engines emit different `__docgenInfo` shapes (`expose` entries become `exposed`); the `VueDocgenInfo` / `VueDocgenInfoEntry` types from `@storybook/vue3` are parameterized by engine (`VueDocgenInfo<'vue-component-meta'>`).

**Angular Vite: new `propsTable` framework option.** `@storybook/angular-vite` lets you choose which members the props table documents. Default `'api'` leaves out TypeScript `private` members, ECMAScript `#` members, and `@internal` members. Declared inputs and outputs are always documented; `protected` members are documented. The default only changes what you see when `features.experimentalDocgenServer` is on (the Compodoc pipeline is unchanged).

```ts
// .storybook/main.ts
framework: {
  name: '@storybook/angular-vite',
  options: {
    // 'all' documents every member.
    // 'api' (the default) leaves out private and `#` properties and methods, and @internal members.
    // 'inputs' documents the inputs section only.
    propsTable: 'all',
  },
},
```

Tag a single member `@ignore` to drop it. `features.angularFilterNonInputControls` is deprecated on `@storybook/angular-vite` and will be removed in Storybook 11 (`true` maps to `propsTable: 'inputs'`, `false` to `'all'`; if both are set, `propsTable` wins). `@storybook/angular` (webpack) is unaffected.

**MCP tool names follow toolset.method.** Update agent prompts, skills, and hard-coded tool allowlists:

| Previous name | New name |
|---------------|----------|
| `preview-stories` | `stories-preview` |
| `get-changed-stories` | `stories-changed` |
| `get-stories-by-component` | `stories-find-by-component` |
| `display-review` | `review-create` |
| `run-story-tests` | `test-run` |
| `list-all-documentation` | `docs-list` |
| `get-documentation` | `docs-show` |
| `get-documentation-for-story` | `docs-show-story` |

`get-storybook-story-instructions` is unchanged.

**Angular Vite defaults to server-side docgen.** `@storybook/angular-vite` now enables `experimentalDocgenServer` by default: Angular metadata is extracted in process, Compodoc no longer runs, `documentation.json` is no longer read, and Compodoc is no longer a dependency. `storybook automigrate` removes the now-ineffective Compodoc setup (the `compodoc` / `compodocArgs` framework options, `setCompodocJson` wiring, Compodoc options on `angular.json` targets, and the `@compodoc/compodoc` dependency). To keep Compodoc, opt out and skip that automigration:

```js
// .storybook/main.js
export default {
  framework: '@storybook/angular-vite',
  features: { experimentalDocgenServer: false },
};
```

Projects created after this change have no Compodoc setup (`storybook init` no longer sets it up for the Vite builder); opting out there means installing `@compodoc/compodoc`, generating `documentation.json`, and passing it yourself:

```js
// .storybook/preview.js
import { setCompodocJson } from '@storybook/addon-docs/angular';

import docJson from '../documentation.json';

setCompodocJson(docJson);
```

`@storybook/angular-vite` is planned to be marked stable in Storybook 11; `experimentalDocgenServer: false` is planned to be deprecated then and removed in Storybook 12, together with the `compodoc` / `compodocArgs` options and `setCompodocJson` wiring. The `compodoc` and `compodocArgs` options on the `start-storybook` / `build-storybook` builder schemas are deprecated (still accepted, nothing reads them). The webpack-based `@storybook/angular` keeps Compodoc.

**Angular Vite: tsconfig paths take priority over `node_modules` in production builds too.** `@storybook/angular-vite` now sets Vite's `resolve.tsconfigPaths` to `true` by default. This closes a dev/build asymmetry (a workspace alias with no `node_modules` package could build but fail in `dev`). It also changes `build` when a specifier resolves both via a tsconfig `paths` entry and an actual `node_modules` package of the same name (common in Nx or Yarn/npm workspaces): `build` now bundles the raw source from `paths` instead of the compiled package. To keep the previous `build` behavior:

```ts
// .storybook/main.ts
export default {
  framework: '@storybook/angular-vite',
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        tsconfigPaths: false,
      },
    };
  },
};
```

**Experimental Playwright CT integration removed.** The experimental `@storybook/*/experimental-playwright` API (`createPlaywrightTest`) is removed, as Playwright replaced its `@playwright/experimental-ct-*` approach with component testing in `@playwright/test`. Migrate along Playwright's guide. The portable stories core (`composeStories`, `setProjectAnnotations`) remains available for the Vitest addon and other supported paths. Docs for the older API remain at `storybook.js.org/docs/9/api/portable-stories/portable-stories-playwright`.

**`@storybook/csf-plugin` removed.** CSF source enrichment now lives inside `@storybook/addon-docs` and is registered from its presets for Vite and Webpack. Remove the package from `package.json` and configure enrichment via addon-docs:

```js
// .storybook/main.js
export default {
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        csfPluginOptions: {
          /* EnrichCsfOptions */
        },
      },
    },
  ],
};
```

Direct imports of `@storybook/csf-plugin` in custom builders or standalone Vite/Webpack configs are no longer supported; there is no public replacement package.

### From 10.4.0 to 10.5.0

**`ExternalDocs` and `ExternalDocsContainer` are deprecated.** These `@storybook/addon-docs` components (render docs pages outside the Storybook UI) will be removed in Storybook 11. Open an issue describing your use case if you rely on them.

### From 10.3.0 to 10.4.0

**React Native: on-device addons moved to `deviceAddons`.** In `.rnstorybook/main.ts`, entries that used to live under `addons` must now be under `deviceAddons` (listing them under `addons` made `storybook extract` fail, because Core evaluates every `addons` entry as a Node.js preset). The automigration `rn-ondevice-addons-to-device-addons` renames the key automatically; it only acts on React Native main configs (detected by the `.rnstorybook` directory name or a `framework` of `@storybook/react-native`) and leaves a paired web `.storybook/main.ts` untouched.

```ts
// Before (.rnstorybook/main.ts)
export default {
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};

// After (.rnstorybook/main.ts)
export default {
  deviceAddons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};
```

**TanStack Router projects: migrate from `@storybook/react-vite` to `@storybook/tanstack-react`.** Projects using `@storybook/react-vite` with `@tanstack/react-router` (or `@tanstack/react-start`) can migrate to the dedicated framework, which wraps every story in a TanStack Router instance (in-memory history) and provides TanStack Query support; manual decorators creating `RouterProvider`, `createRouter`, `createMemoryHistory` or `createRootRoute` should be removed.

```sh
npx storybook automigrate
```

The migration replaces `@storybook/react-vite` with `@storybook/tanstack-react` in `package.json`, updates the framework string in `.storybook/main.*` (regular and CSF factories `defineMain`), updates import sites (including `definePreview` / `defineMain` from `@storybook/react-vite/node`), and detects manual TanStack Router decorators (offering a copyable AI prompt to remove them). For stories that need a specific route, use `parameters.tanstack.router` (CSF factories):

```ts
// src/stories/Page.stories.ts
import preview from '#.storybook/preview';
import { Route } from './Page';

const meta = preview.meta({
  title: 'Example/Page',
  parameters: {
    tanstack: {
      router: {
        route: Route,
      },
    },
  },
});

export const Default = meta.story();
```

With CSF3, import `Meta` and `StoryObj` from `@storybook/tanstack-react`:

```ts
import type { Meta, StoryObj } from '@storybook/tanstack-react';
import { Route } from './Page';

const meta = {
  title: 'Example/Page',
  parameters: {
    tanstack: { router: { route: Route } },
  },
} satisfies Meta<typeof Route>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
```

`parameters.tanstack.router` also accepts `path`, `params`, `query`, `routeOverrides`, and `useRouterContext`. A project-wide default route can be set by passing `route` to `definePreview` in `.storybook/preview.*`.

### From 10.0.0 to 10.1.0 (Storybook UI component API changes)

**Button:** added `ariaLabel` (becomes mandatory in Storybook 11; pass `false` only for text children that do not rely on visual context, otherwise a short label starting with an action verb); added `shortcut` (internal; appends a human-readable shortcut and sets `aria-keyshortcuts`); a tooltip is shown whenever `ariaLabel` or `shortcut` is set (customizable via `tooltip`); `active` is deprecated and will be removed in Storybook 11 (use ToggleButton for enabled-state toggles, Select for open/selected-value states).

**IconButton** is deprecated; use Button with the `'ghost'` variant and `'small'` padding plus `ariaLabel`.

**Bar:** internal layout changed (flex positioning, default item gap). New `innerStyle` prop: when `scrollable` is `true`, an inner container is added with default style `width: 100%; min-height: 40; display: flex; align-items: center; gap: 6px; padding-inline: 6px;`, overridable through `innerStyle`. `FlexBar` is deprecated; use `Bar` with `justifyContent: 'space-between'` in `innerStyle`.

**Tabs, TabsState, TabWrapper** are deprecated (not accessible); use `TabsView`, or `TabList` and `TabPanel` with the `useTabsState` hook (`TabsView` does not support mixing HTML links and tabs). `TabButton` is deprecated with no replacement (`TabList` handles tab buttons). `TabBar` is deprecated and will be hidden in Storybook 11; use `TabsView`.

**Modal:** `onInteractOutside` deprecated in favor of `dismissOnClickOutside`; `onEscapeKeyDown` deprecated in favor of `dismissOnEscape`; new `ariaLabel` (mandatory in Storybook 11; sets the modal title); `Modal.Dialog.Close` and `Modal.CloseButton` are replaced by `Modal.Close` (old names deprecated, removed in Storybook 11). `<Modal.Close />` renders a default close button, `<Modal.Close asChild>...</Modal.Close>` wraps a custom one; it closes the modal automatically, and an `onClick` handler is called in addition.

**ListItem, TooltipLinkList, TooltipMessage** are deprecated (WithTooltip has no keyboard interaction). Replace TooltipMessage by swapping WithTooltip for PopoverProvider with Popover as base; a dedicated menu component will be introduced later (use Popover meanwhile).

**PopoverProvider** is added as the counterpart of WithTooltip: use PopoverProvider and Popover for interactive overlays, WithTooltip with TooltipNote or Tooltip for static overlays on focus or hover. Based on react-aria; it needs a single pressable child that can receive refs (wrap in `forwardRef` if placement is off). `ariaLabel` was added in 10.3 (announced by screen readers; mandatory in Storybook 11):

```tsx
<PopoverProvider ariaLabel="Share options" popover={<ShareMenu />}>
  <Button ariaLabel="Share">Share</Button>
</PopoverProvider>
```

**WithTooltip** is reimplemented under the name `TooltipProvider` (replaces `WithTooltip` entirely in Storybook 11). Changes: removed `trigger` (tooltips must not open on click); added `triggerOnFocusOnly` (only for keyboard navigation hints); `startOpen` renamed `defaultVisible` (`startOpen` removed in future versions); removed `svg`, `strategy`, `withArrows`, `mutationObserverOptions`; removed `hasChrome` (Popover and Tooltip have it, TooltipNote never needs it); removed `closeOnTriggerHidden`, `followCursor`, `closeOnOutsideClick` (it always closes on outside clicks); removed `interactive` (use PopoverProvider). Implementation moved from Popper.js to react-aria, so WithTooltip needs a single focusable child that can receive refs. `WithTooltipPure` and `WithTooltipState` are deprecated: use `WithTooltipNew` in Storybook 10 (`WithTooltip` in 11+); controlled via `onVisibleChange` / `visible`, uncontrolled default via `defaultVisible`.

**Link `isButton`** is deprecated: Link renders as an HTML `button` with keyboard focus when no `href` is given; `isButton` still forces a `button` role in Storybook 10 but is removed in Storybook 11.

## Notes

- Migrating from a version prior to 9: first follow the 8.x to 9.1 guide, then return here.
- Minor-migration sections above come from `MIGRATION.md` at tag v10.6.2, lines 532-986; the "From version 9.x to 10.0.0" detail (from line 987) is not reproduced here.
- Several items refer to changes planned for Storybook 11 (for example `ariaLabel` becoming mandatory, server-side docgen becoming the default, removal of deprecated components); these are announcements, not current behavior.
- Source: https://storybook.js.org/docs/releases/migration-guide and https://github.com/storybookjs/storybook/blob/v10.6.2/MIGRATION.md (Storybook v10.6.2).

## Related

- [Migration guide from Storybook 8.x to 9.1](./migration-guide-from-older-version.md)
- [Upgrading Storybook](./upgrading.md)
- [Feature lifecycle](./feature-lifecycle.md)
