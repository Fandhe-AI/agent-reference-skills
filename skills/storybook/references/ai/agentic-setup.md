# Agentic setup

An agent analyzes your project (framework, renderer, builder, language, addons), generates a Markdown guide with step-by-step instructions, and follows it to configure Storybook and write initial stories.

## Signature / Usage

Copy/paste this prompt into your agent's chat:

```text
Set up Storybook for me with npm create storybook@latest and follow its instructions precisely
```

The agent first runs `storybook init`; when it completes, the agent offers to continue with project-specific configuration, generates the instructions, follows them, and applies each change directly to the codebase for review.

## Generated setup instructions

1. Analyze the codebase: read providers, global CSS, portals, and data-fetching patterns.
2. Configure the preview: set up decorators, global styles, and framework-level providers in `preview.tsx`.
3. Support portals: ensure portal roots exist in the Storybook preview DOM.
4. Mock side effects: intercept network requests (via MSW), storage, timers, and navigation at the preview level rather than per-story.
5. Write stories: add stories from up to 10 components, simple to complex, tagged `ai-generated` for review.
6. Add play functions: implement interaction tests for the most important flows.
7. Cover additional patterns: expand coverage across components already touched.
8. Verify: run Vitest against every new story to confirm it renders, and run the type checker.
9. Install useful addons: add and configure addons like MCP.

## Notes

- Experimental/preview: currently only available for projects using the React renderer with the Vite builder. Support for additional renderers and builders will follow.
- The API may change in future releases.
- After setup: run the new Storybook, review generated `main` and `preview` config, review stories tagged `ai-generated` (remove the tag once validated), connect the MCP server, and follow the best practices.
- Source: https://storybook.js.org/docs/ai/setup (Storybook v10.6.2).

## Related

- [Using Storybook with AI](./overview.md)
- [MCP server](./mcp-server.md)
- [Best practices](./best-practices.md)
