# App Streaming Install

App streaming install lets the Microsoft Store download an app's essential files first so the user can launch and start interacting with the app while the rest of its content finishes downloading in the background. It requires splitting the app's files into a **content group map**, an XML file packaged with the app that sets download priority and order.

## Signature / Usage

```xml
<!-- Simplified content group map (packaged as part of the app) -->
<ContentGroupMap xmlns="http://schemas.microsoft.com/appx/2016/blockmap/contentgroupmap">
  <ContentGroup Name="Required">
    <FileList>
      <File Name="AppxManifest.xml"/>
      <File Name="bin\MyApp.exe"/>
    </FileList>
  </ContentGroup>
  <ContentGroup Name="Level2">
    <FileList>
      <File Name="assets\level2\*"/>
    </FileList>
  </ContentGroup>
</ContentGroupMap>
```

## Options / Props

| Concept | Description |
|---------|-------------|
| Content group map | XML file packaged with the app; divides package files into named content groups and sets their download order |
| `Required` group | Reserved content group name for the files needed for basic app activation; always downloaded first |
| Additional groups | Any other named content groups download after `Required`, in the order declared |

## Notes

- Only applicable to apps distributed through the Microsoft Store; the Store performs the staged download based on the content group map.
- The package must still contain all files at build/submission time — streaming install only affects client-side download ordering, not what's included in the package.
- See the "Create and convert a source content group map" article on the same docs page for the exact schema and a conversion tool from an unstructured file list.

## Related

- [MSIX Package Structure](./package-structure.md)
- [Resource Packages](./resource-packages.md)
