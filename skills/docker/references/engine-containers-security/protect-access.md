---
source: https://docs.docker.com/engine/security/protect-access/
---

# Protect the Docker daemon socket

By default Docker runs through a non-networked UNIX socket. It can also communicate over SSH or a TLS (HTTPS) socket.

## Signature / Usage

SSH, using a context:

```console
$ docker context create \
    --docker host=ssh://docker-user@host1.example.com \
    --description="Remote engine" \
    my-remote-engine
$ docker context use my-remote-engine
$ docker info
```

SSH, ad hoc:

```console
$ export DOCKER_HOST=ssh://docker-user@host1.example.com
```

TLS, daemon and client:

```console
$ dockerd \
    --tlsverify \
    --tlscacert=ca.pem \
    --tlscert=server-cert.pem \
    --tlskey=server-key.pem \
    -H=0.0.0.0:2376

$ docker --tlsverify \
    --tlscacert=ca.pem \
    --tlscert=cert.pem \
    --tlskey=key.pem \
    -H="${HOST}:2376" version
```

Secure by default for the client:

```console
$ mkdir -pv ~/.docker
$ cp -v {ca,cert,key}.pem ~/.docker
$ export DOCKER_HOST="tcp://${HOST}:2376" DOCKER_TLS_VERIFY=1
```

## Options / Props

Daemon TLS modes:

| Flags | Behavior |
| --- | --- |
| `tlsverify`, `tlscacert`, `tlscert`, `tlskey` | Authenticate clients |
| `tls`, `tlscert`, `tlskey` | Do not authenticate clients |

Client TLS modes:

| Flags | Behavior |
| --- | --- |
| `tls` | Authenticate server based on public/default CA pool |
| `tlsverify`, `tlscacert` | Authenticate server based on given CA |
| `tls`, `tlscert`, `tlskey` | Authenticate with client certificate, don't authenticate server based on given CA |
| `tlsverify`, `tlscacert`, `tlscert`, `tlskey` | Authenticate with client certificate and authenticate server based on given CA |

## Notes

- The SSH user must have permission to access the docker socket on the remote machine. Switch back to the local daemon with `docker context use default`.
- Recommended `~/.ssh/config` for connection reuse: `ControlMaster auto`, `ControlPath ~/.ssh/control-%C`, `ControlPersist yes`.
- TLS and CA management is an advanced topic; learn OpenSSL, x509 and TLS before production use. Key setup: create a CA (`openssl genrsa -aes256 -out ca-key.pem 4096`, `openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem`), a server key and CSR (Common Name must match the hostname), sign with `extfile.cnf` containing `subjectAltName = DNS:$HOST,IP:10.10.10.20,IP:127.0.0.1` and `extendedKeyUsage = serverAuth`, then a client key signed with `extendedKeyUsage = clientAuth`. Remove CSRs and extension files afterwards; `chmod -v 0400` private keys and `chmod -v 0444` certificates.
- Docker over TLS should run on TCP port 2376.
- Adapted: `$HOST` expansions in the examples are quoted (`"${HOST}"`); quoting was added to the official examples.
- Anyone with the client keys has root access to the daemon host; guard them like a root password. Authorization plugins can supplement mutual TLS and receive client certificate information.
- If client certificates are in `~/.docker/{ca,cert,key}.pem` the client sends them; use `DOCKER_CERT_PATH` for another location.
- Test the API with curl: `curl "https://${HOST}:2376/images/json" --cert ~/.docker/cert.pem --key ~/.docker/key.pem --cacert ~/.docker/ca.pem`.

## Related

- [Docker contexts](./contexts.md)
- [Docker Engine security](./security-overview.md)
- [Remote access to the daemon](../engine-daemon-logging/remote-access.md)
