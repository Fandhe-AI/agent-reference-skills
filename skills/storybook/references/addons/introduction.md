# Introduction to addons

Addons extend Storybook with features and integrations that are not built into the core. Most Storybook features (documentation, accessibility testing, interactive controls) are implemented as addons.

## Signature / Usage

Storybook is split into two parts that run in separate `iframe`s and sync over a communication channel:

| Part | Role |
|------|------|
| Manager | UI that renders search, navigation, toolbars, and addons |
| Preview | `iframe` where stories are rendered |

```ts
// .storybook/main.ts — addons are registered in the `addons` array
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  addons: [
    // Other Storybook addons
    '@storybook/addon-a11y',
  ],
};

export default config;
```

## Notes

- Selecting a story in the Manager dispatches an event across the channel so the Preview renders the story.
- Addons fall into two categories: UI-based addons (customize the Storybook UI, e.g. Controls, Docs, Accessibility) and preset addons (integrate Storybook with other technologies, e.g. `preset-create-react-app`).
- Browse the addon catalog at https://storybook.js.org/addons.
- Source: https://storybook.js.org/docs/addons (Storybook v10.6.2).

## Related

- [Install addons](./install-addons.md)
- [Types of addons](./addon-types.md)
- [Write an addon](./writing-addons.md)
- [Write a preset addon](./writing-presets.md)
- [Addon API](./addons-api.md)
