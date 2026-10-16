# Certificate Management & ACME

Proxmox VE manages node certificates for `pveproxy` (REST API and web GUI): the default cluster-CA-signed certificate, a custom uploaded certificate, or a trusted certificate via ACME (Let's Encrypt) with automatic renewal. Managed with `pvenode` or Datacenter -> ACME / Node -> Certificates in the web UI.

## Signature / Usage

```bash
pvenode acme account register default mail@example.invalid
pvenode config set --acme domains=example.invalid
pvenode acme cert order
```

## Options / Props

### Certificate files

| Path | Description |
|------|-------------|
| `/etc/pve/nodes/NODENAME/pve-ssl.pem` | Default node certificate, signed by the cluster CA (not trusted by browsers) |
| `/etc/pve/local/pveproxy-ssl.pem` / `pveproxy-ssl.key` | Used for custom / ACME certificates; key must not be password protected. `/etc/pve/local` is a node-specific symlink to `/etc/pve/nodes/NODENAME` |
| `/etc/pve/pve-root-ca.pem`, `/etc/pve/priv/pve-root-ca.key` | Cluster CA (stored in pmxcfs) |
| `/etc/pve/priv/acme/plugins.cfg` | ACME plugin configuration, available to all cluster nodes |

### ACME challenge plugins

| Plugin | Description |
|--------|-------------|
| `standalone` (http-01) | Implicit plugin; built-in web server on port 80; port 80 must be reachable from the internet, no other listener on port 80, and the domain must resolve to a public IP of the node |
| DNS API (dns-01) | Reuses acme.sh DNS plugins; needs a DNS server that allows provisioning `TXT` records via API. Configure under Datacenter -> ACME (validation delay = seconds between setting the record and asking the provider to validate) or `pvenode acme plugin add` |

### DNS alias mode

Create a permanent `CNAME` record for `_acme-challenge.domain1.example` pointing to `_acme-challenge.domain2.example` and set the `alias` property on the `acmedomainX` key in the node configuration to `domain2.example`.

### Example: OVH DNS API plugin

```bash
pvenode acme plugin add dns example_plugin --api ovh --data /path/to/api_token
pvenode acme plugin config example_plugin
pvenode config set -acmedomain0 example.proxmox.com,plugin=example_plugin
pvenode acme cert order
```

### Example: switch account from staging to production

```bash
pvenode acme account deactivate default
pvenode acme account register default example@proxmox.com
```

## Notes

- Each cluster creates its own self-signed CA and signs a certificate per node; used for `pveproxy` and the SPICE Shell/Console. To avoid browser warnings, copy `/etc/pve/pve-root-ca.pem` out of band (e.g. `scp`) and import it into the OS / browser trust store; there is no API or web interface endpoint to download it.
- Do not replace or manually modify `/etc/pve/local/pve-ssl.pem`, `/etc/pve/local/pve-ssl.key`, `/etc/pve/pve-root-ca.pem` or `/etc/pve/priv/pve-root-ca.key`.
- Custom certificate upload is done in the web interface; a provided key file must not be password protected.
- Implemented ACME endpoints: Let's Encrypt production and staging (plus a Custom directory entry in `pvenode`). ACME accounts are registered per cluster (with the endpoint to use) and shared by all nodes; more than one account is supported (`pvenode acme account register <account-name> <mail>`), and the desired account is selected per node before ordering. The account email is the contact for renewal-due notifications. Use LE `staging` for experiments because of rate limits.
- Changing the ACME directory of an existing account is unsupported; create a new account or deactivate and recreate it.
- Node domains are node specific (Node -> Certificates or `pvenode config`); on a successful order the web interface reloads after 10 seconds.
- Automatic renewal runs through `pve-daily-update.service`; renewal is attempted if the certificate has expired or expires within 30 days. For short-lived certificate directories consider disabling the random delay of `pve-daily-update.timer`.
- `http-01` and `dns-01` can be combined, and different DNS API plugin instances can be used per domain; accessing one service via multiple domains increases complexity.
- OVH example: `OVH_AK` and `OVH_AS` come from OVH; the consumer key `OVH_CK` is obtained via the OVH credential API and appended to the token file.

## Related

- [node-management.md](./node-management.md)
- [pmxcfs.md](./pmxcfs.md)
- [cluster.md](./cluster.md)
- Official docs: https://pve.proxmox.com/pve-docs/chapter-sysadmin.html#sysadmin_certificate_management
