# Network Security Configuration

Declarative XML configuration (`res/xml/network_security_config.xml`) for customizing trusted CAs, cleartext traffic policy, and certificate pinning without code changes.

## Signature / Usage

```xml
<!-- AndroidManifest.xml -->
<application android:networkSecurityConfig="@xml/network_security_config" ... >
```

```xml
<!-- res/xml/network_security_config.xml -->
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">secure.example.com</domain>
        <trust-anchors>
            <certificates src="@raw/my_ca"/>
        </trust-anchors>
    </domain-config>
</network-security-config>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `<base-config cleartextTrafficPermitted>` | attribute | platform default | Default config applied to connections not matched by any `domain-config`. |
| `<domain-config cleartextTrafficPermitted>` | attribute | inherits from base-config | Per-domain override; most specific domain match wins. |
| `<domain includeSubdomains>` | attribute | `false` | Whether the config also applies to subdomains. |
| `<trust-anchors><certificates src>` | `"system"` \| `"user"` \| `@raw/...` | — | Source of trusted CA certificates. |
| `<pin-set expiration>` | date `yyyy-MM-dd` | none | Certificate pinning set with SHA-256 `<pin>` digests. |
| `<debug-overrides>` | element | — | Trust anchors applied only when `android:debuggable="true"`. |

## Notes

- Cleartext (plain HTTP) traffic is **disabled by default on Android 9 (API 28) and higher**; it was enabled by default on API 27 and lower.
- Configuration inheritance: `domain-config` inherits unset values from a parent `domain-config` or `base-config`.
- `<debug-overrides>` CAs are ignored in release builds (`android:debuggable="false"`).
- Certificate transparency support is opt-in on Android 16 (API 36) and enabled by default starting Android 17 (API 37); not available on API 35 and lower.

## Related

- [permissions-and-threading](./permissions-and-threading.md)
- [httpurlconnection](./httpurlconnection.md)
