---
source: https://docs.docker.com/engine/daemon/remote-access/
---

# Configure remote access for Docker daemon

Make the daemon listen on an IP address and port in addition to the Unix socket so remote clients can connect.

## Signature / Usage

With a systemd unit override (`sudo systemctl edit docker.service`):

```systemd
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://127.0.0.1:2376 --tlsverify --tlscacert=ca.pem --tlscert=server-cert.pem --tlskey=server-key.pem
```

```console
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker.service
$ sudo netstat -lntp | grep dockerd
tcp        0      0 127.0.0.1:2376          0.0.0.0:*               LISTEN      3758/dockerd
```

Or with `/etc/docker/daemon.json` (if the distribution doesn't use systemd):

```json
{
  "hosts": ["unix:///var/run/docker.sock", "tcp://127.0.0.1:2376"],
  "tlsverify": true,
  "tlscacert": "ca.pem",
  "tlscert": "server-cert.pem",
  "tlskey": "server-key.pem"
}
```

## Notes

- Warning: remote access without protection can let remote non-root users gain root access on the host. Remote access without TLS is not recommended and will require explicit opt-in in a future release. Use TLS (see "Protect the Docker daemon socket").
- Adapted: the official example listens on TCP without TLS client authentication; mutual TLS (`--tlsverify`) is shown instead (see Protect the Docker daemon socket).
- Configuring listening through both the systemd unit file and `daemon.json` causes a conflict that prevents Docker from starting.
- Setting `hosts` in `daemon.json` isn't supported on Docker Desktop for Windows or Mac.
- Firewall: allow incoming connections on port `2376` (TLS) or `2375` (otherwise). For ufw set `DEFAULT_FORWARD_POLICY="ACCEPT"`; for firewalld add direct rules on the `FORWARD_direct` chain for incoming and outgoing requests (check interface and chain names).

## Related

- [dockerd](./dockerd.md)
- [Troubleshooting the Docker daemon](./daemon-troubleshoot.md)
