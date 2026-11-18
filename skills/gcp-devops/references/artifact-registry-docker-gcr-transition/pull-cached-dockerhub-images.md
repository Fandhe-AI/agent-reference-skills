---
source: https://docs.cloud.google.com/artifact-registry/docs/pull-cached-dockerhub-images
---

# Pull Cached Docker Hub Images (mirror.gcr.io)

Artifact Registry caches frequently accessed public Docker Hub images on `mirror.gcr.io`. Configure the Docker daemon to use the cache when a cached copy exists and fall back to Docker Hub otherwise. Cloud Build and GKE automatically check the cache before pulling from Docker Hub.

## Signature / Usage

### Configure the Docker daemon

Set the mirror in `/etc/docker/daemon.json`:

```json
{
  "registry-mirrors": ["https://mirror.gcr.io"]
}
```

or pass it when starting the daemon:

```bash
dockerd --registry-mirror=https://mirror.gcr.io
```

or add to `/etc/default/docker`:

```bash
DOCKER_OPTS="${DOCKER_OPTS} --registry-mirror=https://mirror.gcr.io"
```

Restart the daemon (Linux):

```bash
sudo service docker restart
```

```bash
sudo service docker stop && sudo service docker start
```

macOS or Windows:

```bash
docker-machine restart
```

In the Docker UI (Preferences > Daemon > Advanced) add the same key, then **Apply & Restart**:

```json
{
  "registry-mirrors" : [
    "https://mirror.gcr.io"
  ]
}
```

### Verify

```bash
docker system info
```

The output should include `Registry Mirrors`:

```text
Containers: 2
 Running: 0
 Paused: 0
 Stopped: 2
Images: 2
Server Version: 17.03.1-ce
Storage Driver: overlay2
 Backing Filesystem: extfs
 Supports d_type: true
 Native Overlay Diff: true
Logging Driver: json-file
...
Registry Mirrors:
 https://mirror.gcr.io
```

## Notes

- Pull order after configuration: the daemon checks the Artifact Registry cache (and any other configured mirrors, in order); if the image is not found it fetches from the canonical repository on Docker Hub.
- Pulling cached images does not count against Docker Hub rate limits, but there is no guarantee an image stays cached for an extended period. Artifact Registry adds frequently requested images and periodically removes images no longer requested.
- To authenticate to Docker Hub for images not cached on `mirror.gcr.io`, use Artifact Registry remote repositories, which support Docker Hub authentication. The source recommends authenticating even for public images because it raises the download rate limit.
- Artifact Registry only caches; Google Cloud does not validate, scan or repair vulnerabilities in cached images. For active scanning consider Artifact Analysis (`gcp-security`).
- Images deleted from Docker Hub may remain in the cache for up to several days before removal; services that preconfigure cache use (Cloud Build, GKE) may continue to use them.
- `mirror.gcr.io` is hosted on Artifact Registry; no action is needed unless you use it inside a VPC Service Controls perimeter (see the transition page).
- This is the Docker daemon configuration; image building and the Docker CLI are covered by the `docker` skill.
- The source also shows the Docker UI steps.
- Source: https://docs.cloud.google.com/artifact-registry/docs/pull-cached-dockerhub-images (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [transition-from-gcr.md](./transition-from-gcr.md)
- [pushing-and-pulling.md](./pushing-and-pulling.md)
