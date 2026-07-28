# Action definition JSON schema for App Actions on Windows

The `actions.json` format that declares one or more App Actions provided by a package: metadata, input/output entities, invocation, and availability conditions.

## Signature / Usage

```json
{
  "version": 3,
  "actions": [
    {
      "id": "Contoso.SampleGreeting",
      "description": "Send greeting with Contoso",
      "icon": "ms-resource://...",
      "displaysUI": false,
      "usesGenerativeAI": false,
      "isAvailable": false,
      "allowedAppInvokers": ["*"],
      "inputs": [
        { "name": "UserFriendlyName", "kind": "Text" },
        { "name": "PetName", "kind": "Text", "required": false }
      ],
      "inputCombinations": [
        { "inputs": ["UserFriendlyName"], "description": "Greet ${UserFriendlyName.Text}" },
        { "inputs": ["UserFriendlyName", "PetName"], "description": "Greet ${UserFriendlyName.Text} and their pet ${PetName.Text}" }
      ],
      "contentAgeRating": "Child",
      "invocation": {
        "type": "Uri",
        "uri": "contoso://greetUser?userName=${UserFriendlyName.Text}&petName=${PetName.Text}",
        "where": ["${UserFriendlyName.Length > 3}"]
      }
    }
  ]
}
```

## Options / Props

### Document root

| Property | Type | Description | Required |
|------|------|-------------|------|
| version | string | Schema version; increments when new functionality is added. | Yes |
| actions | Action[] | The actions provided by the app. | Yes |

### Action

| Property | Type | Description | Required |
|------|------|-------------|------|
| id | string | Unique identifier per app package. Not localizable. | Yes |
| description | string | User-facing, localizable description. | Yes |
| icon | string | Localizable `ms-resource` icon reference. | No |
| allowedAppInvokers | string[] | AppUserModelIDs (AUMIDs) allowed to discover the action via `GetActionsForInputs`/`GetAllActions`. `"*"` matches all. Omitted/empty = no app can discover it. (v3) | No |
| displaysUI | Boolean | Whether the action may display UI. Default `true`. | No |
| usesGenerativeAI | Boolean | Whether the action uses generative AI. Default `false`. | No |
| isAvailable | Boolean | Whether the action is available on install. Default `true`. | Yes |
| inputs | Input[] | Entities the action accepts as input. | Yes |
| inputCombinations | InputCombination[] | Descriptions per supported set of inputs. | Yes |
| outputs | Output[] | Entities the action returns. | No |
| invocation | Invocation | How the action is invoked. | Yes |
| contentAgeRating | string | A member of `UserAgeConsentGroup`: `"Child"`, `"Minor"`, `"Adult"`. Default allows all ages. | No |

### Output (and Input)

| Property | Type | Description | Required |
|------|------|-------------|------|
| name | string | Variable name of the entity. Not localizable. | Yes |
| kind | string | An `ActionEntityKind` value. Not localizable. | Yes |

### InputCombination

| Property | Type | Description | Required |
|------|------|-------------|------|
| inputs | string[] | Input names for this invocation (may be empty). | Yes |
| description | string | Localizable description of the invocation. | No |
| where | string[] | Conditional statements gating when this combination applies. | No |

### Invocation

| Property | Type | Description | Required |
|------|------|-------------|------|
| type | string | `"uri"` or `"com"`. | Yes |
| uri | string | Absolute launch URI; supports entity substitution and the reserved `token=${$.Token}` parameter. | Yes for URI actions |
| clsid | string | COM class ID implementing `IActionProvider`. | Yes for COM actions |
| inputData | object | Name/value pairs of extra data for URI actions. | No, URI only |

## ActionEntityKind enumeration

| Kind | Description | Version | PWA |
|------|-------------|------|------|
| File | Any file type not covered by Photo/Document. | 2 | Input only |
| Photo | `.jpg`, `.jpeg`, `.png`. | 2 | Input only |
| Document | `.doc`, `.docx`, `.pdf`, `.txt`. | 2 | Input only |
| Text | Text strings. | 2 | Input only |
| StreamingText | Incrementally streamed text. | 2 | No |
| RemoteFile | Metadata for cloud-hosted files. | 2 | Input only |
| Table | 2D table serialized to a 1D string array. | 3 | No |
| Contact | Contact data. | 3 | Input only |

## Entity properties

| Entity | Properties |
|------|-------------|
| File / Document | FileName, Path, Extension |
| Photo | File properties + IsTemporaryPath (Boolean) |
| Text | Text, ShortText, Title, Description, Length (double), WordCount (double) |
| StreamingText | TextFormat (`"Plain"` \| `"Markdown"`) |
| RemoteFile | AccountId, ContentType, DriveId, Extension, FileId, FileKind (RemoteFileKind), SourceId, SourceUri |
| Table | RowCount (int, required), ColumnCount (int, required), Title, Description |
| Contact | Email, FullName, Title, Description |

`RemoteFileKind` values: `"File"`, `"Photo"`, `"Document"`.

## Where clauses

```json
"where": [
  "${File.Extension} ~= \".txt\" || ${File.Extension} ~= \".md\""
]
```

Operators: `==`, `~=` (case-insensitive equality), `!=`, `<`, `<=`, `>`, `>=`, `||`, `&&`.

## Notes

- The file must be included as package content with **Build Action** = "Content" and **Copy to Output Directory** = "Copy if newer", and its package-relative path specified in the `uap3:AppExtension` manifest registration.

## Related

- [App Actions on Windows Overview](./app-actions-overview.md)
- [Get started with App Actions on Windows](./actions-get-started.md)
- [Action provider package manifest XML format](./actions-provider-manifest.md)
- [Handle remote files](./actions-remote-files.md)
- [Return streaming text](./actions-streaming-text.md)
