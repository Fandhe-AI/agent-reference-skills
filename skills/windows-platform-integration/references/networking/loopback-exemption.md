# Loopback exemption

Communicating with a server listening on `localhost` (loopback) is blocked by default for packaged Windows apps due to network isolation; loopback access must be explicitly enabled.

## Signature / Usage

```txt
# Packaged app connecting out to an unpackaged app/service on localhost:
CheckNetIsolation.exe LoopbackExempt -a -n=<PACKAGEFAMILYNAME>

# Unpackaged app/service connecting in to a packaged app listening on localhost:
CheckNetIsolation.exe LoopbackExempt -is -n=<PACKAGEFAMILYNAME>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CheckNetIsolation.exe LoopbackExempt -a -n=<PFN>` | command | Adds a loopback exemption so a packaged app can connect out to an unpackaged localhost app/service. Sideload/debugging only, requires admin privileges. |
| `CheckNetIsolation.exe LoopbackExempt -is -n=<PFN>` | command | Enables a packaged app to receive inbound loopback connections; must keep `CheckNetIsolation.exe` running while the app listens. Introduced in Windows 10 1607 (SDK 14393). |
| `LoopbackAccessRules` (manifest element) | XML element | Declares trusted packaged-app-to-packaged-app loopback pairs by package family name: the client declares an "out" rule for the server, the server declares "in" rules for its clients. |
| `privateNetworkClientServer` | capability | Required on all packaged apps participating in loopback connections, in addition to the loopback exemption/rules above. |

## Notes

- Two packaged apps can communicate via loopback purely through manifest `LoopbackAccessRules` (no `CheckNetIsolation.exe` needed) as long as each declares the other by package family name.
- Unpackaged apps/services have no package identity and cannot appear in `LoopbackAccessRules`; use `CheckNetIsolation.exe` for packaged-to-unpackaged loopback, valid only for local sideload/debug scenarios with administrator access.
- The package family name for `-n` can be found via the Visual Studio manifest editor, Partner Center, or the `Get-AppxPackage` PowerShell cmdlet.
- `CheckNetIsolation.exe` is also useful for diagnosing general network isolation failures beyond loopback.

## Related

- [Network capability declarations](./network-capabilities.md)
- [StreamSocket](./stream-socket.md)
