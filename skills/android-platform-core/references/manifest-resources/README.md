# manifest-resources

| Name | Description | Path |
|------|-------------|------|
| action / category / data elements | The `<action>`, `<category>`, and `<data>` sub-elements of `<intent-filter>` define implicit intents. | [action-category-data-elements.md](./action-category-data-elements.md) |
| activity-alias element | Declares an alternate public name for an existing `<activity>` with its own icon and intent filters. | [activity-alias-element.md](./activity-alias-element.md) |
| activity element | Declares an `Activity` component within `<application>` and its window/behavior attributes. | [activity-element.md](./activity-element.md) |
| Adaptive icons | Launcher icon format composed of separate foreground/background layers for masking and animations. | [adaptive-icons.md](./adaptive-icons.md) |
| application element | Declares the application and its global attributes; the container for all app components. | [application-element.md](./application-element.md) |
| Accessing resources from Compose | Typed Compose functions for reading `res/` resources with dynamic lookup caveats. | [compose-resource-access.md](./compose-resource-access.md) |
| Drawable resources | XML-defined and bitmap drawable types under `res/drawable/`, including shapes and vectors. | [drawable-resources.md](./drawable-resources.md) |
| grant-uri-permission element | Specifies which data subsets a `<provider>` grants temporary access to. | [grant-uri-permission-element.md](./grant-uri-permission-element.md) |
| instrumentation / profileable elements | `<instrumentation>` monitors app interaction; `<profileable>` opts release builds into profiling. | [instrumentation-element.md](./instrumentation-element.md) |
| Localization and RTL support | Separating localizable content via locale-qualified directories, RTL attributes, and language preferences. | [localization-rtl.md](./localization-rtl.md) |
| manifest element | Root element of `AndroidManifest.xml` declaring namespace, package identity, and version. | [manifest-element.md](./manifest-element.md) |
| Manifest merging and placeholders | How multiple manifest files are merged and how to inject build-time values with placeholders. | [manifest-merging.md](./manifest-merging.md) |
| AndroidManifest.xml Structure | Required XML configuration file describing app components, permissions, and device compatibility. | [manifest-structure.md](./manifest-structure.md) |
| meta-data element | Attaches arbitrary name/value pairs to components for libraries and APIs to read. | [meta-data-element.md](./meta-data-element.md) |
| permission / permission-group / permission-tree elements | `<permission>` declares custom permissions; `<permission-group>` organizes them. | [permission-element.md](./permission-element.md) |
| property element | Generic name/value pair attached to components, read via `PackageManager.getProperty()`. | [property-element.md](./property-element.md) |
| provider element | Declares a `ContentProvider` component and its access-control attributes. | [provider-element.md](./provider-element.md) |
| queries element | Declares the set of other apps this app intends to interact with for package visibility. | [queries-element.md](./queries-element.md) |
| receiver element | Declares a `BroadcastReceiver` component and its access-control attributes. | [receiver-element.md](./receiver-element.md) |
| Resource directories and the R class | Directory types under `res/` and how generated resource IDs reference them. | [resource-directories.md](./resource-directories.md) |
| Resource naming and compression | Naming conventions for resource files and interaction with resource shrinking. | [resource-naming-compression.md](./resource-naming-compression.md) |
| Configuration qualifiers | Suffix-based directory naming that lets the system pick alternative resources per device config. | [resource-qualifiers.md](./resource-qualifiers.md) |
| service element | Declares a `Service` component and its access-control attributes. | [service-element.md](./service-element.md) |
| String, string-array, and plurals resources | Text resources with format-argument and escaping rules. | [string-resources.md](./string-resources.md) |
| Style and theme resources (styles.xml / themes.xml) | XML `<style>` resources for View attribute collections and app-wide themes. | [style-theme-resources.md](./style-theme-resources.md) |
| compatible-screens / supports-screens / supports-gl-texture / uses-configuration elements | Legacy manifest elements for declaring supported screen sizes and hardware requirements. | [supports-screens-element.md](./supports-screens-element.md) |
| uri-relative-filter-group element | Adds fine-grained inclusion/exclusion rules to intent-filters matching URI paths and query params. | [uri-relative-filter-group-element.md](./uri-relative-filter-group-element.md) |
| uses-feature element | Declares hardware or software features used by the app for Google Play filtering. | [uses-feature-element.md](./uses-feature-element.md) |
| uses-library / uses-native-library elements | `<uses-library>` declares shared framework libraries; `<uses-native-library>` does same for native libs. | [uses-library-element.md](./uses-library-element.md) |
| uses-permission / permission elements | `<uses-permission>` declares required permissions; `<permission>` declares custom permissions. | [uses-permission-element.md](./uses-permission-element.md) |
| uses-sdk element | Declares minimum, target, and maximum API levels the app supports. | [uses-sdk-element.md](./uses-sdk-element.md) |
| bool, color, dimen, id, integer, and array resources | Simple scalar and array value resources declared under `res/values/`. | [value-resources.md](./value-resources.md) |
