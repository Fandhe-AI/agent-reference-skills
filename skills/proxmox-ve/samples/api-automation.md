# API Automation

Automate Proxmox VE operations via the REST API (curl + API token) and the `pvesh` CLI wrapper.

```bash
# --- API Token authentication ---
# Create a token in the GUI: Datacenter > Permissions > API Tokens
# Or via pvesh:
pvesh create /access/users/root@pam/token/monitoring --privsep 0

# Token format: USER@REALM!TOKENID=UUID
TOKEN="root@pam!monitoring=aaaaaaaaa-bbb-cccc-dddd-ef0123456789"
BASE="https://pve.example.com:8006/api2/json"

# --- Read operations with curl ---

# List cluster nodes
curl -sk -H "Authorization: PVEAPIToken=${TOKEN}" "${BASE}/nodes"

# Get version info
curl -sk -H "Authorization: PVEAPIToken=${TOKEN}" "${BASE}/version"

# List VMs on a node
curl -sk -H "Authorization: PVEAPIToken=${TOKEN}" "${BASE}/nodes/pve1/qemu"

# List containers on a node
curl -sk -H "Authorization: PVEAPIToken=${TOKEN}" "${BASE}/nodes/pve1/lxc"

# --- Write operations with curl ---

# Start VM 123
curl -sk -X POST -H "Authorization: PVEAPIToken=${TOKEN}" \
  "${BASE}/nodes/pve1/qemu/123/status/start"

# Stop VM 123
curl -sk -X POST -H "Authorization: PVEAPIToken=${TOKEN}" \
  "${BASE}/nodes/pve1/qemu/123/status/stop"

# Create a container via API
curl -sk -X POST -H "Authorization: PVEAPIToken=${TOKEN}" \
  --data-urlencode "vmid=101" \
  --data-urlencode "ostemplate=local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst" \
  --data-urlencode "hostname=api-ct" \
  --data-urlencode "memory=512" \
  --data-urlencode "net0=name=eth0,bridge=vmbr0,ip=dhcp" \
  --data-urlencode "storage=local-lvm" \
  "${BASE}/nodes/pve1/lxc"

# --- pvesh: direct CLI access to the same API ---

# Get cluster node list
pvesh get /nodes

# Get VM status
pvesh get /nodes/pve1/qemu/123/status/current

# Start a container
pvesh create /nodes/pve1/lxc/101/status/start

# List all users
pvesh get /access/users

# Create a new user
pvesh create /access/users --userid deploy@pve

# Update cluster options (e.g., set default console to html5)
pvesh set /cluster/options --console html5

# Inspect available API endpoints under a path
pvesh ls /nodes/pve1
```

## Notes

- API tokens with `--privsep 0` inherit the owner's full permissions; use `--privsep 1` and assign minimal ACLs for service accounts.
- `curl -sk` disables certificate verification (`-k`) for self-signed certs; replace with `-cacert /etc/pve/pve-root-ca.pem` in production.
- Write operations (POST/PUT/DELETE) via curl do not need a `CSRFPreventionToken` header when using API tokens (only ticket-based auth requires it).
- All API calls return UPID task IDs for async operations; poll `GET /nodes/{node}/tasks/{upid}/status` to track completion.
