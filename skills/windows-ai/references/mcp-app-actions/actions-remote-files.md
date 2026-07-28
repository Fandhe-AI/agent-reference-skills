# Handle remote files with App Actions on Windows

How to implement support for cloud-hosted files in an App Action provider using the `RemoteFile` entity type.

## Signature / Usage

```csharp
[WindowsAction(Description = "Summarize a remote file", UsesGenerativeAI = false)]
[WindowsActionInputCombination(
    Description = "Summarize ${RemoteFileToSummarize}",
    Inputs = ["RemoteFileToSummarize"],
    Where = ["${RemoteFileToSummarize.SourceId} == 'Contoso.Cloud' || ${RemoteFileToSummarize.SourceId} == 'Fabrikam.Cloud'"])]
public async Task<SummarizeRemoteFileResult> SummarizeRemoteFile(
    [Entity(Name = "RemoteFileToSummarize")] RemoteFileActionEntity remoteFile,
    InvocationContext context)
{
    var contents = remoteFile.SourceId switch
    {
        "Contoso.Cloud" => GetContosoCloudFile(remoteFile.AccountId, remoteFile.DriveId, remoteFile.FileId),
        "Fabrikam.Cloud" => GetFabrikamCloudFile(remoteFile.AccountId, remoteFile.SourceUri),
        _ => ""
    };
    return new SummarizeRemoteFileResult { Text = context.EntityFactory.CreateTextEntity(SummarizeFile(contents)) };
}
```

## Notes

- `RemoteFileActionEntity` (C#) corresponds to the `"RemoteFile"` entity kind in the action definition JSON; its properties (`AccountId`, `DriveId`, `FileId`, `SourceId`, `SourceUri`, `ContentType`, `Extension`, `FileKind`) are common across many cloud storage providers.
- Use a `where` clause on the input combination to restrict the action to specific `SourceId` values (supported cloud providers) so the action isn't presented for unsupported services.
- Only the file's metadata/identifiers are provided; retrieving and processing the actual remote file content is provider-specific and left to the action's own implementation.

## Related

- [Action definition JSON schema](./actions-json.md)
- [Get started with App Actions on Windows](./actions-get-started.md)
- [Manually implement IActionProvider](./actions-iactionprovider-manual.md)
