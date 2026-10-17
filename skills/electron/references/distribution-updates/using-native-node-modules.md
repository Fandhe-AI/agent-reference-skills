---
source: https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules
---

# Native Node Modules

Native Node.js modules are supported, but Electron has a different application binary interface (ABI) from a given Node.js binary (e.g. Chromium's BoringSSL instead of OpenSSL), so modules must be recompiled for Electron.

## Signature / Usage

Rebuild with `@electron/rebuild` (used automatically by Electron Forge in development and when making distributables):

```sh
npm install --save-dev @electron/rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```

Without it you get an error of this class:

```sh
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

## Using npm

```sh
# Electron's version.
export npm_config_target=1.2.3
# The architecture of your machine
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
export npm_config_disturl=https://electronjs.org/headers
# Tell node-pre-gyp that we are building for Electron.
export npm_config_runtime=electron
# Tell node-pre-gyp to build module from source code.
export npm_config_build_from_source=true
# Install all dependencies, and store cache to ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

## Manually building for Electron

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

- `HOME=~/.electron-gyp` changes where to find development headers.
- `--target=1.2.3` is the version of Electron.
- `--dist-url=...` specifies where to download the headers.
- `--arch=x64` says the module is built for a 64-bit system.

For a custom build of Electron that does not match a public release, point `npm` at the Node headers bundled with your build:

```sh
npm rebuild --nodedir=/path/to/src/out/Default/gen/node_headers
```

## Notes

- Troubleshooting: when in doubt, run `@electron/rebuild` first; make sure the module is compatible with the target platform and architecture; make sure `win_delay_load_hook` is not `false` in the module's `binding.gyp`; after upgrading Electron you usually need to rebuild modules.
- `win_delay_load_hook`: in Electron 4.x and higher, native module symbols are exported by `electron.exe` (there is no `node.dll`), so `'win_delay_load_hook': 'true'` is required on Windows. Errors like `Module did not self-register` or `The specified procedure could not be found` may mean the delay-load hook is missing. For modules not built with node-gyp, the `link.exe` invocation should look like:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

  Link against `node.lib` from Electron (not Node), include `/DELAYLOAD:node.exe`, and link `win_delay_load_hook.obj` directly into the final DLL.
- `prebuild` modules: if they provide Electron binaries, omit `--build-from-source` and the `npm_config_build_from_source` variable to use the prebuilt binaries.
- `node-pre-gyp` modules: when no Electron-specific binaries exist you must build from source; `@electron/rebuild` is recommended. With the `npm` approach, pass `--build-from-source` or set `npm_config_build_from_source`.

## Related

- [Native Code and Electron](./native-code-and-electron.md)
- [ASAR Archives](./asar-archives.md)
- [Windows 10 on Arm](./windows-arm.md)
