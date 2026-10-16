# Apply Package Support Framework in Visual Studio

Create a Visual Studio solution that adds the Package Support Framework (PSF) launcher and a runtime-fix DLL to a Windows Application Packaging Project, so a desktop app runs packaged without code changes.

## Signature / Usage

Add to the bottom of the packaging project file (Edit Project File):

```xml
  <Target Name="PSFRemoveSourceProject" AfterTargets="ExpandProjectReferences" BeforeTargets="_ConvertItems">
    <ItemGroup>
      <FilteredNonWapProjProjectOutput Include="@(_FilteredNonWapProjProjectOutput)">
      <SourceProject Condition="'%(_FilteredNonWapProjProjectOutput.SourceProject)'=='_Runtime fix project name_'" />
      </FilteredNonWapProjProjectOutput>
      <_FilteredNonWapProjProjectOutput Remove="@(_FilteredNonWapProjProjectOutput)" />
      <_FilteredNonWapProjProjectOutput Include="@(FilteredNonWapProjProjectOutput)" />
    </ItemGroup>
  </Target>
</Project>
```

`config.json` in the packaging project (Package Action: Content):

```json
{
  "applications": [
    {
      "id": "DesktopApplication",
      "executable": "DesktopApplication/WinFormsDesktopApplication.exe",
      "workingDirectory": "WinFormsDesktopApplication"
    }
  ],
  "processes": [
    {
      "executable": ".*App.*",
      "fixups": [ { "dll": "RuntimeFix.dll" } ]
    }
  ]
}
```

## Options / Props

Steps:

| Step | Action |
|------|--------|
| 1 | Create a Blank Solution and add application projects |
| 2 | Add a Windows Application Packaging Project (Visual C# > Windows Universal) and the `PSFRemoveSourceProject` target |
| 3 | Add a Visual C++ > Windows Desktop > Dynamic-Link Library project for the runtime fix; set C++ Language Standard to ISO C++17 (`/std:c++17`); install NuGet `Microsoft.PackageSupportFramework` |
| 4 | Add a Visual C++ > Empty Project, install the same NuGet package, set Target Name to `PSFLauncher32` or `PSFLauncher64`, and reference the runtime-fix project |
| 5 | In the packaging project, add references to the PSF Launcher (and the desktop app project if source is available), and set the PSF Launcher as Entry Point; add `config.json` |

Reference properties for the runtime-fix reference in the launcher project:

| Property | Value |
|----------|-------|
| Copy local | True |
| Copy Local Satellite Assemblies | True |
| Reference Assembly Output | True |
| Link Library Dependencies | False |
| Link Library Dependency Inputs | False |

`config.json` keys:

| Array | Key | Value |
|-------|-----|-------|
| applications | id | `Id` attribute of the manifest `Application` element |
| applications | executable | Package-relative path to the executable to start (manifest `Executable` before modification) |
| applications | workingDirectory | Optional package-relative working directory; if unset the OS uses `System32` |
| processes | executable | Usually the `executable` above without path and extension |
| fixups | dll | Package-relative path of the fixup DLL |
| fixups | config | Optional; format varies per fixup |

## Notes

- `applications`, `processes`, and `fixups` are arrays; one `config.json` can describe several of each.
- Debug: F5 starts the PSF Launcher, which starts the target app. Attach to the app process via Debug > Attach to Process; select managed and native code types (mixed mode) to debug a .NET app with a native fix DLL. Without app source, breakpoints only work in the runtime-fix project.
- Source: https://learn.microsoft.com/en-us/windows/msix/psf/package-support-framework-vs, last updated 05/14/2020 (ms.date).

## Related

- [Package Support Framework](./package-support-framework.md)
- [Create a PSF Fixup](./create-psf-fixup.md)
- [Visual Studio Packaging Project](./vs-packaging-project.md)
- [PSF Fixes: Working Directory, Write Permission, Launch Parameters](./psf-common-fixes.md)
