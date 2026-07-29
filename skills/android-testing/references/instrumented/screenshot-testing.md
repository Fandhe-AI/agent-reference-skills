# Screenshot testing

Screenshot tests capture a rendered UI and compare it against a previously-approved reference ("golden") image; the test fails if the images differ beyond tolerance. A single screenshot test implicitly asserts on colors, margins, sizes, and fonts at once, and is especially recommended for Compose UIs (see the `compose-testing` category for Compose Preview screenshot test setup).

## Signature / Usage

```kotlin
// Library-specific tolerance configuration example
tolerance = 0.5f  // allow up to 0.5% pixel difference
```

## Notes

- Distinct from the same-named page in the `compose-testing` category, which covers Compose-specific `captureToImage()` / Preview screenshot testing rather than device-level View hierarchy capture.
- Two execution/rendering combinations exist: local host tests using Layoutlib or Robolectric Native Graphics (RNG), and instrumented on-device tests.
- Store golden images in Git (minimize count), Git LFS for larger sets, or an external image-diffing service.
- Rendering differs slightly across Linux/macOS/Windows; either tolerate small pixel differences or always capture goldens on CI for consistency.
- A failed screenshot test doesn't always mean a bug — it may just require approving and updating the reference image.

## Related

- [AndroidTestOrchestrator](./androidtestorchestrator.md)
- [UI Automator](./uiautomator.md)
- [Preview screenshot testing](../compose-testing/preview-screenshot-testing.md)
