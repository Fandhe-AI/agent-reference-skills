# App Bundle Configuration APKs (`bundle { }`)

Configures which device-configuration split APKs Google Play generates from the App Bundle (by language, screen density, and ABI), used to further reduce per-device download size.

## Signature / Usage

```kotlin
android {
    bundle {
        language {
            enableSplit = true
        }
        density {
            enableSplit = true
        }
        abi {
            enableSplit = true
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `language.enableSplit` | `Boolean` | `true` | Generates a separate configuration APK per language/locale. |
| `density.enableSplit` | `Boolean` | `true` | Generates a separate configuration APK per screen density. |
| `abi.enableSplit` | `Boolean` | `true` | Generates a separate configuration APK per ABI. |

## Notes

- These settings apply only to the App Bundle path (Google Play-generated configuration APKs); they are distinct from `splits { }`, which configures locally-built multiple APKs.
- Combined with code/resource shrinking, this is a primary lever for reducing per-device download size within the 4 GB compressed limit.

## Related

- [app-bundle.md](./app-bundle.md)
- [apk-splits.md](./apk-splits.md)
