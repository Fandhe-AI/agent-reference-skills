# SCIM API

SCIM v2 endpoints for provisioning and managing users and groups in a Figma organization.

## Signature / Usage

```http
GET https://www.figma.com/scim/v2/:tenantid/Users
Authorization: Bearer <scim-api-token>
Content-Type: application/json
```

Base URL format: `https://www.figma.com/scim/v2/:tenantid`

The tenant ID is found in Figma Admin Settings under SAML SSO settings. The API token is generated from Admin Settings under Login and Provisioning.

## Options / Props

### Configuration

| Endpoint | Path | Description |
|----------|------|-------------|
| GET Service Provider Config | `:baseURL/ServiceProviderConfig` | Returns Figma's SCIM configuration and supported operations |
| GET Tenant ID | `:baseURL` | Validates that the tenant ID is valid |

### Users

| Endpoint | Method + Path | Description |
|----------|---------------|-------------|
| List Users | `GET :baseURL/Users` | Returns SCIM-provisioned users |
| Create User | `POST :baseURL/Users` | Provisions a new user or binds an existing one |
| Replace User | `PUT :baseURL/Users/:figmaUserId` | Overwrites all user attributes |
| Update User | `PATCH :baseURL/Users/:figmaUserId` | Updates specific user attributes |
| Delete User | `DELETE :baseURL/Users/:figmaUserId` | Permanently deletes a user |

#### GET Users parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `filter` | String (query) | Filter by `email` or `externalId` |
| `count` | Number (query) | Max users to return (max: 3000) |
| `startIndex` | Number (query) | Pagination start index |

#### POST Users required fields

| Field | Description |
|-------|-------------|
| `userName` | User's email address |
| `active` | Boolean provisioning status |
| `schemas` | SCIM schemas array |

**DELETE response:** 204 No Content

### Groups

| Endpoint | Method + Path | Description |
|----------|---------------|-------------|
| List Groups | `GET :baseURL/Groups` | Returns SCIM-managed groups |
| Create Group | `POST :baseURL/Groups` | Creates a group linked to a Figma workspace or billing group |
| Replace Group | `PUT :baseURL/Groups/:figmaGroupId` | Overwrites all group attributes |
| Update Group | `PATCH :baseURL/Groups/:figmaGroupId` | Updates specific group attributes |
| Delete Group | `DELETE :baseURL/Groups/:figmaGroupId` | Permanently deletes a group |

#### GET Groups parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `filter` | String (query) | Filter by `displayName` or `externalId` |
| `count` | Number (query) | Max groups to return |
| `startIndex` | Number (query) | Pagination start index |

#### POST Groups required fields

| Field | Description |
|-------|-------------|
| `displayName` | Group name |
| `schemas` | SCIM schemas array |

**DELETE response:** 204 No Content

## Notes

- SCIM API is separate from the main REST API and uses a different base URL and authentication token
- Groups created via SCIM can be linked to Figma workspaces or billing groups
- DELETE operations permanently remove users and groups from both Figma and the SCIM provisioning log

## Related

- [Authentication](./authentication.md)
