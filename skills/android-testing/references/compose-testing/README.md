# compose-testing

| Name | Description | Path |
|------|-------------|------|
| ComposeTestRule | JUnit4 rule (`createComposeRule`/`createAndroidComposeRule`) hosting Compose content and driving idle sync. | [compose-test-rule.md](./compose-test-rule.md) |
| Finders | `onNode`, `onNodeWithText`, `onNodeWithTag`, `onNodeWithContentDescription`, `onAllNodes*`, `onRoot`. | [finders.md](./finders.md) |
| SemanticsMatcher | `hasText`, `hasTestTag`, `hasContentDescription`, `isEnabled`, `isSelected`, `hasClickAction`, hierarchical matchers. | [semantics-matcher.md](./semantics-matcher.md) |
| Assertions | `assertIsDisplayed`, `assertExists`, `assertDoesNotExist`, `assertTextEquals`, `assertIsEnabled`, `assertCountEquals`, `assertAny`/`assertAll`. | [assertions.md](./assertions.md) |
| Actions | `performClick`, `performTextInput`, `performScrollTo`/`performScrollToIndex`, `performTouchInput`, `performSemanticsAction`. | [actions.md](./actions.md) |
| SemanticsNodeInteraction | Navigation/filtering on matched nodes: `onFirst`, `onLast`, `filter`, `onChildren`, `onParent`, `onAncestors`. | [semantics-node-interaction.md](./semantics-node-interaction.md) |
| printToLog | Dumps a node's semantics subtree to logcat for debugging finders. | [print-to-log.md](./print-to-log.md) |
| Synchronization | `mainClock.autoAdvance`/`advanceTimeBy`, `waitForIdle`, `waitUntil` and helpers. | [synchronization.md](./synchronization.md) |
| Modifier.testTag in tests | Using `Modifier.testTag`/`hasTestTag` and `useUnmergedTree` from tests. | [test-tag-usage.md](./test-tag-usage.md) |
| Espresso / UiAutomator interop | Mixing `onView()` with `ComposeTestRule`, `onRootWithViewInteraction`, `testTagsAsResourceId`. | [espresso-interop.md](./espresso-interop.md) |
| captureToImage | Instrumented, node-level screenshot capture inside a `ComposeTestRule` test. | [screenshot-testing.md](./screenshot-testing.md) |
| Compose Preview Screenshot Testing | Host-side, `@Preview` + `@PreviewTest` based screenshot testing (Gradle tasks). | [preview-screenshot-testing.md](./preview-screenshot-testing.md) |
| Accessibility testing | `enableAccessibilityChecks`/`tryPerformAccessibilityChecks` automated a11y checks. | [accessibility-testing.md](./accessibility-testing.md) |
