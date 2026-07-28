# Watch Face Format Overview

Watch Face Format (WFF) is a declarative XML format for building Wear OS watch faces, created in partnership with Samsung. No rendering code is required — the Wear OS platform parses the XML and renders the watch face, pulling in image/font resources as needed.

## Signature / Usage

```xml
<WatchFace width="450" height="450">
    <Scene>
        <!-- watch face content -->
    </Scene>
</WatchFace>
```

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- As of January 2026, Watch Face Format is required for installing watch faces on all Wear OS devices; the legacy Kotlin `WatchFaceService` API guide has been removed from the official docs and is no longer the recommended approach.
- Watch faces are resource-only: the bundle must declare `android:hasCode="false"` on `<application>` (see [setup](./setup.md)).
- Watch faces can also be authored without XML via Watch Face Studio (Samsung, WYSIWYG) or Watch Face Designer (Figma plugin) — both ultimately produce a WFF-compatible package; not covered here.
- WFF version determines available elements/attributes; see [versions](./versions.md).

## Related

- [setup](./setup.md)
- [root-element](./root-element.md)
- [versions](./versions.md)
