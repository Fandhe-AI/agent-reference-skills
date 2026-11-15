---
source: https://cloudproductregistry.googleapis.com/$discovery/rest?version=v1
---

# Cloud Product Registry API message schemas (cloudproductregistry)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudproductregistry/`.

### `ListLogicalProductVariantsResponse`

- Response message for ListLogicalProductVariants.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `logicalProductVariants` | array<LogicalProductVariant> | Matched LogicalProductVariants |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListLogicalProductsResponse`

- Response message for ListLogicalProducts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `logicalProducts` | array<LogicalProduct> | Matched LogicalProducts |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListProductSuitesResponse`

- Response message for ListProductSuites.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `productSuites` | array<ProductSuite> | Matched ProductSuites |

### `LogicalProduct`

- Represents an independent service offering that can be provisioned by a customer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lifecycleState` | string enum | Output only. Current Lifecycle state of the logical product. |
| `name` | string | Identifier. The resource name of the LogicalProduct. Format: logicalProducts/{logical_product}. |
| `productSuite` | string | Product suite associated with the logical product. Format: productSuites/{product_suite}. |
| `replaced` | boolean | Output only. Indicates whether the logical product has been replaced. If `false`, the product is active. If `true`, the product has been replaced by another type, and the `replacement` field contains the resource name of that replacement. |
| `replacement` | string | Output only. The resource name of the Logical Entity that the logical product is replaced by. This field is only populated when this logical product is replaced by some other type. Eg: logicalProducts/{logical_product}/variants/{variant}, productSuites/{product_suite}, etc. |
| `title` | string | Display name of the LogicalProduct. |
| `variants` | array<string> | Output only. Child variant resource references. Format: logicalProducts/{logical_product}/variants/{variant} |

### `LogicalProductVariant`

- Represents a distinct offering derived from a primary product that retains core functionalities but offers specialized features for a specific market segment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lifecycleState` | string enum | Output only. Current Lifecycle state of the logical product variant. |
| `name` | string | Identifier. The resource name of the LogicalProductVariant. Format: logicalProducts/{logical_product}/variants/{variant} |
| `replaced` | boolean | Output only. Indicates whether the logical product variant has been replaced. If `false`, the variant is active. If `true`, the variant has been replaced by another type, and the `replacement` field contains the resource name of that replacement. |
| `replacement` | string | Output only. The resource name of the Logical Entity that the logical product variant is replaced by. This field is only populated when this logical product variant is replaced by some other type. Eg: logicalProducts/{logical_product}, productSuites/{product_suite}, etc. |
| `title` | string | Display name of the LogicalProductVariant. |

### `LookupEntityResponse`

- Response message for LookupEntity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `logicalProduct` | LogicalProduct | Matched LogicalProduct. |
| `logicalProductVariant` | LogicalProductVariant | Matched LogicalProductVariant. |
| `productSuite` | ProductSuite | Matched ProductSuite. |

### `ProductSuite`

- Represents a unified grouping of products sharing a common brand and market positioning.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `logicalProducts` | array<string> | Output only. LogicalProducts under this suite. Format: logicalProducts/{logical_product} |
| `name` | string | Identifier. The resource name of the ProductSuite. Format: productSuites/{product_suite} |
| `replaced` | boolean | Output only. Indicates whether the product suite has been replaced. If `false`, the product suite is active. If `true`, the product suite has been replaced by another type, and the `replacement` field contains the resource name of that replacement. |
| `replacement` | string | Output only. The resource name of the Logical Entity that the product suite is replaced by. This field is only populated when this product suite is replaced by some other type. Eg: logicalProducts/{logical_product}, logicalProducts/{logical_product}/variants/{variant}, etc. |
| `title` | string | Title of the ProductSuite. |

### Shape of `ListLogicalProductVariantsResponse`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "logicalProductVariants": "array<LogicalProductVariant>",
  "nextPageToken": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `cloudproductregistry` (retrieved 2026-11-14); a type shared by several versions shows the preferred version, and each type's `Version` line names the document it was taken from.
- Source: https://cloudproductregistry.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
