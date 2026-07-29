# App Streaming Install

App streaming install lets the Microsoft Store download an app's essential files first so the user can launch and start interacting with the app while the rest of its content finishes downloading in the background. It requires splitting the app's files into a **content group map**, an XML file packaged with the app that sets download priority and order.

## Signature / Usage

```xml
<!-- SourceAppxContentGroupMap.xml (converted by MakeAppx.exe/Visual Studio to the final AppxContentGroupMap.xml packaged with the app) -->
<ContentGroupMap xmlns="http://schemas.microsoft.com/appx/2016/sourcecontentgroupmap">
  <Required>
    <ContentGroup Name="Required">
      <File Name="StreamingTestApp.exe"/>
    </ContentGroup>
  </Required>
  <Automatic>
    <ContentGroup Name="Level2">
      <File Name="Assets\Level2\*"/>
    </ContentGroup>
    <ContentGroup Name="Level3">
      <File Name="Assets\Level3\*"/>
    </ContentGroup>
  </Automatic>
</ContentGroupMap>
```

## Options / Props

| Concept | Description |
|---------|-------------|
| Content group map | XML file packaged with the app; divides package files into named content groups and sets their download order |
| `<Required>` section | Wraps the single, reserved `ContentGroup Name="Required"` — the files needed for basic app activation; always downloaded first |
| `<Automatic>` section | Wraps any number of named content groups that download after `Required`, in the order declared |

## Notes

- Only applicable to apps distributed through the Microsoft Store; the Store performs the staged download based on the content group map.
- The package must still contain all files at build/submission time — streaming install only affects client-side download ordering, not what's included in the package.
- Footprint files (`AppxManifest.xml`, `AppxSignature.p7x`, `resources.pri`, etc.) must not be included in the content group map — they are ignored even if caught by a wildcard `File` entry.
- Author `SourceAppxContentGroupMap.xml` (wildcards allowed) and convert it to the final `AppxContentGroupMap.xml` (no wildcards) via Visual Studio's **Store > Convert Content Group Map File** or `MakeAppx convertCGM`; see "Create and convert a source content group map" on the same docs page.

## Related

- [MSIX Package Structure](./package-structure.md)
- [Resource Packages](./resource-packages.md)
