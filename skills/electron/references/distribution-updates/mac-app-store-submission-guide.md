---
source: https://www.electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide
---

# Mac App Store Submission Guide

How to sign Electron apps on macOS, submit them to the Mac App Store (MAS), and the limitations of the MAS build.

## Signature / Usage

Sign an app for development with the "Apple Development" certificate and a provisioning profile:

```js
const { signAsync } = require('@electron/osx-sign')

signAsync({
  app: '/path/to/your.app',
  identity: 'Apple Development',
  provisioningProfile: '/path/to/your.provisionprofile'
})
```

Sign for submission with the "Apple Distribution" certificate (the signed app will not run anywhere unless downloaded from the Mac App Store):

```js
const { signAsync } = require('@electron/osx-sign')

signAsync({
  app: 'path/to/your.app',
  identity: 'Apple Distribution'
})
```

## Requirements

- Xcode 11 or above.
- The `@electron/osx-sign` npm module.
- An Apple Developer account in the Apple Developer Program.

## Certificates

Get certificates through Xcode: Accounts preferences, sign in, select a team, "Manage Certificates", add "Apple Development" and "Apple Distribution".

- "Apple Development": sign apps for development and testing on machines registered on the Apple Developer website. Cannot be submitted to the Mac App Store.
- "Apple Distribution": required for submission to the Mac App Store; signed apps cannot run directly and must be re-signed by Apple after download from the Mac App Store.
- "Developer ID Application": sign apps before distributing them outside the Mac App Store.
- "Developer ID Installer" and "Mac Installer Distribution": sign the Mac Installer Package; most Electron apps do not use one.
- Apps signed with "Apple Development" and "Apple Distribution" run only under App Sandbox, so they must use the MAS build of Electron. "Developer ID Application" has no such restriction (normal or MAS build).
- Legacy names: "Apple Distribution" was also "3rd Party Mac Developer Application" and "Mac App Distribution"; "Apple Development" was also "Mac Developer" and "Development".

## Provisioning profile

To test locally before submitting, sign with "Apple Development" and the provisioning profile embedded in the app bundle (`YourApp.app/Contents/embedded.provisionprofile` if signing without `@electron/osx-sign`):

1. Open "Certificates, Identifiers & Profiles" on the Apple Developer website.
2. Add a new App ID in "Identifiers".
3. Register your local machine in "Devices" (Device ID is in the "Hardware" page of "System Information").
4. Register a new Provisioning Profile in "Profiles" and download it to `/path/to/yourapp.provisionprofile`.

## App Sandbox

Apps submitted to the Mac App Store must run under Apple's App Sandbox, and only the MAS build of Electron can run with it. The standard darwin build fails to launch under App Sandbox. `@electron/osx-sign` adds the necessary entitlements automatically. Without it, the app bundle's entitlements need at least:

```xml title='entitlements.plist'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.application-groups</key>
    <array>
      <string>TEAM_ID.your.bundle.id</string>
    </array>
  </dict>
</plist>
```

Binaries and helpers in the bundle need `com.apple.security.app-sandbox` and `com.apple.security.inherit` (both `<true/>`), and the app bundle's `Info.plist` must include the `ElectronTeamID` key with your Team ID (added automatically by `@electron/osx-sign` from the certificate name).

## Submit

Upload the signed app with Apple Transporter to App Store Connect (create an app record first), then submit for review. If you see errors like private API use, check that the app uses the MAS build of Electron. This guide does not ensure approval; read Apple's Submitting Your App guide.

## Options / Props

Additional entitlements per API (add as needed under the App Sandbox):

| API / capability | Entitlement key |
|------|-------------|
| Outgoing network connections | `com.apple.security.network.client` |
| Incoming network connections (listening socket) | `com.apple.security.network.server` |
| `dialog.showOpenDialog` | `com.apple.security.files.user-selected.read-only` |
| `dialog.showSaveDialog` | `com.apple.security.files.user-selected.read-write` |

Per-file entitlements with `@electron/osx-sign`:

```js
const { signAsync } = require('@electron/osx-sign')

function getEntitlementsForFile(filePath) {
  if (filePath.startsWith('my-path-1')) {
    return './my-path-1.plist'
  } else {
    return './alternate.plist'
  }
}

signAsync({
  optionsForFile: (filePath) => ({
    // Ensure you return the right entitlements path here based on the file being signed.
    entitlements: getEntitlementsForFile(filePath)
  })
})
```

## Notes

- Limitations of the MAS build: the `crashReporter` and `autoUpdater` modules are disabled; video capture may not work for some machines; certain accessibility features may not work; apps will not be aware of DNS changes. Resources the app can access are strictly limited by App Sandbox.
- You must provide an entitlement file for the application bundle itself and a child entitlement file for all other enclosed executables (binaries, `.framework`, `.dylib`).
- Cryptographic algorithms: depending on the countries where you release, you may need to provide encryption export compliance information. Electron uses: AES, HMAC, ECDSA, ECDH, HKDF, PBKDF2, RSA, SHA, Blowfish, CAST, DES, DH, DSA, EC, IDEA, MD2, MD4, MD5, MDC2, RC2, RC4, RC5, RIPEMD (standard references are listed on the official page).
- Distance line: Electron-specific MAS build and `@electron/osx-sign` flow only. General App Store Connect, entitlements, and notarization topics for native apps are covered by apple-distribution.

## Related

- [Code Signing](./code-signing.md)
- [autoUpdater](./auto-updater.md)
