# Products (ciProducts)

An Xcode Cloud–enabled app or framework, linking a primary Git repository, workflows, and build runs.

## Signature / Usage

```bash
# List products
GET https://api.appstoreconnect.apple.com/v1/ciProducts

# Read a single product
GET https://api.appstoreconnect.apple.com/v1/ciProducts/{id}

# Read the product for an app
GET https://api.appstoreconnect.apple.com/v1/apps/{id}/ciProduct

# Delete a product (removes Xcode Cloud from the app/framework)
DELETE https://api.appstoreconnect.apple.com/v1/ciProducts/{id}
```

## Options / Props

### Query Parameters — `GET /v1/ciProducts`

| Parameter | Description |
|-----------|-------------|
| `filter[app]` | Filter by related app resource ID |
| `filter[productType]` | `APP`, `FRAMEWORK` |
| `include` | Relationships: `app`, `bundleId`, `primaryRepositories` |
| `limit` | Max resources per page (max: 200) |
| `limit[primaryRepositories]` | Max included primary repositories (max: 50) |
| `fields[ciProducts]` | `name`, `createdDate`, `productType`, `app`, `bundleId`, `workflows`, `primaryRepositories`, `additionalRepositories`, `buildRuns` |

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| App | `GET /v1/ciProducts/{id}/app` |
| Primary repositories | `GET /v1/ciProducts/{id}/primaryRepositories` |
| Additional repositories | `GET /v1/ciProducts/{id}/additionalRepositories` |
| Workflows | `GET /v1/ciProducts/{id}/workflows` |
| Build runs | `GET /v1/ciProducts/{id}/buildRuns` |

## Notes

- A product is created automatically when Xcode Cloud is first configured for an app/framework from Xcode; it cannot be created directly via `POST`
- Deleting a product removes Xcode Cloud entirely from the associated app or framework, including its workflows

## Related

- [Workflows](./workflows.md)
- [Build Runs](./build-runs.md)
- [Apps](../asc-api-core/apps.md)
