# manifest-resources

| Name | Description | Path |
|------|-------------|------|
| AndroidManifest.xml Structure | Required top-level elements, component declaration, and manifest conventions/limits. | [manifest-structure.md](./manifest-structure.md) |
| manifest element | Root `<manifest>` element: package identity, versioning, install location. | [manifest-element.md](./manifest-element.md) |
| application element | `<application>` element: icon/label/theme, backup, network security, back-invoked callback. | [application-element.md](./application-element.md) |
| activity element | `<activity>` element: exported, launchMode, configChanges, windowSoftInputMode, screenOrientation. | [activity-element.md](./activity-element.md) |
| uses-permission / permission elements | Declaring required system permissions and custom permissions. | [uses-permission-element.md](./uses-permission-element.md) |
| uses-feature element | Declaring required/optional hardware & software features for Google Play filtering. | [uses-feature-element.md](./uses-feature-element.md) |
| uses-sdk element | Deprecated `minSdkVersion`/`targetSdkVersion`/`maxSdkVersion` manifest declaration. | [uses-sdk-element.md](./uses-sdk-element.md) |
| queries element | Package visibility declarations (`<package>`, `<intent>`, `<provider>`). | [queries-element.md](./queries-element.md) |
| provider element | `<provider>` manifest attributes for `ContentProvider` components. | [provider-element.md](./provider-element.md) |
| receiver element | `<receiver>` manifest attributes for `BroadcastReceiver` components. | [receiver-element.md](./receiver-element.md) |
| service element | `<service>` manifest attributes for `Service` components. | [service-element.md](./service-element.md) |
| Manifest merging and placeholders | Multi-manifest merge priority, `tools:` namespace markers, `manifestPlaceholders`. | [manifest-merging.md](./manifest-merging.md) |
| Resource directories and the R class | `res/` subdirectory types and generated `R` class references. | [resource-directories.md](./resource-directories.md) |
| Configuration qualifiers | Qualifier directory naming and best-match resource resolution. | [resource-qualifiers.md](./resource-qualifiers.md) |
| String, string-array, and plurals resources | Text resources with formatting, escaping, and plural rules. | [string-resources.md](./string-resources.md) |
| bool, color, dimen, id, integer, and array resources | Simple scalar and array value resources. | [value-resources.md](./value-resources.md) |
| Style and theme resources (styles.xml / themes.xml) | XML `<style>` inheritance and app/activity theming. | [style-theme-resources.md](./style-theme-resources.md) |
| Drawable resources | Shape, vector, state-list, and other XML/bitmap drawable types. | [drawable-resources.md](./drawable-resources.md) |
| Adaptive icons | Foreground/background/monochrome adaptive launcher icon layers. | [adaptive-icons.md](./adaptive-icons.md) |
| Localization and RTL support | Locale-qualified resources, RTL attributes, per-app language preferences. | [localization-rtl.md](./localization-rtl.md) |
| Accessing resources from Compose | `stringResource`, `painterResource`, `dimensionResource`, `colorResource`, and dynamic-lookup caveats. | [compose-resource-access.md](./compose-resource-access.md) |
| Resource naming and compression | Naming rules and their effect on resource shrinking. | [resource-naming-compression.md](./resource-naming-compression.md) |
