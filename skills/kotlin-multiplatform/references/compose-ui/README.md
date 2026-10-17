# compose-ui

| Name | Description | Path |
|------|-------------|------|
| Accessibility | Semantic properties, accessibility APIs, and support for assistive technologies such as screen readers and keyboard navigation, aligned with EAA and WCAG. | [accessibility.md](./accessibility.md) |
| Adaptive layouts | Adapt the UI to different display sizes, orientations, and input modes using window size classes: compact, medium, and expanded. | [adaptive-layouts.md](./adaptive-layouts.md) |
| Android-only components | APIs and libraries that work only on the Android target; using them in `commonMain` makes the IDE report them as unavailable. | [android-only-components.md](./android-only-components.md) |
| Drag-and-drop operations | Accept data dragged in from other applications, or let users drag data out, using the `dragAndDropSource` and `dragAndDropTarget` modifiers. | [drag-and-drop.md](./drag-and-drop.md) |
| Native application entry points | Native entry points (activity, view controller, window, or container) that host the common `App()` function on each platform. | [entry-points.md](./entry-points.md) |
| Layout basics | Layout construction basics: composable functions, `Column` / `Row` / `Box`, flow layouts, and modifiers. | [layout-basics.md](./layout-basics.md) |
| Working with modifiers | Modifiers that change size, layout, behavior, and appearance, add accessibility labels, handle user input, and add high-level interactions. | [layout-modifiers.md](./layout-modifiers.md) |
| Popups | Non-modal floating `Popup()` containers that render above the current UI, unlike the modal, centered `Dialog()`. | [popups.md](./popups.md) |
| Compose UI previews | Preview composables render UI in the IDE without an emulator; Compose Hot Reload shows code changes in a live desktop app. | [previews.md](./previews.md) |
| Testing Compose Multiplatform UI | UI testing with the Jetpack Compose testing API, using `runComposeUiTest` and the `ComposeUiTest` receiver instead of JUnit's `TestRule`. | [testing.md](./testing.md) |
| Setting up the viewport | Web setup: `ComposeViewport` renders to an HTML canvas, and the host container needs explicit CSS so the canvas sizes correctly. | [web-css-styles.md](./web-css-styles.md) |
