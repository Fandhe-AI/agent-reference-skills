---
source: https://learn.microsoft.com/en-us/windows/apps/develop/files/fast-file-properties
fetched: 2026-10-16
---

# Fast File Enumeration

Enumerate pictures quickly with `QueryOptions` and `SetPropertyPrefetch`, paging `StorageFile` objects in 100 at a time.

```csharp
StorageFolder folderToEnumerate = KnownFolders.PicturesLibrary; 
// Check if the folder is indexed before doing anything. 
IndexedState folderIndexedState = await folderToEnumerate.GetIndexedStateAsync(); 
if (folderIndexedState == IndexedState.NotIndexed || folderIndexedState == IndexedState.Unknown) 
{ 
    // Only possible in indexed directories.  
    return; 
} 
 
QueryOptions picturesQuery = new QueryOptions() 
{ 
    FolderDepth = FolderDepth.Deep, 
    // Filter out all files that have WIP enabled
    ApplicationSearchFilter = "System.Security.EncryptionOwners:[]", 
    IndexerOption = IndexerOption.OnlyUseIndexerAndOptimizeForIndexedProperties 
};

picturesQuery.FileTypeFilter.Add(".jpg"); 
string[] otherProperties = new string[] 
{ 
    SystemProperties.GPS.LatitudeDecimal, 
    SystemProperties.GPS.LongitudeDecimal 
}; 
 
picturesQuery.SetPropertyPrefetch(PropertyPrefetchOptions.BasicProperties | PropertyPrefetchOptions.ImageProperties, 
                                    otherProperties); 
SortEntry sortOrder = new SortEntry() 
{ 
    AscendingOrder = true, 
    PropertyName = "System.FileName" // FileName property is used as an example. Any property can be used here.  
}; 
picturesQuery.SortOrder.Add(sortOrder); 
 
// Create the query and get the results 
uint index = 0; 
const uint stepSize = 100; 
if (!folderToEnumerate.AreQueryOptionsSupported(picturesQuery)) 
{ 
    log("Querying for a sort order is not supported in this location"); 
    picturesQuery.SortOrder.Clear(); 
} 
StorageFileQueryResult queryResult = folderToEnumerate.CreateFileQueryWithOptions(picturesQuery); 
IReadOnlyList<StorageFile> images = await queryResult.GetFilesAsync(index, stepSize); 
while (images.Count != 0 && index < 10000) 
{ 
    foreach (StorageFile file in images) 
    { 
        // With the OnlyUseIndexerAndOptimizeForIndexedProperties set, this won't  
        // be async. It will run synchronously. 
        var imageProps = await file.Properties.GetImagePropertiesAsync(); 
 
        // Build the UI 
        log(String.Format("{0} at {1}, {2}", 
                    file.Path, 
                    imageProps.Latitude, 
                    imageProps.Longitude)); 
    } 
    index += stepSize; 
    images = await queryResult.GetFilesAsync(index, stepSize); 
} 
```

## Notes

- Difference from the official sample: its loop condition is `images.Count != 0 || index < 10000`, which neither stops on an empty page nor enforces the 10000 limit; this sample uses `&&`.
- The example requires the `picturesLibrary` capability; other locations may need a different capability or none.
- Always prefetch the properties the app will read with `QueryOptions.SetPropertyPrefetch`; accessing a non-prefetched property incurs a significant performance penalty. With `IndexerOption.OnlyUseIndexerAndOptimizeForIndexedProperties`, results are returned about 10 times faster than with the other `IndexerOption` values but include only the prefetched properties.
- Page with `GetFilesAsync(startIndex, maxNumberOfItems)` instead of fetching everything. The source recommends not fetching more than 500 files at a time.
- Don't use this pattern for apps that modify metadata of every file or interact with the resulting `StorageFile` objects beyond reading properties. Only works in indexed locations; `StorageLibrary.RequestAddFolderAsync` asks the user to add a folder to the index.
