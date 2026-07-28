# Windows App Action provider package manifest XML format

The MSIX package manifest (`AppxManifest.xml`) extension format used to register an App Action provider with Windows.

## Signature / Usage

```xml
<uap3:Extension Category="windows.appExtension">
    <uap3:AppExtension
        Name="com.microsoft.windows.ai.actions"
        DisplayName="..."
        Id="..."
        PublicFolder="Assets">
      <uap3:Properties>
        <Registration>path\to\registration.json</Registration>
      </uap3:Properties>
    </uap3:AppExtension>
</uap3:Extension>
```

## Options / Props

| Element / Attribute | Description |
|------|-------------|
| `uap3:AppExtension` `Name` | Must be `com.microsoft.windows.ai.actions`. |
| `uap3:Properties > Registration` | Package-relative path (relative to `PublicFolder`) to the action definition JSON file. |
| `uap10:Extension` `TrustLevel="mediumIL"` | Required trust level for both COM-based (full trust app) and URI-launched action providers. |
| `Identity` | Declares package identity, required by both COM and URI-launched providers. |

## Notes

- The `uap3:Properties` element structure isn't schema-enforced beyond well-formed XML; only `Registration` is required by App Actions.
- URI-launched providers that return outputs must implement launch-for-results and instantiate the action runtime.

## Related

- [Action definition JSON schema](./actions-json.md)
- [Get started with App Actions on Windows](./actions-get-started.md)
- [Implement URI launch](./actions-uri-launch.md)
