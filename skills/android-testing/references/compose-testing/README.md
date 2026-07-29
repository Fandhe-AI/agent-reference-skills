# compose-testing

| Name | Description | Path |
|------|-------------|------|
| Accessibility testing (Compose) | Automated accessibility checks for Compose UI, built on the Accessibility Test Framework. | [accessibility-testing.md](./accessibility-testing.md) |
| Actions | Extension functions on `SemanticsNodeInteraction` that inject simulated user events (clicks, text input, scrolling, gestures). | [actions.md](./actions.md) |
| Assertions | Extension functions on `SemanticsNodeInteraction` and `SemanticsNodeInteractionCollection` that verify state and fail the test with descriptive messages. | [assertions.md](./assertions.md) |
| ComposeTestRule | JUnit4 `TestRule` that hosts Compose content under test and drives the semantics tree during testing. | [compose-test-rule.md](./compose-test-rule.md) |
| Compose Testing v2 APIs | Recommended replacement for the deprecated v1 JUnit4 rule APIs; uses `StandardTestDispatcher` for more explicit synchronization. | [compose-testing-v2.md](./compose-testing-v2.md) |
| DeviceConfigurationOverride | Wraps test content and locally overrides device-wide properties (screen/window size, font scale, layout direction). | [device-configuration-override.md](./device-configuration-override.md) |
| Espresso / UiAutomator interoperability | Hybrid apps mixing Compose and Views; match Views with Espresso and Compose elements with `ComposeTestRule` in same test. | [espresso-interop.md](./espresso-interop.md) |
| Finders | Functions that select nodes from the semantics tree by matcher, text, tag, content description, or tree root. | [finders.md](./finders.md) |
| Compose Preview Screenshot Testing | Host-side screenshot testing built on `@Preview` composables; compares rendered images and produces HTML diff reports. | [preview-screenshot-testing.md](./preview-screenshot-testing.md) |
| printToLog | Debug helper that dumps a node's semantics subtree to logcat for inspecting what finders can see. | [print-to-log.md](./print-to-log.md) |
| captureToImage (instrumented screenshot testing) | Captures the rendered pixels of a matched node as a `Bitmap` for instrumented test image comparison. | [screenshot-testing.md](./screenshot-testing.md) |
| SemanticsMatcher | Predicate over a `SemanticsNode`, used with `onNode` / `onAllNodes` and `assert()` for node matching and filtering. | [semantics-matcher.md](./semantics-matcher.md) |
| SemanticsNodeInteraction / SemanticsNodeInteractionCollection | Represents single/multiple matched nodes; supports navigation to related nodes and filtering. | [semantics-node-interaction.md](./semantics-node-interaction.md) |
| StateRestorationTester | Tests that `rememberSaveable` state survives a save/restore cycle without relaunching the Activity. | [state-restoration-tester.md](./state-restoration-tester.md) |
| Synchronization | Compose tests are synchronized with the UI by default; `MainTestClock` drives the virtual clock. | [synchronization.md](./synchronization.md) |
| Modifier.testTag in tests | `Modifier.testTag` attaches a stable identifier to a composable so tests can find it independent of visible text. | [test-tag-usage.md](./test-tag-usage.md) |
