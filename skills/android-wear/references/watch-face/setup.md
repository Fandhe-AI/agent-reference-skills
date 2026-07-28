# WFF Project Setup

Project structure and manifest declarations required for a Watch Face Format project.

## Signature / Usage

```xml
<!-- AndroidManifest.xml -->
<application android:hasCode="false" android:label="@string/app_name">
    <property
        android:name="com.google.wear.watchface.format.version"
        android:value="4" />
    <property
        android:name="com.google.wear.watchface.format.publisher"
        android:value="{toolName}-{toolVersion}" />
</application>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `com.google.wear.watchface.format.version` | property, int | — | WFF version the watch face targets. Set to the lowest version supporting the needed features to maximize device compatibility; `minSdkVersion` should match. |
| `com.google.wear.watchface.format.publisher` | property, string | — | Optional identifier of the authoring tool (`{toolName}-{toolVersion}`). |
| `android:hasCode` | manifest attribute | — | Must be `"false"`; WFF bundles are resource-only and cannot contain code. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- File layout: `res/raw/watchface.xml` (main definition, `<Scene>` root), `res/xml/watch_face_info.xml` (metadata), `res/xml/watch_face_shapes.xml` (optional, multiple device-shape variants), `res/font/`, `res/drawable/`.
- `watch_face_info.xml` example: `<WatchFaceInfo><Preview value="@drawable/preview"/><Category value="CATEGORY_EMPTY"/><AvailableInRetail value="true"/><MultipleInstancesAllowed value="true"/><Editable value="true"/><FlavorsSupported value="true"/></WatchFaceInfo>`. `Editable` must be `true` to expose personalization via the Watch Face Editor (see [personalization-and-photos](./personalization-and-photos.md)); `FlavorsSupported` must be `true` to use `<Flavors>` (see [user-configurations](./user-configurations.md)).
- Multi-shape support (`res/xml/watch_face_shapes.xml`): `<WatchFaces><WatchFace shape="CIRCLE" width="300" height="300" file="@raw/watchface_basic"/></WatchFaces>`.
- The watch face bundle must be kept as a separate Android App Bundle from any companion Wear OS app bundle (required by Google Play).
- Android Studio: **File > New Project > Wear OS > Basic watch face** scaffolds this structure automatically.

## Related

- [overview](./overview.md)
- [root-element](./root-element.md)
- [build-and-debug](./build-and-debug.md)
