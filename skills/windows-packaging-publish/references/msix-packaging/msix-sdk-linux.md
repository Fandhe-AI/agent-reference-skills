# MSIX SDK on Linux and Cross-Platform Distribution

The MSIX SDK provides cross-platform APIs for packing and unpacking `.msix` / `.appx` packages (a shared library `.so` on Linux) and lets one package distribute content to non-Windows 10 platforms by declaring target device families in the manifest.

## Signature / Usage

Build an MSIX package on a Linux machine:

```bash
./makelinux [options]
./makeaosp [options]
```

Manifest `Dependencies` for all platforms plus a Windows 10 range:

```xml
<Dependencies>
  <TargetDeviceFamily Name="Platform.All" MinVersion="0.0.0.0" MaxVersionTested="0.0.0.0"/>
  <TargetDeviceFamily Name="Windows.Universal" MinVersion="10.0.14393.0" MaxVersionTested="10.0.16294.0"/>
</Dependencies>
```

## Options / Props

Target Device Family values:

| Platform | Family | Target Device Family |
|----------|--------|----------------------|
| Windows 10 | all (`Platform.All` / `Windows.Universal`) | Windows.Mobile, Windows.Desktop, Windows.Xbox, Windows.Team (Surface Hub), Windows.Holographic (HoloLens), Windows.IoT |
| iOS | `Apple.Ios.All` | Apple.Ios.Phone, Apple.Ios.Tablet, Apple.Ios.TV, Apple.Ios.Watch |
| MacOS | desktop | Apple.MacOS.All |
| Android | `Google.Android.All` | Google.Android.Phone, Google.Android.Tablet, Google.Android.Desktop (Chromebooks), Google.Android.TV, Google.Android.Watch |
| Windows | 7 / 8 | Windows7.Desktop / Windows8.Desktop |
| Web | `Web.All` | Web.Edge.All, Web.Blink.All, Web.Chromium.All, Web.Webkit.All, Web.Safari.All |
| Linux | any | Linux.All |

## Notes

- Using the package after building on Linux: distribute through Microsoft Store for Business (no self-signing needed), sign on a Windows agent with the Azure DevOps MSIX Packaging Extension, or copy the package to Windows and sign with SignTool.
- Microsoft Store for Business/Education retired on March 31, 2023, so that option is no longer available (see distribute-lob-apps.md); use the MSIX Packaging Extension or SignTool.
- The shared library exports a subset of what `appxpackaging.dll` provides on Windows.
- Choose `Platform.All` for all platforms or `Web.All` for web apps only. Declare specific families to extract content only on those platforms and devices.
- `MinVersion` and `MaxVersionTested` are required, in quad notation (`#.#.#.#`); they apply only on Windows 10 (deploys only on OS versions greater than `MinVersion`). For non-Windows 10-only use, `0.0.0.0` is fine.
- To use one package on Windows 10 and elsewhere, build it as an App Extension on Windows 10; the `Properties` element inside `AppExtension` is not validated, so it carries free-form metadata between extension and host.
- Sources: https://learn.microsoft.com/en-us/windows/msix/msix-sdk/msix-linux, last updated 08/16/2022 (ms.date); https://learn.microsoft.com/en-us/windows/msix/msix-sdk/sdk-guidance, last updated 12/13/2018 (ms.date).

## Related

- [MSIX SDK](./msix-sdk.md)
- [Custom Properties for App Extensions](./custom-props-app-extensions.md)
- [MSIX Features and Supported Platforms](./supported-platforms.md)
