---
source: https://www.electronjs.org/docs/latest/tutorial/windows-arm
---

# Windows 10 on Arm

If your app runs with Electron 6.0.8 or later, you can build it for Windows 10 on Arm. This improves performance but requires recompilation of any native modules used in your app, and may require small fixups to build and packaging scripts.

## Signature / Usage

Basic app with no native modules:

1. Make sure your app's `node_modules` directory is empty.
2. In a Command Prompt, run `set npm_config_arch=arm64` before running `npm install` / `yarn install` as usual.
3. If Electron is a development dependency, npm downloads and unpacks the arm64 version. Package and distribute as normal.

```js
if (process.arch === 'x64') {
  // Do 64-bit thing...
} else {
  // Do 32-bit thing...
}
```

Logic like the above typically selects the wrong architecture when targeting arm64. In custom build and packaging scripts, always check the value of `npm_config_arch` in the environment rather than the current process arch.

## Native modules

- Native modules must compile against v142 of the MSVC compiler (the Visual Studio 2019 toolset; VS 2017 provides v141), and any pre-built `.dll` / `.lib` files must be available for Windows on Arm.
- Test on a Windows on Arm device running Windows 10 (version 1903 or later). Copy the application to the target device; Chromium's sandbox will not work correctly when loading assets from a network location.

## Development prerequisites

- Node.js v12.9.0 or later recommended, or update npm's bundled `node-gyp` to 5.0.2 or later.
- Visual Studio 2017 (any edition) for cross-compiling native modules. Add the Arm components from a Command Prompt:

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includeRecommended
```

- Cross-compilation command prompt: duplicate the "x64_x86 Cross Tools Command Prompt for VS 2017" shortcut and change the end of its Target field from `vcvarsamd64_x86.bat` to `vcvarsamd64_arm64.bat`. To develop directly on a Windows on Arm device, use `vcvarsx86_arm64.bat`.
- `node-gyp` does not download the arm64 `node.lib` by default: download it from `https://electronjs.org/headers/v6.0.9/win-arm64/node.lib` and move it to `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib` (substitute `6.0.9` for your version).
- To cross-compile: open the cross-compilation prompt, run `set npm_config_arch=arm64`, then `npm install`. Remove `node_modules` if modules were previously compiled for another architecture.

## Notes

- Debugging native modules: use Visual Studio 2017 on the development machine with the Visual Studio Remote Debugger on the target device; launch the app `.exe` with `--inspect-brk`, attach via Debug > Attach to Process, load `.pdb` symbols via Debug > Options, and use Chrome's remote tools for Node.
- The page's toolchain versions (Visual Studio 2017, Electron 6.0.8 / 6.0.9, Windows 10 1903) are as stated in the original text for v44.8.0; it was not rewritten for newer toolchains.
- Corrected (differs from the official page): the official text says v142 is "provided in Visual Studio 2017", but v142 is the Visual Studio 2019 toolset. If v142 is required, use Visual Studio 2019 or later (with the `VC.Tools.ARM64` component) and read the VS 2017 cross tools prompt names above accordingly.
- Distance line: Electron-specific arm64 builds only. General Windows on Arm / WinUI app development and MSIX publishing are covered by windows-packaging-publish and windows-app-sdk.

## Related

- [Native Node Modules](./using-native-node-modules.md)
- [Native Code and Electron](./native-code-and-electron.md)
- [Code Signing](./code-signing.md)
