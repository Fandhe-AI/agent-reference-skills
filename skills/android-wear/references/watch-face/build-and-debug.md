# Build, Debug, and Validate

Android Studio and Gradle build WFF watch faces into an AAB/APK; a validator tool checks the XML against the published WFF schema before submission, and logcat surfaces runtime errors.

## Signature / Usage

```bash
# XML schema validation
java -jar wff-validator.jar 2 ~/MyWatchface/res/raw/watchface.xml
```

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Project layout: `res/raw/watchface.xml` (definitions), `res/font/`, `res/drawable/`, `res/values/strings.xml`, plus a standard `AndroidManifest.xml` (see [setup](./setup.md)).
- Android Studio provides code completion, live XML validation, and resource-link navigation for WFF tags/attributes, plus a run configuration to preview directly on device/emulator.
- The XML validator reports schema violations with line/column, e.g. `[Line 41:Column 53]: cvc-complex-type.3.2.2: Attribute 'hight' is not allowed to appear in element 'PartDraw'`.
- Runtime errors (missing resources, expression type mismatches, bad configuration references) surface in logcat; filter for `"runtime"` to find fatal/nonfatal issues from the watch face renderer process.
- Before Google Play submission, run the pre-submission Memory Footprint Evaluator (from the `google/watchface` GitHub repo) — Play performs the same checks during review, so passing locally reduces rejection risk (see [memory-optimization](./memory-optimization.md)).

## Related

- [setup](./setup.md)
- [memory-optimization](./memory-optimization.md)
