# User & Access Management

Proxmox VE uses role-based access control (RBAC) with users, groups, roles, and authentication realms. Configuration is stored in `/etc/pve/user.cfg` and distributed to all cluster nodes.

## Signature / Usage

```bash
# Create a user
pveum user add alice@pve --comment "Alice" --email alice@example.com

# Assign a role on a path
pveum acl modify /vms/100 --user alice@pve --role PVEVMAdmin

# Create a group and assign a role
pveum group add ops-team
pveum acl modify /nodes/pve1 --group ops-team --role PVEAuditor

# Create an API token
pveum user token add alice@pve token1 --privsep 1

# List ACLs
pveum acl list
```

## Options / Props

### User identifier format

```
<username>@<realm>
```

Examples: `root@pam`, `alice@pve`, `bob@ldap`

### Authentication realms

| Realm | Type | Description |
|-------|------|-------------|
| `pam` | Linux PAM | System users (root always uses this) |
| `pve` | Built-in | Proxmox internal password store |
| `ldap` | LDAP | External LDAP/AD directory |
| `ad` | Active Directory | Microsoft AD (Kerberos) |
| `openid` | OpenID Connect | OAuth2/OIDC provider |

### Built-in roles

| Role | Description |
|------|-------------|
| `Administrator` | Full access |
| `PVEAdmin` | Most admin tasks, no system config |
| `PVEAuditor` | Read-only |
| `PVEDatastoreAdmin` | Manage storage |
| `PVEVMAdmin` | Full VM management |
| `PVEVMUser` | Start/stop/access VMs |
| `PVEPoolAdmin` | Manage resource pools |
| `NoAccess` | Explicitly deny access |

### ACL path templates

| Path | Scope |
|------|-------|
| `/` | All resources |
| `/nodes/<node>` | Specific node |
| `/vms/<vmid>` | Specific VM or container |
| `/storage/<storageid>` | Specific storage |
| `/pools/<poolname>` | Resource pool |
| `/access/groups` | Group management |

### pveum acl modify options

| Option | Description |
|--------|-------------|
| `--user` | User to assign role to |
| `--group` | Group to assign role to |
| `--token` | API token to assign role to |
| `--role` | Role name |
| `--propagate` | Inherit to child paths (default: 1) |

### API token options

| Option | Description |
|--------|-------------|
| `--privsep 1` | Separated privileges (token needs explicit ACLs) |
| `--privsep 0` | Full user privileges (inherits all user permissions) |
| `--expire` | Expiry timestamp (0 = no expiry) |

### Two-factor authentication methods

| Method | Description |
|--------|-------------|
| TOTP | Time-based one-time password (RFC 6238) |
| WebAuthn | Hardware security keys, TPM |
| Recovery keys | Single-use backup codes |

## Notes

- `root@pam` cannot be deleted and always retains Administrator access
- Prefer assigning roles to groups rather than individual users for maintainable ACLs
- API token values are shown only once upon creation; store securely
- By default, tokens use `privsep=1` (separated privileges) and require explicit ACL grants
- 2FA lockout: 8 failed attempts for TOTP; 100 for WebAuthn and recovery keys
- Permissions propagate down the path hierarchy; user-level permissions override group permissions at the same path

## Related

- [firewall.md](./firewall.md)
- [notifications.md](./notifications.md)
