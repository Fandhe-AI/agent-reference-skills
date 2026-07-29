# Windows Device Portal (WDP)

Windows Device Portal is a web server built into Windows devices for configuring, managing, and diagnosing a device over network or USB — useful for deploying and testing an app on a separate target device (e.g. a tablet for touch UI testing) from a browser or via its REST API. It is disabled by default and must be turned on after enabling Developer Mode.

## Signature / Usage

```text
1. Settings > System > Advanced > enable Developer Mode
2. Settings > System > Advanced > turn on Device Portal
3. Connect the target device and dev PC over the same network or USB
4. Browse to https://<device-name-or-ip>:<port>  (Desktop/IoT Enterprise default HTTPS port: 50043; HTTP: 50080 — actual ports claimed in the ephemeral range >50,000)
```

```http
# Example REST call: list installed app packages
GET /api/app/packagemanager/packages

# Example REST call: install an app package (multipart body: .appx/.appxbundle + signing cert)
POST /api/app/packagemanager/package?package=<filename>
```

## Options / Props

| Area | Example endpoint | Description |
|------|------------------|-------------|
| App management | `POST /api/app/packagemanager/package`, `DELETE /api/app/packagemanager/package`, `GET /api/app/packagemanager/packages` | Install/uninstall/list app packages; loose-file variant at `POST /api/app/packagemanager/networkapp` |
| Process/perf | `GET /api/resourcemanager/processes`, `GET /api/resourcemanager/systemperf` | Running-process list and live CPU/memory/GPU/network stats (same data as the Performance page) |
| Crash dumps | `GET /api/debug/dump/usermode/dumps`, `POST /api/debug/dump/usermode/crashcontrol` | List/download/enable/disable per-app crash-dump collection |
| ETW tracing | `GET /api/etw/providers`, WebSocket session for realtime events | Enumerate providers and stream ETW events |
| OS info | `GET /api/os/info`, `GET /api/os/devicefamily`, `GET /api/os/machinename` | Query OS build/version and device family |
| Power | `GET /api/power/battery`, `GET /api/power/state`, `POST /api/power/activecfg` | Battery state, sleep-study reports, active power scheme |

## Notes

- **CSRF protection**: non-GET requests over HTTPS require an `X-CSRF-Token` header derived from the `CSRF-Token` session cookie. Standalone clients (`curl`, scripts) bypass this by prefixing the Device Portal username with `auto-` (e.g. `curl -u auto-admin:password ...`) — never use an `auto-` account to log in through the browser UI, as that reopens the CSRF hole. Alternatively, implement the cookie-to-header exchange, or disable authentication and use HTTP (CSRF checks apply to HTTPS only).
- **Custom SSL certificates**: by default WDP self-signs certs for `localhost`, the device hostname, and link-local IPs from an untrusted root CA, which triggers browser warnings. Create a trusted root CA and per-endpoint `.pfx` certs with `New-SelfSignedCertificate`/`Export-PfxCertificate` (elevated PowerShell), then load them with `WebManagement.exe -SetCert <path.pfx> <password>` and restart the service (`sc stop/start webmanagement`). Prefer connecting by hostname over IP — DHCP-assigned IPs can change and invalidate an IP-bound cert.
- Device Portal also advertises itself on the local network via DNS-SD (`WDP._wdp._tcp.local`), exposing secure port, device type/architecture, and user tags in TXT records.
- Registering a loose file layout through Device Portal's Apps Manager ("Register from Network Share") is one of several ways to deploy without a full MSIX build; see Loose File Registration for the PowerShell/`WinAppDeployCmd` alternatives.

## Related

- [MSIX Sideloading and Developer Mode](./msix-sideloading.md)
- [Loose File Registration](./loose-file-registration.md)
