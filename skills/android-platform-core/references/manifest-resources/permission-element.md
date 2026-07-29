# permission / permission-group / permission-tree elements

`<permission>` declares a custom permission an app defines and other apps can request. `<permission-group>` and `<permission-tree>` organize custom permissions for presentation and namespace ownership. For requesting/using an existing permission (`<uses-permission>`), see uses-permission-element.md in this category.

## Signature / Usage

```xml
<manifest ...>
    <permission-group
        android:name="com.example.myapp.permission-group.COSTLY_FEATURES"
        android:label="@string/permission_group_label"
        android:description="@string/permission_group_description" />

    <permission
        android:name="com.example.myapp.permission.DEDUCT_QUOTA"
        android:permissionGroup="com.example.myapp.permission-group.COSTLY_FEATURES"
        android:protectionLevel="dangerous"
        android:label="@string/permission_label"
        android:description="@string/permission_description" />

    <permission-tree
        android:name="com.example.myapp.taxes"
        android:label="@string/permission_tree_label" />
</manifest>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` (permission) | String | required | Code name for the permission, conventionally reverse-domain with a `.permission.` segment and UPPER_SNAKE_CASE (e.g. `com.example.myapp.permission.DEDUCT_QUOTA`). Referenced from `<uses-permission>` or a component's `android:permission`. |
| `android:protectionLevel` (permission) | Enum | `"normal"` | Risk/grant behavior: `"normal"` (auto-granted), `"dangerous"` (requires runtime user confirmation), `"signature"` (auto-granted only to apps signed with the same certificate), `"knownSigner"` (auto-granted to apps signed with an allow-listed certificate), `"signatureOrSystem"` (deprecated API 23+). Flags can be combined, e.g. `"signature\|privileged"`. |
| `android:permissionGroup` (permission) | String | — | Name of a `<permission-group>` this permission belongs to, for UI grouping only; omit if none applies. |
| `android:label` / `android:description` / `android:icon` (permission, permission-group) | String/drawable resource | — | User-facing name, longer explanation, and icon shown when granting the permission. `description` must be a resource reference, not a raw string. |
| `android:name` (permission-group) | String | required | Identifier assigned to `<permission>`'s `android:permissionGroup` attribute. Declares a UI grouping only — not a permission itself. |
| `android:name` (permission-tree) | String | required | Base name owned by the app; must contain more than two period-separated segments (e.g. `com.example.myapp.taxes` is valid, `com.example` is not). All permission names under this prefix belong to the declaring app, which can add more via `PackageManager.addPermission()`. |

## Notes

- All three contained in: `<manifest>`. Introduced API level 1.
- `uses-permission-element.md` already documents the common `<permission>` attributes needed for a single custom-permission declaration; this page is the canonical schema reference covering `<permission-group>` and `<permission-tree>` as well.
- `<permission-tree>` is for apps that dynamically register a whole family of permissions (rare); most apps only need `<permission>` and optionally `<permission-group>`.

## Related

- [uses-permission element](./uses-permission-element.md)
