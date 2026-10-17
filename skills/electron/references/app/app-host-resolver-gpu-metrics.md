---
source: https://www.electronjs.org/docs/latest/api/app#appconfigurehostresolveroptions
---

# app Host Resolver, WebAuthn, Hardware Acceleration, GPU, Metrics, Badge

Methods of `app` for DNS / DNS-over-HTTPS host resolution, macOS Touch ID WebAuthn, hardware acceleration, GPU information, process metrics and the dock / launcher badge counter. Process: Main.

## Signature / Usage

```js
const { app } = require('electron')

app.whenReady().then(() => {
  app.configureHostResolver({
    secureDnsMode: 'secure',
    secureDnsServers: ['https://cloudflare-dns.com/dns-query']
  })
})
```

`app.configureWebAuthn` example:

```js
const { app } = require('electron')

app.configureWebAuthn({
  touchID: {
    keychainAccessGroup: 'A1B2C3D4E5.com.example.app.webauthn',
    promptReason: 'sign in to $1'
  }
})
```

With the matching entitlement in your app's `entitlements.plist`:

```xml
<key>keychain-access-groups</key>
<array>
  <string>A1B2C3D4E5.com.example.app.webauthn</string>
</array>
```

Example of a `basic` response of `app.getGPUInfo('basic')`:

```json5
{
  auxAttributes: {
    amdSwitchable: true,
    canSupportThreadedTextureMailbox: false,
    directComposition: false,
    directRendering: true,
    glResetNotificationStrategy: 0,
    inProcessGpu: true,
    initializationTime: 0,
    jpegDecodeAcceleratorSupported: false,
    optimus: false,
    passthroughCmdDecoder: false,
    sandboxed: false,
    softwareRendering: false,
    supportsOverlays: false,
    videoDecodeAcceleratorFlags: 0
  },
  gpuDevice: [
    { active: true, deviceId: 26657, vendorId: 4098 },
    { active: false, deviceId: 3366, vendorId: 32902 }
  ],
  machineModelName: 'MacBookPro',
  machineModelVersion: '11.5'
}
```

## Options / Props

| Name | Arguments | Returns | Description |
| --- | --- | --- | --- |
| `app.configureHostResolver(options)` | `options` Object<br>`options.enableBuiltInResolver` boolean (optional) - Whether the built-in host resolver is used in preference to getaddrinfo. When enabled, the built-in resolver will attempt to use the system's DNS settings to do DNS lookups itself. Enabled by default on macOS, disabled by default on Windows and Linux.<br>`options.enableHappyEyeballs` boolean (optional) - Whether the Happy Eyeballs V3 algorithm should be used in creating network connections. When enabled, hostnames resolving to multiple IP addresses will be attempted in parallel to have a chance at establishing a connection more quickly.<br>`options.secureDnsMode` string (optional) - Can be 'off', 'automatic' or 'secure'. Configures the DNS-over-HTTP mode. When 'off', no DoH lookups will be performed. When 'automatic', DoH lookups will be performed first if DoH is available, and insecure DNS lookups will be performed as a fallback. When 'secure', only DoH lookups will be performed. Defaults to 'automatic'.<br>`options.secureDnsServers` string[] (optional) - A list of DNS-over-HTTP server templates. See RFC8484 section 3 for details on the template format. Most servers support the POST method; the template for such servers is simply a URI. Note that for some DNS providers, the resolver will automatically upgrade to DoH unless DoH is explicitly disabled, even if there are no DoH servers provided in this list.<br>`options.enableAdditionalDnsQueryTypes` boolean (optional) - Controls whether additional DNS query types, e.g. HTTPS (DNS type 65) will be allowed besides the traditional A and AAAA queries when a request is being made via insecure DNS. Has no effect on Secure DNS which always allows additional types. Defaults to true. | void | Configures host resolution (DNS and DNS-over-HTTPS). See Notes for the default resolver order. This API must be called after the `ready` event is emitted. |
| `app.configureWebAuthn(options)` _macOS_ | `options` Object<br>`options.touchID` Object (optional) - Enables the Touch ID / Secure Enclave platform authenticator for Web Authentication requests.<br>`options.touchID.keychainAccessGroup` string - The keychain access group that WebAuthn credentials will be stored under. This value **must** also be present in your app's `keychain-access-groups` code-signing entitlement, and is typically of the form `<TEAM_ID>.<BUNDLE_ID>.webauthn`.<br>`options.touchID.promptReason` string (optional) - Customizes the reason text shown in the macOS Touch ID prompt. macOS renders the prompt as `"<App Name>" is trying to <promptReason>`, so the value should be a lowercase sentence fragment. An optional `$1` placeholder is replaced with the relying party ID (e.g. `example.com`) of the request being authenticated. Defaults to `verify your identity on $1`. | void | Configures platform authenticators for the Web Authentication API (`navigator.credentials.create()` / `navigator.credentials.get()`). Until this is called, `PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()` resolves to `false` and platform-authenticator requests are not serviced. When `touchID` is provided, WebAuthn credentials are stored in the macOS keychain and bound to this device's Secure Enclave. Electron automatically generates and persists a per-session metadata secret so that credentials created in one partition are not visible to another. |
| `app.disableHardwareAcceleration()` | — | void | Disables hardware acceleration for current app. This method can only be called before app is ready. |
| `app.isHardwareAccelerationEnabled()` | — | `boolean` | Whether hardware acceleration is currently enabled. This information is only usable after the `gpu-info-update` event is emitted. |
| `app.disableDomainBlockingFor3DAPIs()` | — | void | By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU process crashes too frequently. This function disables that behavior. This method can only be called before app is ready. |
| `app.getAppMetrics()` | — | `ProcessMetric[]` | Array of `ProcessMetric` objects that correspond to memory and CPU usage statistics of all the processes associated with the app. |
| `app.getGPUFeatureStatus()` | — | `GPUFeatureStatus` | The Graphics Feature Status from `chrome://gpu/`. This information is only usable after the `gpu-info-update` event is emitted. |
| `app.getGPUInfo(infoType)` | `infoType` string - Can be `basic` or `complete`. | `Promise<unknown>` | For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in Chromium's GPUInfo object. This includes the version and driver information that's shown on `chrome://gpu` page. For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete` (see the example in Signature / Usage). Using `basic` should be preferred if only basic information like `vendorId` or `deviceId` is needed. Promise is rejected if the GPU is completely disabled, i.e. no hardware and software implementations are available. |
| `app.setBadgeCount([count])` _Linux_ _macOS_ | `count` Integer (optional) - If a value is provided, set the badge to the provided value otherwise, on macOS, display a plain white dot (e.g. unknown number of notifications). On Linux, if a value is not provided the badge will not display. | `boolean` | Whether the call succeeded. Sets the counter badge for current app. Setting the count to `0` will hide the badge. On macOS, it shows on the Dock icon. On Linux, it shows on docks and taskbars that support the LauncherEntry D-Bus API. |
| `app.getBadgeCount()` _macOS_ | — | `Integer` | The current value displayed in the counter badge. |

## Notes

* `app.configureHostResolver`: by default, the following resolvers will be used, in order:
  1. DNS-over-HTTPS, if the DNS provider supports it, then
  2. the built-in resolver (enabled on macOS only by default), then
  3. the system's resolver (e.g. `getaddrinfo`).
* `app.configureHostResolver` can be configured to either restrict usage of non-encrypted DNS (`secureDnsMode: "secure"`), or disable DNS-over-HTTPS (`secureDnsMode: "off"`). It is also possible to enable or disable the built-in resolver.
* To disable insecure DNS, you can specify a `secureDnsMode` of `"secure"`. If you do so, you should make sure to provide a list of DNS-over-HTTPS servers to use, in case the user's DNS configuration does not include a provider that supports DoH.
* `app.getAppMetrics()`: `cpu.percentCPUUsage` and `cpu.idleWakeupsPerSecond` are averages over the time since the last call to `app.getAppMetrics()`, and each call starts a new measurement interval for every process at once. Other code in the main process, including dependencies, shares those intervals. See the CPUUsage structure for details.
* `app.setBadgeCount` on Linux: the badge is associated with the app's `.desktop` file, so `app.setDesktopName` (or the `desktopName` field in `package.json`) must match the name of the app's actual `.desktop` file.
* `app.setBadgeCount` on macOS: your application needs permission to display notifications for this method to work.
* `app.configureWebAuthn`: Touch ID WebAuthn credentials are device-bound and are not synced via iCloud Keychain. They are only available on Macs with a Secure Enclave (Apple silicon, or Intel Macs with a T2 chip).
* GPU here means Chromium's GPU process information and hardware-acceleration switches, not GPU compute. For GPU compute stacks see nvidia-cuda, amd-rocm and apple-silicon.

## Related

* [app Events: windows, certificates, login, child processes](./app-events-windows-security.md)
* [app Login Items, Accessibility, About Panel, Sandbox, Proxy](./app-login-accessibility-misc.md)
