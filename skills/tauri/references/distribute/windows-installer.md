---
source: https://v2.tauri.app/distribute/windows-installer/
---

# Windows Installer (MSI / NSIS)

Tauri applications for Windows are distributed either as Microsoft Installers (`.msi`, using the WiX Toolset v3) or as setup executables (`-setup.exe`, using NSIS). `.msi` installers can **only be created on Windows**; NSIS cross-compilation is described below.

## Signature / Usage

```sh
cargo tauri build
```

Cross-compile an NSIS installer on Linux / macOS (needs an external signing tool for signing):

```sh
sudo apt install nsis lld llvm            # Ubuntu (macOS: brew install nsis llvm)
rustup target add x86_64-pc-windows-msvc
cargo install --locked cargo-xwin
cargo tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc
```

Output is in `target/x86_64-pc-windows-msvc/release/bundle/nsis/`.

### Building

- Building MSI packages (`"targets": "msi"` or `"all"`) requires the VBSCRIPT optional feature enabled on Windows (Settings > Apps > Optional features > More Windows features). Errors like `failed to run light.exe` indicate it is missing.
- Cross-compiling uses [NSIS] only, with Tauri's MSVC target; it is less tested and a last resort versus local VMs or CI such as GitHub Actions.
- Fedora provides the `nsis` binary only (`sudo dnf in mingw64-nsis`); download stubs and plugins from `https://github.com/tauri-apps/binary-releases/releases/download/nsis-3/nsis-3.zip` and copy `nsis-3.08/Stubs/*` to `/usr/share/nsis/Stubs/` and `nsis-3.08/Plugins/**` to `/usr/share/nsis/Plugins/`.
- On Linux also install `clang` if dependencies compile C/C++ in their build scripts. On macOS add `/opt/homebrew/opt/llvm/bin` to `$PATH`.
- `cargo-xwin` downloads the Windows SDKs into a project-local folder; set `XWIN_CACHE_DIR` to share them.

### Building for 32-bit or ARM

```sh
rustup target add i686-pc-windows-msvc
cargo tauri build --target i686-pc-windows-msvc
rustup target add aarch64-pc-windows-msvc
cargo tauri build --target aarch64-pc-windows-msvc
```

For ARM64 install "C++ ARM64 build tools" via Visual Studio Installer (Modify > Individual Components; in VS2022 `MSVC v143 - VS 2022 C++ ARM64 build tools (Latest)`). The NSIS installer itself still runs as x86 under emulation on ARM; the app is a native ARM64 binary.

### Supporting Windows 7

The `.msi` does not work on Windows 7 by default because it needs to download the WebView2 bootstrapper (may fail without TLS 1.2). Embed the bootstrapper instead; the NSIS installer also supports `downloadBootstrapper` on Windows 7. For the Notification API on Windows 7 enable the `windows7-compat` feature:

```toml
[dependencies]
tauri-plugin-notification = { version = "2.0.0", features = [ "windows7-compat" ] }
```

### FIPS Compliance

Set `TAURI_BUNDLER_WIX_FIPS_COMPLIANT` to `true` before `tauri build` for a FIPS compliant MSI:

```powershell
$env:TAURI_BUNDLER_WIX_FIPS_COMPLIANT="true"
```

### WebView2 Installation Options

| Installation Method (`webviewInstallMode.type`) | Requires Internet? | Additional Installer Size | Notes |
| --- | --- | --- | --- |
| `downloadBootstrapper` | Yes | 0MB | Default. Smaller installer; not recommended for Windows 7 via `.msi` |
| `embedBootstrapper` | Yes | ~1.8MB | Better support on Windows 7 for `.msi` |
| `offlineInstaller` | No | ~127MB | Embeds WebView2 installer; recommended for offline environments |
| `fixedVersion` (config type `fixedRuntime`) | No | ~180MB | Embeds a fixed WebView2 version |
| `skip` | No | 0MB | Not recommended; does not install WebView2 |

```json
{
  "bundle": {
    "windows": {
      "webviewInstallMode": {
        "type": "embedBootstrapper"
      }
    }
  }
}
```

Fixed version: download the fixed version runtime `.cab` from Microsoft, extract it into `src-tauri`, point the config at it and run `tauri build`:

```powershell
Expand .\Microsoft.WebView2.FixedVersionRuntime.128.0.2739.42.x64.cab -F:* ./src-tauri
```

```json
{
  "bundle": {
    "windows": {
      "webviewInstallMode": {
        "type": "fixedRuntime",
        "path": "./Microsoft.WebView2.FixedVersionRuntime.128.0.2739.42.x64/"
      }
    }
  }
}
```

Minimum WebView2 version (verified by the installer, which runs the bootstrapper if it does not match):

```json
{
  "bundle": {
    "windows": {
      "minimumWebview2Version": "110.0.1531.0"
    }
  }
}
```

### Customizing the WiX Installer

The default WiX source (`main.wxs`, uses handlebars) works for simple webview apps; a completely different installer can be set with `bundle > windows > wix > template`. Extend it with WiX fragments (`.wxs` in `src-tauri/windows/fragments`):

```json
{
  "bundle": {
    "windows": {
      "wix": {
        "fragmentPaths": ["./windows/fragments/registry.wxs"],
        "componentRefs": ["MyFragmentRegistryEntries"]
      }
    }
  }
}
```

`ComponentGroup`, `Component`, `FeatureGroup`, `Feature` and `Merge` ids must be referenced on the `wix` object via `componentGroupRefs`, `componentRefs`, `featureGroupRefs`, `featureRefs` and `mergeRefs` to be included. Example fragment writing registry entries:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Wix xmlns="http://schemas.microsoft.com/wix/2006/wi">
  <Fragment>
    <DirectoryRef Id="TARGETDIR">
      <Component Id="MyFragmentRegistryEntries" Guid="*">
        <RegistryKey
          Root="HKCU"
          Key="Software\MyCompany\MyApplicationName"
          Action="createAndRemoveOnUninstall"
        >
          <RegistryValue
            Type="integer"
            Name="SomeIntegerValue"
            Value="1"
            KeyPath="yes"
          />
          <RegistryValue Type="string" Value="Default Value" />
        </RegistryKey>
      </Component>
    </DirectoryRef>
  </Fragment>
</Wix>
```

(Tauri uses the second portion of the bundle identifier as the `MyCompany` name, e.g. `tauri-apps` in `com.tauri-apps.test`.)

### WiX Internationalization

Default language is `en-US`. `bundle > windows > wix > language` accepts a string (single installer), an array (one installer per language, language key as suffix) or an object with per-language config:

```json
{
  "bundle": {
    "windows": {
      "wix": {
        "language": ["en-US", "pt-BR", "fr-FR"]
      }
    }
  }
}
```

```json
{
  "bundle": {
    "windows": {
      "wix": {
        "language": {
          "en-US": null,
          "pt-BR": {
            "localePath": "./wix/locales/pt-BR.wxl"
          }
        }
      }
    }
  }
}
```

`localePath` points to a `.wxl` file; the `Culture` field must match the configured language. Tauri references the locale strings `LaunchApp`, `DowngradeErrorMessage`, `PathEnvVarFeature` and `InstallAppFeature`; custom strings are referenced with `"!(loc.TheStringId)"`.

```xml
<WixLocalization
  Culture="en-US"
  xmlns="http://schemas.microsoft.com/wix/2006/localization"
>
  <String Id="LaunchApp"> Launch MyApplicationName </String>
  <String Id="DowngradeErrorMessage">
    A newer version of MyApplicationName is already installed.
  </String>
  <String Id="PathEnvVarFeature">
    Add the install location of the MyApplicationName executable to
    the PATH system environment variable. This allows the
    MyApplicationName executable to be called from any location.
  </String>
  <String Id="InstallAppFeature">
    Installs MyApplicationName.
  </String>
</WixLocalization>
```

### Customizing the NSIS Installer

A custom `.nsi` template can be set on `bundle > windows > nsis > template`. To extend rather than replace, use installer hooks:

| Hook | When it runs |
| --- | --- |
| `NSIS_HOOK_PREINSTALL` | Before copying files, setting registry key values and creating shortcuts |
| `NSIS_HOOK_POSTINSTALL` | After files are copied, registry keys set and shortcuts created |
| `NSIS_HOOK_PREUNINSTALL` | Before removing any files, registry keys and shortcuts |
| `NSIS_HOOK_POSTUNINSTALL` | After files, registry keys and shortcuts have been removed |

`src-tauri/windows/hooks.nsh`:

```nsh
!macro NSIS_HOOK_PREINSTALL
  MessageBox MB_OK "PreInstall"
!macroend

!macro NSIS_HOOK_POSTINSTALL
  MessageBox MB_OK "PostInstall"
!macroend

!macro NSIS_HOOK_PREUNINSTALL
  MessageBox MB_OK "PreUnInstall"
!macroend

!macro NSIS_HOOK_POSTUNINSTALL
  MessageBox MB_OK "PostUninstall"
!macroend
```

```json
{
  "bundle": {
    "windows": {
      "nsis": {
        "installerHooks": "./windows/hooks.nsh"
      }
    }
  }
}
```

Including files next to the hook: at the top level of the hook file `${__FILEDIR__}` is the hook file's directory; inside macro bodies it is the generated script's directory, so capture it first:

```nsh
!include "${__FILEDIR__}\adjacent.nsh"
!define HOOK_FILE_DIR "${__FILEDIR__}"

!macro NSIS_HOOK_PREINSTALL
  File "${HOOK_FILE_DIR}\example.txt"
!macroend
```

Installing dependencies with hooks (example: Visual C++ Redistributable from a bundled MSI):

```nsh
!macro NSIS_HOOK_POSTINSTALL
  ; Check if Visual C++ 2019 Redistributable is installed (via Windows Registry)
  ReadRegDWord $0 HKLM "SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x64" "Installed"

  ${If} $0 == 1
    DetailPrint "Visual C++ Redistributable already installed"
    Goto vcredist_done
  ${EndIf}

  ; Install from bundled MSI if not installed
  ${If} ${FileExists} "$INSTDIR\resources\vc_redist.x64.msi"
    DetailPrint "Installing Visual C++ Redistributable..."
    ; Copy to TEMP folder and then execute installer
    CopyFiles "$INSTDIR\resources\vc_redist.x64.msi" "$TEMP\vc_redist.x64.msi"
    ExecWait 'msiexec /i "$TEMP\vc_redist.x64.msi" /passive /norestart' $0

    ; Check wether installation process exited successfully (code 0) or not
    ${If} $0 == 0
      DetailPrint "Visual C++ Redistributable installed successfully"
    ${Else}
      MessageBox MB_ICONEXCLAMATION "Visual C++ installation failed. Some features may not work."
    ${EndIf}

    ; Clean up setup files from TEMP and your installed app
    Delete "$TEMP\vc_redist.x64.msi"
    Delete "$INSTDIR\resources\vc_redist.x64.msi"
  ${EndIf}

  vcredist_done:
!macroend
```

Bundle dependency installers in `src-tauri/resources` and list them so they are available at `$INSTDIR\resources\`:

```json
{
  "bundle": {
    "resources": [
      "resources/my-dependency.exe",
      "resources/another-one.msi"
    ]
  }
}
```

### Install Modes

By default the installer installs for the current user only (no Administrator privileges, installed under `%LOCALAPPDATA%`). Set `installMode` to `perMachine` for system-wide installs (needs Administrator), or `both` to let the user choose (installer requires Administrator privileges):

```json
{
  "bundle": {
    "windows": {
      "nsis": {
        "installMode": "perMachine"
      }
    }
  }
}
```

### NSIS Internationalization

The NSIS installer is multi-language: a single installer contains all selected translations. Select languages with `bundle > windows > nsis > languages`, provide `customLanguageFiles`; by default the OS language is used. Show a language selector before the installer contents:

```json
{
  "bundle": {
    "windows": {
      "nsis": {
        "displayLanguageSelector": true
      }
    }
  }
}
```

## Notes

- Hook dependency guidance: check whether the dependency is installed (registry keys, file existence or the Windows `where` command); use `/passive`, `/quiet` or `/silent` and `/norestart`; clean up temporary files and bundled installers; consider dependencies shared with other applications when uninstalling; provide meaningful error messages.
- The source heading calls the dependency example "MSI Installer Example" but it is an NSIS hook (`NSIS_HOOK_POSTINSTALL`) that runs a bundled MSI.
- The source's `resources` array snippet is missing a closing quote after `another-one.msi`; corrected here.
- The source config uses the 98.0.1108.50 directory while extracting the 128.0.2739.42 CAB; aligned to 128.0.2739.42 here. Use the folder name of the runtime you extracted.
- On Windows 10 (April 2018 release or later) and Windows 11 the WebView2 runtime is distributed with the operating system. A fixed runtime adds about 180MB; `skip` means the app WILL NOT work if the runtime is not installed.
- Signing cross compiled Windows installers requires an external signing tool (see sign-windows).
- Complete option lists: WixConfig and NsisConfig in the configuration reference.

## Related

- [sign-windows](./sign-windows.md)
- [microsoft-store](./microsoft-store.md)
- [bundle-windows config](../config/bundle-windows.md)
- [prerequisites](../getting-started/prerequisites.md)
