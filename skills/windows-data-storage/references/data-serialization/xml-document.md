# XmlDocument

Represents the top level of an XML source, implementing `IXmlNode`, `IXmlNodeSelector`, and `IXmlNodeSerializer`. This class includes members for retrieving and creating all other XML DOM objects (elements, attributes, comments, and so on).

## Signature / Usage

```csharp
public sealed class XmlDocument
```

```csharp
// Load from a string
XmlDocument doc = new XmlDocument();
doc.LoadXml("<root><item>value</item></root>");
XmlNodeList items = doc.SelectNodes("/root/item");

// Load from a StorageFile
XmlDocument fileDoc = await XmlDocument.LoadFromFileAsync(storageFile);

// Save back to a StorageFile
await fileDoc.SaveToFileAsync(storageFile);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DocumentElement` | property | Gets the root element of the document. |
| `LoadXml(String)` / `LoadXml(String, XmlLoadSettings)` | method | Loads a document from an XML string synchronously (default or custom parser settings). |
| `LoadXmlFromBuffer(IBuffer)` / `LoadXmlFromBuffer(IBuffer, XmlLoadSettings)` | method | Loads a document from an `IBuffer`. |
| `LoadFromFileAsync(IStorageFile)` / `LoadFromFileAsync(IStorageFile, XmlLoadSettings)` | static async method | Asynchronously loads a document from a `StorageFile`. |
| `LoadFromUriAsync(Uri)` / `LoadFromUriAsync(Uri, XmlLoadSettings)` | static async method | Asynchronously loads a document from a URI. |
| `SaveToFileAsync(IStorageFile)` | async method | Asynchronously saves the document to a `StorageFile`. |
| `CreateElement(String)` / `CreateAttribute(String)` / `CreateTextNode(String)` / `CreateComment(String)` / `CreateCDataSection(String)` | method | Creates new DOM nodes of the respective type. |
| `GetElementsByTagName(String)` | method | Returns a collection of elements with the specified tag name. |
| `GetElementById(String)` | method | Returns the element matching the `ID` attribute. |
| `SelectNodes(String)` / `SelectSingleNode(String)` | method | Applies an XPath pattern and returns matching node(s). |
| `GetXml()` | method | Returns the XML text of the node and all descendants. |

## Notes

- Package: `Windows.Data.Xml.Dom` (WinRT).
- There is no method named `LoadXmlAsync`; the synchronous string-loading API is `LoadXml`/`LoadXml(String, XmlLoadSettings)`. Asynchronous loading is done via `LoadFromFileAsync` (from a `StorageFile`) or `LoadFromUriAsync` (from a `Uri`).
- For code that does not need the WinRT-specific interop (e.g. binding XML to `ToastNotification` / `TileNotification` payloads), the .NET `System.Xml` / `System.Xml.Linq` APIs are an alternative for pure XML processing.

## Related

- [Windows.Data.Json vs System.Text.Json](./json-vs-system-text-json.md)
