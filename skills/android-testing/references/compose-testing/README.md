# Compose Testing

| Name | Description | Path |
|------|-------------|------|
| Accessibility testing (Compose) | Automated accessibility checks for Compose UI, built on the Accessibility Test Framework… | [accessibility-testing.md](./accessibility-testing.md) |
| Actions | Extension functions on SemanticsNodeInteraction that inject simulated user events… | [actions.md](./actions.md) |
| Assertions | Extension functions on SemanticsNodeInteraction and SemanticsNodeInteractionCollection that… | [assertions.md](./assertions.md) |
| Common Patterns | Well-established approaches for testing Compose apps: isolating composables, reaching… | [common-patterns.md](./common-patterns.md) |
| ComposeTestRule | JUnit4 TestRule that hosts Compose content under test and drives the semantics tree… | [compose-test-rule.md](./compose-test-rule.md) |
| Compose Testing v2 APIs | The current, recommended replacement for the v1 JUnit4 rule/runComposeUiTest APIs… | [compose-testing-v2.md](./compose-testing-v2.md) |
| Debug Tests | Debugging Compose tests primarily means inspecting the semantics tree, which carries… | [debug.md](./debug.md) |
| DeviceConfigurationOverride | Wraps test content and locally overrides a device-wide property — screen/window size… | [device-configuration-override.md](./device-configuration-override.md) |
| Espresso / UiAutomator interoperability | Hybrid apps mixing Compose and Views need no special setup: match Views with Espresso's… | [espresso-interop.md](./espresso-interop.md) |
| Finders | Functions on SemanticsNodeInteractionsProvider that select one or more nodes from the… | [finders.md](./finders.md) |
| Compose Preview Screenshot Testing | Host-side screenshot testing built on @Preview composables. Annotating a preview with… | [preview-screenshot-testing.md](./preview-screenshot-testing.md) |
| printToLog | Debug helper that dumps a node's semantics subtree to logcat, useful for inspecting… | [print-to-log.md](./print-to-log.md) |
| captureToImage (instrumented screenshot testing) | Captures the rendered pixels of a matched node as a Bitmap, for use inside an… | [screenshot-testing.md](./screenshot-testing.md) |
| SemanticsMatcher | Predicate over a SemanticsNode, used with onNode / onAllNodes and assert(). The… | [semantics-matcher.md](./semantics-matcher.md) |
| SemanticsNodeInteraction / SemanticsNodeInteractionCollection | SemanticsNodeInteraction represents a single matched node… | [semantics-node-interaction.md](./semantics-node-interaction.md) |
| StateRestorationTester | Tests that a composable's rememberSaveable state survives a save/restore cycle… | [state-restoration-tester.md](./state-restoration-tester.md) |
| Synchronization | Compose tests are synchronized with the UI by default: every assert* / perform* call… | [synchronization.md](./synchronization.md) |
| Modifier.testTag in tests | Modifier.testTag attaches a stable identifier to a composable so tests can find it… | [test-tag-usage.md](./test-tag-usage.md) |
