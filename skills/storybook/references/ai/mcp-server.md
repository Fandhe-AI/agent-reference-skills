# MCP server (@storybook/addon-mcp) overview and toolsets

Storybook's MCP server connects your Storybook to AI agents so they can read component docs, generate stories, and run tests, creating a self-healing loop.

## Signature / Usage

```shell
npx storybook add @storybook/addon-mcp
npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project
```

Suggested `AGENTS.md` (or `CLAUDE.md`) instructions; replace `your-project-sb-mcp` with the name chosen in `mcp-add`:

```md
When working on UI components, always use the `your-project-sb-mcp` MCP tools to access Storybook's component and documentation knowledge before answering or taking any action.

- **CRITICAL: Never hallucinate component properties!** Before using ANY property on a component from a design system (including common-sounding ones like `shadow`, etc.), you MUST use the MCP tools to check if the property is actually documented for that component.
- Query `docs-list` to get a list of documented components
- Query `docs-show` for that component to see all available properties and examples
- Only use properties that are explicitly documented or shown in example stories
- If a property isn't documented, do not assume properties based on naming conventions or common patterns from other libraries. Check back with the user in these cases.
- Use the `get-storybook-story-instructions` tool to fetch the latest instructions for creating or updating stories. This will ensure you follow current conventions and recommendations.
- Check your work by running `test-run`.
```

## Toolsets

| Toolset | Tool | Description |
| --- | --- | --- |
| Development | `stories-changed` | Stories changed or possibly affected by local file changes (requires change detection enabled). |
| Development | `get-storybook-story-instructions` | Instructions on writing useful stories, including props to capture and interaction tests. |
| Development | `stories-preview` | Story previews rendered in the agent chat if it supports MCP Apps; otherwise links to stories. |
| Development | `stories-find-by-component` | Maps component source files to stories rendering them via the live reverse dependency graph. |
| Development | `review-create` | Pushes a curated review of current changes and returns the review-page URL (requires the review feature enabled). |
| Docs | `docs-show` | Detailed docs for a component: props, first three stories, index of remaining stories, additional docs. |
| Docs | `docs-show-story` | Full story and associated docs for a specific story. |
| Docs | `docs-list` | Index of components and unattached docs entries. |
| Testing | `test-run` | Runs tests for specific stories and returns results including accessibility issues (if configured). |

## Framework support

| Framework | Features to enable | Component API in `docs-show` |
| --- | --- | --- |
| Every React framework (`react-vite`, `react-webpack5`, `nextjs`, `nextjs-vite`, `tanstack-react`, `react-native-web-vite`) | `componentsManifest` | Yes |
| `@storybook/angular-vite` | `componentsManifest` | Yes |
| `@storybook/vue3-vite` | `componentsManifest` and `experimentalDocgenServer` | Yes |
| `@storybook/angular` (Webpack) | No manifest support | No |
| Every other framework | No manifest support | No |

## Notes

- Preview feature; API may change.
- The MCP server works in every Storybook project; development and testing toolsets have no framework requirements. The docs toolset requires the components manifest.
- `@storybook/angular-vite` enables `experimentalDocgenServer` itself; setting `experimentalDocgenServer: false` disables the manifest and docs toolset. Vue setups other than `@storybook/vue3-vite` (including `@nuxtjs/storybook`) generate no manifest.
- The MCP server is part of the dev server, so host validation applies: if the agent reaches Storybook through another hostname (e.g. a reverse proxy), list it in `core.allowedHosts`.
- The testing toolset needs Storybook Test (`@storybook/addon-vitest`) set up.
- If a composed Storybook has manifests, the MCP server includes their content automatically.
- Any MCP-capable agent works (Claude Code, OpenAI Codex, Cursor, Google Gemini CLI, VS Code Copilot, etc.).

## Related

- [MCP server API](./mcp-server-api.md)
- [Sharing your MCP server](./mcp-sharing.md)
- [Manifests](./manifests.md)
- [Agentic review](./agentic-review.md)
