# Posture

Describes the physical folding posture of the current window, exposed as `WindowAdaptiveInfo.windowPosture`.

## Signature / Usage

```kotlin
val windowAdaptiveInfo = currentWindowAdaptiveInfo()
val posture = windowAdaptiveInfo.windowPosture
```

## Notes

- `@ExperimentalMaterial3AdaptiveApi` opt-in required, as part of `WindowAdaptiveInfo`.
- `Posture` wraps information derived from `androidx.window.layout.FoldingFeature` and is used by `calculatePaneScaffoldDirective` to decide pane placement around hinges (e.g. `AvoidSeparating` hinge policy).
- Package: `androidx.compose.material3.adaptive`.

## Related

- [WindowAdaptiveInfo](./window-adaptive-info.md)
- [PaneScaffoldDirective](./pane-scaffold-directive.md)
- [FoldingFeature](./folding-feature.md)
