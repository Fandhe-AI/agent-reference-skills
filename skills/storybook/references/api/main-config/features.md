# features

Enables or disables Storybook's built-in capabilities and experimental functionalities.

## Type

```typescript
{
  actions?: boolean;
  argTypeTargetsV7?: boolean;
  backgrounds?: boolean;
  componentsManifest?: boolean;
  controls?: boolean;
  developmentModeForBuild?: boolean;
  experimentalCodeExamples?: boolean;
  experimentalTestSyntax?: boolean;
  highlight?: boolean;
  interactions?: boolean;
  legacyDecoratorFileOrder?: boolean;
  measure?: boolean;
  outline?: boolean;
  sidebarOnboardingChecklist?: boolean;
  toolbars?: boolean;
  viewport?: boolean;
}
```

## Usage

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
| `controls` | `boolean` | `true` | Enables the Controls addon |
| `highlight` | `boolean` | `true` | Enables element highlight inspection |
| `interactions` | `boolean` | `true` | Enables interaction test debugging tools |
| `measure` | `boolean` | `true` | Enables the Measure tool |
| `outline` | `boolean` | `true` | Enables visual element outline |
| `viewport` | `boolean` | `true` | Enables the Viewport addon |
| `componentsManifest` | `boolean` | `true` | Generates manifests for MCP server integration |
| `sidebarOnboardingChecklist` | `boolean` | `true` | Shows the onboarding checklist in sidebar |
| `argTypeTargetsV7` | `boolean` | `true` | (Experimental) Filters args with "target" properties from render functions |
| `developmentModeForBuild` | `boolean` | — | Sets `NODE_ENV` to development in built Storybooks |
| `experimentalCodeExamples` | `boolean` | — | (Experimental) Faster, more accurate code generation for autodocs |
| `experimentalTestSyntax` | `boolean` | — | (Experimental) Enables CSF Next `.test` method syntax |
| `legacyDecoratorFileOrder` | `boolean` | — | Applies preview.js decorators before addon/framework decorators |

## Notes

- Most features default to `true`; set to `false` only when needed
- Experimental features may change or be removed in future releases
- `experimentalCodeExamples` reads source files directly; dynamic control updates are not reflected

## Related

- [addons.md](./addons.md)
- [docs.md](./docs.md)
