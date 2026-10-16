# Know Your Installer (Conversion Readiness)

Checklist of installer behaviors to address before converting an existing installer to MSIX.

## Signature / Usage

Add uncommon restart exit codes to the MSIX Packaging Tool settings (restart exit codes section). Example checklist item for a service installer: after conversion the MSIX requires admin elevation to install.

```text
Installer exit code indicating restart -> add to MSIX Packaging Tool "restart exit codes" setting
```

## Options / Props

| Installer trait | Guidance |
|-----------------|----------|
| Has a service | Supported with limitations; convert from MSIX Packaging Tool 1.2019.1220.0; deploy MSIX with services from the spring 2020 Windows 10 release; install needs admin elevation |
| Requires a restart | Supported from MSIX Packaging Tool 1.2019.701.0; add uncommon exit codes to restart exit codes setting |
| .NET Framework earlier than 4.6.2 | Target 4.6.2+ recommended (included in Windows 10 1607). 4.0-4.6.1 expected to run unchanged; 2.0 and 3.5 generally work but may have performance issues and need the .NET Framework 3.5 feature installed; test fully |
| Requires a driver | Not supported by MSIX |
| Shares data via AppData or registry with another app | AppData is redirected to the private local app data store; HKLM writes go to an isolated binary file; HKCU writes go to a private per-user, per-app location |
| Writes to its install directory | Not supported (protected folder); write elsewhere such as local app data; a capability allowing it was added in 1809 and later |
| Uses the current working directory | Runtime CWD differs from the `.LNK` shortcut setting; change CWD at runtime if needed |
| Loads assemblies from WinSxS (e.g. VC8/VC9 CRT) | Not supported; statically link the redistributable libraries |

## Notes

- Repackage on the proper architecture: an installer for x86 machines should be repackaged on an x86 machine, and likewise for x64.
- For install-directory writes or CWD needs, consider a runtime fixup with the Package Support Framework.
- Source page last updated 01/29/2020 (ms.date).

## Related

- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [Convert an Installer That Includes Services](./packaging-tool-services.md)
- [Package Support Framework](./package-support-framework.md)
- [MSIX Packaging Tool Best Practices and Known Issues](./packaging-tool-known-issues.md)
