# Graphical User Interface

The Proxmox VE web interface needs no separate management tool: everything is done in the browser (latest Firefox or Google Chrome preferred), with a built-in HTML5 console or SPICE for guest consoles. Because of pmxcfs, any node can manage the entire cluster; no dedicated manager node is needed.

## Signature / Usage

```
https://youripaddress:8006
```

Default login is `root`; the password is specified during installation.

```bash
# tags via CLI (multiple tags separated by semicolons)
qm set ID --tags 'myfirsttag;mysecondtag'

# tag color override: background #000000, text #FFFFFF
pvesh set /cluster/options --tag-style color-map=example:000000:FFFFFF
```

## Options / Props

### Regions

| Region | Description |
|--------|-------------|
| Header | Top; status information and buttons for the most important actions (Documentation, Create VM, Create CT, User Menu); search bar for VMs, containers, nodes |
| Resource Tree | Left; navigation tree with selectable views |
| Content Panel | Center; configuration options and status of the selected object |
| Log Panel | Bottom; recent tasks (double-click for details or to abort a running task) and the Cluster log |

### Resource tree views

| View | Description |
|------|-------------|
| Server View | Default; all object types grouped by nodes |
| Folder View | All object types grouped by object type |
| Pool View | VMs and containers grouped by pool |
| Tag View | VMs and containers grouped by tags |

Object types: Datacenter (cluster-wide settings), Node, Guest (VMs, containers, templates), Storage, Pool.

### Content panels

| Level | Panels |
|-------|--------|
| Datacenter | Search, Summary, Cluster, Options, Storage, Backup, Replication, Permissions, HA, ACME, Firewall, Metric Server, Notifications, Support |
| Node | Search, Summary, Notes (Markdown), Shell (noVNC / SPICE / xterm.js), System (network, DNS, time, syslog), Updates, Firewall, Disks, Ceph (only with a Ceph server installed), Replication, Task History, Subscription; header buttons Reboot, Shutdown, Shell, Bulk Actions (Bulk Start / Bulk Shutdown / Bulk Migrate), Help |
| Guest | Summary (with Notes), Console (SPICE / noVNC / xterm.js), (KVM) Hardware, (LXC) Resources / Network / DNS, Options, Task History, (KVM) Monitor, Backup, Replication, Snapshots, Firewall, Permissions |
| Storage | Summary, Content (one item per content type, e.g. Backups, ISO Images, CT Templates), Permissions |
| Pool | Summary, Members (guests and storage), Permissions |

### User tag access (Datacenter -> Options -> User Tag Access)

| Value | Description |
|-------|-------------|
| `free` | Users are not restricted in setting tags (default) |
| `list` | Users can set tags from a predefined list |
| `existing` | Like `list`, but users can also use already existing tags |
| `none` | Users are restricted from using tags |

### My Settings (user menu)

| Setting | Description |
|---------|-------------|
| Dashboard Storages | Which storages count towards the totals in the datacenter summary (none checked = sum of all) |
| Stored user name | Button to clear; button to reset every GUI layout to default |
| xterm.js Settings | Font-Family, Font-Size, Letter Spacing, Line Height |

## Notes

- Mobile devices are redirected to a simpler touch-based interface. The GUI is translated to more than 20 languages (selected at login together with the authentication Realm). Features: role based permissions, multiple authentication sources (local, MS ADS, LDAP, ...), Two-Factor Authentication (OATH, Yubikey), based on ExtJS 7.x.
- The user menu holds My Settings, TFA and Password self-service, Language, Color Theme and Logout. The resource tree and log panel can be resized, and the log panel hidden.
- The log panel shows recent tasks from all cluster nodes; finished older tasks are removed but remain in the node's Task History. Short-running actions log to all cluster members and appear in the Cluster log panel.
- Tags are informational only. They show in the Resource Tree and in the guest status line, where they are edited with the pencil icon. By default tag colors are derived deterministically from the text; color, shape, case-sensitivity and sorting are customizable under Datacenter -> Options -> Tag Style Override.
- By default users with `VM.Config.Options` on `/vms/ID` can set any tags. A user with `Sys.Modify` on `/` can always set or delete any tags; the list of registered tags can only be changed by users with `Sys.Modify` on `/` (Datacenter -> Options -> Registered Tags or CLI).
- A consent banner that must be accepted before login is configured in Datacenter -> Options -> Consent Text; it is stored as a base64 string in `/etc/pve/datacenter.cfg` and not displayed if empty.

## Related

- [pmxcfs.md](./pmxcfs.md)
- [user-access.md](./user-access.md)
- [cluster.md](./cluster.md)
- Official docs: https://pve.proxmox.com/pve-docs/chapter-pve-gui.html
