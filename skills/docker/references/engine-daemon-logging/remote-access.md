---
source: https://docs.docker.com/engine/daemon/remote-access/
---

# Configure remote access for Docker daemon

Make the daemon listen on an IP address and port in addition to the Unix socket so remote clients can connect.

## Signature / Usage

With a systemd unit override (edit `docker.service` with `systemctl edit`, requires root):

```systemd
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://127.0.0.1:2376 --tlsverify --tlscacert=/etc/docker/tls/ca.pem --tlscert=/etc/docker/tls/server-cert.pem --tlskey=/etc/docker/tls/server-key.pem
```

After editing the unit (requires root, via `systemctl edit docker.service`), reload systemd, restart the Docker service and confirm dockerd listens on 2376; see the official page for the exact commands.

Or with `/etc/docker/daemon.json` (if the distribution doesn't use systemd):

```json
{
  "hosts": ["unix:///var/run/docker.sock", "tcp://127.0.0.1:2376"],
  "tlsverify": true,
  "tlscacert": "/etc/docker/tls/ca.pem",
  "tlscert": "/etc/docker/tls/server-cert.pem",
  "tlskey": "/etc/docker/tls/server-key.pem"
}
```

## Notes

- Warning: remote access without protection can let remote non-root users gain root access on the host. Remote access without TLS is not recommended and will require explicit opt-in in a future release. Use TLS (see "Protect the Docker daemon socket").
- Adapted: the official example listens on TCP without TLS client authentication; mutual TLS (`--tlsverify`) is shown instead (see Protect the Docker daemon socket).
- Adapted: `127.0.0.1` is the official example address and is reachable only from the local host. To accept remote clients, replace it with a reachable host IP (e.g. `tcp://192.0.2.10:2376`, a documentation address), make sure the server certificate's SAN includes that address or hostname, and restrict allowed sources in the firewall. Do not use `0.0.0.0`.
- Configuring listening through both the systemd unit file and `daemon.json` causes a conflict that prevents Docker from starting.
- Setting `hosts` in `daemon.json` isn't supported on Docker Desktop for Windows or Mac.
- Adapted: certificates generated per Protect the Docker daemon socket are copied to `/etc/docker/tls/` (key readable only by root); absolute paths are required because the daemon started by systemd does not resolve paths relative to the shell where the certificates were created.
- Firewall: allow incoming connections on port `2376` (TLS) or `2375` (otherwise), restricted to trusted source addresses: allow inbound TCP 2376 only from trusted source addresses (e.g. a ufw `allow from <CIDR> to any port 2376 proto tcp` rule or a firewalld rich rule with `source address=<CIDR>`), using root privileges.
- Adapted: privileged commands are described in prose instead of runnable sudo examples; see the official page.
- Adapted: the official page suggests permissive settings (ufw `DEFAULT_FORWARD_POLICY="ACCEPT"`, firewalld `FORWARD_direct` accept rules) and itself notes they are permissive; forwarding is not needed for host-bound daemon connections, so source-restricted inbound rules are shown instead.

## Related

- [dockerd](./dockerd.md)
- [Troubleshooting the Docker daemon](./daemon-troubleshoot.md)
