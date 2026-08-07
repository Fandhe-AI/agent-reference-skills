# MSIX SDK

The MSIX SDK is an open source project (`microsoft/msix-packaging` on GitHub) that lets developers create, verify, and unpack MSIX packages on platforms other than Windows, so a single package format/manifest can target Windows and non-Windows clients.

## Signature / Usage

```sh
# Build an MSIX package on a Linux machine
./makelinux [options]
./makeaosp [options]
```

## Options / Props

| Capability | Description |
|------------|--------------|
| Cross-platform packing/unpacking | Shared library (`.so` on Linux) exporting a subset of the functionality in Windows' `appxpackaging.dll` |
| Tamper protection | Verifies and validates package contents (signature validation) before unpacking |
| App extension model | Lets cross-platform client apps use the same plugin/extension package on Windows 10 and non-Windows platforms |
| Manifest-driven targeting | The `AppxManifest.xml` metadata lets a client app decide platform applicability/support from one package |

## Notes

- Distinct from the MSIX Packaging Tool and MSIX Toolkit: the SDK is a cross-platform library/API surface, not a Windows UI/CLI conversion tool.
- Packages built with `makelinux`/`makeaosp` on Linux are unsigned; sign them afterward via the Microsoft Store for business (no self-signing needed), an Azure DevOps MSIX Packaging Extension pipeline task, or by copying the package to Windows and using `signtool`.
- Source and per-platform build instructions are maintained in the [msix-packaging GitHub repo](https://github.com/Microsoft/msix-packaging).

## Related

- [MSIX Toolkit](./msix-toolkit.md)
- [makeappx.exe CLI](./makeappx-cli.md)
- [What is MSIX?](./msix-overview.md)
