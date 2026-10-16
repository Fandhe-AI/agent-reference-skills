# features

Enables or disables Storybook's built-in capabilities and experimental functionalities.

## Signature / Usage

```typescript
{
  actions?: boolean;
  angularFilterNonInputControls?: boolean; // Angular only
  argTypeTargetsV7?: boolean;
  babelRemoveBugfixes?: boolean; // webpack only
  backgrounds?: boolean;
  changeDetection?: boolean;
  componentsManifest?: boolean;
  controls?: boolean;
  developmentModeForBuild?: boolean;
  experimentalCodeExamples?: boolean; // React only
  experimentalDocgenServer?: boolean; // React / Angular / Vue
  experimentalReview?: boolean; // React only
  experimentalTestSyntax?: boolean; // React only
  highlight?: boolean;
  interactions?: boolean;
  legacyDecoratorFileOrder?: boolean;
  measure?: boolean;
  outline?: boolean;
  sidebarOnboardingChecklist?: boolean;
  menuOnboardingChecklist?: boolean;
  toolbars?: boolean;
  viewport?: boolean;
}
```

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  features: {
    experimentalCodeExamples: true,
    experimentalTestSyntax: true,
    componentsManifest: false,
  },
};

export default config;
```

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `boolean` | `true` | Enables the Actions addon |
| `backgrounds` | `boolean` | `true` | Enables the Backgrounds feature |
| `changeDetection` | `boolean` | `true` | Monitors git working tree and builder's module graph to show new/modified/related stories |
| `controls` | `boolean` | `true` | Enables the Controls addon |
| `highlight` | `boolean` | `true` | Enables element highlight inspection |
| `interactions` | `boolean` | `true` | Enables interaction test debugging tools |
| `measure` | `boolean` | `true` | Enables the Measure tool |
| `outline` | `boolean` | `true` | Enables visual element outline |
| `viewport` | `boolean` | `true` | Enables the Viewport addon |
| `componentsManifest` | `boolean` | `false` | Generates manifests, used by the MCP server (React / Angular / Vue; see ../../ai/manifests.md) |
| `sidebarOnboardingChecklist` | `boolean` | `true` | Shows the onboarding checklist in sidebar |
| `menuOnboardingChecklist` | `boolean` | `true` | Enables a link to the onboarding guide in the menu |
| `angularFilterNonInputControls` | `boolean` | — | (Angular only) Filters non-input controls. Deprecated on `@storybook/angular-vite` in favor of the `propsTable` framework option (`true` maps to `propsTable: 'inputs'`, `false` to `'all'`); `@storybook/angular` still reads it |
| `babelRemoveBugfixes` | `boolean` | — | (Webpack builder only) Disables the `bugfixes` option in `@babel/preset-env`, removed in Babel 8. Set `true` with Babel 8 if Storybook fails to detect your Babel version |
| `experimentalDocgenServer` | `boolean` | `false` | (Experimental; React / Angular / Vue) Server-side docgen via the TypeScript Language Service. On by default in `@storybook/angular-vite` |
| `experimentalReview` | `boolean` | `false` | (Experimental; React only) Agentic review feature; builds on `changeDetection`, which must also be enabled |
| `argTypeTargetsV7` | `boolean` | `true` | (Experimental) Filters args with "target" properties from render functions |
| `developmentModeForBuild` | `boolean` | — | Sets `NODE_ENV` to development in built Storybooks |
| `experimentalCodeExamples` | `boolean` | — | (Experimental; React only) Faster, more accurate code generation for autodocs. Superseded by `experimentalDocgenServer` |
| `experimentalTestSyntax` | `boolean` | — | (Experimental) Enables CSF Next `.test` method syntax |
| `legacyDecoratorFileOrder` | `boolean` | — | Applies preview.js decorators before addon/framework decorators |

## Notes

- Most features default to `true`; set to `false` only when needed
- Experimental features may change or be removed in future releases
- `experimentalCodeExamples` reads source files directly; dynamic control updates are not reflected. Prefer `experimentalDocgenServer`, which supersedes it (with it enabled, `experimentalCodeExamples` is not needed)
- Flags are renderer-specific: `componentsManifest` and `experimentalDocgenServer` apply to React / Angular / Vue; `experimentalCodeExamples`, `experimentalReview`, `experimentalTestSyntax` to React only; `angularFilterNonInputControls` to Angular only
- `experimentalDocgenServer` snippets are static (not updated by Controls changes). With `componentsManifest` on React, manifests use a ref-based format with per-component JSON snapshots. On Vue, manifests need `@storybook/vue3-vite` plus `experimentalDocgenServer`
- `angularFilterNonInputControls` is deprecated on `@storybook/angular-vite` and will be removed in Storybook 11 (MIGRATION.md). Setting both it and `propsTable` leaves `propsTable` in charge; `@storybook/angular` (webpack) is unaffected

## Related

- [addons.md](./addons.md)
- [docs.md](./docs.md)
