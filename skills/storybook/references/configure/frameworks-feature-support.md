# Frameworks feature support

Matrix of which Storybook features are supported by which framework integration. Pull requests for missing support are welcome.

## Signature / Usage

Core frameworks have dedicated maintainers (React, Vue 3, Angular, Web Components). Community frameworks (Ember, HTML, Svelte, Preact, Qwik, SolidJS) have fewer contributors and may lag.

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
};

export default config;
```

## Options / Props

Core frameworks: every feature below is supported in React, Vue 3, Angular and Web Components, except GraphQL (React and Angular only).

Community frameworks (Ember / HTML / Svelte / Preact / Qwik / SolidJS): all supported except the gaps listed here.

| Feature | Not supported in |
| --- | --- |
| Interactions | Ember |
| Test runner | Ember |
| Test coverage | Ember |
| Autodocs | Ember |
| Inline stories | Ember, Preact, Qwik, SolidJS (supported in HTML, Svelte) |
| GraphQL addon | all community frameworks |

Feature groups in the matrix:

- Essentials: Actions, Backgrounds, Controls, Interactions, Measure, Outline, Viewport
- Addons: A11y, Docs, Test runner, Test coverage, CSS resources, Design assets, Events, Google analytics, GraphQL, Jest, Links, Queryparams
- Docs: CSF Stories, Autodocs, Doc Blocks (ArgTypes, Canvas, ColorPalette, Controls, Description, IconGallery, Markdown, Meta, Primary, Source, Story, Stories, Subtitle, Title, Typeset, Unstyled, UseOf), Inline stories

## Notes

- Deprecated / removed: Knobs (deprecated in 6.3, use controls), Storyshots (deprecated in 7.6, removed in 8), `storiesOf` (removed in 8, use CSF), Storysource (removed in 9, use the `codePanel` parameter).
- Matrix reflects the Storybook v10.6.2 docs source.

## Related

- [Frameworks](./frameworks.md)
- [Features and behavior](./features-and-behavior.md)
