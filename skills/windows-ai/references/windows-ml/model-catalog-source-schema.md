# Model Catalog Source schema

A Model Catalog Source is a JSON file (hosted at an `https://` URL or referenced as a local file) that describes a set of downloadable AI models: their identity, supported execution providers, license, and either individual files or MSIX packages to fetch. `ModelCatalogSource.CreateFromUriAsync` reads this schema.

## Signature / Usage

```json
{
  "models": [
    {
      "id": "squeezenet-v1-cpu",
      "name": "squeezenet",
      "version": "1.0.0",
      "publisher": "Contoso",
      "executionProviders": [
        { "name": "CPUExecutionProvider" }
      ],
      "modelSizeBytes": 13632917,
      "license": "BSD",
      "licenseUri": "https://github.com/microsoft/WindowsAppSDK-Samples/raw/main/LICENSE",
      "uri": "https://contoso.com/models/squeezenet",
      "files": [
        {
          "name": "SqueezeNet.onnx",
          "uri": "https://contoso.com/models/squeezenet/SqueezeNet.onnx",
          "sha256": "d7f93e79ba1284a3ff2b4cea317d79f3e98e64acfce725ad5f4e8197864aef73"
        }
      ]
    }
  ]
}
```

## Options / Props

Root object:

| Property | Type | Required | Description |
|---|---|---|---|
| `models` | array | Yes | Array of model definitions |

Model object (each entry in `models`):

| Property | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Unique-in-the-catalog identifier for this specific variant (e.g. `"phi-3.5-cpu"`) |
| `name` | string | Yes | Common name shared across variants of the same model (e.g. `"phi-3.5"`); this is what `FindModelAsync` searches by |
| `version` | string | Yes | Model version (semantic versioning recommended) |
| `publisher` | string | Yes | Publisher/organization name |
| `executionProviders` | array of `{ name }` | Yes | Execution providers this variant supports (names per Windows ML's supported execution providers) |
| `modelSizeBytes` | integer | No | Size in bytes (minimum 0) |
| `license` | string | Yes | License type (e.g. `"MIT"`, `"BSD"`, `"Apache"`) |
| `licenseUri` | string | Yes | URI to the license document |
| `licenseText` | string | No | Inline license text |
| `uri` | string | Yes | Base URI the model is accessed from; a file's `uri` is resolved relative to this if omitted |
| `files` | array | Conditional | File objects — required unless `packages` is used (mutually exclusive with `packages`) |
| `packages` | array | Conditional | Package objects — required unless `files` is used (mutually exclusive with `files`) |

File object (`files[]`):

| Property | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | File name |
| `uri` | string | No | Download URI; if omitted, derived from the model's base `uri` |
| `sha256` | string | Yes | 64-hex-char SHA256 hash; used for integrity verification and for de-duping identical files across apps |

Package object (`packages[]`, for MSIX/package-based distribution):

| Property | Type | Required | Description |
|---|---|---|---|
| `packageFamilyName` | string | Yes | Windows package family name |
| `uri` | string | Yes | Package URI (HTTPS or local file path) |
| `sha256` | string | Conditional | Required when `uri` is `https://`; verifies package integrity |

## Notes

- A model must specify `files` **or** `packages`, never both.
- `sha256` must match the pattern `^[a-fA-F0-9]{64}$`; it is also the key used to share an already-downloaded file across different apps on the device.
- Catalog files can be validated against the published JSON Schema (`$schema: https://json-schema.org/draft/2020-12/schema`, title `WinML Model Catalog Schema`).
- Serve catalog JSON over HTTPS with `Content-Type: application/json` and appropriate CORS headers if it will be fetched by other developers' apps.

## Related

- [Windows ML Model Catalog](./model-catalog.md)
- [Windows ML execution providers](./supported-execution-providers.md)
