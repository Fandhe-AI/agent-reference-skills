---
source: https://cloudproductregistry.googleapis.com/$discovery/rest?version=v1
---

# Cloud Product Registry API REST API (cloudproductregistry)

## Signature / Usage

Base URL: `https://cloudproductregistry.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `cloudproductregistry.logicalProducts.get`

- Versions: v1
- `GET https://cloudproductregistry.googleapis.com/v1/{+name}`
- Gets details of a LogicalProduct.
- Request: —; Response: `LogicalProduct`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the LogicalProduct to retrieve. Format: logicalProducts/{logical_product} |

### `cloudproductregistry.logicalProducts.list`

- Versions: v1
- `GET https://cloudproductregistry.googleapis.com/v1/logicalProducts`
- Lists LogicalProducts matching given criteria.
- Request: —; Response: `ListLogicalProductsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `filter` | query | string | no | Optional. The filter expression for listing logical products. Filter syntax: https://google.aip.dev/160 Supported fields: suite_id |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of logical products to return. The service may return fewer than this value. If unspecified, at most 100 logical products will be returned. The maximum value is 500; values above 500 will be coerced to 500. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListLogicalProducts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListLogicalProducts` must match the call that provided the page token. |

### `cloudproductregistry.logicalProducts.lookupEntity`

- Versions: v1
- `GET https://cloudproductregistry.googleapis.com/v1/{+lookupUri}:lookupEntity`
- Look up entities.
- Request: —; Response: `LookupEntityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `lookupUri` | path | string | yes | Required. Entity uri to look up. Supported Formats: logicalProducts/{logical_product} logicalProducts/{logical_product}/variants/{variant} productSuites/{product_suite} |

### `cloudproductregistry.logicalProducts.variants.get`

- Versions: v1
- `GET https://cloudproductregistry.googleapis.com/v1/{+name}`
- Get details of a LogicalProductVariant.
- Request: —; Response: `LogicalProductVariant`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the LogicalProductVariant to retrieve. Format: logicalProducts/{logical_product}/variants/{variant} |

### `cloudproductregistry.logicalProducts.variants.list`

- Versions: v1
- `GET https://cloudproductregistry.googleapis.com/v1/{+parent}/variants`
- Lists LogicalProductVariants matching given criteria.
- Request: —; Response: `ListLogicalProductVariantsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent logical product id. Format: logicalProducts/{logical_product} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of logical product variants to return. The service may return fewer than this value. If unspecified, at most 100 logical product variants will be returned. The maximum value is 500; values above 500 will be coerced to 500. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListLogicalProductVariants` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListLogicalProductVariants` must match the call that provided the page token. |

### `cloudproductregistry.logicalProducts.variants.lookupEntity`

- Versions: v1
- `GET https://cloudproductregistry.googleapis.com/v1/{+lookupUri}:lookupEntity`
- Look up entities.
- Request: —; Response: `LookupEntityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `lookupUri` | path | string | yes | Required. Entity uri to look up. Supported Formats: logicalProducts/{logical_product} logicalProducts/{logical_product}/variants/{variant} productSuites/{product_suite} |

### `cloudproductregistry.productSuites.get`

- Versions: v1
- `GET https://cloudproductregistry.googleapis.com/v1/{+name}`
- Get details of a ProductSuite.
- Request: —; Response: `ProductSuite`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ProductSuite to retrieve. Format: productSuites/{product_suite} |

### `cloudproductregistry.productSuites.list`

- Versions: v1
- `GET https://cloudproductregistry.googleapis.com/v1/productSuites`
- Lists ProductSuites.
- Request: —; Response: `ListProductSuitesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of suites to return. The service may return fewer than this value. If unspecified, at most 100 suites will be returned. The maximum value is 500; values above 500 will be coerced to 500. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListProductSuites` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListProductSuites` must match the call that provided the page token. |

### `cloudproductregistry.productSuites.lookupEntity`

- Versions: v1
- `GET https://cloudproductregistry.googleapis.com/v1/{+lookupUri}:lookupEntity`
- Look up entities.
- Request: —; Response: `LookupEntityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `lookupUri` | path | string | yes | Required. Entity uri to look up. Supported Formats: logicalProducts/{logical_product} logicalProducts/{logical_product}/variants/{variant} productSuites/{product_suite} |

## Notes

- Generated from the Discovery document(s) v1 of `cloudproductregistry` (retrieved 2026-11-14). Resources on this page: logicalProducts, productSuites.
- Message schemas are listed under `references/rest-schemas/cloudproductregistry/`.
- Source: https://cloudproductregistry.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
