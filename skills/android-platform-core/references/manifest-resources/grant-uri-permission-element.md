# grant-uri-permission element

Specifies which data subsets (by `content:` URI path) a `<provider>` grants temporary access to, when the provider's own `android:grantUriPermissions` is `"false"`.

## Signature / Usage

```xml
<provider
    android:name=".MyContentProvider"
    android:authorities="com.example.provider.cartoonprovider"
    android:grantUriPermissions="false">
    <grant-uri-permission android:pathPrefix="/cartoons/public" />
</provider>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `android:path` | String | Complete literal path; permission is granted only to that exact data subset. |
| `android:pathPrefix` | String | Initial part of a path; permission is granted to all data subsets whose path shares that prefix. |
| `android:pathPattern` | String | Complete path with wildcards (`*` for zero-or-more of the preceding character, `.*` for any sequence); backslashes must be double-escaped in XML (`\\*` for a literal `*`). |

## Notes

- Contained in: `<provider>`. Each element specifies exactly one path rule; a provider can declare any number of `<grant-uri-permission>` children.
- Introduced in API level 1.
- If the parent `<provider>`'s `android:grantUriPermissions` is `"true"`, permission can be granted for any data under the provider and `<grant-uri-permission>` children are unnecessary. If `"false"`, only paths matched by a `<grant-uri-permission>` element are grantable — via `FLAG_GRANT_READ_URI_PERMISSION`/`FLAG_GRANT_WRITE_URI_PERMISSION` on an `Intent`, or `Context.grantUriPermission()`.

## Related

- [provider element](./provider-element.md)
