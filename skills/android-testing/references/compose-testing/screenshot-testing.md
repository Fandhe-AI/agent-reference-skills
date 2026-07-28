# captureToImage (instrumented screenshot testing)

Captures the rendered pixels of a matched node as a `Bitmap`, for use inside an instrumented `ComposeTestRule` test (as opposed to host-side `@Preview` screenshot testing).

## Signature / Usage

```kotlin
fun SemanticsNodeInteraction.captureToImage(): ImageBitmap
```

```kotlin
@Test
fun screenshotTest() {
    composeTestRule.setContent { MyScreen() }

    val bitmap = composeTestRule.onRoot().captureToImage().asAndroidBitmap()
    // Compare against a golden file, or save it:
    // bitmap.save(file)
}
```

## Notes

- Distinct from the same-named page in the `instrumented` category, which covers on-device View hierarchy capture rather than Compose's `captureToImage()` / Preview screenshot testing.
- Internally uses `PixelCopy.request()` to capture what is actually drawn on screen after a draw pass, so `waitForIdle()` / a preceding action should run first to ensure the frame is current.
- Convert with `ImageBitmap.asAndroidBitmap()` for `Bitmap`-based comparison/golden-image libraries.
- For host-side, `@Preview`-driven screenshot testing (no device/emulator, Gradle-task based), see `preview-screenshot-testing.md` instead — the two approaches are complementary.
- Package: `androidx.compose.ui.test`. Artifact: `androidx.compose.ui:ui-test-junit4`.

## Related

- [preview-screenshot-testing](./preview-screenshot-testing.md)
- [compose-test-rule](./compose-test-rule.md)
