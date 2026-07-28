# StorageStreamTransaction

Represents a write transaction for a random-access stream, obtained via `StorageFile.OpenTransactedWriteAsync()`. Ensures the underlying file is only updated when the transaction is explicitly committed.

## Signature / Usage

```csharp
public sealed class StorageStreamTransaction : IDisposable

using (StorageStreamTransaction transaction = await file.OpenTransactedWriteAsync())
{
    using (DataWriter dataWriter = new DataWriter(transaction.Stream))
    {
        dataWriter.WriteString("Swift as a shadow");
        transaction.Stream.Size = await dataWriter.StoreAsync(); // truncate to new content size
        await transaction.CommitAsync();
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Stream` | `IRandomAccessStream` | The random-access stream used for the transaction; write to this, then commit. |
| `CommitAsync()` | method | Saves the stream's contents to the underlying file, completing the transaction. |
| `Close()` / `Dispose()` | method | Releases the transaction's resources; if `CommitAsync` was never called, the file is not modified. |

## Notes

- Namespace `Windows.Storage`. Implements `IClosable`/`IDisposable` — always wrap in a `using` block.
- Uncommitted transactions leave the original file untouched, making this the safe pattern for "replace file contents" operations that must not corrupt the file on failure (crash, exception) mid-write.
- Set `transaction.Stream.Size` explicitly after writing less data than the stream previously contained, otherwise trailing old bytes remain.

## Related

- [StorageFile](./storage-file.md)
- [IRandomAccessStream](./irandom-access-stream.md)
- [DataReader / DataWriter](./data-reader-writer.md)
