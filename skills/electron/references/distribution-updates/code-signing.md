---
source: https://www.electronjs.org/docs/latest/tutorial/code-signing
---

# Code Signing

Code signing certifies that an app was created by you, so it does not trigger operating system security warnings. Both Windows and macOS prevent users from running unsigned applications; distributing unsigned apps requires users to go through multiple advanced and manual steps.

## Signature / Usage

Signing and notarizing with `@electron/packager` (which includes `@electron/osx-sign` and `@electron/notarize`):

```js
const packager = require('@electron/packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {},
  osxNotarize: {
    appleId: 'felix@felix.fun',
    appleIdPassword: 'my-apple-id-password'
  }
})
```

Windows signing with `@electron/packager` (uses `@electron/windows-sign`):

```js
const packager = require('@electron/packager')

packager({
  dir: '/path/to/my/app',
  windowsSign: {
    signWithParams: '--my=custom --parameters',
    // If signtool.exe does not work for you, customize!
    signToolPath: 'C:\\Path\\To\\my-custom-tool.exe'
  }
})
```

## macOS: signing and notarizing

Two steps: the app is code signed, then uploaded to Apple for **notarization**. Requirements:

1. Enroll in the Apple Developer Program (requires an annual fee)
2. Download and install Xcode (requires a computer running macOS)
3. Generate, download, and install signing certificates

Ways to sign: Electron Forge (uses `@electron/packager`, `@electron/osx-sign`, `@electron/notarize` under the hood; see the Signing macOS Apps guide at electronforge.io), or `@electron/packager` directly. For Mac App Store apps see [mac-app-store-submission-guide.md](./mac-app-store-submission-guide.md).

### macOS APIs that require code signing

An unsigned or ad-hoc signed app may behave inconsistently with:

- `safeStorage` - without a valid, consistent code signature, macOS may be unable to tell that two builds are "the same app", causing the Keychain to prompt for permission again after every update.
- `app.setLoginItemSettings()` - login items can behave incorrectly (e.g. silently failing to register) when the app is not packaged, code signed, and notarized.
- The `cookieEncryption` fuse - uses the same OS-level Keychain access as `safeStorage`.
- `autoUpdater` - `Squirrel.Mac` requires the app to be signed for automatic updates to work at all.

## Windows: signing

### Azure Artifact Signing

Azure Artifact Signing (formerly Azure Trusted Signing) is Microsoft's cloud-based signing service. It is the cheapest option for code signing on Windows, and signing is valid, but SmartScreen reputation builds up through download history, so new files may initially show a warning (same as OV). It is currently limited to developers in certain countries (see the Artifact Signing documentation).

For developers on Linux or macOS, `jsign` can sign Windows apps via Azure Artifact Signing:

```bash
jsign --storetype TRUSTEDSIGNING \
      --keystore https://eus.codesigning.azure.net/ \
      --storepass "${AZURE_ACCESS_TOKEN}" \
      --alias trusted-sign-acct/AppName \
      --tsaurl http://timestamp.acs.microsoft.com/ \
      --tsmode RFC3161 \
      --replace <file>
```

Electron Forge is the recommended way to sign your app as well as your `Squirrel.Windows` and `WiX MSI` installers. Electron Builder has its own Azure Artifact Signing documentation.

### Traditional certificates

Since June 2023, both OV and EV code signing certificates must have their private key stored on a hardware storage module compliant with FIPS 140 Level 2, Common Criteria EAL 4+ or equivalent, so they cannot simply be downloaded onto CI infrastructure. OV signing remains valid; since 2024, even EV certificates need SmartScreen reputation to build up (see windows-packaging-publish for certificate types). Many providers offer "cloud-based signing", which makes signing in CI relatively easy. Electron's own apps use DigiCert KeyLocker; any provider with a command line tool for signing files is compatible with Electron's tooling.

All tools in the Electron ecosystem use `@electron/windows-sign` and typically expose it through a `windowsSign` property. The same `windowsSign` configuration works across Electron Forge, `@electron/packager`, `electron-winstaller`, and `electron-wix-msi`.

`electron-winstaller` (Squirrel.Windows installers):

```js
const electronInstaller = require('electron-winstaller')
// NB: Use this syntax within an async function, Node does not have support for
//     top-level await as of Node 12.
try {
  await electronInstaller.createWindowsInstaller({
    appDirectory: '/tmp/build/my-app-64',
    outputDirectory: '/tmp/build/installer64',
    authors: 'My App Inc.',
    exe: 'myapp.exe',
    windowsSign: {
      signWithParams: '--my=custom --parameters',
      // If signtool.exe does not work for you, customize!
      signToolPath: 'C:\\Path\\To\\my-custom-tool.exe'
    }
  })
  console.log('It worked!')
} catch (e) {
  console.log(`No dice: ${e.message}`)
}
```

`electron-wix-msi` (MSI installers):

```js
import { MSICreator } from 'electron-wix-msi'

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: '/path/to/built/app',
  description: 'My amazing Kitten simulator',
  exe: 'kittens',
  name: 'Kittens',
  manufacturer: 'Kitten Technologies',
  version: '1.1.2',
  outputDirectory: '/path/to/output/folder',
  windowsSign: {
    signWithParams: '--my=custom --parameters',
    // If signtool.exe does not work for you, customize!
    signToolPath: 'C:\\Path\\To\\my-custom-tool.exe'
  }
})

// Step 2: Create a .wxs template file
const supportBinaries = await msiCreator.create()

// Step 2a: optionally sign support binaries if you
// sign your binaries as part of your packaging script
for (const binary of supportBinaries) {
  // Binaries are the new stub executable and optionally
  // the Squirrel auto updater.
  await signFile(binary)
}

// Step 3: Compile the template to a .msi file
await msiCreator.compile()
```

For Windows Store applications see [windows-store-guide.md](./windows-store-guide.md).

## Notes

- Distance line: this page covers Electron-specific signing flows (Forge / `@electron/packager` / `@electron/osx-sign` / `@electron/windows-sign`). For general Apple signing, notarization, and App Store distribution see apple-distribution; for general MSIX / Microsoft Store publishing see windows-packaging-publish.
- The `electron-wix-msi` example above uses a placeholder `signFile` function that the original page does not define.
- Corrected (differs from the official page): the official text says an EV certificate is required since June 2023 and that OV signing is treated as completely unsigned. This page instead states the current requirements: the hardware key-storage requirement applies to both OV and EV certificates, and OV signing remains valid.
- Corrected (differs from the official page): the official text says Azure Artifact Signing gets rid of SmartScreen warnings. This page distinguishes signing from SmartScreen reputation: reputation accumulates through download history, so new files may initially warn (same as OV).

## Related

- [Mac App Store Submission Guide](./mac-app-store-submission-guide.md)
- [Windows Store Guide](./windows-store-guide.md)
- [autoUpdater](./auto-updater.md)
- [Distribution Overview](./distribution-overview.md)
