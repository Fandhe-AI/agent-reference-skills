# Code Connect

| Name | Description | Path |
|------|-------------|------|
| Overview | What Code Connect is, CLI vs UI summary, prerequisites, and MCP context | [overview.md](./overview.md) |
| Getting Started with CLI | Installation, project config, writing files, and publishing | [quickstart.md](./quickstart.md) |
| Getting Started with UI | Browser-based setup in Figma Dev Mode with multi-framework support | [ui-setup.md](./ui-setup.md) |
| Connect to GitHub Repository | Link a GitHub repo to Code Connect UI for autocomplete and MCP context | [ui-github.md](./ui-github.md) |
| Comparing CLI and UI | Feature comparison table and suitability guide | [comparing-cc.md](./comparing-cc.md) |
| figma.config.json | All configuration fields for common, React, SwiftUI, and custom parser setups | [config-file.md](./config-file.md) |
| Template Files | Framework-agnostic `.figma.ts` files: structure, metadata comments, and instance APIs | [template-files.md](./template-files.md) |
| Template API | Complete API reference: `figma` object, `InstanceHandle` methods, helpers, and types | [template-api.md](./template-api.md) |
| Batch Files | Connect many components via a single shared template and JSON manifest | [batch-files.md](./batch-files.md) |
| CLI Reference | All `figma connect` subcommands and flags | [cli-reference.md](./cli-reference.md) |
| React Integration | `figma.connect()` with React prop helpers: string, boolean, enum, instance, children, etc. | [react.md](./react.md) |
| Web Components (HTML) | `figma.connect()` for HTML, Web Components, Angular, Vue with the `html` template literal | [html.md](./html.md) |
| SwiftUI Integration | `FigmaConnect` protocol and `@FigmaString`, `@FigmaBoolean`, `@FigmaEnum` property wrappers | [swiftui.md](./swiftui.md) |
| Jetpack Compose Integration | `@FigmaConnect`, `@FigmaProperty`, `@FigmaVariant` annotations and `Figma.mapping()` helper | [compose.md](./compose.md) |
| Storybook Integration | Connect Code Connect to React Storybook stories with variant restrictions | [storybook.md](./storybook.md) |
| Custom Parsers | Implement a custom parser for unsupported languages (preview feature) | [custom-parsers.md](./custom-parsers.md) |
| CI/CD Integration | GitHub Actions workflow to automate publishing on code changes | [ci-cd.md](./ci-cd.md) |
