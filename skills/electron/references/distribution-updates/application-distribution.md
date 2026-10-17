---
source: https://www.electronjs.org/docs/latest/tutorial/application-distribution
---

# Application Packaging

To distribute your app with Electron, you need to package and rebrand it, either with specialized tooling or manually.

## Signature / Usage

Manual packaging with prebuilt binaries: place the app folder, named `app`, in Electron's resources directory (prebuilt binaries are at `electron/` in these examples).

```plain
electron/Electron.app/Contents/Resources/app/   (macOS)
├── package.json
├── main.js
└── index.html

electron/resources/app                          (Windows and Linux)
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory is then your distribution to deliver to users.

## With tooling

Electron Forge is recommended (see [forge-overview.md](./forge-overview.md), its [documentation](https://www.electronforge.io), or the Packaging and Distribution part of the Electron tutorial).

## With an app source code archive (asar)

Instead of copying all source files, package your app into an asar archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack. Rename the archive to `app.asar` and put it under Electron's resources directory; Electron will read the archive and start from it.

```plain
electron/Electron.app/Contents/Resources/   (macOS)
└── app.asar

electron/resources/                         (Windows)
└── app.asar
```

Details on `asar` are in the `electron/asar` repository.

## Rebranding with downloaded binaries

- **Windows:** rename `electron.exe` to any name, and edit its icon and other information with tools like rcedit.
- **Linux:** rename the `electron` executable to any name.
- **macOS:** rename `Electron.app` to any name, and rename the `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` fields in:
  - `Electron.app/Contents/Info.plist`
  - `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

  You can also rename the helper app to avoid showing `Electron Helper` in the Activity Monitor, but make sure you have renamed the helper app's executable file's name.

```plain
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

## Notes

- It is also possible to rebrand Electron by changing the product name and building from source: set `electron_product_name = "YourProductName"` in the `args.gn` file and rebuild. This is not recommended because setting up the environment to compile from source is not trivial and takes significant time.
- Packaging only (bundling app files and rebranding). Signing and store submission are in [code-signing.md](./code-signing.md) and the store guides.

## Related

- [Distribution Overview](./distribution-overview.md)
- [Distributing Apps With Electron Forge](./forge-overview.md)
- [ASAR Archives](./asar-archives.md)
