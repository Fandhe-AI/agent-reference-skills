# Why Storybook?

Storybook is a small, development-only workshop that lives alongside your app and renders UI components in isolation, capturing each variation as a story.

## Signature / Usage

```ts
// Histogram.stories.ts (React, CSF 3)
// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from '@storybook/your-framework';

import { Histogram } from './Histogram';

const meta = {
  component: Histogram,
} satisfies Meta<typeof Histogram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    dataType: 'latency',
    showHistogramLabels: true,
    histogramAccentColor: '#1EA7FD',
    label: 'Latency distribution',
  },
};
```

## Notes

- The problem: frontends accumulate devices, browsers, accessibility, performance and async-state requirements; mature projects can have hundreds of components with thousands of variations, entangled with business logic, interactive states and app context.
- Build UIs in isolation: Storybook provides an isolated iframe that renders components without interference from app business logic and context, so you can focus on each variation, including hard-to-reach edge cases (by passing props, mocking data, or faking events).
- Capture variations as stories: stories are a declarative syntax for supplying props and mock data; each component can have multiple stories, used for development, testing, and documentation.
- Storybook is an interactive directory of all components and their stories, so you skip running the app and contorting the UI into a given state.
- Placement in a project: installed by running a command; during development it runs in a separate node process.
- Integrations: hundreds of addons and tutorials exist; for niche or new tools, the docs suggest building a proof of concept addon first.
- Recommended workflow (Component-Driven, incrementally adoptable): (1) build each component in isolation and write stories, (2) compose small components into more complex ones, (3) assemble pages from composite components, (4) integrate pages by hooking up data and business logic.
- Benefits: more durable UIs (isolate components/pages, mock context, API requests, device features); testing with less effort (built-in Interaction, Accessibility and Visual testing, or import stories into other JS testing tools); documentation (auto-generated from stories); sharing (publish or embed in wikis, Markdown, Figma); CI automation.
- Write once, reuse everywhere: stories use Component Story Format (CSF), an open standard based on ES6 modules; each story is exported as a JavaScript function so it can be reused with Jest or Vitest and Testing Library, Chromatic, Axe, Playwright and Cypress. No vendor lock-in.
- The official page shows the same snippet for Angular, HTML, Vue, Svelte, Web Components and other renderers, and a "CSF Next" (experimental) variant using `preview.meta()` / `meta.story()`; only the React CSF 3 variant is shown above.

## Related

- [What's a Story?](./whats-a-story.md)
- [Install](./install.md)
- [Setup](./setup.md)
- [Browse Stories](./browse-stories.md)
