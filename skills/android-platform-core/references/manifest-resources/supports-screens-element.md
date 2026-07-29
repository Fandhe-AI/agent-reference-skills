# compatible-screens / supports-screens / supports-gl-texture / uses-configuration elements

Legacy pre-density-independence manifest elements for declaring supported screen sizes, exact screen configurations, required OpenGL texture formats, and required input hardware. Largely superseded by `sw<N>dp` resource qualifiers, `<uses-feature>`, and modern adaptive-layout practice.

## Signature / Usage

```xml
<manifest ...>
    <supports-screens
        android:requiresSmallestWidthDp="600"
        android:compatibleWidthLimitDp="600" />

    <compatible-screens>
        <screen android:screenSize="normal" android:screenDensity="mdpi" />
        <screen android:screenSize="large" android:screenDensity="hdpi" />
    </compatible-screens>

    <supports-gl-texture android:name="GL_OES_compressed_ETC1_RGB8_texture" />

    <uses-configuration
        android:reqFiveWayNav="true"
        android:reqKeyboardType="qwerty" />
</manifest>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:resizeable` (supports-screens) | Boolean | `"true"` | **Deprecated**, do not use. |
| `android:smallScreens` / `normalScreens` / `largeScreens` / `xlargeScreens` (supports-screens) | Boolean | `"true"` (varies for large/xlarge by target SDK) | Whether the app supports that screen form-factor. `xlargeScreens` introduced API 9. |
| `android:anyDensity` (supports-screens) | Boolean | `"true"` | Whether the app supplies resources for any screen density; disable only if manipulating raw bitmaps directly. |
| `android:requiresSmallestWidthDp` (supports-screens) | Integer | — | Minimum required smallest-width in dp; used for Google Play device filtering. API 13+. |
| `android:compatibleWidthLimitDp` / `largestWidthLimitDp` (supports-screens) | Integer | — | Smallest-width thresholds above which screen compatibility mode is offered (`compatibleWidthLimitDp`, user-optional) or forced (`largestWidthLimitDp`, no toggle). API 13+. |
| `<screen>` children (compatible-screens) | Element | — | Each `<screen android:screenSize android:screenDensity>` pair names one exact size/density combination the app supports; combinations not listed are treated as incompatible by Google Play. |
| `android:name` (supports-gl-texture) | String | required | An OpenGL ES texture compression format the app requires, e.g. `GL_OES_compressed_ETC1_RGB8_texture`. |
| `android:reqFiveWayNav` / `reqNavigation` / `reqHardKeyboard` / `reqKeyboardType` / `reqTouchScreen` (uses-configuration) | Boolean/Enum | — | Declares required input hardware; the app is hidden from devices lacking a declared requirement. |

## Notes

- All contained in: `<manifest>`. All introduced API level 1 (deprecated/legacy status noted per-element above).
- `<compatible-screens>` is explicitly the more error-prone legacy alternative: Android recommends `<supports-screens>` with `sw<N>dp` qualifiers instead, since an app is excluded from Google Play on any screen configuration not explicitly listed.
- `<supports-gl-texture>` and `<uses-configuration>` are largely superseded by `<uses-feature>` declarations, which provide equivalent Google Play filtering with clearer semantics.

## Related

- [uses-feature element](./uses-feature-element.md)
- [resource qualifiers](./resource-qualifiers.md)
