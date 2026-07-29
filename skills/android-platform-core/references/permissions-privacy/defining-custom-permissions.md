# Defining Custom Permissions

Declares a brand-new permission with the `<permission>` manifest element so other apps can be required to hold it before accessing this app's exported components or data — distinct from `<uses-permission>`, which requests permissions that already exist (system-defined or defined by another app).

## Signature / Usage

```xml
<permission
    android:name="com.example.myapp.permission.ENGAGE_HYPERSPACE"
    android:label="@string/permlab_engageHyperspace"
    android:description="@string/permdesc_engageHyperspace"
    android:permissionGroup="android.permission-group.COST_MONEY"
    android:protectionLevel="dangerous" />

<!-- Grant only to other apps signed with a known certificate, without shared signing at build time -->
<permission
    android:name="com.example.myapp.permission.SPECIAL_ACCESS"
    android:protectionLevel="signature|knownSigner"
    android:knownCerts="@string/known_cert_digests" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` | String | required | Unique permission identifier; conventionally reverse-domain-prefixed (`com.example.myapp.permission.NAME`) to avoid collisions. |
| `android:protectionLevel` | `normal` \| `dangerous` \| `signature` \| `signature\|knownSigner` | required | Security level; `signature` auto-grants only to apps signed with the same certificate, with no user prompt. |
| `android:label` | string resource | required | Short (3-5 word) user-facing name shown in permission UI. |
| `android:description` | string resource | required | User-facing description; convention is one sentence stating the capability, one sentence warning of possible misuse. |
| `android:permissionGroup` | String | none | Associates with an existing group (`android.permission-group.*`) or a custom `<permission-group>` for combined UI display. |
| `android:knownCerts` (API 31+) | string-array resource | none | Used with `signature\|knownSigner` to list acceptable signing-certificate digests, granting the permission without both apps needing to ship with matching signing at build time. |

## Notes

- Define each custom permission exactly once across an app family; if the requesting apps are not all signed with the same certificate, the first app installed that declares the permission "owns" the definition and others must match its `protectionLevel`.
- For capabilities meant only for an app's own other apps (not third parties), prefer `signature` (or `signature|knownSigner`) over a `dangerous`/user-facing permission — it needs no user confirmation and avoids exposing an unnecessary permission prompt.
- Use `<permission-group>` only when grouping multiple custom permissions for combined display; it has no effect on granting behavior by itself.
- This element defines a new permission for other apps to request; requesting/declaring use of an existing permission (system or third-party) is covered separately in declaring-permissions.

## Related

- [declaring-permissions](./declaring-permissions.md)
- [permission-types-and-protection-levels](./permission-types-and-protection-levels.md)
- [restrict-interactions-with-other-apps](./restrict-interactions-with-other-apps.md)
