# Writing Stories

| Name | Description | Path |
|------|-------------|------|
| Args | Dynamic inputs passed to components as a plain JavaScript object, enabling interactive prop modification via Controls without changing component code. | [args.md](./args.md) |
| Build Pages with Storybook | Patterns for writing stories for full page-level components that may include connected containers, routing, and external data dependencies. | [build-pages.md](./build-pages.md) |
| Decorators | Functions that wrap stories in extra rendering functionality such as markup, context providers, or theme wrappers. | [decorators.md](./decorators.md) |
| Loaders | Async functions that fetch external data before a story renders, injecting results into the story via the `loaded` render context field. | [loaders.md](./loaders.md) |
| Mocking Modules | Replaces imported module dependencies (local utilities or npm packages) with controlled test doubles so components can be tested in isolation. | [mocking-modules.md](./mocking-modules.md) |
| Mocking Network Requests | Intercepts HTTP/GraphQL requests in stories using Mock Service Worker (MSW) so components can be tested without real APIs. | [mocking-network-requests.md](./mocking-network-requests.md) |
| Mocking Providers | Supplies required React context (theme, Redux store, auth, etc.) to stories by wrapping them in decorators that provide mock context values. | [mocking-providers.md](./mocking-providers.md) |
| Naming and Hierarchy | Controls how stories are organized and sorted in the Storybook sidebar using implicit (file-system) or explicit (`title`) structuring. | [naming-and-hierarchy.md](./naming-and-hierarchy.md) |
| Parameters | Static, named metadata attached to stories to configure Storybook features and addons. | [parameters.md](./parameters.md) |
| Play Function | An async function attached to a story that runs after rendering, enabling automated interaction testing via simulated user events. | [play-function.md](./play-function.md) |
| Stories for Multiple Components | Techniques for writing stories that render two or more components together, such as parent/child pairs like `List` + `ListItem`. | [multiple-components.md](./multiple-components.md) |
| Tags | A categorization system that controls which stories appear in the sidebar, test runs, and documentation pages. | [tags.md](./tags.md) |
| TypeScript | Writing type-safe stories using Storybook's built-in TypeScript support with `Meta`, `StoryObj`, and the `satisfies` operator. | [typescript.md](./typescript.md) |
