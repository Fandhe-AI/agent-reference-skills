# Access & Storage Endpoints

REST API endpoints for user/permission management (`/access`) and storage pool management (`/storage`, `/pools`).

## Signature / Usage

```
/access/ticket
/access/users
/access/groups
/access/roles
/access/acl
/access/domains
/storage
/pools
```

## Access Endpoints

### Authentication

| Method | Path | Description |
|--------|------|-------------|
| POST | `/access/ticket` | Create authentication ticket (login) |
| GET | `/access/ticket` | Test authentication (returns current user) |

**Login request parameters:**

| Name | Type | Description |
|------|------|-------------|
| `username` | string | User in `user@realm` format |
| `password` | string | User password |
| `realm` | string | Authentication realm (optional, can be part of username) |
| `otp` | string | OTP code if 2FA is enabled |

**Login response fields:**

| Name | Description |
|------|-------------|
| `ticket` | Session ticket — use as `PVEAuthCookie` cookie value |
| `CSRFPreventionToken` | Required header for POST/PUT/DELETE requests |
| `username` | Authenticated username |

```bash
# Obtain ticket
curl -k -s -d "username=root@pam&password=secret" \
  https://<host>:8006/api2/json/access/ticket | jq -r .data.ticket
```

### Users

| Method | Path | Description |
|--------|------|-------------|
| GET | `/access/users` | List users |
| POST | `/access/users` | Create user |
| GET | `/access/users/{userid}` | Get user details |
| PUT | `/access/users/{userid}` | Update user |
| DELETE | `/access/users/{userid}` | Delete user |

### API Tokens

| Method | Path | Description |
|--------|------|-------------|
| GET | `/access/users/{userid}/token` | List API tokens for user |
| POST | `/access/users/{userid}/token/{tokenid}` | Create API token |
| DELETE | `/access/users/{userid}/token/{tokenid}` | Delete API token |

```bash
# Create token via CLI
pveum user token add root@pam mytoken --privsep=0
```

### Groups, Roles & ACL

| Method | Path | Description |
|--------|------|-------------|
| GET | `/access/groups` | List groups |
| POST | `/access/groups` | Create group |
| GET | `/access/roles` | List roles and their privileges |
| POST | `/access/roles` | Create custom role |
| GET | `/access/acl` | List all ACL entries |
| PUT | `/access/acl` | Set/update ACL entry |

### Authentication Domains (Realms)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/access/domains` | List authentication realms |
| POST | `/access/domains` | Add realm (LDAP, AD, OpenID) |

## Storage Endpoints

### Storage Pool Definitions

| Method | Path | Description |
|--------|------|-------------|
| GET | `/storage` | List all storage definitions |
| POST | `/storage` | Create storage definition |
| GET | `/storage/{storage}` | Get storage configuration |
| PUT | `/storage/{storage}` | Update storage configuration |
| DELETE | `/storage/{storage}` | Remove storage definition |

```bash
pvesh get /storage
pvesh get /nodes/pve1/storage
```

### Per-Node Storage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nodes/{node}/storage` | List available storage on node |
| GET | `/nodes/{node}/storage/{storage}/status` | Storage usage stats |
| GET | `/nodes/{node}/storage/{storage}/content` | List files/volumes in storage |
| POST | `/nodes/{node}/storage/{storage}/upload` | Upload ISO/template |
| DELETE | `/nodes/{node}/storage/{storage}/content/{volume}` | Delete a volume |

## Resource Pools

| Method | Path | Description |
|--------|------|-------------|
| GET | `/pools` | List resource pools |
| POST | `/pools` | Create pool |
| GET | `/pools/{poolid}` | Get pool members (VMs, storage) |
| PUT | `/pools/{poolid}` | Update pool membership |
| DELETE | `/pools/{poolid}` | Delete pool |

## Notes

- All users are in `user@realm` format; built-in realms are `pam` (Linux PAM) and `pve` (Proxmox internal).
- API tokens bypass CSRF requirements; a token with `privsep=0` inherits full user privileges.
- ACL paths follow the resource tree: `/` (root), `/nodes/{node}`, `/vms/{vmid}`, `/storage/{storage}`, `/pool/{poolid}`.
- Required privilege: `Sys.Audit` for reading access/storage config; `User.Modify` for user management.

## Related

- [REST API Overview](./rest-overview.md)
- [Cluster & Node Endpoints](./endpoints-cluster.md)
