# Resource naming and compression

Naming conventions for resource files/identifiers and how naming interacts with resource shrinking/compression at build time.

## Signature / Usage

```xml
<!-- valid: lowercase, digits, underscores only -->
<string name="login_submit_button">Sign in</string>
<drawable name="ic_launcher_foreground" />
```

## Notes

- Resource names must be valid Java-style identifiers: lowercase letters, digits, and underscores only, and must be unique within their resource type (e.g. all `drawable` names share one namespace, separate from `string` names).
- Consistent prefixing by usage (e.g. `ic_` for icons, `bg_` for backgrounds) keeps large `drawable`/`layout` sets navigable, though this is a project convention rather than a platform requirement.
- Unreferenced resources are eligible for removal by the build system's resource shrinker; resources only referenced dynamically via `Resources.getIdentifier()` (name-based lookup) can be incorrectly stripped unless explicitly kept, which is one more reason `getIdentifier()`-based access is discouraged (see [Compose resource access](./compose-resource-access.md)).
- PNG/WEBP drawables are subject to automatic compression by AAPT during the build; vector drawables avoid this concern entirely since they are not raster assets.
- Resource shrinking, `resValue`, and `buildFeatures` configuration are build-time Gradle concerns owned by the `android-build-gradle` skill; this page covers only the naming rules that affect what gets kept or discarded.

## Related

- [resource directories](./resource-directories.md)
- [Compose resource access](./compose-resource-access.md)
