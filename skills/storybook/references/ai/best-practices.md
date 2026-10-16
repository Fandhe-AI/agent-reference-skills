# Best practices for using Storybook with AI

How to write stories and docs so agents reading the generated manifests can reuse your components correctly.

## Signature / Usage

Component summary/description and story summary via JSDoc (React):

```ts
/**
 * Button is used for user interactions that do not navigate to another route.
 * For navigation, use [Link](?path=/docs/link--default) instead.
 *
 * @summary for user interactions that do not navigate to another route
 */
export const Button = // ...
```

```js
/**
 * Primary buttons are used for the main action in a view.
 * There should not be more than one primary button per view.
 *
 * @summary for the main action in a view
 */
export const Primary = {
  args: { primary: true },
};
```

Docs summary and manifest exclusion:

```mdx
import { Meta } from '@storybook/addon-docs/blocks';

<Meta
  title="Design Tokens/Colors"
  summary="A list of our color tokens, their usages, and guidelines for using them."
/>
```

## Notes

- Preview feature (relates to the generated manifests).
- Stories: demonstrate one concept or use case each, and describe the "why". The manifest evaluates the final rendered story with all args and decorators applied.
- Component description: placed as JSDoc above the export; the agent receives the `@summary` if present, otherwise a truncated description. Markdown is allowed.
- Story descriptions: the agent receives the summary if present, otherwise the first 60 characters of the description.
- Prop descriptions: JSDoc on props (e.g. `/** The icon to render before the button text */`).
- React: `react-docgen-typescript` is recommended (via the `reactDocgen` option); `react-docgen` is faster but less detailed.
- Vue `<script setup>`: attach the docblock to a `defineOptions()` call.
- Docs content: the docs manifest comes from static analysis of MDX, so values not explicitly in the source (e.g. colors mapped from an imported module) are not included. Put relevant details directly in the MDX.
- Curation: too little or too much context hurts agent performance. Remove the `manifest` tag (`tags: ['!manifest']`) from stories, component meta, or MDX `Meta` to exclude them.
- Source: https://storybook.js.org/docs/ai/best-practices (Storybook v10.6.2).

## Related

- [Manifests](./manifests.md)
- [MCP server](./mcp-server.md)
- [Agentic setup](./agentic-setup.md)
