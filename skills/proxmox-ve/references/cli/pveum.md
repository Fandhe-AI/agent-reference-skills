# pveum

Proxmox VE User Manager. Manages users, groups, authentication realms, roles, resource pools, API tokens, and access control lists.

## Signature / Usage

```bash
pveum <COMMAND> [OPTIONS]
pveum help [<COMMAND>]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `user add <userid>` | Add a new user |
| `user modify <userid>` | Modify user settings |
| `user delete <userid>` | Delete a user |
| `user list` | List all users |
| `user token add <userid> <tokenid>` | Create an API token |
| `user token modify <userid> <tokenid>` | Modify an API token |
| `user token remove <userid> <tokenid>` | Remove an API token |
| `user token list <userid>` | List API tokens for a user |
| `passwd <userid>` | Change user password |
| `group add <groupid>` | Create a group |
| `group modify <groupid>` | Modify group settings |
| `group delete <groupid>` | Delete a group |
| `group list` | List all groups |
| `role add <roleid>` | Create a role with privileges |
| `role modify <roleid>` | Modify role privileges |
| `role delete <roleid>` | Delete a role |
| `role list` | List all roles |
| `realm add <realm>` | Add an authentication realm |
| `realm modify <realm>` | Modify realm settings |
| `realm delete <realm>` | Delete a realm |
| `realm list` | List all realms |
| `realm sync <realm>` | Sync users/groups from external realm |
| `pool add <poolid>` | Create a resource pool |
| `pool modify <poolid>` | Modify pool configuration |
| `pool delete <poolid>` | Delete a resource pool |
| `pool list` | List all resource pools |
| `acl modify` | Add or modify an ACL entry |
| `acl delete` | Remove an ACL entry |
| `acl list` | List all ACL entries |
| `ticket <userid>` | Generate an authentication ticket |

## Options / Props

Key options for `pveum user add` / `pveum user modify`:

| Name | Type | Description |
|------|------|-------------|
| `<userid>` | string | User ID in `name@realm` format |
| `--password` | string | User password |
| `--enable` | boolean | Enable account (default: 1) |
| `--expire` | integer | Expiry timestamp (Unix epoch, 0 = never) |
| `--groups` | list | Group membership |
| `--comment` | string | Descriptive comment |
| `--email` | string | Email address |

Key options for `pveum realm add`:

| Name | Type | Description |
|------|------|-------------|
| `--type` | enum | Realm type: `ad`, `ldap`, `openid`, `pam`, `pve` |
| `--server1` | string | Primary server address |
| `--server2` | string | Fallback server address |
| `--base_dn` | string | LDAP base distinguished name |

Key options for `pveum acl modify`:

| Name | Type | Description |
|------|------|-------------|
| `--path` | string | ACL path (e.g. `/`, `/vms/100`, `/storage/local`) |
| `--roles` | list | Roles to assign |
| `--users` | list | User IDs to apply ACL to |
| `--groups` | list | Group IDs to apply ACL to |
| `--tokens` | list | API token IDs to apply ACL to |
| `--propagate` | boolean | Propagate permissions to child paths (default: 1) |

Key options for `pveum user token add`:

| Name | Type | Description |
|------|------|-------------|
| `--privsep` | boolean | Separate token privileges from user (default: 1) |
| `--expire` | integer | Token expiry timestamp |

## Notes

- User IDs must be in `name@realm` format (e.g. `admin@pam`, `john@pve`).
- `pam` realm uses Linux PAM authentication; `pve` realm stores credentials in the Proxmox database.
- API tokens with `--privsep 1` (default) are limited to the permissions explicitly granted via ACL, independent of the owning user's rights.
- `pveum realm sync` is available for LDAP, AD, and OpenID realms.
- Roles are sets of privileges; built-in roles include `Administrator`, `PVEVMAdmin`, `PVEDatastoreAdmin`, etc.

## Related

- [pvecm.md](./pvecm.md)
- [pvesh.md](./pvesh.md)
